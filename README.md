# Carbon Budget Web - 1.5°C Climate Countdown

This is a simple, single-page web application that displays the time remaining to limit global warming to 1.5°C, based on data from the [Climate Clock](https://climateclock.world/).

The goal of this project is to provide a clear and accessible visualization of the urgency of climate action.

## ✨ Features

- **Real-time Countdown:** Displays a live countdown for the 1.5°C carbon budget in years, days, hours, minutes, and seconds.
- **Dynamic Visualization:** Uses circular progress bars to visualize the passing of time for hours, minutes, and seconds.
- **NASA Visualization:** Includes an embedded NASA video showing global temperature anomalies from 1880 to 2021 to provide historical context.
- **Responsive Design:** The layout is optimized for viewing on both desktop and mobile devices.
- **Automatic Data Refresh:** The countdown data is automatically fetched from the Climate Clock API every hour to ensure accuracy.

## 🛠️ Technology Stack

- **HTML5**
- **CSS3** (with Google Fonts for typography)
- **Vanilla JavaScript** (ES6+)

## ⚙️ How It Works

The application fetches data from the public Climate Clock API (`https://api.climateclock.world/v2/clock.json`). The JavaScript then calculates the remaining time from the "carbon_deadline_1" module timestamp and updates the clock display every second.

## 📊 Data Source

- **Countdown Data:** [Climate Clock](https://climateclock.world/)
- **Temperature Anomaly Video:** [NASA's Scientific Visualization Studio](https://svs.gsfc.nasa.gov/5071/)

## 📜 License

This project is released under the [The Unlicense](LICENSE). You are free to use, modify, and distribute this code as you see fit.
