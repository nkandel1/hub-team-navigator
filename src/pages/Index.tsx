
import React from 'react';
import Dashboard from '@/components/Dashboard';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-corporate-gray to-white flex items-center justify-center">
        <div className="text-corporate-blue">Loading...</div>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-corporate-gray to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-orange-600 flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Supabase integration is not properly configured. Please check that your environment variables are set up correctly.
            </p>
            <p className="text-sm text-gray-500">
              Expected variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
};

export default Index;
