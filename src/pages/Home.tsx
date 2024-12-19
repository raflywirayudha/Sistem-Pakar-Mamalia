// import React, { useState } from "react";
// import { mammals } from "../data/mammals";
// import Question from "../components/Question";
// import Result from "../components/Result";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// components/MammalExpertSystem.tsx
import { useState } from "react";
import { AlertCircle, Check, HelpCircle } from "lucide-react";
import { Mammal, Question } from "../types/mammal";
import { MAMMALS } from "../data/mammals";
import { QUESTIONS } from "../types/mammal";

// Mendefinisikan tipe kategori pertanyaan berdasarkan kategori yang ada
type CategoryType = keyof typeof questionCategories;

// Mendefinisikan struktur kategori pertanyaan, dimana setiap kategori berisi ID pertanyaan.
const questionCategories = {
  klasifikasi: ["b1"],
  habitat: ["b2", "b3", "b4", "b5", "b6"],
  jenisMakanan: ["b7", "b8", "b9", "b10", "b11", "b12"],
  bentukTubuh: [
    "b13",
    "b14",
    "b15",
    "b16",
    "b17",
    "b18",
    "b19",
    "b20",
    "b21",
    "b22",
  ],
  tingkahLaku: ["b23", "b24", "b25"],
  warnaTubuh: [
    "b26",
    "b27",
    "b28",
    "b29",
    "b30",
    "b31",
    "b32",
    "b33",
    "b34",
    "b35",
  ],
  tempatTinggal: ["b36", "b37"],
} as const;

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
  b1: "Mamalia",
  b2: "Habitat Pantai dan Lautan",
  b3: "Habitat Hutan Hujan",
  b4: "Habitat Padang Savana/Rumput",
  b5: "Habitat Area Terbuka",
  b6: "Habitat Hutan Bakau",
  b7: "Plankton dan Ikan (jenisMakanan)",
  b8: "Karnivora",
  b9: "Herbivora",
  b10: "Omnivora",
  b11: "Frugivora",
  b12: "Insektivora",
  b13: "Bentuk Tubuh Lonjong",
  b14: "Berat/Besar dengan Cakar",
  b15: "Besar dengan Belalai",
  b16: "Kekar dengan Tangan Panjang",
  b17: "Berbulu",
  b18: "Besar dengan Kulit Kasar",
  b19: "Tegap dengan Cakar Panjang",
  b20: "Cepat dengan Tanduk",
  b21: "Kecil dengan Bulu Perisai",
  b22: "Kecil dengan Ekor Panjang",
  b23: "Nocturnal",
  b24: "Soliter",
  b25: "Kepekaan Gerakan Tinggi",
  b26: "Warna Abu-abu keputihan",
  b27: "Warna Orange dengan Garis/Belang",
  b28: "Warna Abu-abu",
  b29: "Warna Orange dengan Rambut Panjang",
  b30: "Warna Hitam dengan Bercak Kuning",
  b31: "Warna Abu-abu Kelabu",
  b32: "Warna Hitam dengan Cincin Kuning",
  b33: "Warna Coklat Pudar dengan Putih",
  b34: "Warna Coklat Berlian",
  b35: "Warna Abu-abu Coklat",
  b36: "Hidup di Air",
  b37: "Hidup di Darat",
};

