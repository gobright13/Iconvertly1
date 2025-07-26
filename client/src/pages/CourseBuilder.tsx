
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
import { Progress } from '@/components/ui/progress';
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
  Tablet,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Loader2,
  CloudUpload,
  FolderOpen,
  FileVideo,
  FileAudio,
  FileText as FilePdf,
  Database,
  PieChart,
  LineChart,
  Camera,
  Palette,
  Wand2
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Enhanced Types with all professional features
interface VideoSettings {
  provider: 'youtube' | 'vimeo' | 'wistia' | 'jwplayer' | 'videojs' | 'cloudinary' | 'bunny' | 'mux';
  url: string;
  thumbnail?: string;
  duration?: number;
  quality: '480p' | '720p' | '1080p' | '4k';
  autoplay: boolean;
  controls: boolean;
  playbackSpeed: boolean;
  chapters: boolean;
  captions: boolean;
  downloadable: boolean;
  analytics: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'link' | 'audio' | 'pdf' | 'scorm' | 'interactive' | 'live-session' | 'workshop' | 'case-study' | 'simulation' | 'assessment' | 'certification';
  content: string;
  duration: number;
  isLocked: boolean;
  videoSettings?: VideoSettings;
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
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  points: number;
  passingScore?: number;
  attempts: number;
  timeLimit?: number;
  autoplay: boolean;
  downloadable: boolean;
  transcription?: string;
  subtitles?: Subtitle[];
  bookmarks: Bookmark[];
  notes: Note[];
  engagement: EngagementMetrics;
  accessibility: AccessibilityFeatures;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Resource {
  id: string;
  type: 'file' | 'link' | 'document' | 'template' | 'checklist' | 'workbook' | 'toolkit' | 'software' | 'dataset';
  title: string;
  url: string;
  description: string;
  size?: string;
  format?: string;
  downloadCount: number;
  isRequired: boolean;
  category: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'essay' | 'matching' | 'ordering' | 'drag-drop' | 'hotspot' | 'numerical' | 'formula' | 'code-completion' | 'simulation';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  timeLimit?: number;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    alt?: string;
  };
  feedback: {
    correct: string;
    incorrect: string;
    partial?: string;
  };
  randomizeOptions: boolean;
  allowMultipleAttempts: boolean;
  showCorrectAnswer: boolean;
  analytics: QuestionAnalytics;
}

