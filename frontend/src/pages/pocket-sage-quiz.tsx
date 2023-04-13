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
      question: "What is a Pocket Sage?",
      answers: ["a. A Sage who only uses their abilities to heal their duo",
                "b. A Sage who primarily focuses on slowing down enemies",
                "c. A Sage who excels at dealing damage to enemies with their abilities",
                "d. A Sage who specializes in creating walls for their team"],
      correctAnswer: "a. A Sage who only uses their abilities to heal their duo",
    },
    {
      question: "How much does Sage heal allies?",
      answers: ["30", "50", "70", "100"],
      correctAnswer: "100",
    },
    {
      question: "What is the cooldown time for Sage's Heal Orb ability?",
      answers: ["20 seconds", 
                "25 seconds",
                "30 seconds",
                "None of the above"],
      correctAnswer: "30 seconds",
    },    
    {
      question: "How much does Sage heal herself?",
      answers: ["30", "50", "70", "100"],
      correctAnswer: "30",
    },
    {
      question: "What is the maximum distance that Sage's Barrier Orb can be placed?",
      answers: ["8 - 10 meters", "9 - 11 meters", "10 - 12 meters", "11 - 13 meters"],
      correctAnswer: "9 - 11 meters",
      // The front of the wall is 9 meters away while the back of the wall is 11 meters
    },
    {
      question: "How many charges does Sage's Slow Orb ability have?",
      answers: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
    {
      question: "What is the order of Sage's abilities from right to left?",
      answers: ["a. Slow Orb, Healing Orb, Barrier Orb, Resurrection", 
                "b. Barrier Orb, Slow Orb, Healing Orb, Resurrection",
                "c. Resurrection, Healing Orb, Slow Orb, Barrier Orb",
                "d. Resurrection, Slow Orb, Healing Orb, Barrier Orb"],
      correctAnswer: "c. Resurrection, Healing Orb, Slow Orb, Barrier Orb",
    },
    {
      question: "How long does it take for Sage's Resurrection ability to revive a fallen ally?",
      answers: ["1.3 seconds", 
                "1.5 seconds",
                "1.7 seconds",
                "1.9 seconds"],
      correctAnswer: "1.3 seconds",
    },
    {
      question: "How thick is Sage's wall?",
      answers: ["1 meter", 
                "2 meters",
                "3 meters",
                "4 meters"],
      correctAnswer: "2 meters",
    },
    {
      question: "What is the cooldown time for Sage's Slow Orb ability?",
      answers: ["20 seconds", 
                "25 seconds",
                "30 seconds",
                "None of the above"],
      correctAnswer: "None of the above",
    },
    {
      question: "How many allies can Sage use her Healing Orb on at a time?",
      answers: ["1", 
                "2",
                "3",
                "4"],
      correctAnswer: "1",
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
