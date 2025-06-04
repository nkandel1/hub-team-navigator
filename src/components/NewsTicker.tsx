
import React from 'react';
import { Bell } from 'lucide-react';

interface NewsTickerProps {
  news: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  return (
    <div className="bg-corporate-blue text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex items-center space-x-2 px-4 bg-corporate-blue-dark">
          <Bell className="w-4 h-4" />
          <span className="font-semibold text-sm whitespace-nowrap">ALERTS</span>
        </div>
        <div className="flex-1 relative">
          <div className="animate-ticker whitespace-nowrap">
            {news.map((item, index) => (
              <span key={index} className="inline-block px-8 text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
