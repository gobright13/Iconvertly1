import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Calendar,
  Users,
  Target,
  Clock,
  Settings,
  Bot,
  Bell
} from 'lucide-react';

export function WebinarAutomation() {
  const automationFeatures = [
    {
      title: 'Email Reminders',
      description: 'Automatically send email reminders to registrants',
      icon: Mail,
      enabled: true,
      category: 'Communication'
    },
    {
      title: 'SMS Notifications',
      description: 'Send SMS reminders and updates',
      icon: MessageSquare,
      enabled: false,
      category: 'Communication'
    },
    {
      title: 'Auto Recording',
      description: 'Automatically record all webinars',
      icon: Clock,
      enabled: true,
      category: 'Content'
    },
    {
      title: 'Follow-up Sequences',
      description: 'Trigger email sequences after webinar ends',
      icon: Target,
      enabled: true,
      category: 'Follow-up'
    },
    {
      title: 'AI Chat Moderation',
      description: 'AI-powered chat filtering and responses',
      icon: Bot,
      enabled: false,
      category: 'Engagement'
    },
    {
      title: 'Smart Scheduling',
      description: 'AI-optimized time slot recommendations',
      icon: Calendar,
      enabled: true,
      category: 'Scheduling'
    }
  ];

  const aiFeatures = [
    {
      title: 'AI Webinar Generation',
      description: 'Generate complete webinars from outline to slides',
      status: 'Available',
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    {
      title: 'Smart Recap Assistant',
      description: 'Automatically create highlights and key timestamps',
      status: 'Beta',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      title: 'Behavior-Triggered Sequences',
      description: 'Custom follow-ups based on attendee behavior',
      status: 'Available',
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    {
      title: 'Personalized Landing Pages',
      description: 'Dynamic pages based on user segments',
      status: 'Coming Soon',
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    }
  ];

  const reminderSettings = [
    { time: '24 hours before', enabled: true, type: 'email' },
    { time: '2 hours before', enabled: true, type: 'email' },
    { time: '15 minutes before', enabled: false, type: 'sms' },
    { time: '5 minutes before', enabled: false, type: 'push' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Webinar Automation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure automated workflows and AI-powered features
          </p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Global Settings
        </Button>
      </div>

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI-Powered Features
          </CardTitle>
          <CardDescription>
            Advanced AI capabilities to enhance your webinars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <Badge className={`text-xs ${feature.color}`}>
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {feature.description}
                </p>
                <Button 
                  size="sm" 
                  variant={feature.status === 'Available' ? 'default' : 'outline'}
                  disabled={feature.status === 'Coming Soon'}
                >
                  {feature.status === 'Available' ? 'Configure' : 
                   feature.status === 'Beta' ? 'Try Beta' : 'Coming Soon'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Automation Settings
          </CardTitle>
          <CardDescription>
            Enable and configure automated workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {['Communication', 'Content', 'Follow-up', 'Engagement', 'Scheduling'].map((category) => (
              <div key={category}>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  {category}
                </h3>
                <div className="space-y-3">
                  {automationFeatures
                    .filter(feature => feature.category === category)
                    .map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {feature.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={feature.enabled} />
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminder Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Reminder Settings
          </CardTitle>
          <CardDescription>
            Configure automated reminder notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminderSettings.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch checked={reminder.enabled} />
                    <Label className="font-medium text-gray-900 dark:text-white">
                      {reminder.time}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {reminder.type.toUpperCase()}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Edit Template
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Pro Tip: Smart Timing
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Enable AI-optimized reminder timing based on attendee behavior patterns 
              to increase show-up rates by up to 35%.
            </p>
            <Button size="sm" variant="outline" className="mt-2">
              Enable Smart Timing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Behavioral Triggers
          </CardTitle>
          <CardDescription>
            Set up automated actions based on attendee behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Early Leavers (Left before 50% completion)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send shorter recap video + special offer
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <Button variant="outline" size="sm">
                Configure Sequence
              </Button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    No-Shows (Registered but didn't attend)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send replay access + next webinar invitation
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <Button variant="outline" size="sm">
                Configure Sequence
              </Button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Highly Engaged (Stayed 80%+ + asked questions)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send premium content + consultation booking
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <Button variant="outline" size="sm">
                Configure Sequence
              </Button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Clicked CTA but didn't purchase
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send objection-handling content + limited-time bonus
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <Button variant="outline" size="sm">
                Configure Sequence
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <Target className="w-4 h-4 mr-2" />
              Create New Behavioral Trigger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}