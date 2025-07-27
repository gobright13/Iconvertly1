import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  PlayCircle,
  Lock,
  Unlock,
  Star,
  Calendar,
  Clock,
  CreditCard,
  Bell,
  Globe,
  Palette,
  Shield,
  Key,
  Database,
  Zap,
  Mail,
  Phone,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  Share2,
  ExternalLink,
  RefreshCw,
  PieChart,
  LineChart,
  Target,
  Briefcase,
  GraduationCap,
  Crown,
  Heart,
  ThumbsUp,
  MessageCircle,
  UserPlus,
  UserMinus,
  FileText,
  Video,
  Image,
  Link,
  Code,
  Mic,
  Camera,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Save,
  GripVertical
} from "lucide-react";

const MembershipDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [membershipStats, setMembershipStats] = useState({
    totalMembers: 1247,
    activeCourses: 23,
    monthlyRevenue: 45680,
    completionRate: 78
  });

  // Dashboard Tab Content
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-blue-100">Your membership site is performing great</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{membershipStats.totalMembers}</div>
              <div className="text-blue-100">Total Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{membershipStats.activeCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="text-green-600">+12% from last month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${membershipStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="text-green-600">+23% from last month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{membershipStats.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <Progress value={membershipStats.completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">1,089</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="text-green-600">+8% from last month</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2" onClick={() => setActiveTab("courses")}>
              <Plus className="h-6 w-6" />
              <span>New Course</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => setActiveTab("community")}>
              <MessageSquare className="h-6 w-6" />
              <span>Community</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => setActiveTab("analytics")}>
              <BarChart3 className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => setActiveTab("settings")}>
              <Settings className="h-6 w-6" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Courses Tab Content
  const CoursesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published Courses</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft Courses</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <Edit className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                <p className="text-3xl font-bold">3,247</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Courses</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Digital Marketing Mastery", status: "Published", enrolled: 234, completion: 78, revenue: "$12,340" },
                { name: "JavaScript Fundamentals", status: "Published", enrolled: 189, completion: 82, revenue: "$9,450" },
                { name: "Design Thinking Workshop", status: "Draft", enrolled: 0, completion: 0, revenue: "$0" },
                { name: "Advanced React Patterns", status: "Published", enrolled: 156, completion: 65, revenue: "$7,800" },
              ].map((course, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {course.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">Last updated 2 days ago</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.enrolled}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{course.completion}%</span>
                      <Progress value={course.completion} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{course.revenue}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Access Control Tab Content
  const AccessControlContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Access Control & Membership Tiers</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Tier
        </Button>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Basic",
            price: "$29/month",
            members: 542,
            color: "from-gray-500 to-gray-600",
            features: ["Access to 5 courses", "Community access", "Basic support"]
          },
          {
            name: "Pro",
            price: "$79/month",
            members: 423,
            color: "from-blue-500 to-blue-600",
            features: ["Access to all courses", "Priority support", "Certificates", "1-on-1 sessions"]
          },
          {
            name: "Enterprise",
            price: "$199/month",
            members: 156,
            color: "from-purple-500 to-purple-600",
            features: ["Everything in Pro", "Custom branding", "Advanced analytics", "Dedicated manager"]
          }
        ].map((tier, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Crown className={`h-5 w-5 ${index === 2 ? 'text-purple-500' : index === 1 ? 'text-blue-500' : 'text-gray-500'}`} />
                  <span>{tier.name}</span>
                </CardTitle>
                <Badge variant="outline">{tier.members} members</Badge>
              </div>
              <div className="text-2xl font-bold">{tier.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Access Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Content Access Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { content: "JavaScript Fundamentals", tier: "Basic+", drip: "Immediate", status: "Active" },
              { content: "Advanced React Patterns", tier: "Pro+", drip: "Week 2", status: "Active" },
              { content: "Enterprise Scaling", tier: "Enterprise", drip: "Week 4", status: "Active" },
              { content: "Exclusive Webinars", tier: "Pro+", drip: "Monthly", status: "Scheduled" },
            ].map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-medium">{rule.content}</p>
                    <p className="text-sm text-muted-foreground">Required tier: {rule.tier}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Drip: {rule.drip}</p>
                    <Badge variant={rule.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Course Builder Tab Content
  const CourseBuilderContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Builder</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Advanced Course Builder</h3>
          <p className="text-muted-foreground mb-6">
            Use our drag-and-drop course builder to create engaging learning experiences
          </p>
          <Button size="lg" onClick={() => window.open('/course-builder', '_blank')}>
            <Plus className="h-5 w-5 mr-2" />
            Open Course Builder
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Other tab contents would be added here...
  const PaymentsContent = () => <div>Payments Content</div>;
  const CommunityContent = () => <div>Community Content</div>;
  const AnalyticsContent = () => <div>Analytics Content</div>;
  const SettingsContent = () => <div>Settings Content</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Membership Dashboard</h1>
          <p className="text-muted-foreground">Manage your membership site and courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
          <TabsTrigger value="access-control" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Access Control</span>
          </TabsTrigger>
          <TabsTrigger value="course-builder" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Course Builder</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Community</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>

        <TabsContent value="courses">
          <CoursesContent />
        </TabsContent>

        <TabsContent value="access-control">
          <AccessControlContent />
        </TabsContent>

        <TabsContent value="course-builder">
          <CourseBuilderContent />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsContent />
        </TabsContent>

        <TabsContent value="community">
          <CommunityContent />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsContent />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MembershipDashboard;