import { StaticQuestion } from "@metabase/embedding-sdk-react";

export default function StaticQuestionPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Static Question Example</h1>
      <StaticQuestion questionId={1} />
    </main>
  );
}
