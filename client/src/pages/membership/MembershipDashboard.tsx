import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  Users, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Award,
  Star,
  Play,
  Download,
  FileText,
  Headphones,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Lock,
  Unlock,
  GripVertical,
  Settings,
  Upload,
  Save,
  Bot,
  Sparkles,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Globe,
  Share2,
  Copy,
  Mail,
  Shield,
  CreditCard,
  Target,
  BarChart3,
  Trophy,
  Zap,
  Crown,
  Gift,
  UserCheck,
  Bell,
  Heart,
  Bookmark,
  Filter,
  Search,
  Archive,
  Code,
  Image,
  Mic,
  PenTool,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Flag
} from "lucide-react";

// Enhanced Types for Comprehensive Membership + LMS
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  enrolledStudents: number;
  maxStudents: number;
  isPublished: boolean;
  author: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  rating: number;
  tags: string[];
  modules: Module[];
  requiredAccessLevel: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
  dripSettings?: {
    unlockAfterDays?: number;
    unlockAfterCompletion?: string;
    unlockDate?: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download' | 'live';
  content: string;
  duration: number;
  isLocked: boolean;
  videoUrl?: string;
  description: string;
  order: number;
  attachments?: string[];
}

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly' | 'lifetime';
  accessLevel: number;
  features: string[];
  color: string;
}

interface MembershipStats {
  activeMembership: {
    id: number;
    planName: string;
    status: string;
    accessLevel: number;
    nextBilling: string;
  } | null;
  contentProgress: {
    totalItems: number;
    completedItems: number;
    progressPercentage: number;
  };
  communityActivity: {
    postsCount: number;
    repliesCount: number;
    likesReceived: number;
  };
  upcomingEvents: number;
}

interface ContentItem {
  id: number;
  title: string;
  contentType: 'video' | 'pdf' | 'audio' | 'text' | 'download';
  thumbnailUrl?: string;
  duration?: number;
  isCompleted: boolean;
  progressPercentage: number;
  requiredAccessLevel: number;
}