interface QuestionAnalytics {
  attempts: number;
  correctRate: number;
  averageTime: number;
  skipRate: number;
  hintUsage: number;
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

interface Subtitle {
  id: string;
  language: string;
  url: string;
  default: boolean;
}

interface Bookmark {
  id: string;
  timestamp: number;
  title: string;
  description: string;
  userId: string;
}

interface Note {
  id: string;
  timestamp: number;
  content: string;
  isPrivate: boolean;
  userId: string;
  replies: Note[];
}

interface EngagementMetrics {
  views: number;
  completions: number;
  averageWatchTime: number;
  dropOffPoints: number[];
  interactions: number;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

interface AccessibilityFeatures {
  closedCaptions: boolean;
  audioDescription: boolean;
  transcripts: boolean;
  keyboardNavigation: boolean;
  screenReaderCompatible: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
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
  thumbnail?: string;
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
            videoSettings: {
              provider: 'youtube',
              url: 'https://www.youtube.com/watch?v=example',
              quality: '1080p',
              autoplay: false,
              controls: true,
              playbackSpeed: true,
              chapters: true,
              captions: true,
              downloadable: false,
              analytics: true
            },
            description: 'Overview of digital marketing landscape',
            order: 0,
            prerequisites: [],
            learningObjectives: ['Define digital marketing', 'Understand key channels'],
            resources: [],
            isPreview: true,
            estimatedCompletionTime: 15,
            difficulty: 'beginner',
            tags: ['introduction', 'overview'],
            points: 10,
            autoplay: false,
            downloadable: false,
            bookmarks: [],
            notes: [],
            engagement: {
              views: 0,
              completions: 0,
              averageWatchTime: 0,
              dropOffPoints: [],
              interactions: 0,
              rating: 0,
              reviews: []
            },
            accessibility: {
              closedCaptions: false,
              audioDescription: false,
              transcripts: false,
              keyboardNavigation: false,
              screenReaderCompatible: false,
              highContrast: false,
              fontSize: 'medium'
            },
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    ]
  });

  const [contentEditorOpen, setContentEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [salesPagePreviewOpen, setSalesPagePreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination, type } = result;

    if (type === 'module') {
      const newModules = Array.from(course.modules);
      const [reorderedModule] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, reorderedModule);

      // Update order
      newModules.forEach((module, index) => {
        module.order = index;
      });

      setCourse(prev => ({ ...prev, modules: newModules, lastModified: new Date() }));
      toast.success("Modules reordered successfully!");
    } else if (type === 'lesson') {
      const moduleId = source.droppableId.replace('lessons-', '');
      const destModuleId = destination.droppableId.replace('lessons-', '');

      const newModules = course.modules.map(module => ({ ...module, lessons: [...module.lessons] }));
      const sourceModule = newModules.find(m => m.id === moduleId);
      const destModule = newModules.find(m => m.id === destModuleId);

      if (sourceModule && destModule) {
        const [movedLesson] = sourceModule.lessons.splice(source.index, 1);
        destModule.lessons.splice(destination.index, 0, movedLesson);

        // Update order
        destModule.lessons.forEach((lesson, index) => {
          lesson.order = index;
        });

        setCourse(prev => ({ ...prev, modules: newModules, lastModified: new Date() }));
        toast.success("Lesson moved successfully!");
      }
    }
  };

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
          lesson.id === updatedLesson.id ? { ...updatedLesson, updatedAt: new Date() } : lesson
        )
      })),
      lastModified: new Date()
    }));
    toast.success("Lesson saved successfully!");
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
      tags: [],
      points: 0,
      autoplay: false,
      downloadable: false,
      bookmarks: [],
      notes: [],
      engagement: {
        views: 0,
        completions: 0,
        averageWatchTime: 0,
        dropOffPoints: [],
        interactions: 0,
        rating: 0,
        reviews: []
      },
      accessibility: {
        closedCaptions: false,
        audioDescription: false,
        transcripts: false,
        keyboardNavigation: false,
        screenReaderCompatible: false,
        highContrast: false,
        fontSize: 'medium'
      },
      createdAt: new Date(),
      updatedAt: new Date()
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

  const deleteModule = (moduleId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId),
      lastModified: new Date()
    }));
    toast.success("Module deleted!");
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
    toast.success("Lesson deleted!");
  };

  const generateAIContent = async (type: 'outline' | 'content' | 'quiz' | 'objectives' = 'outline') => {
    setAiGenerating(true);
    
    try {
      // Simulate AI generation with more realistic content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (type === 'outline') {
        const newModules: Module[] = [
          {
            id: `ai-module-${Date.now()}`,
            title: 'AI-Generated Foundation Module',
            description: 'Comprehensive introduction covering all essential concepts and fundamentals',
            lessons: [
              {
                id: `ai-lesson-${Date.now()}-1`,
                title: 'Understanding the Basics',
                type: 'video',
                content: '# Understanding the Basics\n\n## Introduction\nThis lesson covers the fundamental concepts you need to master...\n\n## Key Points\n- Core principles and theories\n- Real-world applications\n- Best practices and standards\n\n## Practical Examples\nLet\'s explore some practical examples...',
                duration: 20,
                isLocked: false,
                description: 'Master the fundamental concepts and principles',
                order: 0,
                prerequisites: [],
                learningObjectives: ['Understand core concepts', 'Apply basic principles'],
                resources: [],
                isPreview: true,
                estimatedCompletionTime: 20,
                difficulty: 'beginner',
                tags: ['fundamentals', 'basics'],
                points: 10,
                autoplay: false,
                downloadable: true,
                bookmarks: [],
                notes: [],
                engagement: {
                  views: 0,
                  completions: 0,
                  averageWatchTime: 0,
                  dropOffPoints: [],
                  interactions: 0,
                  rating: 0,
                  reviews: []
                },
                accessibility: {
                  closedCaptions: true,
                  audioDescription: false,
                  transcripts: true,
                  keyboardNavigation: true,
                  screenReaderCompatible: true,
                  highContrast: false,
                  fontSize: 'medium'
                },
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                id: `ai-lesson-${Date.now()}-2`,
                title: 'Practical Implementation',
                type: 'text',
                content: '# Practical Implementation\n\n## Step-by-Step Guide\n1. Planning and preparation\n2. Implementation strategies\n3. Testing and validation\n4. Optimization techniques\n\n## Best Practices\n- Follow industry standards\n- Document your process\n- Test thoroughly\n- Iterate and improve',
                duration: 15,
                isLocked: false,
                description: 'Learn practical implementation strategies',
                order: 1,
                prerequisites: [],
                learningObjectives: ['Implement strategies', 'Follow best practices'],
                resources: [],
                isPreview: false,
                estimatedCompletionTime: 15,
                difficulty: 'intermediate',
                tags: ['implementation', 'practice'],
                points: 15,
                autoplay: false,
                downloadable: true,
                bookmarks: [],
                notes: [],
                engagement: {
                  views: 0,
                  completions: 0,
                  averageWatchTime: 0,
                  dropOffPoints: [],
                  interactions: 0,
                  rating: 0,
                  reviews: []
                },
                accessibility: {
                  closedCaptions: false,
                  audioDescription: false,
                  transcripts: true,
                  keyboardNavigation: true,
                  screenReaderCompatible: true,
                  highContrast: false,
                  fontSize: 'medium'
                },
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ],
            isExpanded: true,
            order: course.modules.length,
            isLocked: false,
            estimatedDuration: 35,
            learningObjectives: ['Master fundamentals', 'Apply practical skills'],
            prerequisites: [],
            completionCriteria: 'Complete all lessons with 80% score'
          }
        ];

        setCourse(prev => ({
          ...prev,
          modules: [...prev.modules, ...newModules],
          lastModified: new Date()
        }));
        
        toast.success("AI-generated course outline added! 🚀");
      }
      
    } catch (error) {
      toast.error("Failed to generate AI content. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'video' | 'audio' | 'document') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileUrl = URL.createObjectURL(file);
      
      if (type === 'thumbnail') {
        setCourse(prev => ({ ...prev, thumbnail: fileUrl, lastModified: new Date() }));
        toast.success("Thumbnail uploaded successfully!");
      }
      
    } catch (error) {
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setUploadingFile(false);
    }
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
      case 'pdf': return <FilePdf className="w-4 h-4 text-red-600" />;
      case 'interactive': return <Monitor className="w-4 h-4 text-indigo-500" />;
      case 'live-session': return <Users className="w-4 h-4 text-sky-500" />;
      case 'workshop': return <PenTool className="w-4 h-4 text-lime-500" />;
      case 'case-study': return <FileText className="w-4 h-4 text-gray-700" />;
      case 'simulation': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'assessment': return <BarChart3 className="w-4 h-4 text-teal-500" />;
      case 'certification': return <Award className="w-4 h-4 text-amber-500" />;
      default: return <BookOpen className="w-4 h-4 text-gray-500" />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to LMS
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  Professional Course Builder
                </h1>
                <p className="text-gray-600 mt-1">Create, manage, and optimize your online courses with AI-powered tools</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" onClick={() => setSalesPagePreviewOpen(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
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
                        onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value, lastModified: new Date() }))}
                      />
                    </div>
                    <div>
                      <Label>Short Description</Label>
                      <Textarea
                        value={course.shortDescription}
                        onChange={(e) => setCourse(prev => ({ ...prev, shortDescription: e.target.value, lastModified: new Date() }))}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Full Description</Label>
                      <Textarea
                        value={course.description}
                        onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value, lastModified: new Date() }))}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={course.price}
                          onChange={(e) => setCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0, lastModified: new Date() }))}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={course.category} onValueChange={(value) => setCourse(prev => ({ ...prev, category: value, lastModified: new Date() }))}>
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
                    
                    {/* Thumbnail Upload */}
                    <div>
                      <Label>Course Thumbnail</Label>
                      <div className="mt-2">
                        {course.thumbnail ? (
                          <div className="relative">
                            <img 
                              src={course.thumbnail} 
                              alt="Course thumbnail" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => thumbnailInputRef.current?.click()}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
                            onClick={() => thumbnailInputRef.current?.click()}
                          >
                            <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload thumbnail</p>
                          </div>
                        )}
                        <input
                          ref={thumbnailInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'thumbnail')}
                        />
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
                        <span className="font-semibold">{totalLessons}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
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

                {/* AI Tools */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      AI Course Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => generateAIContent('outline')} 
                      disabled={aiGenerating}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {aiGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Course Outline
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={() => generateAIContent('content')} 
                      disabled={aiGenerating}
                      variant="outline"
                      className="w-full"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </Button>
                    
                    <Button 
                      onClick={() => generateAIContent('quiz')} 
                      disabled={aiGenerating}
                      variant="outline"
                      className="w-full"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Generate Quizzes
                    </Button>
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="modules" type="module">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {course.modules.map((module, moduleIndex) => (
                              <Draggable key={module.id} draggableId={module.id} index={moduleIndex}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`border rounded-lg bg-white ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                  >
                                    {/* Module Header */}
                                    <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div
                                            {...provided.dragHandleProps}
                                            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
                                          >
                                            <GripVertical className="w-5 h-5" />
                                          </div>
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
                                          <div>
                                            <h3 className="font-semibold">Module {moduleIndex + 1}: {module.title}</h3>
                                            <p className="text-sm text-gray-600">{module.description}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline">
                                            {module.lessons.length} lessons
                                          </Badge>
                                          <Badge variant="outline">
                                            {module.estimatedDuration}m
                                          </Badge>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addLesson(module.id)}
                                          >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Lesson
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteModule(module.id)}
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Module Lessons */}
                                    {module.isExpanded && (
                                      <div className="p-4">
                                        <Droppable droppableId={`lessons-${module.id}`} type="lesson">
                                          {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                              {module.lessons.map((lesson, lessonIndex) => (
                                                <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                                  {(provided, snapshot) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                                      onClick={() => openContentEditor(lesson)}
                                                    >
                                                      <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                          <div
                                                            {...provided.dragHandleProps}
                                                            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
                                                          >
                                                            <GripVertical className="w-4 h-4" />
                                                          </div>
                                                          <div className="p-2 rounded-lg bg-gray-100">
                                                            {getLessonIcon(lesson.type)}
                                                          </div>
                                                          <div>
                                                            <h4 className="font-medium">{lesson.title}</h4>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                              <Clock className="w-3 h-3" />
                                                              {lesson.duration} min
                                                              <Badge variant="outline" className={`text-xs ${getTypeColor(lesson.type)}`}>
                                                                {lesson.type}
                                                              </Badge>
                                                              {lesson.isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                                              {lesson.isPreview && <Eye className="w-3 h-3 text-blue-500" />}
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                          <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              openContentEditor(lesson);
                                                            }}
                                                          >
                                                            <Edit className="w-4 h-4" />
                                                          </Button>
                                                          <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              deleteLesson(module.id, lesson.id);
                                                            }}
                                                          >
                                                            <Trash2 className="w-4 h-4" />
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              ))}
                                              {provided.placeholder}
                                              
                                              {module.lessons.length === 0 && (
                                                <div className="text-center py-8 text-gray-500">
                                                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                  <p>No lessons yet. Add your first lesson above.</p>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </Droppable>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Difficulty Level</Label>
                    <Select value={course.difficulty} onValueChange={(value: any) => setCourse(prev => ({ ...prev, difficulty: value }))}>
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

                  <div>
                    <Label>Language</Label>
                    <Select value={course.language} onValueChange={(value) => setCourse(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Course Features</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Certificate</div>
                          <div className="text-xs text-gray-600">Award completion certificate</div>
                        </div>
                        <Switch
                          checked={course.certificate}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, certificate: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Drip Content</div>
                          <div className="text-xs text-gray-600">Release content gradually</div>
                        </div>
                        <Switch
                          checked={course.drip}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, drip: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Forum Access</div>
                          <div className="text-xs text-gray-600">Student discussion forum</div>
                        </div>
                        <Switch
                          checked={course.forum}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, forum: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Live Support</div>
                          <div className="text-xs text-gray-600">Real-time instructor help</div>
                        </div>
                        <Switch
                          checked={course.liveSupport}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, liveSupport: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Enrollment Limit</Label>
                      <Input
                        type="number"
                        value={course.enrollmentLimit}
                        onChange={(e) => setCourse(prev => ({ ...prev, enrollmentLimit: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label>Current Enrollments</Label>
                      <Input
                        type="number"
                        value={course.currentEnrollments}
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Enrollment Type</Label>
                    <Select 
                      value={course.enrollmentType} 
                      onValueChange={(value: any) => setCourse(prev => ({ ...prev, enrollmentType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual Approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Enrollment Open</div>
                      <div className="text-xs text-gray-600">Accept new students</div>
                    </div>
                    <Switch
                      checked={course.enrollmentOpen}
                      onCheckedChange={(checked) => setCourse(prev => ({ ...prev, enrollmentOpen: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Course Published</div>
                      <div className="text-xs text-gray-600">Visible to students</div>
                    </div>
                    <Switch
                      checked={course.isPublished}
                      onCheckedChange={(checked) => setCourse(prev => ({ ...prev, isPublished: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Page Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Page Builder</CardTitle>
                <CardDescription>Create compelling sales content for your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Headline</Label>
                      <Input
                        value={course.salesPageContent.headline}
                        onChange={(e) => setCourse(prev => ({
                          ...prev,
                          salesPageContent: { ...prev.salesPageContent, headline: e.target.value }
                        }))}
                        placeholder="Master Digital Marketing in 30 Days"
                      />
                    </div>
                    <div>
                      <Label>Subheadline</Label>
                      <Input
                        value={course.salesPageContent.subheadline}
                        onChange={(e) => setCourse(prev => ({
                          ...prev,
                          salesPageContent: { ...prev.salesPageContent, subheadline: e.target.value }
                        }))}
                        placeholder="From zero to marketing hero with proven strategies"
                      />
                    </div>
                    <div>
                      <Label>Guarantee</Label>
                      <Textarea
                        value={course.salesPageContent.guarantee}
                        onChange={(e) => setCourse(prev => ({
                          ...prev,
                          salesPageContent: { ...prev.salesPageContent, guarantee: e.target.value }
                        }))}
                        placeholder="30-day money-back guarantee"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2">{course.salesPageContent.headline || course.title}</h2>
                    <p className="text-blue-100 mb-4">{course.salesPageContent.subheadline || course.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold">${course.price}</div>
                      <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Course Features & Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>What You'll Learn</Label>
                      <div className="space-y-2 mt-2">
                        {course.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={objective}
                              onChange={(e) => {
                                const newObjectives = [...course.learningObjectives];
                                newObjectives[index] = e.target.value;
                                setCourse(prev => ({ ...prev, learningObjectives: newObjectives }));
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newObjectives = course.learningObjectives.filter((_, i) => i !== index);
                                setCourse(prev => ({ ...prev, learningObjectives: newObjectives }));
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourse(prev => ({ 
                            ...prev, 
                            learningObjectives: [...prev.learningObjectives, ''] 
                          }))}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Objective
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Course Outcomes</Label>
                      <div className="space-y-2 mt-2">
                        {course.courseOutcome.map((outcome, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={outcome}
                              onChange={(e) => {
                                const newOutcomes = [...course.courseOutcome];
                                newOutcomes[index] = e.target.value;
                                setCourse(prev => ({ ...prev, courseOutcome: newOutcomes }));
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newOutcomes = course.courseOutcome.filter((_, i) => i !== index);
                                setCourse(prev => ({ ...prev, courseOutcome: newOutcomes }));
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourse(prev => ({ 
                            ...prev, 
                            courseOutcome: [...prev.courseOutcome, ''] 
                          }))}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Outcome
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Regular Price ($)</Label>
                      <Input
                        type="number"
                        value={course.pricing.regularPrice}
                        onChange={(e) => setCourse(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, regularPrice: parseFloat(e.target.value) || 0 }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Sale Price ($)</Label>
                      <Input
                        type="number"
                        value={course.pricing.salePrice || ''}
                        onChange={(e) => setCourse(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, salePrice: parseFloat(e.target.value) || undefined }
                        }))}
                        placeholder="Optional sale price"
                      />
                    </div>
                    <div>
                      <Label>Currency</Label>
                      <Select value={course.currency} onValueChange={(value) => setCourse(prev => ({ ...prev, currency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Preview</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Regular Price:</span>
                          <span className={course.pricing.salePrice ? 'line-through text-gray-500' : 'font-semibold'}>
                            ${course.pricing.regularPrice}
                          </span>
                        </div>
                        {course.pricing.salePrice && (
                          <div className="flex justify-between">
                            <span>Sale Price:</span>
                            <span className="font-semibold text-green-600">${course.pricing.salePrice}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>${course.pricing.salePrice || course.pricing.regularPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Revenue Projection</h4>
                      <div className="text-sm text-green-700">
                        <p>With {course.currentEnrollments} current enrollments:</p>
                        <p className="font-semibold">${((course.pricing.salePrice || course.pricing.regularPrice) * course.currentEnrollments).toLocaleString()} total revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">{course.analytics.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+23% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">{course.analytics.conversionRate}%</p>
                      <p className="text-xs text-green-600">+2.1% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold">{course.analytics.completionRate}%</p>
                      <p className="text-xs text-green-600">+5.2% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">${course.analytics.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+18% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-coral-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-green-800">
                      📈 Your course completion rate is 15% above industry average
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800">
                      💡 Students spend an average of 45 minutes per lesson
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-yellow-800">
                      ⚡ Consider adding more interactive elements to boost engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Course Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Advanced Video Analytics</div>
                        <div className="text-xs text-gray-600">Track detailed viewing patterns</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">AI-Powered Recommendations</div>
                        <div className="text-xs text-gray-600">Suggest next lessons to students</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Advanced Quizzing Engine</div>
                        <div className="text-xs text-gray-600">Adaptive questioning system</div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">White-label Branding</div>
                        <div className="text-xs text-gray-600">Remove platform branding</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Player Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Video Player</Label>
                    <Select defaultValue="videojs">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            YouTube Player
                          </div>
                        </SelectItem>
                        <SelectItem value="vimeo">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Vimeo Player
                          </div>
                        </SelectItem>
                        <SelectItem value="wistia">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Wistia Player
                          </div>
                        </SelectItem>
                        <SelectItem value="jwplayer">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            JW Player
                          </div>
                        </SelectItem>
                        <SelectItem value="videojs">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Video.js Player
                          </div>
                        </SelectItem>
                        <SelectItem value="cloudinary">
                          <div className="flex items-center gap-2">
                            <CloudUpload className="w-4 h-4" />
                            Cloudinary Player
                          </div>
                        </SelectItem>
                        <SelectItem value="bunny">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Bunny Stream
                          </div>
                        </SelectItem>
                        <SelectItem value="mux">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Mux Video
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Player Features</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Auto-play</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Playback Speed</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Chapters</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Captions</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Downloads</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">Analytics</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Upload Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <FileVideo className="w-6 h-6 text-blue-500" />
                      <div className="text-center">
                        <div className="font-medium text-sm">Video Upload</div>
                        <div className="text-xs text-gray-600">MP4, MOV, AVI</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <FileAudio className="w-6 h-6 text-green-500" />
                      <div className="text-center">
                        <div className="font-medium text-sm">Audio Upload</div>
                        <div className="text-xs text-gray-600">MP3, WAV, M4A</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <FilePdf className="w-6 h-6 text-red-500" />
                      <div className="text-center">
                        <div className="font-medium text-sm">PDF Upload</div>
                        <div className="text-xs text-gray-600">Documents, slides</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <ImageIcon className="w-6 h-6 text-purple-500" />
                      <div className="text-center">
                        <div className="font-medium text-sm">Image Upload</div>
                        <div className="text-xs text-gray-600">JPG, PNG, GIF</div>
                      </div>
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <Label>Bulk Upload</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <CloudUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Drag and drop files or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supports batch upload of multiple files</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO & Marketing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      value={course.seo.metaTitle}
                      onChange={(e) => setCourse(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value }
                      }))}
                      placeholder="SEO-optimized title"
                    />
                  </div>

                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      value={course.seo.metaDescription}
                      onChange={(e) => setCourse(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value }
                      }))}
                      placeholder="SEO-optimized description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Keywords</Label>
                    <Input
                      value={course.seo.keywords.join(', ')}
                      onChange={(e) => setCourse(prev => ({
                        ...prev,
                        seo: { ...prev.seo, keywords: e.target.value.split(',').map(k => k.trim()) }
                      }))}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div>
                    <Label>Open Graph Image</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <ImageIcon className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload OG image</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Content Editor Modal */}
      {contentEditorOpen && editingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Edit Lesson: {editingLesson.title}</h3>
                <Button variant="ghost" onClick={() => setContentEditorOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
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
                        <SelectItem value="video">Video Lesson</SelectItem>
                        <SelectItem value="text">Text Content</SelectItem>
                        <SelectItem value="html">HTML Content</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="link">External Link</SelectItem>
                        <SelectItem value="audio">Audio Lesson</SelectItem>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="interactive">Interactive Content</SelectItem>
                        <SelectItem value="live-session">Live Session</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                        <SelectItem value="simulation">Simulation</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
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
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Points</Label>
                    <Input
                      type="number"
                      value={editingLesson.points}
                      onChange={(e) => setEditingLesson(prev => prev ? { ...prev, points: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                </div>

                {/* Video Settings */}
                {editingLesson.type === 'video' && (
                  <div className="space-y-4">
                    <Label>Video Settings</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Video Provider</Label>
                        <Select
                          value={editingLesson.videoSettings?.provider || 'youtube'}
                          onValueChange={(value: any) => setEditingLesson(prev => prev ? {
                            ...prev,
                            videoSettings: { ...prev.videoSettings, provider: value } as VideoSettings
                          } : null)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="vimeo">Vimeo</SelectItem>
                            <SelectItem value="wistia">Wistia</SelectItem>
                            <SelectItem value="jwplayer">JW Player</SelectItem>
                            <SelectItem value="videojs">Video.js</SelectItem>
                            <SelectItem value="cloudinary">Cloudinary</SelectItem>
                            <SelectItem value="bunny">Bunny Stream</SelectItem>
                            <SelectItem value="mux">Mux Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Video Quality</Label>
                        <Select
                          value={editingLesson.videoSettings?.quality || '1080p'}
                          onValueChange={(value: any) => setEditingLesson(prev => prev ? {
                            ...prev,
                            videoSettings: { ...prev.videoSettings, quality: value } as VideoSettings
                          } : null)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="480p">480p</SelectItem>
                            <SelectItem value="720p">720p</SelectItem>
                            <SelectItem value="1080p">1080p</SelectItem>
                            <SelectItem value="4k">4K</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Video URL</Label>
                      <Input
                        value={editingLesson.videoSettings?.url || ''}
                        onChange={(e) => setEditingLesson(prev => prev ? {
                          ...prev,
                          videoSettings: { ...prev.videoSettings, url: e.target.value } as VideoSettings
                        } : null)}
                        placeholder="Enter video URL"
                      />
                    </div>
                  </div>
                )}

                {/* External Link */}
                {editingLesson.type === 'link' && (
                  <div>
                    <Label>External URL</Label>
                    <Input
                      value={editingLesson.externalUrl || ''}
                      onChange={(e) => setEditingLesson(prev => prev ? { ...prev, externalUrl: e.target.value } : null)}
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {/* Audio URL */}
                {editingLesson.type === 'audio' && (
                  <div>
                    <Label>Audio URL</Label>
                    <Input
                      value={editingLesson.audioUrl || ''}
                      onChange={(e) => setEditingLesson(prev => prev ? { ...prev, audioUrl: e.target.value } : null)}
                      placeholder="Enter audio file URL"
                    />
                  </div>
                )}

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingLesson.description}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Lesson Content</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateAIContent('content')}
                      disabled={aiGenerating}
                    >
                      {aiGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4 mr-2" />
                          AI Generate
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    value={editingLesson.content}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, content: e.target.value } : null)}
                    rows={12}
                    placeholder="Enter your lesson content here..."
                  />
                </div>

                {/* Lesson Settings */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Locked</div>
                      <div className="text-xs text-gray-600">Require prerequisites</div>
                    </div>
                    <Switch
                      checked={editingLesson.isLocked}
                      onCheckedChange={(checked) => setEditingLesson(prev => prev ? { ...prev, isLocked: checked } : null)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Preview</div>
                      <div className="text-xs text-gray-600">Free preview lesson</div>
                    </div>
                    <Switch
                      checked={editingLesson.isPreview}
                      onCheckedChange={(checked) => setEditingLesson(prev => prev ? { ...prev, isPreview: checked } : null)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Downloadable</div>
                      <div className="text-xs text-gray-600">Allow downloads</div>
                    </div>
                    <Switch
                      checked={editingLesson.downloadable}
                      onCheckedChange={(checked) => setEditingLesson(prev => prev ? { ...prev, downloadable: checked } : null)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setContentEditorOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (editingLesson) {
                    saveLesson(editingLesson);
                    setContentEditorOpen(false);
                  }
                }}
              >
                Save Lesson
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sales Page Preview Modal */}
      {salesPagePreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Sales Page Preview</h3>
                <Button variant="ghost" onClick={() => setSalesPagePreviewOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Hero Section */}
              <div className="text-center space-y-4 py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-8">
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
              <div className="grid grid-cols-4 gap-6 text-center mb-8">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
                  <div className="text-gray-600">Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
                  <div className="text-gray-600">Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{course.currentEnrollments}</div>
                  <div className="text-gray-600">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{course.analytics.averageRating}★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
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

              {/* Course Curriculum */}
              <div className="mb-8">
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

              {/* Instructor */}
              <div className="border rounded-lg p-6 bg-gray-50 mb-8">
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
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={(e) => handleFileUpload(e, 'document')}
      />
    </div>
  );
}
