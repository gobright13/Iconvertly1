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
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  Layers,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'html' | 'link' | 'interactive_quiz';
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
  settings?: {
    timeLimit?: number;
    attempts?: number;
    passingGrade?: number;
    feedback?: string;
    retryAllowed?: boolean;
  };
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
  authorImage?: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  enrollmentLimit: number;
  enrollmentType: 'manual' | 'automatic';
  isPublished: boolean;
  enrollmentOpen: boolean;
  currentEnrollments: number;
  modules: Module[];
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'published' | 'archived';
  certificateEnabled: boolean;
  completionCriteria: number;
  estimatedDuration: number;
}

const LESSON_TYPES = [
  { value: 'video', label: 'Video', icon: Video, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  { value: 'text', label: 'Text/Reading', icon: FileText, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  { value: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  { value: 'interactive_quiz', label: 'Interactive Quiz', icon: MessageCircle, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  { value: 'assignment', label: 'Assignment', icon: ClipboardCheck, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  { value: 'html', label: 'HTML Content', icon: Code, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  { value: 'link', label: 'External Link', icon: Link, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300' }
];

const CATEGORIES = [
  'Business', 'Technology', 'Design', 'Marketing', 'Development', 
  'Photography', 'Music', 'Health & Fitness', 'Language', 'Other'
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }
];

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) => {
  const [content, setContent] = useState(value || '');

  const handleFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800 flex-wrap">
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('bold')} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('italic')} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('underline')} className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('formatBlock', '<h1>')} className="h-8 px-2">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('formatBlock', '<h2>')} className="h-8 px-2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('formatBlock', '<h3>')} className="h-8 px-2">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('justifyLeft')} className="h-8 w-8 p-0">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('justifyCenter')} className="h-8 w-8 p-0">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('justifyRight')} className="h-8 w-8 p-0">
          <AlignRight className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('insertUnorderedList')} className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('insertOrderedList')} className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('formatBlock', '<blockquote>')} className="h-8 w-8 p-0">
          <Quote className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('createLink', prompt('Enter URL:') || '')} className="h-8 w-8 p-0">
          <Link className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleFormatting('insertImage', prompt('Enter image URL:') || '')} className="h-8 w-8 p-0">
          <Image className="h-4 w-4" />
        </Button>
      </div>
      <div
        contentEditable
        className="min-h-[200px] p-4 outline-none prose prose-sm max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={(e) => {
          const newContent = e.currentTarget.innerHTML;
          setContent(newContent);
          onChange(newContent);
        }}
        onInput={(e) => {
          const newContent = e.currentTarget.innerHTML;
          setContent(newContent);
        }}
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

