import "./App.css";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async () => {
      const customersCol = collection(db, "customers");
      const customerSnapshot = await getDocs(customersCol);
      const customers = customerSnapshot.docs.map((customer) => ({
        id: customer.id,
        ...customer.data(),
      }));
      console.log(customers);
    })();
  }, []);
  return <div className="App"></div>;
}

export default App;
