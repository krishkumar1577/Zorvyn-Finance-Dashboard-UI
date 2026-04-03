# Zorvyne UI Finance Dashboard

A modern finance dashboard for tracking income, expenses, and financial insights. Built with React and styled with Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## What Can You Do?

✅ **View Dashboard** - See your balance, income, and spending breakdown
✅ **Manage Transactions** - Add, search, edit, and delete transactions
✅ **Apply Filters** - Filter by date range, category, or search keywords
✅ **Switch Roles** - Try "Viewer" or "Admin" mode (sidebar menu)
✅ **View Reports** - Check financial scores and download reports
✅ **Explore Insights** - See spending patterns and financial observations

## Tech Stack

- React 19 with TypeScript
- Vite (fast build tool)
- Tailwind CSS v4 (styling)

## Project Structure

```
src/
├── pages/              # Page views
│   ├── DashboardPage   # Main overview
│   ├── TransactionsPage # Transaction management
│   ├── InsightsPage    # Financial insights
│   ├── ReportsPage     # Reports & exports
│   └── LandingPage     # Welcome page
├── components/         # Reusable UI components
├── types/              # TypeScript data types
└── utils/              # Helper functions
public/
└── data.json          # Mock data (no backend)
```

## Features

### Dashboard
- Balance over time chart
- Spending by category
- Quick summary cards

### Transactions
- View all transactions in a table
- Search by description, merchant, category, or account
- Filter by date range
- Edit transaction details
- Delete transactions (with confirmation)
- Add new transactions (Admin only)

### Insights
- See where your money goes
- Month-over-month spending comparison
- Category breakdown with percentages

### Reports
- Financial health score
- Key metrics (assets, savings, etc.)
- Monthly archive history
- Export data as JSON or CSV
- Share snapshots via clipboard

### Role-Based Access
- **Admin**: Full access to all features
- **Viewer**: Can view everything but cannot edit/delete/add

## Build & Deploy

```bash
npm run build
```

Outputs to `dist/` folder for production deployment.

## Currency

All amounts are displayed in **Indian Rupees (₹)**

## Notes

- This is a frontend-only demo (no real backend)
- All data is from `public/data.json`
- Changes don't persist between sessions
- Made for learning React patterns and UI design

