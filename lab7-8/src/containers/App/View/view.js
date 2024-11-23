import React, {useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../DataContext';
import {useNavigate} from "react-router-dom";
import './view_style.css';

const Overview = () => {
  const { id } = useParams(); // Отримуємо id з URL
  const { data } = useContext(DataContext); // Отримуємо дані з контексту
  const item = data.find(item => item.id === Number(id)); // Знаходимо елемент за id
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [purchaseMessage, setPurchaseMessage] = useState('');
  console.log('Requested ID:', id);
  console.log('Data:', data);

  const handleBuy = () => {
      // const newTotal = totalPurchases + quantity;
      //   setTotalPurchases(newTotal);
      //   setPurchaseMessage(`Purchase saved! You have selected  ${totalPurchases} items`);
    };

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
      <div className="overview-container">
          <h1 className="overview-title">{item.title}</h1>
          <img className="overview-image" src={item.image} alt={item.title}/>
          <p className="overview-text">{item.text}</p>
          <p className="overview-price">Price: ${item.price}</p>
          <p className="overview-type">Type: {item.type}</p>
          <button onClick={() => navigate(-1)}>Go back</button>
          <label>
              Quantity:
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                  {[...Array(5)].map((_, i) => (
                      <option key={i} value={i + 1}>
                          {i + 1}
                      </option>
                  ))}
              </select>
          </label>
          <button onClick={handleBuy} className="buy-button">Buy</button>
          {purchaseMessage && <p className="purchase-message">{purchaseMessage}</p>}
      </div>
  );
};

export default Overview;
