import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Link,
  Share2,
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  Award,
  Zap,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Gift,
  Settings,
  ExternalLink,
  UserPlus
} from 'lucide-react';

export default function Affiliates() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  // Mock data for affiliate dashboard
  const affiliateStats = {
    totalAffiliates: 342,
    activeAffiliates: 289,
    totalCommissions: 45680,
    pendingCommissions: 12450,
    thisMonthEarnings: 15680,
    conversionRate: 12.8,
    averageOrderValue: 289,
    topPerformerCommission: 3450
  };

  const topAffiliates = [
    {
      id: 1,
      name: 'Sarah Marketing Pro',
      email: 'sarah@marketingpro.com',
      avatar: 'SM',
      totalEarnings: 28450,
      thisMonth: 3450,
      referrals: 156,
      conversionRate: 18.5,
      tier: 'Platinum',
      joinDate: '2024-01-15',
      lastActivity: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mike Business Builder',
      email: 'mike@bizbuilder.com',
      avatar: 'MB',
      totalEarnings: 21340,
      thisMonth: 2890,
      referrals: 134,
      conversionRate: 15.2,
      tier: 'Gold',
      joinDate: '2024-02-10',
      lastActivity: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Lisa Growth Hacker',
      email: 'lisa@growthhack.com',
      avatar: 'LG',
      totalEarnings: 18750,
      thisMonth: 2150,
      referrals: 98,
      conversionRate: 21.3,
      tier: 'Gold',
      joinDate: '2024-01-28',
      lastActivity: '5 hours ago',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Sales Expert',
      email: 'david@salesexpert.com',
      avatar: 'DS',
      totalEarnings: 15680,
      thisMonth: 1890,
      referrals: 89,
      conversionRate: 14.7,
      tier: 'Silver',
      joinDate: '2024-03-05',
      lastActivity: '3 days ago',
      status: 'active'
    }
  ];

  const commissionTiers = [
    {
      name: 'Bronze',
      threshold: 0,
      commission: 25,
      benefits: ['Basic marketing materials', 'Monthly newsletter', 'Standard support'],
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    },
    {
      name: 'Silver',
      threshold: 10000,
      commission: 35,
      benefits: ['Premium materials', 'Bi-weekly training', 'Priority support', 'Custom landing pages'],
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    },
    {
      name: 'Gold',
      threshold: 25000,
      commission: 45,
      benefits: ['All Silver benefits', 'Weekly 1:1 coaching', 'Custom funnels', 'Advanced analytics'],
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    },
    {
      name: 'Platinum',
      threshold: 50000,
      commission: 55,
      benefits: ['All Gold benefits', 'Personal account manager', 'White-label options', 'Revenue sharing'],
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    }
  ];

  const recentActivities = [
    { type: 'new_signup', affiliate: 'Sarah Marketing Pro', amount: 0, time: '2 hours ago', description: 'New referral signup: john@example.com' },
    { type: 'commission', affiliate: 'Mike Business Builder', amount: 145, time: '4 hours ago', description: 'Commission earned from premium plan purchase' },
    { type: 'payout', affiliate: 'Lisa Growth Hacker', amount: 890, time: '1 day ago', description: 'Monthly commission payout processed' },
    { type: 'milestone', affiliate: 'David Sales Expert', amount: 0, time: '2 days ago', description: 'Reached Silver tier milestone' }
  ];

  const marketingMaterials = [
    {
      id: 1,
      title: 'Email Templates Pack',
      description: 'Ready-to-use email templates for affiliate promotions',
      type: 'email',
      downloads: 245,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Social Media Kit',
      description: 'Instagram stories, Facebook posts, and Twitter content',
      type: 'social',
      downloads: 189,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Banner Ads Collection',
      description: 'Various sizes of display banners with tracking links',
      type: 'banner',
      downloads: 156,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Product Demo Videos',
      description: 'High-quality videos showcasing key features',
      type: 'video',
      downloads: 134,
      lastUpdated: '1 week ago'
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Platinum': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_signup': return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'commission': return <DollarSign className="w-4 h-4 text-blue-500" />;
      case 'payout': return <ArrowUpRight className="w-4 h-4 text-purple-500" />;
      case 'milestone': return <Award className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleCopyLink = (affiliateId: number) => {
    const link = `https://yourapp.com/ref/${affiliateId}`;
    navigator.clipboard.writeText(link);
    toast.success('Affiliate link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Affiliate Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your affiliate program and track performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Affiliate
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Affiliates</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{affiliateStats.totalAffiliates}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {affiliateStats.activeAffiliates} active
                  </p>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Commissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${affiliateStats.totalCommissions.toLocaleString()}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    ${affiliateStats.pendingCommissions.toLocaleString()} pending
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${affiliateStats.thisMonthEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">+23% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {affiliateStats.conversionRate}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">+2.1% improvement</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-coral-600 dark:text-coral-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tiers">Tiers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>
                    Your highest earning affiliates this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topAffiliates.slice(0, 3).map((affiliate, index) => (
                      <div key={affiliate.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-coral-100 dark:bg-coral-900 text-coral-600 dark:text-coral-400 font-medium text-sm">
                            {index + 1}
                          </div>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
                            {affiliate.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{affiliate.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">${affiliate.thisMonth.toLocaleString()}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.conversionRate}% conv.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest affiliate program activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.affiliate}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                        {activity.amount > 0 && (
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">
                              +${activity.amount}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Affiliates Tab */}
          <TabsContent value="affiliates" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search affiliates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="active">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Affiliates List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Affiliates ({topAffiliates.length})
                  </span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Affiliate
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAffiliates.map((affiliate) => (
                    <div key={affiliate.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
                          {affiliate.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900 dark:text-white">{affiliate.name}</p>
                            <Badge className={getTierColor(affiliate.tier)}>
                              {affiliate.tier}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.email}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{affiliate.referrals} referrals</span>
                            <span>{affiliate.conversionRate}% conversion</span>
                            <span>Joined {affiliate.joinDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">
                            ${affiliate.totalEarnings.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${affiliate.thisMonth} this month
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyLink(affiliate.id)}
                          >
                            <Link className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commission Tiers Tab */}
          <TabsContent value="tiers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Commission Tiers
                </CardTitle>
                <CardDescription>
                  Manage your affiliate commission structure and benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {commissionTiers.map((tier) => (
                    <Card key={tier.name} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Badge className={tier.color}>
                              {tier.name}
                            </Badge>
                          </CardTitle>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {tier.commission}%
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Commission
                            </p>
                          </div>
                        </div>
                        <CardDescription>
                          Minimum earnings: ${tier.threshold.toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">Benefits:</h4>
                          <ul className="space-y-2">
                            {tier.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Marketing Materials
                  </span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Material
                  </Button>
                </CardTitle>
                <CardDescription>
                  Provide your affiliates with high-converting marketing assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketingMaterials.map((material) => (
                    <Card key={material.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              {material.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {material.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                              <span>{material.downloads} downloads</span>
                              <span>Updated {material.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Affiliate Program Settings
                </CardTitle>
                <CardDescription>
                  Configure your affiliate program parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Commission Rate (%)</label>
                      <Input type="number" defaultValue="25" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cookie Duration (days)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Minimum Payout ($)</label>
                      <Input type="number" defaultValue="50" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Payout Schedule</label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Auto-approve Affiliates</label>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Allow Self-referrals</label>
                      <Switch />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}