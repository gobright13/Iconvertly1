import React, { useState } from 'react';
import { ArrowLeft, Upload, Palette, MessageSquare, Zap, CheckCircle, Circle, ArrowRight, Sparkles, Target, Users, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AIFunnelGeneratorProps {
  onComplete: (funnelData: any) => void;
  onBack: () => void;
}

interface BusinessInfo {
  businessName: string;
  industry: string;
  targetAudience: string;
  mainOffer: string;
  pricePoint: string;
  uniqueValue: string;
  goals: string;
  currentChallenges: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: File;
  tone: string;
  funnelType: string;
}

const AIFunnelGenerator: React.FC<AIFunnelGeneratorProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    industry: '',
    targetAudience: '',
    mainOffer: '',
    pricePoint: '',
    uniqueValue: '',
    goals: '',
    currentChallenges: '',
    brandColors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B'
    },
    tone: '',
    funnelType: ''
  });
  const [generationProgress, setGenerationProgress] = useState(0);

  const steps = [
    { id: 1, title: 'Business Info', description: 'Tell us about your business' },
    { id: 2, title: 'Offer Details', description: 'Describe your main offer' },
    { id: 3, title: 'Brand & Style', description: 'Upload logo and set colors' },
    { id: 4, title: 'AI Generation', description: 'AI creates your funnel' }
  ];

  const industries = [
    'Technology/SaaS', 'E-commerce/Retail', 'Coaching/Consulting', 'Health & Fitness',
    'Real Estate', 'Finance/Insurance', 'Education/Training', 'Marketing/Advertising',
    'Professional Services', 'Food & Beverage', 'Fashion/Beauty', 'Travel/Hospitality'
  ];

  const funnelTypes = [
    { value: 'lead-generation', label: 'Lead Generation', description: 'Capture leads with valuable content' },
    { value: 'sales', label: 'Sales Funnel', description: 'Direct sales to customers' },
    { value: 'webinar', label: 'Webinar Funnel', description: 'Education-based selling' },
    { value: 'application', label: 'Application Funnel', description: 'High-ticket service sales' },
    { value: 'product-launch', label: 'Product Launch', description: 'New product introduction' },
    { value: 'membership', label: 'Membership Funnel', description: 'Recurring subscription sales' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'urgent', label: 'Urgent', description: 'Time-sensitive and action-focused' },
    { value: 'luxury', label: 'Luxury', description: 'Premium and exclusive' },
    { value: 'educational', label: 'Educational', description: 'Informative and helpful' }
  ];

  const pricePoints = [
    'Free/Lead Magnet', 'Under $100', '$100-$500', '$500-$1,000', 
    '$1,000-$5,000', '$5,000-$10,000', '$10,000+'
  ];

  const handleInputChange = (field: keyof BusinessInfo, value: any) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      brandColors: {
        ...prev.brandColors,
        [colorType]: value
      }
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBusinessInfo(prev => ({
        ...prev,
        logo: file
      }));
      toast.success('Logo uploaded successfully');
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return businessInfo.businessName && businessInfo.industry && businessInfo.targetAudience;
      case 2:
        return businessInfo.mainOffer && businessInfo.pricePoint && businessInfo.uniqueValue && businessInfo.funnelType;
      case 3:
        return businessInfo.tone;
      default:
        return true;
    }
  };

  const generateFunnel = async () => {
    setIsGenerating(true);
    setCurrentStep(4);
    
    // Simulate AI generation process
    const steps = [
      'Analyzing your business model...',
      'Understanding your target audience...',
      'Crafting compelling headlines...',
      'Designing page layouts...',
      'Optimizing for conversions...',
      'Setting up email sequences...',
      'Applying your brand colors...',
      'Final optimization...',
      'Your funnel is ready!'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(((i + 1) / steps.length) * 100);
      toast.success(steps[i]);
    }

    // Generate the funnel data based on user input
    const generatedFunnel = {
      id: Date.now(),
      title: `${businessInfo.businessName} - ${businessInfo.funnelType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Funnel`,
      type: businessInfo.funnelType,
      businessInfo,
      steps: generateFunnelSteps(),
      design: {
        colors: businessInfo.brandColors,
        tone: businessInfo.tone,
        logo: businessInfo.logo
      },
      created: new Date().toISOString()
    };

    setTimeout(() => {
      setIsGenerating(false);
      onComplete(generatedFunnel);
    }, 1000);
  };

  const generateFunnelSteps = () => {
    // Generate steps based on funnel type and business info
    const baseSteps = {
      'lead-generation': [
        {
          id: 1,
          title: 'Landing Page',
          type: 'landing-page',
          content: {
            headline: `Get Your FREE ${businessInfo.mainOffer}`,
            subheadline: `Discover how ${businessInfo.targetAudience} can ${businessInfo.uniqueValue}`,
            ctaText: 'Get Instant Access',
            benefits: [
              `Perfect for ${businessInfo.targetAudience}`,
              'Proven strategies that work',
              'Immediate access after signup',
              'No spam, unsubscribe anytime'
            ]
          }
        },
        {
          id: 2,
          title: 'Thank You Page',
          type: 'thank-you',
          content: {
            headline: 'Success! Check Your Email',
            message: `Your ${businessInfo.mainOffer} is on its way to your inbox.`
          }
        },
        {
          id: 3,
          title: 'Email Sequence',
          type: 'email',
          content: {
            sequence: [
              {
                subject: `📧 Your ${businessInfo.mainOffer} (Download Inside)`,
                content: `Welcome! Here's your ${businessInfo.mainOffer}...`
              }
            ]
          }
        }
      ],
      'sales': [
        {
          id: 1,
          title: 'Sales Page',
          type: 'sales-page',
          content: {
            headline: `Transform Your ${businessInfo.targetAudience} Experience with ${businessInfo.mainOffer}`,
            price: businessInfo.pricePoint,
            benefits: businessInfo.uniqueValue.split(',').map(b => b.trim())
          }
        },
        {
          id: 2,
          title: 'Checkout',
          type: 'checkout',
          content: {
            product: businessInfo.mainOffer,
            price: businessInfo.pricePoint
          }
        }
      ]
    };

    return baseSteps[businessInfo.funnelType as keyof typeof baseSteps] || baseSteps['lead-generation'];
  };

  const nextStep = () => {
    if (canProceedToNext()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        generateFunnel();
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={businessInfo.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="e.g., Acme Marketing Solutions"
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={businessInfo.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience *</Label>
              <Textarea
                id="targetAudience"
                value={businessInfo.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Small business owners who struggle with digital marketing and want to generate more leads online"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="goals">What are your main goals with this funnel?</Label>
              <Textarea
                id="goals"
                value={businessInfo.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="e.g., Generate 100 qualified leads per month, Increase email list by 50%, Convert 20% of leads to customers"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="challenges">What are your current biggest challenges?</Label>
              <Textarea
                id="challenges"
                value={businessInfo.currentChallenges}
                onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                placeholder="e.g., Low conversion rates, High traffic but few sales, Difficulty nurturing leads"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="funnelType">Funnel Type *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {funnelTypes.map(type => (
                  <Card 
                    key={type.value} 
                    className={`cursor-pointer transition-all ${
                      businessInfo.funnelType === type.value 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleInputChange('funnelType', type.value)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{type.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="mainOffer">Main Offer/Product *</Label>
              <Input
                id="mainOffer"
                value={businessInfo.mainOffer}
                onChange={(e) => handleInputChange('mainOffer', e.target.value)}
                placeholder="e.g., Digital Marketing Masterclass, Business Coaching Program, E-book on Sales"
              />
            </div>

            <div>
              <Label htmlFor="pricePoint">Price Point *</Label>
              <Select value={businessInfo.pricePoint} onValueChange={(value) => handleInputChange('pricePoint', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {pricePoints.map(price => (
                    <SelectItem key={price} value={price}>{price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="uniqueValue">Unique Value Proposition *</Label>
              <Textarea
                id="uniqueValue"
                value={businessInfo.uniqueValue}
                onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                placeholder="e.g., The only marketing system that guarantees 10x ROI in 90 days or your money back"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Brand Logo</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Upload your logo
                    </span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
                {businessInfo.logo && (
                  <div className="mt-2">
                    <Badge variant="secondary">✓ Logo uploaded</Badge>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Brand Colors</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <Label htmlFor="primary" className="text-sm">Primary</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      id="primary"
                      value={businessInfo.brandColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <Input
                      value={businessInfo.brandColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary" className="text-sm">Secondary</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      id="secondary"
                      value={businessInfo.brandColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <Input
                      value={businessInfo.brandColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accent" className="text-sm">Accent</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      id="accent"
                      value={businessInfo.brandColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <Input
                      value={businessInfo.brandColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Communication Tone *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {tones.map(tone => (
                  <Card 
                    key={tone.value} 
                    className={`cursor-pointer transition-all ${
                      businessInfo.tone === tone.value 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleInputChange('tone', tone.value)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{tone.label}</div>
                      <div className="text-sm text-muted-foreground">{tone.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">AI is Creating Your Funnel</h3>
              <p className="text-muted-foreground">
                Our AI is analyzing your business and crafting a personalized funnel that converts
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Progress value={generationProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {generationProgress.toFixed(0)}% Complete
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Target className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <div className="text-sm font-medium">Optimized</div>
                <div className="text-xs text-muted-foreground">Headlines</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <div className="text-sm font-medium">Targeted</div>
                <div className="text-xs text-muted-foreground">Audience</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Palette className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                <div className="text-sm font-medium">Brand</div>
                <div className="text-xs text-muted-foreground">Consistency</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                <div className="text-sm font-medium">High</div>
                <div className="text-xs text-muted-foreground">Converting</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} disabled={isGenerating}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Funnel Generator
              </h1>
              <p className="text-muted-foreground mt-1">
                Let AI create a high-converting funnel tailored to your business
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">AI Powered</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > step.id 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              {steps.find(s => s.id === currentStep)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === 3 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Funnel
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFunnelGenerator;