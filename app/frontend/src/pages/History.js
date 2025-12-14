import React, { useState, useEffect } from 'react';
import { getHistory, deleteHistory, clearHistory } from '../services/weatherService';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/App.css';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHistory(50, 0);
      if (result.success) {
        setHistory(result.data.history);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteHistory(id);
      setHistory(history.filter(entry => entry.id !== id));
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      try {
        await clearHistory();
        setHistory([]);
      } catch (err) {
        setError('Failed to clear history');
      }
    }
  };

  const exportHistory = () => {
    const csv = [
      ['City', 'Temperature', 'Condition', 'Date'],
      ...history.map(entry => [
        entry.city,
        entry.temperature,
        entry.condition,
        entry.timestamp
      ])
    ];
    
    const csvContent = csv.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weather-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ color: 'white', marginBottom: '30px' }}>📜 Search History</h1>

        {error && (
          <div className="alert alert-danger">⚠️ {error}</div>
        )}

        <LoadingSpinner loading={loading} />

        <div style={{ marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={fetchHistory} disabled={loading}>
            🔄 Refresh
          </button>
          <button 
            className="btn btn-primary" 
            onClick={exportHistory} 
            disabled={loading || history.length === 0}
            style={{ marginLeft: '10px' }}
          >
            📥 Export as CSV
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleClearAll}
            disabled={loading || history.length === 0}
            style={{ marginLeft: '10px' }}
          >
            🗑️ Clear All
          </button>
        </div>

        {history.length > 0 ? (
          <>
            <div className="card">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #667eea' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#667eea' }}>City</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#667eea' }}>Temperature</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#667eea' }}>Condition</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#667eea' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#667eea' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr 
                      key={entry.id}
                      style={{ 
                        borderBottom: '1px solid #f0f0f0',
                        '&:hover': { backgroundColor: '#f9f9f9' }
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '12px' }}><strong>{entry.city}</strong></td>
                      <td style={{ padding: '12px' }}>{Math.round(entry.temperature)}°C</td>
                      <td style={{ padding: '12px' }}>{entry.condition}</td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#999' }}>
                        {formatDate(entry.timestamp)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteEntry(entry.id)}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: '#999', marginTop: '15px' }}>
              Total entries: {history.length}
            </p>
          </>
        ) : (
          !loading && (
            <div className="card text-center">
              <p>No search history yet. Start by searching for a city!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default History;
