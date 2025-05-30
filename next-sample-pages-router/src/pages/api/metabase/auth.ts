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
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    METABASE_JWT_SHARED_SECRET
  );

  const wantsJson = req.query.response === "json"

  if (wantsJson) {
    return res.status(200).json({ jwt: token });
  }

  const ssoUrl = `${METABASE_INSTANCE_URL}/auth/sso?jwt=${token}`;

  try {
    const response = await fetch(ssoUrl);
    const session = await response.text();
    return res.status(response.status).send(session);
  } catch (err) {
    console.error("Metabase SSO error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).send(msg);
  }
}
