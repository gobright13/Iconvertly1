import { useState, useRef, useEffect } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  ArrowLeft,
  ArrowRight,
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
  DollarSign,
  Bot,
  Sparkles,
  Mic,
  Image,
  Globe,
  Award,
  Lock,
  Unlock,
  ExternalLink,
  Copy,
  Target,
  BarChart3,
  Calendar,
  Mail,
  Zap,
  Code,
  Link as LinkIcon,
  PenTool,
  Layers,
  CheckCircle,
  X,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";

// Enhanced interfaces
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maxStudents: number;
  enrolledStudents: number;
  isPublished: boolean;
  enrollmentOpen: boolean;
  autoEnrollment: boolean;
  manualEnrollment: boolean;
  author: string;
  estimatedDuration: string;
  rating: number;
  tags: string[];
  modules: Module[];
  courseImage: string;
  courseVideo: string;
  requirements: string[];
  outcomes: string[];
  targetAudience: string;
  status: string;
  language: string;
  certificate: boolean;
  forum: boolean;
  liveSupport: boolean;
  downloads: boolean;
  mobileAccess: boolean;
  dripContent: boolean;
  visibility: 'public' | 'private';
  schedule: boolean;
  featuredImage: string;
  introVideo: string;
  pricingModel: 'free' | 'paid';
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
  isLocked: boolean;
  dripSettings?: {
    unlockAfterDays?: number;
    unlockAfterCompletion?: string;
    unlockDate?: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'download' | 'live' | 'audio' | 'image' | 'link';
  content: string;
  duration: number;
  order: number;
  isLocked: boolean;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  htmlContent?: string;
  externalUrl?: string;
  description: string;
  thumbnail?: string;
  attachments?: string[];
  embedCode?: string;
  shortcode?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  pdfUrl?: string;
}

