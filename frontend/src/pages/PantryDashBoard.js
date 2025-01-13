import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PantryDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [personnel, setPersonnel] = useState([]);
    const [newPersonnel, setNewPersonnel] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchPersonnel();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/pantry/tasks');
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPersonnel = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/pantry/delivery-personnel');
            setPersonnel(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusUpdate = async (taskId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/pantry/tasks/${taskId}/status`, { status });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddPersonnel = async () => {
        try {
            await axios.post('http://localhost:5000/api/pantry/delivery-personnel', { name: newPersonnel });
            fetchPersonnel();
            setNewPersonnel('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleAssignDelivery = async (personnelId, taskId) => {
        try {
            await axios.post('http://localhost:5000/api/pantry/assign-delivery', {
                deliveryPersonnelId: personnelId,
                mealBoxId: taskId,
            });
            alert('Delivery Assigned Successfully');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Pantry Dashboard</h1>
            <h2>Assigned Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <p>Meal: {task.meal}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => handleStatusUpdate(task._id, 'Preparing')}>Mark as Preparing</button>
                        <button onClick={() => handleStatusUpdate(task._id, 'Ready for Delivery')}>Mark as Ready</button>
                        <button onClick={() => setSelectedTask(task)}>Assign to Delivery</button>
                    </li>
                ))}
            </ul>

            <h2>Delivery Personnel</h2>
            <ul>
                {personnel.map((person) => (
                    <li key={person._id}>{person.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newPersonnel}
                onChange={(e) => setNewPersonnel(e.target.value)}
                placeholder="Add New Delivery Personnel"
            />
            <button onClick={handleAddPersonnel}>Add</button>

            {selectedTask && (
                <div>
                    <h3>Assign Task: {selectedTask.meal}</h3>
                    <select
                        onChange={(e) => handleAssignDelivery(e.target.value, selectedTask._id)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Delivery Personnel
                        </option>
                        {personnel.map((person) => (
                            <option key={person._id} value={person._id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default PantryDashboard;
