import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  Eye,
  MousePointer,
  MessageSquare,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function WebinarAnalytics() {
  const registrationData = [
    { month: 'Jan', registrations: 120, attendees: 89 },
    { month: 'Feb', registrations: 185, attendees: 142 },
    { month: 'Mar', registrations: 210, attendees: 167 },
    { month: 'Apr', registrations: 275, attendees: 198 },
    { month: 'May', registrations: 310, attendees: 245 },
    { month: 'Jun', registrations: 390, attendees: 312 }
  ];

  const conversionData = [
    { name: 'Registered', value: 1247, color: '#3B82F6' },
    { name: 'Attended', value: 934, color: '#10B981' },
    { name: 'Engaged', value: 678, color: '#F59E0B' },
    { name: 'Converted', value: 156, color: '#EF4444' }
  ];

  const performanceMetrics = [
    {
      title: 'Total Registrations',
      value: '15,620',
      change: '+23%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Average Attendance',
      value: '12,450',
      change: '+12%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Conversion Rate',
      value: '19.2%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: '$284,750',
      change: '+31%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-coral-600'
    }
  ];

  const topPerformingWebinars = [
    {
      title: 'AI Marketing Automation Masterclass',
      registrations: 1247,
      attendees: 934,
      conversion: 18.5,
      revenue: 45680
    },
    {
      title: 'Lead Generation Workshop',
      registrations: 856,
      attendees: 623,
      conversion: 22.1,
      revenue: 32450
    },
    {
      title: 'Sales Funnel Optimization',
      registrations: 634,
      attendees: 478,
      conversion: 16.8,
      revenue: 28970
    }
  ];

  const engagementMetrics = [
    { metric: 'Average Watch Time', value: '42 minutes', icon: Clock },
    { metric: 'Questions Asked', value: '1,247', icon: MessageSquare },
    { metric: 'Chat Messages', value: '3,856', icon: MessageSquare },
    { metric: 'Poll Participation', value: '78%', icon: MousePointer }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Webinar Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights into your webinar performance
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration vs Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Registration vs Attendance Trends</CardTitle>
            <CardDescription>
              Monthly comparison of registrations and actual attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registrations" fill="#3B82F6" name="Registrations" />
                <Bar dataKey="attendees" fill="#10B981" name="Attendees" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              User journey from registration to conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Top Performing Webinars */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Webinars</CardTitle>
              <CardDescription>
                Your most successful webinars by conversion and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingWebinars.map((webinar, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {webinar.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {webinar.registrations} registrations • {webinar.attendees} attendees
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {webinar.conversion}%
                        </p>
                        <p>Conversion</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${webinar.revenue.toLocaleString()}
                        </p>
                        <p>Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {engagementMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.metric}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Engagement Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>
                How audience engagement has evolved over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendees" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of conversion metrics and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    High Conversion Rate
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    19.2%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Above industry average of 15%
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Show-up Rate
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    74.8%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Strong attendance performance
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Avg. Watch Time
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    42 min
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    68% of total duration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Financial performance and revenue trends from webinars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Revenue by Webinar Type
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Live Webinars</span>
                      <span className="font-medium">$156,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Automated</span>
                      <span className="font-medium">$89,730</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Hybrid</span>
                      <span className="font-medium">$38,600</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Key Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Revenue per Attendee</span>
                      <span className="font-medium">$22.87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Average Order Value</span>
                      <span className="font-medium">$97.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">ROI</span>
                      <span className="font-medium text-green-600">342%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}