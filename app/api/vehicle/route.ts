import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeRegistrationNumber } from "@/lib/sanitize";
import { getValidationError } from "@/lib/validation";
import { VehicleProviderError } from "@/types/provider";
import { lookupVehicle } from "@/lib/vehicle-api";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetAt),
          },
        }
      );
    }

    const body = await request.json();
    const registrationNumber = sanitizeRegistrationNumber(
      body?.registrationNumber
    );

    const validationError = getValidationError(registrationNumber);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const vehicle = await lookupVehicle(registrationNumber);

    return NextResponse.json(
      { success: true, data: vehicle },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Vehicle lookup error:", error);

    if (error instanceof VehicleProviderError) {
      const status =
        error.code === "NOT_FOUND"
          ? 404
          : error.code === "NOT_CONFIGURED"
            ? 503
            : 502;

      return NextResponse.json(
        { success: false, error: error.message },
        { status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch vehicle information. Please try again.",
      },
      { status: 500 }
    );
  }
}
