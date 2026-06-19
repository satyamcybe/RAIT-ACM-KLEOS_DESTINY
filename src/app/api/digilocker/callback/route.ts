import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: "No OAuth code provided" }, { status: 400 });
  }

  // MOCK: Return simulated successful callback response
  // In a real flow, this might set a session cookie and redirect instead of returning JSON
  // Here we'll return the JSON for API testing, but in the UI flow we actually handle this
  // client-side or via a redirect.
  // The spec says: "After returning response, redirect to /identity/processing"
  
  return NextResponse.redirect(new URL("/identity/processing", req.url));
}
