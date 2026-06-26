import { useState, useEffect } from "react";
import CustomerCard from "../components/CustomerCard";
import Form from "./Form"

const Customers = () => {
  const apiUrl = "https://pricesmart20240080.onrender.com/api/customers";
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItem(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Error fetching customers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Form onSuccess={fetchCustomers}/>
      <h1 className="text-center text-2xl">Customers</h1>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cls-3 gap-4 p-4">
          {item.map((item) => (
            <CustomerCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
