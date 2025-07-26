import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Clock, Users, Star, ChevronRight, Play, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FunnelTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  type: 'lead-generation' | 'sales' | 'full-funnel';
  stepCount: number;
  difficulty: 'basic' | 'advanced';
  estimatedTime: string;
  preview: string;
  features: string[];
  thumbnail: string;
  rating: number;
  uses: number;
  steps: FunnelStep[];
}

interface FunnelStep {
  id: number;
  title: string;
  type: 'landing-page' | 'form' | 'email' | 'thank-you' | 'sales-page' | 'checkout' | 'upsell';
  description: string;
  content: any;
  design: any;
}

interface FunnelTemplateSelectorProps {
  onSelectTemplate: (template: FunnelTemplate) => void;
  onBack: () => void;
}

const FunnelTemplateSelector: React.FC<FunnelTemplateSelectorProps> = ({ onSelectTemplate, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Comprehensive Funnel Templates with detailed step-by-step designs
  const funnelTemplates: FunnelTemplate[] = [
    {
      id: 1,
      name: "Lead Generation Masterclass",
      description: "Complete lead magnet funnel with email capture and nurture sequence",
      category: "Lead Generation",
      type: "lead-generation",
      stepCount: 5,
      difficulty: "basic",
      estimatedTime: "30 min",
      preview: "Landing Page → Lead Magnet → Email Capture → Thank You → Email Sequence",
      features: ["High-converting landing page", "Lead magnet delivery", "Email automation", "Follow-up sequence"],
      thumbnail: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop",
      rating: 4.8,
      uses: 1247,
      steps: [
        {
          id: 1,
          title: "Landing Page",
          type: "landing-page",
          description: "High-converting landing page with compelling headline and CTA",
          content: {
            headline: "Get Your FREE Digital Marketing Blueprint",
            subheadline: "Discover the exact strategies I used to generate $100K+ in 90 days",
            bulletPoints: [
              "Proven lead generation tactics",
              "Social media automation secrets",  
              "Email marketing templates",
              "Conversion optimization tips"
            ],
            ctaText: "Download Now - FREE",
            testimonials: [
              { name: "Sarah Johnson", text: "This blueprint transformed my business!", avatar: "" },
              { name: "Mike Chen", text: "Generated 500+ leads in first month", avatar: "" }
            ]
          },
          design: {
            layout: "hero-with-form",
            colors: { primary: "#3B82F6", secondary: "#10B981", accent: "#F59E0B" },
            fonts: { heading: "Inter", body: "Open Sans" },
            spacing: "comfortable"
          }
        },
        {
          id: 2,
          title: "Lead Magnet Form",
          type: "form",
          description: "Simple email capture form with minimal friction",
          content: {
            fields: [
              { type: "email", label: "Email Address", required: true, placeholder: "Enter your best email" },
              { type: "text", label: "First Name", required: true, placeholder: "First name" }
            ],
            privacyText: "We respect your privacy. Unsubscribe at any time.",
            submitText: "Get Instant Access"
          },
          design: {
            style: "modern",
            buttonColor: "#10B981",
            fieldStyle: "rounded",
            layout: "vertical"
          }
        },
        {
          id: 3,
          title: "Thank You Page",
          type: "thank-you",
          description: "Confirmation page with next steps and social proof",
          content: {
            headline: "Success! Check Your Email",
            message: "Your Digital Marketing Blueprint is on its way to your inbox.",
            nextSteps: [
              "Check your email for the download link",
              "Add us to your contacts to ensure delivery",
              "Follow us on social media for daily tips"
            ],
            socialLinks: ["facebook", "twitter", "instagram", "linkedin"]
          },
          design: {
            style: "celebration",
            iconType: "checkmark",
            colors: { success: "#10B981" }
          }
        },
        {
          id: 4,
          title: "Email Delivery",
          type: "email",
          description: "Immediate delivery email with lead magnet attachment",
          content: {
            subject: "📧 Your Digital Marketing Blueprint (Download Inside)",
            preheader: "Everything you need to start generating leads today",
            body: `
              <h2>Welcome to the Digital Marketing Community!</h2>
              <p>Thank you for downloading the Digital Marketing Blueprint. Here's what you'll discover:</p>
              <ul>
                <li>5 lead generation strategies that work in 2024</li>
                <li>Email templates that convert at 25%+</li>
                <li>Social media automation tools</li>
                <li>Landing page optimization secrets</li>
              </ul>
              <p><a href="[DOWNLOAD_LINK]" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Download Your Blueprint Now</a></p>
            `,
            attachments: ["digital-marketing-blueprint.pdf"]
          },
          design: {
            template: "professional",
            colors: { primary: "#3B82F6", secondary: "#10B981" }
          }
        },
        {
          id: 5,
          title: "Email Sequence",
          type: "email",
          description: "5-email nurture sequence to build trust and relationship",
          content: {
            emails: [
              {
                day: 1,
                subject: "Did you download your blueprint?",
                content: "Quick check-in to make sure you received your Digital Marketing Blueprint..."
              },
              {
                day: 3,
                subject: "The #1 mistake most marketers make",
                content: "I see this mistake everywhere, and it's costing businesses thousands..."
              },
              {
                day: 5,
                subject: "Case study: How Sarah generated 1,000 leads",
                content: "I want to share Sarah's incredible success story with you..."
              },
              {
                day: 7,
                subject: "My personal lead generation system",
                content: "After 10 years in marketing, here's my exact system..."
              },
              {
                day: 10,
                subject: "Ready to take your marketing to the next level?",
                content: "If you've been following along, you're ready for the advanced strategies..."
              }
            ]
          },
          design: {
            template: "story-based",
            personalTone: true
          }
        }
      ]
    },
    {
      id: 2,
      name: "High-Ticket Sales Funnel",
      description: "Premium coaching/consulting sales funnel with application process",
      category: "Sales",
      type: "sales",
      stepCount: 7,
      difficulty: "advanced",
      estimatedTime: "60 min",
      preview: "Landing → Application → Discovery Call → Proposal → Close → Onboarding → Delivery",
      features: ["Application screening", "Discovery call booking", "Proposal automation", "Premium positioning"],
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      rating: 4.9,
      uses: 843,
      steps: [
        {
          id: 1,
          title: "Premium Landing Page",
          type: "landing-page",
          description: "High-value positioning page for premium services",
          content: {
            headline: "Transform Your Business in 90 Days",
            subheadline: "Elite 1-on-1 Business Coaching Program - Limited Spots Available",
            bulletPoints: [
              "Private 1-on-1 coaching calls",
              "Custom business strategy development",
              "Direct access via private Slack",
              "90-day guarantee or money back"
            ],
            ctaText: "Apply Now - Limited Spots",
            testimonials: [
              { name: "Jennifer Adams", text: "Increased revenue by 300% in 6 months", result: "$50K → $200K MRR" },
              { name: "David Park", text: "Scaled from solo consultant to 10-person agency", result: "$0 → $100K/month" }
            ],
            priceAnchor: "$25,000 value"
          },
          design: {
            layout: "premium-hero",
            colors: { primary: "#1F2937", secondary: "#F59E0B", accent: "#EF4444" },
            style: "luxury",
            sections: ["hero", "benefits", "testimonials", "application"]
          }
        },
        {
          id: 2,
          title: "Application Form",
          type: "form",
          description: "Detailed application to qualify serious prospects",
          content: {
            fields: [
              { type: "text", label: "Full Name", required: true },
              { type: "email", label: "Email Address", required: true },
              { type: "tel", label: "Phone Number", required: true },
              { type: "select", label: "Current Business Revenue", options: ["$0-10K", "$10K-50K", "$50K-100K", "$100K+"] },
              { type: "textarea", label: "What's your biggest business challenge right now?", required: true },
              { type: "textarea", label: "What would success look like for you in 90 days?", required: true },
              { type: "select", label: "Are you ready to invest $5K-15K in your business growth?", options: ["Yes, absolutely", "Maybe, need more info", "No, not at this time"] }
            ],
            qualificationLogic: true,
            submitText: "Submit Application"
          },
          design: {
            style: "professional",
            progressBar: true,
            multiStep: true
          }
        },
        {
          id: 3,
          title: "Discovery Call Booking",
          type: "form",
          description: "Calendar booking for qualified applicants",
          content: {
            headline: "Congratulations! Your Application Has Been Approved",
            description: "Book your complimentary 45-minute Strategy Session where we'll:",
            benefits: [
              "Analyze your current business model",
              "Identify your biggest growth opportunities", 
              "Create a custom 90-day action plan",
              "Determine if our program is a good fit"
            ],
            calendarSettings: {
              duration: 45,
              timeZone: "auto",
              bufferTime: 15,
              maxAdvanceBooking: 14
            }
          },
          design: {
            style: "appointment",
            layout: "calendar-right"
          }
        }
      ]
    },
    {
      id: 3,
      name: "E-commerce Product Launch",
      description: "Complete product launch funnel with pre-launch sequence",
      category: "E-commerce",
      type: "full-funnel",
      stepCount: 10,
      difficulty: "advanced",
      estimatedTime: "90 min",
      preview: "Teaser → Pre-launch → Early Bird → Launch → Upsell → Cross-sell → Follow-up → Reviews → Retention → Referral",
      features: ["Pre-launch buzz building", "Early bird discounts", "Upsell sequences", "Review automation"],
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      rating: 4.7,
      uses: 692,
      steps: [
        {
          id: 1,
          title: "Coming Soon Teaser",
          type: "landing-page", 
          description: "Build anticipation with coming soon page",
          content: {
            headline: "Something Amazing Is Coming...",
            subheadline: "Be the first to know when we launch our revolutionary new product",
            countdownDate: "2024-02-15",
            earlyBirdOffer: "Get 30% off as an early supporter",
            ctaText: "Get Notified First"
          },
          design: {
            style: "minimal-teaser",
            animation: "fadeIn",
            countdown: true
          }
        }
      ]
    },
    {
      id: 4,
      name: "SaaS Free Trial Funnel",
      description: "Convert visitors to trial users and paying subscribers",
      category: "SaaS",
      type: "full-funnel",
      stepCount: 8,
      difficulty: "advanced",
      estimatedTime: "75 min",
      preview: "Landing → Demo → Trial → Onboarding → Feature Education → Upgrade → Success → Retention",
      features: ["Interactive demo", "Progressive onboarding", "Feature adoption tracking", "Upgrade prompts"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      rating: 4.8,
      uses: 1156,
      steps: []
    },
    {
      id: 5,
      name: "Webinar Registration Funnel",
      description: "Drive webinar registrations and maximize attendance",
      category: "Education",
      type: "lead-generation",
      stepCount: 6,
      difficulty: "basic",
      estimatedTime: "45 min",
      preview: "Registration → Confirmation → Reminders → Attendance → Replay → Follow-up",
      features: ["Registration optimization", "Automated reminders", "Replay sequence", "Pitch integration"],
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
      rating: 4.6,
      uses: 2341,
      steps: []
    },
    {
      id: 6,
      name: "Membership Site Funnel",
      description: "Recruit and retain membership site subscribers",
      category: "Membership",
      type: "full-funnel",
      stepCount: 9,
      difficulty: "advanced", 
      estimatedTime: "85 min",
      preview: "Preview → Free Trial → Onboarding → Engagement → Retention → Upgrades → Community → Referrals → Win-back",
      features: ["Member onboarding", "Engagement sequences", "Churn prevention", "Community building"],
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      rating: 4.5,
      uses: 567,
      steps: []
    }
  ];

  const categories = ['all', 'Lead Generation', 'Sales', 'E-commerce', 'SaaS', 'Education', 'Membership'];
  const types = ['all', 'lead-generation', 'sales', 'full-funnel'];

  const filteredTemplates = funnelTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    return difficulty === 'basic' ? 'bg-green-500' : 'bg-orange-500';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lead-generation': return 'bg-blue-500';
      case 'sales': return 'bg-purple-500';
      case 'full-funnel': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Funnel Template
            </h1>
            <p className="text-muted-foreground mt-2">
              Select from our library of high-converting funnel templates
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                {category === 'all' ? 'All' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Tabs value={selectedType} onValueChange={setSelectedType} className="w-auto">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="lead-generation">Lead Gen</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="full-funnel">Complete</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={`text-white ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </Badge>
                <Badge className={`text-white ${getTypeColor(template.type)}`}>
                  {template.type.replace('-', ' ')}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {template.stepCount} steps
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {template.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {template.uses.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {template.rating}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Preview Flow */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Funnel Flow:</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.preview}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedType('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FunnelTemplateSelector;