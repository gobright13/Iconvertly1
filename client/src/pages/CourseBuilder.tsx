import { useState, useRef } from "react";
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
  Mail
} from "lucide-react";

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

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'download' | 'live' | 'audio' | 'image';
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
}

// AI Content Writing Pad Component
const AIWritingPad: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onContentGenerated: (content: string) => void;
}> = ({ isOpen, onClose, onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      const content = `# ${prompt}

This is AI-generated content based on your prompt: "${prompt}"

## Overview
This comprehensive guide will help you understand the key concepts and practical applications.

## Key Points
- Detailed explanation of core principles
- Step-by-step implementation guide
- Best practices and expert tips
- Common pitfalls to avoid
- Real-world examples and case studies

## Practical Applications
Learn how to apply these concepts in real-world scenarios with hands-on exercises and examples.

## Conclusion
By mastering these concepts, you'll be equipped with the knowledge and skills needed to excel in this area.`;
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setPrompt("Create a comprehensive lesson about digital marketing strategies for beginners");
      setIsListening(false);
      toast.success("Voice input captured!");
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            AI Content Writing Pad
          </DialogTitle>
          <DialogDescription>
            Generate course content using AI voice or text prompts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Content Prompt</Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what content you want to generate..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={startVoiceInput}
                disabled={isListening}
                className="flex items-center gap-2"
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                {isListening ? 'Listening...' : 'Voice Input'}
              </Button>
              
              <Button
                onClick={generateContent}
                disabled={isGenerating || !prompt.trim()}
                className="bg-blue-600 hover:bg-blue-700"
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
            </div>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="space-y-4">
              <Label>Generated Content</Label>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast.success("Content copied to clipboard!");
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => {
                    onContentGenerated(generatedContent);
                    onClose();
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Use This Content
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function CourseBuilder() {
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Course Details, Step 2: Content Builder
  const [showAIWritingPad, setShowAIWritingPad] = useState(false);
  
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
    targetAudience: ''
  });

  const [modules, setModules] = useState<Module[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      case 'html': return <Globe className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const proceedToBuilder = () => {
    if (!course.title.trim()) {
      toast.error("Please enter a course title");
      return;
    }
    if (!course.description.trim()) {
      toast.error("Please enter a course description");
      return;
    }
    if (!course.category) {
      toast.error("Please select a course category");
      return;
    }
    
    setCurrentStep(2);
    toast.success("Course details saved! Now build your content.");
  };

  if (currentStep === 1) {
    // STEP 1: Course Details & Content Editor
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-50 to-navy-50 dark:from-gray-900 dark:to-gray-800">
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
                    Course Details & Setup
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Configure your course settings and information
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={proceedToBuilder}
                  className="bg-coral-500 hover:bg-coral-600 text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 rotate-180" />
                  Continue to Builder
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Course Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-coral-500" />
                  Course Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">Enter your course details and settings</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="course-title">Course Title *</Label>
                    <Input 
                      id="course-title" 
                      value={course.title}
                      onChange={(e) => setCourse({...course, title: e.target.value})}
                      placeholder="Enter your course title" 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="course-description">Course Description *</Label>
                    <Textarea 
                      id="course-description" 
                      value={course.description}
                      onChange={(e) => setCourse({...course, description: e.target.value})}
                      placeholder="Describe your course in detail..." 
                      className="min-h-[120px] mt-1" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={course.category} onValueChange={(value) => setCourse({...course, category: value})}>
                        <SelectTrigger className="mt-1">
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
                    <div>
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select value={course.difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setCourse({...course, difficulty: value})}>
                        <SelectTrigger className="mt-1">
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
                </div>

                <Separator />

                {/* Pricing & Enrollment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pricing & Enrollment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={course.price}
                        onChange={(e) => setCourse({...course, price: Number(e.target.value)})}
                        placeholder="0" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-students">Max Students (0 = unlimited)</Label>
                      <Input 
                        id="max-students" 
                        type="number" 
                        value={course.maxStudents}
                        onChange={(e) => setCourse({...course, maxStudents: Number(e.target.value)})}
                        placeholder="0" 
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enrollment-open" 
                        checked={course.enrollmentOpen}
                        onCheckedChange={(checked) => setCourse({...course, enrollmentOpen: checked})}
                      />
                      <Label htmlFor="enrollment-open">Open for enrollment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="auto-enrollment" 
                        checked={course.autoEnrollment}
                        onCheckedChange={(checked) => setCourse({...course, autoEnrollment: checked})}
                      />
                      <Label htmlFor="auto-enrollment">Auto-enrollment after purchase</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Course Media */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Media</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Course Thumbnail</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Upload course thumbnail image</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Course Preview Video</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Upload course preview video</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Course Requirements & Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-navy-500" />
                  Course Structure & Goals
                </CardTitle>
                <p className="text-sm text-muted-foreground">Define what students will learn and need</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Learning Outcomes */}
                <div>
                  <Label htmlFor="outcomes">Learning Outcomes</Label>
                  <Textarea 
                    id="outcomes" 
                    placeholder="What will students learn? (One outcome per line)" 
                    className="min-h-[100px] mt-1" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: Students will be able to create effective marketing campaigns
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <Label htmlFor="requirements">Prerequisites & Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="What do students need before taking this course? (One requirement per line)" 
                    className="min-h-[100px] mt-1" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: Basic understanding of digital marketing concepts
                  </p>
                </div>

                {/* Target Audience */}
                <div>
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Textarea 
                    id="target-audience" 
                    value={course.targetAudience}
                    onChange={(e) => setCourse({...course, targetAudience: e.target.value})}
                    placeholder="Who is this course designed for?" 
                    className="min-h-[80px] mt-1" 
                  />
                </div>

                {/* Estimated Duration */}
                <div>
                  <Label htmlFor="duration">Estimated Course Duration</Label>
                  <Input 
                    id="duration" 
                    value={course.estimatedDuration}
                    onChange={(e) => setCourse({...course, estimatedDuration: e.target.value})}
                    placeholder="e.g., 4 weeks, 10 hours" 
                    className="mt-1"
                  />
                </div>

                <Separator />

                {/* Course Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Preview</h3>
                  <Card className="bg-gradient-to-r from-coral-50 to-navy-50 dark:from-gray-800 dark:to-gray-700">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-r from-coral-500 to-navy-500 rounded-lg flex items-center justify-center mb-4">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{course.category || 'Uncategorized'}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">New Course</span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {course.title || 'Untitled Course'}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description || 'No description provided.'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="capitalize">{course.difficulty}</span>
                          <span>{course.estimatedDuration || 'Duration TBD'}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-coral-600 dark:text-coral-400">
                            ${course.price}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">{course.enrolledStudents} students</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={proceedToBuilder}
              size="lg"
              className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2 rotate-180" />
              Continue to Course Builder
            </Button>
          </div>
        </div>

        {/* AI Writing Pad */}
        <AIWritingPad
          isOpen={showAIWritingPad}
          onClose={() => setShowAIWritingPad(false)}
          onContentGenerated={(content) => {
            setCourse({...course, description: content});
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-navy-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(1)}
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Details
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Content Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create and organize your course content with drag-and-drop
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => setShowAIWritingPad(true)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Writing Pad
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-coral-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Start Building Your Course Content
          </h2>
          <p className="text-muted-foreground mb-6">
            Use the drag-and-drop interface to create modules and lessons
          </p>
          <Button
            onClick={() => {
              const newModule: Module = {
                id: `module-${Date.now()}`,
                title: 'Module 1',
                description: 'Introduction to the course',
                lessons: [],
                isExpanded: true,
                order: 1,
                isLocked: false
              };
              setModules([newModule]);
              toast.success("First module created! Start adding lessons.");
            }}
            className="bg-coral-500 hover:bg-coral-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Module
          </Button>
        </div>
      </div>

      {/* AI Writing Pad */}
      <AIWritingPad
        isOpen={showAIWritingPad}
        onClose={() => setShowAIWritingPad(false)}
        onContentGenerated={(content) => {
          if (selectedLesson) {
            const updatedLesson = { ...selectedLesson, content };
            // Save lesson logic would go here
          }
        }}
      />
    </div>
  );
}