import { InteractiveQuestion } from "@metabase/embedding-sdk-react/next";

export default function InteractiveQuestionPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Interactive Question Example</h1>
      <InteractiveQuestion questionId={1} />
    </main>
  );
}
