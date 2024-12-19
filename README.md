<div align="center">
  
# 🦁 Mammal Expert System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

🔍 An intelligent system for identifying Indonesian mammals through interactive Q&A

[Features](#features) •
[Screenshots](#screenshots) •
[How It Works](#how-it-works) •
[Installation](#installation) •
[Usage](#usage)

</div>

## ✨ Features

- 🤖 Interactive Q&A interface
- 📑 Category-based questioning system
- 🎯 Real-time prediction with accuracy scoring
- 📊 Detailed result display with characteristics breakdown
- 📱 Responsive design with mobile support
- 🖼️ Visual feedback with images

## 📸 Screenshots

#### Landing Page Screen

![Landing Page Screen](/screenshots/landing_page.png)
_Simple landing page_

#### Question Screen

![Question Screen](/screenshots/question.png)
_Interactive question interface with Yes/Maybe/No options_

#### Result Screen

![Result Screen](/screenshots/result.png)
_Detailed result display showing the identified mammal with characteristics_

#### No Match Screen

![No Match Screen](/screenshots/no-match.png)
_Screen shown when no matching mammal is found_

## 🦒 Supported Mammals

The system can identify the following mammals:

1. 🐬 Lumba-Lumba Hidung Botol (Bottlenose Dolphin)
2. 🐯 Harimau Sumatera (Sumatran Tiger)
3. 🐘 Gajah Asia (Asian Elephant)
4. 🦧 Orangutan
5. 🦇 Kelelawar Buah (Fruit Bat)
6. 🦏 Badak Jawa (Javan Rhinoceros)
7. 🐻 Beruang Madu (Sun Bear)
8. 🦌 Rusa Timor (Timor Deer)
9. 🦕 Trenggiling Jawa (Javan Pangolin)
10. 🐨 Kuskus (Cuscus)

## 🛠️ How It Works

### 🧮 Algorithm Overview

The expert system uses a weighted scoring algorithm to match user responses with mammal characteristics. Here's how it works:

1. **📁 Question Categories**
   The system organizes questions into six main categories:

   - 🏠 Tempat Tinggal (Habitat Type)
   - 🌳 Habitat (Specific Habitat)
   - 🍖 Jenis Makanan (Food Type)
   - 🦊 Bentuk Tubuh (Body Shape)
   - 🦁 Tingkah Laku (Behavior)
   - 🎨 Warna Tubuh (Body Color)

2. **📝 Response System**
   Users can provide three types of responses:

   - ✅ Ya (Yes) = 1
   - ❓ Mungkin (Maybe) = 0.5
   - ❌ Tidak (No) = 0

3. **⚡ Smart Category Skipping**

   - If a user answers "Yes" to a question in a category, the system automatically skips remaining questions in that category
   - This helps reduce the number of questions and makes the identification process more efficient

4. **🎯 Matching Algorithm**
   The system uses a sophisticated scoring mechanism:

   ```javascript
   matchScore calculation:
   - Perfect match (Both 1): +100 points
   - Partial match (0.5): +50 points
   - Correct negative match (Both 0): +100 points
   - Incorrect match: 0 points
   ```

5. **📊 Accuracy Calculation**
   ```javascript
   Accuracy = (Total Match Score / Maximum Possible Score) * 100
   ```

## 💻 Technical Implementation

### 🏗️ Data Structure

```typescript
interface Mammal {
  name: string;
  image: string;
  characteristics: {
    [key: string]: number; // 1 for yes, 0 for no
  };
}
```

### 🔑 Key Components

1. **❓ Question Manager**

   - Handles question flow and category progression
   - Implements smart skipping logic

2. **🎯 Matching Engine**

   - Processes user responses
   - Calculates match scores
   - Determines best matches

3. **📱 Result Display**
   - Shows matched mammal with confidence score
   - Displays relevant characteristics
   - Provides visual feedback

## 🎨 UI/UX Features

- 📊 Progress indication
- 🖼️ Visual feedback for responses
- 📱 Detailed results with images
- 📑 Characteristic breakdown in table format
- 📱 Mobile-responsive design
- 🔄 Option to restart the system

## 🛠️ Technologies Used

- ⚛️ React
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🎯 Lucide React (for icons)
- 🎨 Shadcn/ui components

## 🚀 Future Improvements

Potential enhancements could include:

- 📚 Expanding the mammal database
- 📝 Adding more detailed descriptions
- 🤖 Implementing machine learning for better matching
- 🌐 Adding multi-language support
- 🔊 Including sound samples
- 📊 Adding comparative analysis between similar species

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

<div align="center">
Made with ❤️ by RASCHWALTH
</div>
