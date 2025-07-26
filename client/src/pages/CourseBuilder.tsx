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
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Enhanced Types with Professional LMS Features
interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'html' | 'quiz' | 'assignment' | 'link' | 'audio' | 'pdf' | 'scorm' | 'interactive' | 'live-session' | 'workshop' | 'case-study' | 'simulation' | 'assessment' | 'certification';
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
}

interface Subtitle {
  id: string;
  language: string;
  url: string;
}

interface Bookmark {
  id: string;
  time: number;
  description: string;
}

interface Note {
  id: string;
  time: number;
  content: string;
}

interface EngagementMetrics {
  views: number;
  averageWatchTime: number;
  completionRate: number;
  interactions: number;
}

interface AccessibilityFeatures {
  closedCaptioning: boolean;
  screenReaderSupport: boolean;
  keyboardNavigation: boolean;
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

// Professional AI Content Studio Component
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
  const [contentHistory, setContentHistory] = useState<string[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<string>('');
  const [voiceSettings, setVoiceSettings] = useState({
    language: 'en-US',
    speed: 1.0,
    voice: 'female'
  });

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
    
    try {
      // Real AI content generation with comprehensive templates
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          type: selectedAITool,
          lesson: editingLesson,
          template: activeTemplate
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        if (editingLesson) {
          let generatedContent = '';
          
          switch (selectedAITool) {
            case 'content':
              generatedContent = `# ${editingLesson.title}\n\n## Course Overview\n${aiPrompt}\n\n## Learning Objectives\nBy the end of this lesson, you will be able to:\n\n${result.objectives?.map((obj: string, i: number) => `${i + 1}. ${obj}`).join('\n') || '- Master the core concepts\n- Apply practical techniques\n- Solve real-world problems'}\n\n## Content Structure\n\n### Introduction\n${result.introduction || 'Welcome to this comprehensive lesson where we will explore the fundamental concepts and practical applications.'}\n\n### Main Content\n\n#### Section 1: Fundamentals\n${result.fundamentals || '**Core Concepts:**\n- Essential principles and theories\n- Historical context and evolution\n- Key terminology and definitions\n- Industry standards and best practices'}\n\n#### Section 2: Practical Application\n${result.practical || '**Hands-On Learning:**\n- Step-by-step implementation guide\n- Real-world case studies and examples\n- Common challenges and solutions\n- Tools and resources for success'}\n\n#### Section 3: Advanced Techniques\n${result.advanced || '**Expert-Level Strategies:**\n- Advanced methodologies and frameworks\n- Optimization techniques and performance tuning\n- Integration with other systems and technologies\n- Future trends and emerging practices'}\n\n### Interactive Elements\n\n#### Knowledge Check\n${result.knowledgeCheck || '**Quick Assessment:**\n1. What are the three main principles we covered?\n2. How would you apply this in a real-world scenario?\n3. What are the potential challenges and how would you overcome them?'}\n\n#### Practical Exercise\n${result.exercise || '**Hands-On Activity:**\nComplete the following exercise to reinforce your learning:\n- Set up your environment\n- Follow the step-by-step guide\n- Test your implementation\n- Document your results'}\n\n### Resources and Next Steps\n\n#### Additional Resources\n${result.resources || '- **Documentation:** Official guides and references\n- **Tools:** Recommended software and platforms\n- **Community:** Forums, groups, and expert networks\n- **Continued Learning:** Advanced courses and certifications'}\n\n#### Action Items\n- [ ] Complete the hands-on exercise\n- [ ] Review additional resources\n- [ ] Apply concepts to your current project\n- [ ] Share your progress with the community\n- [ ] Prepare for the next lesson\n\n### Summary\n${result.summary || `In this lesson, we covered the essential aspects of ${editingLesson.title.toLowerCase()}. You now have the knowledge and tools to implement these concepts in your own work. Remember to practice regularly and stay updated with the latest developments in the field.`}\n\n---\n\n*🤖 Generated with AI on ${new Date().toLocaleDateString()} | Prompt: "${aiPrompt}"*\n*✨ Enhanced with professional course design patterns*`;
              break;
          case 'quiz':
            const quizQuestions = result.questions || [
              {
                id: `q-${Date.now()}-1`,
                question: `What is the main concept covered in ${editingLesson.title}?`,
                type: 'multiple-choice',
                options: [
                  'The foundational principles and core concepts',
                  'Advanced implementation strategies only',
                  'Historical background information',
                  'Industry trends and predictions'
                ],
                correctAnswer: 'The foundational principles and core concepts',
                explanation: 'This lesson focuses primarily on establishing a solid understanding of the fundamental concepts before moving to advanced applications.',
                points: 10,
                difficulty: 'medium',
                tags: ['fundamentals', 'concepts'],
                timeLimit: 60,
                hints: ['Think about what we covered in the introduction section', 'Consider the learning objectives stated at the beginning'],
                feedback: {
                  correct: 'Excellent! You correctly identified the main focus of this lesson.',
                  incorrect: 'Not quite right. Review the lesson introduction and learning objectives.',
                  partial: 'You\'re on the right track, but consider the primary emphasis of the content.'
                }
              },
              {
                id: `q-${Date.now()}-2`,
                question: `Which of the following best describes the practical application approach taught in this lesson?`,
                type: 'multiple-choice',
                options: [
                  'Theoretical analysis only',
                  'Step-by-step implementation with real-world examples',
                  'Historical case studies exclusively',
                  'Future predictions and speculation'
                ],
                correctAnswer: 'Step-by-step implementation with real-world examples',
                explanation: 'The lesson emphasizes hands-on learning through practical implementation with concrete examples.',
                points: 10,
                difficulty: 'medium',
                tags: ['practical', 'implementation'],
                timeLimit: 90,
                hints: ['Look at the practical application section', 'Consider what type of learning activities were included'],
                feedback: {
                  correct: 'Perfect! You understand the practical focus of this lesson.',
                  incorrect: 'Review the practical application section to see the hands-on approach used.',
                  partial: 'You\'re getting closer. Focus on the implementation methodology.'
                }
              },
              {
                id: `q-${Date.now()}-3`,
                question: `True or False: The principles taught in ${editingLesson.title} can be applied immediately in real-world scenarios.`,
                type: 'true-false',
                correctAnswer: 'true',
                explanation: 'Yes, the lesson is designed to provide immediately applicable knowledge and skills that can be implemented right away.',
                points: 5,
                difficulty: 'easy',
                tags: ['application', 'practical'],
                timeLimit: 30,
                hints: ['Consider the practical exercises included in the lesson'],
                feedback: {
                  correct: 'Correct! The lesson content is designed for immediate practical application.',
                  incorrect: 'Actually, this lesson provides immediately usable skills and knowledge.'
                }
              },
              {
                id: `q-${Date.now()}-4`,
                question: `Fill in the blank: The three main sections of this lesson are Fundamentals, _______, and Advanced Techniques.`,
                type: 'fill-blank',
                correctAnswer: 'Practical Application',
                explanation: 'The lesson follows a structured approach: Fundamentals, Practical Application, and Advanced Techniques.',
                points: 8,
                difficulty: 'easy',
                tags: ['structure', 'organization'],
                timeLimit: 45,
                hints: ['Think about the hands-on section', 'What comes between theory and advanced concepts?'],
                feedback: {
                  correct: 'Great! You remembered the lesson structure correctly.',
                  incorrect: 'Review the lesson structure - it follows a logical progression from basics to practice to advanced concepts.'
                }
              },
              {
                id: `q-${Date.now()}-5`,
                question: `Which advanced technique is most emphasized for optimization and performance improvement?`,
                type: 'multiple-choice',
                options: [
                  'Basic troubleshooting methods',
                  'Performance tuning and optimization frameworks',
                  'Historical analysis approaches',
                  'Standard implementation procedures'
                ],
                correctAnswer: 'Performance tuning and optimization frameworks',
                explanation: 'The advanced section specifically focuses on optimization methodologies and performance improvement frameworks.',
                points: 15,
                difficulty: 'hard',
                tags: ['advanced', 'optimization', 'performance'],
                timeLimit: 120,
                hints: ['Look at the advanced techniques section', 'Consider what goes beyond basic implementation'],
                feedback: {
                  correct: 'Excellent! You identified the key advanced optimization concepts.',
                  incorrect: 'Review the advanced techniques section focusing on performance and optimization methods.',
                  partial: 'You\'re thinking about the right area. Focus specifically on optimization frameworks.'
                }
              }
            ];
            
            generatedContent = JSON.stringify({
              quiz: {
                id: `quiz-${Date.now()}`,
                title: `${editingLesson.title} - Knowledge Assessment`,
                description: `Comprehensive quiz covering all key concepts from the ${editingLesson.title} lesson`,
                instructions: 'Answer all questions to the best of your ability. You have unlimited attempts, but try to complete it in one go for the best learning experience.',
                timeLimit: 600, // 10 minutes
                passingScore: 70,
                randomizeQuestions: true,
                showResults: true,
                allowReview: true,
                questions: quizQuestions,
                settings: {
                  allowBacktracking: true,
                  showProgress: true,
                  preventCheating: false,
                  showCorrectAnswers: true,
                  showExplanations: true,
                  allowMultipleAttempts: true,
                  trackTime: true
                }
              }
            }, null, 2);
            break;
          case 'objectives':
            const objectives = result.objectives || [
              `Master the fundamental concepts and principles of ${editingLesson.title.toLowerCase()}`,
              `Apply theoretical knowledge through practical, hands-on implementation`,
              `Analyze real-world scenarios and develop effective solution strategies`,
              `Evaluate different approaches and select optimal methodologies`,
              `Create comprehensive implementations using industry best practices`,
              `Troubleshoot common issues and implement preventive measures`,
              `Integrate learned concepts with existing knowledge and systems`,
              `Demonstrate proficiency through practical exercises and assessments`
            ];
            
            setEditingLesson(prev => prev ? { 
              ...prev, 
              learningObjectives: objectives,
              description: result.description || `Enhanced learning objectives for ${editingLesson.title}`,
              tags: [...(prev.tags || []), 'ai-enhanced', 'comprehensive', 'practical']
            } : null);
            
            toast.success("Advanced learning objectives generated with AI!");
            setAiGenerating(false);
            return;
            
          case 'assessment':
            const assessmentContent = {
              title: `${editingLesson.title} - Comprehensive Assessment`,
              type: 'mixed-assessment',
              components: [
                {
                  type: 'knowledge-check',
                  questions: result.knowledgeQuestions || 5,
                  format: 'multiple-choice',
                  weight: 30
                },
                {
                  type: 'practical-exercise',
                  description: result.practicalExercise || 'Hands-on implementation project',
                  format: 'project-submission',
                  weight: 40
                },
                {
                  type: 'reflection',
                  description: 'Written reflection on learning and application',
                  format: 'essay',
                  weight: 20
                },
                {
                  type: 'peer-review',
                  description: 'Review and provide feedback on peer submissions',
                  format: 'structured-review',
                  weight: 10
                }
              ],
              rubric: result.rubric || {
                'Understanding': 'Demonstrates clear comprehension of concepts',
                'Application': 'Successfully applies knowledge to practical scenarios',
                'Analysis': 'Shows critical thinking and problem-solving skills',
                'Communication': 'Clearly expresses ideas and solutions',
                'Innovation': 'Demonstrates creativity and original thinking'
              },
              passingCriteria: {
                minimumScore: 70,
                requiredComponents: ['knowledge-check', 'practical-exercise'],
                timeLimit: 7200 // 2 hours
              }
            };
            
            generatedContent = JSON.stringify(assessmentContent, null, 2);
            break;
            
          case 'resources':
            const resourcePack = {
              title: `${editingLesson.title} - Learning Resource Pack`,
              categories: {
                'Essential Reading': result.reading || [
                  'Core concepts documentation',
                  'Industry best practices guide',
                  'Case study collection'
                ],
                'Tools & Software': result.tools || [
                  'Recommended development environment',
                  'Essential plugins and extensions',
                  'Testing and validation tools'
                ],
                'Templates & Examples': result.templates || [
                  'Starter project templates',
                  'Code examples and snippets',
                  'Configuration samples'
                ],
                'Community & Support': result.community || [
                  'Official forums and discussion groups',
                  'Expert networks and mentorship',
                  'Peer learning opportunities'
                ],
                'Advanced Learning': result.advanced || [
                  'Specialized courses and certifications',
                  'Research papers and academic resources',
                  'Conference talks and presentations'
                ]
              }
            };
            
            generatedContent = JSON.stringify(resourcePack, null, 2);
            break;
        }
          
          // Store in content history for undo/redo
          setContentHistory(prev => [...prev, editingLesson.content || '']);
          
          setEditingLesson(prev => prev ? {
            ...prev,
            content: generatedContent,
            htmlContent: editingLesson.type === 'html' ? generatedContent : prev.htmlContent,
            lastModified: new Date(),
            aiGenerated: true,
            aiPrompt: aiPrompt
          } : null);
          
          toast.success(`AI ${selectedAITool} generated successfully! 🚀`);
        }
      } else {
        // Fallback to local generation if API is not available
        await generateFallbackContent();
      }
    } catch (error) {
      console.warn('AI API not available, using fallback generation');
      await generateFallbackContent();
    }
    
