import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ patient, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        diseases: '',
        allergies: '',
    });

    useEffect(() => {
        if (patient) {
            setFormData(patient);
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (patient) {
                await axios.put(`http://localhost:5000/api/patients/${patient._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/patients', formData);
            }
            onSave();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>{patient ? 'Edit Patient' : 'Add Patient'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="contactInfo"
                    placeholder="Contact Information"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="roomNumber"
                    placeholder="Room Number"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bedNumber"
                    placeholder="Bed Number"
                    value={formData.bedNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="floorNumber"
                    placeholder="Floor Number"
                    value={formData.floorNumber}
                    onChange={handleChange}
                />
                <textarea
                    name="diseases"
                    placeholder="Diseases"
                    value={formData.diseases}
                    onChange={handleChange}
                />
                <textarea
                    name="allergies"
                    placeholder="Allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                />
                <button type="submit">{patient ? 'Update' : 'Add'}</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default PatientForm;
