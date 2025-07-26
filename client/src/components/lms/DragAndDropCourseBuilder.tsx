import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
// Note: restrictToVerticalAxis and restrictToWindowEdges not available, using alternatives
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
  Zap
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  content?: string;
  videoUrl?: string;
  isCompleted: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

export function DragAndDropCourseBuilder() {
  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction to Digital Marketing',
      description: 'Learn the fundamentals of digital marketing',
      isExpanded: true,
      lessons: [
        { id: '1-1', title: 'What is Digital Marketing?', type: 'video', duration: 15, isCompleted: false },
        { id: '1-2', title: 'Digital Marketing Channels', type: 'text', duration: 10, isCompleted: false },
        { id: '1-3', title: 'Knowledge Check', type: 'quiz', duration: 5, isCompleted: false }
      ]
    },
    {
      id: '2',
      title: 'Content Marketing Strategy',
      description: 'Create compelling content that converts',
      isExpanded: false,
      lessons: [
        { id: '2-1', title: 'Content Planning', type: 'video', duration: 20, isCompleted: false },
        { id: '2-2', title: 'Content Creation Workshop', type: 'assignment', duration: 30, isCompleted: false }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      isExpanded: true,
      lessons: [
        { 
          id: `${Date.now()}-1`, 
          title: 'New Lesson', 
          type: 'video', 
          duration: 10, 
          isCompleted: false 
        }
      ]
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, ...updates } : module
    ));
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `${Date.now()}-lesson`,
      title: 'New Lesson',
      type: 'video',
      duration: 10,
      isCompleted: false
    };

    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    ));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId ? { ...lesson, ...updates } : lesson
            )
          }
        : module
    ));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
        : module
    ));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'assignment': return <Upload className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'text': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'quiz': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'assignment': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalDuration = modules.reduce((total, module) => 
    total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
  );

  // Simulate loading completion
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Course Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Builder
          </CardTitle>
          <CardDescription>
            Drag and drop to organize your course modules and lessons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div className="space-y-2">
              <Label>Course Stats</Label>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{modules.length} modules</span>
                <span>{totalLessons} lessons</span>
                <span>{totalDuration} minutes</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseDescription">Course Description</Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Describe what students will learn"
              rows={3}
            />
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
            <Button onClick={addModule} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            // modifiers will be added when available
          >
            <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <SortableModuleItem
                    key={module.id}
                    module={module}
                    moduleIndex={moduleIndex}
                    onUpdateModule={updateModule}
                    onDeleteModule={deleteModule}
                    onAddLesson={addLesson}
                    onUpdateLesson={updateLesson}
                    onDeleteLesson={deleteLesson}
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
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview Course
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600">
            <Play className="w-4 h-4 mr-2" />
            Publish Course
          </Button>
        </div>
      </div>
    </div>
  );
}