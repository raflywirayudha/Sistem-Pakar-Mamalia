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
    id: "b1",
    text: "Apakah hewan ini termasuk mamalia?",
    description: "Hewan yang menyusui anaknya dan berdarah panas",
  },
  {
    id: "b2",
    text: "Apakah hewan ini hidup di pantai dan lautan?",
    description: "Habitat utamanya adalah wilayah pantai dan perairan laut",
  },
  {
    id: "b3",
    text: "Apakah hewan ini hidup di hutan hujan?",
    description: "Habitat utamanya adalah kawasan hutan hujan",
  },
  {
    id: "b4",
    text: "Apakah hewan ini hidup di padang savana/rumput?",
    description: "Habitat utamanya adalah area padang rumput atau savana",
  },
  {
    id: "b5",
    text: "Apakah hewan ini hidup di area terbuka?",
    description:
      "Habitat utamanya adalah area terbuka atau tidak berhutan lebat",
  },
  {
    id: "b6",
    text: "Apakah hewan ini hidup di hutan bakau?",
    description: "Habitat utamanya adalah kawasan hutan bakau atau mangrove",
  },
  {
    id: "b7",
    text: "Apakah hewan ini memakan plankton dan ikan?",
    description: "Makanan utamanya adalah plankton dan ikan-ikan kecil",
  },
  {
    id: "b8",
    text: "Apakah hewan ini karnivora?",
    description: "Hewan pemakan daging atau predator",
  },
  {
    id: "b9",
    text: "Apakah hewan ini herbivora?",
    description: "Hewan pemakan tumbuhan",
  },
  {
    id: "b10",
    text: "Apakah hewan ini omnivora?",
    description: "Hewan pemakan tumbuhan dan daging",
  },
  {
    id: "b11",
    text: "Apakah hewan ini frugivora?",
    description: "Hewan pemakan buah-buahan",
  },
  {
    id: "b12",
    text: "Apakah hewan ini insektivora?",
    description: "Hewan pemakan serangga",
  },
  {
    id: "b13",
    text: "Apakah hewan ini memiliki bentuk tubuh lonjong?",
    description: "Bentuk tubuh memanjang dan streamline",
  },
  {
    id: "b14",
    text: "Apakah hewan ini berat dan memiliki cakar besar?",
    description: "Tubuh besar dan memiliki cakar yang kuat",
  },
  {
    id: "b15",
    text: "Apakah hewan ini besar dan memiliki belalai?",
    description: "Tubuh besar dan memiliki belalai panjang",
  },
  {
    id: "b16",
    text: "Apakah hewan ini kekar dan memiliki tangan panjang?",
    description: "Tubuh kekar dengan lengan yang panjang",
  },
  {
    id: "b17",
    text: "Apakah hewan ini berbulu?",
    description: "Tubuh ditutupi oleh bulu",
  },
  {
    id: "b18",
    text: "Apakah hewan ini besar dan memiliki kulit kasar?",
    description: "Tubuh besar dengan kulit yang tebal dan kasar",
  },
  {
    id: "b19",
    text: "Apakah hewan ini tegap dan memiliki cakar panjang?",
    description: "Tubuh tegap dengan cakar yang panjang",
  },
  {
    id: "b20",
    text: "Apakah hewan ini cepat dan memiliki tanduk?",
    description: "Tubuh ramping, gesit dan memiliki tanduk",
  },
  {
    id: "b21",
    text: "Apakah hewan ini kecil dan memiliki bulu perisai?",
    description: "Tubuh kecil dengan sisik keras seperti perisai",
  },
  {
    id: "b22",
    text: "Apakah hewan ini kecil dan memiliki ekor panjang?",
    description: "Tubuh kecil dengan ekor yang panjang",
  },
  {
    id: "b23",
    text: "Apakah hewan ini nokturnal?",
    description: "Aktif di malam hari",
  },
  {
    id: "b24",
    text: "Apakah hewan ini soliter?",
    description: "Hidup menyendiri atau tidak berkelompok",
  },
  {
    id: "b25",
    text: "Apakah hewan ini memiliki kepekaan gerakan tinggi?",
    description:
      "Sangat sensitif terhadap gerakan dan memiliki refleks yang baik",
  },
  {
    id: "b26",
    text: "Apakah hewan ini berwarna abu-abu keputihan?",
    description: "Warna tubuh dominan abu-abu terang atau keputihan",
  },
  {
    id: "b27",
    text: "Apakah hewan ini berwarna orange dengan garis/belang?",
    description: "Warna tubuh orange dengan pola belang hitam",
  },
  {
    id: "b28",
    text: "Apakah hewan ini berwarna abu-abu?",
    description: "Warna tubuh dominan abu-abu",
  },
  {
    id: "b29",
    text: "Apakah hewan ini berwarna orange dengan rambut panjang?",
    description: "Warna tubuh orange dan memiliki rambut yang panjang",
  },
  {
    id: "b30",
    text: "Apakah hewan ini berwarna hitam dengan bercak kuning?",
    description: "Warna tubuh hitam dengan bintik atau bercak kuning",
  },
  {
    id: "b31",
    text: "Apakah hewan ini berwarna abu-abu kelabu?",
    description: "Warna tubuh dominan abu-abu gelap atau kelabu",
  },
  {
    id: "b32",
    text: "Apakah hewan ini berwarna hitam dengan cincin kuning?",
    description: "Warna tubuh hitam dengan pola cincin berwarna kuning",
  },
  {
    id: "b33",
    text: "Apakah hewan ini berwarna coklat pudar dengan putih?",
    description: "Warna tubuh coklat muda dengan bagian putih di tubuhnya",
  },
  {
    id: "b34",
    text: "Apakah hewan ini berwarna coklat berlian?",
    description: "Warna tubuh coklat mengkilap seperti berlian",
  },
  {
    id: "b35",
    text: "Apakah hewan ini berwarna abu-abu coklat?",
    description: "Warna tubuh campuran abu-abu dan coklat",
  },
  {
    id: "b36",
    text: "Apakah hewan ini hidup di air?",
    description: "Menghabiskan sebagian besar hidupnya di dalam air",
  },
  {
    id: "b37",
    text: "Apakah hewan ini hidup di darat?",
    description: "Menghabiskan sebagian besar hidupnya di daratan",
  },
];
