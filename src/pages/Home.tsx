// import React, { useState } from "react";
// import { mammals } from "../data/mammals";
// import Question from "../components/Question";
// import Result from "../components/Result";
import { useState } from "react";
import { AlertCircle, Check, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mammal, Question } from "../types/mammal";
import { MAMMALS } from "../data/mammals";
import { QUESTIONS } from "../types/mammal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mendefinisikan tipe kategori pertanyaan berdasarkan kategori yang ada
type CategoryType = keyof typeof questionCategories;

// Mendefinisikan struktur kategori pertanyaan, dimana setiap kategori berisi ID pertanyaan.
const questionCategories = {
  tempatTinggal: ["b1", "b2"],
  habitat: ["b3", "b4", "b5", "b6", "b7"],
  jenisMakanan: ["b8", "b9", "b10", "b11", "b12", "b13"],
  bentukTubuh: [
    "b14",
    "b15",
    "b16",
    "b17",
    "b18",
    "b19",
    "b20",
    "b21",
    "b22",
    "b23",
  ],
  tingkahLaku: ["b24", "b25", "b26"],
  warnaTubuh: [
    "b27",
    "b28",
    "b29",
    "b30",
    "b31",
    "b32",
    "b33",
    "b34",
    "b35",
    "b36",
  ],
};

const getCharacteristicsByCategory = (characteristics: {
  [key: string]: number;
}) => {
  const result: { [key in CategoryType]?: string[] } = {};

  Object.entries(questionCategories).forEach(([category, keys]) => {
    result[category as CategoryType] = keys
      .filter((key) => characteristics[key] === 1) // Ambil yang bernilai 1
      .map((key) => characteristicDescriptions[key]); // Ubah key menjadi deskripsi
  });

  return result;
};

// Deskripsi untuk setiap characteristic code
const characteristicDescriptions: { [key: string]: string } = {
  b1: "Hidup di Air",
  b2: "Hidup di Darat",
  b3: "Habitat Pantai dan Lautan",
  b4: "Habitat Hutan Hujan",
  b5: "Habitat Padang Savana/Rumput",
  b6: "Habitat Area Terbuka",
  b7: "Habitat Hutan Bakau",
  b8: "Plankton dan Ikan (jenisMakanan)",
  b9: "Karnivora",
  b10: "Herbivora",
  b11: "Omnivora",
  b12: "Frugivora",
  b13: "Insektivora",
  b14: "Bentuk Tubuh Lonjong",
  b15: "Berat/Besar dengan Cakar",
  b16: "Besar dengan Belalai",
  b17: "Kekar dengan Tangan Panjang",
  b18: "Berbulu",
  b19: "Besar dengan Kulit Kasar",
  b20: "Tegap dengan Cakar Panjang",
  b21: "Cepat dengan Tanduk",
  b22: "Kecil dengan Bulu Perisai",
  b23: "Kecil dengan Ekor Panjang",
  b24: "Nocturnal",
  b25: "Soliter",
  b26: "Kepekaan Gerakan Tinggi",
  b27: "Warna Abu-abu keputihan",
  b28: "Warna Orange dengan Garis/Belang",
  b29: "Warna Abu-abu",
  b30: "Warna Orange dengan Rambut Panjang",
  b31: "Warna Hitam dengan Bercak Kuning",
  b32: "Warna Abu-abu Kelabu",
  b33: "Warna Hitam dengan Cincin Kuning",
  b34: "Warna Coklat Pudar dengan Putih",
  b35: "Warna Coklat Berlian",
  b36: "Warna Abu-abu Coklat",
};

