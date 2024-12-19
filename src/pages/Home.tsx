import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check } from "lucide-react";

interface Mammal {
  name: string;
  image: string;
  uniqueCharacteristic: string;
  features: {
    habitat: string;
    diet: string;
    bodyShape: string;
    behavior: string;
    bodyColor: string;
    environment: string;
  };
}

interface Question {
  id: string;
  text: string;
  description: string;
  options: string[];
  category:
    | "habitat"
    | "diet"
    | "bodyShape"
    | "behavior"
    | "bodyColor"
    | "environment";
}

const MAMMALS: Mammal[] = [
  {
    name: "Lumba-Lumba Hidung Botol",
    image: "",
    uniqueCharacteristic: "Mamalia laut dengan kemampuan ekolokasi",
    features: {
      habitat: "pantai dan lautan",
      diet: "plankton dan ikan",
      bodyShape: "lonjong",
      behavior: "nocturnal",
      bodyColor: "abu-abu keputihan",
      environment: "air",
    },
  },
  {
    name: "Harimau Sumatra",
    image: "",
    uniqueCharacteristic: "Predator besar dengan loreng khas",
    features: {
      habitat: "hutan hujan besar",
      diet: "karnivora",
      bodyShape: "berat dengan cakar besar",
      behavior: "soliter",
      bodyColor: "orange dengan garis tiger",
      environment: "darat",
    },
  },
  {
    name: "Gajah Asia",
    image: "",
    uniqueCharacteristic: "Mamalia darat terbesar dengan belalai multiguna",
    features: {
      habitat: "hutan dan padang savana",
      diet: "herbivora",
      bodyShape: "besar dengan belalai",
      behavior: "kepekaan gerakan tinggi",
      bodyColor: "abu-abu",
      environment: "darat",
    },
  },
  {
    name: "Orangutan",
    image: "",
    uniqueCharacteristic: "Primata cerdas dengan kemampuan menggunakan alat",
    features: {
      habitat: "hutan hujan",
      diet: "omnivora",
      bodyShape: "kekar dengan tangan panjang",
      behavior: "soliter",
      bodyColor: "orange dengan rambut panjang",
      environment: "darat",
    },
  },
  {
    name: "Kelelawar Buah",
    image: "",
    uniqueCharacteristic: "Mamalia terbang pemakan buah",
    features: {
      habitat: "hutan dan area terbuka",
      diet: "frugivora",
      bodyShape: "berbulu",
      behavior: "nocturnal",
      bodyColor: "hitam dengan bercak kuning",
      environment: "darat",
    },
  },
  {
    name: "Badak Jawa",
    image: "",
    uniqueCharacteristic: "Memiliki satu cula dan kulit tebal berlapis",
    features: {
      habitat: "hutan bakau dan hutan",
      diet: "herbivora",
      bodyShape: "besar dengan kulit kasar",
      behavior: "soliter",
      bodyColor: "abu-abu kelabu",
      environment: "darat",
    },
  },
  {
    name: "Beruang Madu",
    image: "",
    uniqueCharacteristic: "Peraih madu ahli dengan cakar panjang",
    features: {
      habitat: "hutan hujan",
      diet: "omnivora",
      bodyShape: "tegap dengan cakar panjang",
      behavior: "soliter",
      bodyColor: "hitam dengan cincin kuning",
      environment: "darat",
    },
  },
  {
    name: "Rusa Timor",
    image: "",
    uniqueCharacteristic: "Memiliki tanduk indah dan lari gesit",
    features: {
      habitat: "hutan dan padang rumput",
      diet: "herbivora",
      bodyShape: "cepat dengan tanduk",
      behavior: "nocturnal",
      bodyColor: "coklat pudar dengan putih di perut",
      environment: "darat",
    },
  },
  {
    name: "Trenggiling Jawa",
    image: "",
    uniqueCharacteristic: "Tubuh bersisik yang dapat menggulung",
    features: {
      habitat: "hutan dan area terbuka",
      diet: "insektofag",
      bodyShape: "kecil dengan bulu perisai",
      behavior: "nocturnal",
      bodyColor: "berlian coklat",
      environment: "darat",
    },
  },
  {
    name: "Kuskus",
    image: "",
    uniqueCharacteristic: "Marsupial dengan ekor prehensil",
    features: {
      habitat: "hutan dan area bervegetasi",
      diet: "herbivora",
      bodyShape: "kecil dengan ekor panjang",
      behavior: "soliter",
      bodyColor: "abu-abu coklat",
      environment: "darat",
    },
  },
];

