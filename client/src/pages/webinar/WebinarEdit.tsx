import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Video,
  ArrowLeft,
  Save,
  Settings,
  Calendar,
  Users,
  Clock,
  FileText,
  Upload,
  Eye,
  Play,
  Edit3,
  Share2,
  BarChart3,
  MessageSquare,
  Target,
  Zap,
  Gift
} from 'lucide-react';

export default function WebinarEdit() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [webinarData, setWebinarData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app this would fetch from API
    const mockWebinars = {
      'webinar-1': {
        id: 'webinar-1',
        title: 'Advanced Marketing Strategies for 2025',
        description: 'Learn cutting-edge marketing techniques that drive real results in today\'s competitive landscape.',
        type: 'live',
        scheduledAt: '2025-01-18T14:00:00Z',
        duration: 300,
        maxAttendees: 'unlimited',
        registrationRequired: true,
        autoRecord: true,
        allowChat: true,
        allowQA: true,
        allowPolls: true,
        reminderEmails: true,
        followUpEmails: true,
        presenter: 'John Marketing Expert',
        agenda: 'Introduction\nMarketing Trends 2025\nPractical Strategies\nQ&A Session',
        tags: 'marketing, strategies, 2025'
      }
    };

    const webinar = mockWebinars[id as keyof typeof mockWebinars] || mockWebinars['webinar-1'];
    setWebinarData(webinar);
    setIsLoading(false);
  }, [id]);

  const handleSave = () => {
    toast.success('Webinar updated successfully!');
    navigate('/webinars');
  };

  if (isLoading || !webinarData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading webinar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/webinars')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Webinars
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit Webinar
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Modify your webinar settings and content
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Update your webinar title, description, and basic settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webinar Title</label>
                  <Input 
                    defaultValue={webinarData.title}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    defaultValue={webinarData.description}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webinar Type</label>
                    <Select defaultValue={webinarData.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">Live Webinar</SelectItem>
                        <SelectItem value="automated">Automated Webinar</SelectItem>
                        <SelectItem value="hybrid">Hybrid Webinar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Select defaultValue={webinarData.duration.toString()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="300">5 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                        <SelectItem value="720">12 hours</SelectItem>
                        <SelectItem value="1440">24 hours (Max)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Attendees</label>
                    <Select defaultValue={webinarData.maxAttendees}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unlimited">Unlimited (Recommended)</SelectItem>
                        <SelectItem value="100">100 attendees</SelectItem>
                        <SelectItem value="500">500 attendees</SelectItem>
                        <SelectItem value="1000">1,000 attendees</SelectItem>
                        <SelectItem value="5000">5,000 attendees</SelectItem>
                        <SelectItem value="10000">10,000 attendees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Presenter</label>
                  <Input 
                    defaultValue={webinarData.presenter}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input 
                    defaultValue={webinarData.tags}
                    placeholder="marketing, sales, education"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduling Tab */}
          <TabsContent value="scheduling" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Scheduling Settings
                </CardTitle>
                <CardDescription>
                  Update when your webinar will take place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input 
                      type="date"
                      defaultValue={new Date(webinarData.scheduledAt).toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Time</label>
                    <Input 
                      type="time"
                      defaultValue={new Date(webinarData.scheduledAt).toTimeString().slice(0, 5)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="recurring" />
                  <label htmlFor="recurring" className="text-sm font-medium">
                    Make this a recurring webinar
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="registration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Registration Settings
                </CardTitle>
                <CardDescription>
                  Configure how people can register for your webinar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="registration" 
                    defaultChecked={webinarData.registrationRequired}
                  />
                  <label htmlFor="registration" className="text-sm font-medium">
                    Require registration to attend
                  </label>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Registration Form Fields</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="requireEmail" defaultChecked />
                      <label htmlFor="requireEmail" className="text-sm">Email address (required)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireName" defaultChecked />
                      <label htmlFor="requireName" className="text-sm">Full name</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requirePhone" />
                      <label htmlFor="requirePhone" className="text-sm">Phone number</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireCompany" />
                      <label htmlFor="requireCompany" className="text-sm">Company name</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireTitle" />
                      <label htmlFor="requireTitle" className="text-sm">Job title</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Page Message</label>
                  <Textarea 
                    placeholder="Add a custom message for your registration page..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Content Management
                </CardTitle>
                <CardDescription>
                  Manage your webinar content and materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agenda</label>
                  <Textarea 
                    defaultValue={webinarData.agenda}
                    rows={6}
                    placeholder="Outline your webinar agenda..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Speaker Notes</label>
                  <Textarea 
                    rows={4}
                    placeholder="Add private notes for the presenter..."
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Upload Materials</h4>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Upload presentation slides, handouts, or other materials
                    </p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Webinar Features
                </CardTitle>
                <CardDescription>
                  Enable or disable webinar features and interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Engagement Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="chat" className="text-sm">Live Chat</label>
                        <Switch id="chat" defaultChecked={webinarData.allowChat} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="qa" className="text-sm">Q&A Session</label>
                        <Switch id="qa" defaultChecked={webinarData.allowQA} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="polls" className="text-sm">Polls & Surveys</label>
                        <Switch id="polls" defaultChecked={webinarData.allowPolls} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="screen" className="text-sm">Screen Sharing</label>
                        <Switch id="screen" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Automation Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="record" className="text-sm">Auto Recording</label>
                        <Switch id="record" defaultChecked={webinarData.autoRecord} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="reminder" className="text-sm">Reminder Emails</label>
                        <Switch id="reminder" defaultChecked={webinarData.reminderEmails} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="followup" className="text-sm">Follow-up Emails</label>
                        <Switch id="followup" defaultChecked={webinarData.followUpEmails} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="replay" className="text-sm">Auto Replay Access</label>
                        <Switch id="replay" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Marketing & Promotion
                </CardTitle>
                <CardDescription>
                  Set up offers and promotional content for your webinar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Offer Title</label>
                  <Input placeholder="Limited Time: 50% Off Premium Course" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Offer Price ($)</label>
                    <Input type="number" placeholder="97" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Regular Price ($)</label>
                    <Input type="number" placeholder="197" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Offer Description</label>
                  <Textarea 
                    rows={3}
                    placeholder="Describe your special offer for webinar attendees..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Call-to-Action Button Text</label>
                  <Input placeholder="Get Instant Access Now" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="countdown" />
                  <label htmlFor="countdown" className="text-sm font-medium">
                    Show countdown timer for offer
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}