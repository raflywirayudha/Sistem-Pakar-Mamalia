// import React, { useState } from "react";
// import { mammals } from "../data/mammals";
// import Question from "../components/Question";
// import Result from "../components/Result";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// components/MammalExpertSystem.tsx
import React, { useState } from "react";
import { AlertCircle, Check, HelpCircle } from "lucide-react";
import { Mammal, Question } from "../types/mammal";
import { MAMMALS } from "../data/mammals";
import { QUESTIONS } from "../types/mammal";

const MammalExpertSystem: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  const [predictedMammal, setPredictedMammal] = useState<Mammal | null>(null);

  // Explicitly type the currentQuestion to use Question type
  const currentQuestion: Question = QUESTIONS[currentQuestionIndex];

  // Fuzzy Logic Matching Function
  const matchMammal = () => {
    const matchScores = MAMMALS.map((mammal) => {
      const score = Object.keys(userResponses).reduce(
        (total, characteristic) => {
          const userResponse = userResponses[characteristic];
          const mammalCharacteristic = mammal.characteristics[characteristic];

          // Calculate fuzzy match
          const difference = Math.abs(userResponse - mammalCharacteristic);
          return total + (1 - difference);
        },
        0
      );

      return { mammal, score: score / Object.keys(userResponses).length };
    });

    const bestMatch = matchScores.sort((a, b) => b.score - a.score)[0];

    if (bestMatch.score > 0.6) {
      return bestMatch.mammal;
    }

    return null;
  };

  const handleResponse = (response: number) => {
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const result = matchMammal();
      setPredictedMammal(result);
    }
  };

  const resetExpertSystem = () => {
    setCurrentQuestionIndex(0);
    setUserResponses({});
    setPredictedMammal(null);
  };

  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] mt-8 px-4">
      <Card className="bg-white p-6 md:p-10 w-full max-w-xl flex items-center justify-center">
        {!predictedMammal ? (
          <div className="p-3 md:p-5 w-full">
            <div className="mb-4">
              <h1 className="font-bold text-center text-xl md:text-2xl">
                {currentQuestion.text}
              </h1>
              <p className="text-sm md:text-base text-center text-gray-500 mb-5">
                {currentQuestion.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-4">
              <Button
                onClick={() => handleResponse(1)}
                className="w-full md:flex-1 bg-green btn btn-primary flex items-center justify-center space-x-2 text-black py-2 rounded hover:bg-green-600"
              >
                <Check size={20} />
                <span>Ya</span>
              </Button>
              <Button
                onClick={() => handleResponse(0.5)}
                className="w-full md:flex-1 btn btn-secondary flex items-center justify-center space-x-2 bg-yellow text-black py-2 rounded hover:bg-yellow-600"
              >
                <HelpCircle size={20} />
                <span>Mungkin</span>
              </Button>
              <Button
                onClick={() => handleResponse(0)}
                className="w-full md:flex-1 btn btn-danger flex items-center justify-center space-x-2 bg-red text-black py-2 rounded hover:bg-red-600"
              >
                <AlertCircle size={20} />
                <span>Tidak</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center w-full">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {predictedMammal ? predictedMammal.name : "Tidak Ditemukan"}
            </h2>
            {predictedMammal && (
              <div>
                <div className="p-4 rounded mb-4">
                  <h3 className="font-semibold mb-2">Gambar</h3>
                  {/* Tambahkan Image component di sini */}
                </div>
                <div className="p-4 rounded mb-4">
                  <h3 className="font-semibold mb-2">Karakteristik Unik:</h3>
                  <p className="text-sm md:text-base">
                    {predictedMammal.uniqueCharacteristic}
                  </p>
                </div>
              </div>
            )}
            <Button
              onClick={resetExpertSystem}
              className="bg-green text-black px-4 py-2 rounded hover:bg-green-600"
            >
              Mulai Ulang
            </Button>
          </div>
        )}
      </Card>
    </header>
  );
};

export default MammalExpertSystem;
