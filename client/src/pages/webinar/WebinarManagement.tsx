import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Settings, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Share2, 
  Copy,
  Eye,
  Download,
  Upload,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Video,
  Mail,
  Bell,
  Smartphone,
  Globe,
  Link,
  Heart,
  Star,
  Award,
  Gift,
  DollarSign,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  PieChart,
  BarChart,
  LineChart,
  Activity
} from 'lucide-react';

interface WebinarManagementProps {
  webinarId: string;
}

export default function WebinarManagement({ webinarId }: WebinarManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample webinar data (in real app, this would come from API)
  const webinar = {
    id: webinarId,
    title: 'Complete Digital Marketing Mastery 2025',
    description: 'Advanced strategies for scaling your business with cutting-edge marketing techniques',
    status: 'Live',
    type: 'live',
    presenter: 'Sarah Marketing Expert',
    category: 'Marketing',
    scheduledDate: 'Today, 2:00 PM',
    duration: '90 minutes',
    registered: 1847,
    attendees: 1247,
    viewers: 892,
    maxViewers: 1156,
    conversion: 23.4,
    revenue: 45680,
    rating: 4.9,
    totalRevenue: 125430,
    offers: [
      {
        id: 1,
        title: 'Marketing Mastery Course',
        price: 197,
        salePrice: 97,
        conversions: 287,
        revenue: 27839
      }
    ],
    analytics: {
      registrationRate: 78.5,
      attendanceRate: 67.5,
      engagementScore: 91.2,
      replayViews: 2341,
      dropOffRate: 15.3
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={`${webinar.status === 'Live' ? 'bg-red-500' : 'bg-green-500'}`}>
                {webinar.status}
              </Badge>
              <Badge variant="outline">{webinar.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {webinar.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {webinar.description}
            </p>
          </div>
          <div className="flex gap-3">
            {webinar.status === 'Live' ? (
              <Button className="bg-red-500 hover:bg-red-600">
                <Play className="w-4 h-4 mr-2" />
                Join Live
              </Button>
            ) : (
              <Button className="bg-coral-500 hover:bg-coral-600">
                <Play className="w-4 h-4 mr-2" />
                Start Webinar
              </Button>
            )}
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Viewers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{webinar.viewers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Peak: {webinar.maxViewers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Registered</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{webinar.registered.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">{webinar.analytics.attendanceRate}% attendance</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{webinar.conversion}%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+5.2% vs avg</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Generated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${webinar.revenue.toLocaleString()}</p>
                  <p className="text-xs text-coral-600 dark:text-coral-400">Live session</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-coral-600 dark:text-coral-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-slate-800 border-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Offers
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Stream Control */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Live Stream Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">Live Stream Active</p>
                      <p className="text-sm opacity-75">{webinar.viewers} viewers watching</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-red-500 hover:bg-red-600">
                      <Pause className="w-4 h-4 mr-2" />
                      End Stream
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Moderate Chat
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Gift className="w-4 h-4 mr-2" />
                    Launch Offer
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Create Poll
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-coral-600 mb-2">{webinar.analytics.engagementScore}</div>
                    <Progress value={webinar.analytics.engagementScore} className="mb-2" />
                    <p className="text-sm text-gray-600">Excellent engagement</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chat Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Messages</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Questions</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reactions</span>
                      <span className="font-medium">3,456</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Live Sales</span>
                      <span className="font-medium">${webinar.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Revenue</span>
                      <span className="font-medium">${webinar.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Order</span>
                      <span className="font-medium">$97</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs would be implemented similarly with comprehensive features */}
          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Audience Management</CardTitle>
                <CardDescription>Comprehensive audience analytics and management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">Advanced audience management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Tools</CardTitle>
                <CardDescription>Interactive features to boost webinar engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">Advanced engagement tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle>Offer Management</CardTitle>
                <CardDescription>Create and manage special offers during webinars</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">Advanced offer management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>Automation Center</CardTitle>
                <CardDescription>AI-powered automation and follow-up sequences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">Advanced automation features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Detailed performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">Advanced analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}