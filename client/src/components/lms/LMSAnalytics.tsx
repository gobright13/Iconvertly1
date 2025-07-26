import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  DollarSign,
  Eye,
  PlayCircle,
  CheckCircle
} from 'lucide-react';

export function LMSAnalytics() {
  const enrollmentData = [
    { month: 'Jan', enrollments: 45, completions: 23, revenue: 4500 },
    { month: 'Feb', enrollments: 67, completions: 34, revenue: 6700 },
    { month: 'Mar', enrollments: 89, completions: 56, revenue: 8900 },
    { month: 'Apr', enrollments: 78, completions: 67, revenue: 7800 },
    { month: 'May', enrollments: 95, completions: 78, revenue: 9500 },
    { month: 'Jun', enrollments: 112, completions: 89, revenue: 11200 }
  ];

  const coursePerformance = [
    { name: 'Digital Marketing', enrolled: 342, completed: 304, completion: 89, revenue: 34200 },
    { name: 'AI Lead Generation', enrolled: 198, completed: 150, completion: 76, revenue: 19800 },
    { name: 'Sales Funnels', enrolled: 156, completed: 128, completion: 82, revenue: 15600 },
    { name: 'Content Marketing', enrolled: 134, completed: 98, completion: 73, revenue: 13400 },
    { name: 'Email Marketing', enrolled: 289, completed: 267, completion: 92, revenue: 28900 }
  ];

  const engagementData = [
    { day: 'Mon', activeUsers: 145, lessons: 234, quizzes: 67 },
    { day: 'Tue', activeUsers: 167, lessons: 298, quizzes: 89 },
    { day: 'Wed', activeUsers: 189, lessons: 345, quizzes: 92 },
    { day: 'Thu', activeUsers: 156, lessons: 278, quizzes: 76 },
    { day: 'Fri', activeUsers: 134, lessons: 198, quizzes: 54 },
    { day: 'Sat', activeUsers: 98, lessons: 145, quizzes: 34 },
    { day: 'Sun', activeUsers: 87, lessons: 123, quizzes: 28 }
  ];

  const deviceData = [
    { name: 'Mobile', value: 45, color: '#8884d8' },
    { name: 'Desktop', value: 35, color: '#82ca9d' },
    { name: 'Tablet', value: 20, color: '#ffc658' }
  ];

  const completionTimes = [
    { course: 'Digital Marketing', avgTime: 28, targetTime: 30 },
    { course: 'AI Lead Gen', avgTime: 18, targetTime: 20 },
    { course: 'Sales Funnels', avgTime: 35, targetTime: 40 },
    { course: 'Content Marketing', avgTime: 22, targetTime: 25 },
    { course: 'Email Marketing', avgTime: 15, targetTime: 18 }
  ];

  const topLessons = [
    { title: 'Introduction to Digital Marketing', views: 1247, completion: 94 },
    { title: 'Setting Up Facebook Ads', views: 1089, completion: 87 },
    { title: 'Email List Building', views: 967, completion: 91 },
    { title: 'Content Strategy Planning', views: 834, completion: 89 },
    { title: 'Conversion Optimization', views: 756, completion: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          LMS Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights into your learning platform performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                <p className="text-xs text-green-600 dark:text-green-400">+23% from last month</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Course Completions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">892</p>
                <p className="text-xs text-green-600 dark:text-green-400">+18% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">84.6%</p>
                <p className="text-xs text-green-600 dark:text-green-400">+5.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$89,450</p>
                <p className="text-xs text-green-600 dark:text-green-400">+42% from last month</p>
              </div>
              <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-coral-600 dark:text-coral-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Enrollment & Completion Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="enrollments" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="completions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="enrolled" fill="#8884d8" />
                <Bar dataKey="completed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Daily Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="lessons" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="quizzes" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Course Completion Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completionTimes.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{course.course}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg: {course.avgTime} days | Target: {course.targetTime} days
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          course.avgTime <= course.targetTime ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min((course.avgTime / course.targetTime) * 100, 100)}%` }}
                      />
                    </div>
                    {course.avgTime <= course.targetTime ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Top Performing Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLessons.map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lesson.views} views
                      </p>
                    </div>
                  </div>
                  <Badge className={`${
                    lesson.completion >= 90 ? 'bg-green-100 text-green-700' : 
                    lesson.completion >= 80 ? 'bg-blue-100 text-blue-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {lesson.completion}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Automated analysis and recommendations for your LMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Key Insights</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    📈 Your completion rates are 15% above industry average
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    🎯 "Digital Marketing" course has highest engagement - consider creating similar content
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚡ Weekend engagement drops 40% - consider sending reminder emails
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Recommendations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    🤖 Add AI tutor to "Sales Funnels" course to improve completion rate
                  </p>
                </div>
                <div className="p-3 bg-coral-50 dark:bg-coral-900/20 rounded-lg border-l-4 border-coral-500">
                  <p className="text-sm text-coral-800 dark:text-coral-200">
                    📱 Optimize mobile experience - 45% of users access via mobile
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    💡 Create micro-learning modules for higher completion rates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}