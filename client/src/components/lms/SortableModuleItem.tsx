import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  X
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

interface SortableModuleItemProps {
  module: Module;
  moduleIndex: number;
  onUpdateModule: (moduleId: string, updates: Partial<Module>) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string) => void;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
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
  getLessonIcon,
  getTypeColor
}: SortableModuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(module.title);
  const [editDescription, setEditDescription] = useState(module.description);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveModule = () => {
    onUpdateModule(module.id, { 
      title: editTitle, 
      description: editDescription 
    });
    setIsEditing(false);
  };

  const handleSaveLesson = (lesson: Lesson, newTitle: string) => {
    onUpdateLesson(module.id, lesson.id, { title: newTitle });
    setEditingLesson(null);
  };

  const toggleExpanded = () => {
    onUpdateModule(module.id, { isExpanded: !module.isExpanded });
  };

  const lessonTypes = [
    { value: 'video', label: 'Video', color: 'bg-blue-100 text-blue-700' },
    { value: 'text', label: 'Text', color: 'bg-green-100 text-green-700' },
    { value: 'quiz', label: 'Quiz', color: 'bg-orange-100 text-orange-700' },
    { value: 'assignment', label: 'Assignment', color: 'bg-purple-100 text-purple-700' }
  ];

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-coral-300">
        <CardContent className="p-4">
          {/* Module Header */}
          <div className="flex items-center gap-3 mb-3">
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab hover:cursor-grabbing"
            >
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="p-1"
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
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {module.description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {module.lessons.length} lessons
              </Badge>
              
              {isEditing ? (
                <div className="flex gap-1">
                  <Button size="sm" onClick={handleSaveModule}>
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(module.title);
                      setEditDescription(module.description);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-1">
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
                </div>
              )}
            </div>
          </div>

          {/* Module Content */}
          {module.isExpanded && (
            <div className="ml-8 space-y-3">
              {/* Lessons */}
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {getLessonIcon(lesson.type)}
                    </div>
                    
                    {editingLesson === lesson.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          defaultValue={lesson.title}
                          onBlur={(e) => handleSaveLesson(lesson, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveLesson(lesson, e.currentTarget.value);
                            }
                            if (e.key === 'Escape') {
                              setEditingLesson(null);
                            }
                          }}
                          autoFocus
                          className="h-8"
                        />
                        <select
                          value={lesson.type}
                          onChange={(e) => onUpdateLesson(module.id, lesson.id, { 
                            type: e.target.value as Lesson['type'] 
                          })}
                          className="h-8 text-sm border rounded px-2"
                        >
                          {lessonTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          value={lesson.duration}
                          onChange={(e) => onUpdateLesson(module.id, lesson.id, { 
                            duration: parseInt(e.target.value) || 0 
                          })}
                          className="h-8 w-20"
                          placeholder="mins"
                        />
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 flex-1 cursor-pointer"
                        onClick={() => setEditingLesson(lesson.id)}
                      >
                        <span className="font-medium text-sm">
                          {lessonIndex + 1}. {lesson.title}
                        </span>
                        <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
                          {lesson.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {lesson.duration} min
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteLesson(module.id, lesson.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {/* Add Lesson Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddLesson(module.id)}
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}