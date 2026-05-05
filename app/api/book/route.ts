import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message:
      "Thanks — your booking request was received. We will follow up shortly.",
  });
}
