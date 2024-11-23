import React, { useState, useEffect } from 'react';
import './sort.css';

const SortComponent = ({ allItems, setItems }) => {
    const [sortValue, setSortValue] = useState({
        name: 'nameAsc',
        price: 'priceAsc',
        type: 'All'
    });

    useEffect(() => {
        sortItems();
    }, [sortValue, allItems]);


    const handlePriceSortChange = (event) => {
        const value = event.target.value;
        setSortValue((prev) => ({ ...prev, price: value }));
    };

    const handleTypeChange = (event) => {
        const value = event.target.value;
        setSortValue((prev) => ({ ...prev, type: value }));
    };

    const sortItems = () => {
        let filteredItems = sortValue.type === 'All' ? [...allItems] : allItems.filter(item => item.type === sortValue.type);

        if (sortValue.price === 'priceAsc') {
            filteredItems.sort((a, b) => a.price - b.price);
        } else if (sortValue.price === 'priceDesc') {
            filteredItems.sort((a, b) => b.price - a.price);
        }
    
        // Оновлюємо стан з відфільтрованими та відсортованими елементами
        setItems(filteredItems);
    };
    
    

    const uniqueTypes = [...new Set(allItems.map(item => item.type)), 'All'];

    return (
        <div className="sort-container">
            <div>
                <label htmlFor="sortPrice">Sort by Price: </label>
                <select id="sortPrice" value={sortValue.price} onChange={handlePriceSortChange}>
                    <option value="priceAsc">Low to High</option>
                    <option value="priceDesc">High to Low</option>
                </select>
            </div>
            <div>
                <label htmlFor="sortType">Filter by Type: </label>
                <select id="sortType" value={sortValue.type} onChange={handleTypeChange}>
                    {uniqueTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SortComponent;