// Sortable Lesson Item
const SortableLessonItem = ({ lesson, moduleId, onUpdateLesson, onDeleteLesson, onEditContent }: {
  lesson: Lesson;
  moduleId: string;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const lessonType = LESSON_TYPES.find(t => t.type === lesson.type);
  const LessonIcon = lessonType?.icon || FileText;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-2 min-w-0">
        <LessonIcon className="w-4 h-4 text-gray-600" />
        <Badge className={`text-xs ${lessonType?.color}`}>
          {lessonType?.label}
        </Badge>
      </div>

      <div className="flex-1 min-w-0">
        <Input
          value={lesson.title}
          onChange={(e) => onUpdateLesson(moduleId, lesson.id, { title: e.target.value })}
          className="border-0 p-0 h-auto font-medium bg-transparent"
          placeholder="Lesson title"
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-3 h-3" />
        <Input
          type="number"
          value={lesson.duration}
          onChange={(e) => onUpdateLesson(moduleId, lesson.id, { duration: Number(e.target.value) })}
          className="w-16 h-6 text-xs border-0 p-1 bg-transparent"
          min="1"
        />
        <span>min</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEditContent(moduleId, lesson)}
          className="h-8 w-8 p-0"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdateLesson(moduleId, lesson.id, { isLocked: !lesson.isLocked })}
          className="h-8 w-8 p-0"
        >
          {lesson.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDeleteLesson(moduleId, lesson.id)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Sortable Module Item
const SortableModuleItem = ({ module, onUpdateModule, onDeleteModule, onAddLesson, onUpdateLesson, onDeleteLesson, onEditContent }: {
  module: Module;
  onUpdateModule: (moduleId: string, updates: Partial<Module>) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string, type: Lesson['type']) => void;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `module-${module.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const oldIndex = module.lessons.findIndex(l => l.id === activeId);
    const newIndex = module.lessons.findIndex(l => l.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newLessons = arrayMove(module.lessons, oldIndex, newIndex);
      onUpdateModule(module.id, { lessons: newLessons });
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1">
            <Input
              value={module.title}
              onChange={(e) => onUpdateModule(module.id, { title: e.target.value })}
              className="font-semibold text-lg border-0 p-0 h-auto bg-transparent"
              placeholder="Module title"
            />
            <Input
              value={module.description}
              onChange={(e) => onUpdateModule(module.id, { description: e.target.value })}
              className="text-sm text-gray-600 dark:text-gray-400 border-0 p-0 h-auto mt-1 bg-transparent"
              placeholder="Module description"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onUpdateModule(module.id, { isExpanded: !module.isExpanded })}
              className="h-8 w-8 p-0"
            >
              {module.isExpanded ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeleteModule(module.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Add Lesson Buttons */}
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddLesson(module.id, 'video')}
            className="h-8"
          >
            <Video className="w-4 h-4 mr-1" />
            Lesson
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddLesson(module.id, 'quiz')}
            className="h-8"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Quiz
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddLesson(module.id, 'interactive_quiz')}
            className="h-8"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Interactive Quiz
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddLesson(module.id, 'assignment')}
            className="h-8"
          >
            <ClipboardCheck className="w-4 h-4 mr-1" />
            Assignment
          </Button>
        </div>
      </div>

      {module.isExpanded && (
        <div className="p-4">
          {module.lessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No lessons yet. Add your first lesson above.</p>
            </div>
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleLessonDragEnd}
            >
              <SortableContext 
                items={module.lessons.map(l => l.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <SortableLessonItem
                      key={lesson.id}
                      lesson={lesson}
                      moduleId={module.id}
                      onUpdateLesson={onUpdateLesson}
                      onDeleteLesson={onDeleteLesson}
                      onEditContent={onEditContent}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  );
};

export function DragAndDropCourseBuilder() {
  const [isLoading, setIsLoading] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  const [course, setCourse] = useState<Course>({
    id: Date.now().toString(),
    title: 'New Course',
    description: 'Course description',
    richDescription: '<p>Rich course description with <strong>formatting</strong></p>',
    price: 97,
    currency: 'USD',
    authorName: 'Instructor Name',
    authorBio: 'Experienced instructor with expertise in the field',
    language: 'en',
    level: 'beginner',
    category: 'Business',
    tags: [],
    enrollmentLimit: 100,
    enrollmentType: 'automatic',
    isPublished: false,
    enrollmentOpen: true,
    currentEnrollments: 0,
    certificateEnabled: true,
    completionCriteria: 80,
    estimatedDuration: 120,
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
      order: 0,
      settings: {
        timeLimit: 0,
        attempts: 3,
        passingGrade: 70,
        feedback: '',
        retryAllowed: true
      }
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
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!');
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
      const generatedContent = `<h2>AI-generated content for "${selectedLesson.title}"</h2><p>This is a comprehensive lesson covering all the essential aspects of the topic with detailed explanations, examples, and practical applications.</p><ul><li>Key concept 1</li><li>Key concept 2</li><li>Key concept 3</li></ul><p>Remember to practice what you learn!</p>`;
      if (selectedLesson && selectedModuleId) {
        updateLesson(selectedModuleId, selectedLesson.id, { content: generatedContent });
      }
      setAiGenerating(false);
      toast.success('AI content generated successfully!');
    }, 2000);
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

        {/* Course Preview Content */}
        <Card>
          <CardContent className="p-8">
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
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Builder
            <Badge variant="outline" className="ml-2">
              {course.status === 'draft' ? 'Auto-saving...' : course.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Course Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                <RichTextEditor
                  value={course.richDescription || ''}
                  onChange={(value) => setCourse(prev => ({ ...prev, richDescription: value, lastModified: new Date() }))}
                  placeholder="Describe what students will learn..."
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={course.category} 
                    onValueChange={(value) => 
                      setCourse(prev => ({ ...prev, category: value, lastModified: new Date() }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select 
                    value={course.level} 
                    onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                      setCourse(prev => ({ ...prev, level: value, lastModified: new Date() }))
                    }
                  >
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
              </div>
            </div>

            <div className="space-y-4">
              {/* Author Information */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Author Information</h4>
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
                  <Textarea
                    id="authorBio"
                    value={course.authorBio}
                    onChange={(e) => setCourse(prev => ({ ...prev, authorBio: e.target.value, lastModified: new Date() }))}
                    rows={3}
                    placeholder="Brief author biography"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Author Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload author image</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {/* Course Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Course Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Certificate Enabled</Label>
                    <Switch
                      checked={course.certificateEnabled}
                      onCheckedChange={(checked) => 
                        setCourse(prev => ({ ...prev, certificateEnabled: checked, lastModified: new Date() }))
                      }
                    />
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

      {/* Course Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Curriculum</span>
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
                {course.modules.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No modules yet</p>
                    <p className="text-sm">Click "Add Module" to get started</p>
                  </div>
                ) : (
                  course.modules.map((module) => (
                    <SortableModuleItem
                      key={module.id}
                      module={module}
                      onUpdateModule={updateModule}
                      onDeleteModule={deleteModule}
                      onAddLesson={addLesson}
                      onUpdateLesson={updateLesson}
                      onDeleteLesson={deleteLesson}
                      onEditContent={openContentEditor}
                    />
                  ))
                )}
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

      {/* Two-Column Content Editor Dialog */}
      <Dialog open={showContentEditor} onOpenChange={setShowContentEditor}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Lesson Content</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <div className="grid grid-cols-2 gap-6 h-[70vh]">
              {/* Left Column - Content Editor */}
              <div className="space-y-4 overflow-y-auto border-r pr-6">
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
                      {LESSON_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
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

                {selectedLesson.type === 'quiz' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Time Limit (minutes)</Label>
                      <Input
                        type="number"
                        value={selectedLesson.settings?.timeLimit || 0}
                        onChange={(e) => setSelectedLesson({ 
                          ...selectedLesson, 
                          settings: { ...selectedLesson.settings, timeLimit: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Attempts</Label>
                      <Input
                        type="number"
                        value={selectedLesson.settings?.attempts || 3}
                        onChange={(e) => setSelectedLesson({ 
                          ...selectedLesson, 
                          settings: { ...selectedLesson.settings, attempts: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Passing Grade (%)</Label>
                      <Input
                        type="number"
                        value={selectedLesson.settings?.passingGrade || 70}
                        onChange={(e) => setSelectedLesson({ 
                          ...selectedLesson, 
                          settings: { ...selectedLesson.settings, passingGrade: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Retry Allowed</Label>
                      <Switch
                        checked={selectedLesson.settings?.retryAllowed ?? true}
                        onCheckedChange={(checked) => setSelectedLesson({ 
                          ...selectedLesson, 
                          settings: { ...selectedLesson.settings, retryAllowed: checked }
                        })}
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
                  <RichTextEditor
                    value={selectedLesson.content || ''}
                    onChange={(content) => setSelectedLesson({ ...selectedLesson, content })}
                    placeholder="Enter lesson content..."
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

              {/* Right Column - Settings & Preview */}
              <div className="space-y-4 overflow-y-auto pl-6">
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
                      {LESSON_TYPES.find(t => t.value === selectedLesson.type)?.icon && (
                        React.createElement(LESSON_TYPES.find(t => t.value === selectedLesson.type)!.icon, { className: "w-4 h-4" })
                      )}
                      <Badge className={`text-xs ${LESSON_TYPES.find(t => t.value === selectedLesson.type)?.color}`}>
                        {LESSON_TYPES.find(t => t.value === selectedLesson.type)?.label}
                      </Badge>
                      <span className="text-sm text-gray-600">{selectedLesson.duration} min</span>
                    </div>

                    {selectedLesson.content && (
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
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
    </div>
  );
}