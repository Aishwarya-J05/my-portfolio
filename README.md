# 🌐 Aishwarya Joshi — AI/ML Portfolio

> A dark-themed, interactive single-page portfolio built with React, showcasing AI/ML projects, skills, and experience - powered by a Gemini AI chatbot.

🔗 **Live Site:** [aishwarya-ai-portfolio.vercel.app](https://aishwarya-ai-portfolio.vercel.app)

---

## ✨ Features

- **Glassmorphism UI** — frosted-glass cards and dark aesthetic throughout
- **Canvas Particle Animation** — dynamic background built with the HTML5 Canvas API
- **Custom Cursor** — interactive cursor that reacts to hover states
- **Magnetic Buttons** — buttons that subtly follow the cursor on hover
- **Gemini-Powered AI Chatbot** — ask questions about my work and background; runs via a serverless `/api` proxy to keep the API key secure
- **Smooth Scroll & Section Navigation** — single-page layout with animated transitions
- **Fully Mobile Responsive** — optimized for all screen sizes
- **Deployed on Vercel** — with serverless API routes for the chatbot backend

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React (Vite), CSS (custom properties) |
| Animation | Canvas API, CSS transitions |
| AI Chatbot | Google Gemini API via Vercel serverless function |
| Deployment | Vercel |

---

## 📁 Project Structure
```
my-portfolio/
├── api/                  # Vercel serverless function (Gemini proxy)
├── public/               # Static assets
├── src/
│   └── Portfolio.jsx     # Main single-file React component
├── package.json
└── .gitignore
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js ≥ 18
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Setup
```bash
git clone https://github.com/Aishwarya-J05/my-portfolio.git
cd my-portfolio
npm install
```

Create a `.env` file in the root:
```
GEMINI_API_KEY=your_api_key_here
```

Start the dev server:
```bash
npm run dev
```

> The chatbot requires the Vercel dev environment to proxy API calls correctly. For full chatbot functionality locally, use:
> ```bash
> npx vercel dev
> ```

---

## 🤖 Chatbot Architecture

The Gemini chatbot uses a **serverless proxy pattern**:
```
Browser → /api/chat (Vercel function) → Gemini API
```

The API key never reaches the client. The serverless function in `/api` handles all requests to the Gemini endpoint.

---

## 📌 Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [SteelSense AI](https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai) | Real-time steel surface defect detection with Gemini Vision | YOLOv8, Gemini API, Flask, Docker |
| [ArXiv RAG Chatbot](https://rag-arxiv-chatbot.vercel.app) | Research paper Q&A using Retrieval-Augmented Generation | LangChain, FAISS, Hugging Face |
| [BurnoutIQ](https://burnoutiq.streamlit.app) | Employee burnout prediction using ML | Scikit-learn, Streamlit |

---

## 👩‍💻 About Me

I'm Aishwarya Joshi, a final-year BE (Electronics & Communication Engineering, AI/ML specialization) student at Tontadarya College of Engineering (VTU), graduating June 2026. I'm actively looking for entry-level **AI/ML Engineer** roles.

- 📧 aishwaryajoshi554@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/aishwaryajoshiaiml)
- ✍️ [Medium](https://medium.com/@aishwaryajoshi554)
- 🐙 [GitHub](https://github.com/Aishwarya-J05)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
