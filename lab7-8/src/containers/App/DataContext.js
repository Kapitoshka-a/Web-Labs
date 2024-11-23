import React, {createContext, useContext, useState} from "react";
import efsPicture from "../../Icons/efs.png";
import ss3Picture from "../../Icons/s3.png";
import ebsPicture from "../../Icons/ebs.png";
import auroraPicture from "../../Icons/Amazon-Aurora.jpg";
import dynamoPicture from "../../Icons/DynamoDB.png";

const initialData = [
  { id: 1, title: "EFS", text: "Elastic file storage service", image: efsPicture, price: 300, type: 'Storage' },
  { id: 2, title: "S3", text: "Simple storage service", image: ss3Picture, price: 500, type: 'Storage' },
  { id: 3, title: "EBS", text: "Elastic block storage", image: ebsPicture, price: 200, type: 'Storage' },
  { id: 4, title: "Aurora", text: "The fastest Sql database that aws has", image: auroraPicture, price: 1000, type: 'Sql-DB' },
  { id: 4, title: "DynamoDB", text: "No-sql database that is a good feet for most cases", image: dynamoPicture, price: 600, type: 'No-Sql-DB' }
];

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [items, setItems] = useState(data); // зберігаємо items тут

  const handleUpdateItem = (updatedItem) => {
    const isDuplicate = data.some(item => 
      item.title === updatedItem.title && item.id !== updatedItem.id
    );
  
    if (isDuplicate) {
      alert("An item with this title already exists.");
      return;
    }
  
    setData(prevData => prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))); 
  };

  const handleCreateItem = (newItem) => {
    setData((prevData) => [...prevData, newItem]);
  };

  const handleDeleteItem = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <DataContext.Provider value={{ data, items, setItems, handleUpdateItem, handleCreateItem, handleDeleteItem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
