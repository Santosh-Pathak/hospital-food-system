import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryDashboard = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveryNotes, setDeliveryNotes] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/delivery/assignments');
            setDeliveries(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeliveryCompletion = async (deliveryId) => {
        try {
            await axios.put(`http://localhost:5000/api/delivery/assignments/${deliveryId}`, {
                status: 'Delivered',
                deliveryNotes,
            });
            fetchDeliveries();
            setDeliveryNotes('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Delivery Personnel Dashboard</h1>
            <h2>Assigned Deliveries</h2>
            <ul>
                {deliveries.map((delivery) => (
                    <li key={delivery._id}>
                        <p>Patient: {delivery.patientName}</p>
                        <p>Meal: {delivery.meal}</p>
                        <p>Status: {delivery.status}</p>
                        <p>Room: {delivery.roomNumber}</p>
                        <button onClick={() => setSelectedDelivery(delivery)}>Complete Delivery</button>
                    </li>
                ))}
            </ul>

            {selectedDelivery && (
                <div>
                    <h3>Mark as Delivered: {selectedDelivery.meal}</h3>
                    <textarea
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="Optional delivery notes"
                    />
                    <button onClick={() => handleDeliveryCompletion(selectedDelivery._id)}>Mark as Done</button>
                </div>
            )}
        </div>
    );
};

export default DeliveryDashboard;
