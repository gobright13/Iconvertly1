import React, { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Calendar, 
  Clock, 
  Users, 
  Video,
  Settings,
  CheckCircle
} from 'lucide-react';

export default function WebinarCreateSimple() {
  const params = useParams();
  const { type } = params;
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [webinarData, setWebinarData] = useState({
    title: '',
    description: '',
    presenter: '',
    date: '',
    time: '',
    duration: 90,
    maxAttendees: 'unlimited',
    maxHours: 24
  });

  const handleSaveDraft = () => {
    if (!webinarData.title || !webinarData.description || !webinarData.presenter) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title, description, and presenter fields.",
        variant: "destructive"
      });
      return;
    }

    const draftWebinars = JSON.parse(localStorage.getItem('draftWebinars') || '[]');
    const newWebinar = {
      id: `webinar-${Date.now()}`,
      ...webinarData,
      type,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    draftWebinars.push(newWebinar);
    localStorage.setItem('draftWebinars', JSON.stringify(draftWebinars));

    toast({
      title: "Draft Saved",
      description: "Your webinar has been saved as a draft successfully.",
    });

    navigate(`/webinar/manage/${newWebinar.id}`);
  };

  const handlePreview = () => {
    if (!webinarData.title) {
      toast({
        title: "Missing Title",
        description: "Please add a webinar title to preview.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Preview Ready",
      description: "Opening webinar preview in new window...",
    });
  };

  const getTypeInfo = () => {
    switch(type) {
      case 'live':
        return {
          title: 'Live Webinar',
          description: 'Real-time interactive session with live Q&A and audience engagement',
          icon: '🎥',
          color: 'from-red-500 to-pink-500'
        };
      case 'automated':
        return {
          title: 'Automated Webinar',
          description: 'Pre-recorded session that runs on autopilot with simulated live features',
          icon: '⚙️',
          color: 'from-blue-500 to-cyan-500'
        };
      case 'hybrid':
        return {
          title: 'Hybrid Webinar',
          description: 'Combination of live presentation with automated follow-up sequences',
          icon: '🚀',
          color: 'from-purple-500 to-indigo-500'
        };
      default:
        return {
          title: 'Webinar',
          description: 'Create your webinar',
          icon: '📹',
          color: 'from-gray-500 to-gray-600'
        };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/webinars")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Webinars
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{typeInfo.icon}</div>
                <h1 className="text-3xl font-bold">Create {typeInfo.title}</h1>
                <Badge className={`bg-gradient-to-r ${typeInfo.color} text-white`}>
                  {type?.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground">{typeInfo.description}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSaveDraft} className="bg-coral-500 hover:bg-coral-600">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Webinar Limits Info */}
        <Card className="border-coral-200 bg-coral-50 dark:bg-coral-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-coral-600" />
                  <span className="font-medium">Maximum Attendees: Unlimited</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-coral-600" />
                  <span className="font-medium">Maximum Duration: 24 Hours</span>
                </div>
              </div>
              <Badge variant="secondary">Professional Plan</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Webinar Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your webinar title..."
                    value={webinarData.title}
                    onChange={(e) => setWebinarData({...webinarData, title: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what attendees will learn..."
                    value={webinarData.description}
                    onChange={(e) => setWebinarData({...webinarData, description: e.target.value})}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="presenter">Presenter Name *</Label>
                  <Input
                    id="presenter"
                    placeholder="Enter presenter name..."
                    value={webinarData.presenter}
                    onChange={(e) => setWebinarData({...webinarData, presenter: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule & Duration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={webinarData.date}
                      onChange={(e) => setWebinarData({...webinarData, date: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={webinarData.time}
                      onChange={(e) => setWebinarData({...webinarData, time: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    max="1440"
                    placeholder="90"
                    value={webinarData.duration}
                    onChange={(e) => setWebinarData({...webinarData, duration: parseInt(e.target.value) || 90})}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum: 24 hours (1440 minutes)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            
            {/* Webinar Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Registration Required</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Reminders</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recording Enabled</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chat Enabled</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Webinar Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Attendees</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Duration</span>
                  <span className="font-medium">24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recording Storage</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Replay Access</span>
                  <span className="font-medium">Forever</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}