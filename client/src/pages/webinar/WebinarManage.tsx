
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  Calendar, 
  Users, 
  Play, 
  Settings,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Clock,
  MessageSquare,
  Mail,
  Share2,
  Download,
  Edit3,
  Pause,
  StopCircle,
  Eye,
  Copy,
  ExternalLink,
  Mic,
  Camera,
  Share,
  UserPlus,
  Gift,
  Zap,
  Target,
  DollarSign,
  Activity,
  MoreHorizontal,
  Plus
} from "lucide-react";

export default function WebinarManage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [webinarData, setWebinarData] = useState<any>(null);
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [liveStats, setLiveStats] = useState({
    viewers: 0,
    registrations: 0,
    chatMessages: 0,
    offers: 0
  });

  // Handle tab parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    // Mock webinar data - in real app this would be fetched from API
    const mockWebinars = {
      'webinar-1': {
        id: 'webinar-1',
        title: 'Advanced Marketing Strategies for 2025',
        description: 'Learn cutting-edge marketing techniques that drive real results',
        type: 'live',
        status: 'Live',
        scheduledAt: '2025-01-18T14:00:00Z',
        duration: 300,
        maxAttendees: 'unlimited',
        registrations: 247,
        attendees: 189,
        conversionRate: 23.4,
        revenue: 15750,
        presenter: 'John Marketing Expert',
        registrationUrl: `https://yourapp.com/webinar/webinar-1/register`,
        joinUrl: `https://yourapp.com/webinar/webinar-1/join`
      },
      'webinar-2': {
        id: 'webinar-2',
        title: 'AI-Powered Lead Generation Masterclass',
        description: 'Discover how AI can revolutionize your lead generation process',
        type: 'scheduled',
        status: 'Scheduled',
        scheduledAt: '2025-01-19T15:00:00Z',
        duration: 300,
        maxAttendees: 'unlimited',
        registrations: 156,
        attendees: 0,
        conversionRate: 0,
        revenue: 0,
        presenter: 'Sarah AI Expert',
        registrationUrl: `https://yourapp.com/webinar/webinar-2/register`,
        joinUrl: `https://yourapp.com/webinar/webinar-2/join`
      },
      'webinar-3': {
        id: 'webinar-3',
        title: 'Conversion Optimization Workshop',
        description: 'Master the art of converting visitors into paying customers',
        type: 'upcoming',
        status: 'Upcoming',
        scheduledAt: '2025-01-25T13:00:00Z',
        duration: 300,
        maxAttendees: 'unlimited',
        registrations: 89,
        attendees: 0,
        conversionRate: 0,
        revenue: 0,
        presenter: 'Mike Conversion Pro',
        registrationUrl: `https://yourapp.com/webinar/webinar-3/register`,
        joinUrl: `https://yourapp.com/webinar/webinar-3/join`
      }
    };

    const mockWebinar = mockWebinars[id as keyof typeof mockWebinars] || mockWebinars['webinar-1'];
    
    setWebinarData(mockWebinar);
    setIsLive(mockWebinar.status === 'Live');
    
    if (mockWebinar.status === 'Live') {
      setLiveStats({
        viewers: 189,
        registrations: 247,
        chatMessages: 45,
        offers: 12
      });
    } else {
      setLiveStats({
        viewers: 0,
        registrations: mockWebinar.registrations,
        chatMessages: 0,
        offers: 0
      });
    }
  }, [id]);

  const handleStartWebinar = () => {
    setIsLive(true);
    toast({
      title: "Webinar Started",
      description: "Your webinar is now live!",
    });
  };

  const handleStopWebinar = () => {
    setIsLive(false);
    toast({
      title: "Webinar Ended",
      description: "Your webinar has been ended successfully.",
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  if (!webinarData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/webinars")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Webinars
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{webinarData.title}</h1>
                <Badge variant={isLive ? "destructive" : "secondary"}>
                  {isLive ? "🔴 LIVE" : webinarData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{webinarData.description}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/webinar/edit/${id}`)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
            {isLive ? (
              <Button variant="destructive" onClick={handleStopWebinar}>
                <StopCircle className="h-4 w-4 mr-2" />
                End Webinar
              </Button>
            ) : (
              <Button className="bg-green-500 hover:bg-green-600" onClick={handleStartWebinar}>
                <Play className="h-4 w-4 mr-2" />
                Start Webinar
              </Button>
            )}
          </div>
        </div>

        {/* Live Status Bar */}
        {isLive && (
          <Card className="border-red-500 bg-red-50 dark:bg-red-950">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-red-700 dark:text-red-300">LIVE NOW</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Eye className="h-4 w-4" />
                    {liveStats.viewers} watching
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageSquare className="h-4 w-4" />
                    {liveStats.chatMessages} messages
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Gift className="h-4 w-4" />
                    {liveStats.offers} offers made
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mic className="h-4 w-4 mr-2" />
                    Mic
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Screen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registrations</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{webinarData.registrations}</div>
              <p className="text-xs text-muted-foreground">
                {webinarData.maxAttendees === 'unlimited' ? 'Unlimited capacity' : `${Math.round((webinarData.registrations / webinarData.maxAttendees) * 100)}% capacity`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{webinarData.attendees}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((webinarData.attendees / webinarData.registrations) * 100)}% show rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{webinarData.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${webinarData.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from target</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Webinar Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Webinar Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium capitalize">{webinarData.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{Math.floor(webinarData.duration / 60)}h {webinarData.duration % 60}m (Max: 5 hours)</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Scheduled:</span>
                      <p className="font-medium">{new Date(webinarData.scheduledAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Presenter:</span>
                      <p className="font-medium">{webinarData.presenter}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Registration URL:</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(webinarData.registrationUrl, "Registration URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                      {webinarData.registrationUrl}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Join URL:</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(webinarData.joinUrl, "Join URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                      {webinarData.joinUrl}
                    </div>
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
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reminder Emails
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on Social Media
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Attendee List
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Registration Page
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Gift className="h-4 w-4 mr-2" />
                    Create Special Offer
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Full Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendees Tab */}
          <TabsContent value="attendees">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Attendee List</CardTitle>
                      <CardDescription>
                        {webinarData.registrations} registrations • {webinarData.attendees} attended
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Attendee
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock attendee list */}
                      {[
                        { name: "John Smith", email: "john@example.com", status: "Attended", joinTime: "14:02", leftTime: "15:30" },
                        { name: "Sarah Johnson", email: "sarah@example.com", status: "Attended", joinTime: "14:00", leftTime: "15:45" },
                        { name: "Mike Davis", email: "mike@example.com", status: "Registered", joinTime: "-", leftTime: "-" },
                        { name: "Lisa Wilson", email: "lisa@example.com", status: "Attended", joinTime: "14:15", leftTime: "15:20" },
                        { name: "Tom Brown", email: "tom@example.com", status: "No Show", joinTime: "-", leftTime: "-" }
                      ].map((attendee, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-sm text-muted-foreground">{attendee.email}</div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant={
                              attendee.status === 'Attended' ? 'default' :
                              attendee.status === 'Registered' ? 'secondary' : 'destructive'
                            }>
                              {attendee.status}
                            </Badge>
                            {attendee.joinTime !== '-' && (
                              <div className="text-muted-foreground">
                                {attendee.joinTime} - {attendee.leftTime}
                              </div>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Registered</span>
                        <span>{webinarData.registrations}{webinarData.maxAttendees === 'unlimited' ? '' : `/${webinarData.maxAttendees}`}</span>
                      </div>
                      {webinarData.maxAttendees === 'unlimited' ? (
                        <div className="text-sm text-green-600 font-medium">Unlimited capacity</div>
                      ) : (
                        <Progress value={(webinarData.registrations / webinarData.maxAttendees) * 100} />
                      )}
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Show Rate</span>
                        <span className="text-sm font-medium">
                          {Math.round((webinarData.attendees / webinarData.registrations) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Conversion Rate</span>
                        <span className="text-sm font-medium">{webinarData.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue per Attendee</span>
                        <span className="text-sm font-medium">
                          ${webinarData.attendees > 0 ? Math.round(webinarData.revenue / webinarData.attendees) : 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Live Chat Tab */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div>
                      <CardTitle>Live Chat</CardTitle>
                      <CardDescription>
                        {liveStats.chatMessages} messages • Moderation {isLive ? 'Active' : 'Inactive'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={isLive ? "default" : "secondary"}>
                        {isLive ? "🟢 Live" : "⚫ Offline"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/30">
                      {/* Mock chat messages */}
                      <div className="space-y-3">
                        {[
                          { user: "Sarah M.", message: "Great presentation so far!", time: "14:23", type: "normal" },
                          { user: "John D.", message: "Can you share the slides?", time: "14:24", type: "question" },
                          { user: "Lisa W.", message: "This is exactly what I needed!", time: "14:25", type: "normal" },
                          { user: "Mike R.", message: "What's the pricing for the advanced course?", time: "14:26", type: "question" },
                          { user: "System", message: "New offer: 50% off for next 10 minutes!", time: "14:27", type: "announcement" }
                        ].map((msg, index) => (
                          <div key={index} className={`p-2 rounded-lg ${
                            msg.type === 'announcement' ? 'bg-blue-100 dark:bg-blue-900' :
                            msg.type === 'question' ? 'bg-yellow-100 dark:bg-yellow-900' :
                            'bg-white dark:bg-gray-800'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        placeholder="Type a message to chat..." 
                        className="flex-1 px-3 py-2 border rounded-lg"
                        disabled={!isLive}
                      />
                      <Button disabled={!isLive}>Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Chat Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Chat Settings</label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Allow Chat</span>
                          <input type="checkbox" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Moderation</span>
                          <input type="checkbox" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Q&A Mode</span>
                          <input type="checkbox" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quick Actions</label>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          Clear Chat
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Mute All
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Export Chat
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Auto Messages</label>
                      <Button size="sm" variant="outline" className="w-full">
                        Setup Auto Responses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Live Offers</h3>
                  <p className="text-muted-foreground">Create and manage time-sensitive offers</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Offer
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Offers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Active Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Early Bird Special",
                        discount: "50% OFF",
                        product: "Marketing Mastery Course",
                        price: "$497 → $248",
                        timeLeft: "8 minutes",
                        conversions: 12,
                        status: "active"
                      },
                      {
                        title: "Exclusive Bonus",
                        discount: "FREE",
                        product: "1-on-1 Consultation",
                        price: "$200 Value",
                        timeLeft: "15 minutes",
                        conversions: 5,
                        status: "active"
                      }
                    ].map((offer, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{offer.title}</h4>
                          <Badge className="bg-green-100 text-green-700">
                            {offer.timeLeft} left
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Product:</span>
                            <span>{offer.product}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-medium">{offer.price}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Conversions:</span>
                            <span className="font-medium">{offer.conversions}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1">
                            End
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                {/* Offer Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-blue-500" />
                      Quick Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Flash Sale", description: "Limited time discount", icon: "⚡" },
                      { name: "Bundle Deal", description: "Package multiple products", icon: "📦" },
                      { name: "Free Bonus", description: "Add value to main offer", icon: "🎁" },
                      { name: "Upgrade Offer", description: "Premium version discount", icon: "⬆️" },
                      { name: "Payment Plan", description: "Split payment option", icon: "💳" }
                    ].map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{template.icon}</span>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-muted-foreground">{template.description}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Use
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Offer Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Offer Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">17</div>
                      <div className="text-sm text-muted-foreground">Total Offers Made</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">$12,450</div>
                      <div className="text-sm text-muted-foreground">Offer Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">23.4%</div>
                      <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">$732</div>
                      <div className="text-sm text-muted-foreground">Avg Order Value</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Analytics</CardTitle>
                <CardDescription>
                  Performance insights and detailed metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Settings</CardTitle>
                <CardDescription>
                  Configure webinar options and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Configuration Panel</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced webinar settings and configuration options
                  </p>
                  <Button onClick={() => navigate(`/webinar/edit/${id}`)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Webinar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