// Update the QUESTIONS array to match the new feature options
const QUESTIONS: Question[] = [
  {
    id: "habitat",
    text: "Di mana habitat utama hewan ini?",
    description: "Pilih tempat di mana hewan ini biasanya ditemukan",
    options: [
      "pantai dan lautan",
      "hutan hujan besar",
      "hutan dan padang savana",
      "hutan hujan",
      "hutan dan area terbuka",
      "hutan bakau dan hutan",
      "hutan dan padang rumput",
      "hutan dan area bervegetasi",
    ],
    category: "habitat",
  },
  {
    id: "diet",
    text: "Apa jenis makanan utama hewan ini?",
    description: "Pilih jenis makanan yang paling sesuai dengan hewan ini",
    options: [
      "plankton dan ikan",
      "karnivora",
      "herbivora",
      "omnivora",
      "frugivora",
      "insektofag",
    ],
    category: "diet",
  },
  {
    id: "bodyShape",
    text: "Bagaimana bentuk tubuh hewan ini?",
    description: "Pilih karakteristik bentuk tubuh yang paling menonjol",
    options: [
      "lonjong",
      "berat dengan cakar besar",
      "besar dengan belalai",
      "kekar dengan tangan panjang",
      "berbulu",
      "besar dengan kulit kasar",
      "tegap dengan cakar panjang",
      "cepat dengan tanduk",
      "kecil dengan bulu perisai",
      "kecil dengan ekor panjang",
    ],
    category: "bodyShape",
  },
  {
    id: "behavior",
    text: "Bagaimana perilaku utama hewan ini?",
    description: "Pilih perilaku yang paling khas dari hewan ini",
    options: ["nocturnal", "soliter", "kepekaan gerakan tinggi"],
    category: "behavior",
  },
  {
    id: "bodyColor",
    text: "Apa warna dominan hewan ini?",
    description: "Pilih warna yang paling menonjol pada hewan ini",
    options: [
      "abu-abu keputihan",
      "orange dengan garis tiger",
      "abu-abu",
      "orange dengan rambut panjang",
      "hitam dengan bercak kuning",
      "abu-abu kelabu",
      "hitam dengan cincin kuning",
      "coklat pudar dengan putih di perut",
      "berlian coklat",
      "abu-abu coklat",
    ],
    category: "bodyColor",
  },
  {
    id: "environment",
    text: "Di lingkungan mana hewan ini beraktivitas?",
    description: "Pilih lingkungan utama tempat hewan ini hidup",
    options: ["darat", "air"],
    category: "environment",
  },
];

// Decision Tree Node interface
interface DecisionTreeNode {
  feature?: string;
  value?: string;
  prediction?: Mammal;
  left?: DecisionTreeNode;
  right?: DecisionTreeNode;
  children?: { [key: string]: DecisionTreeNode };
}

interface PredictionResult {
  mammal: Mammal;
  accuracy: number;
  featureMatches: {
    feature: string;
    matched: boolean;
    userAnswer: string;
    actualValue: string;
  }[];
}

// Label Encoder class
class LabelEncoder {
  private labels: Map<string, number>;
  private decodings: Map<number, string>;

  constructor() {
    this.labels = new Map();
    this.decodings = new Map();
  }

  fit(values: string[]): void {
    const uniqueValues = Array.from(new Set(values));
    uniqueValues.sort();
    uniqueValues.forEach((value, index) => {
      this.labels.set(value, index);
      this.decodings.set(index, value);
    });
  }

  transform(value: string): number {
    const encoded = this.labels.get(value);
    if (encoded === undefined) {
      throw new Error(`Unknown label: ${value}`);
    }
    return encoded;
  }

