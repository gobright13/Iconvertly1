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
  Tablet
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

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <p className="text-muted-foreground">Subscription billing, coupons, and payment tracking</p>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Forums</CardTitle>
                <p className="text-muted-foreground">Private forums and group discussions</p>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <p className="text-muted-foreground">Track progress, completion rates, and engagement</p>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Membership Settings</CardTitle>
                <p className="text-muted-foreground">Configure platform settings and integrations</p>
              </CardHeader>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}