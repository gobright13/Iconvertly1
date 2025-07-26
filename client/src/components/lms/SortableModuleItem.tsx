
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { 
  GripVertical, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  X,
  Lock,
  Unlock,
  PlayCircle,
  Clock
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

interface SortableLessonItemProps {
  lesson: Lesson;
  moduleId: string;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getLessonIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

function SortableLessonItem({ 
  lesson, 
  moduleId, 
  onUpdateLesson, 
  onDeleteLesson, 
  onEditContent,
  getLessonIcon, 
  getTypeColor 
}: SortableLessonItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lesson.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdateLesson(moduleId, lesson.id, { title: editTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(lesson.title);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="flex items-center gap-2">
        {getLessonIcon(lesson.type)}
        <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
          {lesson.type}
        </Badge>
      </div>

      <div className="flex-1">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-8"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button size="sm" onClick={handleSave}>
              <Save className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-medium">{lesson.title}</span>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{lesson.duration}m</span>
              </div>
              {lesson.isLocked && <Lock className="w-3 h-3" />}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => onEditContent(moduleId, lesson)}
          title="Edit Content"
        >
          <Edit className="w-3 h-3" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => setIsEditing(!isEditing)}
          title="Edit Title"
        >
          <Edit className="w-3 h-3" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => onUpdateLesson(moduleId, lesson.id, { isLocked: !lesson.isLocked })}
          title={lesson.isLocked ? "Unlock" : "Lock"}
        >
          {lesson.isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => onDeleteLesson(moduleId, lesson.id)}
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

interface SortableModuleItemProps {
  module: Module;
  moduleIndex: number;
  onUpdateModule: (moduleId: string, updates: Partial<Module>) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string, type?: Lesson['type']) => void;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getLessonIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

export function SortableModuleItem({
  module,
  moduleIndex,
  onUpdateModule,
  onDeleteModule,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onEditContent,
  getLessonIcon,
  getTypeColor,
}: SortableModuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(module.title);
  const [editDescription, setEditDescription] = useState(module.description);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `module-${module.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

    const oldIndex = module.lessons.findIndex(lesson => lesson.id === activeId);
    const newIndex = module.lessons.findIndex(lesson => lesson.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newLessons = arrayMove(module.lessons, oldIndex, newIndex);
      onUpdateModule(module.id, { lessons: newLessons });
    }
  };

  const handleSave = () => {
    onUpdateModule(module.id, { 
      title: editTitle, 
      description: editDescription 
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(module.title);
    setEditDescription(module.description);
    setIsEditing(false);
  };

  const totalDuration = module.lessons.reduce((total, lesson) => total + lesson.duration, 0);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Module Header */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b">
            <div className="flex items-center gap-3">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
              >
                <GripVertical className="w-5 h-5" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateModule(module.id, { isExpanded: !module.isExpanded })}
              >
                {module.isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Module title"
                      className="font-medium"
                    />
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Module description"
                      rows={2}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Module {moduleIndex + 1}: {module.title}
                      </h4>
                      {module.isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{module.lessons.length} lessons</span>
                      <span>{totalDuration} minutes</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateModule(module.id, { isLocked: !module.isLocked })}
                      title={module.isLocked ? "Unlock Module" : "Lock Module"}
                    >
                      {module.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteModule(module.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Module Content */}
          {module.isExpanded && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-gray-900 dark:text-white">Lessons</h5>
                <div className="flex gap-2">
                  <Select onValueChange={(type: Lesson['type']) => onAddLesson(module.id, type)}>
                    <SelectTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lesson
                      </Button>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Lesson</SelectItem>
                      <SelectItem value="text">Text Lesson</SelectItem>
                      <SelectItem value="html">HTML Content</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {module.lessons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <PlayCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No lessons yet. Add your first lesson above.</p>
                </div>
              ) : (
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
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
                          getLessonIcon={getLessonIcon}
                          getTypeColor={getTypeColor}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock,
  Video,
  FileText,
  HelpCircle,
  Upload,
  Code,
  Link,
  BookOpen
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

interface SortableModuleItemProps {
  module: Module;
  moduleIndex: number;
  onUpdateModule: (moduleId: string, updates: Partial<Module>) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string, type: Lesson['type']) => void;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getLessonIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

export function SortableModuleItem({
  module,
  moduleIndex,
  onUpdateModule,
  onDeleteModule,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onEditContent,
  getLessonIcon,
  getTypeColor
}: SortableModuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(module.title);
  const [editDescription, setEditDescription] = useState(module.description);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `module-${module.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveModule = () => {
    onUpdateModule(module.id, {
      title: editTitle,
      description: editDescription
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(module.title);
    setEditDescription(module.description);
    setIsEditing(false);
  };

  const totalDuration = module.lessons.reduce((total, lesson) => total + lesson.duration, 0);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateModule(module.id, { isExpanded: !module.isExpanded })}
              >
                {module.isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="font-medium"
                    />
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      {module.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>{module.lessons.length} lessons</span>
                      <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveModule}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onUpdateModule(module.id, { isLocked: !module.isLocked })}
                  >
                    {module.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteModule(module.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {module.isExpanded && (
          <CardContent className="pt-0">
            {/* Add Lesson Buttons */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600 mr-2">Add Lesson:</span>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'video')}>
                <Video className="h-3 w-3 mr-1" />
                Video
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'text')}>
                <FileText className="h-3 w-3 mr-1" />
                Text
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'quiz')}>
                <HelpCircle className="h-3 w-3 mr-1" />
                Quiz
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'assignment')}>
                <Upload className="h-3 w-3 mr-1" />
                Assignment
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'html')}>
                <Code className="h-3 w-3 mr-1" />
                HTML
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'link')}>
                <Link className="h-3 w-3 mr-1" />
                Link
              </Button>
            </div>

            {/* Lessons List */}
            <div className="space-y-2">
              {module.lessons.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No lessons yet. Add your first lesson above.</p>
                </div>
              ) : (
                module.lessons.map((lesson, lessonIndex) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                    moduleId={module.id}
                    onUpdateLesson={onUpdateLesson}
                    onDeleteLesson={onDeleteLesson}
                    onEditContent={onEditContent}
                    getLessonIcon={getLessonIcon}
                    getTypeColor={getTypeColor}
                  />
                ))
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

