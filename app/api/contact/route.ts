import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Reach us at hello@kikibnb.example — we reply within a day.",
  });
}