export default function MembershipDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  // Sample data for demonstration
  const membershipTiers: MembershipTier[] = [
    {
      id: '1',
      name: 'Silver Member',
      price: 29,
      billingPeriod: 'monthly',
      accessLevel: 1,
      features: ['Basic Courses', 'Community Access', 'Email Support'],
      color: 'bg-gradient-to-r from-gray-400 to-gray-600'
    },
    {
      id: '2', 
      name: 'Gold Member',
      price: 59,
      billingPeriod: 'monthly',
      accessLevel: 2,
      features: ['All Courses', 'Live Sessions', 'Priority Support', 'Certificates'],
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    },
    {
      id: '3',
      name: 'VIP Member',
      price: 99,
      billingPeriod: 'monthly', 
      accessLevel: 3,
      features: ['Everything', '1-on-1 Coaching', 'Custom Content', 'White Glove Support'],
      color: 'bg-gradient-to-r from-purple-500 to-purple-700'
    }
  ];

  const { data: membershipStats } = useQuery<MembershipStats>({
    queryKey: ["/api/membership/stats"],
  });

  const { data: recentContent } = useQuery<ContentItem[]>({
    queryKey: ["/api/member-content/recent"],
  });

  const { data: inProgressContent } = useQuery<ContentItem[]>({
    queryKey: ["/api/member-content/in-progress"],
  });

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'assignment': return <Edit className="h-4 w-4" />;
      case 'live': return <Video className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;
    
    if (type === 'modules') {
      const newModules = Array.from(modules);
      const [reorderedModule] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, reorderedModule);
      
      // Update order numbers
      const updatedModules = newModules.map((module, index) => ({
        ...module,
        order: index + 1
      }));
      
      setModules(updatedModules);
      toast.success("Module order updated");
    } else if (type === 'lessons') {
      // Handle lesson reordering within modules
      const moduleId = source.droppableId.replace('module-', '');
      const moduleIndex = modules.findIndex(m => m.id === moduleId);
      
      if (moduleIndex !== -1) {
        const newModules = [...modules];
        const lessons = [...newModules[moduleIndex].lessons];
        const [reorderedLesson] = lessons.splice(source.index, 1);
        lessons.splice(destination.index, 0, reorderedLesson);
        
        // Update lesson order numbers
        const updatedLessons = lessons.map((lesson, index) => ({
          ...lesson,
          order: index + 1
        }));
        
        newModules[moduleIndex].lessons = updatedLessons;
        setModules(newModules);
        toast.success("Lesson order updated");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Membership Site & Learning Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete membership portal with advanced course management, community access, and payment control
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-8 w-full bg-white dark:bg-gray-800 p-1 rounded-lg shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Course Builder
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Access Control
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Member Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Welcome Card */}
              <Card className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-6 w-6" />
                    Welcome Back, Member!
                  </CardTitle>
                  <p className="text-blue-100">
                    Continue your learning journey and unlock your potential
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-blue-100">Courses Enrolled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">67%</div>
                      <div className="text-sm text-blue-100">Average Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-blue-100">Certificates Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setSelectedTab("courses")}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setSelectedTab("community")}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Live Sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Certificates
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Advanced Marketing Strategy</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={65} className="flex-1" />
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <p className="text-sm text-muted-foreground">Don't miss these live sessions</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Marketing Masterclass</h4>
                          <p className="text-sm text-muted-foreground">Today, 3:00 PM</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Section - LMS Integration */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Course Library</h2>
                <p className="text-muted-foreground">Browse and enroll in available courses</p>
              </div>
              <Button onClick={() => setSelectedTab("builder")} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((course) => (
                <Card key={course} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Marketing</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">Complete Digital Marketing Mastery</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Learn everything about digital marketing from SEO to social media advertising.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>8 weeks</span>
                      <span>234 students</span>
                      <span>Advanced</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">$197</span>
                      <Button size="sm">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would continue here with Payment Management, Community, Analytics, and Settings */}
          <TabsContent value="access" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Access Control & Membership Tiers</h2>
              <p className="text-muted-foreground">Manage user roles, permissions, and membership levels</p>
            </div>

            {/* Membership Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier) => (
                <Card key={tier.id} className="relative overflow-hidden">
                  <div className={`h-2 ${tier.color}`}></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5" />
                      {tier.name}
                    </CardTitle>
                    <div className="text-3xl font-bold">
                      ${tier.price}
                      <span className="text-sm font-normal text-muted-foreground">/{tier.billingPeriod}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Access Level {tier.accessLevel}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Edit Tier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Simple placeholder tabs for remaining sections */}
          <TabsContent value="builder">
            <Card>
              <CardHeader>
                <CardTitle>Course Builder</CardTitle>
                <p className="text-muted-foreground">Drag and drop course builder with full LMS capabilities</p>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/course-builder")}>
                  Open Full Course Builder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Payment Management</h2>
              <p className="text-muted-foreground">Manage subscriptions, billing, coupons, and payment tracking</p>
            </div>

            {/* Payment Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$12,847</div>
                  <div className="text-xs text-green-600">+18% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <div className="text-xs text-blue-600">+12 new this week</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Failed Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <div className="text-xs text-red-600">Requires attention</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Coupon Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23%</div>
                  <div className="text-xs text-orange-600">156 used this month</div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Method Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage accepted payment methods and gateway settings</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Stripe</h4>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Credit/Debit Cards, ACH</p>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">PayPal</h4>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">PayPal Payments</p>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Apple Pay</h4>
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Mobile Payments</p>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Management */}
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <p className="text-sm text-muted-foreground">Monitor and manage member subscriptions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((sub) => (
                    <div key={sub} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">john.doe@example.com</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>Gold Member - $59/month</span>
                            <span>•</span>
                            <span>Next billing: Jan 15, 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coupon Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Coupons & Discounts
                  </span>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Coupon
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { code: 'SAVE50', type: 'Percentage', value: '50%', uses: '23/100', expires: 'Dec 31, 2024' },
                    { code: 'WELCOME20', type: 'Percentage', value: '20%', uses: '156/500', expires: 'Ongoing' },
                    { code: 'FLASH25', type: 'Fixed', value: '$25', uses: '89/200', expires: 'Jan 15, 2024' }
                  ].map((coupon, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Gift className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{coupon.code}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{coupon.type}: {coupon.value}</span>
                            <span>•</span>
                            <span>Used: {coupon.uses}</span>
                            <span>•</span>
                            <span>Expires: {coupon.expires}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Track revenue performance and trends</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$154,290</div>
                    <div className="text-sm text-green-600">Total Revenue (YTD)</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$47.50</div>
                    <div className="text-sm text-blue-600">Average Revenue Per User</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">94.2%</div>
                    <div className="text-sm text-purple-600">Payment Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Management */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <p className="text-sm text-muted-foreground">Track and manage billing invoices</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((invoice) => (
                    <div key={invoice} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">INV-{invoice.toString().padStart(4, '0')}</h4>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">$59.00</div>
                          <div className="text-sm text-muted-foreground">Jan {invoice}, 2024</div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Paid</Badge>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Community Forums</h2>
              <p className="text-muted-foreground">Engage with members through private forums and group discussions</p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-xs text-green-600">+8% this week</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,429</div>
                  <div className="text-xs text-blue-600">+127 today</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-xs text-purple-600">24 new this week</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">67%</div>
                  <div className="text-xs text-orange-600">Above average</div>
                </CardContent>
              </Card>
            </div>

            {/* Forum Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Forum Categories
                  </span>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Category
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'General Discussion', posts: 456, members: 234, color: 'bg-blue-100', icon: MessageCircle },
                    { name: 'Course Q&A', posts: 892, members: 445, color: 'bg-green-100', icon: HelpCircle },
                    { name: 'Success Stories', posts: 234, members: 156, color: 'bg-yellow-100', icon: Trophy },
                    { name: 'Networking', posts: 567, members: 332, color: 'bg-purple-100', icon: Users },
                    { name: 'Announcements', posts: 45, members: 890, color: 'bg-red-100', icon: Bell },
                    { name: 'Feature Requests', posts: 123, members: 89, color: 'bg-indigo-100', icon: Zap }
                  ].map((category) => (
                    <div key={category.name} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{category.posts} posts</span>
                            <span>•</span>
                            <span>{category.members} members</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Discussions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
                <p className="text-sm text-muted-foreground">Latest activity across all forums</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Best practices for email marketing automation?', author: 'Sarah Johnson', replies: 12, category: 'Course Q&A', time: '2 hours ago', badge: 'Hot' },
                    { title: 'Just hit $10K MRR! Here\'s my journey', author: 'Mike Chen', replies: 28, category: 'Success Stories', time: '4 hours ago', badge: 'Popular' },
                    { title: 'Anyone interested in a local meetup?', author: 'Emma Davis', replies: 7, category: 'Networking', time: '6 hours ago', badge: null },
                    { title: 'New course announcement: Advanced Funnels', author: 'Admin', replies: 15, category: 'Announcements', time: '1 day ago', badge: 'Pinned' },
                    { title: 'Feature request: Dark mode for dashboard', author: 'Alex Turner', replies: 9, category: 'Feature Requests', time: '2 days ago', badge: null }
                  ].map((discussion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{discussion.author.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{discussion.title}</h4>
                            {discussion.badge && (
                              <Badge className={
                                discussion.badge === 'Hot' ? 'bg-red-100 text-red-700' :
                                discussion.badge === 'Popular' ? 'bg-orange-100 text-orange-700' :
                                discussion.badge === 'Pinned' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }>
                                {discussion.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.category}</span>
                            <span>•</span>
                            <span>{discussion.replies} replies</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Join Discussion</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Member Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                  <p className="text-sm text-muted-foreground">Most active community members</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Johnson', posts: 234, likes: 1820, level: 'Expert' },
                      { name: 'Mike Chen', posts: 189, likes: 1456, level: 'Advanced' },
                      { name: 'Emma Davis', posts: 156, likes: 1203, level: 'Advanced' },
                      { name: 'Alex Turner', posts: 134, likes: 987, level: 'Intermediate' },
                      { name: 'Lisa Wang', posts: 98, likes: 654, level: 'Intermediate' }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.posts} posts • {member.likes} likes</p>
                          </div>
                        </div>
                        <Badge variant="outline">{member.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moderation Tools</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage community content and behavior</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Pending Posts
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Flag className="h-4 w-4 mr-2" />
                      Reported Content
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Member Roles
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Forum Settings
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Announcement
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Newsletter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Learning Analytics</h2>
              <p className="text-muted-foreground">Track student progress, completion rates, and engagement metrics</p>
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Course Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">74.2%</div>
                  <div className="text-xs text-green-600">+5.3% from last month</div>
                  <Progress value={74.2} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Study Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <div className="text-xs text-blue-600">Per week per student</div>
                  <div className="text-xs text-muted-foreground mt-1">↑ 12min from last week</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Student Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-1">
                    4.8 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-xs text-orange-600">Based on 1,234 reviews</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.3%</div>
                  <div className="text-xs text-purple-600">Weekly active learners</div>
                  <Progress value={89.3} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed metrics for each course</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: 'Digital Marketing Mastery', students: 342, completion: 78, rating: 4.9, revenue: 58650 },
                    { course: 'AI-Powered Lead Generation', students: 287, completion: 65, rating: 4.7, revenue: 41230 },
                    { course: 'Advanced Sales Funnels', students: 189, completion: 82, rating: 4.8, revenue: 67890 },
                    { course: 'Email Marketing Automation', students: 156, completion: 71, rating: 4.6, revenue: 28470 },
                    { course: 'Social Media Strategy', students: 134, completion: 69, rating: 4.5, revenue: 19650 }
                  ].map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{course.course}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                          <span className="font-medium text-green-600">${course.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Students</div>
                          <div className="font-medium">{course.students}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                          <div className="font-medium">{course.completion}%</div>
                          <Progress value={course.completion} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Avg. Revenue per Student</div>
                          <div className="font-medium">${Math.round(course.revenue / course.students)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">How students are progressing through courses</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Completed (90-100%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                        </div>
                        <span className="text-sm font-medium">34%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Nearly Complete (70-89%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>In Progress (30-69%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                        <span className="text-sm font-medium">23%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Just Started (0-29%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <p className="text-sm text-muted-foreground">Student activity and participation</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">12.4k</div>
                      <div className="text-xs text-blue-600">Video Views (This Month)</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">8.2k</div>
                      <div className="text-xs text-green-600">Quiz Attempts</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">3.1k</div>
                      <div className="text-xs text-purple-600">Assignment Submissions</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">1.8k</div>
                      <div className="text-xs text-orange-600">Forum Posts</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Peak Learning Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>9:00 AM - 11:00 AM</span>
                        <span className="font-medium">Peak Activity</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2:00 PM - 4:00 PM</span>
                        <span className="font-medium">High Activity</span>
                      </div>
                      <div className="flex justify-between">
                        <span>7:00 PM - 9:00 PM</span>
                        <span className="font-medium">Moderate Activity</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Retention and Revenue Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Retention & Revenue Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Long-term student success and business metrics</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Student Retention</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>30-day retention</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>90-day retention</span>
                        <span className="font-medium">64%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>180-day retention</span>
                        <span className="font-medium">48%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>1-year retention</span>
                        <span className="font-medium">32%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Revenue Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Monthly Recurring Revenue</span>
                        <span className="font-medium">$28,450</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Revenue Per Student</span>
                        <span className="font-medium">$247</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Customer Lifetime Value</span>
                        <span className="font-medium">$892</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Churn Rate</span>
                        <span className="font-medium text-red-600">3.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Performance Insights</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-green-50 rounded text-green-700">
                        ✓ Course completion rates above industry average
                      </div>
                      <div className="p-2 bg-blue-50 rounded text-blue-700">
                        ✓ Strong student engagement metrics
                      </div>
                      <div className="p-2 bg-orange-50 rounded text-orange-700">
                        ⚠ Consider improving 180-day retention
                      </div>
                      <div className="p-2 bg-purple-50 rounded text-purple-700">
                        ✓ Revenue growth trending upward
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Platform Settings</h2>
              <p className="text-muted-foreground">Configure your membership site, integrations, and platform preferences</p>
            </div>

            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Basic platform configuration</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="My Learning Platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input id="siteUrl" defaultValue="https://mylearning.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input id="supportEmail" defaultValue="support@mylearning.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="UTC">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="PST">Pacific Standard Time</SelectItem>
                        <SelectItem value="EST">Eastern Standard Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    defaultValue="A comprehensive learning platform for digital marketing mastery"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Branding Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Branding & Appearance</CardTitle>
                <p className="text-sm text-muted-foreground">Customize your platform's look and feel</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Logo Upload</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your logo</p>
                      <Button size="sm" variant="outline" className="mt-2">Choose File</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Globe className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload favicon</p>
                      <Button size="sm" variant="outline" className="mt-2">Choose File</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded"></div>
                        <Label>Primary Color</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded"></div>
                        <Label>Secondary Color</Label>
                      </div>
                      <Button size="sm" variant="outline">Customize Colors</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <p className="text-sm text-muted-foreground">Configure email delivery and templates</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Email Provider</Label>
                    <Select defaultValue="sendgrid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="ses">Amazon SES</SelectItem>
                        <SelectItem value="smtp">Custom SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email Address</Label>
                    <Input id="fromEmail" defaultValue="noreply@mylearning.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input id="fromName" defaultValue="My Learning Platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replyEmail">Reply-To Email</Label>
                    <Input id="replyEmail" defaultValue="support@mylearning.com" />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Email Templates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Welcome Email', 'Course Enrollment', 'Payment Receipt', 'Password Reset',
                      'Course Completion', 'Subscription Renewal', 'Cancellation', 'Weekly Digest'
                    ].map((template) => (
                      <div key={template} className="flex items-center justify-between p-3 border rounded">
                        <span className="font-medium">{template}</span>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-sm text-muted-foreground">Control how and when notifications are sent</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { title: 'New Student Enrollments', description: 'Get notified when new students join', enabled: true },
                    { title: 'Payment Notifications', description: 'Receive alerts for successful and failed payments', enabled: true },
                    { title: 'Course Completions', description: 'Get notified when students complete courses', enabled: false },
                    { title: 'Community Activity', description: 'Alerts for new forum posts and comments', enabled: true },
                    { title: 'System Updates', description: 'Important platform updates and maintenance notices', enabled: true },
                    { title: 'Weekly Reports', description: 'Receive weekly analytics and performance reports', enabled: false }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integration Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <p className="text-sm text-muted-foreground">Connect with external tools and services</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Google Analytics', status: 'Connected', icon: BarChart3, color: 'text-green-600' },
                    { name: 'Facebook Pixel', status: 'Connected', icon: Target, color: 'text-green-600' },
                    { name: 'Zapier', status: 'Not Connected', icon: Zap, color: 'text-gray-400' },
                    { name: 'Slack', status: 'Connected', icon: MessageCircle, color: 'text-green-600' },
                    { name: 'Mailchimp', status: 'Not Connected', icon: Mail, color: 'text-gray-400' },
                    { name: 'Stripe', status: 'Connected', icon: CreditCard, color: 'text-green-600' }
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <integration.icon className={`h-6 w-6 ${integration.color}`} />
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.status}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <p className="text-sm text-muted-foreground">Manage security settings and privacy options</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SSL Certificate</h4>
                      <p className="text-sm text-muted-foreground">Force HTTPS connections</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">GDPR Compliance</h4>
                      <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Backup</h4>
                      <p className="text-sm text-muted-foreground">Automatic daily backups</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Archive className="h-4 w-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}