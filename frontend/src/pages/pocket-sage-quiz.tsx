import GraphicalPage from "@/components/GraphicalPage";
import MultipleChoiceQuiz from "@/components/quiz/MultipleChoiceQuiz";
import { MultipleChoice } from "@/components/quiz/questions/MultipleChoiceQuestion";
import useMe from "@/hooks/useMe";
import { Button } from "@mui/material";
import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "./_app";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const certify = gql`
  mutation Certify {
    certify {
      user {
        username
        certificateLevel
      }
    }
  }
`;

const PocketSageQuiz = () => {
  const { data, isLoggedin, isFetching } = useMe();
  const router = useRouter();
  const [displaySolution, setDisplaySolution] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const [questions, setQuestions] = useState<MultipleChoice[]>([
    {
      question: "How much does Sage heal allies?",
      answers: ["30", "asd", "70", "100"],
      correctAnswer: "100",
    },
    {
      question: "How much does Sage heal herself?",
      answers: ["30", "50", "70", "100"],
      correctAnswer: "30",
    },
  ]);
  const queryClient = useQueryClient();

  const updateCertification = useMutation({
    mutationFn: async () => {
      return await client.request(certify);
    },
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/login");
    }
  }, [router, isLoggedin]);

  const handleEnd = (result: { correct: number; total: number }) => {
    setFinished(true);
    setCorrect(result.correct);
    setTotal(result.total);
    if (result.correct == result.total) {
      updateCertification.mutate();
    }
  };

  const getResult = () => {
    if (correct == total) {
      return (
        <>
          <h5>Congrats! You are a certified Pocket Sage!</h5>
          <Button href="certificate" variant="contained">
            {" "}
            See Certificate
          </Button>
        </>
      );
    } else {
      return (
        <h5>
          You got {correct} out of {total} questions correct, not good enough I
          guess.
        </h5>
      );
    }
  };

  const isCertified = data.me?.user.certificateLevel != 0;

  return (
    <GraphicalPage>
      {}
      {!isFetching && isLoggedin && isCertified && (
        <>
          <h5>Congrats! You are a certified Pocket Sage!</h5>
          <Link href="certificate">
            <Button variant="contained">See Certificate</Button>
          </Link>
        </>
      )}
      {!isFetching && isLoggedin && !isCertified && (
        <>
          {finished && getResult()}
          <MultipleChoiceQuiz
            questions={questions}
            onEnd={handleEnd}
            finished={finished}
            displaySolution={displaySolution}
          />
        </>
      )}
    </GraphicalPage>
  );
};

export default PocketSageQuiz;
