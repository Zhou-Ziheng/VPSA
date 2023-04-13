import GraphicalPage from "@/components/GraphicalPage";
import MultipleChoiceQuiz from "@/components/quiz/MultipleChoiceQuiz";
import { MultipleChoice } from "@/components/quiz/questions/MultipleChoiceQuestion";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PocketSageQuiz = () => {
  const { data, isLoggedin } = useMe();
  const router = useRouter();
  const [displaySolution, setDisplaySolution] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const [questions, setQuestions] = useState<MultipleChoice[]>([
    {
      question: "How much does Sage heal allies?",
      answers: ["30", "50", "70", "100"],
      correctAnswer: "100",
    },
    {
      question: "How much does Sage heal herself?",
      answers: ["30", "50", "70", "100"],
      correctAnswer: "30",
    },
  ]);

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/login");
    }
  }, [router, isLoggedin]);

  const handleEnd = (result: { correct: number; total: number }) => {
    setFinished(true);
    setCorrect(result.correct);
    setTotal(result.total);
  };

  const getResult = () => {
    if (correct == total) {
      return <h5>Congrats! You are now Certified!</h5>;
    } else {
      return (
        <h5>
          You got {correct} out of {total} questions correct, not good enough I
          guess.
        </h5>
      );
    }
  };

  const isCertified = data?.user.certificateLevel != 0;

  return (
    <GraphicalPage>
      {isCertified && <h5>You are already certified!</h5>}
      {!isCertified && finished && <>{getResult()}</>}
      <MultipleChoiceQuiz
        questions={questions}
        onEnd={handleEnd}
        finished={finished}
        displaySolution={displaySolution}
      />
    </GraphicalPage>
  );
};

export default PocketSageQuiz;