    setAiGenerating(false);
  };

  const generateFallbackContent = async () => {
    // Comprehensive fallback generation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (editingLesson) {
          let generatedContent = '';
          
          switch (selectedAITool) {
            case 'content':
              generatedContent = generateComprehensiveContent();
              break;
            case 'quiz':
              generatedContent = generateAdvancedQuiz();
              break;
            case 'objectives':
              const objectives = generateLearningObjectives();
              setEditingLesson(prev => prev ? { ...prev, learningObjectives: objectives } : null);
              toast.success("Learning objectives generated!");
              resolve();
              return;
            case 'assessment':
              generatedContent = generateAssessmentStructure();
              break;
            case 'resources':
              generatedContent = generateResourcePack();
              break;
            default:
              generatedContent = generateComprehensiveContent();
          }
          
          setContentHistory(prev => [...prev, editingLesson.content || '']);
          setEditingLesson(prev => prev ? {
            ...prev,
            content: generatedContent,
            htmlContent: editingLesson.type === 'html' ? generatedContent : prev.htmlContent
          } : null);
        }
        resolve();
      }, 1500);
    });
  };

  const generateComprehensiveContent = () => {
    return `# ${editingLesson?.title}\n\n## 🎯 Course Overview\n${aiPrompt}\n\n## 📚 Learning Objectives\nBy completing this lesson, you will be able to:\n\n1. **Master Core Concepts** - Understand fundamental principles and theories\n2. **Apply Practical Skills** - Implement knowledge in real-world scenarios\n3. **Solve Complex Problems** - Develop critical thinking and analytical abilities\n4. **Create Professional Solutions** - Build industry-standard implementations\n5. **Optimize Performance** - Apply advanced techniques for efficiency\n6. **Integrate Systems** - Connect with existing tools and workflows\n\n## 🚀 Getting Started\n\n### Prerequisites\n- Basic understanding of the subject area\n- Access to required tools and resources\n- Commitment to hands-on practice\n- Open mindset for continuous learning\n\n### What You'll Need\n- Computer with internet connection\n- Recommended software (links provided below)\n- Note-taking materials\n- Practice environment setup\n\n## 📖 Core Content\n\n### Section 1: Foundations\n\n#### Understanding the Basics\nLet's start with the fundamental concepts that form the backbone of ${editingLesson?.title.toLowerCase()}:\n\n**Key Principles:**\n- Core theoretical frameworks\n- Industry standards and best practices\n- Common terminology and definitions\n- Historical context and evolution\n\n**Why This Matters:**\nUnderstanding these foundations is crucial because they provide the building blocks for all advanced concepts we'll explore later.\n\n#### Real-World Context\n${aiPrompt}\n\nThis knowledge directly applies to:\n- Professional development scenarios\n- Industry problem-solving\n- Career advancement opportunities\n- Personal project enhancement\n\n### Section 2: Practical Implementation\n\n#### Step-by-Step Guide\n\n**Phase 1: Planning and Preparation**\n1. Assess your current knowledge level\n2. Set specific learning goals\n3. Gather necessary resources\n4. Create a practice schedule\n\n**Phase 2: Hands-On Practice**\n1. Follow guided examples\n2. Complete practice exercises\n3. Experiment with variations\n4. Document your progress\n\n**Phase 3: Application and Integration**\n1. Apply to real projects\n2. Combine with existing skills\n3. Share with community\n4. Seek feedback and iterate\n\n#### Interactive Elements\n\n**🎮 Practice Exercise:**\nTry implementing the concepts we've covered:\n\n\`\`\`\n// Example implementation\n// Replace this with your own code\nfunction practiceExample() {\n  // Your implementation here\n  return \"Success!\";\n}\n\`\`\`\n\n**💡 Pro Tips:**\n- Start small and build complexity gradually\n- Test frequently and debug systematically\n- Document your learning process\n- Connect with other learners\n\n### Section 3: Advanced Techniques\n\n#### Expert-Level Strategies\nNow that you've mastered the basics, let's explore advanced concepts:\n\n**Performance Optimization:**\n- Efficiency improvements\n- Resource management\n- Scalability considerations\n- Monitoring and analytics\n\n**Integration Patterns:**\n- System connectivity\n- Data flow management\n- Error handling strategies\n- Security considerations\n\n#### Troubleshooting Guide\n\n**Common Issues and Solutions:**\n\n| Problem | Cause | Solution |\n|---------|-------|----------|\n| Performance lag | Resource constraints | Optimize algorithms and data structures |\n| Integration failures | API mismatches | Verify endpoints and data formats |\n| Security vulnerabilities | Inadequate validation | Implement comprehensive input sanitization |\n\n## 🎯 Knowledge Check\n\n### Quick Assessment\n1. **What are the three main phases of implementation?**\n   - Planning and Preparation\n   - Hands-On Practice\n   - Application and Integration\n\n2. **Why is foundation knowledge important?**\n   - Provides building blocks for advanced concepts\n   - Ensures proper understanding of principles\n   - Enables effective problem-solving\n\n3. **What should you focus on for optimization?**\n   - Performance and efficiency\n   - Resource management\n   - Scalability planning\n\n## 🛠️ Practical Exercise\n\n### Your Mission\nCreate a comprehensive implementation that demonstrates:\n- Core concept understanding\n- Practical application skills\n- Problem-solving abilities\n- Integration capabilities\n\n### Submission Requirements\n1. **Documentation** - Clear explanation of your approach\n2. **Implementation** - Working solution with comments\n3. **Testing** - Verification of functionality\n4. **Reflection** - Analysis of learning process\n\n## 📚 Additional Resources\n\n### Essential Reading\n- 📖 [Official Documentation](https://example.com/docs)\n- 📊 [Best Practices Guide](https://example.com/best-practices)\n- 🎥 [Video Tutorial Series](https://example.com/videos)\n\n### Tools and Software\n- 🔧 [Development Environment](https://example.com/ide)\n- 🧪 [Testing Framework](https://example.com/testing)\n- 📈 [Analytics Platform](https://example.com/analytics)\n\n### Community and Support\n- 💬 [Discussion Forum](https://example.com/forum)\n- 👥 [Study Groups](https://example.com/groups)\n- 🎓 [Expert Mentorship](https://example.com/mentors)\n\n## 🎉 Next Steps\n\n### Immediate Actions\n- [ ] Complete the practical exercise\n- [ ] Review additional resources\n- [ ] Join the community discussion\n- [ ] Plan your next learning goal\n\n### Long-term Development\n- [ ] Apply concepts to real projects\n- [ ] Explore advanced specializations\n- [ ] Contribute to open-source projects\n- [ ] Mentor other learners\n\n## 💡 Key Takeaways\n\n> **Remember:** Learning is a continuous journey. The concepts covered in this lesson provide a solid foundation, but true mastery comes through consistent practice and real-world application.\n\n### Success Metrics\n- ✅ Understanding of core concepts\n- ✅ Ability to implement solutions\n- ✅ Problem-solving confidence\n- ✅ Integration capabilities\n\n---\n\n🤖 **AI-Generated Content** | Created on ${new Date().toLocaleDateString()}\n✨ **Enhanced with Professional Course Design Patterns**\n📝 **Based on Prompt:** "${aiPrompt}"\n\n*Continue your learning journey with confidence and curiosity!*`;
  };

  const generateAdvancedQuiz = () => {
    return JSON.stringify({
      quiz: {
        id: `quiz-${Date.now()}`,
        title: `${editingLesson?.title} - Advanced Assessment`,
        description: `Comprehensive evaluation covering all aspects of ${editingLesson?.title}`,
        questions: [
          {
            id: '1',
            question: `Which principle is most fundamental to ${editingLesson?.title}?`,
            type: 'multiple-choice',
            options: ['Basic implementation', 'Core theoretical framework', 'Advanced optimization', 'Integration patterns'],
            correctAnswer: 'Core theoretical framework',
            explanation: 'The theoretical framework provides the foundation for all other concepts.',
            points: 10,
            difficulty: 'medium'
          },
          {
            id: '2',
            question: 'Describe the three-phase implementation approach.',
            type: 'essay',
            correctAnswer: 'Planning and Preparation, Hands-On Practice, Application and Integration',
            explanation: 'This structured approach ensures comprehensive learning and practical application.',
            points: 15,
            difficulty: 'hard'
          }
        ],
        settings: {
          timeLimit: 1800,
          passingScore: 80,
          allowMultipleAttempts: true,
          showExplanations: true
        }
      }
    }, null, 2);
  };

  const generateLearningObjectives = () => {
    return [
      `Demonstrate mastery of ${editingLesson?.title.toLowerCase()} fundamentals`,
      'Apply theoretical knowledge to practical implementation scenarios',
      'Analyze complex problems and develop systematic solution approaches',
      'Evaluate different methodologies and select optimal strategies',
      'Create professional-grade solutions using industry best practices',
      'Integrate learned concepts with existing knowledge and systems',
      'Troubleshoot common issues and implement preventive measures',
      'Optimize performance and ensure scalability of solutions'
    ];
  };

  const generateAssessmentStructure = () => {
    return JSON.stringify({
      assessment: {
        title: `${editingLesson?.title} - Comprehensive Evaluation`,
        components: [
          { type: 'knowledge-test', weight: 30, questions: 10 },
          { type: 'practical-project', weight: 50, duration: '2 hours' },
          { type: 'peer-review', weight: 20, submissions: 2 }
        ],
        rubric: {
          'Understanding': 'Demonstrates clear comprehension',
          'Application': 'Successfully implements concepts',
          'Innovation': 'Shows creative problem-solving'
        }
      }
    }, null, 2);
  };

  const generateResourcePack = () => {
    return JSON.stringify({
      resources: {
        title: `${editingLesson?.title} - Complete Resource Pack`,
        categories: {
          'Documentation': ['Official guides', 'API references', 'Best practices'],
          'Tools': ['Development environment', 'Testing frameworks', 'Deployment tools'],
          'Examples': ['Code samples', 'Project templates', 'Case studies'],
          'Community': ['Forums', 'Expert networks', 'Study groups']
        }
      }
    }, null, 2);
  };

  if (!isOpen || !editingLesson) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-2/3 bg-white shadow-2xl z-50 border-l transform transition-transform duration-300 ease-in-out flex flex-col max-w-6xl">
      {/* Enhanced Header */}
      <div className="border-b p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🚀 AI Content Studio Pro
                <Badge className="bg-purple-100 text-purple-700">Beta</Badge>
              </h2>
              <p className="text-gray-600">Editing: <span className="font-medium">{editingLesson.title}</span></p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save & Apply
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Professional AI Tools Panel */}
      <div className="border-b p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-purple-900">Professional AI Content Generator</h3>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Enterprise</Badge>
        </div>
        
        {/* AI Tool Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Button
            variant={selectedAITool === 'content' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('content')}
            className={selectedAITool === 'content' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            <FileText className="w-4 h-4 mr-2" />
            Lesson Content
          </Button>
          <Button
            variant={selectedAITool === 'quiz' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('quiz')}
            className={selectedAITool === 'quiz' ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Smart Quiz
          </Button>
          <Button
            variant={selectedAITool === 'objectives' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('objectives')}
            className={selectedAITool === 'objectives' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <Target className="w-4 h-4 mr-2" />
            Learning Goals
          </Button>
          <Button
            variant={selectedAITool === 'assessment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAITool('assessment')}
            className={selectedAITool === 'assessment' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            <Award className="w-4 h-4 mr-2" />
            Assessment
          </Button>
        </div>

        {/* Content Templates */}
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Content Template</Label>
          <Select value={activeTemplate} onValueChange={setActiveTemplate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a professional template..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprehensive">📚 Comprehensive Course Content</SelectItem>
              <SelectItem value="practical">🛠️ Hands-On Practical Guide</SelectItem>
              <SelectItem value="theoretical">🧠 Theoretical Deep Dive</SelectItem>
              <SelectItem value="case-study">📋 Case Study Analysis</SelectItem>
              <SelectItem value="interactive">🎮 Interactive Learning Experience</SelectItem>
              <SelectItem value="assessment">📊 Assessment & Evaluation</SelectItem>
              <SelectItem value="beginner">🌱 Beginner-Friendly Introduction</SelectItem>
              <SelectItem value="advanced">🚀 Advanced Professional Content</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Prompt Input */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Describe Your Content Vision</Label>
          <div className="relative">
            <Textarea
              placeholder="Describe exactly what you want the AI to create. Be specific about topics, learning outcomes, difficulty level, and target audience..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="min-h-[100px] pr-16 resize-none"
              rows={4}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {aiPrompt.length}/1000
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={generateAIContent} 
              disabled={aiGenerating || !aiPrompt.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1"
            >
              {aiGenerating ? (
                <>
                  <Bot className="w-5 h-5 mr-2 animate-spin" />
                  AI is Creating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Professional Content
                </>
              )}
            </Button>
            
            <Button variant="outline" size="sm">
              <Mic className="w-4 h-4 mr-2" />
              Voice Input
            </Button>
          </div>
        </div>

        {/* AI Status & Progress */}
        {aiGenerating && (
          <div className="mt-4 p-4 bg-purple-100 rounded-lg">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-purple-600 animate-pulse" />
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-900">AI Content Generation in Progress...</div>
                <div className="text-xs text-purple-700">Creating professional-grade content tailored to your specifications</div>
              </div>
            </div>
            <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}
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
                <SelectItem value="live-session">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Live Session
                  </div>
                </SelectItem>
                <SelectItem value="workshop">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Workshop
                  </div>
                </SelectItem>
                 <SelectItem value="case-study">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Case Study
                  </div>
                </SelectItem>
                <SelectItem value="simulation">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Simulation
                  </div>
                </SelectItem>
                 <SelectItem value="assessment">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Assessment
                  </div>
                </SelectItem>
                <SelectItem value="certification">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certification
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
                 <SelectItem value="expert">Expert</SelectItem>
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
            tags: ['introduction', 'overview'],
            points: 10
          }
        ]
      }
    ]
  });

  const [contentEditorOpen, setContentEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [salesPagePreviewOpen, setSalesPagePreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    // Handle drag and drop logic here
    console.log('Drag ended:', result);
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
      tags: [],
      points: 0,
      autoplay: false,
      downloadable: false,
      bookmarks: [],
      notes: [],
      engagement: {
        views: 0,
        averageWatchTime: 0,
        completionRate: 0,
        interactions: 0
      },
      accessibility: {
        closedCaptioning: false,
        screenReaderSupport: false,
        keyboardNavigation: false
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
      case 'live-session': return <Users className="w-4 h-4 text-sky-500" />;
      case 'workshop': return <PenTool className="w-4 h-4 text-lime-500" />;
      case 'case-study': return <FileText className="w-4 h-4 text-gray-700" />;
      case 'simulation': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'assessment': return <BarChart3 className="w-4 h-4 text-teal-500" />;
      case 'certification': return <Award className="w-4 h-4 text-amber-500" />;
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
              <Button variant="outline" onClick={() => window.close()}>
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
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>Basic course details and metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Course Category</Label>
                    <Select value={course.category} onValueChange={(value) => setCourse(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business">💼 Business & Entrepreneurship</SelectItem>
                        <SelectItem value="Technology">💻 Technology & Programming</SelectItem>
                        <SelectItem value="Marketing">📈 Marketing & Sales</SelectItem>
                        <SelectItem value="Design">🎨 Design & Creative</SelectItem>
                        <SelectItem value="Finance">💰 Finance & Investment</SelectItem>
                        <SelectItem value="Health">🏥 Health & Wellness</SelectItem>
                        <SelectItem value="Education">📚 Education & Training</SelectItem>
                        <SelectItem value="Personal">🌱 Personal Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Difficulty Level</Label>
                    <Select value={course.difficulty} onValueChange={(value: any) => setCourse(prev => ({ ...prev, difficulty: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">🌱 Beginner - No prior experience needed</SelectItem>
                        <SelectItem value="intermediate">📈 Intermediate - Some experience helpful</SelectItem>
                        <SelectItem value="advanced">🚀 Advanced - Significant experience required</SelectItem>
                        <SelectItem value="expert">🏆 Expert - Master level content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Course Language</Label>
                    <Select value={course.language} onValueChange={(value) => setCourse(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">🇺🇸 English</SelectItem>
                        <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                        <SelectItem value="French">🇫🇷 French</SelectItem>
                        <SelectItem value="German">🇩🇪 German</SelectItem>
                        <SelectItem value="Chinese">🇨🇳 Chinese</SelectItem>
                        <SelectItem value="Japanese">🇯🇵 Japanese</SelectItem>
                        <SelectItem value="Portuguese">🇵🇹 Portuguese</SelectItem>
                        <SelectItem value="Russian">🇷🇺 Russian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Course Tags</Label>
                    <Input
                      placeholder="Enter tags separated by commas..."
                      value={course.tags.join(', ')}
                      onChange={(e) => setCourse(prev => ({ 
                        ...prev, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) 
                      }))}
                    />
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

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Downloads</div>
                          <div className="text-xs text-gray-600">Downloadable resources</div>
                        </div>
                        <Switch
                          checked={course.downloadableResources}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, downloadableResources: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Mobile Access</div>
                          <div className="text-xs text-gray-600">Mobile app support</div>
                        </div>
                        <Switch
                          checked={course.mobileAccess}
                          onCheckedChange={(checked) => setCourse(prev => ({ ...prev, mobileAccess: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enrollment Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment & Access</CardTitle>
                  <CardDescription>Manage student enrollment and access control</CardDescription>
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
                        onChange={(e) => setCourse(prev => ({ ...prev, currentEnrollments: parseInt(e.target.value) || 0 }))}
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
                        <SelectItem value="automatic">🔄 Automatic - Instant enrollment</SelectItem>
                        <SelectItem value="manual">👤 Manual - Instructor approval required</SelectItem>
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

                  {/* Access Control */}
                  <div>
                    <Label>Access Requirements</Label>
                    <div className="space-y-2 mt-2">
                      {course.requirements.map((req, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={req}
                            onChange={(e) => {
                              const newReqs = [...course.requirements];
                              newReqs[index] = e.target.value;
                              setCourse(prev => ({ ...prev, requirements: newReqs }));
                            }}
                            placeholder="e.g., Basic computer skills"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newReqs = course.requirements.filter((_, i) => i !== index);
                              setCourse(prev => ({ ...prev, requirements: newReqs }));
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
                          requirements: [...prev.requirements, ''] 
                        }))}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Requirement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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