  inverse_transform(value: number): string {
    const decoded = this.decodings.get(value);
    if (decoded === undefined) {
      throw new Error(`Unknown encoding: ${value}`);
    }
    return decoded;
  }

  get_labels(): string[] {
    return Array.from(this.labels.keys());
  }
}

// Feature encoders
interface FeatureEncoders {
  [key: string]: LabelEncoder;
}

// Modified RandomForest class with encoding support
class RandomForest {
  private trees: DecisionTreeNode[];
  private numTrees: number;
  private encoders: FeatureEncoders;

  constructor(numTrees: number = 5) {
    this.trees = [];
    this.numTrees = numTrees;
    this.encoders = this.initializeEncoders();
    this.buildForest();
  }

  private initializeEncoders(): FeatureEncoders {
    const encoders: FeatureEncoders = {};
    const features = [
      "habitat",
      "diet",
      "bodyShape",
      "behavior",
      "bodyColor",
      "environment",
    ];

    features.forEach((feature) => {
      encoders[feature] = new LabelEncoder();
      const values = MAMMALS.map(
        (m) => m.features[feature as keyof typeof m.features]
      );
      encoders[feature].fit(values);
    });

    return encoders;
  }

  private encodeFeatures(
    features: Record<string, string>
  ): Record<string, number> {
    const encoded: Record<string, number> = {};
    Object.entries(features).forEach(([feature, value]) => {
      encoded[feature] = this.encoders[feature].transform(value);
    });
    return encoded;
  }

  private buildForest(): void {
    for (let i = 0; i < this.numTrees; i++) {
      const tree = this.buildDecisionTree(this.getRandomFeatureSubset());
      this.trees.push(tree);
    }
  }

  private getRandomFeatureSubset(): string[] {
    const allFeatures = [
      "habitat",
      "diet",
      "bodyShape",
      "behavior",
      "bodyColor",
      "environment",
    ];
    const numFeatures = Math.floor(Math.random() * 3) + 2; // Random 2-4 features
    const shuffled = [...allFeatures].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numFeatures);
  }

  private buildDecisionTree(features: string[]): DecisionTreeNode {
    const root: DecisionTreeNode = {};

    if (features.length === 0) {
      return root;
    }

    const feature = features[0];
    root.feature = feature;
    root.children = {};

    // Use encoded values for building the tree
    const encoder = this.encoders[feature];
    const encodedValues = new Set(
      MAMMALS.map((m) =>
        this.encoders[feature].transform(
          m.features[feature as keyof typeof m.features]
        )
      )
    );

    encodedValues.forEach((encodedValue) => {
      const decodedValue = encoder.inverse_transform(encodedValue);
      const subset = MAMMALS.filter(
        (m) => m.features[feature as keyof typeof m.features] === decodedValue
      );

      if (subset.length === 0) {
        return;
      }

      if (subset.length === 1 || features.length === 1) {
        root.children![decodedValue] = {
          prediction: subset[0],
        };
      } else {
        root.children![decodedValue] = this.buildDecisionTree(
          features.slice(1)
        );
      }
    });

    return root;
  }

  private calculateSimilarity(
    mammal: Mammal,
    answers: Record<string, string>
  ): number {
    let matches = 0;
    let total = 0;

    Object.entries(answers).forEach(([feature, value]) => {
      const encodedAnswer = this.encoders[feature].transform(value);
      const encodedFeature = this.encoders[feature].transform(
        mammal.features[feature as keyof typeof mammal.features]
      );
      if (encodedAnswer === encodedFeature) {
        matches++;
      }
      total++;
    });

    return total === 0 ? 0 : matches / total;
  }

  predict(answers: Record<string, string>): PredictionResult {
    // Use encodeFeatures method to encode the answers
    const encodedAnswers = this.encodeFeatures(answers);

    const predictions = this.trees.map(
      (tree) => this.traverseTree(tree, answers) // We still pass original answers for tree traversal
    );
    const predictionCounts = new Map<Mammal, number>();

    predictions.forEach((pred) => {
      if (pred) {
        const count = predictionCounts.get(pred) || 0;
        predictionCounts.set(pred, count + 1);
      }
    });

    let bestMammal: Mammal | null = null;
    let maxCount = 0;

    predictionCounts.forEach((count, mammal) => {
      if (count > maxCount) {
        maxCount = count;
        bestMammal = mammal;
      }
    });

    const predictedMammal = bestMammal || this.fallbackPrediction(answers);

    // Use encoded answers in feature matching
    const featureMatches = Object.entries(answers).map(
      ([feature, userAnswer]) => {
        const encodedUserAnswer = encodedAnswers[feature];
        const encodedActualValue = this.encoders[feature].transform(
          predictedMammal.features[
            feature as keyof typeof predictedMammal.features
          ]
        );

        return {
          feature,
          matched:
            predictedMammal.features[
              feature as keyof typeof predictedMammal.features
            ] === userAnswer,
          userAnswer,
          actualValue:
            predictedMammal.features[
              feature as keyof typeof predictedMammal.features
            ],
          encodedUserAnswer,
          encodedActualValue,
        };
      }
    );

    const accuracy =
      (featureMatches.filter((match) => match.matched).length /
        featureMatches.length) *
      100;

    return {
      mammal: predictedMammal,
      accuracy,
      featureMatches,
    };
  }

  private traverseTree(
    node: DecisionTreeNode,
    answers: Record<string, string>
  ): Mammal | null {
    if (node.prediction) {
      return node.prediction;
    }

    if (!node.feature || !node.children) {
      return null;
    }

    const answer = answers[node.feature];
    if (!answer) {
      return null;
    }

    const nextNode = node.children[answer];
    if (!nextNode) {
      return null;
    }

    return this.traverseTree(nextNode, answers);
  }

  private fallbackPrediction(answers: Record<string, string>): Mammal {
    let bestMammal = MAMMALS[0];
    let bestSimilarity = 0;

    MAMMALS.forEach((mammal) => {
      const similarity = this.calculateSimilarity(mammal, answers);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMammal = mammal;
      }
    });

    return bestMammal;
  }

  // Add method to get encoded values for debugging/display
  getEncodedValue(feature: string, value: string): number {
    return this.encoders[feature].transform(value);
  }
}

