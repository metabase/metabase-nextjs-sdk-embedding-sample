// pages/api/auth/sso.ts

import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

if (!process.env.METABASE_JWT_SHARED_SECRET) {
  throw new Error("Missing METABASE_JWT_SHARED_SECRET");
}
if (!process.env.METABASE_INSTANCE_URL) {
  throw new Error("Missing METABASE_INSTANCE_URL");
}

const METABASE_JWT_SHARED_SECRET = process.env.METABASE_JWT_SHARED_SECRET;
const METABASE_INSTANCE_URL = process.env.METABASE_INSTANCE_URL;

type JsonResponse = { jwt: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse | string>
) {
  // In a real app you'd pull this from your session/cookie
  const user = {
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    group: "admin",
  };

  // Sign a Metabase SSO JWT (10min expiration)
  const token = jwt.sign(
    {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      groups: [user.group],
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    METABASE_JWT_SHARED_SECRET
  );

  // If ?response=json, return { jwt }
  if (req.query.response === "json") {
    return res.status(200).json({ jwt: token });
  }
  // Otherwise proxy the SSO request to Metabase
  const ssoUrl = `${METABASE_INSTANCE_URL}/auth/sso?jwt=${token}`;

  try {
    const mbRes = await fetch(ssoUrl);
    const html = await mbRes.text();
    return res.status(mbRes.status).send(html);
  } catch (err) {
    console.error("Metabase SSO error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).send(msg);
  }
}
