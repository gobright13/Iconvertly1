import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Palette, 
  Mail, 
  Shield, 
  Globe, 
  Zap,
  Upload,
  Download,
  Save,
  Bell,
  Users,
  CreditCard,
  Key,
  Database,
  Smartphone
} from 'lucide-react';

export function LMSSettings() {
  const [settings, setSettings] = useState({
    platformName: 'Cliently LMS',
    platformDescription: 'Your comprehensive learning management system',
    allowRegistration: true,
    requireApproval: false,
    enableCertificates: true,
    enableGamification: true,
    enableAITutor: true,
    emailNotifications: true,
    smsNotifications: false,
    allowDiscussions: true,
    allowReviews: true,
    defaultLanguage: 'en',
    timezone: 'UTC'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          LMS Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your learning management system preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Platform Information
                </CardTitle>
                <CardDescription>
                  Basic information about your LMS platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={settings.platformName}
                      onChange={(e) => updateSetting('platformName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <select 
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platformDescription">Platform Description</Label>
                  <Textarea
                    id="platformDescription"
                    value={settings.platformDescription}
                    onChange={(e) => updateSetting('platformDescription', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowRegistration">Allow Public Registration</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow users to register for courses without approval
                    </p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => updateSetting('allowRegistration', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireApproval">Require Manual Approval</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manually approve all new student registrations
                    </p>
                  </div>
                  <Switch
                    id="requireApproval"
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Platform Branding
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your LMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Logo & Branding</h4>
                  <div className="space-y-2">
                    <Label>Platform Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload logo</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                      <p className="text-xs text-gray-600">Upload favicon</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Color Scheme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-coral-500 rounded border"></div>
                        <Input value="#FF6B6B" readOnly />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-600 rounded border"></div>
                        <Input value="#1A365D" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Settings */}
        <TabsContent value="features">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Core Features
                </CardTitle>
                <CardDescription>
                  Enable or disable key LMS features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCertificates">Certificates of Completion</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Auto-generate certificates when students complete courses
                    </p>
                  </div>
                  <Switch
                    id="enableCertificates"
                    checked={settings.enableCertificates}
                    onCheckedChange={(checked) => updateSetting('enableCertificates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableGamification">Gamification</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable badges, leaderboards, and achievement systems
                    </p>
                  </div>
                  <Switch
                    id="enableGamification"
                    checked={settings.enableGamification}
                    onCheckedChange={(checked) => updateSetting('enableGamification', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableAITutor">AI Tutor Assistant</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI-powered student support and question answering
                    </p>
                  </div>
                  <Switch
                    id="enableAITutor"
                    checked={settings.enableAITutor}
                    onCheckedChange={(checked) => updateSetting('enableAITutor', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowDiscussions">Discussion Forums</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable student discussions for each lesson
                    </p>
                  </div>
                  <Switch
                    id="allowDiscussions"
                    checked={settings.allowDiscussions}
                    onCheckedChange={(checked) => updateSetting('allowDiscussions', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowReviews">Course Reviews</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow students to rate and review courses
                    </p>
                  </div>
                  <Switch
                    id="allowReviews"
                    checked={settings.allowReviews}
                    onCheckedChange={(checked) => updateSetting('allowReviews', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how students receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send course updates and reminders via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send important alerts via SMS
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>
                  Connect your LMS with external services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Zoom Integration</h4>
                      <Badge variant="secondary">Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Live webinars and virtual classrooms
                    </p>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Stripe Payments</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Course payments and subscriptions
                    </p>
                    <Button size="sm">Connect</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Mailchimp</h4>
                      <Badge variant="secondary">Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Email marketing automation
                    </p>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Slack</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Team notifications and updates
                    </p>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Backup, export, and data management options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <div className="font-medium">Export Data</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Download all course data
                        </div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-500" />
                      <div className="text-left">
                        <div className="font-medium">Backup Settings</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Configure auto-backups
                        </div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-purple-500" />
                      <div className="text-left">
                        <div className="font-medium">API Keys</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Manage API access
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile App Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Offline Downloads</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow students to download content for offline viewing
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send push notifications to mobile app users
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-coral-500 hover:bg-coral-600">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}