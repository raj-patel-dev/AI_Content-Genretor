# AI Content Generator

An AI-powered web application that helps users generate high-quality written content using artificial intelligence. The project provides a simple interface for entering a prompt and receiving AI-generated content.

## 🚀 Features

* ✨ AI-powered content generation
* 📝 Generate content from custom prompts
* ⚡ Simple and responsive user interface
* 🔄 Generate new content whenever needed
* 📋 Easy-to-read generated results
* 🌐 Web-based application
* 🔐 API key handled through environment variables

## 🛠️ Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js / Express.js
* **AI:** Google Gemini API
* **Package Manager:** npm
* **Deployment:** Vercel / Render *(if applicable)*

## 📁 Project Structure

```text
AI_Content-Genretor/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── routes/
│   └── ...
│
├── app.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

> The exact structure may vary depending on the current version of the project.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/raj-patel-dev/AI_Content-Genretor.git
```

### 2. Open the project

```bash
cd AI_Content-Genretor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
API_KEY=your_gemini_api_key
PORT=5000
```

Replace `your_gemini_api_key` with your own Google Gemini API key.

**Never commit your `.env` file or your real API key to GitHub.**

### 5. Start the application

```bash
npm start
```

Or, if your project uses a development script:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5000
```

## 🔑 Environment Variables

| Variable  | Description                     |
| --------- | ------------------------------- |
| `API_KEY` | Google Gemini API key           |
| `PORT`    | Port used by the Express server |

## 🧠 How It Works

The application follows a simple workflow:

```text
User enters prompt
       ↓
Frontend sends request
       ↓
Express.js backend
       ↓
Google Gemini API
       ↓
AI generates content
       ↓
Generated content returned to user
       ↓
Content displayed in the UI
```

The API key remains on the backend rather than being exposed directly in the frontend.

## 🖥️ Usage

1. Open the application.
2. Enter a topic, idea, or prompt.
3. Submit the request.
4. The backend sends the prompt to the Gemini API.
5. The generated content is displayed on the page.
6. The user can generate additional content with another prompt.

## 🔒 Security

For security reasons, API keys should never be hard-coded into frontend JavaScript or committed to GitHub.

Use environment variables:

```env
API_KEY=your_secret_key
```

Add `.env` to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
```

For production deployments, configure the environment variable through your hosting provider's environment-variable settings.

## 🌐 Deployment

The application can be deployed using platforms such as **Vercel** or **Render**, depending on the project architecture.

For a separate frontend and backend deployment:

```text
Frontend
   ↓
Vercel
   ↓
Express API
   ↓
Render
   ↓
Google Gemini API
```

Make sure the production frontend uses the deployed backend URL instead of:

```text
http://localhost:5000
```

## 📸 Screenshots

Add screenshots of the application here:

```text
screenshots/
├── home.png
├── generator.png
└── result.png
```

Example:

![AI Content Generator](screenshots/home.png)

## 🎯 Purpose of the Project

This project was created to practice and demonstrate:

* AI API integration
* REST API development
* Express.js backend development
* Frontend and backend communication
* Environment variable management
* API security
* Deployment of web applications

## 🚧 Future Improvements

Possible future improvements include:

* User authentication
* Content history
* Multiple AI writing modes
* Copy-to-clipboard functionality
* Download generated content
* Improved prompt templates
* Database integration
* Usage limits
* Better error handling
* Responsive UI improvements

## 👨‍💻 Author

**Raj Patel**

* GitHub: [raj-patel-dev](https://github.com/raj-patel-dev)

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

**Built with JavaScript, Node.js, Express.js, and Google Gemini AI.**
