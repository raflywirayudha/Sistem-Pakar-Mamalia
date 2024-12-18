import React from "react";
import { Button } from "@/components/ui/button";

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onAnswer }) => {
  return (
    <div className="p-10  rounded-lg">
      <h2 className="text-xl  font-bold mb-10 flex justify-center">
        {question}
      </h2>
      <div className="flex flex-row justify-between">
        {options.map((option, index) => (
          <Button
            key={index}
            className="py-2 px-4 mx-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
