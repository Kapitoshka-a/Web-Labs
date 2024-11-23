import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { fetchEstablishments } from '../api';
import '../css/services.css';

const Establishments = () => {
    const [establishments, setEstablishments] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEstablishments = async () => {
            setLoading(true); // Start loading
            try {
                const data = await fetchEstablishments();
                // Ensure data.results is an array
                if (Array.isArray(data.results)) {
                    setEstablishments(data.results); // Set establishments to the results array
                } else {
                    setError(new Error('Expected an array of establishments'));
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        getEstablishments();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error fetching establishments: {error.message}</div>; // Show error message
    }

    return (
        <div className="services"> {/* Grid layout */}
            <ul className="services">
                {establishments.map((establishment) => (
                    <li key={establishment.slug} className="service"> {/* Box styling */}
                        <Link to={`/establishment/${establishment.slug}`}>
                            <h3>{establishment.name}</h3>
                        </Link>
                        <p><strong>Type:</strong> {establishment.type}</p>
                        <p><strong>Contact:</strong> {establishment.work_mobile_number}</p>
                        <p><strong>Address:</strong> {establishment.address.city}, {establishment.address.street}, {establishment.address.build_number}</p>
                        <p><strong>Price Range:</strong> {establishment.price_category.price_range}</p>
                        <p><strong>Recommended:</strong> {establishment.is_recommended ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Establishments;



