# 📈 Stock Analysis Dashboard

A modern **Full-Stack Stock Analysis Dashboard** that screens **Nifty 500** stocks using technical analysis, enables users to manage watchlists and portfolios, compare multiple stocks, visualize stock screening results, and export reports.

Built with **React**, **Material UI**, **FastAPI**, **Python**, **Pandas**, **Yahoo Finance**, and **Recharts**.

---
## ✨ Project Highlights

- Full Stack Application
- FastAPI REST APIs
- React + Material UI Dashboard
- Nifty 500 Technical Screener
- Company Profile Dashboard
- Scheduler-based Stock Refresh
- Hybrid RAM + JSON Cache
- CSV & PDF Export
- Responsive Design
- Deployed on Vercel & Render

## 🚀 Features

### 📊 Stock Screener
- Screen Nifty 500 stocks using technical indicators
- Custom stock scoring system (0–6)
- Search stocks by symbol
- Minimum Score Filter
- Sector Filter
- Responsive Data Table
- Interactive Stock Details
- Company Profile Dashboard
- Real-time Company Fundamentals
- Company Statistics & Financial Ratios
- Automatic Background Stock Cache Refresh
- Intelligent RAM + JSON Company Profile Caching
- Automatic Yahoo Finance Fallback Handling

### ⭐ Watchlist
- Add / Remove stocks
- Search within watchlist
- LocalStorage persistence

### 💼 Portfolio Tracker
- Add stock holdings
- Track quantity & buy price
- Investment summary
- Current portfolio value
- Profit / Loss calculation
- Remove holdings

### ⚖️ Compare Stocks
- Compare up to 5 stocks
- Side-by-side technical comparison
- Responsive comparison cards
- Searchable stock selector

### 📈 Charts
- Score Distribution Chart
- Interactive multi-color bar chart
- Responsive visualization

### 📰 Latest News
- Company-specific latest news
- News links from reliable financial sources

### 📄 Export
- Export Screener Results to CSV
- Export Screener Results to PDF

### 🎨 UI Highlights
- Modern Dark Theme
- Fully Responsive Layout
- Material UI Components
- Smooth Animations
- Clean Dashboard Design

---

# 📊 Screening Strategy

Each stock is evaluated using six technical conditions.

| Condition | Description |
|------------|-------------|
| ✅ SMA150 > EMA220 | Long-term bullish trend |
| ✅ Close > SMA50 | Price above short-term moving average |
| ✅ SMA50 > SMA150 | Bullish moving average crossover |
| ✅ Price > 1.25 × 52 Week Low | Strong recovery from lows |
| ✅ EMA220 Dip | Price dipped below EMA220 recently |
| ✅ Breakout | Break above previous 52-week high |

Each satisfied condition contributes **1 point**.

Maximum Score:

```
6 / 6
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Material UI
- React Router DOM
- Axios
- Recharts

## Backend

- Python
- FastAPI
- Pandas
- NumPy
- Yahoo Finance (yfinance)
- BeautifulSoup
- APScheduler

## Storage

- LocalStorage
- In-Memory Cache
- JSON Cache
- CSV Metadata (Nifty 500)

---

# 📁 Project Structure

```
StockAnalysis
│
├── backend
│   ├── routers
│   ├── services
│   ├── data
│   ├── app.py
│   ├── Config.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── screenshots
│
├── README.md
├── render.yaml
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Abinash2648/StockAnalysis.git

cd StockAnalysis
```
# 🌐 Live Demo

### Frontend (Vercel)

https://stock-analysis-blue.vercel.app

### Backend (Render)

https://stockanalysis-j2cu.onrender.com

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs at:

```
https://stockanalysis-j2cu.onrender.com
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
https://stock-analysis-blue.vercel.app
```

---

# 📸 Screenshots

## 📊 Dashboard

screenshots/Dashboard1.png

screenshots/Dashboard2.png

screenshots/Dashboard3.png

screenshots/Dashboard4.png

screenshots/Dashboard5.png

screenshots/Dashboard6.png

screenshots/Dashboard7.png

---

## 💼 Portfolio

screenshots/Portfolio.png

---

## ⭐ Watchlist

screenshots/Watchlist.png

---

## ⚖️ Compare Stocks

screenshots/Compare_stocks1.png

screenshots/Compare_stocks2.png
---

# 📤 Export Features

- 📄 Export to CSV
- 📑 Export to PDF

---

# 🔮 Future Enhancements

- User Authentication
- Cloud Database Integration
- Portfolio Performance Analytics
- AI-based Stock Recommendations
- News Sentiment Analysis
- Email Alerts
- Live WebSocket Stock Updates

---

# 📌 Notes

- Screens Nifty 500 stocks using technical indicators.
- Historical market data is fetched from Yahoo Finance.
- Company profiles use hybrid RAM + JSON caching.
- Automatic scheduler refreshes stock data.
- Portfolio and Watchlist are stored locally using LocalStorage.
- Fully responsive React dashboard.

---
# ⚡ Caching Strategy

The application uses a hybrid caching architecture to reduce Yahoo Finance requests and improve performance.

Request Flow

RAM Cache
↓

JSON Cache
↓

Yahoo Finance
↓

Success
↓

Update RAM Cache
↓

Update JSON Cache
↓

Return Latest Data

If Yahoo Finance is unavailable or rate-limited, the application automatically serves cached company profile data from RAM/JSON, ensuring uninterrupted access.

# ☁️ Deployment

Frontend:
- Vercel

Backend:
- Render

Data Source:
- Yahoo Finance

Automatic Scheduler:
- Refreshes stock cache periodically

# 👨‍💻 Author

**Abinash Mishra**

Java Full Stack Developer | Python Full Stack Developer

**GitHub**

https://github.com/Abinash2648

**LinkedIn**

www.linkedin.com/in/abinash-mishra-112529248

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.