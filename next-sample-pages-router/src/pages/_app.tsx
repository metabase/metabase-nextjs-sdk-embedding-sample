import "@/styles/globals.css";
import {
  defineMetabaseAuthConfig,
  MetabaseProvider,
  defineMetabaseTheme,
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

const theme = defineMetabaseTheme({
  // Specify a font to use from the set of fonts supported by Metabase.
  // You can set the font to "Custom" to use the custom font
  // configured in your Metabase instance.
  fontFamily: "Lato",

  // Override the base font size for every component.
  // This does not usually need to be set, as the components
  // inherit the font size from the parent container, such as the body.
  fontSize: "16px",

  // Override the base line height for every component.
  lineHeight: 1.5,

  // Match your application's color scheme
  colors: {
    brand: "#6b88bd",
    "text-primary": "#FFFFFF",
    "text-secondary": "#B0BEC5",
    "text-tertiary": "#78909C",
    background: "#181A1B",
    "background-hover": "#23272B",
    border: "#263238",
    filter: "#939393",
    summarize: "#5e749c",
    shadow: "rgba(0,0,0,0.6)",
  },

  components: {
    question: {
      backgroundColor: "#23272B",
      toolbar: {
        backgroundColor: "#23272B",
      }
    },
    table: {
      cell: {
        textColor: "#FFFFFF",
        backgroundColor: "#181A1B",
      },
    },
  },
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
      <MetabaseProvider authConfig={authConfig} theme={theme}>
        <Component {...pageProps} />
      </MetabaseProvider>
    </div>
  );
}
