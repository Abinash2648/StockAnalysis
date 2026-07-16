# 📈 Stock Analysis Dashboard

A modern **Full-Stack Stock Analysis Dashboard** that screens **Nifty 500** stocks using technical analysis, enables users to manage watchlists and portfolios, compare multiple stocks, visualize stock screening results, and export reports.

Built with **React**, **Material UI**, **FastAPI**, **Python**, **Pandas**, **Yahoo Finance**, and **Recharts**.

---

## 🚀 Features

### 📊 Stock Screener
- Screen Nifty 500 stocks using technical indicators
- Custom stock scoring system (0–6)
- Search stocks by symbol
- Minimum Score Filter
- Sector Filter
- Responsive Data Table
- Interactive Stock Details

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

## Storage

- LocalStorage
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
http://127.0.0.1:8000
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
http://localhost:5173
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

- Live Stock Price Updates
- User Authentication
- Portfolio Performance Charts
- AI-based Stock Recommendations
- News Sentiment Analysis
- Historical Portfolio Analytics
- Cloud Database Integration

---

# 📌 Notes

- Sector metadata is loaded from the official Nifty 500 constituent dataset.
- Historical stock data is fetched from Yahoo Finance.
- Portfolio and Watchlist are stored locally using LocalStorage.
- Designed with a responsive UI for desktop and tablet devices.

---

# 👨‍💻 Author

**Abinash Mishra**

Java Full Stack Developer | Python Developer | React Developer

**GitHub**

https://github.com/Abinash2648

**LinkedIn**

www.linkedin.com/in/abinash-mishra-112529248

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.