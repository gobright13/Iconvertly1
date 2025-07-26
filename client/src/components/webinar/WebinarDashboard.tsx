import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  PlayCircle, 
  Settings, 
  Calendar, 
  Users, 
  Eye,
  Clock,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export function WebinarDashboard() {
  const upcomingWebinars = [
    {
      id: 1,
      title: 'AI Lead Generation Masterclass',
      date: 'Tomorrow, 3:00 PM',
      attendees: 156,
      type: 'scheduled',
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Live Q&A Session',
      date: 'Jan 25, 1:00 PM',
      attendees: 89,
      type: 'live',
      status: 'Live'
    }
  ];

  const recentWebinars = [
    {
      id: 1,
      title: 'Advanced Marketing Strategies for 2025',
      date: 'Today, 2:00 PM',
      attendees: 247,
      type: 'live',
      status: 'Live',
      viewers: 247
    },
    {
      id: 2,
      title: 'AI-Powered Lead Generation Masterclass',
      date: 'Tomorrow, 3:00 PM',
      attendees: 156,
      type: 'scheduled',
      status: 'Scheduled',
      viewers: 0
    },
    {
      id: 3,
      title: 'Conversion Optimization Workshop',
      date: 'Jan 25, 1:00 PM',
      attendees: 89,
      type: 'upcoming',
      status: 'Upcoming',
      viewers: 0
    }
  ];

  const quickActions = [
    {
      icon: Video,
      title: 'Live Webinar',
      description: 'Real-time interactive webinar with live host',
      color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
    },
    {
      icon: PlayCircle,
      title: 'Automated Webinar',
      description: 'Pre-recorded content with simulated live experience',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Settings,
      title: 'Hybrid Webinar',
      description: 'Pre-recorded video with live Q&A and interaction',
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
    }
  ];

  const recentActivity = [
    { action: 'Marketing Webinar completed successfully', time: '2 hours ago', type: 'success' },
    { action: 'New attendee registered for AI Workshop', time: '4 hours ago', type: 'info' },
    { action: 'Conversion funnel updated', time: '6 hours ago', type: 'update' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started with your webinar marketing campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Webinars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Active Webinars
              </span>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
            <CardDescription>
              Manage your live and scheduled webinars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWebinars.map((webinar) => (
                <div key={webinar.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      webinar.status === 'Live' ? 'bg-red-500' : 
                      webinar.status === 'Scheduled' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{webinar.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{webinar.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={webinar.status === 'Live' ? 'destructive' : 'secondary'}>
                      {webinar.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {webinar.attendees}
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Schedule
            </CardTitle>
            <CardDescription>
              Your next webinars and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.id} className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{webinar.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{webinar.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {webinar.attendees} attendees
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest updates from your webinar campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}