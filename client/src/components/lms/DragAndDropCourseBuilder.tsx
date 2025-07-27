

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
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
  X,
  Clock,
  GripVertical,
  Trash2,
  MessageCircle,
  ClipboardCheck,
  FileVideo,
  Youtube,
  MonitorPlay,
  ExternalLink,
  Lightbulb,
  Type,
  Hash,
  Palette,
  Camera,
  Film,
  Speaker,
  PenTool,
  CheckSquare,
  List,
  ListChecks,
  Star,
  Award,
  Target,
  Layers
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'html' | 'link' | 'conversational_quiz';
  duration: number;
  content?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  embedCode?: string;
  htmlContent?: string;
  externalLink?: string;
  shortcode?: string;
  featuredImage?: string;
  description?: string;
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
  richDescription?: string;
  price: number;
  currency: string;
  thumbnail?: string;
  authorName: string;
  authorBio: string;
  language: string;
  enrollmentLimit: number;
  enrollmentType: 'manual' | 'automatic';
  isPublished: boolean;
  enrollmentOpen: boolean;
  currentEnrollments: number;
  modules: Module[];
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'published' | 'archived';
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  posts: number;
  isActive: boolean;
}

const LANGUAGES = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'zh-cn', name: 'Chinese (Simplified)' },
  { code: 'zh-tw', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'tl', name: 'Filipino' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'iw', name: 'Hebrew' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jw', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish (Kurmanji)' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'or', name: 'Odia' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' }
];

