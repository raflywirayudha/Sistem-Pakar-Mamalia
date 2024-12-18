import React from "react";
import { Alert } from "@/components/ui/alert";

interface ResultProps {
  name: string;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ name, onReset }) => {
  return (
    <Alert className="p-4 bg-white shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold">Hasil</h2>
      <p className="text-lg my-4">
        Mamalia ini kemungkinan adalah <strong>{name}</strong>.
      </p>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={onReset}
      >
        Coba Lagi
      </button>
    </Alert>
  );
};

export default Result;
