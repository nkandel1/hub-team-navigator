
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, MapPin } from 'lucide-react';
import NewsTicker from './NewsTicker';
import StatusIndicator from './StatusIndicator';
import SecurityPortal from './SecurityPortal';
import SharedDrives from './SharedDrives';
import InteractiveMap from './InteractiveMap';
import AdminPanel from './AdminPanel';
import { useToast } from '@/hooks/use-toast';

interface DashboardData {
  news: string[];
  sharedDrives: { name: string; url: string; description: string }[];
  boyceStatus: 'online' | 'offline';
  newsletterUrl: string;
  locations: { name: string; lat: number; lng: number }[];
}

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    news: [
      "Quarterly training deadline approaching - Complete by end of month",
      "New security protocols in effect starting Monday",
      "All-hands meeting scheduled for Friday at 2 PM",
      "IT maintenance window this weekend - Plan accordingly"
    ],
    sharedDrives: [
      { name: "HR Documents", url: "#", description: "Employee handbooks, policies, forms" },
      { name: "Project Resources", url: "#", description: "Templates, guidelines, best practices" },
      { name: "Marketing Assets", url: "#", description: "Logos, brand guidelines, materials" },
      { name: "Financial Reports", url: "#", description: "Budget reports, expense forms" }
    ],
    boyceStatus: 'online',
    newsletterUrl: "#",
    locations: [
      { name: "Headquarters", lat: 40.7128, lng: -74.0060 },
      { name: "West Coast Office", lat: 37.7749, lng: -122.4194 },
      { name: "European Office", lat: 51.5074, lng: -0.1278 }
    ]
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking user role
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, []);

  const handleDataUpdate = (newData: Partial<DashboardData>) => {
    setDashboardData(prev => ({ ...prev, ...newData }));
    toast({
      title: "Dashboard Updated",
      description: "Changes have been saved successfully.",
    });
  };

  const filteredContent = searchTerm ? 
    dashboardData.sharedDrives.filter(drive => 
      drive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) : dashboardData.sharedDrives;

  return (
    <div className="min-h-screen bg-gradient-to-br from-corporate-gray to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-corporate-blue">Company Portal</h1>
              <Badge variant="outline" className="text-corporate-blue border-corporate-blue">
                Internal Team Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {isAdmin && (
                <Button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  variant="outline"
                  className="text-corporate-blue border-corporate-blue hover:bg-corporate-blue hover:text-white"
                >
                  Admin Panel
                </Button>
              )}
              
              <Button size="sm" variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* News Ticker */}
      <NewsTicker news={dashboardData.news} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAdminPanel && isAdmin && (
          <div className="mb-8">
            <AdminPanel onDataUpdate={handleDataUpdate} currentData={dashboardData} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-corporate-blue flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Boyce System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusIndicator status={dashboardData.boyceStatus} />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-corporate-blue">Latest Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Stay updated with company news and announcements
                  </p>
                  <Button asChild className="bg-corporate-blue hover:bg-corporate-blue-dark">
                    <a href={dashboardData.newsletterUrl}>Read Newsletter</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Shared Drives */}
            <SharedDrives drives={filteredContent} />

            {/* Interactive Map */}
            <InteractiveMap locations={dashboardData.locations} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Security Knowledge Portal */}
            <SecurityPortal />

            {/* Quick Links */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-corporate-blue">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#">Employee Directory</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#">IT Support</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#">Company Calendar</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#">Benefits Portal</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
