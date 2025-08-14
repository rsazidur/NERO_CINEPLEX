import React, { useState } from "react";

const AddShows = () => {
    const [showData, setShowData] = useState({
        movieName: "",
        date: "",
        time: "",
        screen: "",
        price: "",
    });

    const handleChange = (e) => {
        setShowData({ ...showData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your API endpoint
        const response = await fetch("/api/shows", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(showData),
        });
        if (response.ok) {
            alert("Show added successfully!");
            setShowData({
                movieName: "",
                date: "",
                time: "",
                screen: "",
                price: "",
            });
        } else {
            alert("Failed to add show.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <h2>Add New Show</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Movie Name:</label>
                    <input
                        type="text"
                        name="movieName"
                        value={showData.movieName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={showData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={showData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Screen:</label>
                    <input
                        type="text"
                        name="screen"
                        value={showData.screen}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={showData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <button type="submit" style={{ marginTop: "1rem" }}>
                    Add Show
                </button>
            </form>
        </div>
    );
};

export default AddShows;