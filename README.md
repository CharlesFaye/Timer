# ⏱️ JavaScript Timer Project

This project is a **web-based timer (stopwatch)** built using JavaScript’s `setInterval` API and enhanced with **data persistence** via `localStorage`. It allows users to start, pause, reset the timer, and preserve elapsed time even after a page refresh.

## 🚀 Features

- ▶️ Start, ⏸ Pause, 🔁 Reset timer functionality
- ⏳ Real-time update using `setInterval`
- 💾 Persistent time tracking with **localStorage**
- 🔄 Timer state is preserved on page reload
- 🎨 Minimal and responsive UI

## 🛠 Technologies Used

- HTML5!
- CSS3 / TailwindCSS 
- JavaScript (Vanilla JS)
- `localStorage` for data persistence

## 📸 Preview
[Timer screenshot image](images/timer.png)

📁 Timer/
├── index.html
├── date.js             
├── main.js             # Main JS 
├── src/
│   ├── input.css       # Tailwind input file
│   
├── dist/
│   └── output.css       # Tailwind output file
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS plugins (for Tailwind)
└── package.json         # Project dependencies

## ⚙️ TailwindCSS Setup

This project uses TailwindCSS with PostCSS for styling. After cloning the repository, install the dependencies and build the CSS:

```bash
npm install
npm run build

📌 Possible Improvements

. Add lap/split time functionality

. Display milliseconds

. Add sound or notification after a certain time

. Export timer data (CSV, JSON)

. Dark/light theme toggle

# Author
Built with ❤️ by Charles Faye (Bebouzo)
