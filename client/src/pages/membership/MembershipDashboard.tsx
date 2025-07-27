
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Play,
  Edit,
  Trash2,
  Plus,
  Settings,
  BarChart3,
  MessageCircle,
  CreditCard,
  Bell,
  Crown,
  Star,
  Award,
  Clock,
  Target,
  Download,
  Upload,
  Eye,
  Lock,
  Unlock,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  Globe,
  Shield,
  Zap,
  Palette,
  Database,
  Webhook,
  Code,
  FileText,
  Video,
  Image,
  Music,
  Link,
  Share2,
  Heart,
  ThumbsUp,
  MessageSquare,
  Flag,
  Trash,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Layers,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  Save
} from 'lucide-react';</old_str>

// Interfaces
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  students: number;
  rating: number;
  duration: string;
  modules: number;
  status: 'draft' | 'published' | 'archived';
  category: string;
  lastUpdated: string;
  completionRate: number;
  revenue: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  coursesEnrolled: number;
  completionRate: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
}

interface PaymentTransaction {
  id: string;
  studentName: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
}

interface ForumPost {
  id: string;
  title: string;
  author: string;
  course: string;
  replies: number;
  views: number;
  lastActivity: string;
  status: 'active' | 'locked' | 'pinned';
  category: string;
}

interface AnalyticsData {
  totalStudents: number;
  totalRevenue: number;
  courseCompletions: number;
  averageRating: number;
  monthlyGrowth: {
    students: number;
    revenue: number;
    completions: number;
  };
  topCourses: Array<{
    name: string;
    students: number;
    revenue: number;
    rating: number;
  }>;
  revenueChart: Array<{
    month: string;
    revenue: number;
    students: number;
  }>;
}

interface MembershipTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  maxCourses: number;
  maxStudents: number;
  support: string;
  isPopular: boolean;
}

const MembershipDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Sample data
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Web Development Course',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js',
      thumbnail: '/api/placeholder/300/200',
      price: 199,
      students: 1250,
      rating: 4.8,
      duration: '40 hours',
      modules: 12,
      status: 'published',
      category: 'Technology',
      lastUpdated: '2024-01-15',
      completionRate: 78,
      revenue: 248750
    },
    {
      id: '2',
      title: 'Digital Marketing Mastery',
      description: 'Master SEO, Social Media, PPC, and Content Marketing',
      thumbnail: '/api/placeholder/300/200',
      price: 149,
      students: 890,
      rating: 4.6,
      duration: '25 hours',
      modules: 8,
      status: 'published',
      category: 'Marketing',
      lastUpdated: '2024-01-10',
      completionRate: 82,
      revenue: 132610
    }
  ]);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      avatar: '/api/placeholder/40/40',
      joinDate: '2024-01-01',
      coursesEnrolled: 3,
      completionRate: 85,
      totalSpent: 547,
      status: 'active',
      lastActivity: '2024-01-20'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '/api/placeholder/40/40',
      joinDate: '2024-01-05',
      coursesEnrolled: 2,
      completionRate: 92,
      totalSpent: 348,
      status: 'active',
      lastActivity: '2024-01-19'
    }
  ]);

  const [payments] = useState<PaymentTransaction[]>([
    {
      id: '1',
      studentName: 'John Smith',
      courseName: 'Complete Web Development Course',
      amount: 199,
      date: '2024-01-20',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      studentName: 'Sarah Johnson',
      courseName: 'Digital Marketing Mastery',
      amount: 149,
      date: '2024-01-19',
      status: 'completed',
      paymentMethod: 'PayPal',
      transactionId: 'TXN987654321'
    }
  ]);

  const [forumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'React Hooks Best Practices',
      author: 'John Smith',
      course: 'Complete Web Development Course',
      replies: 12,
      views: 234,
      lastActivity: '2024-01-20',
      status: 'active',
      category: 'Technical Discussion'
    },
    {
      id: '2',
      title: 'SEO Strategy Questions',
      author: 'Sarah Johnson',
      course: 'Digital Marketing Mastery',
      replies: 8,
      views: 156,
      lastActivity: '2024-01-19',
      status: 'active',
      category: 'Q&A'
    }
  ]);

  const [analytics] = useState<AnalyticsData>({
    totalStudents: 2140,
    totalRevenue: 381360,
    courseCompletions: 1687,
    averageRating: 4.7,
    monthlyGrowth: {
      students: 12.5,
      revenue: 18.3,
      completions: 15.7
    },
    topCourses: [
      { name: 'Complete Web Development Course', students: 1250, revenue: 248750, rating: 4.8 },
      { name: 'Digital Marketing Mastery', students: 890, revenue: 132610, rating: 4.6 }
    ],
    revenueChart: [
      { month: 'Jan', revenue: 28000, students: 180 },
      { month: 'Feb', revenue: 32000, students: 220 },
      { month: 'Mar', revenue: 35000, students: 250 },
      { month: 'Apr', revenue: 38000, students: 280 },
      { month: 'May', revenue: 42000, students: 310 },
      { month: 'Jun', revenue: 45000, students: 340 }
    ]
  });

  const [membershipTiers] = useState<MembershipTier[]>([
    {
      id: '1',
      name: 'Basic',
      description: 'Perfect for beginners',
      price: 29,
      features: ['Access to 5 courses', 'Basic support', 'Mobile app access'],
      maxCourses: 5,
      maxStudents: 100,
      support: 'Email',
      isPopular: false
    },
    {
      id: '2',
      name: 'Pro',
      description: 'For serious learners',
      price: 79,
      features: ['Access to all courses', 'Priority support', 'Certificates', 'Download materials'],
      maxCourses: 0,
      maxStudents: 1000,
      support: 'Priority Email + Chat',
      isPopular: true
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: 199,
      features: ['Everything in Pro', 'Team management', 'Custom branding', 'Analytics dashboard'],
      maxCourses: 0,
      maxStudents: 0,
      support: '24/7 Phone + Chat',
      isPopular: false
    }
  ]);

  const handleCourseAction = (action: string, courseId: string) => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Course ${action} successfully!`);
      setLoading(false);
    }, 1000);
  };

  const handleStudentAction = (action: string, studentId: string) => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Student ${action} successfully!`);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': case 'completed': case 'active': return 'bg-green-100 text-green-800';
      case 'draft': case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'archived': case 'failed': case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Membership Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your courses, students, and membership platform
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-fit">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="access-control" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Access Control
            </TabsTrigger>
            <TabsTrigger value="course-builder" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Course Builder
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

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{analytics.monthlyGrowth.students}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{analytics.monthlyGrowth.revenue}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.courseCompletions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{analytics.monthlyGrowth.completions}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.averageRating}</div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < Math.floor(analytics.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Welcome to Your Membership Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your online courses, track student progress, and grow your educational business.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActiveTab('course-builder')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('community')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Community Forum
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity & Top Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topCourses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.students} students • ${course.revenue.toLocaleString()} revenue
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {student.joinDate} • {student.coursesEnrolled} courses
                          </p>
                        </div>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <Button onClick={() => setActiveTab('course-builder')}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${course.price}</span>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.modules} modules</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleCourseAction('edited', course.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCourseAction('previewed', course.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCourseAction('duplicated', course.id)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Access Control Tab */}
          <TabsContent value="access-control" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Access Control & Membership Tiers</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Tier
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier) => (
                <Card key={tier.id} className={`relative ${tier.isPopular ? 'border-blue-500 border-2' : ''}`}>
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      {tier.name}
                    </CardTitle>
                    <p className="text-muted-foreground">{tier.description}</p>
                    <div className="text-3xl font-bold">
                      ${tier.price}<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <p>Max Courses: {tier.maxCourses || 'Unlimited'}</p>
                      <p>Max Students: {tier.maxStudents || 'Unlimited'}</p>
                      <p>Support: {tier.support}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Tier
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Access Control Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Access Control Settings</CardTitle>
                <p className="text-muted-foreground">
                  Configure how students access your courses and content
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">Students must verify email before access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Drip Content</Label>
                        <p className="text-sm text-muted-foreground">Release content gradually over time</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Certificate Requirements</Label>
                        <p className="text-sm text-muted-foreground">Students must complete all modules</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Download Protection</Label>
                        <p className="text-sm text-muted-foreground">Prevent unauthorized downloads</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>IP Restrictions</Label>
                        <p className="text-sm text-muted-foreground">Limit access by IP address</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Auto-logout inactive users</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Builder Tab */}
          <TabsContent value="course-builder" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Professional Course Builder</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create engaging courses with our drag-and-drop builder, AI assistance, and advanced features.
              </p>
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/course-builder'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Launch Course Builder
              </Button>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Payment Management</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Transactions
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Payment
                </Button>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,350</div>
                  <p className="text-xs text-green-600">+12% from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$890</div>
                  <p className="text-xs text-yellow-600">3 transactions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Refund Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-red-600">$298 requested</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-green-600">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods & Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <p className="text-muted-foreground">Configure accepted payment methods</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Credit Cards</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">PayPal payments</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Stripe</p>
                        <p className="text-sm text-muted-foreground">International payments</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Settings</CardTitle>
                  <p className="text-muted-foreground">Manage recurring payments</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Billing Cycle</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Payment Retry Attempts</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Grace Period</Label>
                      <p className="text-sm text-muted-foreground">Allow access during payment retry</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.studentName}</TableCell>
                          <TableCell>{payment.courseName}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Forum</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.success('Forum settings opened!')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Forum Settings
                </Button>
                <Button onClick={() => toast.success('Create category dialog opened!')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </div></old_str>
            </div>

            {/* Forum Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,847</div>
                  <p className="text-xs text-green-600">+23 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-blue-600">Last 7 days</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Unanswered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-orange-600">Need attention</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73%</div>
                  <p className="text-xs text-green-600">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* Forum Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forum Categories</CardTitle>
                  <p className="text-muted-foreground">Organize discussions by topics</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'General Discussion', posts: 28 },
                    { name: 'Technical Support', posts: 14 },
                    { name: 'Course Q&A', posts: 38 },
                    { name: 'Feature Requests', posts: 15 },
                    { name: 'Success Stories', posts: 22 }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => toast.success(`Editing ${category.name}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toast.success(`Settings for ${category.name}`)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card></old_str>

              <Card>
                <CardHeader>
                  <CardTitle>Moderation Tools</CardTitle>
                  <p className="text-muted-foreground">Manage community content</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-moderation</Label>
                      <p className="text-sm text-muted-foreground">Automatically flag inappropriate content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Post Approval</Label>
                      <p className="text-sm text-muted-foreground">Require approval for new posts</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify moderators of new posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="w-full">
                    <Flag className="h-4 w-4 mr-2" />
                    View Flagged Content
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Forum Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Forum Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Post Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Replies</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {forumPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.course}</TableCell>
                          <TableCell>{post.replies}</TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.lastActivity}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.5%</div>
                  <div className="flex items-center text-xs">
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+5.2% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.3%</div>
                  <div className="flex items-center text-xs">
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+2.1% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Session Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24m</div>
                  <div className="flex items-center text-xs">
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">-1.3% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <div className="flex items-center text-xs">
                    <ArrowDownRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">-0.8% vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <p className="text-muted-foreground">Monthly revenue and student growth</p>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Revenue Chart</p>
                      <p className="text-sm text-gray-500">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                  <p className="text-muted-foreground">Course completion analytics</p>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Progress Chart</p>
                      <p className="text-sm text-gray-500">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device & Location Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Analytics</CardTitle>
                  <p className="text-muted-foreground">How students access your courses</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>Desktop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">52%</span>
                      <Progress value={52} className="w-20 h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">35%</span>
                      <Progress value={35} className="w-20 h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4" />
                      <span>Tablet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">13%</span>
                      <Progress value={13} className="w-20 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <p className="text-muted-foreground">Key performance indicators</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Lesson Drop-off Rate</span>
                    <span className="font-bold">12.3%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Quiz Pass Rate</span>
                    <span className="font-bold">87.5%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Assignment Submission</span>
                    <span className="font-bold">94.2%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Forum Participation</span>
                    <span className="font-bold">43.8%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Certificate Claims</span>
                    <span className="font-bold">76.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Platform Settings</h2>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <p className="text-muted-foreground">Basic platform configuration</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform Name</Label>
                    <Input defaultValue="My Learning Platform" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea defaultValue="Professional online learning platform" rows={3} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Branding Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Branding & Customization</CardTitle>
                  <p className="text-muted-foreground">Customize your platform appearance</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo Upload</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your logo</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded border"></div>
                      <Input defaultValue="#3B82F6" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Custom CSS</Label>
                    <Textarea 
                      placeholder="/* Add your custom CSS here */"
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Integration Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <p className="text-muted-foreground">Connect with third-party services</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Email Service</p>
                        <p className="text-sm text-muted-foreground">SendGrid, Mailgun</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Payment Gateway</p>
                        <p className="text-sm text-muted-foreground">Stripe, PayPal</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Analytics</p>
                        <p className="text-sm text-muted-foreground">Google Analytics</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Webhook className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Webhooks</p>
                        <p className="text-sm text-muted-foreground">Custom integrations</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <p className="text-muted-foreground">Configure notification preferences</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Student Registration</Label>
                      <p className="text-sm text-muted-foreground">Email when new students join</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Course Completion</Label>
                      <p className="text-sm text-muted-foreground">Email when students complete courses</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">Email for payment events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Forum Activity</Label>
                      <p className="text-sm text-muted-foreground">Email for new forum posts</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Email for system issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <p className="text-muted-foreground">Technical configuration options</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable detailed logging</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>API Access</Label>
                        <p className="text-sm text-muted-foreground">Enable REST API</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Backup Automation</Label>
                        <p className="text-sm text-muted-foreground">Daily automated backups</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SSL Enforcement</Label>
                        <p className="text-sm text-muted-foreground">Force HTTPS connections</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Rate Limiting</Label>
                        <p className="text-sm text-muted-foreground">Prevent API abuse</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Temporarily disable access</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MembershipDashboard;
