import React from 'react';

const Dashboard = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Users</h2>
                    <p>Total: 120</p>
                </div>
                <div style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Movies</h2>
                    <p>Total: 45</p>
                </div>
                <div style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Bookings</h2>
                    <p>Total: 320</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;