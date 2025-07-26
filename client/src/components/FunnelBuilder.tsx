import React, { useState } from 'react';
import { ArrowLeft, Sparkles, FileText, Pencil, Plus, Edit, Save, Eye, Trash2, Copy, Settings, TrendingUp, Target, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FunnelSequenceEditor from './FunnelSequenceEditor';
import PuckFunnelEditor from './PuckFunnelEditor';

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
}

export default function FunnelBuilder() {
  const [view, setView] = useState<'main' | 'type-selection' | 'template-selection' | 'sequence-editor' | 'advanced-editor'>('main');
  const [selectedType, setSelectedType] = useState<'lead-generation' | 'sales' | 'full-funnel' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<FunnelTemplate | null>(null);
  const [currentCreationFlow, setCurrentCreationFlow] = useState<'ai' | 'template' | 'scratch'>('template');
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Main view state - moved inside component to fix hooks
  const [savedFunnels, setSavedFunnels] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedFunnels') || '[]');
    } catch (error) {
      console.error('Error loading saved funnels:', error);
      return [];
    }
  });
  const [dashboardView, setDashboardView] = useState<'all' | 'active' | 'draft' | 'paused'>('all');

  // Comprehensive Funnel Templates - Extensive Industry Coverage
  const funnelTemplates: FunnelTemplate[] = [
    // E-commerce & Retail
    {
      id: 1,
      name: "E-commerce Sales Funnel",
      description: "Complete product sales funnel with upsells and abandoned cart recovery",
      category: "E-commerce",
      type: "sales",
      stepCount: 8,
      difficulty: "advanced",
      estimatedTime: "65 min",
      preview: "Product Page → Add to Cart → Checkout → Upsell → Cross-sell → Order Confirm → Follow-up → Reviews",
      features: ["Product showcase", "Cart abandonment recovery", "One-click upsells", "Cross-sell recommendations", "Review automation", "Customer retention"]
    },
    {
      id: 2,
      name: "Subscription Box Funnel",
      description: "Convert visitors to recurring subscribers with trial offers",
      category: "E-commerce",
      type: "full-funnel",
      stepCount: 10,
      difficulty: "advanced",
      estimatedTime: "75 min",
      preview: "Landing → Quiz → Product Match → Trial Offer → Checkout → Onboarding → Retention → Upgrade → Referral → Winback",
      features: ["Personalization quiz", "Trial offers", "Subscription management", "Churn prevention", "Referral program", "Win-back campaigns"]
    },

    // SaaS & Software
    {
      id: 3,
      name: "SaaS Free Trial Funnel",
      description: "Convert visitors to trial users and paying subscribers",
      category: "SaaS",
      type: "full-funnel",
      stepCount: 12,
      difficulty: "advanced",
      estimatedTime: "90 min",
      preview: "Landing → Demo → Trial Signup → Onboarding → Feature Education → Usage Tracking → Upgrade Prompts → Conversion → Success → Expansion → Advocacy → Retention",
      features: ["Interactive demos", "Progressive onboarding", "Usage-based triggers", "Feature adoption", "Expansion revenue", "Customer success"]
    },
    {
      id: 4,
      name: "B2B Software Demo Funnel",
      description: "Generate qualified leads and book high-value demo calls",
      category: "SaaS",
      type: "lead-generation",
      stepCount: 7,
      difficulty: "advanced",
      estimatedTime: "55 min",
      preview: "Landing → Lead Magnet → Qualification → Demo Booking → Confirmation → Pre-demo → Follow-up",
      features: ["Lead qualification", "Calendar integration", "Pre-demo preparation", "Demo automation", "Follow-up sequences", "Sales handoff"]
    },

    // Coaching & Consulting
    {
      id: 5,
      name: "High-Ticket Coaching Funnel",
      description: "Attract premium clients for high-value coaching programs",
      category: "Coaching",
      type: "full-funnel",
      stepCount: 9,
      difficulty: "advanced",
      estimatedTime: "70 min",
      preview: "Content → Lead Magnet → Application → Discovery Call → Proposal → Objection Handling → Close → Onboarding → Delivery",
      features: ["Application forms", "Discovery call booking", "Proposal automation", "Objection handling", "Premium positioning", "Client onboarding"]
    },
    {
      id: 6,
      name: "Mastermind Group Funnel",
      description: "Build exclusive mastermind communities with recurring revenue",
      category: "Coaching",
      type: "full-funnel",
      stepCount: 8,
      difficulty: "advanced",
      estimatedTime: "60 min",
      preview: "Content → Application → Interview → Acceptance → Payment → Onboarding → Community → Retention",
      features: ["Exclusivity positioning", "Application process", "Interview scheduling", "Community building", "Retention strategies", "Member success"]
    },

    // Health & Fitness
    {
      id: 7,
      name: "Fitness Program Funnel",
      description: "Convert leads into fitness program participants",
      category: "Health & Fitness",
      type: "sales",
      stepCount: 6,
      difficulty: "basic",
      estimatedTime: "40 min",
      preview: "Challenge → Registration → Free Content → Program Offer → Checkout → Support",
      features: ["Fitness challenges", "Transformation stories", "Program previews", "Community support", "Progress tracking", "Success coaching"]
    },
    {
      id: 8,
      name: "Nutrition Consultation Funnel",
      description: "Generate leads for personalized nutrition consultations",
      category: "Health & Fitness",
      type: "lead-generation",
      stepCount: 5,
      difficulty: "basic",
      estimatedTime: "35 min",
      preview: "Assessment → Results → Consultation Offer → Booking → Follow-up",
      features: ["Health assessments", "Personalized recommendations", "Consultation booking", "Nutrition plans", "Follow-up care", "Supplement sales"]
    },

    // Real Estate
    {
      id: 9,
      name: "Real Estate Investor Funnel",
      description: "Generate qualified real estate investment leads",
      category: "Real Estate",
      type: "lead-generation",
      stepCount: 7,
      difficulty: "basic",
      estimatedTime: "45 min",
      preview: "Market Report → Registration → Property Analysis → Investment Calculator → Consultation → Qualification → Follow-up",
      features: ["Market reports", "Property analysis tools", "ROI calculators", "Investment education", "Consultation booking", "Deal flow"]
    },
    {
      id: 10,
      name: "Home Buyer Funnel",
      description: "Guide home buyers through the purchasing process",
      category: "Real Estate",
      type: "full-funnel",
      stepCount: 8,
      difficulty: "basic",
      estimatedTime: "50 min",
      preview: "Home Search → Registration → Mortgage Pre-qual → Property Tours → Offer Assistance → Closing Support → Referrals → Retention",
      features: ["Property search", "Mortgage assistance", "Tour scheduling", "Offer guidance", "Closing coordination", "Referral generation"]
    },

    // Digital Marketing & Agency
    {
      id: 11,
      name: "Agency Lead Generation Funnel",
      description: "Generate high-quality leads for marketing agencies",
      category: "Digital Marketing",
      type: "lead-generation",
      stepCount: 6,
      difficulty: "advanced",
      estimatedTime: "50 min",
      preview: "Case Study → Free Audit → Report Delivery → Strategy Call → Proposal → Follow-up",
      features: ["Case study showcases", "Free audits", "Strategy sessions", "Proposal automation", "Competitive analysis", "ROI demonstrations"]
    },
    {
      id: 12,
      name: "Course Creator Funnel",
      description: "Launch and sell online courses with maximum conversions",
      category: "Education",
      type: "full-funnel",
      stepCount: 10,
      difficulty: "advanced",
      estimatedTime: "80 min",
      preview: "Free Training → Registration → Course Preview → Early Bird → Cart Open → Urgency → Bonus → Close → Onboarding → Success",
      features: ["Free training events", "Course previews", "Early bird pricing", "Urgency sequences", "Bonus stacking", "Student success"]
    },

    // Financial Services
    {
      id: 13,
      name: "Financial Planning Funnel",
      description: "Generate leads for financial planning services",
      category: "Finance",
      type: "lead-generation",
      stepCount: 6,
      difficulty: "basic",
      estimatedTime: "40 min",
      preview: "Retirement Calculator → Report → Consultation Offer → Booking → Preparation → Follow-up",
      features: ["Financial calculators", "Retirement planning", "Investment analysis", "Risk assessment", "Consultation booking", "Plan creation"]
    },
    {
      id: 14,
      name: "Insurance Sales Funnel",
      description: "Convert leads into insurance policy holders",
      category: "Finance",
      type: "sales",
      stepCount: 7,
      difficulty: "basic",
      estimatedTime: "45 min",
      preview: "Quote Request → Instant Quote → Comparison → Consultation → Application → Approval → Policy Delivery",
      features: ["Instant quotes", "Coverage comparison", "Risk assessment", "Application processing", "Policy management", "Claims support"]
    },

    // Professional Services
    {
      id: 15,
      name: "Legal Services Funnel",
      description: "Generate leads for legal consultation services",
      category: "Legal",
      type: "lead-generation",
      stepCount: 5,
      difficulty: "basic",
      estimatedTime: "35 min",
      preview: "Legal Guide → Consultation Offer → Intake Form → Consultation → Follow-up",
      features: ["Legal guides", "Case evaluation", "Consultation booking", "Intake automation", "Document preparation", "Client onboarding"]
    },
    {
      id: 16,
      name: "Accounting Firm Funnel",
      description: "Attract small business owners for accounting services",
      category: "Professional Services",
      type: "lead-generation",
      stepCount: 6,
      difficulty: "basic",
      estimatedTime: "40 min",
      preview: "Tax Calculator → Business Analysis → Service Match → Consultation → Proposal → Onboarding",
      features: ["Tax calculators", "Business analysis", "Service matching", "Proposal automation", "Client onboarding", "Ongoing support"]
    },

    // Restaurant & Food
    {
      id: 17,
      name: "Restaurant Loyalty Funnel",
      description: "Build customer loyalty and increase repeat visits",
      category: "Food & Beverage",
      type: "full-funnel",
      stepCount: 7,
      difficulty: "basic",
      estimatedTime: "35 min",
      preview: "First Visit → App Download → Loyalty Signup → Rewards → Referrals → VIP Status → Retention",
      features: ["Loyalty programs", "Mobile app integration", "Reward systems", "Referral incentives", "VIP experiences", "Customer retention"]
    },

    // Travel & Hospitality
    {
      id: 18,
      name: "Travel Booking Funnel",
      description: "Convert travel interest into bookings and upsells",
      category: "Travel",
      type: "sales",
      stepCount: 8,
      difficulty: "basic",
      estimatedTime: "55 min",
      preview: "Destination Guide → Trip Planning → Quote Request → Booking → Upsells → Preparation → Experience → Follow-up",
      features: ["Destination guides", "Trip planning tools", "Dynamic pricing", "Experience upsells", "Travel insurance", "Post-trip engagement"]
    },

    // Technology & Software
    {
      id: 19,
      name: "App Download Funnel",
      description: "Maximize mobile app downloads and user engagement",
      category: "Technology",
      type: "full-funnel",
      stepCount: 9,
      difficulty: "advanced",
      estimatedTime: "60 min",
      preview: "Landing → Demo Video → Download → Onboarding → Feature Discovery → Engagement → Premium Upgrade → Retention → Advocacy",
      features: ["App store optimization", "Demo videos", "Onboarding flows", "Feature adoption", "Premium upgrades", "User retention"]
    },

    // Automotive
    {
      id: 20,
      name: "Auto Dealership Funnel",
      description: "Generate qualified leads for vehicle sales",
      category: "Automotive",
      type: "lead-generation",
      stepCount: 6,
      difficulty: "basic",
      estimatedTime: "40 min",
      preview: "Vehicle Search → Lead Capture → Financing Options → Test Drive → Negotiation → Purchase",
      features: ["Inventory search", "Financing calculators", "Test drive booking", "Trade-in valuations", "Negotiation tools", "Purchase processing"]
    }
  ];

  // Main View - Creation Options with Dashboard
  const filteredFunnels = savedFunnels.filter((funnel: any) => {
    if (dashboardView === 'all') return true;
    return funnel.status === dashboardView;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Sparkles className="w-4 h-4 text-green-600" />;
      case 'draft': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'paused': return <Settings className="w-4 h-4 text-yellow-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (view === 'main') {

    

    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-coral-500 to-navy-600 bg-clip-text text-transparent">
            Funnel Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create high-converting funnels with AI-powered templates, drag-and-drop editor, and automated email sequences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* AI Generated */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-coral-200"
            onClick={() => {
              setCurrentCreationFlow('ai');
              setView('type-selection');
            }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-coral-100 to-coral-200 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-coral-600" />
              </div>
              <CardTitle className="text-xl">AI Generated</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Let AI create personalized funnel content and steps
              </p>
              <Badge variant="secondary" className="bg-coral-100 text-coral-700">
                Powered by AI
              </Badge>
            </CardContent>
          </Card>

          {/* Use Template */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-navy-200"
            onClick={() => {
              setCurrentCreationFlow('template');
              setView('type-selection');
            }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-navy-100 to-navy-200 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-navy-600" />
              </div>
              <CardTitle className="text-xl">Use Template</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Start with professionally designed funnel templates
              </p>
              <Badge variant="secondary" className="bg-navy-100 text-navy-700">
                Pre-designed
              </Badge>
            </CardContent>
          </Card>

          {/* Start from Scratch */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-purple-200"
            onClick={() => {
              setCurrentCreationFlow('scratch');
              setView('type-selection');
            }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                <Pencil className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Start from Scratch</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Build your funnel from the ground up with full control
              </p>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Custom Build
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Funnels</h2>
            <div className="flex items-center space-x-4">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={dashboardView === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDashboardView('all')}
                >
                  All ({savedFunnels.length})
                </Button>
                <Button
                  variant={dashboardView === 'active' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDashboardView('active')}
                >
                  Active ({savedFunnels.filter((f: any) => f.status === 'active').length})
                </Button>
                <Button
                  variant={dashboardView === 'draft' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDashboardView('draft')}
                >
                  Drafts ({savedFunnels.filter((f: any) => f.status === 'draft').length})
                </Button>
                <Button
                  variant={dashboardView === 'paused' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDashboardView('paused')}
                >
                  Paused ({savedFunnels.filter((f: any) => f.status === 'paused').length})
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Quick Actions */}
            <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-coral-300 transition-all cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Plus className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Create New Funnel</h3>
                <p className="text-sm text-muted-foreground mb-4">Start building your next funnel</p>
                <Button size="sm" onClick={() => setView('type-selection')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Existing Funnels */}
            {filteredFunnels.map((funnel: any) => (
              <Card key={funnel.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg truncate">{funnel.name}</CardTitle>
                    <Badge className={`ml-2 ${getStatusColor(funnel.status)} flex items-center`}>
                      {getStatusIcon(funnel.status)}
                      <span className="ml-1 capitalize">{funnel.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {funnel.description || 'No description available'}
                  </p>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    <div>Type: {funnel.type || 'Unknown'}</div>
                    <div>Template: {funnel.template || 'Custom'}</div>
                    <div>Created: {new Date(funnel.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        // Load funnel for editing
                        setSelectedTemplate(funnelTemplates.find(t => t.name === funnel.template) || funnelTemplates[0]);
                        setSelectedType(funnel.type || 'lead-generation');
                        setView('sequence-editor');
                      }}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        const updatedFunnels = savedFunnels.filter((f: any) => f.id !== funnel.id);
                        setSavedFunnels(updatedFunnels);
                        localStorage.setItem('savedFunnels', JSON.stringify(updatedFunnels));
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        const duplicatedFunnel = {
                          ...funnel,
                          id: Date.now().toString(),
                          name: `${funnel.name} (Copy)`,
                          createdAt: new Date().toISOString(),
                          status: 'draft'
                        };
                        const updatedFunnels = [...savedFunnels, duplicatedFunnel];
                        setSavedFunnels(updatedFunnels);
                        localStorage.setItem('savedFunnels', JSON.stringify(updatedFunnels));
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analytics Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Funnel Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-coral-600">{savedFunnels.length}</div>
                  <div className="text-sm text-muted-foreground">Total Funnels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {savedFunnels.filter((f: any) => f.status === 'active').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Funnels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24.5%</div>
                  <div className="text-sm text-muted-foreground">Avg. Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1,234</div>
                  <div className="text-sm text-muted-foreground">Total Leads</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Automation Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Email Sequences</div>
                      <div className="text-sm text-muted-foreground">All sequences running smoothly</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Lead Scoring</div>
                      <div className="text-sm text-muted-foreground">AI-powered lead qualification</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Running</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Audience Segmentation</div>
                      <div className="text-sm text-muted-foreground">Dynamic audience targeting</div>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Optimizing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Type Selection View
  if (view === 'type-selection') {
    const handleBackFromTypeSelection = () => {
      // Back button from type selection should go to app dashboard
      setView('main');
    };

    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={handleBackFromTypeSelection}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Choose Funnel Type</h1>
            <p className="text-muted-foreground">Select the type of funnel you want to create</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => {
              setSelectedType('lead-generation');
              setView('template-selection');
            }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Lead Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Capture leads with valuable content and build your email list
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => {
              setSelectedType('sales');
              setView('template-selection');
            }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Sales Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Convert prospects into paying customers with strategic sales flows
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => {
              setSelectedType('full-funnel');
              setView('template-selection');
            }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Full Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Complete funnel with lead generation, nurturing, and sales
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Template Selection View
  if (view === 'template-selection') {
    const filteredTemplates = funnelTemplates.filter(template => 
      selectedType === 'full-funnel' ? true : template.type === selectedType
    );

    const handleBackFromTemplates = () => {
      // Back button from templates should go to type selection
      setView('type-selection');
    };

    console.log('Template Selection View - Selected Type:', selectedType);
    console.log('Total Templates:', funnelTemplates.length);
    console.log('Filtered Templates:', filteredTemplates.length);
    console.log('Filtered Templates:', filteredTemplates.map(t => ({ id: t.id, name: t.name, type: t.type })));

    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={handleBackFromTemplates}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Funnel Types
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Choose Template</h1>
            <p className="text-muted-foreground">
              Select a {selectedType?.replace('-', ' ')} funnel template to get started ({filteredTemplates.length} templates available)
            </p>
          </div>
        </div>

        {/* Template Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(filteredTemplates.map(t => t.category))).map(category => (
              <Badge key={category} variant="outline" className="text-sm">
                {category} ({filteredTemplates.filter(t => t.category === category).length})
              </Badge>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Templates Found</h3>
            <p className="text-gray-500">
              No templates available for {selectedType?.replace('-', ' ')} funnels. Try selecting a different funnel type.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => setView('type-selection')}
            >
              Choose Different Type
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge 
                          variant={template.difficulty === 'basic' ? 'secondary' : 'default'} 
                          className="text-xs"
                        >
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {template.stepCount} steps
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Funnel Flow:</p>
                    <p className="text-xs bg-muted p-2 rounded line-clamp-2">{template.preview}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {template.estimatedTime}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        console.log('Template selected:', template);
                        setSelectedTemplate(template);
                        if (currentCreationFlow === 'ai') {
                          setView('advanced-editor');
                        } else {
                          setView('sequence-editor');
                        }
                      }}
                      className="bg-gradient-to-r from-coral-500 to-navy-600 hover:from-coral-600 hover:to-navy-700 text-xs px-3 py-1"
                    >
                      Select Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t pt-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Need Something Custom?</h3>
              <p className="text-sm text-muted-foreground">Create your own funnel from scratch or let AI generate one for you.</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentCreationFlow('scratch');
                  setSelectedTemplate(null);
                  setView('advanced-editor');
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Start from Scratch
              </Button>
              <Button 
                onClick={() => {
                  setCurrentCreationFlow('ai');
                  setView('advanced-editor');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Advanced Editor View
  if (view === 'advanced-editor') {
    const handleSaveFunnel = (funnelData: any) => {
      // Auto-save to funnels library
      const savedFunnels = JSON.parse(localStorage.getItem('savedFunnels') || '[]');
      const newFunnel = {
        id: Date.now().toString(),
        name: funnelData.name,
        description: funnelData.description,
        type: selectedType,
        template: selectedTemplate?.name,
        data: funnelData,
        createdAt: new Date().toISOString(),
        status: funnelData.status || 'draft'
      };
      
      savedFunnels.push(newFunnel);
      localStorage.setItem('savedFunnels', JSON.stringify(savedFunnels));
      
      console.log('Funnel auto-saved to library:', newFunnel);
      
      // Navigate back to funnel steps instead of main
      setView('sequence-editor');
    };

    const handleBackFromEditor = () => {
      // Always go back to funnel steps, not templates
      setView('sequence-editor');
    };

    return (
      <PuckFunnelEditor
        onBack={handleBackFromEditor}
        onSave={handleSaveFunnel}
        funnelTemplate={{
          name: selectedTemplate?.name || `New ${selectedType} Funnel`,
          description: selectedTemplate?.description || 'Your funnel description here'
        }}
        initialData={null}
      />
    );
  }

  // Funnel Sequence Editor View
  if (view === 'sequence-editor' && selectedTemplate) {
    const handleBackFromSteps = () => {
      // Back button from funnel steps should go to templates
      setView('template-selection');
    };

    return (
      <FunnelSequenceEditor
        onBack={handleBackFromSteps}
        template={selectedTemplate}
        onEditStep={(stepId: string) => setView('advanced-editor')}
      />
    );
  }

  return null;
}