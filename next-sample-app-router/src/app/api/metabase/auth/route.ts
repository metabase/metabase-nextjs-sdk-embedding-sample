import jwt from "jsonwebtoken";
import { NextResponse } from 'next/server';

if (!process.env.METABASE_JWT_SHARED_SECRET) {
  throw new Error("Missing METABASE_JWT_SHARED_SECRET");
}
if (!process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL) {
  throw new Error("Missing NEXT_PUBLIC_METABASE_INSTANCE_URL");
}

const METABASE_JWT_SHARED_SECRET = process.env.METABASE_JWT_SHARED_SECRET;
const METABASE_INSTANCE_URL = process.env.METABASE_INSTANCE_URL;

export async function GET(request: Request) {
  // this should come from the session
  const user = {
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    group: "admin",
  };

  const token = jwt.sign(
    {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      groups: [user.group],
      exp: Math.round(Date.now() / 1000) + 60 * 10,
    },
    METABASE_JWT_SHARED_SECRET
  );

  const url = new URL(request.url)
  const wantsJson = url.searchParams.get('response') === 'json'

  if (wantsJson) {
    return NextResponse.json({ jwt: token })
  }

  const ssoUrl = `${METABASE_INSTANCE_URL}/auth/sso?jwt=${token}`;

  try {
    const response = await fetch(ssoUrl);
    const session = await response.text();
    return new Response(session);
  } catch (error) {
    console.error("error", error);
    const message = error instanceof Error ? error.message : "unknown error";
    return new Response(message, { status: 500 });
  }
}
