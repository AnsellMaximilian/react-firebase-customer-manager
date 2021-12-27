import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./config/firebase";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";

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
          <Route
            path="/login"
            element={
              <GuestRoute isAuthenticated={user}>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={user}>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
