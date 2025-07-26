import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Play, 
  Users, 
  Clock, 
  TrendingUp, 
  Star,
  Edit,
  Eye,
  Plus,
  Zap
} from 'lucide-react';

export function CourseDashboard() {
  const recentCourses = [
    {
      id: 1,
      title: 'Complete Digital Marketing Mastery',
      students: 342,
      completion: 89,
      rating: 4.8,
      status: 'published',
      lastUpdate: '2 days ago',
      revenue: 12450,
      modules: 8
    },
    {
      id: 2,
      title: 'AI-Powered Lead Generation',
      students: 198,
      completion: 76,
      rating: 4.9,
      status: 'published',
      lastUpdate: '1 week ago',
      revenue: 8970,
      modules: 6
    },
    {
      id: 3,
      title: 'Advanced Sales Funnel Strategies',
      students: 156,
      completion: 82,
      rating: 4.7,
      status: 'draft',
      lastUpdate: '3 days ago',
      revenue: 0,
      modules: 10
    }
  ];

  const quickActions = [
    {
      title: 'AI Course Generator',
      description: 'Generate complete course outline and content with AI',
      icon: Zap,
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      action: 'generate'
    },
    {
      title: 'Course Templates',
      description: 'Start with pre-built course structures',
      icon: BookOpen,
      color: 'bg-coral-100 dark:bg-coral-900 text-coral-600 dark:text-coral-400',
      action: 'templates'
    },
    {
      title: 'Import Content',
      description: 'Import existing materials and presentations',
      icon: Plus,
      color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      action: 'import'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'draft': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      case 'archived': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started with course creation and management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{action.description}</p>
                <Button size="sm" variant="outline">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Your Courses
            </span>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardTitle>
          <CardDescription>
            Manage and track your course performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(course.status)}`}>
                        {course.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{course.completion}% completion</span>
                      </div>
                      {course.revenue > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 dark:text-green-400">
                            ${course.revenue.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {course.status === 'published' && (
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your courses and students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">New student enrolled in "Digital Marketing Mastery"</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Course "AI Lead Generation" reached 200 students</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">New 5-star review for "Sales Funnel Strategies"</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}