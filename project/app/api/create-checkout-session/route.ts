import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      checkoutUrl: "https://example.com/checkout-success", // temporary redirect target
      message: "Checkout session created (placeholder)",
    },
    { status: 200 }
  );
}