// Fungsi utama sistem pakar untuk memprediksi mamalia
const MammalExpertSystem = () => {
  // State untuk menyimpan jawaban pengguna berdasarkan ID pertanyaan
  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  // State untuk menyimpan mamalia yang diprediksi
  const [predictedMammal, setPredictedMammal] = useState<Mammal | null>(null);
  // State untuk kategori pertanyaan yang sedang aktif
  const [currentCategory, setCurrentCategory] =
    useState<CategoryType>("klasifikasi");
  // State untuk indeks pertanyaan dalam kategori
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Mengambil pertanyaan yang sesuai dengan kategori dan indeks saat ini
  const getCurrentQuestion = (): Question | undefined => {
    const currentCategoryQuestions = questionCategories[currentCategory];
    const questionId = currentCategoryQuestions[categoryIndex];
    return QUESTIONS.find((q) => q.id === questionId);
  };

  // Berpindah ke kategori berikutnya setelah menyelesaikan satu kategori
  const moveToNextCategory = () => {
    const categories = Object.keys(questionCategories) as CategoryType[];
    const currentCategoryIndex = categories.indexOf(currentCategory);

    // Jika masih ada kategori berikutnya, pindah ke kategori tersebut
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategory(categories[currentCategoryIndex + 1]);
      setCategoryIndex(0);
    } else {
      // Jika sudah di kategori terakhir, lakukan perhitungan dan prediksi mamalia
      const result = matchMammal();
      setPredictedMammal(result);
    }
  };

  // Mengecek apakah kategori saat ini dapat dilewati berdasarkan jawaban
  const shouldSkipRemainingInCategory = (response: number): boolean => {
    return response === 1; // Jika pengguna memilih "Ya" (1), pertanyaan sisa di kategori tersebut dilewati
  };

  // Menangani jawaban yang diberikan oleh pengguna
  const handleResponse = (response: number) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      moveToNextCategory(); // Jika tidak ada pertanyaan yang ditemukan, pindah ke kategori berikutnya
      return;
    }

    // Menyimpan jawaban pengguna ke state
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));

    // Cek apakah pertanyaan berikutnya perlu dilewati atau tidak
    if (shouldSkipRemainingInCategory(response)) {
      moveToNextCategory(); // Jika ya, pindah ke kategori berikutnya
    } else {
      const currentCategoryQuestions = questionCategories[currentCategory];
      if (categoryIndex < currentCategoryQuestions.length - 1) {
        // Jika ada pertanyaan lain dalam kategori, lanjutkan ke pertanyaan berikutnya
        setCategoryIndex((prev) => prev + 1);
      } else {
        // Jika tidak ada, pindah ke kategori berikutnya
        moveToNextCategory();
      }
    }
  };

  const matchMammal = (): Mammal | null => {
    // Menghitung skor kecocokan antara jawaban pengguna dan karakteristik mamalia
    const matchScores = MAMMALS.map((mammal) => {
      const score = Object.keys(userResponses).reduce(
        (total, characteristic) => {
          const userResponse = userResponses[characteristic];
          const mammalCharacteristic = mammal.characteristics[characteristic];
          const difference = Math.abs(userResponse - mammalCharacteristic);

          // Penyesuaian bobot untuk jawaban "Tidak" dan "Mungkin"
          if (userResponse === 0) {
            // Jika "Tidak", sangat tidak cocok
            return total + (mammalCharacteristic === 0 ? 1 : 0); // Skor lebih tinggi jika mamalia juga "Tidak"
          } else if (userResponse === 0.5) {
            // Jika "Mungkin", perbedaan lebih besar memberi penalti lebih besar
            return total + (1 - difference) * 0.5; // Bobot lebih rendah untuk "Mungkin"
          } else {
            // Jika "Ya", harus sangat cocok
            return total + (1 - difference);
          }
        },
        0
      );

      // Menghitung skor rata-rata
      return { mammal, score: score / Object.keys(userResponses).length };
    });

    // Menyortir berdasarkan skor tertinggi
    const bestMatch = matchScores.sort((a, b) => b.score - a.score)[0];

    // Mengubah batas kecocokan lebih ketat, misalnya 0.6
    return bestMatch.score > 0.6 ? bestMatch.mammal : null;
  };

  // Mereset sistem untuk memulai dari awal
  const resetExpertSystem = () => {
    setUserResponses({});
    setPredictedMammal(null);
    setCurrentCategory("klasifikasi");
    setCategoryIndex(0);
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
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] mt-8 px-4">
      <Card className="bg-white p-6 md:p-10 w-full max-w-xl flex items-center justify-center">
        {!predictedMammal ? (
          // Jika mamalia belum diprediksi, tampilkan pertanyaan untuk pengguna
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
          // Jika mamalia sudah diprediksi, tampilkan hasil prediksi
          <div className="text-center w-full">
            {predictedMammal && (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  {predictedMammal.name}
                </h2>
                <div>
                  <div className="p-4 rounded mb-4">
                    <img
                      src={predictedMammal?.image}
                      alt={predictedMammal?.name}
                      className="w-full max-w-md rounded mx-auto object-contain"
                    />
                  </div>
                  <div className="p-4 rounded mb-4">
                    <h3 className="font-semibold mb-2">Karakteristik Unik:</h3>
                    <p className="text-sm md:text-base">
                      {predictedMammal.uniqueCharacteristic}
                    </p>
                  </div>
                  <div className="p-4 rounded mb-4 flex justify-center content-center flex-col">
                    <h3 className="font-semibold mb-2">
                      Karakteristik Berdasarkan Kategori:
                    </h3>
                    {Object.entries(
                      getCharacteristicsByCategory(
                        predictedMammal.characteristics
                      )
                    ).map(([category, characteristics]) =>
                      characteristics && characteristics.length > 0 ? (
                        <div key={category} className="mb-4 flex items-start">
                          <h4 className="text-lg text-start font-bold capitalize min-w-[150px]">
                            {category}:
                          </h4>
                          <div className="ml-2 flex-1">
                            {characteristics.map((char, index) => (
                              <p key={index} className="text-sm text-start">
                                {char}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </>
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