// AI Writing Pad Component
const AIWritingPad: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onContentGenerated: (content: string) => void;
}> = ({ isOpen, onClose, onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [contentType, setContentType] = useState<'lesson' | 'module' | 'description' | 'outline'>('lesson');

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI content generation based on type
    setTimeout(() => {
      let content = '';

      switch (contentType) {
        case 'outline':
          content = `# Course Outline: ${prompt}

## Module 1: Introduction and Fundamentals
- Understanding the basics
- Key concepts and terminology
- Setting up your environment
- First practical exercise

## Module 2: Core Principles
- Deep dive into methodology
- Best practices and frameworks
- Common pitfalls to avoid
- Hands-on project

## Module 3: Advanced Techniques
- Professional strategies
- Industry case studies
- Advanced tools and resources
- Capstone project

## Module 4: Implementation and Mastery
- Real-world applications
- Troubleshooting guide
- Optimization techniques
- Final assessment`;
          break;

        case 'lesson':
          content = `# ${prompt}

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the key concepts
- Apply practical techniques
- Solve common challenges
- Implement best practices

## Introduction
Welcome to this comprehensive lesson on ${prompt}. This lesson is designed to provide you with practical, actionable knowledge that you can immediately apply.

## Core Content
### Key Concept 1
Detailed explanation of the first major concept...

### Key Concept 2
In-depth coverage of the second important principle...

### Practical Application
Now let's put these concepts into practice with a hands-on example...

## Summary
In this lesson, we covered the essential elements of ${prompt}. The key takeaways include:
- Main point 1
- Main point 2
- Main point 3

## Next Steps
Continue to the next lesson where we'll build upon these concepts...`;
          break;

        case 'module':
          content = `# Module: ${prompt}

## Module Overview
This module provides comprehensive coverage of ${prompt}, designed to take you from foundational understanding to practical mastery.

## Learning Outcomes
- Master the fundamental principles
- Develop practical skills
- Apply knowledge to real scenarios
- Build confidence in implementation

## Module Structure
### Lesson 1: Introduction to ${prompt}
Basic concepts and foundational knowledge

### Lesson 2: Core Principles
Deep dive into methodology and best practices

### Lesson 3: Practical Application
Hands-on exercises and real-world examples

### Lesson 4: Advanced Techniques
Professional strategies and optimization

## Assessment
This module includes quizzes, practical exercises, and a final project to ensure mastery of the material.`;
          break;

        case 'description':
          content = `Transform your skills with this comprehensive course on ${prompt}. 

This expertly crafted program combines theoretical knowledge with practical application, ensuring you gain real-world expertise that you can implement immediately.

## What You'll Learn:
✅ Master the fundamentals and advanced techniques
✅ Gain hands-on experience through practical projects
✅ Learn industry best practices and proven strategies
✅ Develop professional-level skills and confidence

## Who This Course Is For:
- Beginners looking to build a solid foundation
- Professionals seeking to advance their skills
- Anyone wanting practical, actionable knowledge

## Course Features:
- High-quality video lessons
- Downloadable resources and templates
- Interactive quizzes and assignments
- Community forum access
- Certificate of completion
- Lifetime access and updates

Join thousands of successful students who have transformed their careers with this course!`;
          break;
      }

      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setPrompt("Create a comprehensive lesson about digital marketing strategies for beginners");
      setIsListening(false);
      toast.success("Voice input captured!");
    }, 3000);
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">AI Writing Assistant</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="space-y-2">
            <Label>Content Type</Label>
            <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lesson">Lesson Content</SelectItem>
                <SelectItem value="module">Module Overview</SelectItem>
                <SelectItem value="description">Course Description</SelectItem>
                <SelectItem value="outline">Course Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>What would you like to create?</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what content you want to generate..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={startVoiceInput}
              disabled={isListening}
              className="flex-1"
            >
              <Mic className={`h-4 w-4 mr-2 ${isListening ? 'text-red-500' : ''}`} />
              {isListening ? 'Listening...' : 'Voice Input'}
            </Button>
          </div>

          <Button
            onClick={generateContent}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="space-y-4">
              <Label>Generated Content</Label>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast.success("Content copied to clipboard!");
                  }}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => {
                    onContentGenerated(generatedContent);
                    toast.success("Content applied!");
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Use Content
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Advanced Content Editor Component
const AdvancedContentEditor: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  onSave: (lesson: Lesson) => void;
}> = ({ isOpen, onClose, lesson, onSave }) => {
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(lesson);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  if (!isOpen || !editingLesson) return null;

  const handleSave = () => {
    if (editingLesson) {
      onSave(editingLesson);
      onClose();
      toast.success("Lesson saved successfully!");
    }
  };

  const getContentFields = () => {
    switch (editingLesson.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>YouTube URL</Label>
                <Input
                  value={editingLesson.youtubeUrl || ''}
                  onChange={(e) => setEditingLesson({ ...editingLesson, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <Label>Vimeo URL</Label>
                <Input
                  value={editingLesson.vimeoUrl || ''}
                  onChange={(e) => setEditingLesson({ ...editingLesson, vimeoUrl: e.target.value })}
                  placeholder="https://vimeo.com/..."
                />
              </div>
            </div>
            <div>
              <Label>External Video URL</Label>
              <Input
                value={editingLesson.videoUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
                placeholder="Direct video file URL"
              />
            </div>
            <div>
              <Label>Embed Code</Label>
              <Textarea
                value={editingLesson.embedCode || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, embedCode: e.target.value })}
                placeholder="<iframe src=... or other embed code"
                rows={3}
              />
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-4">
            <div>
              <Label>Audio URL</Label>
              <Input
                value={editingLesson.audioUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, audioUrl: e.target.value })}
                placeholder="https://example.com/audio.mp3"
              />
            </div>
            <div>
              <Label>Embed Code</Label>
              <Textarea
                value={editingLesson.embedCode || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, embedCode: e.target.value })}
                placeholder="Audio player embed code"
                rows={3}
              />
            </div>
          </div>
        );

      case 'download':
        return (
          <div className="space-y-4">
            <div>
              <Label>PDF URL</Label>
              <Input
                value={editingLesson.pdfUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, pdfUrl: e.target.value })}
                placeholder="https://example.com/document.pdf"
              />
            </div>
            <div>
              <Label>Download URL</Label>
              <Input
                value={editingLesson.externalUrl || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, externalUrl: e.target.value })}
                placeholder="Direct download link"
              />
            </div>
          </div>
        );

      case 'link':
        return (
          <div>
            <Label>External Link</Label>
            <Input
              value={editingLesson.externalUrl || ''}
              onChange={(e) => setEditingLesson({ ...editingLesson, externalUrl: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        );

      case 'html':
        return (
          <div className="space-y-4">
            <div>
              <Label>HTML Content</Label>
              <Textarea
                value={editingLesson.htmlContent || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, htmlContent: e.target.value })}
                placeholder="<div>Your HTML content here...</div>"
                rows={8}
                className="font-mono"
              />
            </div>
            <div>
              <Label>Shortcode</Label>
              <Input
                value={editingLesson.shortcode || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, shortcode: e.target.value })}
                placeholder="[shortcode parameter='value']"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-500" />
              Advanced Content Editor
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(true)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </div>
          <DialogDescription>
            Edit lesson content with multiple media types and AI assistance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Lesson Title</Label>
                <Input
                  value={editingLesson.title}
                  onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                  placeholder="Enter lesson title"
                />
              </div>

              <div>
                <Label>Lesson Type</Label>
                <Select
                  value={editingLesson.type}
                  onValueChange={(value: Lesson['type']) => setEditingLesson({ ...editingLesson, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Lesson</SelectItem>
                    <SelectItem value="text">Text Content</SelectItem>
                    <SelectItem value="audio">Audio Content</SelectItem>
                    <SelectItem value="download">Downloadable File</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                    <SelectItem value="html">HTML/Embed</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={editingLesson.duration}
                  onChange={(e) => setEditingLesson({ ...editingLesson, duration: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload lesson thumbnail</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content type specific fields */}
          {getContentFields()}

          {/* Main content editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Lesson Content</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIAssistant(true)}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate with AI
              </Button>
            </div>
            <Textarea
              value={editingLesson.content}
              onChange={(e) => setEditingLesson({ ...editingLesson, content: e.target.value })}
              className="min-h-[200px]"
              placeholder="Enter lesson content, description, or instructions..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Lesson
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* AI Writing Assistant Sidebar */}
      <AIWritingPad
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onContentGenerated={(content) => {
          setEditingLesson({ ...editingLesson, content });
          setShowAIAssistant(false);
        }}
      />
    </Dialog>
  );
};

export default function CourseBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAIWritingPad, setShowAIWritingPad] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [isGeneratingCourse, setIsGeneratingCourse] = useState(false);

  const [course, setCourse] = useState<Course>({
    id: 'new-course',
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    category: '',
    difficulty: 'beginner',
    maxStudents: 0,
    enrolledStudents: 0,
    isPublished: false,
    enrollmentOpen: true,
    autoEnrollment: false,
    manualEnrollment: true,
    author: 'Course Creator',
    estimatedDuration: '',
    rating: 0,
    tags: [],
    modules: [],
    courseImage: '',
    courseVideo: '',
    requirements: [],
    outcomes: [],
    targetAudience: '',
    status: 'Draft',
    language: 'English',
    certificate: false,
    forum: false,
    liveSupport: false,
    downloads: false,
    mobileAccess: false,
    dripContent: false,
    visibility: 'public',
    schedule: false,
    featuredImage: '',
    introVideo: '',
    pricingModel: 'free'
  });

  const [modules, setModules] = useState<Module[]>([]);

  const [courses, setCourses] = useState([
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
  ]);

  // Load draft courses from localStorage
  useEffect(() => {
    const draftCourses = JSON.parse(localStorage.getItem('draftCourses') || '[]');
    const convertedDrafts = draftCourses.map((course: any) => ({
      id: parseInt(course.id) || Math.random(),
      title: course.title,
      description: course.description,
      status: course.status || 'draft',
      students: course.currentEnrollments || 0,
      modules: course.modules?.length || 0,
      lastUpdate: new Date(course.lastModified).toLocaleDateString(),
      progress: course.isPublished ? 100 : Math.floor(Math.random() * 80) + 10,
      price: course.price,
      enrollmentLimit: course.enrollmentLimit,
      currentEnrollments: course.currentEnrollments || 0,
      isLocked: false
    }));

    setCourses(prev => {
      const existingIds = prev.map(c => c.id);
      const newDrafts = convertedDrafts.filter((draft: any) => !existingIds.includes(draft.id));
      return [...prev, ...newDrafts];
    });
  }, []);

  // Step navigation functions
  const nextStep = () => {
    if (currentStep === 1) {
      if (!course.title.trim()) {
        toast.error("Please enter a course title");
        return;
      }
    }
    setCurrentStep(Math.min(currentStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  // AI Course Generation
  const generateCourseWithAI = async () => {
    if (!course.title || !course.description) {
      toast.error("Please provide course title and description first");
      return;
    }

    setIsGeneratingCourse(true);

    // Simulate AI course generation
    setTimeout(() => {
      const generatedModules: Module[] = [
        {
          id: 'module-1',
          title: 'Introduction and Fundamentals',
          description: 'Get started with the basic concepts and foundations',
          isExpanded: true,
          order: 1,
          isLocked: false,
          lessons: [
            {
              id: 'lesson-1-1',
              title: 'Welcome to the Course',
              type: 'video',
              content: 'Introduction video welcoming students to the course',
              duration: 5,
              order: 1,
              isLocked: false,
              description: 'Course overview and what to expect'
            },
            {
              id: 'lesson-1-2',
              title: 'Core Concepts',
              type: 'text',
              content: 'Detailed explanation of fundamental concepts',
              duration: 15,
              order: 2,
              isLocked: false,
              description: 'Understanding the basics'
            }
          ]
        },
        {
          id: 'module-2',
          title: 'Advanced Techniques',
          description: 'Deep dive into professional strategies and methods',
          isExpanded: false,
          order: 2,
          isLocked: false,
          lessons: [
            {
              id: 'lesson-2-1',
              title: 'Professional Strategies',
              type: 'video',
              content: 'Advanced strategies used by professionals',
              duration: 20,
              order: 1,
              isLocked: false,
              description: 'Learn from industry experts'
            },
            {
              id: 'lesson-2-2',
              title: 'Practical Exercise',
              type: 'assignment',
              content: 'Hands-on assignment to practice new skills',
              duration: 30,
              order: 2,
              isLocked: false,
              description: 'Apply what you\'ve learned'
            }
          ]
        }
      ];

      setModules(generatedModules);
      setCourse(prev => ({ ...prev, modules: generatedModules }));
      setIsGeneratingCourse(false);
      toast.success("AI generated course structure successfully!");
      setCurrentStep(2); // Move to curriculum step
    }, 3000);
  };

  // Module and lesson management
  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `Module ${modules.length + 1}`,
      description: 'New module description',
      lessons: [],
      isExpanded: true,
      order: modules.length + 1,
      isLocked: false
    };
    setModules([...modules, newModule]);
    toast.success("Module added successfully!");
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, ...updates } : module
    ));
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
    toast.success("Module deleted successfully!");
  };

  const addLesson = (moduleId: string, type: Lesson['type'] = 'text') => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      type,
      content: '',
      duration: 10,
      order: modules[moduleIndex].lessons.length + 1,
      isLocked: false,
      description: 'Lesson description'
    };

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push(newLesson);
    setModules(updatedModules);
    toast.success("Lesson added successfully!");
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
        ? {
            ...module,
            lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
          }
        : module
    ));
    toast.success("Lesson deleted successfully!");
  };

  const handleEditContent = (moduleId: string, lesson: Lesson) => {
    setSelectedModuleId(moduleId);
    setSelectedLesson(lesson);
    setShowContentEditor(true);
  };

  // Course actions
  const saveDraft = () => {
    toast.success("Course saved as draft!");
  };

  const previewCourse = () => {
    toast.success("Opening course preview...");
  };

  const publishCourse = () => {
    if (!course.title || !course.description || modules.length === 0) {
      toast.error("Please complete course details and add content before publishing");
      return;
    }
    toast.success("Course published successfully!");
    setCourse(prev => ({ ...prev, isPublished: true, status: 'Published' }));
  };

  // Helper functions
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'assignment': return <Edit className="h-4 w-4" />;
      case 'live': return <Video className="h-4 w-4" />;
      case 'html': return <Code className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'text': return 'bg-blue-100 text-blue-700';
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'quiz': return 'bg-yellow-100 text-yellow-700';
      case 'assignment': return 'bg-green-100 text-green-700';
      case 'download': return 'bg-indigo-100 text-indigo-700';
      case 'html': return 'bg-orange-100 text-orange-700';
      case 'link': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Professional Course Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create, manage and publish your online courses
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={saveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={previewCourse}>
                <Eye className="h-4 w-4 mr-2" />
                Preview Course
              </Button>
              <Button onClick={publishCourse} className="bg-green-500 hover:bg-green-600 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Publish Course
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Basics' : step === 2 ? 'Curriculum' : 'Additional'}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 text-center">
              <Progress value={(currentStep / 3) * 100} className="w-96 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step 1: Basics */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-500" />
                Course Basics
              </CardTitle>
              <p className="text-muted-foreground">
                Set up your course foundation with essential details
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="course-title">Course Title *</Label>
                    <Input 
                      id="course-title" 
                      value={course.title}
                      onChange={(e) => setCourse({...course, title: e.target.value})}
                      placeholder="Enter your course title" 
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="course-description">Course Description *</Label>
                    <div className="flex items-center justify-between mt-1">
                      <span></span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAIWritingPad(true)}
                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                      >
                        <Bot className="h-4 w-4 mr-2" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea 
                      id="course-description" 
                      value={course.description}
                      onChange={(e) => setCourse({...course, description: e.target.value})}
                      placeholder="Describe what students will learn in this course..." 
                      className="min-h-[120px] mt-2" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Course Category</Label>
                      <Select value={course.category} onValueChange={(value) => setCourse({...course, category: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing & Sales</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="personal">Personal Development</SelectItem>
                          <SelectItem value="health">Health & Fitness</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Difficulty Level</Label>
                      <Select value={course.difficulty} onValueChange={(value: Course['difficulty']) => setCourse({...course, difficulty: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Course Language</Label>
                      <Select value={course.language} onValueChange={(value) => setCourse({...course, language: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Portuguese">Portuguese</SelectItem>
                          <SelectItem value="Italian">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Estimated Duration</Label>
                      <Input 
                        value={course.estimatedDuration}
                        onChange={(e) => setCourse({...course, estimatedDuration: e.target.value})}
                        placeholder="e.g., 4 weeks, 10 hours" 
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Featured Image</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Upload course thumbnail</p>
                      <p className="text-xs text-gray-500 mb-4">JPEG, PNG, GIF, and WebP formats, up to 2 GB</p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Thumbnail
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Intro Video</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Upload Video</p>
                      <p className="text-xs text-gray-500 mb-4">MP4 and WebM formats, up to 2 GB</p>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Input 
                          placeholder="Or paste video URL (YouTube, Vimeo)"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pricing Model</h3>
                <RadioGroup
                  value={course.pricingModel}
                  onValueChange={(value: Course['pricingModel']) => setCourse({...course, pricingModel: value})}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free">Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="paid" />
                    <Label htmlFor="paid">Paid</Label>
                  </div>
                </RadioGroup>

                {course.pricingModel === 'paid' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Course Price ($)</Label>
                      <Input 
                        type="number" 
                        value={course.price}
                        onChange={(e) => setCourse({...course, price: Number(e.target.value)})}
                        placeholder="0" 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Enrollment Limit</Label>
                      <Input 
                        type="number" 
                        value={course.maxStudents}
                        onChange={(e) => setCourse({...course, maxStudents: Number(e.target.value)})}
                        placeholder="0 (unlimited)" 
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-6">
                <Button
                  onClick={generateCourseWithAI}
                  disabled={isGeneratingCourse}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isGeneratingCourse ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating Course...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Course with AI
                    </>
                  )}
                </Button>
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Next: Build Curriculum
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Curriculum */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-6 w-6 text-blue-500" />
                    Course Curriculum
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Build your course structure with modules and lessons
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAIWritingPad(true)}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    AI Assistant
                  </Button>
                  <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {modules.length === 0 ? (
                <div className="text-center py-12">
                  <Layers className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
                  <p className="text-gray-600 mb-6">Start building your course by adding your first module</p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Module
                    </Button>
                    <Button
                      variant="outline"
                      onClick={generateCourseWithAI}
                      disabled={isGeneratingCourse}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                    >
                      {isGeneratingCourse ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="modules" type="modules">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {modules.map((module, index) => (
                          <ModuleItem
                            key={module.id}
                            module={module}
                            moduleIndex={index}
                            onUpdateModule={updateModule}
                            onDeleteModule={deleteModule}
                            onAddLesson={addLesson}
                            onUpdateLesson={updateLesson}
                            onDeleteLesson={deleteLesson}
                            onEditContent={handleEditContent}
                            getContentIcon={getContentIcon}
                            getTypeColor={getTypeColor}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}

              <div className="flex justify-between items-center pt-6">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Basics
                </Button>
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Next: Additional Settings
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Additional Settings */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-blue-500" />
                Additional Settings
              </CardTitle>
              <p className="text-muted-foreground">
                Configure advanced course features and publication settings
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Course Features</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Certificate</Label>
                          <p className="text-sm text-gray-600">Award completion certificate</p>
                        </div>
                        <Switch 
                          checked={course.certificate}
                          onCheckedChange={(checked) => setCourse({...course, certificate: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Drip Content</Label>
                          <p className="text-sm text-gray-600">Release content gradually</p>
                        </div>
                        <Switch 
                          checked={course.dripContent}
                          onCheckedChange={(checked) => setCourse({...course, dripContent: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Forum Access</Label>
                          <p className="text-sm text-gray-600">Student discussion forum</p>
                        </div>
                        <Switch 
                          checked={course.forum}
                          onCheckedChange={(checked) => setCourse({...course, forum: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Live Support</Label>
                          <p className="text-sm text-gray-600">Real-time instructor help</p>
                        </div>
                        <Switch 
                          checked={course.liveSupport}
                          onCheckedChange={(checked) => setCourse({...course, liveSupport: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Downloads</Label>
                          <p className="text-sm text-gray-600">Downloadable resources</p>
                        </div>
                        <Switch 
                          checked={course.downloads}
                          onCheckedChange={(checked) => setCourse({...course, downloads: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Mobile Access</Label>
                          <p className="text-sm text-gray-600">Mobile app support</p>
                        </div>
                        <Switch 
                          checked={course.mobileAccess}
                          onCheckedChange={(checked) => setCourse({...course, mobileAccess: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Enrollment Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>Visibility</Label>
                        <Select value={course.visibility} onValueChange={(value: Course['visibility']) => setCourse({...course, visibility: value})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enrollment Open</Label>
                          <p className="text-sm text-gray-600">Accept new students</p>
                        </div>
                        <Switch 
                          checked={course.enrollmentOpen}
                          onCheckedChange={(checked) => setCourse({...course, enrollmentOpen: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Schedule</Label>
                          <p className="text-sm text-gray-600">Set publication date</p>
                        </div>
                        <Switch 
                          checked={course.schedule}
                          onCheckedChange={(checked) => setCourse({...course, schedule: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Course Tags</h4>
                    <Input 
                      placeholder="Add tags separated by commas"
                      value={course.tags.join(', ')}
                      onChange={(e) => setCourse({...course, tags: e.target.value.split(',').map(tag => tag.trim())})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Course Requirements</h4>
                <Textarea 
                  placeholder="List any prerequisites or requirements for students (one per line)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Learning Outcomes</h4>
                <Textarea 
                  placeholder="Describe what students will learn and be able to do (one outcome per line)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-between items-center pt-6">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Curriculum
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={saveDraft}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={publishCourse} className="bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Course
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Writing Pad */}
      <AIWritingPad
        isOpen={showAIWritingPad}
        onClose={() => setShowAIWritingPad(false)}
        onContentGenerated={(content) => {
          setCourse({...course, description: content});
          setShowAIWritingPad(false);
        }}
      />

      {/* Advanced Content Editor */}
      <AdvancedContentEditor
        isOpen={showContentEditor}
        onClose={() => setShowContentEditor(false)}
        lesson={selectedLesson}
        onSave={(lesson) => {
          if (selectedModuleId && selectedLesson) {
            updateLesson(selectedModuleId, selectedLesson.id, lesson);
          }
        }}
      />
    </div>
  );
}

// Module Item Component
interface ModuleItemProps {
  module: Module;
  moduleIndex: number;
  onUpdateModule: (moduleId: string, updates: Partial<Module>) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string, type?: Lesson['type']) => void;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getContentIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

function ModuleItem({
  module,
  moduleIndex,
  onUpdateModule,
  onDeleteModule,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onEditContent,
  getContentIcon,
  getTypeColor
}: ModuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(module.title);
  const [editDescription, setEditDescription] = useState(module.description);

  const handleSave = () => {
    onUpdateModule(module.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(module.title);
    setEditDescription(module.description);
    setIsEditing(false);
  };

  const totalDuration = module.lessons.reduce((total, lesson) => total + lesson.duration, 0);

  return (
    <Draggable draggableId={module.id} index={moduleIndex}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded">
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
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
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
              <CardContent className="pt-4">
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
                    <Edit className="h-3 w-3 mr-1" />
                    Assignment
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'html')}>
                    <Code className="h-3 w-3 mr-1" />
                    HTML
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onAddLesson(module.id, 'link')}>
                    <LinkIcon className="h-3 w-3 mr-1" />
                    Link
                  </Button>
                </div>

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
                        getContentIcon={getContentIcon}
                        getTypeColor={getTypeColor}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
}

// Lesson Item Component
interface LessonItemProps {
  lesson: Lesson;
  lessonIndex: number;
  moduleId: string;
  onUpdateLesson: (moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
  onEditContent: (moduleId: string, lesson: Lesson) => void;
  getContentIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

function LessonItem({
  lesson,
  lessonIndex,
  moduleId,
  onUpdateLesson,
  onDeleteLesson,
  onEditContent,
  getContentIcon,
  getTypeColor
}: LessonItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lesson.title);
  const [editDuration, setEditDuration] = useState(lesson.duration.toString());

  const handleSave = () => {
    onUpdateLesson(moduleId, lesson.id, {
      title: editTitle,
      duration: parseInt(editDuration) || 0
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(lesson.title);
    setEditDuration(lesson.duration.toString());
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded">
          <GripVertical className="h-3 w-3 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2">
          {getContentIcon(lesson.type)}
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
                className="flex-1 h-8"
              />
              <Input
                type="number"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
                className="w-20 h-8"
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
                <Clock className="h-3 w-3 inline mr-1" />
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
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-3 w-3" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <CheckCircle className="h-3 w-3" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEditContent(moduleId, lesson)}
              title="Edit Content"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onUpdateLesson(moduleId, lesson.id, { isLocked: !lesson.isLocked })}
              title={lesson.isLocked ? "Unlock" : "Lock"}
            >
              {lesson.isLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} title="Edit Title">
              <PenTool className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeleteLesson(moduleId, lesson.id)}
              className="text-red-600 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}