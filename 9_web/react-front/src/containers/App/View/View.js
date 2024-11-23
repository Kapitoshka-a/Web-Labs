import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CenteredButton } from '../../../components/button/catalog_button';
import './view_style.css';
import {Button} from "antd";
import BASE_URL from "../../constant";

const Overview = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null); // Стан для зберігання даних елемента
  const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1);

    const handleBuy = () => {
        // const newTotal = totalPurchases + quantity;
        //   setTotalPurchases(newTotal);
        //   setPurchaseMessage(`Purchase saved! You have selected  ${totalPurchases} items`);
    };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/${id}/`);
        setItem(response.data);
          console.log("Fetched item data:", response.data);
          console.log(item)
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="overview-container">
      <h1 className="overview-title">{item.title}</h1>
      <img className="overview-image" src={`http://127.0.0.1:8000${item.image}`} alt={item.title} />
      <p className="overview-text">{item.description}</p>
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
    </div>

  );

};

export default Overview;
