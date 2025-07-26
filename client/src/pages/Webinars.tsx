import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Video, 
  Calendar, 
  Users, 
  Play, 
  Settings,
  Star,
  Clock,
  TrendingUp,
  BarChart3,
  Zap,
  Eye,
  Edit,
  ArrowRight,
  Share2,
  Copy,
  Trash2,
  MoreHorizontal,
  Filter,
  Search,
  SortAsc,
  Activity,
  DollarSign,
  Target,
  MessageSquare,
  Gift,
  Monitor,
  UserPlus,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface WebinarOption {
  id: string;
  title: string;
  description: string;
  type: 'live' | 'automated' | 'hybrid';
  features: string[];
  icon: string;
  color: string;
}

export default function Webinars() {
  const navigate = useNavigate();
  const [showTypeSelection, setShowTypeSelection] = useState(false);

  const webinarOptions: WebinarOption[] = [
    {
      id: "live-webinar",
      title: "Live Webinar",
      description: "Real-time interactive sessions with Q&A, polls, and live chat",
      type: "live",
      features: ["Real-time interaction", "Live Q&A", "Screen sharing", "Recorded for replay", "Audience polls"],
      icon: "🎥",
      color: "from-red-500 to-pink-500"
    },
    {
      id: "automated-webinar", 
      title: "Automated Webinar",
      description: "Pre-recorded sessions that run on autopilot with simulated live features",
      type: "automated",
      features: ["24/7 availability", "Simulated live chat", "Automated offers", "Registration tracking", "Analytics dashboard"],
      icon: "⚙️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "hybrid-webinar",
      title: "Hybrid Webinar",
      description: "Best of both worlds - live presentation with automated follow-up",
      type: "hybrid", 
      features: ["Live + automated", "Smart replay", "Dynamic content", "AI-powered insights", "Multi-session support"],
      icon: "🚀",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const advancedWebinars = [
    {
      id: 'webinar-1',
      title: 'Complete Digital Marketing Mastery 2025',
      description: 'Advanced strategies for scaling your business with cutting-edge marketing techniques',
      date: 'Today, 2:00 PM',
      duration: '90 minutes',
      attendees: 1247,
      registered: 1847,
      capacity: 'unlimited',
      type: 'live',
      status: 'Live',
      viewers: 892,
      conversion: 23.4,
      revenue: 45680,
      presenter: 'Sarah Marketing Expert',
      category: 'Marketing',
      tags: ['Marketing', 'Digital', 'Strategy'],
      thumbnail: '/api/placeholder/300/200',
      rating: 4.9,
      automations: ['Email Sequences', 'Follow-up', 'Replay Access'],
      features: ['HD Streaming', 'Interactive Chat', 'Q&A', 'Polls', 'Screen Share'],
      offer: {
        title: 'Marketing Mastery Course',
        price: 197,
        salePrice: 97,
        discount: 51
      }
    },
    {
      id: 'webinar-2',
      title: 'AI-Powered Lead Generation Revolution',
      description: 'Master AI tools to generate unlimited high-quality leads automatically',
      date: 'Tomorrow, 3:00 PM',
      duration: '2 hours',
      attendees: 0,
      registered: 856,
      capacity: 'unlimited',
      type: 'scheduled',
      status: 'Scheduled',
      viewers: 0,
      conversion: 0,
      revenue: 0,
      presenter: 'Mike AI Specialist',
      category: 'AI & Automation',
      tags: ['AI', 'Lead Generation', 'Automation'],
      thumbnail: '/api/placeholder/300/200',
      rating: 0,
      automations: ['Registration Reminders', 'Pre-webinar Sequence'],
      features: ['4K Streaming', 'AI Chat Bot', 'Live Polls', 'Breakout Rooms'],
      offer: {
        title: 'AI Lead Gen Toolkit',
        price: 297,
        salePrice: 147,
        discount: 51
      }
    },
    {
      id: 'webinar-3',
      title: 'High-Converting Sales Funnel Blueprint',
      description: 'Build million-dollar sales funnels that convert visitors into customers',
      date: 'Jan 25, 1:00 PM',
      duration: '3 hours',
      attendees: 0,
      registered: 634,
      capacity: 'unlimited',
      type: 'evergreen',
      status: 'Automated',
      viewers: 0,
      conversion: 18.7,
      revenue: 28450,
      presenter: 'Lisa Funnel Expert',
      category: 'Sales & Funnels',
      tags: ['Sales Funnels', 'Conversion', 'Blueprint'],
      thumbnail: '/api/placeholder/300/200',
      rating: 4.8,
      automations: ['Just-in-Time', 'Email Follow-up', 'Replay Sequences'],
      features: ['Evergreen Automation', 'Smart Chat', 'Dynamic Offers', 'A/B Testing'],
      offer: {
        title: 'Funnel Builder Pro',
        price: 497,
        salePrice: 197,
        discount: 60
      }
    },
    {
      id: 'webinar-4',
      title: 'Social Media Empire: Scale to 7-Figures',
      description: 'Transform your social media presence into a profitable business empire',
      date: 'Next Week',
      duration: '2.5 hours',
      attendees: 0,
      registered: 423,
      capacity: 'unlimited',
      type: 'hybrid',
      status: 'Draft',
      viewers: 0,
      conversion: 0,
      revenue: 0,
      presenter: 'David Social Expert',
      category: 'Social Media',
      tags: ['Social Media', 'Scaling', 'Business'],
      thumbnail: '/api/placeholder/300/200',
      rating: 0,
      automations: ['Launch Sequence', 'Engagement Campaigns'],
      features: ['Multi-Platform Streaming', 'Social Integration', 'Live Commerce'],
      offer: {
        title: 'Social Empire Course',
        price: 397,
        salePrice: 197,
        discount: 50
      }
    }
  ];

  const webinars = [
    {
      id: 'webinar-1',
      title: 'Advanced Marketing Strategies for 2025',
      description: 'Learn cutting-edge marketing techniques that drive real results including AI-powered automation, advanced funnel optimization, and data-driven decision making.',
      type: 'Live Webinar',
      status: 'Live',
      date: 'Today, 2:00 PM',
      duration: '60 min',
      registered: 247,
      attended: 189,
      conversion: 18.5,
      revenue: 12450,
      rating: 4.8,
      category: 'Marketing',
      presenter: 'John Marketing Expert',
      tags: ['Advanced', 'Strategy', 'ROI', 'AI-Powered'],
      thumbnail: '/api/placeholder/300/200',
      features: ['Live Q&A', 'Screen Share', 'Interactive Chat', 'Real-time Polls', 'Special Offers', 'Breakout Rooms'],
      automations: ['Email Sequences', 'SMS Follow-ups', 'Social Media Posts'],
      engagementTools: ['Polls', 'Quizzes', 'Surveys', 'Chat Moderation'],
      offerManagement: ['Flash Sales', 'Bundle Deals', 'Payment Plans']
    },
    {
      id: 'webinar-2', 
      title: 'AI-Powered Lead Generation Masterclass',
      description: 'Discover how AI can revolutionize your lead generation process with advanced machine learning algorithms, predictive analytics, and automated nurturing sequences.',
      type: 'Scheduled',
      status: 'Scheduled', 
      date: 'Tomorrow, 3:00 PM',
      duration: '90 min',
      registered: 156,
      attended: 0,
      conversion: 0,
      revenue: 0,
      rating: 4.9,
      category: 'AI & Technology',
      presenter: 'Sarah AI Expert',
      tags: ['AI', 'Lead Gen', 'Automation', 'Machine Learning'],
      thumbnail: '/api/placeholder/300/200',
      features: ['AI Tools Demo', 'Live Chat', 'Resource Library', 'Expert Q&A', 'Case Studies'],
      automations: ['AI Lead Scoring', 'Predictive Analytics', 'Auto Follow-ups'],
      engagementTools: ['Interactive Demos', 'Live Coding', 'AI Assistant'],
      offerManagement: ['Early Bird Pricing', 'VIP Access', 'Consultation Booking']
    },
    {
      id: 'webinar-3',
      title: 'Conversion Optimization Workshop',
      description: 'Master the art of converting visitors into paying customers through advanced A/B testing, psychological triggers, and data-driven optimization strategies.',
      type: 'Automated',
      status: 'Automated',
      date: 'Evergreen',
      duration: '75 min', 
      registered: 342,
      attended: 289,
      conversion: 22.1,
      revenue: 18960,
      rating: 4.6,
      category: 'Conversion',
      presenter: 'Mike Conversion Pro',
      tags: ['CRO', 'Sales', 'Funnel', 'Psychology'],
      thumbnail: '/api/placeholder/300/200',
      features: ['Auto Replay', 'Smart Chat Bot', 'Dynamic Offers', 'Advanced Analytics', 'Heat Maps'],
      automations: ['Behavioral Triggers', 'Dynamic Content', 'Smart Segmentation'],
      engagementTools: ['Interactive Calculators', 'Assessment Tools', 'Progress Tracking'],
      offerManagement: ['Dynamic Pricing', 'Scarcity Timers', 'Personalized Offers']
    },
    {
      id: 'webinar-4',
      title: 'Social Media Growth Acceleration',
      description: 'Explosive growth strategies for social media platforms with viral content creation, influencer partnerships, and algorithmic optimization techniques.',
      type: 'Hybrid',
      status: 'Upcoming',
      date: 'Jan 25, 1:00 PM',
      duration: '120 min',
      registered: 89,
      attended: 0,
      conversion: 0,
      revenue: 0,
      rating: 4.7,
      category: 'Social Media',
      presenter: 'Lisa Growth Hacker',
      tags: ['Social Media', 'Growth', 'Viral', 'Content'],
      thumbnail: '/api/placeholder/300/200',
      features: ['Live + Automated', 'Multi-Platform Streaming', 'Content Templates', 'Growth Tools'],
      automations: ['Cross-Platform Posting', 'Engagement Automation', 'Analytics Reports'],
      engagementTools: ['Social Polls', 'Live Reactions', 'Hashtag Tracking'],
      offerManagement: ['Course Bundles', 'Coaching Packages', 'Tool Access']
    }
  ];

  const recentWebinars = webinars.slice(0, 3);

  const handleCreateWebinar = () => {
    setShowTypeSelection(true);
  };

  const handleTypeSelect = (type: string) => {
    setShowTypeSelection(false);
    navigate(`/webinar/create/${type}`);
  };

  const handleDirectNavigation = (type: string) => {
    navigate(`/webinar/create/${type}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'Scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Upcoming': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (showTypeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
        <div className="mx-auto max-w-6xl space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Choose Your Webinar Type</h1>
              <p className="text-muted-foreground">Select the format that best fits your goals and audience</p>
            </div>
            <Button variant="outline" onClick={() => setShowTypeSelection(false)}>
              Back to Webinars
            </Button>
          </div>

          {/* Webinar Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webinarOptions.map((option) => (
              <div key={option.id} className="group relative">
                <Card 
                  className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 hover:border-blue-300"
                  onClick={() => handleTypeSelect(option.type)}
                >
                  <CardHeader className={`bg-gradient-to-br ${option.color} text-white rounded-t-lg`}>
                    <div className="text-center space-y-2">
                      <div className="text-3xl">{option.icon}</div>
                      <CardTitle className="text-white">{option.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full group-hover:bg-primary/90">
                      Select {option.type} Webinar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-coral-600 to-navy-600 bg-clip-text text-transparent">
              Webinar Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Create, manage, and optimize your webinars for maximum engagement
            </p>
          </div>
        </div>

        {/* Webinar Creation Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Webinar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webinarOptions.map((option) => (
              <Card 
                key={option.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-coral-200 dark:hover:border-coral-800"
                onClick={() => handleDirectNavigation(option.type)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</p>
                      <ul className="space-y-1">
                        {option.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Max Attendees: Unlimited</span>
                        <span>Max Duration: 24 hours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Webinars</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.4%</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$47,892</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800 border-2">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Advanced Webinars */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {advancedWebinars.map((webinar) => (
                <Card 
                  key={webinar.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-coral-300 dark:hover:border-coral-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-bold group-hover:text-coral-600 transition-colors line-clamp-2">
                        {webinar.title}
                      </CardTitle>
                      {webinar.rating > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{webinar.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {webinar.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Status & Type */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={
                        webinar.status === 'Live' ? 'destructive' :
                        webinar.status === 'Scheduled' ? 'default' :
                        webinar.status === 'Automated' ? 'secondary' : 'outline'
                      }>
                        {webinar.status === 'Live' && '🔴'} {webinar.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {webinar.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {webinar.category}
                      </Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{webinar.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{webinar.registered} registered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{webinar.presenter}</span>
                      </div>
                    </div>

                    {/* Advanced Features Preview */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {webinar.features.slice(0, 4).map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                          >
                            {feature}
                          </span>
                        ))}
                        {webinar.features.length > 4 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                            +{webinar.features.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    {(webinar.conversion > 0 || webinar.revenue > 0) && (
                      <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                        {webinar.conversion > 0 && (
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600 dark:text-gray-400">{webinar.conversion}% conversion</span>
                          </div>
                        )}
                        {webinar.revenue > 0 && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600 dark:text-gray-400">${webinar.revenue.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Access Management Buttons */}
                    <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate(`/webinar/manage/${webinar.id}?tab=overview`)}
                        >
                          <Monitor className="w-3 h-3 mr-1" />
                          Live Control
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate(`/webinar/manage/${webinar.id}?tab=attendees`)}
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Attendees
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate(`/webinar/manage/${webinar.id}?tab=offers`)}
                        >
                          <Gift className="w-3 h-3 mr-1" />
                          Offers
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate(`/webinar/manage/${webinar.id}?tab=analytics`)}
                        >
                          <Activity className="w-3 h-3 mr-1" />
                          Analytics
                        </Button>
                      </div>

                      {/* Primary Action Button */}
                      <div className="flex gap-2">
                        {webinar.status === 'Live' ? (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium"
                            onClick={() => navigate(`/webinar/manage/${webinar.id}`)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Join Live Now
                          </Button>
                        ) : webinar.status === 'Scheduled' ? (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-medium"
                            onClick={() => navigate(`/webinar/manage/${webinar.id}`)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Manage Event
                          </Button>
                        ) : webinar.status === 'Automated' ? (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white font-medium"
                            onClick={() => navigate(`/webinar/manage/${webinar.id}`)}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Manage Automation
                          </Button>
                        ) : (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium"
                            onClick={() => navigate(`/webinar/manage/${webinar.id}`)}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Setup Webinar
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                          onClick={() => navigate(`/webinar/manage/${webinar.id}?tab=settings`)}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would show filtered content */}
          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Webinars</CardTitle>
                <CardDescription>Upcoming webinars and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Scheduled Webinars</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a new webinar to get started.
                  </p>
                  <Button onClick={handleCreateWebinar}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Webinar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Webinars</CardTitle>
                <CardDescription>Past webinars and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Webinars</h3>
                  <p className="text-muted-foreground">
                    Completed webinars will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Analytics</CardTitle>
                <CardDescription>Performance insights and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics will be available after your first webinar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}