interface LessonItemProps {
  lesson: Lesson;
  lessonIndex: number;
  moduleId: string;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getLessonIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

function LessonItem({
  lesson,
  lessonIndex,
  moduleId,
  onUpdateLesson,
  onDeleteLesson,
  onEditContent,
  getLessonIcon,
  getTypeColor
}: LessonItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lesson.title);
  const [editDuration, setEditDuration] = useState(lesson.duration.toString());

  const handleSaveLesson = () => {
    onUpdateLesson(moduleId, lesson.id, {
      title: editTitle,
      duration: parseInt(editDuration) || 0
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(lesson.title);
    setEditDuration(lesson.duration.toString());
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
      <div className="flex items-center space-x-3 flex-1">
        <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded">
          <GripVertical className="h-3 w-3 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2">
          {getLessonIcon(lesson.type)}
          <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
            {lesson.type}
          </Badge>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
                className="w-20"
                placeholder="min"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {lessonIndex + 1}. {lesson.title}
                </span>
                {lesson.isLocked && <Lock className="h-3 w-3 text-gray-500" />}
              </div>
              <div className="text-xs text-muted-foreground">
                {lesson.duration} minutes
                {lesson.content && <span> • Has content</span>}
                {lesson.videoUrl && <span> • Video URL set</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveLesson}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEditContent(moduleId, lesson)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onUpdateLesson(moduleId, lesson.id, { isLocked: !lesson.isLocked })}
            >
              {lesson.isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeleteLesson(moduleId, lesson.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
