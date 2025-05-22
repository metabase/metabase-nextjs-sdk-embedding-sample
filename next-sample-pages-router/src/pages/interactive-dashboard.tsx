import { InteractiveDashboard } from "@metabase/embedding-sdk-react/nextjs";

export default function InteractiveDashboardPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Interactive Dashboard Example</h1>
      <InteractiveDashboard dashboardId={1} withDownloads />
    </main>
  );
}
