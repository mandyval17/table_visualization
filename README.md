# Sales Dashboard Application

This is a **React-based Sales Dashboard** application built using **Vite**, offering a modern, fast, and user-friendly interface for managing and analyzing sales data.

---

## 🚀 Features

- 📊 Sales dashboard with analytics and data tables
- 🔍 Filtering and sorting capabilities for data tables
- ➕ Add and ➖ delete sales data functionality
- 📱 Fully responsive design using **Tailwind CSS**

---

## 🛠️ Tech Stack

- **React** + **Vite** – Fast development and optimized builds
- **PrimeReact** – UI components library
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Zod** – Schema validation
- **React Hook Form** – Form state management and validation

---

## 📁 Directory Structure

```
src/
│
├── components/                      # Reusable React components
│   ├── sales-dashboard/            # Dashboard-specific components
│   │   ├── analytics-panel.jsx     # Sales analytics panel
│   │   ├── data-table-panel.jsx    # Sales data table panel
│   │   ├── dashboard.jsx           # Main dashboard view
│   │   ├── sale-dialog.jsx         # Dialog for adding/editing sales
│   │   ├── summary-card.jsx        # Card for summary stats
│   │   └── tab.jsx                 # Tab component
│   └── table/                      # (Not currently used)
│
├── App.jsx                         # Main application component
├── index.css                       # Global styles
├── main.jsx                        # App entry point
│
public/
└── index.html                      # HTML entry point

vite.config.js                      # Vite configuration
package.json                        # Project dependencies and scripts
README.md                           # Project overview (this file)
```

---

## 🚦 Getting Started

Visit the live application here: 👉 [https://table-visualization.vercel.app/](https://table-visualization.vercel.app/)

To run the app locally:

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd sales-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the App**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.
