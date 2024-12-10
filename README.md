# Meliyo

Meliyo is an entertainment app that allows users to connect with famous personalities by requesting personalized video messages for themselves or their loved ones. The app is available for iOS and Android, offering a seamless user experience, secure payment processing, and multi-language support.

---

## Features

- **Personalized Video Requests**: Users can request and receive custom video messages from celebrities.
- **Secure Payments**: Integrated payment system for easy and safe transactions.
- **Multi-Language Support**: App localization powered by `i18next`.
- **User-Friendly Interface**: Intuitive design with responsive layouts for all screen sizes.
- **Rich Animations**: Enhanced user experience with smooth animations using `react-native-reanimated`.

---

## Tech Stack

- **Frontend**: React Native
- **State Management**: MobX
- **Routing**: React Navigation
- **Localization**: `i18next`
- **HTTP Client**: Axios
- **Utility Libraries**: Lodash, Moment.js
- **UI Components**: Custom components enhanced with libraries like `react-native-modal`, `react-native-vector-icons`, and `gifted-charts`.

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Android Studio (for Android development)
- Xcode (for iOS development)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/vusales/meliyo_public.git
   cd meliyo
2. Install dependencies:
 ```bash
npm install
# or
yarn install
3. Run the app:
 ```bash
npm run android
# or
npm run ios

### Project Structure

meliyo/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/              # Main application code
│   ├── assets/       # Static assets like images and fonts
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── navigation/   # Navigation configurations
│   ├── screens/      # App screens
│   ├── stores/       # MobX stores for state management
│   ├── styles/       # Global styles and themes
│   └── utils/        # Helper utilities and constants
├── .eslintrc.js      # ESLint configuration
├── babel.config.js   # Babel configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation





