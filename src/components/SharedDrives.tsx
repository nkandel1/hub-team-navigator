
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Folder } from 'lucide-react';

interface Drive {
  name: string;
  url: string;
  description: string;
}

interface SharedDrivesProps {
  drives: Drive[];
}

const SharedDrives: React.FC<SharedDrivesProps> = ({ drives }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-corporate-blue flex items-center gap-2">
          <Folder className="w-5 h-5" />
          Shared Drives & Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drives.map((drive, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 hover:border-corporate-blue"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{drive.name}</h3>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-3">{drive.description}</p>
              <Button
                size="sm"
                variant="outline"
                className="text-corporate-blue border-corporate-blue hover:bg-corporate-blue hover:text-white"
                asChild
              >
                <a href={drive.url}>Access Drive</a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedDrives;
