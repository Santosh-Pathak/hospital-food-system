import React, { useState } from 'react';

const DietChartForm = ({ onSave, onClose }) => {
    const [chart, setChart] = useState({
        morning: '',
        afternoon: '',
        evening: '',
        night: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChart((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(chart);
    };

    return (
        <div className="form-container">
            <h2>Diet Chart</h2>
            <form onSubmit={handleSubmit}>
                <textarea name="morning" placeholder="Morning" value={chart.morning} onChange={handleChange} required />
                <textarea name="afternoon" placeholder="Afternoon" value={chart.afternoon} onChange={handleChange} required />
                <textarea name="evening" placeholder="Evening" value={chart.evening} onChange={handleChange} required />
                <textarea name="night" placeholder="Night" value={chart.night} onChange={handleChange} required />
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default DietChartForm;
