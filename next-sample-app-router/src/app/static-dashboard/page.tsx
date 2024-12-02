import { StaticDashboard } from "@metabase/embedding-sdk-react/next";

export default function StaticDashboardPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Static Dashboard Example</h1>
      <StaticDashboard dashboardId={1} />
    </main>
  );
}
