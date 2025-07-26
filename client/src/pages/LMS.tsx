import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  BookOpen, 
  Play, 
  Users, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  Lock, 
  Unlock,
  GripVertical,
  Video,
  FileText,
  ExternalLink,
  HelpCircle,
  Upload,
  Save,
  Bot,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Clock,
  Star,
  Award,
  BarChart3,
  Image,
  Globe,
  Share2,
  Copy,
  Download,
  Calendar,
  Mail,
  Target
} from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Types for course structure
interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'link';
  content: string;
  duration: number;
  isLocked: boolean;
  videoUrl?: string;
  htmlContent?: string;
  externalUrl?: string;
  description: string;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  maxStudents: number;
  enrolledStudents: number;
  isPublished: boolean;
  enrollmentOpen: boolean;
  autoEnrollment: boolean;
  manualEnrollment: boolean;
  author: string;
  modules: Module[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  rating: number;
  tags: string[];
}

// Content Editor Component
const ContentEditor: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  onSave: (lesson: Lesson) => void;
}> = ({ isOpen, onClose, lesson, onSave }) => {
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(lesson);
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleSave = () => {
    if (editingLesson) {
      onSave(editingLesson);
      toast.success("Lesson content saved successfully!");
      onClose();
    }
  };

  const generateAIContent = async () => {
    setAiGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      if (editingLesson) {
        setEditingLesson({
          ...editingLesson,
          content: `AI-generated content for "${editingLesson.title}":\n\nThis comprehensive lesson covers the fundamentals of ${editingLesson.title.toLowerCase()}. Students will learn key concepts, practical applications, and real-world examples.\n\nKey takeaways:\n• Understanding core principles\n• Practical implementation\n• Best practices and tips\n• Common mistakes to avoid\n\nBy the end of this lesson, students will have a solid foundation in ${editingLesson.title.toLowerCase()} and be ready to apply these concepts in their own projects.`
        });
      }
      setAiGenerating(false);
      toast.success("AI content generated successfully!");
    }, 2000);
  };

  if (!isOpen || !editingLesson) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-2/3 bg-white shadow-2xl z-50 border-l transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Content Editor</h2>
              <p className="text-gray-600">Edit lesson: {editingLesson.title}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={generateAIContent} disabled={aiGenerating}>
                {aiGenerating ? (
                  <>
                    <Bot className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Generate
                  </>
                )}
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                ×
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Lesson Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Lesson Title</Label>
              <Input
                value={editingLesson.title}
                onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Lesson Type</Label>
              <Select
                value={editingLesson.type}
                onValueChange={(value: any) => setEditingLesson({ ...editingLesson, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Video Lesson
                    </div>
                  </SelectItem>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Text Content
                    </div>
                  </SelectItem>
                  <SelectItem value="html">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      HTML Content
                    </div>
                  </SelectItem>
                  <SelectItem value="quiz">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Quiz
                    </div>
                  </SelectItem>
                  <SelectItem value="assignment">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Assignment
                    </div>
                  </SelectItem>
                  <SelectItem value="link">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      External Link
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={editingLesson.duration}
                onChange={(e) => setEditingLesson({ ...editingLesson, duration: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label>Lesson Locked</Label>
                <p className="text-sm text-gray-600">Require previous lessons completion</p>
              </div>
              <Switch
                checked={editingLesson.isLocked}
                onCheckedChange={(checked) => setEditingLesson({ ...editingLesson, isLocked: checked })}
              />
            </div>
          </div>

          {/* Content based on type */}
          {editingLesson.type === 'video' && (
            <div>
              <Label>Video URL (YouTube/Vimeo/Direct)</Label>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={editingLesson.videoUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
              />
            </div>
          )}

          {editingLesson.type === 'link' && (
            <div>
              <Label>External URL</Label>
              <Input
                placeholder="https://example.com"
                value={editingLesson.externalUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, externalUrl: e.target.value })}
              />
            </div>
          )}

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Brief description of this lesson..."
              value={editingLesson.description}
              onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Main Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Lesson Content</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </div>

            {editingLesson.type === 'html' ? (
              <Textarea
                className="font-mono text-sm min-h-[400px]"
                placeholder="Enter your HTML content here..."
                value={editingLesson.htmlContent || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, htmlContent: e.target.value })}
              />
            ) : (
              <Textarea
                className="min-h-[400px]"
                placeholder="Enter your lesson content here... Use the AI Generate button for instant content creation."
                value={editingLesson.content}
                onChange={(e) => setEditingLesson({ ...editingLesson, content: e.target.value })}
              />
            )}
          </div>

          {/* AI Tools */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Content Tools
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={generateAIContent} disabled={aiGenerating}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </Button>
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Generate Quiz
              </Button>
              <Button variant="outline" size="sm">
                <Target className="w-4 h-4 mr-2" />
                Learning Objectives
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Summary Points
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main LMS Component
export default function LMS() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'course-builder' | 'analytics' | 'settings'>('dashboard');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Digital Marketing Mastery',
      description: 'Learn everything about digital marketing from SEO to social media advertising.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      price: 197,
      maxStudents: 500,
      enrolledStudents: 234,
      isPublished: true,
      enrollmentOpen: true,
      autoEnrollment: false,
      manualEnrollment: true,
      author: 'Sarah Johnson',
      category: 'Marketing',
      difficulty: 'intermediate',
      estimatedDuration: '8 weeks',
      rating: 4.8,
      tags: ['SEO', 'Social Media', 'PPC', 'Content Marketing'],
      modules: [
        {
          id: 'm1',
          title: 'Introduction to Digital Marketing',
          description: 'Get started with the fundamentals',
          isExpanded: true,
          order: 1,
          lessons: [
            {
              id: 'l1',
              title: 'What is Digital Marketing?',
              type: 'video',
              content: 'Introduction to digital marketing concepts...',
              duration: 15,
              isLocked: false,
              videoUrl: 'https://youtube.com/watch?v=example',
              description: 'Overview of digital marketing landscape',
              order: 1
            },
            {
              id: 'l2', 
              title: 'Marketing Channels Overview',
              type: 'text',
              content: 'Comprehensive guide to marketing channels...',
              duration: 20,
              isLocked: false,
              description: 'Learn about different marketing channels',
              order: 2
            }
          ]
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null);
  const [contentEditorOpen, setContentEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Drag and Drop handlers
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedCourse) return;

    const { source, destination, type } = result;

    if (type === 'module') {
      const newModules = Array.from(selectedCourse.modules);
      const [reorderedModule] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, reorderedModule);

      // Update order
      newModules.forEach((module, index) => {
        module.order = index + 1;
      });

      setSelectedCourse({ ...selectedCourse, modules: newModules });
      toast.success("Modules reordered successfully!");
    } else if (type === 'lesson') {
      const moduleId = source.droppableId.replace('lessons-', '');
      const destModuleId = destination.droppableId.replace('lessons-', '');

      const newModules = selectedCourse.modules.map(module => ({ ...module }));
      const sourceModule = newModules.find(m => m.id === moduleId);
      const destModule = newModules.find(m => m.id === destModuleId);

      if (sourceModule && destModule) {
        const [movedLesson] = sourceModule.lessons.splice(source.index, 1);
        destModule.lessons.splice(destination.index, 0, movedLesson);

        // Update order
        destModule.lessons.forEach((lesson, index) => {
          lesson.order = index + 1;
        });

        setSelectedCourse({ ...selectedCourse, modules: newModules });
        toast.success("Lesson moved successfully!");
      }
    }
  };

  const addModule = () => {
    if (!selectedCourse) return;

    const newModule: Module = {
      id: `m${Date.now()}`,
      title: 'New Module',
      description: 'Module description',
      lessons: [],
      isExpanded: true,
      order: selectedCourse.modules.length + 1
    };

    setSelectedCourse({
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModule]
    });
    toast.success("New module added!");
  };

  const addLesson = (moduleId: string) => {
    if (!selectedCourse) return;

    const newLesson: Lesson = {
      id: `l${Date.now()}`,
      title: 'New Lesson',
      type: 'text',
      content: '',
      duration: 10,
      isLocked: false,
      description: 'Lesson description',
      order: 1
    };

    const newModules = selectedCourse.modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [...module.lessons, { ...newLesson, order: module.lessons.length + 1 }]
        };
      }
      return module;
    });

    setSelectedCourse({ ...selectedCourse, modules: newModules });
    toast.success("New lesson added!");
  };

  const openContentEditor = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setContentEditorOpen(true);
  };

  const saveLesson = (updatedLesson: Lesson) => {
    if (!selectedCourse) return;

    const newModules = selectedCourse.modules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => 
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    }));

    setSelectedCourse({ ...selectedCourse, modules: newModules });
  };

  const toggleModuleExpansion = (moduleId: string) => {
    if (!selectedCourse) return;

    const newModules = selectedCourse.modules.map(module => 
      module.id === moduleId ? { ...module, isExpanded: !module.isExpanded } : module
    );

    setSelectedCourse({ ...selectedCourse, modules: newModules });
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                LMS Platform
              </h1>
              <p className="text-gray-600 mt-1">Create, manage, and sell online courses with advanced features</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {courses.reduce((acc, course) => acc + course.enrolledStudents, 0)} Students
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <DollarSign className="w-4 h-4 mr-1" />
                ${courses.reduce((acc, course) => acc + (course.price * course.enrolledStudents), 0).toLocaleString()} Revenue
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Tabs value={currentView} onValueChange={(value: any) => setCurrentView(value)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="course-builder" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Course Builder
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.enrolledStudents, 0)}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${courses.reduce((acc, course) => acc + (course.price * course.enrolledStudents), 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Course List */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>Manage and monitor your course performance</CardDescription>
                  </div>
                  <Button onClick={() => setCurrentView('course-builder')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <p className="text-gray-600 text-sm">{course.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant={course.isPublished ? "default" : "secondary"}>
                              {course.isPublished ? "Published" : "Draft"}
                            </Badge>
                            <span className="text-sm text-gray-500">{course.enrolledStudents}/{course.maxStudents} students</span>
                            <span className="text-sm font-medium text-green-600">${course.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedCourse(course);
                          setCurrentView('course-builder');
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPreviewMode(true)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Builder */}
          <TabsContent value="course-builder" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Course Builder</h2>
                <p className="text-gray-600">Create and manage your course content with drag & drop</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPreviewMode(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Settings */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCourse && (
                    <>
                      <div>
                        <Label>Course Title</Label>
                        <Input 
                          value={selectedCourse.title}
                          onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea 
                          value={selectedCourse.description}
                          onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Course Image</Label>
                        <div className="mt-2">
                          <img src={selectedCourse.thumbnail} alt="Course thumbnail" className="w-full h-32 object-cover rounded-lg mb-2" />
                          <Button variant="outline" size="sm" className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Image
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Price ($)</Label>
                          <Input 
                            type="number"
                            value={selectedCourse.price}
                            onChange={(e) => setSelectedCourse({ ...selectedCourse, price: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label>Max Students</Label>
                          <Input 
                            type="number"
                            value={selectedCourse.maxStudents}
                            onChange={(e) => setSelectedCourse({ ...selectedCourse, maxStudents: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Category</Label>
                        <Select value={selectedCourse.category} onValueChange={(value) => setSelectedCourse({ ...selectedCourse, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Health">Health & Fitness</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Difficulty Level</Label>
                        <Select value={selectedCourse.difficulty} onValueChange={(value: any) => setSelectedCourse({ ...selectedCourse, difficulty: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Enrollment Settings */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Enrollment Settings</h3>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Enrollment Open</Label>
                            <p className="text-sm text-gray-600">Allow new student enrollments</p>
                          </div>
                          <Switch 
                            checked={selectedCourse.enrollmentOpen}
                            onCheckedChange={(checked) => setSelectedCourse({ ...selectedCourse, enrollmentOpen: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Auto Enrollment</Label>
                            <p className="text-sm text-gray-600">Automatically enroll after payment</p>
                          </div>
                          <Switch 
                            checked={selectedCourse.autoEnrollment}
                            onCheckedChange={(checked) => setSelectedCourse({ ...selectedCourse, autoEnrollment: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Manual Enrollment</Label>
                            <p className="text-sm text-gray-600">Allow manual student approval</p>
                          </div>
                          <Switch 
                            checked={selectedCourse.manualEnrollment}
                            onCheckedChange={(checked) => setSelectedCourse({ ...selectedCourse, manualEnrollment: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Course Published</Label>
                            <p className="text-sm text-gray-600">Make course visible to students</p>
                          </div>
                          <Switch 
                            checked={selectedCourse.isPublished}
                            onCheckedChange={(checked) => setSelectedCourse({ ...selectedCourse, isPublished: checked })}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Course Stats */}
                      <div className="space-y-3">
                        <h3 className="font-semibold">Course Statistics</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Enrolled Students</p>
                            <p className="font-semibold">{selectedCourse.enrolledStudents}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Course Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{selectedCourse.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Revenue</p>
                            <p className="font-semibold text-green-600">${(selectedCourse.price * selectedCourse.enrolledStudents).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-semibold">{selectedCourse.estimatedDuration}</p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Share2 className="w-4 h-4 mr-2" />
                        Enroll Students
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Course Structure - Drag & Drop */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Course Structure</CardTitle>
                      <CardDescription>Drag and drop to reorder modules and lessons</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={addModule}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                      </Button>
                      <Button variant="outline">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Generate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedCourse && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="modules" type="module">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {selectedCourse.modules.map((module, moduleIndex) => (
                              <Draggable key={module.id} draggableId={module.id} index={moduleIndex}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`border rounded-lg ${snapshot.isDragging ? 'shadow-lg bg-white' : 'bg-gray-50'}`}
                                  >
                                    {/* Module Header */}
                                    <div className="p-4 border-b bg-white rounded-t-lg">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div {...provided.dragHandleProps} className="cursor-grab hover:bg-gray-100 p-1 rounded">
                                            <GripVertical className="w-5 h-5 text-gray-400" />
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleModuleExpansion(module.id)}
                                          >
                                            {module.isExpanded ? 
                                              <ChevronDown className="w-4 h-4" /> : 
                                              <ChevronRight className="w-4 h-4" />
                                            }
                                          </Button>
                                          <div>
                                            <h3 className="font-semibold">{module.title}</h3>
                                            <p className="text-sm text-gray-600">{module.description}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline">
                                            {module.lessons.length} lessons
                                          </Badge>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addLesson(module.id)}
                                          >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Lesson
                                          </Button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Module Lessons */}
                                    {module.isExpanded && (
                                      <div className="p-4 bg-gray-50 rounded-b-lg">
                                        <Droppable droppableId={`lessons-${module.id}`} type="lesson">
                                          {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                              {module.lessons.map((lesson, lessonIndex) => (
                                                <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                                  {(provided, snapshot) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      className={`p-3 bg-white border rounded-lg ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                                    >
                                                      <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                          <div {...provided.dragHandleProps} className="cursor-grab hover:bg-gray-100 p-1 rounded">
                                                            <GripVertical className="w-4 h-4 text-gray-400" />
                                                          </div>
                                                          <div className={`p-2 rounded-lg `}>
                                                           
                                                          </div>
                                                          <div>
                                                            <h4 className="font-medium">{lesson.title}</h4>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                              <Clock className="w-3 h-3" />
                                                              {lesson.duration} min
                                                              <Badge 
                                                                variant="outline" 
                                                                className={`text-xs `}
                                                              >
                                                                {lesson.type}
                                                              </Badge>
                                                              {lesson.isLocked && (
                                                                <Lock className="w-3 h-3 text-orange-500" />
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                          <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => openContentEditor(lesson)}
                                                          >
                                                            <Edit className="w-4 h-4" />
                                                          </Button>
                                                          <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                              const locked = !lesson.isLocked;
                                                              const newModules = selectedCourse.modules.map(m => 
                                                                m.id === module.id ? {
                                                                  ...m,
                                                                  lessons: m.lessons.map(l => 
                                                                    l.id === lesson.id ? { ...l, isLocked: locked } : l
                                                                  )
                                                                } : m
                                                              );
                                                              setSelectedCourse({ ...selectedCourse, modules: newModules });
                                                              toast.success(`Lesson ${locked ? 'locked' : 'unlocked'}!`);
                                                            }}
                                                          >
                                                            {lesson.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              ))}
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+32%</div>
                  <p className="text-xs text-muted-foreground">Monthly growth rate</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <div key={course.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.enrolledStudents} students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{course.rating}/5</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Video Lessons</span>
                        <span>85% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Text Content</span>
                        <span>72% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Quizzes</span>
                        <span>91% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Assignments</span>
                        <span>68% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>LMS Settings</CardTitle>
                <CardDescription>Configure your learning management system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">General Settings</h3>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>AI Content Generation</Label>
                        <p className="text-sm text-gray-600">Enable AI-powered content creation</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Auto Quiz Generation</Label>
                        <p className="text-sm text-gray-600">Automatically generate quizzes from content</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Progress Tracking</Label>
                        <p className="text-sm text-gray-600">Track student progress and completion</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Course Defaults</h3>

                    <div>
                      <Label>Default Course Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Default Lesson Duration (minutes)</Label>
                      <Input type="number" placeholder="15" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>New Lessons Locked by Default</Label>
                        <p className="text-sm text-gray-600">Require previous lesson completion</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Content Editor Slide-out */}
      <ContentEditor
        isOpen={contentEditorOpen}
        onClose={() => setContentEditorOpen(false)}
        lesson={editingLesson}
        onSave={saveLesson}
      />

      {/* Course Preview Modal */}
      <Dialog open={previewMode} onOpenChange={setPreviewMode}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
            <DialogDescription>Preview how your course appears to students</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="relative">
                <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    <Play className="w-5 h-5 mr-2" />
                    Start Course
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-bold mb-4">{selectedCourse.title}</h1>
                  <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

                  {/* Course Modules */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Course Content</h2>
                    {selectedCourse.modules.map((module, index) => (
                      <div key={module.id} className="border rounded-lg">
                        <div className="p-4 border-b bg-gray-50">
                          <h3 className="font-semibold">Module {index + 1}: {module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                        <div className="p-4 space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                              <div className="flex items-center gap-3">
                                <div className={`p-1 rounded `}>
                                  
                                </div>
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration} min
                                    {lesson.isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                {lesson.isLocked ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">${selectedCourse.price}</div>
                        <Button className="w-full mb-4">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Enroll Now
                        </Button>
                        <p className="text-sm text-gray-600">{selectedCourse.enrolledStudents}/{selectedCourse.maxStudents} students enrolled</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{selectedCourse.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Level</span>
                        <Badge variant="outline">{selectedCourse.difficulty}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{selectedCourse.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{selectedCourse.category}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedCourse.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{selectedCourse.author}</p>
                          <p className="text-sm text-gray-600">Course Instructor</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}