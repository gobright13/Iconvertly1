import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  ArrowLeft,
  BookOpen, 
  Video, 
  Play,
  Download,
  FileText,
  Headphones,
  Plus,
  Edit,
  Trash2,
  Eye,
  GripVertical,
  Settings,
  Upload,
  Save,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Clock,
  Users,
  Star,
  DollarSign
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download' | 'live';
  content: string;
  duration: number;
  order: number;
}

export default function CourseBuilder() {
  const [course, setCourse] = useState<Course>({
    id: 'new-course',
    title: 'New Course',
    description: '',
    thumbnail: '',
    price: 0,
    category: '',
    difficulty: 'beginner',
    modules: []
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Getting Started',
      description: 'Introduction to the course',
      isExpanded: true,
      order: 1,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Welcome Video',
          type: 'video',
          content: '',
          duration: 300,
          order: 1
        },
        {
          id: 'lesson-2',
          title: 'Course Overview',
          type: 'text',
          content: '',
          duration: 600,
          order: 2
        }
      ]
    }
  ]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'assignment': return <Edit className="h-4 w-4" />;
      case 'live': return <Video className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;
    
    if (type === 'modules') {
      const newModules = Array.from(modules);
      const [reorderedModule] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, reorderedModule);
      
      const updatedModules = newModules.map((module, index) => ({
        ...module,
        order: index + 1
      }));
      
      setModules(updatedModules);
      toast.success("Module order updated");
    } else if (type === 'lessons') {
      const moduleId = source.droppableId.replace('module-', '');
      const moduleIndex = modules.findIndex(m => m.id === moduleId);
      
      if (moduleIndex !== -1) {
        const newModules = [...modules];
        const lessons = [...newModules[moduleIndex].lessons];
        const [reorderedLesson] = lessons.splice(source.index, 1);
        lessons.splice(destination.index, 0, reorderedLesson);
        
        const updatedLessons = lessons.map((lesson, index) => ({
          ...lesson,
          order: index + 1
        }));
        
        newModules[moduleIndex].lessons = updatedLessons;
        setModules(newModules);
        toast.success("Lesson order updated");
      }
    }
  };

  const addNewModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `Module ${modules.length + 1}`,
      description: 'New module description',
      lessons: [],
      isExpanded: true,
      order: modules.length + 1
    };
    setModules([...modules, newModule]);
    toast.success("New module added");
  };

  const addNewLesson = (moduleId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      const newModules = [...modules];
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title: `Lesson ${newModules[moduleIndex].lessons.length + 1}`,
        type: 'video',
        content: '',
        duration: 300,
        order: newModules[moduleIndex].lessons.length + 1
      };
      newModules[moduleIndex].lessons.push(newLesson);
      setModules(newModules);
      toast.success("New lesson added");
    }
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, isExpanded: !module.isExpanded }
        : module
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/membership" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Membership
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold">Course Builder</h1>
                <p className="text-sm text-muted-foreground">Create and organize your course content</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Course Structure - Left Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Structure
              </CardTitle>
              <p className="text-sm text-muted-foreground">Drag and drop to reorder modules and lessons</p>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="modules" type="modules">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {modules.map((module, index) => (
                        <Draggable key={module.id} draggableId={module.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-muted rounded-lg overflow-hidden"
                            >
                              <div className="p-3">
                                <div {...provided.dragHandleProps} className="flex items-center space-x-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                  <div className="flex-1">
                                    <h4 className="font-medium">{module.title}</h4>
                                    <p className="text-sm text-muted-foreground">{module.lessons.length} lessons</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => toggleModuleExpansion(module.id)}
                                  >
                                    {module.isExpanded ? 
                                      <ChevronDown className="h-4 w-4" /> : 
                                      <ChevronRight className="h-4 w-4" />
                                    }
                                  </Button>
                                </div>
                                
                                {module.isExpanded && (
                                  <div className="mt-3">
                                    <Droppable droppableId={`module-${module.id}`} type="lessons">
                                      {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 pl-6">
                                          {module.lessons.map((lesson, lessonIndex) => (
                                            <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className="flex items-center space-x-2 bg-background p-2 rounded text-sm cursor-grab"
                                                >
                                                  {getContentIcon(lesson.type)}
                                                  <span className="flex-1">{lesson.title}</span>
                                                  <span className="text-xs text-muted-foreground">{formatDuration(lesson.duration)}</span>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))}
                                          {provided.placeholder}
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="w-full"
                                            onClick={() => addNewLesson(module.id)}
                                          >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Add Lesson
                                          </Button>
                                        </div>
                                      )}
                                    </Droppable>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={addNewModule}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Module
                      </Button>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          {/* Content Editor - Right Panel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Details & Content Editor</CardTitle>
              <p className="text-sm text-muted-foreground">Configure your course settings and content</p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Course Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="course-title">Course Title</Label>
                    <Input 
                      id="course-title" 
                      value={course.title}
                      onChange={(e) => setCourse({...course, title: e.target.value})}
                      placeholder="Enter course title" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="course-category">Category</Label>
                    <Select value={course.category} onValueChange={(value) => setCourse({...course, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="personal-development">Personal Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="course-description">Course Description</Label>
                  <Textarea 
                    id="course-description" 
                    value={course.description}
                    onChange={(e) => setCourse({...course, description: e.target.value})}
                    placeholder="Describe your course in detail..." 
                    className="min-h-[100px]" 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={course.difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setCourse({...course, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      value={course.price}
                      onChange={(e) => setCourse({...course, price: Number(e.target.value)})}
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="access-level">Required Access Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1 - Silver</SelectItem>
                        <SelectItem value="2">Level 2 - Gold</SelectItem>
                        <SelectItem value="3">Level 3 - VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Lesson Types */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Lesson Content Types</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <Video className="h-6 w-6 mb-2" />
                    <span className="text-sm">Video Lesson</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Text Content</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <HelpCircle className="h-6 w-6 mb-2" />
                    <span className="text-sm">Quiz</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-sm">Downloads</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Course Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Course Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-drip" />
                    <Label htmlFor="enable-drip">Enable content dripping</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-certificates" />
                    <Label htmlFor="enable-certificates">Issue completion certificates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-discussions" />
                    <Label htmlFor="enable-discussions">Enable lesson discussions</Label>
                  </div>
                </div>
              </div>

              {/* Course Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{course.category || 'Uncategorized'}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                    <h4 className="font-semibold">{course.title || 'Untitled Course'}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{modules.length} modules</span>
                      <span>{modules.reduce((total, module) => total + module.lessons.length, 0)} lessons</span>
                      <span className="capitalize">{course.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold">${course.price}</span>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">0 students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}