
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Trash2, Edit } from 'lucide-react';

interface DashboardData {
  news: string[];
  sharedDrives: { name: string; url: string; description: string }[];
  boyceStatus: 'online' | 'offline';
  newsletterUrl: string;
  locations: { name: string; lat: number; lng: number }[];
}

interface AdminPanelProps {
  onDataUpdate: (data: Partial<DashboardData>) => void;
  currentData: DashboardData;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onDataUpdate, currentData }) => {
  const [newNewsItem, setNewNewsItem] = useState('');
  const [newDrive, setNewDrive] = useState({ name: '', url: '', description: '' });
  const [newLocation, setNewLocation] = useState({ name: '', lat: 0, lng: 0 });
  const [newsletterUrl, setNewsletterUrl] = useState(currentData.newsletterUrl);

  const addNewsItem = () => {
    if (newNewsItem.trim()) {
      const updatedNews = [...currentData.news, newNewsItem.trim()];
      onDataUpdate({ news: updatedNews });
      setNewNewsItem('');
    }
  };

  const removeNewsItem = (index: number) => {
    const updatedNews = currentData.news.filter((_, i) => i !== index);
    onDataUpdate({ news: updatedNews });
  };

  const addSharedDrive = () => {
    if (newDrive.name && newDrive.url) {
      const updatedDrives = [...currentData.sharedDrives, newDrive];
      onDataUpdate({ sharedDrives: updatedDrives });
      setNewDrive({ name: '', url: '', description: '' });
    }
  };

  const removeDrive = (index: number) => {
    const updatedDrives = currentData.sharedDrives.filter((_, i) => i !== index);
    onDataUpdate({ sharedDrives: updatedDrives });
  };

  const toggleBoyceStatus = () => {
    const newStatus = currentData.boyceStatus === 'online' ? 'offline' : 'online';
    onDataUpdate({ boyceStatus: newStatus });
  };

  const updateNewsletterUrl = () => {
    onDataUpdate({ newsletterUrl });
  };

  return (
    <Card className="border-2 border-corporate-blue">
      <CardHeader className="bg-corporate-blue text-white">
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Admin Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="news" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="drives">Drives</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="news-input">Add News Item</Label>
              <div className="flex gap-2">
                <Input
                  id="news-input"
                  placeholder="Enter news announcement..."
                  value={newNewsItem}
                  onChange={(e) => setNewNewsItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewsItem()}
                />
                <Button onClick={addNewsItem} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Current News Items</Label>
              {currentData.news.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm flex-1">{item}</span>
                  <Button
                    onClick={() => removeNewsItem(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drives" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Drive name"
                value={newDrive.name}
                onChange={(e) => setNewDrive({ ...newDrive, name: e.target.value })}
              />
              <Input
                placeholder="Drive URL"
                value={newDrive.url}
                onChange={(e) => setNewDrive({ ...newDrive, url: e.target.value })}
              />
              <Button onClick={addSharedDrive}>
                <Plus className="w-4 h-4 mr-1" /> Add Drive
              </Button>
            </div>
            <Input
              placeholder="Description"
              value={newDrive.description}
              onChange={(e) => setNewDrive({ ...newDrive, description: e.target.value })}
            />
            
            <div className="space-y-2">
              <Label>Current Shared Drives</Label>
              {currentData.sharedDrives.map((drive, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{drive.name}</p>
                    <p className="text-sm text-gray-600">{drive.description}</p>
                  </div>
                  <Button
                    onClick={() => removeDrive(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>Boyce System Status</Label>
                <p className="text-sm text-gray-600">Current status from Aravolta</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={currentData.boyceStatus === 'online' ? 'default' : 'destructive'}>
                  {currentData.boyceStatus}
                </Badge>
                <Button onClick={toggleBoyceStatus} size="sm" variant="outline">
                  Toggle Status
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="newsletter-url">Newsletter URL</Label>
              <div className="flex gap-2">
                <Input
                  id="newsletter-url"
                  placeholder="https://..."
                  value={newsletterUrl}
                  onChange={(e) => setNewsletterUrl(e.target.value)}
                />
                <Button onClick={updateNewsletterUrl} size="sm">
                  Update
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
