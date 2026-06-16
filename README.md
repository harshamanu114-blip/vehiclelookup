# VehicleLookup

A modern full-stack vehicle registration lookup web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

Look up Indian vehicle registration details including manufacturer, model, insurance status, RC status, and more — with a professional SaaS-style dashboard UI, dark mode, and mobile-responsive design.

## Features

- **Vehicle Search** — Search by registration number with format validation (e.g. `AP39AB1234`)
- **Rich Vehicle Cards** — Manufacturer, model, variant, fuel type, masked engine/chassis numbers, insurance & RC status
- **Dark Mode** — System-aware theme toggle
- **Search History** — Recent lookups stored in localStorage
- **Export** — Copy details, download PDF, export CSV
- **Analytics Dashboard** — Search stats, success rate, top manufacturers
- **Search Credits** — 10 daily credits (resets every 24 hours)
- **Security** — Rate limiting, input sanitization, server-side API key handling
- **Clerk Auth** (optional) — Protect analytics route when configured

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js App Router, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Next.js API Routes (`POST /api/vehicle`) |
| Auth | Clerk (optional) |
| PDF | jsPDF |
| Animation | Framer Motion |

## Project Structure

```
/app
  /api/vehicle       — Vehicle lookup API route
  /analytics         — Analytics dashboard page
  /sign-in           — Clerk sign-in (when enabled)
  page.tsx           — Home page
/components          — Reusable UI components
/hooks               — Custom React hooks
/lib                 — Utilities, validation, provider factory
/types               — TypeScript type definitions
/data                — Local JSON data for MockVehicleProvider
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
# Vehicle API (optional for development — demo data is used when unset)
VEHICLE_API_KEY=your_api_key_here
VEHICLE_API_URL=https://api-provider-url.com/vehicle

# Clerk (optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## API Reference

### `POST /api/vehicle`

**Request:**

```json
{
  "registrationNumber": "AP39AB1234"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "registrationNumber": "AP39AB1234",
    "manufacturer": "Hyundai",
    "model": "Creta",
    "variant": "SX",
    "fuelType": "Petrol",
    "vehicleClass": "LMV",
    "registrationDate": "2022-03-10",
    "engineNumber": "G4LD********456",
    "chassisNumber": "MALB********456",
    "ownerName": "R*** K***",
    "insuranceStatus": "Active",
    "rcStatus": "Active",
    "fitnessValidity": "2027-03-10",
    "vehicleAge": "4 years, 3 months"
  }
}
```

**Rate limiting:** 10 requests per minute per IP.

## Demo Registration Numbers

When no external API is configured, the app serves demo data:

| Number | Vehicle |
|--------|---------|
| `AP39AB1234` | Hyundai Creta SX |
| `MH12AB1234` | Maruti Suzuki Swift ZXI |
| `DL01CA1234` | Tata Nexon XZ+ (Electric) |

Any valid-format registration number will return generated demo data.

## Vehicle Providers

Vehicle lookups are handled through a swappable **provider interface**. The frontend and API route never change — only `VEHICLE_PROVIDER` in `.env.local`.

```
types/provider.ts          → VehicleProvider interface
lib/providers/
  mock-vehicle-provider.ts → MockVehicleProvider (default, uses data/mock-vehicles.json)
  carinfo-provider.ts      → CarinfoProvider
  vahan-provider.ts        → VahanProvider
  commercial-api-provider.ts → CommercialApiProvider
  vehicle-builder.ts       → Shared normalization (masking, age, images)
  index.ts                 → getVehicleProvider() factory
lib/vehicle-api.ts         → Thin service layer (calls active provider)
```

### Switching providers

```env
# Default — local JSON + generated fallback data
VEHICLE_PROVIDER=mock

# Generic commercial API
VEHICLE_PROVIDER=commercial
VEHICLE_API_KEY=...
VEHICLE_API_URL=...

# CarInfo
VEHICLE_PROVIDER=carinfo
CARINFO_API_KEY=...
CARINFO_API_URL=...

# VAHAN (government RC)
VEHICLE_PROVIDER=vahan
VAHAN_API_KEY=...
VAHAN_API_URL=...
```

To add a new provider, implement `VehicleProvider` in `lib/providers/`, register it in `lib/providers/index.ts`, and add the name to `VehicleProviderName` in `types/provider.ts`.

## Vehicle API Integration

To connect a real vehicle data provider:

1. Obtain API credentials from an authorized provider
2. Set `VEHICLE_PROVIDER` and the matching env vars in `.env.local`
3. Ensure the provider returns fields compatible with `RawVehicleRecord` in `types/provider.ts`
4. Adjust request/response mapping in the provider class if needed

> **Legal notice:** Vehicle ownership and registration data in India is regulated. Ensure your use complies with applicable privacy laws (including the DPDP Act) and your API provider's terms of service.

## Clerk Authentication (Optional)

To enable user authentication:

1. Create a free account at [clerk.com](https://clerk.com)
2. Add your Clerk keys to `.env.local`
3. The `/analytics` route will require sign-in

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
