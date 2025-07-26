import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Mail, 
  Database,
  CreditCard,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function WebinarIntegrations() {
  const integrations = [
    {
      name: 'Zapier',
      description: 'Connect with 5000+ apps and automate workflows',
      icon: Zap,
      status: 'Connected',
      category: 'Automation',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    },
    {
      name: 'Mailchimp',
      description: 'Sync attendees to email lists automatically',
      icon: Mail,
      status: 'Connected',
      category: 'Email Marketing',
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
    },
    {
      name: 'HubSpot CRM',
      description: 'Add leads directly to your CRM pipeline',
      icon: Database,
      status: 'Available',
      category: 'CRM',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    },
    {
      name: 'Stripe',
      description: 'Process payments for webinar offers',
      icon: CreditCard,
      status: 'Connected',
      category: 'Payments',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    },
    {
      name: 'Zoom',
      description: 'Host live webinars through Zoom',
      icon: Users,
      status: 'Available',
      category: 'Video',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      name: 'Google Analytics',
      description: 'Track webinar performance and conversions',
      icon: BarChart3,
      status: 'Connected',
      category: 'Analytics',
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      name: 'Slack',
      description: 'Get notifications about webinar events',
      icon: MessageSquare,
      status: 'Available',
      category: 'Communication',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    },
    {
      name: 'Calendly',
      description: 'Book follow-up meetings with attendees',
      icon: Calendar,
      status: 'Available',
      category: 'Scheduling',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Available':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Available':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    }
  };

  const categories = ['All', 'Automation', 'Email Marketing', 'CRM', 'Payments', 'Video', 'Analytics', 'Communication', 'Scheduling'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Integrations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your webinar platform with your favorite tools
          </p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Manage API Keys
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Connected
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Available
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Available
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {integration.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </Badge>
                
                {integration.status === 'Connected' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button size="sm">
                    Connect
                  </Button>
                )}
              </div>

              {integration.status === 'Connected' && (
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300">
                  ✓ Last sync: 2 minutes ago
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Integration Features</CardTitle>
          <CardDescription>
            Configure advanced automation and data flow options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Real-time Data Sync
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instantly sync attendee data across all connected platforms
                </p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Bidirectional Sync
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Allow data to flow both ways between platforms
                </p>
              </div>
              <Switch checked={false} />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Custom Webhooks
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Send custom data to any endpoint after webinar events
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Data Transformation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Map and transform data fields between different platforms
                </p>
              </div>
              <Button variant="outline" size="sm">
                Set Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Automation Workflows</CardTitle>
          <CardDescription>
            Pre-built workflows you can enable with one click
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Lead to CRM Pipeline
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Automatically add webinar registrants to your CRM and trigger follow-up sequences
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">Mailchimp</Badge>
                <span className="text-xs text-gray-400">→</span>
                <Badge variant="secondary" className="text-xs">HubSpot</Badge>
              </div>
              <Button size="sm" variant="outline">
                Enable Workflow
              </Button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Payment to Fulfillment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Process payments and automatically deliver digital products or course access
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">Stripe</Badge>
                <span className="text-xs text-gray-400">→</span>
                <Badge variant="secondary" className="text-xs">Zapier</Badge>
              </div>
              <Button size="sm" variant="outline">
                Enable Workflow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}