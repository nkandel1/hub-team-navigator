
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, BookOpen } from 'lucide-react';

const SecurityPortal = () => {
  const triviaQuestions = [
    "What's the most common type of cyber attack?",
    "How often should you update your passwords?",
    "What does MFA stand for?"
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-corporate-blue flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Knowledge Portal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Terranova Training */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-corporate-blue rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-corporate-blue">Terranova Training</h3>
              <Badge variant="secondary" className="text-xs">Required</Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Complete your quarterly security awareness training
          </p>
          <Button size="sm" className="bg-corporate-blue hover:bg-corporate-blue-dark">
            Start Training
          </Button>
        </div>

        {/* Cyber Trivia */}
        <div className="space-y-3">
          <h3 className="font-semibold text-corporate-blue flex items-center gap-2">
            <Award className="w-4 h-4" />
            Daily Cyber Trivia
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 mb-2">
              {triviaQuestions[0]}
            </p>
            <div className="grid grid-cols-1 gap-2">
              <Button size="sm" variant="outline" className="text-xs justify-start h-8">
                Phishing
              </Button>
              <Button size="sm" variant="outline" className="text-xs justify-start h-8">
                Malware
              </Button>
              <Button size="sm" variant="outline" className="text-xs justify-start h-8">
                Social Engineering
              </Button>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Security Tip of the Day</h4>
          <p className="text-sm text-green-700">
            Enable two-factor authentication on all your work accounts to add an extra layer of security.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPortal;
