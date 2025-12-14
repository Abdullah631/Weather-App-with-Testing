import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ loading, color = '#667eea', size = 50 }) => {
  return (
    <div className="spinner-container" style={{ display: loading ? 'flex' : 'none' }}>
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
