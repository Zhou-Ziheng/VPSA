import { useState, useRef } from "react";
import MultipleChoiceQuestion, {
  MultipleChoice,
} from "./questions/MultipleChoiceQuestion";

interface MultipleChoiceProps {
  questions: MultipleChoice[];
  onEnd(result: { correct: number; total: number }): void;
  displaySolution: boolean;
  finished: boolean;
}

const MultipleChoiceQuiz = ({
  questions,
  onEnd,
  displaySolution,
  finished,
}: MultipleChoiceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const correct = useRef<number>(0);
  const answers = useRef<string[]>([]);

  const onSubmitQuestion = (answer: string) => {
    answers.current.push(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      correct.current++;
    }
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === questions.length - 1) {
      onSubmitQuiz();
    }
  };

  const onSubmitQuiz = () => {
    onEnd({ correct: correct.current, total: questions.length });
  };

  return (
    <>
      {!finished && (
        <div className="multiple-choice">
          <MultipleChoiceQuestion
            quiz={questions[currentQuestion]}
            onSubmit={onSubmitQuestion}
            isLast={currentQuestion === questions.length - 1}
          />
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuiz;
