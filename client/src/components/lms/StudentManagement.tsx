import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageCircle, 
  Trophy, 
  TrendingUp,
  Calendar,
  Clock,
  BookOpen,
  Star,
  UserPlus,
  Download,
  Eye
} from 'lucide-react';

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      enrolledCourses: 3,
      completedCourses: 1,
      totalProgress: 76,
      lastActive: '2 hours ago',
      joinDate: '2024-01-15',
      status: 'active',
      totalSpent: 297,
      avgRating: 4.8
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      enrolledCourses: 2,
      completedCourses: 2,
      totalProgress: 100,
      lastActive: '1 day ago',
      joinDate: '2024-02-03',
      status: 'completed',
      totalSpent: 198,
      avgRating: 4.9
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      enrolledCourses: 4,
      completedCourses: 0,
      totalProgress: 23,
      lastActive: '1 week ago',
      joinDate: '2024-03-10',
      status: 'at-risk',
      totalSpent: 396,
      avgRating: 4.2
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      enrolledCourses: 1,
      completedCourses: 0,
      totalProgress: 45,
      lastActive: '3 days ago',
      joinDate: '2024-03-20',
      status: 'active',
      totalSpent: 99,
      avgRating: 4.6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'at-risk': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && student.status === activeTab;
  });

  const studentStats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    completed: students.filter(s => s.status === 'completed').length,
    atRisk: students.filter(s => s.status === 'at-risk').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your students and track their progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentStats.total}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentStats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentStats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">At Risk</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentStats.atRisk}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            Manage individual student progress and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Students ({studentStats.total})</TabsTrigger>
              <TabsTrigger value="active">Active ({studentStats.active})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({studentStats.completed})</TabsTrigger>
              <TabsTrigger value="at-risk">At Risk ({studentStats.atRisk})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Student Cards */}
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                        <Badge className={`text-xs ${getStatusColor(student.status)}`}>
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {student.email}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{student.enrolledCourses} enrolled</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span>{student.completedCourses} completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{student.avgRating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Active {student.lastActive}</span>
                        </div>
                        <div className="text-green-600 dark:text-green-400">
                          ${student.totalSpent}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(student.totalProgress)} transition-all duration-300`}
                          style={{ width: `${student.totalProgress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                        {student.totalProgress}%
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>
            Perform actions on multiple students at once
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Send Bulk Email</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Email all or selected students
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Award Certificates</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Bulk certificate generation
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Export Progress</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Download progress reports
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}