"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  // log yourself, too
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex-auto">
      <div className="flex flex-col items-center justify-center p-4 gap-2">
        <h1 className="text-3xl font-bold">😵 Oops—something went wrong</h1>
        <p className="text-center break-all">
          {error.message || "An unexpected error occurred. "}
        </p>
        <div className="space-x-2">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.assign("/")}>
            Go Home
          </Button>
        </div>
      </div>
      <details className="whitespace-pre-wrap p-4 rounded">
        <summary className="cursor-pointer font-medium">
          Technical details
        </summary>
        <code className="block overflow-x-auto text-sm text-red-600">
          {error.stack}
        </code>
      </details>
    </div>
  );
}
