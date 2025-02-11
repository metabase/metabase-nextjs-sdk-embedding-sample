import "@/styles/globals.css";
import {
  defineMetabaseAuthConfig,
  MetabaseProvider,
} from "@metabase/embedding-sdk-react/nextjs";
import Link from "next/link";
import type { AppProps } from "next/app";

if (!process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL) {
  throw new Error("Missing NEXT_PUBLIC_METABASE_INSTANCE_URL");
}

const authConfig = defineMetabaseAuthConfig({
  metabaseInstanceUrl: process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL,
  authProviderUri: `/api/metabase/auth`,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: "flex", minHeight: "100dvh" }}>
      <nav className="flex flex-col gap-5 w-[200px] p-5 border-r border-gray-200">
        <Link href="/">
          <strong>Nextjs Pages Router</strong>
        </Link>
        <Link href="/static-question">Static question</Link>
        <Link href="/interactive-question">Interactive question</Link>
        <Link href="/static-dashboard">Static Dashboard</Link>
        <Link href="/interactive-dashboard">Interactive Dashboard</Link>
      </nav>
      <MetabaseProvider authConfig={authConfig}>
        <Component {...pageProps} />
      </MetabaseProvider>
    </div>
  );
}
