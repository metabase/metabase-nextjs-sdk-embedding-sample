import { StaticDashboard } from "@metabase/embedding-sdk-react/nextjs";
import Link from "next/link";

export default function StaticDashboardPage() {
  return (
    <main className="p-4">
      <Link href="/static-question">Static question</Link>
      <Link href="/interactive-question">Interactive question</Link>
      <Link href="/interactive-dashboard">Interactive Dashboard</Link>
      <h1 className="text-2xl mb-4">Static Dashboard Example</h1>
      <StaticDashboard dashboardId={1} />
    </main>
  );
}
