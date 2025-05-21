# WTWR - What to Wear Right Now

This repository contains the React front-end for the **WTWR** project—a weather-based clothing recommendation application designed to help users choose the perfect outfit for any weather condition.

---

## 🚀 **Features**

### **Optimized React + Vite Setup**

- Built using **Vite** for fast development and seamless hot module replacement (HMR).

### **State Management**

- Efficient handling of user interactions and clothing recommendations ensures smooth functionality.

---

## ⭐ **Key Features**

- **Weather Integration**: Real-time weather data fetching and display
- **Smart Clothing Recommendations**: Suggests appropriate clothing based on current weather
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius
- **Clothing Management**:
  - Add new clothing items with image URLs
  - View clothing details in a modal
  - Delete unwanted items
  - Categorize clothes by weather type
- **Profile Page**: Personal clothing collection management
- **Responsive Modals**: Interactive dialogs for adding, viewing, and deleting items

---

## 🛠️ **Technologies Used**

- **React**: Frontend framework for dynamic and scalable user interfaces.
- **Vite**: High-speed development environment for optimized builds.
- **ESLint & Prettier**: Enforces consistent code formatting and linting for clean, readable code.
- **CSS**: Provides responsive and visually appealing styling.
- **JavaScript**: Powers core functionality and interactivity.

---

## 🎨 **Components**

- **Header**: Navigation and temperature unit toggle
- **Main**: Weather display and clothing recommendations
- **Profile**: Personal clothing collection management
- **Modals**: AddItemModal, ItemModal, and DeleteModal for item management
- **WeatherCard**: Displays current weather conditions
- **ClothesSection**: Organizes and displays clothing items

---

## Setup & Deployment Instructions

### 1. Backend Setup (Important!)

Before running the frontend, you must start the backend server:

1. Install JSON Server globally (if not already installed):

   ```bash
   npm install -g json-server@0.17.4
   ```

   Note: This project requires JSON Server version 0.17.0 to ensure compatibility with the reviewer's environment.

2. Start the backend server:
   ```bash
   json-server --watch db.json --id _id --port 3001
   ```
3. The backend will be running at `http://localhost:3001`
   - Note: The delete functionality will only work when the backend server is running!

### 2. Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser

### Important Notes

- The delete functionality requires the backend server to be running
- If items are not deleting, please ensure the backend server (json-server) is running on port 3001
- Both servers (frontend and backend) need to be running simultaneously for full functionality

---

## 📜 **License**

📌 Maintained by: [iiBamBlue](https://github.com/iiBamBlue)
💡 Bootcamp: [TripleTen](https://tripleten.com/)
🔧 License: [MIT License](LICENSE)

---
