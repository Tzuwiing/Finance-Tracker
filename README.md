💰 Finance Tracker Maximum

A comprehensive, modern, and highly responsive personal finance management application built with React, Vite, and Tailwind CSS, strictly adhering to the Atomic Design Architecture.

Finance Tracker Maximum allows users to manage multi-wallet balances, monitor income and expenses with dynamic charts, set budget limits, track savings goals, and generate actionable financial insights.

✨ Key Features

📊 Interactive Financial Analytics: Visualize balance trends, expense breakdowns, and monthly financial summaries using custom charts.

💳 Multi-Wallet Support: Manage balances across multiple accounts (Cash, Bank, E-Wallet, Credit Card).

💸 Transaction Management: Easily record income and expenses with categories, notes, dates, and wallet assignments.

🎯 Financial Goals: Set long-term or short-term savings targets with real-time progress tracking.

📉 Budget Planning: Set monthly spending limits per category and track your budget limits.

💡 Smart Financial Insights: Get automatic financial highlights and spending alerts based on your habits.

📁 Data Import & Export: Full ownership of your data with JSON & CSV import/export capabilities.

🌓 Appearance Customization: Light/Dark theme switching with smooth UI transitions.

📱 Responsive & Mobile-First: Adaptive layout with a bottom navigation bar for mobile devices and a sidebar for desktop screens.

🏗️ Project Architecture (Atomic Design)

The codebase is structured according to Atomic Design principles to ensure modularity, scalability, and clean code separation:

finance-tracker-maximum/
├── src/
│   ├── components/
│   │   ├── atoms/         # Base components (Button, Card, Badge, Modal, Field, MoneyInput, ProgressBar)
│   │   ├── molecules/     # Combined atoms (StatCard, WalletCard, GoalCard, TransactionItem, MonthPicker)
│   │   ├── organisms/     # Complex UI modules (ExpenseChart, TrendChart, TransactionForm, GoalsPanel)
│   │   └── templates/     # Page structural layouts (DashboardLayout, Sidebar, BottomNav, TopBar)
│   ├── context/           # Global Context Providers (FinanceContext, UiContext)
│   ├── hooks/             # Custom React hooks (useFinance, useTxActions, useMoney, usePeriodData)
│   ├── pages/             # Route views (DashboardPage, TransactionsPage, BudgetPage, GoalsPage, ReportsPage, SettingsPage)
│   ├── utils/             # Helper utilities (storage, formatters, stats, sampleData, exporters)
│   ├── constants/         # Fixed definitions (categories, wallets, page routes)
│   ├── App.jsx            # Main Application Shell
│   └── main.jsx           # Application Entry Point


🛠️ Tech Stack

Frontend Framework: React 18+

Build Tool: Vite

Styling: Tailwind CSS & PostCSS

State Management: React Context API & Custom Hooks

Icons: Lucide Icons / SVG System

Persistence: Browser LocalStorage with automatic fallback and sample data seeder

🚀 Getting Started

Prerequisites

Ensure you have the following installed on your local machine:

Node.js (v18.0.0 or higher recommended)

npm or yarn / pnpm

Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/finance-tracker-maximum.git
cd finance-tracker-maximum


Install dependencies:

npm install


Start the development server:

npm run dev


Open in browser:
Navigate to http://localhost:5173 (or the URL shown in your terminal).

📜 Available Scripts

In the project directory, you can run:

npm run dev: Runs the app in development mode with Hot Module Replacement (HMR).

npm run build: Compiles and optimizes the app for production in the dist folder.

npm run preview: Previews the production build locally.

npm run lint: Runs ESLint to check for code quality issues.

🌐 Deployment

Deploying to Vercel

Push your code to GitHub.

Go to Vercel Dashboard and click Add New Project.

Import your GitHub repository.

Set Root Directory to finance-tracker-maximum (if nested in a subfolder).

Click Deploy. Vercel will automatically detect Vite and build the application.

📄 License

This project is open-source and available under the MIT License.
