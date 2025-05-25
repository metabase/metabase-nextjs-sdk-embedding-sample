import "@/styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";
import { AppProvider } from '@/components/app-provider';

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
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  );
}
