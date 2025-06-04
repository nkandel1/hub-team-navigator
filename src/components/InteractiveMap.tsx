
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building } from 'lucide-react';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  locations: Location[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ locations }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-corporate-blue flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Company Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for actual map - would integrate with Mapbox or similar */}
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-8 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10 text-center">
            <Building className="w-12 h-12 text-corporate-blue mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Interactive Map View</p>
            <p className="text-sm text-gray-500">
              Click on location pins to view details
            </p>
          </div>
          
          {/* Simulated location pins */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Location List */}
        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">{location.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
