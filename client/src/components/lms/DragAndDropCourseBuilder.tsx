
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableModuleItem } from './SortableModuleItem';
import { 
  Plus, 
  Play, 
  Edit, 
  Save, 
  Eye, 
  Settings,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Upload,
  Zap,
  Image,
  DollarSign,
  Users,
  Lock,
  Unlock,
  Globe,
  Link,
  Code,
  Copy,
  X
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'html' | 'link';
  duration: number;
  content?: string;
  videoUrl?: string;
  htmlContent?: string;
  externalLink?: string;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
  isLocked: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail?: string;
  authorName: string;
  authorBio: string;
  enrollmentLimit: number;
  enrollmentType: 'manual' | 'automatic';
  isPublished: boolean;
  enrollmentOpen: boolean;
  currentEnrollments: number;
  modules: Module[];
  createdAt: Date;
  lastModified: Date;
}

export function DragAndDropCourseBuilder() {
  const [isLoading, setIsLoading] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  const [course, setCourse] = useState<Course>({
    id: '1',
    title: 'Complete Digital Marketing Course',
    description: 'Master digital marketing from basics to advanced strategies',
    price: 297,
    currency: 'USD',
    authorName: 'John Doe',
    authorBio: 'Digital Marketing Expert with 10+ years experience',
    enrollmentLimit: 100,
    enrollmentType: 'automatic',
    isPublished: false,
    enrollmentOpen: true,
    currentEnrollments: 23,
    createdAt: new Date(),
    lastModified: new Date(),
    modules: [
      {
        id: '1',
        title: 'Introduction to Digital Marketing',
        description: 'Learn the fundamentals of digital marketing',
        isExpanded: true,
        order: 0,
        isLocked: false,
        lessons: [
          { 
            id: '1-1', 
            title: 'What is Digital Marketing?', 
            type: 'video', 
            duration: 15, 
            isCompleted: false, 
            isLocked: false,
            order: 0,
            videoUrl: 'https://www.youtube.com/watch?v=example'
          },
          { 
            id: '1-2', 
            title: 'Digital Marketing Channels', 
            type: 'text', 
            duration: 10, 
            isCompleted: false, 
            isLocked: false,
            order: 1,
            content: 'Digital marketing encompasses various channels...'
          },
          { 
            id: '1-3', 
            title: 'Knowledge Check', 
            type: 'quiz', 
            duration: 5, 
            isCompleted: false, 
            isLocked: false,
            order: 2
          }
        ]
      },
      {
        id: '2',
        title: 'Content Marketing Strategy',
        description: 'Create compelling content that converts',
        isExpanded: false,
        order: 1,
        isLocked: false,
        lessons: [
          { 
            id: '2-1', 
            title: 'Content Planning', 
            type: 'video', 
            duration: 20, 
            isCompleted: false, 
            isLocked: false,
            order: 0
          },
          { 
            id: '2-2', 
            title: 'Content Creation Workshop', 
            type: 'assignment', 
            duration: 30, 
            isCompleted: false, 
            isLocked: false,
            order: 1
          }
        ]
      }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Handle module reordering
    if (activeId.startsWith('module-') && overId.startsWith('module-')) {
      const activeModuleId = activeId.replace('module-', '');
      const overModuleId = overId.replace('module-', '');
      
      setCourse(prev => {
        const oldIndex = prev.modules.findIndex(m => m.id === activeModuleId);
        const newIndex = prev.modules.findIndex(m => m.id === overModuleId);
        
        const newModules = arrayMove(prev.modules, oldIndex, newIndex);
        return { ...prev, modules: newModules, lastModified: new Date() };
      });
    }

    // Handle lesson reordering within modules
    if (activeId.includes('-') && overId.includes('-')) {
      const [activeModuleId, activeLessonId] = activeId.split('-');
      const [overModuleId, overLessonId] = overId.split('-');
      
      if (activeModuleId === overModuleId) {
        setCourse(prev => {
          const moduleIndex = prev.modules.findIndex(m => m.id === activeModuleId);
          if (moduleIndex === -1) return prev;
          
          const module = prev.modules[moduleIndex];
          const oldIndex = module.lessons.findIndex(l => l.id === activeId);
          const newIndex = module.lessons.findIndex(l => l.id === overId);
          
          const newLessons = arrayMove(module.lessons, oldIndex, newIndex);
          const updatedModules = [...prev.modules];
          updatedModules[moduleIndex] = { ...module, lessons: newLessons };
          
          return { ...prev, modules: updatedModules, lastModified: new Date() };
        });
      }
    }
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      isExpanded: true,
      order: course.modules.length,
      isLocked: false,
      lessons: []
    };
    setCourse(prev => ({ 
      ...prev, 
      modules: [...prev.modules, newModule],
      lastModified: new Date()
    }));
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId ? { ...module, ...updates } : module
      ),
      lastModified: new Date()
    }));
  };

  const deleteModule = (moduleId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId),
      lastModified: new Date()
    }));
  };

  const addLesson = (moduleId: string, type: Lesson['type'] = 'video') => {
    const newLesson: Lesson = {
      id: `${Date.now()}-lesson`,
      title: 'New Lesson',
      type,
      duration: 10,
      isCompleted: false,
      isLocked: false,
      order: 0
    };

    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      ),
      lastModified: new Date()
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? {
              ...module,
              lessons: module.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              )
            }
          : module
      ),
      lastModified: new Date()
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
          : module
      ),
      lastModified: new Date()
    }));
  };

  const openContentEditor = (moduleId: string, lesson: Lesson) => {
    setSelectedModuleId(moduleId);
    setSelectedLesson(lesson);
    setShowContentEditor(true);
  };

  const saveContent = (content: string) => {
    if (selectedLesson && selectedModuleId) {
      updateLesson(selectedModuleId, selectedLesson.id, { 
        content,
        htmlContent: selectedLesson.type === 'html' ? content : undefined
      });
      setShowContentEditor(false);
    }
  };

  const generateAIContent = async () => {
    if (!selectedLesson) return;
    
    setAiGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `AI-generated content for "${selectedLesson.title}". This is a comprehensive lesson covering all the essential aspects of the topic with detailed explanations, examples, and practical applications.`;
      saveContent(generatedContent);
      setAiGenerating(false);
    }, 2000);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'assignment': return <Upload className="w-4 h-4" />;
      case 'html': return <Code className="w-4 h-4" />;
      case 'link': return <Link className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'text': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'quiz': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'assignment': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'html': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'link': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((total, module) => 
    total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
  );

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
          >
            ← Back to Editor
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600">
            <Play className="w-4 h-4 mr-2" />
            Enroll Now - ${course.price}
          </Button>
        </div>

        {/* Course Header */}
        <Card>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.length} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>{totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.currentEnrollments}/{course.enrollmentLimit} enrolled</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Instructor</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.authorName} - {course.authorBio}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-coral-600 mb-2">
                    ${course.price}
                  </div>
                  <Button className="w-full bg-coral-500 hover:bg-coral-600 mb-4">
                    Enroll Now
                  </Button>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Enrollment:</span>
                      <span>{course.enrollmentOpen ? 'Open' : 'Closed'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{course.enrollmentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spots left:</span>
                      <span>{course.enrollmentLimit - course.currentEnrollments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Curriculum */}
        <Card>
          <CardHeader>
            <CardTitle>Course Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Module {index + 1}: {module.title}</h4>
                    <div className="flex items-center gap-2">
                      {module.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      <span className="text-sm text-gray-600">
                        {module.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          {getLessonIcon(lesson.type)}
                          <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
                            {lesson.type}
                          </Badge>
                        </div>
                        <span className="flex-1">{lesson.title}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {lesson.isLocked ? <Lock className="w-3 h-3" /> : null}
                          <span>{lesson.duration} min</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Course Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Builder
          </CardTitle>
          <CardDescription>
            Create and manage your online course with advanced features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input
                  id="courseTitle"
                  value={course.title}
                  onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value, lastModified: new Date() }))}
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseDescription">Course Description</Label>
                <Textarea
                  id="courseDescription"
                  value={course.description}
                  onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value, lastModified: new Date() }))}
                  placeholder="Describe what students will learn"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coursePrice">Price ($)</Label>
                  <Input
                    id="coursePrice"
                    type="number"
                    value={course.price}
                    onChange={(e) => setCourse(prev => ({ ...prev, price: Number(e.target.value), lastModified: new Date() }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
                  <Input
                    id="enrollmentLimit"
                    type="number"
                    value={course.enrollmentLimit}
                    onChange={(e) => setCourse(prev => ({ ...prev, enrollmentLimit: Number(e.target.value), lastModified: new Date() }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload thumbnail</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enrollment Type</Label>
                  <Select 
                    value={course.enrollmentType} 
                    onValueChange={(value: 'manual' | 'automatic') => 
                      setCourse(prev => ({ ...prev, enrollmentType: value, lastModified: new Date() }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Enrollment Open</Label>
                  <Switch
                    checked={course.enrollmentOpen}
                    onCheckedChange={(checked) => 
                      setCourse(prev => ({ ...prev, enrollmentOpen: checked, lastModified: new Date() }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Published</Label>
                  <Switch
                    checked={course.isPublished}
                    onCheckedChange={(checked) => 
                      setCourse(prev => ({ ...prev, isPublished: checked, lastModified: new Date() }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Author Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  value={course.authorName}
                  onChange={(e) => setCourse(prev => ({ ...prev, authorName: e.target.value, lastModified: new Date() }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorBio">Author Bio</Label>
                <Input
                  id="authorBio"
                  value={course.authorBio}
                  onChange={(e) => setCourse(prev => ({ ...prev, authorBio: e.target.value, lastModified: new Date() }))}
                />
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
                <div className="text-sm text-gray-600">Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{totalDuration}m</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-coral-600">{course.currentEnrollments}</div>
                <div className="text-sm text-gray-600">Enrolled</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">${course.price}</div>
                <div className="text-sm text-gray-600">Price</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI Course Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">AI Quiz Generator</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Generate quizzes from content
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">AI Content Generator</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Generate lesson content
                  </div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">AI Tutor Assistant</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Set up AI student support
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Structure</span>
            <div className="flex gap-2">
              <Button onClick={addModule} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={course.modules.map(m => `module-${m.id}`)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <SortableModuleItem
                    key={module.id}
                    module={module}
                    moduleIndex={moduleIndex}
                    onUpdateModule={updateModule}
                    onDeleteModule={deleteModule}
                    onAddLesson={addLesson}
                    onUpdateLesson={updateLesson}
                    onDeleteLesson={deleteLesson}
                    onEditContent={openContentEditor}
                    getLessonIcon={getLessonIcon}
                    getTypeColor={getTypeColor}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          <Eye className="w-4 h-4 mr-2" />
          Preview Course
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            className="bg-coral-500 hover:bg-coral-600"
            onClick={() => setCourse(prev => ({ ...prev, isPublished: true, lastModified: new Date() }))}
          >
            <Play className="w-4 h-4 mr-2" />
            {course.isPublished ? 'Update Course' : 'Publish Course'}
          </Button>
        </div>
      </div>

      {/* Content Editor Sidebar */}
      {showContentEditor && selectedLesson && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl z-50 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Edit Content</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowContentEditor(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {selectedLesson.title}
            </p>
          </div>
          
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <Label>Lesson Type</Label>
              <Select 
                value={selectedLesson.type} 
                onValueChange={(value: Lesson['type']) => 
                  updateLesson(selectedModuleId, selectedLesson.id, { type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="link">External Link</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedLesson.type === 'video' && (
              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input
                  value={selectedLesson.videoUrl || ''}
                  onChange={(e) => updateLesson(selectedModuleId, selectedLesson.id, { videoUrl: e.target.value })}
                  placeholder="YouTube, Vimeo, or direct video URL"
                />
              </div>
            )}

            {selectedLesson.type === 'link' && (
              <div className="space-y-2">
                <Label>External Link</Label>
                <Input
                  value={selectedLesson.externalLink || ''}
                  onChange={(e) => updateLesson(selectedModuleId, selectedLesson.id, { externalLink: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            )}

            {(selectedLesson.type === 'text' || selectedLesson.type === 'html') && (
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <Label>Content</Label>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={generateAIContent}
                    disabled={aiGenerating}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    {aiGenerating ? 'Generating...' : 'AI Generate'}
                  </Button>
                </div>
                <Textarea
                  value={selectedLesson.type === 'html' ? selectedLesson.htmlContent || '' : selectedLesson.content || ''}
                  onChange={(e) => {
                    const field = selectedLesson.type === 'html' ? 'htmlContent' : 'content';
                    updateLesson(selectedModuleId, selectedLesson.id, { [field]: e.target.value });
                  }}
                  placeholder={selectedLesson.type === 'html' ? 'Enter HTML content...' : 'Enter lesson content...'}
                  rows={15}
                  className="resize-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={selectedLesson.duration}
                onChange={(e) => updateLesson(selectedModuleId, selectedLesson.id, { duration: Number(e.target.value) })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Locked</Label>
              <Switch
                checked={selectedLesson.isLocked}
                onCheckedChange={(checked) => updateLesson(selectedModuleId, selectedLesson.id, { isLocked: checked })}
              />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Button 
              className="w-full"
              onClick={() => {
                const content = selectedLesson.type === 'html' ? selectedLesson.htmlContent : selectedLesson.content;
                saveContent(content || '');
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                const content = selectedLesson.type === 'html' ? selectedLesson.htmlContent : selectedLesson.content;
                navigator.clipboard.writeText(content || '');
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Content
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
