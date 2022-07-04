import QuizeResultList from "./components/quizeResult";
import { useQuizzesController } from "./quizzesController";
import QuizQuestionAnswer from "./components/quizQuestionAnswer";

function QuizzesPage() {
  const controller = useQuizzesController();

  return (
    <>
      {controller?.isFinished ? (
        <QuizeResultList controller={controller} />
      ) : (
        <QuizQuestionAnswer controller={controller} />
      )}
    </>
  );
}

export default QuizzesPage;
