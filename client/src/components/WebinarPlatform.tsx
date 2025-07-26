import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, PlayCircle, Settings, BarChart3, Plus, Eye, MessageSquare } from 'lucide-react';
import { WebinarDashboard } from './webinar/WebinarDashboard';
import { WebinarCreate } from './webinar/WebinarCreate';
import { WebinarManagement } from './webinar/WebinarManagement';
import { WebinarAnalytics } from './webinar/WebinarAnalytics';
import { WebinarAutomation } from './webinar/WebinarAutomation';
import { WebinarIntegrations } from './webinar/WebinarIntegrations';

export function WebinarPlatform() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cliently Webinars
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your comprehensive webinar automation platform
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Manage All
            </Button>
            <Button className="bg-coral-500 hover:bg-coral-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Webinar
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Webinars</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Attendees</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3,247</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+23% from last month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">18.5%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+5.2% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Generated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$47,230</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+31% from last month</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-coral-600 dark:text-coral-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <WebinarDashboard />
          </TabsContent>

          <TabsContent value="webinars">
            <WebinarManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <WebinarAnalytics />
          </TabsContent>

          <TabsContent value="automation">
            <WebinarAutomation />
          </TabsContent>

          <TabsContent value="integrations">
            <WebinarIntegrations />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Settings</CardTitle>
                <CardDescription>
                  Configure your webinar platform preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}