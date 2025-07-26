
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  GripVertical, 
  Play, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  Video, 
  HelpCircle,
  BookOpen,
  Clock,
  Users,
  Target,
  Zap,
  Save,
  Eye,
  Lock,
  Unlock,
  DollarSign
} from 'lucide-react';
import { DragAndDropCourseBuilder } from './DragAndDropCourseBuilder';

export function CourseBuilder() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Complete Digital Marketing Mastery',
      description: 'Learn all aspects of digital marketing from basics to advanced strategies',
      status: 'published',
      students: 342,
      modules: 8,
      lastUpdate: '2 days ago',
      progress: 100,
      price: 297,
      enrollmentLimit: 500,
      currentEnrollments: 342,
      isLocked: false
    },
    {
      id: 2,
      title: 'AI-Powered Lead Generation',
      description: 'Use AI tools to generate high-quality leads automatically',
      status: 'draft',
      students: 0,
      modules: 6,
      lastUpdate: '1 week ago',
      progress: 60,
      price: 197,
      enrollmentLimit: 300,
      currentEnrollments: 0,
      isLocked: true
    },
    {
      id: 3,
      title: 'Advanced Sales Funnel Strategies',
      description: 'Build high-converting sales funnels that scale your business',
      status: 'draft',
      students: 0,
      modules: 10,
      lastUpdate: '3 days ago',
      progress: 30,
      price: 397,
      enrollmentLimit: 200,
      currentEnrollments: 0,
      isLocked: false
    }
  ];

  const courseTemplates = [
    {
      id: 1,
      name: 'Digital Marketing Course',
      description: 'Complete marketing course structure with 8 modules',
      modules: 8,
      lessons: 32,
      category: 'Marketing',
      estimatedPrice: 297,
      features: ['Video lessons', 'Quizzes', 'Assignments', 'Certificates']
    },
    {
      id: 2,
      name: 'Business Strategy Course',
      description: 'Strategic business planning and execution',
      modules: 6,
      lessons: 24,
      category: 'Business',
      estimatedPrice: 197,
      features: ['Case studies', 'Templates', 'Action plans', 'Live sessions']
    },
    {
      id: 3,
      name: 'Technical Training Course',
      description: 'Comprehensive technical skills development',
      modules: 10,
      lessons: 40,
      category: 'Technology',
      estimatedPrice: 397,
      features: ['Hands-on labs', 'Projects', 'Code reviews', 'Mentorship']
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

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  if (showBuilder) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowBuilder(false)}
            className="flex items-center gap-2"
          >
            ← Back to Courses
          </Button>
        </div>
        <DragAndDropCourseBuilder />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Course Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and publish your online courses with advanced features
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/course-builder'}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Advanced Builder
          </Button>
          <Button 
            className="bg-coral-500 hover:bg-coral-600 text-white font-semibold"
            onClick={() => setShowBuilder(true)}
          >
            <Plus className="w-4 h-4 mr-2 text-white" />
            <span className="text-white">Create Course</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {courses.filter(c => c.status === 'published').length} published
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {courses.reduce((total, course) => total + course.students, 0)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Across all courses</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${courses.reduce((total, course) => total + (course.price * course.students), 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Total earned</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Completion</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                <p className="text-xs text-green-600 dark:text-green-400">+5% this month</p>
              </div>
              <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-coral-600 dark:text-coral-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Start Templates
          </CardTitle>
          <CardDescription>
            Get started quickly with pre-built course structures and AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => setShowBuilder(true)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{template.modules} modules • {template.lessons} lessons</span>
                    <span className="font-medium text-green-600">${template.estimatedPrice}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Course Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI Course Generator
          </CardTitle>
          <CardDescription>
            Generate complete course outline and content with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Topic</Label>
                <Input
                  id="courseTitle"
                  placeholder="e.g., Digital Marketing for Beginners"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Beginners"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseGoals">Learning Objectives</Label>
                <Textarea
                  id="courseGoals"
                  placeholder="What should students achieve after completing this course?"
                  rows={3}
                />
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowBuilder(true)}
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate Course with AI
              </Button>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                AI Will Generate:
              </h4>
              <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                <li>• Complete course outline and structure</li>
                <li>• Module and lesson titles with descriptions</li>
                <li>• Learning objectives for each section</li>
                <li>• Suggested content and activities</li>
                <li>• Quiz questions and assignments</li>
                <li>• Resource recommendations</li>
                <li>• Pricing suggestions based on content</li>
                <li>• Marketing copy and course descriptions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Management */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            Manage your existing courses and track performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
              <TabsTrigger value="published">Published ({courses.filter(c => c.status === 'published').length})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({courses.filter(c => c.status === 'draft').length})</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Course List */}
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(course.status)}`}>
                        {course.status}
                      </Badge>
                      {course.isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.currentEnrollments}/{course.enrollmentLimit} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Updated {course.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{course.progress}% complete</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium text-green-600">${course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {course.status === 'published' && (
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowBuilder(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import & Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Import existing content, bulk operations, and advanced tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Import SCORM</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Import SCORM packages and content
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Bulk PDF Import</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Convert PDFs to lessons automatically
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Video Processing</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-transcription and chapters
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