// Modified MammalExpertSystem component to show encoded values
const MammalExpertSystem = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [randomForest] = useState(() => new RandomForest(5));

  const handleAnswer = (answer: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.category]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const result = randomForest.predict(newAnswers);
      setPredictionResult(result);
    }
  };

  const resetSystem = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setPredictionResult(null);
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] mt-8 px-4">
      <Card className="bg-white p-6 md:p-10 w-full max-w-xl flex items-center justify-center">
        {!predictionResult ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {currentQuestion.text}
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              {currentQuestion.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full justify-center py-3 bg-green"
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500 text-end">
              Pertanyaan{" "}
              <span className="font-bold">{currentQuestionIndex + 1}</span> dari{" "}
              <span className="font-bold">{QUESTIONS.length}</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {predictionResult.mammal.name}
              </h2>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-600">
                  Akurasi Prediksi: <br />
                  <span className="font-bold text-4xl text-green">
                    {predictionResult.accuracy.toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>

            <p className="mb-6">
              {predictionResult.mammal.uniqueCharacteristic}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-4">Detail Karakteristik:</h3>
              <div className="space-y-3">
                {predictionResult.featureMatches.map(
                  ({ feature, matched, userAnswer, actualValue }) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between p-2 rounded bg-gray-50"
                    >
                      <span className="font-medium capitalize">{feature}:</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            matched ? "text-green-600" : "text-red-600"
                          }
                        >
                          {actualValue}
                        </span>
                        {!matched && (
                          <span className="text-sm text-gray-500">
                            (Jawaban: {userAnswer})
                          </span>
                        )}
                        {matched ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button onClick={resetSystem} className="mt-4">
              Mulai Ulang
            </Button>
          </div>
        )}
      </Card>
    </header>
  );
};

export default MammalExpertSystem;
