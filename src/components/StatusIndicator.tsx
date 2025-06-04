
import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'offline';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const isOnline = status === 'online';
  
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500 animate-pulse-status' : 'bg-red-500'} shadow-lg`} />
      <div>
        <p className={`font-semibold ${isOnline ? 'text-green-700' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </p>
        <p className="text-sm text-gray-600">
          Aravolta Connection: {isOnline ? 'Active' : 'Disconnected'}
        </p>
      </div>
    </div>
  );
};

export default StatusIndicator;
