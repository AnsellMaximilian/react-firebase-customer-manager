import "./App.css";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "./config/firebase";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // (async () => {
    //   const customersCol = collection(db, "customers");
    //   const customerSnapshot = await getDocs(customersCol);
    //   const customers = customerSnapshot.docs.map((customer) => ({
    //     id: customer.id,
    //     ...customer.data(),
    //   }));
    //   console.log(customers);
    // })();
  }, []);
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="customers" element={<h1>Customers</h1>} />
          <Route path="regions" element={<h1>Regions</h1>} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
