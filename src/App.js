import "./App.css";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "./config/firebase";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
