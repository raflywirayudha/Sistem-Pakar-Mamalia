// types/mammal.ts
export interface Mammal {
  name: string;
  image: string;
  uniqueCharacteristic: string;
  characteristics: {
    [key: string]: number; // Fuzzy logic membership value
  };
}

export interface Question {
  id: string;
  text: string;
  description: string;
}

export const QUESTIONS: Question[] = [
  {
    id: "terrestrial",
    text: "Apakah hewan ini hidup di darat?",
    description:
      "Hewan memiliki kemampuan bergerak dan bertahan hidup di daratan",
  },
  {
    id: "marine",
    text: "Apakah hewan ini hidup di laut?",
    description: "Hewan memiliki adaptasi untuk hidup di lingkungan perairan",
  },
  {
    id: "predator",
    text: "Apakah hewan ini adalah pemangsa?",
    description:
      "Hewan yang berburu dan memakan hewan lain sebagai sumber makanan utama",
  },
  {
    id: "mammalian",
    text: "Apakah hewan ini menyusui anaknya?",
    description: "Ciri khas mamalia yang menyusui anak-anaknya dengan air susu",
  },
  {
    id: "flyable",
    text: "Apakah hewan ini dapat terbang?",
    description: "Kemampuan hewan untuk bergerak di udara",
  },
  {
    id: "nocturnal",
    text: "Apakah hewan ini aktif pada malam hari?",
    description: "Kebiasaan hewan yang lebih aktif di waktu malam hari",
  },
  {
    id: "endangered",
    text: "Apakah hewan ini terancam punah?",
    description:
      "Status konservasi hewan yang memiliki risiko kepunahan tinggi",
  },
  {
    id: "Indonesian",
    text: "Apakah hewan ini asli Indonesia?",
    description: "Hewan yang berasal dan spesifik dari wilayah Indonesia",
  },
  {
    id: "largeBrained",
    text: "Apakah hewan ini memiliki kemampuan berpikir kompleks?",
    description: "Indikasi tingkat kecerdasan dan kapasitas otak hewan",
  },
  {
    id: "socialAnimal",
    text: "Apakah hewan ini hidup berkelompok?",
    description:
      "Kecenderungan hewan untuk berinteraksi dan hidup bersama sesamanya",
  },
];
