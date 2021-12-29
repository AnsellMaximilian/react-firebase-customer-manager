import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./config/firebase";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";
import { RegionsPage } from "./pages/RegionsPage";

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
            path="/customers"
            element={
              <PrivateRoute isAuthenticated={user}>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/regions"
            element={
              <PrivateRoute isAuthenticated={user}>
                <RegionsPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/customers" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
