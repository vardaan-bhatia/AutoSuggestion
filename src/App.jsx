import React, { useState } from "react";
import AutoSuggestion from "./Components/AutoSuggestion";
import axios from "axios";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      return response.data.products;
    } catch (error) {
      console.log("Error fetching data", error);
      return [];
    }
  };

  const handleSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="items-center flex flex-col mt-10">
      <h1 className="text-3xl font-bold">AutoSuggestion/TypeAhead</h1>
      <AutoSuggestion
        fetchSuggestions={fetchSuggestions}
        onSelect={handleSelect}
        datakey="title"
        loading={<>Loading...</>}
      />
      {selectedProduct && (
        <div className="mt-10 p-4 border rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
          <p>{selectedProduct.description}</p>
          <p>
            <strong>Price:</strong> ${selectedProduct.price}
          </p>
          <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
        </div>
      )}
    </div>
  );
};

export default App;
