import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientForm from '../components/patientForm';

const ManagerDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/patients');
                setPatients(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPatients();
    }, []);

    const handleAdd = () => {
        setSelectedPatient(null);
        setShowForm(true);
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/patients/${id}`);
            setPatients((prev) => prev.filter((patient) => patient._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = () => {
        setShowForm(false);
        const fetchPatients = async () => {
            const { data } = await axios.get('http://localhost:5000/api/patients');
            setPatients(data);
        };
        fetchPatients();
    };

    return (
        <div>
            <h1>Manager Dashboard</h1>
            <button onClick={handleAdd}>Add Patient</button>
            {showForm && (
                <PatientForm
                    patient={selectedPatient}
                    onClose={() => setShowForm(false)}
                    onSave={handleSave}
                />
            )}
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id}>
                        {patient.name} - Room: {patient.roomNumber}{' '}
                        <button onClick={() => handleEdit(patient)}>Edit</button>
                        <button onClick={() => handleDelete(patient._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagerDashboard;
