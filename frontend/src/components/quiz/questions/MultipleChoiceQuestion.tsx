import { Button, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import styles from "./MultipleChoiceQuestion.module.scss";

export interface MultipleChoice {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface MultipleChoiceProps {
  quiz: MultipleChoice;
  displaySolution?: boolean;
  onSubmit(answer: string): void;
  isLast: boolean;
}

const MultipleChoiceQuestion = ({
  quiz,
  displaySolution = false,
  onSubmit,
  isLast,
}: MultipleChoiceProps) => {
  const [selected, setSelected] = useState<string>();
  const [error, setError] = useState<string>();

  return (
    <>
      {!displaySolution && (
        <div className={styles["multiple-choice"]}>
          <h2 className={styles["question"]}>{quiz.question}</h2>
          <div className={styles["options"]}>
            {quiz.answers.map((option) => (
              <Button
                className={styles["option"]}
                key={option}
                onClick={() => {
                  if (option != selected) {
                    setSelected(option);
                  } else {
                    setSelected("");
                  }
                  setError("");
                }}
                sx={{ fontSize: "20px", textTransform: "lowercase" }}
                variant={option == selected ? "contained" : "outlined"}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => {
              if (!selected) {
                setError("Please select an answer");
              } else {
                onSubmit(selected);
                setError("");
                setSelected("");
              }
            }}
            color={error ? "error" : "primary"}
          >
            {isLast ? "Finish" : "Next"}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuestion;
