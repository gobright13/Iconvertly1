import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  PlayCircle, 
  Settings, 
  Calendar, 
  Users, 
  Clock,
  Upload,
  Globe,
  Palette,
  Zap
} from 'lucide-react';

interface WebinarType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  badge: string;
  features: string[];
  color: string;
}

export function WebinarCreate() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);

  const webinarTypes: WebinarType[] = [
    {
      id: 'live',
      title: 'Live Webinar',
      description: 'Real-time interactive webinar with live host',
      icon: Video,
      badge: 'Most Interactive',
      features: [
        'Live interaction',
        'Real-time Q&A', 
        'Dynamic polls',
        'Chat moderation'
      ],
      color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
    },
    {
      id: 'automated',
      title: 'Automated Webinar',
      description: 'Pre-recorded content with simulated live experience',
      icon: PlayCircle,
      badge: 'Most Popular',
      features: [
        '24/7 availability',
        'Consistent delivery',
        'Simulated chat',
        'Automated follow-up'
      ],
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
    },
    {
      id: 'hybrid',
      title: 'Hybrid Webinar',
      description: 'Pre-recorded video with live Q&A and interaction',
      icon: Settings,
      badge: 'Most Flexible',
      features: [
        'Best of both worlds',
        'Live segments',
        'Mixed content',
        'Flexible timing'
      ],
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
    }
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentStep(2);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Webinar Type
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select the format that best fits your goals and audience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {webinarTypes.map((type) => (
                <Card
                  key={type.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${type.color}`}>
                        <type.icon className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {type.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Select {type.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Webinar Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure the basic information for your webinar
              </p>
            </div>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="registration">Registration</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Webinar Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your webinar title"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what attendees will learn"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="product">Product Demo</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scheduling" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Start Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <Input
                      id="time"
                      type="time"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="recurring" className="rounded" />
                  <Label htmlFor="recurring">Make this a recurring webinar</Label>
                </div>
              </TabsContent>

              <TabsContent value="registration" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select attendee limit" />
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
                <div className="space-y-2">
                  <Label>Registration Requirements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requirePhone" className="rounded" />
                      <Label htmlFor="requirePhone">Require phone number</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requireCompany" className="rounded" />
                      <Label htmlFor="requireCompany">Require company name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requireTitle" className="rounded" />
                      <Label htmlFor="requireTitle">Require job title</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                {selectedType === 'automated' || selectedType === 'hybrid' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="videoUpload">Upload Webinar Video</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag and drop your video file here, or click to browse
                        </p>
                        <Button variant="outline" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentationUpload">Upload Presentation (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upload slides or presentation materials
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="agenda">Webinar Agenda</Label>
                      <Textarea
                        id="agenda"
                        placeholder="Outline your webinar topics and timing"
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Speaker Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add notes and talking points"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Continue to Features
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Advanced Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure engagement tools and automation features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Engagement Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enable real-time chat with attendees
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Q&A Session</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow attendees to submit questions
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Polls & Surveys</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Create interactive polls during webinar
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Screen Sharing</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Share your screen with attendees
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Automation Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Recording</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically record the webinar
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Reminders</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send automated reminder emails
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Follow-up Sequences</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trigger email sequences after webinar
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Chat Moderation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        AI-powered chat filtering and responses
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  Create Webinar
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-coral-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step < currentStep
                      ? 'bg-coral-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep} of 3
          </p>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}