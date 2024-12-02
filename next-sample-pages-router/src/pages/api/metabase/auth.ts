import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

if (!process.env.METABASE_JWT_SHARED_SECRET) {
  throw new Error("Missing METABASE_JWT_SHARED_SECRET");
}
if (!process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL) {
  throw new Error("Missing NEXT_PUBLIC_METABASE_INSTANCE_URL");
}

const METABASE_JWT_SHARED_SECRET = process.env.METABASE_JWT_SHARED_SECRET;
const NEXT_PUBLIC_METABASE_INSTANCE_URL =
  process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL;

type MetabaseSession = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetabaseSession>
) {
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
      exp: Math.round(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
    },
    // This is the JWT signing secret in your Metabase JWT authentication setting
    METABASE_JWT_SHARED_SECRET
  );
  const ssoUrl = `${NEXT_PUBLIC_METABASE_INSTANCE_URL}/auth/sso?token=true&jwt=${token}`;
  try {
    const response = await fetch(ssoUrl, { method: "GET" });
    const session = await response.text();

    res.write(session);
    return res.end();
  } catch (error) {
    console.log("error", error);
    if (error instanceof Error) {
      res.write(error.message);
      return res.end();
    }
    res.write("unknown error");
    return res.end();
  }
}
