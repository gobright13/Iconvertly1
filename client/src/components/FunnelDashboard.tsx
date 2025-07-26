import React, { useState } from 'react';
import { Plus, Zap, Eye, Edit, Play, Pause, Trash2, Copy, Download, Share2, Search, Filter, MoreHorizontal, Calendar, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface FunnelDashboardProps {
  onCreateNew: () => void;
  onCreateAI: () => void;
  onEditFunnel: (funnel: any) => void;
}

const FunnelDashboard: React.FC<FunnelDashboardProps> = ({ onCreateNew, onCreateAI, onEditFunnel }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockFunnels = [
    {
      id: 1,
      title: "Lead Generation Masterclass",
      status: "active",
      type: "lead-generation",
      pages: 5,
      conversions: "12.5%",
      leads: 1247,
      revenue: "$18,680",
      lastModified: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      description: "High-converting lead magnet funnel with email capture sequence",
      template: "Lead Generation Template",
      traffic: 9956,
      conversionRate: 12.5,
      totalRevenue: 18680
    },
    {
      id: 2,
      title: "High-Ticket Sales Funnel",
      status: "active",
      type: "sales",
      pages: 7,
      conversions: "8.3%",
      leads: 843,
      revenue: "$127,450",
      lastModified: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      description: "Premium coaching/consulting sales funnel with application process",
      template: "Sales Funnel Template",
      traffic: 10146,
      conversionRate: 8.3,
      totalRevenue: 127450
    },
    {
      id: 3,
      title: "E-commerce Product Launch",
      status: "draft",
      type: "product-launch",
      pages: 10,
      conversions: "0%",
      leads: 0,
      revenue: "$0",
      lastModified: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      description: "Complete product launch funnel with pre-launch sequence",
      template: "Product Launch Template",
      traffic: 0,
      conversionRate: 0,
      totalRevenue: 0
    },
    {
      id: 4,
      title: "Webinar Registration Funnel",
      status: "paused",
      type: "webinar",
      pages: 6,
      conversions: "15.2%",
      leads: 2341,
      revenue: "$23,410",
      lastModified: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
      description: "Drive webinar registrations and maximize attendance",
      template: "Webinar Template",
      traffic: 15395,
      conversionRate: 15.2,
      totalRevenue: 23410
    },
    {
      id: 5,
      title: "SaaS Free Trial Funnel",
      status: "active",
      type: "saas",
      pages: 8,
      conversions: "22.1%",
      leads: 1156,
      revenue: "$46,240",
      lastModified: "4 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      description: "Convert visitors to trial users and paying subscribers",
      template: "SaaS Template",
      traffic: 5230,
      conversionRate: 22.1,
      totalRevenue: 46240
    },
    {
      id: 6,
      title: "Membership Site Funnel",
      status: "active",
      type: "membership",
      pages: 9,
      conversions: "9.8%",
      leads: 567,
      revenue: "$28,350",
      lastModified: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      description: "Recruit and retain membership site subscribers",
      template: "Membership Template",
      traffic: 5785,
      conversionRate: 9.8,
      totalRevenue: 28350
    }
  ];

  // Dashboard stats
  const totalFunnels = mockFunnels.length;
  const activeFunnels = mockFunnels.filter(f => f.status === 'active').length;
  const totalLeads = mockFunnels.reduce((sum, f) => sum + f.leads, 0);
  const totalRevenue = mockFunnels.reduce((sum, f) => sum + f.totalRevenue, 0);
  const avgConversion = mockFunnels.reduce((sum, f) => sum + f.conversionRate, 0) / mockFunnels.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Live';
      case 'paused': return 'Paused';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lead-generation': return 'bg-blue-500';
      case 'sales': return 'bg-purple-500';
      case 'product-launch': return 'bg-orange-500';
      case 'webinar': return 'bg-green-500';
      case 'saas': return 'bg-cyan-500';
      case 'membership': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFunnels = mockFunnels.filter(funnel => {
    const matchesSearch = funnel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         funnel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || funnel.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handlePreviewFunnel = (funnel: any) => {
    const previewUrl = `/funnel-preview/${funnel.id}`;
    window.open(previewUrl, '_blank');
    toast.success('Opening funnel preview...');
  };

  const handleStatusToggle = (funnel: any) => {
    const newStatus = funnel.status === 'active' ? 'paused' : 'active';
    toast.success(`Funnel ${newStatus === 'active' ? 'activated' : 'paused'}`);
  };

  const handleDuplicate = (funnel: any) => {
    toast.success('Funnel duplicated successfully');
  };

  const handleDelete = (funnel: any) => {
    toast.success('Funnel deleted successfully');
  };

  const handleExport = (funnel: any) => {
    toast.success('Exporting funnel...');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Funnel Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and optimize your high-converting funnels
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create Funnel
          </Button>
          <Button 
            onClick={onCreateAI}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Zap className="w-4 h-4 mr-2" />
            AI Generate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funnels</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFunnels}</div>
            <p className="text-xs text-muted-foreground">
              {activeFunnels} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search funnels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Funnel Tabs and List */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Funnels ({mockFunnels.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({mockFunnels.filter(f => f.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({mockFunnels.filter(f => f.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({mockFunnels.filter(f => f.status === 'paused').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {filteredFunnels.length === 0 ? (
            <Card className="border-2 border-dashed border-muted-foreground/25">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Zap className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No funnels found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {selectedTab === 'all' 
                    ? "Get started by creating your first AI-powered funnel"
                    : `No ${selectedTab} funnels available`
                  }
                </p>
                <Button 
                  onClick={onCreateAI}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Create Your First AI Funnel
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunnels.map((funnel) => (
                <Card key={funnel.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={funnel.thumbnail}
                      alt={funnel.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`text-white ${getStatusColor(funnel.status)}`}>
                        {getStatusText(funnel.status)}
                      </Badge>
                      <Badge className={`text-white ${getTypeColor(funnel.type)}`}>
                        {funnel.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditFunnel(funnel)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePreviewFunnel(funnel)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(funnel)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExport(funnel)}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(funnel)} className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {funnel.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {funnel.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Pages</p>
                        <p className="font-semibold">{funnel.pages}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion</p>
                        <p className="font-semibold text-green-600">{funnel.conversions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Leads</p>
                        <p className="font-semibold">{funnel.leads.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-semibold text-blue-600">{funnel.revenue}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => onEditFunnel(funnel)} className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePreviewFunnel(funnel)} className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleStatusToggle(funnel)}>
                        {funnel.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground border-t pt-2">
                      <div className="flex items-center justify-between">
                        <span>Last modified: {funnel.lastModified}</span>
                        <Badge variant="outline" className="text-xs">
                          {funnel.template}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunnelDashboard;