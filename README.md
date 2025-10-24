# PassVault

> **PassVault** is a modern, full-stack password manager that lets you securely store, manage, and retrieve passwords for multiple accounts across different websites — all in one place.

---

## 🚀 Tech Stack

**Frontend:**  
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 🔔 react-toastify (for elegant toast notifications)

**Backend:**  
- 🟢 Node.js  
- ⚙️ Express.js  
- 🍃 MongoDB (NoSQL database for secure data storage)

---

## 🧩 Features

- ✅ **Add / Save Passwords:** Store login credentials (URL, username, password) with ease.  
- ✏️ **Edit Passwords:** Update existing entries securely.  
- ❌ **Delete Passwords:** Remove credentials you no longer need.  
- 🔍 **Multi-Account Support:** Save multiple usernames and passwords for the same URL.  
- 🔔 **Toast Notifications:** Clean and responsive UI feedback using `react-toastify`.  
- 💾 **Persistent Storage:** Data stored securely in MongoDB.  
- 🧠 **Responsive UI:** Fully optimized for both desktop and mobile users.  

---

## 🏗️ Project Structure
```
PassVault/
├── src/
│ ├── components/         # UI Components
│ └── App.jsx             # Main app entry point
├── package.json
│
├── server/               # Node.js + Express backend
│ ├── server.js           # API entry point
│ ├── .env                # Environment variables
│ └── package.json
│
├── .gitignore
└── README.md             # Project Documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ikeshavvarshney/PassVault.git
cd PassVault
```

### 2️⃣ Setup the backend
- Install server modules:
    ```bash
    cd server
    npm install
    ```
- Create a .env file in the /server directory and add the following variables:
    ```.env
    MONGO_URI=your_mongodb_connection_string
    ```
- Start the backend server:
    ```bash
    npm start
    ```

### 3️⃣ Setup the frontend
```bash
cd ..
npm install
npm run dev
```
- The frontend runs on 👉 `http://localhost:5173`
- The backend runs on 👉 `http://localhost:3000`

## 🧠 API Endpoints

| Method     | Endpoint | Description                |
|:-----------|:---------|:---------------------------|
| **POST**   | `/post`  | Save a new password entry  |
| **GET**    | `/get`   | Fetch all saved passwords  |
| **DELETE** | `/delete`| Delete a specific password |

---

## 🛡️ Security

- Environment variables are stored securely in `.env` (ignored via `.gitignore`).  
- Sensitive credentials are never exposed on the client side.  
- MongoDB connection strings and server configurations are stored in environment variables.  
- Planned upgrade: **AES / hashing encryption** for password fields before storage.

---

## 💡 Future Enhancements

- 🔒 Password encryption using `crypto` or `bcrypt`.  
- 🌐 JWT-based authentication system for user logins.  
- 📤 Export / 📥 Import passwords as CSV or JSON.  
- 📱 Progressive Web App (PWA) for mobile use.  
- ☁️ Cloud-based sync support (optional future feature).

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💻 Author

[**@ikeshavvarshney**](https://github.com/ikeshavvarshney)

---

<p align="center">
  <em>"Keep calm and hash on."</em>
</p>
