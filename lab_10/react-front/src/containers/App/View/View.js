import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, message, Select } from 'antd';
import './view_style.css';
import BASE_URL from "../../constant";
import { addToCartBackend } from "../../../store/houseSlice";
import { useDispatch } from "react-redux";

const { Option } = Select;

const Overview = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [performance, setPerformance] = useState('Basic'); // Default performance
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (id, performance) => {
        dispatch(addToCartBackend({ houseId: id, rentalDays: 1, performance }))
            .unwrap()
            .catch((err) => {
                message.error(`Failed to add house to cart: ${err}`);
            });
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/${id}/`);
                setItem(response.data);
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

            {/* Performance selection */}
            <Select
                defaultValue="Basic"
                style={{ width: 120 }}
                onChange={(value) => setPerformance(value)}
            >
                <Option value="Basic">Basic</Option>
                <Option value="Middle">Middle</Option>
                <Option value="High">High</Option>
                <Option value="Optimized">Optimized</Option>
            </Select>

            <div style={{ marginTop: "15px" }}>
                <Button
                    onClick={() => {
                        handleAddToCart(item.id, performance);
                    }}
                >
                    Add to cart
                </Button>
            </div>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
};

export default Overview;
