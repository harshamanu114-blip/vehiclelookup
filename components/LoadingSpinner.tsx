export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-900 dark:border-t-blue-400`}
      role="status"
      aria-label="Loading"
    />
  );
}
