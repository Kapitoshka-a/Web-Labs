import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCartItems,
    fetchCartTotalPrice,
    removeFromCartBackend,
    updateRentalDaysBackend,
    clearMessage,
} from "../../../store/houseSlice";
import { message, Select } from "antd";
import "./BinCard_styled.css";

const { Option } = Select;

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart, status, error, message: reduxMessage, total_price } = useSelector(
        (state) => state.house
    );

    const [rentalDays, setRentalDays] = useState({});
    const [performance, setPerformance] = useState({});
    const [localTotalPrice, setLocalTotalPrice] = useState(0);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(fetchCartItems());
            if (response.payload?.items) {
                const initialRentalDays = response.payload.items.reduce((acc, item) => {
                    acc[item.house.id] = item.rental_days || 1;
                    return acc;
                }, {});
                setRentalDays(initialRentalDays);
                calculateLocalTotalPrice(response.payload.items, initialRentalDays);
            }
            await dispatch(fetchCartTotalPrice());
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (reduxMessage) {
            message.success(reduxMessage);
            dispatch(clearMessage());
        }
    }, [reduxMessage, dispatch]);

    useEffect(() => {
        if (status === "failed" && error) {
            message.error(error);
        }
    }, [status, error]);

    const handleDaysChange = (id, days) => {
        const updatedDays = days < 1 ? 1 : days;
        setRentalDays((prev) => {
            const updatedRentalDays = { ...prev, [id]: updatedDays };
            calculateLocalTotalPrice(cart, updatedRentalDays);
            return updatedRentalDays;
        });

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            dispatch(updateRentalDaysBackend({ houseId: id, rentalDays: updatedDays }));
        }, 500);
    };

    const handleRemove = async (houseId) => {
        try {
            await dispatch(removeFromCartBackend(houseId));
            setRentalDays((prev) => {
                const updatedDays = { ...prev };
                delete updatedDays[houseId];
                calculateLocalTotalPrice(
                    cart.filter((item) => item.house.id !== houseId),
                    updatedDays
                );
                return updatedDays;
            });
            await dispatch(fetchCartTotalPrice());
            message.success("Item removed from cart successfully!");
        } catch (err) {
            message.error(`Failed to remove item from cart: ${err}`);
        }
    };

    const handlePerformanceChange = (id, value) => {
        setPerformance((prev) => ({ ...prev, [id]: value }));
    };

    const calculateLocalTotalPrice = (cartItems, rentalDays) => {
        const total = cartItems.reduce((sum, item) => {
            const days = rentalDays[item.house.id] || item.rental_days || 1;
            return sum + item.house.price * days;
        }, 0);
        setLocalTotalPrice(total);
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">Your Cart</h1>
            {status === "loading" ? (
                <p className="cart-loading">Loading...</p>
            ) : cart.length > 0 ? (
                <>
                    {cart.map((item) => {
                        const house = item.house;
                        return (
                            <div key={house.id} className="cart-item">
                                <img
                                    src={`http://127.0.0.1:8000${house.image}`}
                                    alt={house.title}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{house.title}</h3>
                                    <p className="cart-item-price">
                                        Price per day: ${house.price}
                                    </p>
                                    <p className="cart-item-type">Type: {house.type}</p>

                                    {/* Performance selection */}
                                    <p className="cart-item-perfomance">Performance: {item.performance}</p>

                                    <div className="cart-item-days">
                                        <button
                                            className="cart-item-button"
                                            onClick={() => handleDaysChange(house.id, (rentalDays[house.id] || 1) - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="cart-item-days-count">
                                            {rentalDays[house.id] || 1}
                                        </span>
                                        <button
                                            className="cart-item-button"
                                            onClick={() => handleDaysChange(house.id, (rentalDays[house.id] || 1) + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => handleRemove(house.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="cart-total">
                        <h3>Total Count: ${total_price.toFixed(2)}</h3>
                        <button className="buy-button">Buy</button>
                    </div>
                </>
            ) : (
                <p className="cart-empty">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
