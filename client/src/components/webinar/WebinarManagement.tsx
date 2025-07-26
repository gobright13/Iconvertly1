import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Users,
  PlayCircle,
  Video,
  Settings,
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus
} from 'lucide-react';
import { WebinarCreate } from './WebinarCreate';

export function WebinarManagement() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const webinars = [
    {
      id: 1,
      title: 'Advanced Marketing Strategies for 2025',
      type: 'live',
      status: 'live',
      date: 'Today, 2:00 PM',
      registrations: 247,
      attendees: 198,
      duration: 60,
      conversion: 18.5,
      revenue: 12450
    },
    {
      id: 2,
      title: 'AI-Powered Lead Generation Masterclass',
      type: 'scheduled',
      status: 'scheduled',
      date: 'Tomorrow, 3:00 PM',
      registrations: 156,
      attendees: 0,
      duration: 90,
      conversion: 0,
      revenue: 0
    },
    {
      id: 3,
      title: 'Conversion Optimization Workshop',
      type: 'upcoming',
      status: 'upcoming',
      date: 'Jan 25, 1:00 PM',
      registrations: 89,
      attendees: 0,
      duration: 45,
      conversion: 0,
      revenue: 0
    },
    {
      id: 4,
      title: 'Email Marketing Automation Secrets',
      type: 'automated',
      status: 'active',
      date: 'Evergreen',
      registrations: 342,
      attendees: 289,
      duration: 75,
      conversion: 22.1,
      revenue: 18960
    },
    {
      id: 5,
      title: 'Social Media Growth Hacks',
      type: 'hybrid',
      status: 'completed',
      date: 'Jan 15, 4:00 PM',
      registrations: 178,
      attendees: 134,
      duration: 60,
      conversion: 16.8,
      revenue: 8970
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'upcoming': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'active': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live': return <Video className="w-4 h-4" />;
      case 'automated': return <PlayCircle className="w-4 h-4" />;
      case 'hybrid': return <Settings className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredWebinars = webinars.filter(webinar => {
    if (activeTab === 'all') return true;
    return webinar.status === activeTab;
  });

  if (showCreate) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowCreate(false)}
            className="flex items-center gap-2"
          >
            ← Back to Webinars
          </Button>
        </div>
        <WebinarCreate />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Webinar Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage, analyze, and optimize your webinar campaigns
          </p>
        </div>
        <Button 
          onClick={() => setShowCreate(true)}
          className="bg-coral-500 hover:bg-coral-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Webinar
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search webinars..."
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Webinars</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Webinar List */}
          <div className="space-y-4">
            {filteredWebinars.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Type Icon */}
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        {getTypeIcon(webinar.type)}
                      </div>

                      {/* Webinar Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {webinar.title}
                          </h3>
                          <Badge className={`text-xs ${getStatusColor(webinar.status)}`}>
                            {webinar.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {webinar.date} • {webinar.duration} minutes
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{webinar.registrations} registered</span>
                          </div>
                          {webinar.attendees > 0 && (
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{webinar.attendees} attended</span>
                            </div>
                          )}
                          {webinar.conversion > 0 && (
                            <div className="flex items-center gap-1">
                              <span>{webinar.conversion}% conversion</span>
                            </div>
                          )}
                          {webinar.revenue > 0 && (
                            <div className="flex items-center gap-1">
                              <span>${webinar.revenue.toLocaleString()} revenue</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {webinar.status === 'live' && (
                        <Button size="sm" className="bg-red-500 hover:bg-red-600">
                          Join Live
                        </Button>
                      )}
                      {webinar.status === 'scheduled' && (
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      )}
                      {webinar.status === 'active' && (
                        <Button size="sm" variant="outline">
                          View Stats
                        </Button>
                      )}
                      {webinar.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          View Report
                        </Button>
                      )}
                      
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common webinar management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Copy className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Clone Webinar</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Duplicate existing webinar setup
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Bulk Schedule</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Schedule multiple sessions
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Template Manager</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Manage webinar templates
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}