// Fungsi utama sistem pakar untuk memprediksi mamalia
const MammalExpertSystem = () => {
  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  const [predictedMammal, setPredictedMammal] = useState<Mammal | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<CategoryType>("tempatTinggal");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [noMatch, setNoMatch] = useState(false);
  const [accuracy, setAccuracy] = useState<number>(0);

  const getCurrentQuestion = (): Question | undefined => {
    const currentCategoryQuestions = questionCategories[currentCategory];
    const questionId = currentCategoryQuestions[categoryIndex];
    return QUESTIONS.find((q) => q.id === questionId);
  };

  // Logika untuk menentukan apakah sisa pertanyaan dalam kategori harus dilewati
  const shouldSkipRemainingInCategory = (response: number): boolean => {
    if (currentCategory === "tempatTinggal" && response === 1) {
      return true; // Skip jika user memilih "Ya" untuk pertanyaan tempat tinggal
    }
    if (currentCategory === "habitat" && response === 1) {
      return true; // Skip jika user memilih "Ya" untuk pertanyaan habitat
    }
    if (currentCategory === "jenisMakanan" && response === 1) {
      return true; // Skip jika user memilih "Ya" untuk pertanyaan makanan
    }
    if (currentCategory === "bentukTubuh" && response === 1) {
      return true; // Skip jika user memilih "Ya" untuk pertanyaan bentuk tubuh
    }
    if (currentCategory === "warnaTubuh" && response === 1) {
      return true; // Skip jika user memilih "Ya" untuk pertanyaan warna
    }

    return false;
  };

  const handleResponse = (response: number) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      moveToNextCategory();
      return;
    }

    // Simpan respon user
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));

    // Cek apakah perlu skip kategori
    if (shouldSkipRemainingInCategory(response)) {
      // Jika Ya, set semua pertanyaan tersisa dalam kategori ini sebagai 0
      const currentCategoryQuestions = questionCategories[currentCategory];
      const remainingQuestions = currentCategoryQuestions.slice(
        categoryIndex + 1
      );

      const remainingResponses = remainingQuestions.reduce(
        (acc, questionId) => ({
          ...acc,
          [questionId]: 0,
        }),
        {}
      );

      setUserResponses((prev) => ({
        ...prev,
        ...remainingResponses,
      }));

      // Pindah ke kategori berikutnya
      moveToNextCategory();
    } else {
      // Jika tidak perlu skip, lanjut ke pertanyaan berikutnya
      const currentCategoryQuestions = questionCategories[currentCategory];
      if (categoryIndex < currentCategoryQuestions.length - 1) {
        setCategoryIndex((prev) => prev + 1);
      } else {
        moveToNextCategory();
      }
    }
  };

  const moveToNextCategory = () => {
    const categories = Object.keys(questionCategories) as CategoryType[];
    const currentCategoryIndex = categories.indexOf(currentCategory);

    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategory(categories[currentCategoryIndex + 1]);
      setCategoryIndex(0);
    } else {
      const result = matchMammal();
      setPredictedMammal(result);
    }
  };

  const matchMammal = (): Mammal | null => {
    const totalQuestions = Object.keys(userResponses).length;
    if (totalQuestions < 5) {
      return null;
    }

    const maybeCount = Object.values(userResponses).filter(
      (v) => v === 0.5
    ).length;
    if (maybeCount > totalQuestions * 0.9) {
      setNoMatch(true);
      setAccuracy(0);
      return null;
    }

    const noCount = Object.values(userResponses).filter((v) => v === 0).length;
    if (noCount > totalQuestions * 0.95) {
      setNoMatch(true);
      setAccuracy(0);
      return null;
    }

    const matchScores = MAMMALS.map((mammal) => {
      let matchScore = 0;
      let totalPossibleScore = 0;

      Object.entries(userResponses).forEach(
        ([characteristic, userResponse]) => {
          const mammalCharacteristic = mammal.characteristics[characteristic];

          // Calculate weighted scores
          if (mammalCharacteristic === 1) {
            totalPossibleScore += 100; // Perfect match possible

            if (userResponse === 1) {
              matchScore += 100; // Perfect match
            } else if (userResponse === 0.5) {
              matchScore += 50; // Partial match
            }
            // No points for incorrect matches
          } else if (mammalCharacteristic === 0) {
            totalPossibleScore += 100;

            if (userResponse === 0) {
              matchScore += 100; // Correct negative match
            } else if (userResponse === 0.5) {
              matchScore += 50; // Uncertain but acceptable
            }
          }
        }
      );

      // Calculate accuracy as a percentage of maximum possible score
      const accuracy =
        totalPossibleScore > 0 ? (matchScore / totalPossibleScore) * 100 : 0;
      const normalizedScore = accuracy / 100; // Convert to 0-1 scale for sorting

      return { mammal, score: normalizedScore, accuracy };
    });

    const bestMatches = matchScores.sort((a, b) => b.score - a.score);

    if (
      bestMatches[0].score < 0.15 ||
      (bestMatches[1] && bestMatches[0].score - bestMatches[1].score < 0.03)
    ) {
      setNoMatch(true);
      setAccuracy(0);
      return null;
    }

    setNoMatch(false);
    setAccuracy(bestMatches[0].accuracy);
    return bestMatches[0].mammal;
  };

  const resetExpertSystem = () => {
    setUserResponses({});
    setPredictedMammal(null);
    setCurrentCategory("tempatTinggal");
    setCategoryIndex(0);
    setNoMatch(false);
    setAccuracy(0);
  };

  // Mendapatkan pertanyaan saat ini
  const currentQuestion = getCurrentQuestion();

  // Jika tidak ada pertanyaan dan tidak ada mamalia yang diprediksi, tampilkan error
  if (!currentQuestion && !predictedMammal) {
    return (
      <Card className="bg-white p-6 md:p-10 w-full max-w-xl flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Sistem Error</h2>
          <Button
            onClick={resetExpertSystem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Mulai Ulang
          </Button>
        </div>
      </Card>
    );
  }

  if (!currentQuestion) {
    return <div>Loading atau Error: Tidak ada pertanyaan ditemukan</div>;
  }

  // Render UI berdasarkan apakah mamalia sudah diprediksi atau belum
  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-yellowbg bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <Card className="bg-white md:p-10 w-full md:max-w-5xl flex items-center justify-center">
        {!predictedMammal && !noMatch ? (
          <div className="p-3 md:p-5 ">
            <div className="mb-4">
              <img
                src="/thinking.png"
                alt="thinking"
                className="w-64 h-auto mx-auto animate-bounceUpDown"
              />

              <h1 className="font-bold text-center text-xl md:text-2xl">
                {currentQuestion?.text}
              </h1>
              <p className="text-sm md:text-base text-center text-gray-500 mb-5">
                {currentQuestion?.description}
              </p>
            </div>
            <div className="flex flex-row md:flex-row justify-center  md:space-y-0 md:space-x-4n space-x-2">
              <Button
                onClick={() => handleResponse(1)}
                className="w-full md:flex-1 bg-green hover:bg-green-600 flex items-center justify-center space-x-2 text-black py-2 rounded"
              >
                <Check size={20} />
                <span>Ya</span>
              </Button>
              <Button
                onClick={() => handleResponse(0.5)}
                className="w-full md:flex-1 bg-yellow hover:bg-yellow-600 flex items-center justify-center space-x-2 text-black py-2 rounded"
              >
                <HelpCircle size={20} />
                <span>Mungkin</span>
              </Button>
              <Button
                onClick={() => handleResponse(0)}
                className="w-full md:flex-1 bg-red hover:bg-red-600 flex items-center justify-center space-x-2 text-black py-2 rounded"
              >
                <AlertCircle size={20} />
                <span>Tidak</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center w-full">
            {noMatch ? (
              <div className="mb-6">
                <img
                  src="/gatau.png"
                  alt="gatau"
                  className="w-64 h-auto mx-auto animate-bounceUpDown"
                />
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-red-600">
                  Maaf, tidak bisa menemukan mamalia yang kamu maksud
                </h2>
                <p className="text-gray-600 mb-4">
                  Jawaban yang diberikan tidak cukup spesifik atau tidak cocok
                  dengan mamalia dalam database.
                </p>
                <Button
                  onClick={resetExpertSystem}
                  className="bg-green text-black px-4 py-2 rounded hover:bg-green-600"
                >
                  Mulai Ulang
                </Button>
              </div>
            ) : (
              predictedMammal && (
                <div className="">
                  <h2 className="text-2xl  md:text-4xl font-bold mb-4">
                    {predictedMammal.name}
                  </h2>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-center mt-5">
                      Akurasi{" "}
                      <span className="font-bold text-lg text-blue-800">
                        {accuracy.toFixed(1)}%
                      </span>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-green h-2.5 rounded-full"
                        style={{ width: `${accuracy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="md:grid md:grid-cols-2">
                    <div className="p-4 rounded flex items-center ">
                      <img
                        src={predictedMammal.image}
                        alt={predictedMammal.name}
                        className="w-auto h-auto mx-auto rounded-lgn "
                      />
                    </div>

                    <div className="p-4">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left w-1/3">
                              Kategori
                            </TableHead>
                            <TableHead className="text-left w-2/3">
                              Karakteristik
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(
                            getCharacteristicsByCategory(
                              predictedMammal.characteristics
                            )
                          ).map(([category, characteristics]) =>
                            characteristics && characteristics.length > 0 ? (
                              <TableRow key={category}>
                                <TableCell className="font-bold bg-white text-start">
                                  {category
                                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </TableCell>
                                <TableCell className="bg-white text-start">
                                  {characteristics.map((char, index) => (
                                    <div key={index} className="mb-1 last:mb-0">
                                      {char}
                                    </div>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ) : null
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <Button
                    onClick={resetExpertSystem}
                    className="bg-red text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Mulai Ulang
                  </Button>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </header>
  );
};

export default MammalExpertSystem;
