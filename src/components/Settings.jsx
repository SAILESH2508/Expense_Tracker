import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css'; // We'll create this

function Settings() {
    const navigate = useNavigate();

    const handleClearData = () => {
        if (window.confirm("ARE YOU SURE? This will delete ALL your expenses and budget data permanently. This action cannot be undone.")) {
            localStorage.clear();
            sessionStorage.clear(); // Will log user out
            alert("All data has been cleared.");
            navigate('/');
        }
    };

    const handleExportCSV = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        if (expenses.length === 0) {
            alert("No expenses to export!");
            return;
        }

        const headers = ["ID", "Name", "Amount", "Category", "Date"];
        const csvContent = [
            headers.join(','),
            ...expenses.map(e => `${e.id},"${e.name}",${e.amount},"${e.category}","${e.date}"`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "expenses_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="settings-container fade-in">
            <div className="glass-panel settings-card">
                <h1>⚙️ Settings</h1>

                <div className="setting-section">
                    <h2>💾 Data Management</h2>
                    <p>Manage your local data.</p>
                    <div className="button-group">
                        <button className="btn-secondary" onClick={handleExportCSV}>
                            📥 Export Data to CSV
                        </button>
                        <button className="btn-danger" onClick={handleClearData} style={{ background: '#ff7675', color: 'white', padding: '10px 20px', borderRadius: '12px' }}>
                            🗑️ Clear All Data
                        </button>
                    </div>
                </div>

                <div className="setting-section">
                    <h2>🎨 Appearance</h2>
                    <p>Current Theme: <strong>Sunburst Glass</strong></p>
                    {/* Future toggle functionality can go here */}
                </div>

                <div className="setting-section">
                    <h2>👤 Account</h2>
                    <p>Logged in as: <strong>Guest User</strong> (Local Storage)</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;
