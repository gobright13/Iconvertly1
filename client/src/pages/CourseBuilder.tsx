
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { 
  Plus, 
  BookOpen,
  Zap,
  ArrowLeft,
  Save,
  Eye,
  Settings,
  Upload,
  Video,
  FileText,
  HelpCircle,
  ExternalLink,
  Code,
  Link,
  Clock,
  Users,
  DollarSign,
  Star,
  Lock,
  Unlock,
  GripVertical,
  Edit,
  Trash2,
  Bot,
  Sparkles,
  Copy,
  Download,
  Play,
  Award,
  Target,
  Globe,
  Share2,
  Mail,
  Calendar,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  X,
  Image as ImageIcon,
  Mic,
  PenTool,
  Layers,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Enhanced Types
interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'link' | 'audio' | 'pdf' | 'scorm' | 'interactive';
  content: string;
  duration: number;
  isLocked: boolean;
  videoUrl?: string;
  htmlContent?: string;
  externalUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  description: string;
  order: number;
  prerequisites: string[];
  learningObjectives: string[];
  resources: Resource[];
  quizQuestions?: QuizQuestion[];
  assignments?: Assignment[];
  isPreview: boolean;
  estimatedCompletionTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

interface Resource {
  id: string;
  type: 'file' | 'link' | 'document';
  title: string;
  url: string;
  description: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: Date;
  maxScore: number;
  submissionType: 'file' | 'text' | 'link';
  rubric?: RubricCriteria[];
}

interface RubricCriteria {
  id: string;
  criteria: string;
  maxPoints: number;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
  order: number;
  isLocked: boolean;
  estimatedDuration: number;
  learningObjectives: string[];
  prerequisites: string[];
  completionCriteria: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  thumbnail: string;
  promoVideo?: string;
  authorName: string;
  authorBio: string;
  authorAvatar?: string;
  enrollmentLimit: number;
  enrollmentType: 'manual' | 'automatic';
  isPublished: boolean;
  enrollmentOpen: boolean;
  currentEnrollments: number;
  modules: Module[];
  createdAt: Date;
  lastModified: Date;
  category: string;
  subcategory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  tags: string[];
  learningObjectives: string[];
  requirements: string[];
  targetAudience: string[];
  courseOutcome: string[];
  certificate: boolean;
  certificateTemplate?: string;
  drip: boolean;
  dripSchedule?: DripSchedule[];
  forum: boolean;
  liveSupport: boolean;
  downloadableResources: boolean;
  mobileAccess: boolean;
  lifeTimeAccess: boolean;
  salesPageContent: SalesPageContent;
  seo: SEOSettings;
  pricing: PricingSettings;
  analytics: CourseAnalytics;
}

interface DripSchedule {
  moduleId: string;
  releaseDate: Date;
  condition: 'date' | 'previous-completion';
}

interface SalesPageContent {
  headline: string;
  subheadline: string;
  heroImage?: string;
  features: string[];
  benefits: string[];
  testimonials: Testimonial[];
  faq: FAQ[];
  guarantee: string;
  bonuses: Bonus[];
  countdown?: CountdownSettings;
  socialProof: SocialProof;
}

interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  content: string;
  rating: number;
  featured: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface Bonus {
  id: string;
  title: string;
  description: string;
  value: number;
  image?: string;
}

interface CountdownSettings {
  endDate: Date;
  urgencyText: string;
  expiredText: string;
}

interface SocialProof {
  totalStudents: number;
  averageRating: number;
  completionRate: number;
  successStories: number;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

interface PricingSettings {
  regularPrice: number;
  salePrice?: number;
  saleEndDate?: Date;
  paymentPlans: PaymentPlan[];
  coupons: Coupon[];
}

interface PaymentPlan {
  id: string;
  name: string;
  installments: number;
  installmentAmount: number;
  interval: 'weekly' | 'monthly';
}

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate?: Date;
  usageLimit?: number;
  usedCount: number;
}

interface CourseAnalytics {
  totalViews: number;
  conversionRate: number;
  averageRating: number;
  completionRate: number;
  refundRate: number;
  totalRevenue: number;
}

// AI Content Editor Component
const AIContentEditor: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  onSave: (lesson: Lesson) => void;
}> = ({ isOpen, onClose, lesson, onSave }) => {
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(lesson);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedAITool, setSelectedAITool] = useState('content');

  const handleSave = () => {
    if (editingLesson) {
      onSave(editingLesson);
      toast.success("Lesson content saved successfully!");
      onClose();
    }
  };

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt for AI generation");
      return;
    }

    setAiGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      if (editingLesson) {
        let generatedContent = '';
        
        switch (selectedAITool) {
          case 'content':
            generatedContent = `# ${editingLesson.title}\n\n## Overview\n${aiPrompt}\n\n## Key Learning Points\n\n1. **Understanding the Fundamentals**\n   - Core concepts and principles\n   - Real-world applications\n   - Common misconceptions\n\n2. **Practical Implementation**\n   - Step-by-step process\n   - Best practices\n   - Tools and resources\n\n3. **Advanced Techniques**\n   - Expert strategies\n   - Optimization methods\n   - Troubleshooting guide\n\n## Summary\n\nBy the end of this lesson, you will have a comprehensive understanding of ${editingLesson.title.toLowerCase()} and be able to apply these concepts effectively in your own projects.\n\n## Action Items\n\n- [ ] Complete the practice exercise\n- [ ] Review additional resources\n- [ ] Apply concepts to your project\n\n---\n\n*Generated with AI based on: "${aiPrompt}"*`;
            break;
          case 'quiz':
            generatedContent = JSON.stringify([
              {
                id: '1',
                question: `What is the main concept covered in ${editingLesson.title}?`,
                type: 'multiple-choice',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
                explanation: 'This is the correct answer because...',
                points: 10
              },
              {
                id: '2',
                question: `True or False: The principles taught in ${editingLesson.title} can be applied immediately.`,
                type: 'true-false',
                correctAnswer: 'true',
                explanation: 'This is true because...',
                points: 5
              }
            ], null, 2);
            break;
          case 'objectives':
            const objectives = [
              `Understand the core principles of ${editingLesson.title.toLowerCase()}`,
              `Apply practical techniques in real-world scenarios`,
              `Identify common pitfalls and how to avoid them`,
              `Develop mastery through hands-on practice`
            ];
            setEditingLesson(prev => prev ? { ...prev, learningObjectives: objectives } : null);
            toast.success("Learning objectives generated!");
            setAiGenerating(false);
            return;
        }
        
        setEditingLesson(prev => prev ? {
          ...prev,
          content: generatedContent,
          htmlContent: editingLesson.type === 'html' ? generatedContent : prev.htmlContent
        } : null);
      }
      setAiGenerating(false);
      toast.success("AI content generated successfully!");
    }, 2000);
  };

  if (!isOpen || !editingLesson) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-2xl z-50 border-l transform transition-transform duration-300 ease-in-out flex flex-col">
      {/* Header */}
      <div className="border-b p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Content Studio</h2>
            <p className="text-gray-600">Editing: {editingLesson.title}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="border-b p-4 bg-purple-50">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">AI Generation Tools</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Button
            variant={selectedAITool === 'content' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('content')}
          >
            <FileText className="w-3 h-3 mr-1" />
            Content
          </Button>
          <Button
            variant={selectedAITool === 'quiz' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('quiz')}
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Quiz
          </Button>
          <Button
            variant={selectedAITool === 'objectives' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('objectives')}
          >
            <Target className="w-3 h-3 mr-1" />
            Objectives
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Describe what you want the AI to generate..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1"
          />
          <Button onClick={generateAIContent} disabled={aiGenerating}>
            {aiGenerating ? (
              <>
                <Bot className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Lesson Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Lesson Title</Label>
            <Input
              value={editingLesson.title}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, title: e.target.value } : null)}
            />
          </div>
          <div>
            <Label>Lesson Type</Label>
            <Select
              value={editingLesson.type}
              onValueChange={(value: any) => setEditingLesson(prev => prev ? { ...prev, type: value } : null)}
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
                    <Code className="w-4 h-4" />
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
                <SelectItem value="audio">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Audio Lesson
                  </div>
                </SelectItem>
                <SelectItem value="interactive">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Interactive Content
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              value={editingLesson.duration}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, duration: parseInt(e.target.value) || 0 } : null)}
            />
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select
              value={editingLesson.difficulty}
              onValueChange={(value: any) => setEditingLesson(prev => prev ? { ...prev, difficulty: value } : null)}
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
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Locked</Label>
              <p className="text-xs text-gray-600">Require prerequisites</p>
            </div>
            <Switch
              checked={editingLesson.isLocked}
              onCheckedChange={(checked) => setEditingLesson(prev => prev ? { ...prev, isLocked: checked } : null)}
            />
          </div>
        </div>

        {/* Media URLs based on type */}
        {editingLesson.type === 'video' && (
          <div>
            <Label>Video URL</Label>
            <Input
              placeholder="YouTube, Vimeo, or direct video URL"
              value={editingLesson.videoUrl || ''}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, videoUrl: e.target.value } : null)}
            />
          </div>
        )}

        {editingLesson.type === 'audio' && (
          <div>
            <Label>Audio URL</Label>
            <Input
              placeholder="Direct audio file URL or podcast link"
              value={editingLesson.audioUrl || ''}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, audioUrl: e.target.value } : null)}
            />
          </div>
        )}

        {editingLesson.type === 'link' && (
          <div>
            <Label>External URL</Label>
            <Input
              placeholder="https://example.com"
              value={editingLesson.externalUrl || ''}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, externalUrl: e.target.value } : null)}
            />
          </div>
        )}

        <div>
          <Label>Description</Label>
          <Textarea
            placeholder="Brief description of this lesson"
            value={editingLesson.description}
            onChange={(e) => setEditingLesson(prev => prev ? { ...prev, description: e.target.value } : null)}
            rows={3}
          />
        </div>

        {/* Learning Objectives */}
        <div>
          <Label>Learning Objectives</Label>
          <div className="space-y-2">
            {editingLesson.learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => {
                    const newObjectives = [...editingLesson.learningObjectives];
                    newObjectives[index] = e.target.value;
                    setEditingLesson(prev => prev ? { ...prev, learningObjectives: newObjectives } : null);
                  }}
                  placeholder={`Learning objective ${index + 1}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newObjectives = editingLesson.learningObjectives.filter((_, i) => i !== index);
                    setEditingLesson(prev => prev ? { ...prev, learningObjectives: newObjectives } : null);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newObjectives = [...editingLesson.learningObjectives, ''];
                setEditingLesson(prev => prev ? { ...prev, learningObjectives: newObjectives } : null);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Objective
            </Button>
          </div>
        </div>

        {/* Main Content Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Lesson Content</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>

          {editingLesson.type === 'html' ? (
            <Textarea
              className="font-mono text-sm min-h-[500px]"
              placeholder="Enter your HTML content here..."
              value={editingLesson.htmlContent || ''}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, htmlContent: e.target.value } : null)}
            />
          ) : (
            <Textarea
              className="min-h-[500px]"
              placeholder="Enter your lesson content here... Use the AI Generate button above for instant content creation."
              value={editingLesson.content}
              onChange={(e) => setEditingLesson(prev => prev ? { ...prev, content: e.target.value } : null)}
            />
          )}
        </div>

        {/* Advanced AI Tools Panel */}
        <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Advanced AI Tools
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Enhance Content
            </Button>
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Generate Quiz
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Learning Path
            </Button>
            <Button variant="outline" size="sm">
              <PenTool className="w-4 h-4 mr-2" />
              Assignment Ideas
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Study Guide
            </Button>
            <Button variant="outline" size="sm">
              <Award className="w-4 h-4 mr-2" />
              Certificates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sales Page Preview Component
const SalesPagePreview: React.FC<{
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}> = ({ course, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sales Page Preview</DialogTitle>
          <DialogDescription>
            Preview how your course sales page will look to potential customers
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
            <h1 className="text-4xl font-bold">{course.salesPageContent.headline || course.title}</h1>
            <p className="text-xl text-blue-100">{course.salesPageContent.subheadline || course.description}</p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="text-3xl font-bold">${course.price}</div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
              <div className="text-gray-600">Modules</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)}
              </div>
              <div className="text-gray-600">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{course.currentEnrollments}</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.8★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Course Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-500" />
                  <span>HD Video Content</span>
                </li>
                <li className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-500" />
                  <span>Downloadable Resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span>Certificate of Completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Lifetime Access</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Course Curriculum Preview */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Course Curriculum</h3>
            <div className="space-y-3">
              {course.modules.slice(0, 3).map((module, index) => (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Module {index + 1}: {module.title}</h4>
                    <Badge variant="outline">{module.lessons.length} lessons</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
              ))}
              {course.modules.length > 3 && (
                <div className="text-center py-4">
                  <Badge variant="secondary">
                    +{course.modules.length - 3} more modules
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Instructor Info */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-2xl font-bold mb-4">Your Instructor</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {course.authorName.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{course.authorName}</h4>
                <p className="text-gray-600">{course.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-600 mb-6">Join {course.currentEnrollments} students already enrolled</p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="w-5 h-5 mr-2" />
              Enroll Now for ${course.price}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function CourseBuilder() {
  const [course, setCourse] = useState<Course>({
    id: '1',
    title: 'Complete Digital Marketing Course',
    description: 'Master digital marketing from basics to advanced strategies with hands-on projects and real-world applications.',
    shortDescription: 'Learn digital marketing that actually works',
    price: 297,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    promoVideo: '',
    authorName: 'John Smith',
    authorBio: 'Digital Marketing Expert with 10+ years of experience helping businesses grow online',
    authorAvatar: '',
    enrollmentLimit: 500,
    enrollmentType: 'automatic',
    isPublished: false,
    enrollmentOpen: true,
    currentEnrollments: 127,
    createdAt: new Date(),
    lastModified: new Date(),
    category: 'Marketing',
    subcategory: 'Digital Marketing',
    difficulty: 'intermediate',
    language: 'English',
    tags: ['Marketing', 'Digital', 'Strategy', 'Growth'],
    learningObjectives: [
      'Master advanced digital marketing strategies',
      'Create high-converting sales funnels',
      'Optimize campaigns for maximum ROI',
      'Build a sustainable marketing system'
    ],
    requirements: ['Basic computer skills', 'Internet connection', 'Willingness to learn'],
    targetAudience: ['Entrepreneurs', 'Marketing professionals', 'Small business owners'],
    courseOutcome: ['Launch successful marketing campaigns', 'Generate qualified leads', 'Increase online revenue'],
    certificate: true,
    certificateTemplate: '',
    drip: true,
    dripSchedule: [],
    forum: true,
    liveSupport: true,
    downloadableResources: true,
    mobileAccess: true,
    lifeTimeAccess: true,
    salesPageContent: {
      headline: 'Master Digital Marketing in 30 Days',
      subheadline: 'From zero to marketing hero with proven strategies',
      heroImage: '',
      features: [],
      benefits: [],
      testimonials: [],
      faq: [],
      guarantee: '30-day money back guarantee',
      bonuses: [],
      socialProof: {
        totalStudents: 127,
        averageRating: 4.8,
        completionRate: 89,
        successStories: 45
      }
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      ogImage: ''
    },
    pricing: {
      regularPrice: 297,
      salePrice: 197,
      paymentPlans: [],
      coupons: []
    },
    analytics: {
      totalViews: 1250,
      conversionRate: 12.5,
      averageRating: 4.8,
      completionRate: 89,
      refundRate: 2.1,
      totalRevenue: 37719
    },
    modules: [
      {
        id: '1',
        title: 'Digital Marketing Foundations',
        description: 'Learn the core principles of digital marketing',
        isExpanded: true,
        order: 0,
        isLocked: false,
        estimatedDuration: 180,
        learningObjectives: ['Understand digital marketing landscape', 'Identify target audiences'],
        prerequisites: [],
        completionCriteria: 'Complete all lessons',
        lessons: [
          {
            id: '1-1',
            title: 'Introduction to Digital Marketing',
            type: 'video',
            content: '',
            duration: 15,
            isLocked: false,
            videoUrl: 'https://www.youtube.com/watch?v=example',
            description: 'Overview of digital marketing landscape',
            order: 0,
            prerequisites: [],
            learningObjectives: ['Define digital marketing', 'Understand key channels'],
            resources: [],
            isPreview: true,
            estimatedCompletionTime: 15,
            difficulty: 'beginner',
            tags: ['introduction', 'overview']
          }
        ]
      }
    ]
  });

  const [contentEditorOpen, setContentEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [salesPagePreviewOpen, setSalesPagePreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const openContentEditor = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setContentEditorOpen(true);
  };

  const saveLesson = (updatedLesson: Lesson) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        )
      })),
      lastModified: new Date()
    }));
  };

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      description: 'Module description',
      lessons: [],
      isExpanded: true,
      order: course.modules.length,
      isLocked: false,
      estimatedDuration: 60,
      learningObjectives: [],
      prerequisites: [],
      completionCriteria: 'Complete all lessons'
    };

    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule],
      lastModified: new Date()
    }));
    toast.success("New module added!");
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      type: 'text',
      content: '',
      duration: 10,
      isLocked: false,
      description: 'Lesson description',
      order: 0,
      prerequisites: [],
      learningObjectives: [],
      resources: [],
      isPreview: false,
      estimatedCompletionTime: 10,
      difficulty: 'beginner',
      tags: []
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
    toast.success("New lesson added!");
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'text': return <FileText className="w-4 h-4 text-green-500" />;
      case 'quiz': return <HelpCircle className="w-4 h-4 text-orange-500" />;
      case 'assignment': return <Award className="w-4 h-4 text-purple-500" />;
      case 'html': return <Code className="w-4 h-4 text-red-500" />;
      case 'link': return <ExternalLink className="w-4 h-4 text-cyan-500" />;
      case 'audio': return <Mic className="w-4 h-4 text-pink-500" />;
      case 'interactive': return <Monitor className="w-4 h-4 text-indigo-500" />;
      default: return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/lms'}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to LMS
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  Advanced Course Builder
                </h1>
                <p className="text-gray-600 mt-1">Create professional courses with AI-powered content generation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setSalesPagePreviewOpen(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview Sales Page
              </Button>
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Publish Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="sales">Sales Page</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Course Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Course Info Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Course Title</Label>
                      <Input
                        value={course.title}
                        onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Short Description</Label>
                      <Textarea
                        value={course.shortDescription}
                        onChange={(e) => setCourse(prev => ({ ...prev, shortDescription: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Full Description</Label>
                      <Textarea
                        value={course.description}
                        onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={course.price}
                          onChange={(e) => setCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={course.category} onValueChange={(value) => setCourse(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Personal Development">Personal Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modules:</span>
                        <span className="font-semibold">{course.modules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lessons:</span>
                        <span className="font-semibold">
                          {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Enrolled:</span>
                        <span className="font-semibold">{course.currentEnrollments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-semibold text-green-600">${course.analytics.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{course.analytics.averageRating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Content Area */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Course Structure</CardTitle>
                        <CardDescription>Drag and drop to reorder modules and lessons</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addModule}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Module
                        </Button>
                        <Button variant="outline">
                          <Bot className="w-4 h-4 mr-2" />
                          AI Generate Structure
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.modules.map((module, index) => (
                        <div key={module.id} className="border rounded-lg bg-white">
                          {/* Module Header */}
                          <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCourse(prev => ({
                                      ...prev,
                                      modules: prev.modules.map(m =>
                                        m.id === module.id ? { ...m, isExpanded: !m.isExpanded } : m
                                      )
                                    }));
                                  }}
                                >
                                  {module.isExpanded ? 
                                    <ChevronDown className="w-4 h-4" /> : 
                                    <ChevronRight className="w-4 h-4" />
                                  }
                                </Button>
                                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                                <div>
                                  <h3 className="font-semibold">Module {index + 1}: {module.title}</h3>
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
                            <div className="p-4 space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                  onClick={() => openContentEditor(lesson)}
                                >
                                  <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                                    <div className="p-2 rounded-lg bg-gray-100">
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{lesson.title}</h4>
                                      <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        {lesson.duration} min
                                        <Badge variant="outline" className="text-xs">
                                          {lesson.type}
                                        </Badge>
                                        {lesson.isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                        {lesson.isPreview && <Eye className="w-3 h-3 text-blue-500" />}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs would go here... */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Course settings panel coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Page Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Sales page builder coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Coupons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Pricing management coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Analytics dashboard coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Advanced features coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Content Editor Slide-out */}
      <AIContentEditor
        isOpen={contentEditorOpen}
        onClose={() => setContentEditorOpen(false)}
        lesson={editingLesson}
        onSave={saveLesson}
      />

      {/* Sales Page Preview Modal */}
      <SalesPagePreview
        course={course}
        isOpen={salesPagePreviewOpen}
        onClose={() => setSalesPagePreviewOpen(false)}
      />
    </div>
  );
}