export function DragAndDropCourseBuilder() {
  const [isLoading, setIsLoading] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showForumSettings, setShowForumSettings] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([
    { id: '1', name: 'General Discussion', description: 'General course discussions', posts: 28, isActive: true },
    { id: '2', name: 'Technical Support', description: 'Get help with technical issues', posts: 14, isActive: true },
    { id: '3', name: 'Course Q&A', description: 'Questions about course content', posts: 38, isActive: true },
    { id: '4', name: 'Feature Requests', description: 'Suggest new features', posts: 15, isActive: true },
    { id: '5', name: 'Success Stories', description: 'Share your achievements', posts: 22, isActive: true }
  ]);

  const [course, setCourse] = useState<Course>({
    id: Date.now().toString(),
    title: 'New Course',
    description: 'Course description',
    richDescription: '<p>Rich course description with <strong>formatting</strong></p>',
    price: 97,
    currency: 'USD',
    authorName: 'Instructor Name',
    authorBio: 'Instructor bio',
    language: 'en',
    enrollmentLimit: 100,
    enrollmentType: 'automatic',
    isPublished: false,
    enrollmentOpen: true,
    currentEnrollments: 0,
    createdAt: new Date(),
    lastModified: new Date(),
    status: 'draft',
    modules: []
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveCourse();
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [course]);

  const saveCourse = () => {
    // Save course as draft
    const existingCourses = JSON.parse(localStorage.getItem('draftCourses') || '[]');
    const courseIndex = existingCourses.findIndex((c: Course) => c.id === course.id);
    
    const updatedCourse = { ...course, lastModified: new Date() };
    
    if (courseIndex >= 0) {
      existingCourses[courseIndex] = updatedCourse;
    } else {
      existingCourses.push(updatedCourse);
    }
    
    localStorage.setItem('draftCourses', JSON.stringify(existingCourses));
  };

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
    if (activeId.includes('-lesson-') && overId.includes('-lesson-')) {
      const [activeModuleId] = activeId.split('-lesson-');
      const [overModuleId] = overId.split('-lesson-');
      
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
    toast.success('Module added successfully!');
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
    toast.success('Module deleted successfully!');
  };

  const addLesson = (moduleId: string, type: Lesson['type'] = 'video') => {
    const newLesson: Lesson = {
      id: `${moduleId}-lesson-${Date.now()}`,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      duration: 10,
      description: '',
      content: '',
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
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
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
    toast.success('Lesson deleted successfully!');
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
      toast.success('Content saved successfully!');
    }
  };

  const generateAIContent = async () => {
    if (!selectedLesson) return;
    
    setAiGenerating(true);
    setTimeout(() => {
      const generatedContent = `AI-generated content for "${selectedLesson.title}". This is a comprehensive lesson covering all the essential aspects of the topic with detailed explanations, examples, and practical applications.`;
      saveContent(generatedContent);
      setAiGenerating(false);
      toast.success('AI content generated successfully!');
    }, 2000);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'conversational_quiz': return <MessageCircle className="w-4 h-4" />;
      case 'assignment': return <ClipboardCheck className="w-4 h-4" />;
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
      case 'conversational_quiz': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'assignment': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'html': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'link': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: ForumCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      description: newCategoryDescription,
      posts: 0,
      isActive: true
    };
    
    setForumCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryDescription('');
    setShowCreateCategory(false);
    toast.success('Forum category created successfully!');
  };

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((total, module) => 
    total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
  );

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6">
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
                <div className="text-lg text-gray-600 dark:text-gray-400 mb-6" 
                     dangerouslySetInnerHTML={{ __html: course.richDescription || course.description }} />
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
                      <span>Language:</span>
                      <span>{LANGUAGES.find(l => l.code === course.language)?.name || 'English'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enrollment:</span>
                      <span>{course.enrollmentOpen ? 'Open' : 'Closed'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{course.enrollmentType}</span>
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
            <div className="space-y-4 max-h-96 overflow-y-auto">
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
                    {module.lessons.map((lesson) => (
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
    <div className="max-w-6xl mx-auto space-y-6 relative p-6">
      {/* Course Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Builder
            <Badge variant="outline" className="ml-2">
              {course.status === 'draft' ? 'Auto-saving...' : course.status}
            </Badge>
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
                <Label htmlFor="courseDescription">Course Description (Rich Text)</Label>
                <div className="border rounded-md p-3 min-h-[120px] bg-white">
                  <div className="flex gap-2 mb-2 border-b pb-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <PenTool className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={course.description}
                    onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value, lastModified: new Date() }))}
                    placeholder="Describe what students will learn..."
                    className="border-0 resize-none min-h-[80px] p-0"
                  />
                </div>
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
                  <Button size="sm" variant="outline" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select 
                    value={course.language} 
                    onValueChange={(value) => 
                      setCourse(prev => ({ ...prev, language: value, lastModified: new Date() }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
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
                      setCourse(prev => ({ ...prev, isPublished: checked, status: checked ? 'published' : 'draft', lastModified: new Date() }))
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
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <div className="flex-1">
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(module.id, { title: e.target.value })}
                          className="font-medium text-lg border-0 p-0 h-auto"
                        />
                        <Input
                          value={module.description}
                          onChange={(e) => updateModule(module.id, { description: e.target.value })}
                          className="text-sm text-gray-600 border-0 p-0 h-auto mt-1"
                          placeholder="Module description"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateModule(module.id, { isExpanded: !module.isExpanded })}
                        >
                          {module.isExpanded ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteModule(module.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {module.isExpanded && (
                      <div className="space-y-3">
                        {/* Add Lesson Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(module.id, 'video')}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(module.id, 'quiz')}
                          >
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Add Quiz
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(module.id, 'conversational_quiz')}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Conversational Quiz
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addLesson(module.id, 'assignment')}
                          >
                            <ClipboardCheck className="w-4 h-4 mr-2" />
                            Assignment
                          </Button>
                        </div>

                        {/* Lessons List */}
                        <SortableContext 
                          items={module.lessons.map(l => l.id)} 
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-2">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                                <div className="flex items-center gap-2 min-w-0">
                                  {getLessonIcon(lesson.type)}
                                  <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
                                    {lesson.type}
                                  </Badge>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                                    className="border-0 p-0 h-auto font-medium"
                                  />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  <Input
                                    type="number"
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(module.id, lesson.id, { duration: Number(e.target.value) })}
                                    className="w-16 h-6 text-xs border-0 p-1"
                                  />
                                  <span>min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openContentEditor(module.id, lesson)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateLesson(module.id, lesson.id, { isLocked: !lesson.isLocked })}
                                  >
                                    {lesson.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteLesson(module.id, lesson.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </SortableContext>
                      </div>
                    )}
                  </div>
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
            onClick={() => setCourse(prev => ({ ...prev, isPublished: true, status: 'published', lastModified: new Date() }))}
          >
            <Play className="w-4 h-4 mr-2" />
            {course.isPublished ? 'Update Course' : 'Publish Course'}
          </Button>
        </div>
      </div>

      {/* Content Editor Dialog */}
      <Dialog open={showContentEditor} onOpenChange={setShowContentEditor}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Lesson Content</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <div className="grid grid-cols-2 gap-6 h-[70vh]">
              {/* Left Column - Editor */}
              <div className="space-y-4 overflow-y-auto">
                <div className="space-y-2">
                  <Label>Lesson Title</Label>
                  <Input
                    value={selectedLesson.title}
                    onChange={(e) => setSelectedLesson({ ...selectedLesson, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lesson Type</Label>
                  <Select 
                    value={selectedLesson.type} 
                    onValueChange={(value: Lesson['type']) => 
                      setSelectedLesson({ ...selectedLesson, type: value })
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
                      <SelectItem value="conversational_quiz">Conversational Quiz</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedLesson.type === 'video' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>YouTube URL</Label>
                      <Input
                        value={selectedLesson.youtubeUrl || ''}
                        onChange={(e) => setSelectedLesson({ ...selectedLesson, youtubeUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Vimeo URL</Label>
                      <Input
                        value={selectedLesson.vimeoUrl || ''}
                        onChange={(e) => setSelectedLesson({ ...selectedLesson, vimeoUrl: e.target.value })}
                        placeholder="https://vimeo.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Embed Code</Label>
                      <Textarea
                        value={selectedLesson.embedCode || ''}
                        onChange={(e) => setSelectedLesson({ ...selectedLesson, embedCode: e.target.value })}
                        placeholder="<iframe src=... or other embed code"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {selectedLesson.type === 'link' && (
                  <div className="space-y-2">
                    <Label>External Link</Label>
                    <Input
                      value={selectedLesson.externalLink || ''}
                      onChange={(e) => setSelectedLesson({ ...selectedLesson, externalLink: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {selectedLesson.type === 'html' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>HTML Content</Label>
                      <Textarea
                        value={selectedLesson.htmlContent || ''}
                        onChange={(e) => setSelectedLesson({ ...selectedLesson, htmlContent: e.target.value })}
                        placeholder="<div>Your HTML content here...</div>"
                        rows={8}
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Shortcode</Label>
                      <Input
                        value={selectedLesson.shortcode || ''}
                        onChange={(e) => setSelectedLesson({ ...selectedLesson, shortcode: e.target.value })}
                        placeholder="[shortcode parameter='value']"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
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
                    value={selectedLesson.content || ''}
                    onChange={(e) => setSelectedLesson({ ...selectedLesson, content: e.target.value })}
                    placeholder="Enter lesson content..."
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={selectedLesson.duration}
                    onChange={(e) => setSelectedLesson({ ...selectedLesson, duration: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4 overflow-y-auto border-l pl-6">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload lesson thumbnail</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h3 className="font-bold mb-2">{selectedLesson.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      {getLessonIcon(selectedLesson.type)}
                      <Badge className={`text-xs ${getTypeColor(selectedLesson.type)}`}>
                        {selectedLesson.type}
                      </Badge>
                      <span className="text-sm text-gray-600">{selectedLesson.duration} min</span>
                    </div>
                    
                    {selectedLesson.type === 'video' && selectedLesson.youtubeUrl && (
                      <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center">
                        <Youtube className="w-12 h-12 text-white" />
                      </div>
                    )}
                    
                    {selectedLesson.content && (
                      <div className="text-sm text-gray-700">
                        {selectedLesson.content}
                      </div>
                    )}
                    
                    {selectedLesson.htmlContent && (
                      <div 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: selectedLesson.htmlContent }}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Lesson Locked</Label>
                  <Switch
                    checked={selectedLesson.isLocked}
                    onCheckedChange={(checked) => setSelectedLesson({ ...selectedLesson, isLocked: checked })}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowContentEditor(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedLesson && selectedModuleId) {
                  updateLesson(selectedModuleId, selectedLesson.id, selectedLesson);
                  setShowContentEditor(false);
                  toast.success('Lesson updated successfully!');
                }
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forum Settings Dialog */}
      <Dialog open={showForumSettings} onOpenChange={setShowForumSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Forum Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Forum</Label>
                  <p className="text-sm text-gray-600">Allow students to participate in discussions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Moderation Required</Label>
                  <p className="text-sm text-gray-600">Require approval for new posts</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Notify instructors of new posts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Forum Categories</h4>
                <Button size="sm" onClick={() => setShowCreateCategory(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {forumCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.posts} posts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={category.isActive} />
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowForumSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowForumSettings(false)}>
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Category Dialog */}
      <Dialog open={showCreateCategory} onOpenChange={setShowCreateCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Forum Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowCreateCategory(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>
              Create Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forum Settings Button (to trigger dialog) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowForumSettings(true)}
          className="rounded-full w-12 h-12 p-0 shadow-lg"
          variant="outline"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

