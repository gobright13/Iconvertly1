import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Palette, Layout, Settings, Zap, Target, TrendingUp, Users, Sparkles, Layers, Monitor, Smartphone, Tablet, Globe, Mail, MousePointer, Image, Type, Square, Circle, ArrowRight, Plus, Minus, Copy, Trash2, RotateCcw, RotateCw, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

interface AdvancedFunnelEditorProps {
  onBack: () => void;
  onSave: (data: any) => void;
  funnelTemplate: {
    name: string;
    description: string;
  };
  initialData: any;
}

export default function AdvancedFunnelEditor({ onBack, onSave, funnelTemplate, initialData }: AdvancedFunnelEditorProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(true);
  const [draggedElement, setDraggedElement] = useState<any>(null);
  const [canvasElements, setCanvasElements] = useState<any[]>([]);

  // Advanced Marketing Elements for Funnel Pages
  const marketingElements = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      icon: <Globe className="w-5 h-5" />,
      category: 'conversion',
      description: 'High-converting hero with headline, subheadline, and CTA'
    },
    {
      id: 'video-player',
      name: 'Video Player',
      icon: <Square className="w-5 h-5" />,
      category: 'engagement',
      description: 'Auto-play video with conversion tracking'
    },
    {
      id: 'lead-form',
      name: 'Lead Capture Form',
      icon: <Type className="w-5 h-5" />,
      category: 'conversion',
      description: 'Multi-step forms with smart field validation'
    },
    {
      id: 'countdown-timer',
      name: 'Countdown Timer',
      icon: <Target className="w-5 h-5" />,
      category: 'urgency',
      description: 'Urgency-building countdown with scarcity'
    },
    {
      id: 'testimonials',
      name: 'Testimonials Carousel',  
      icon: <Users className="w-5 h-5" />,
      category: 'social-proof',
      description: 'Rotating customer testimonials with photos'
    },
    {
      id: 'pricing-table',
      name: 'Pricing Table',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'conversion',
      description: 'Multi-tier pricing with feature comparison'
    },
    {
      id: 'social-proof',
      name: 'Social Proof Bar',
      icon: <Users className="w-5 h-5" />,
      category: 'social-proof',
      description: 'Live visitor count and recent purchases'
    },
    {
      id: 'faq-section',
      name: 'FAQ Accordion',
      icon: <Layers className="w-5 h-5" />,
      category: 'objection-handling',
      description: 'Expandable FAQ to handle objections'
    },
    {
      id: 'guarantee-badge',
      name: 'Money-Back Guarantee',
      icon: <Badge className="w-5 h-5" />,
      category: 'risk-reversal',
      description: 'Trust-building guarantee badges'
    },
    {
      id: 'progress-bar',
      name: 'Progress Indicator',
      icon: <ArrowRight className="w-5 h-5" />,
      category: 'ux',
      description: 'Multi-step process progress indicator'
    },
    {
      id: 'exit-intent',
      name: 'Exit-Intent Popup',
      icon: <MousePointer className="w-5 h-5" />,
      category: 'retention',
      description: 'Capture abandoning visitors with offers'
    },
    {
      id: 'cart-abandonment',
      name: 'Cart Recovery',
      icon: <Mail className="w-5 h-5" />,
      category: 'retention',
      description: 'Automated cart abandonment recovery'
    }
  ];

  // Drag and drop handlers
  const handleDragStart = (element: any, event: React.DragEvent) => {
    setDraggedElement(element);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (draggedElement) {
      const newElement = {
        id: `${draggedElement.id}-${Date.now()}`,
        type: draggedElement.id,
        name: draggedElement.name,
        content: getDefaultContent(draggedElement.id),
        position: { x: 0, y: canvasElements.length * 120 },
        timestamp: Date.now()
      };
      
      setCanvasElements(prev => [...prev, newElement]);
      setDraggedElement(null);
    }
  };

  const getDefaultContent = (elementType: string) => {
    switch (elementType) {
      case 'hero-section':
        return { headline: 'Your Compelling Headline', subheadline: 'Supporting text that converts', cta: 'Get Started Now' };
      case 'video-player':
        return { videoUrl: '', autoplay: true, thumbnail: '' };
      case 'lead-form':
        return { fields: ['email'], buttonText: 'Subscribe', placeholder: 'Enter your email...' };
      case 'countdown-timer':
        return { endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), format: 'days:hours:minutes:seconds' };
      default:
        return { text: 'Default content' };
    }
  };

  const removeElement = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
  };

  const handleSave = () => {
    const editorData = {
      name: funnelTemplate.name,
      description: funnelTemplate.description,
      elements: canvasElements,
      settings: {
        viewMode,
        abTesting: {
          enabled: true,
          variants: ['A', 'B'],
          trafficSplit: 50
        },
        analytics: {
          conversionTracking: true,
          heatmaps: true,
          scrollTracking: true
        }
      }
    };
    onSave(editorData);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{funnelTemplate.name}</h1>
              <p className="text-sm text-muted-foreground">Advanced Marketing Page Builder</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Viewport Controls */}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAIAssistOpen(!isAIAssistOpen)}
              className={isAIAssistOpen ? "bg-coral-100 border-coral-300" : ""}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isAIAssistOpen ? 'Hide AI' : 'Show AI'}
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-coral-500 to-navy-600">
              <Save className="w-4 h-4 mr-2" />
              Save Page
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Elements & Tools */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-2">
              <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
              <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
              <TabsTrigger value="optimize" className="text-xs">AI Optimize</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Marketing Elements</h3>
                <p className="text-xs text-muted-foreground mb-4">Drag elements to the canvas to build your page</p>
                <div className="space-y-2">
                  {marketingElements.map((element) => (
                    <Card 
                      key={element.id} 
                      className="cursor-grab hover:shadow-md transition-all duration-200 hover:scale-102 active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => handleDragStart(element, e)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="text-coral-600 flex-shrink-0">
                            {element.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{element.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{element.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {element.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">⋮⋮</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Design Tools</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="outline"><Bold className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline"><Italic className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline"><Underline className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline"><Link className="w-3 h-3" /></Button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="outline"><AlignLeft className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline"><AlignCenter className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline"><AlignRight className="w-3 h-3" /></Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Colors & Styling</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Palette className="w-3 h-3 mr-2" />
                        Brand Colors
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Layout className="w-3 h-3 mr-2" />
                        Layouts
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="optimize" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-coral-600" />
                  AI Optimization
                </h3>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">Conversion Analysis</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        AI analyzes your page for conversion optimization opportunities
                      </p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-coral-500 to-navy-600">
                        <Zap className="w-3 h-3 mr-2" />
                        Analyze Page
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">A/B Testing</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Enable A/B Testing</Label>
                          <Switch />
                        </div>
                        <div>
                          <Label className="text-xs">Traffic Split</Label>
                          <Slider defaultValue={[50]} max={100} step={10} className="mt-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">Copy Optimization</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <Type className="w-3 h-3 mr-2" />
                          Optimize Headlines
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <MousePointer className="w-3 h-3 mr-2" />
                          Improve CTAs
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <Users className="w-3 h-3 mr-2" />
                          Add Social Proof
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">Performance Insights</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                          <span>Page Load Speed:</span>
                          <span className="text-green-600">Good</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mobile Friendly:</span>
                          <span className="text-green-600">Optimized</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversion Score:</span>
                          <span className="text-yellow-600">85/100</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Page Settings</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">SEO & Meta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs">Page Title</Label>
                        <Input className="mt-1" placeholder="Enter page title..." />
                      </div>
                      <div>
                        <Label className="text-xs">Meta Description</Label>
                        <Textarea className="mt-1" placeholder="Enter meta description..." rows={3} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Tracking & Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Conversion Tracking</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Heatmap Recording</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Scroll Tracking</Label>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Advanced Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Exit-Intent Popup</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Live Chat Widget</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Social Proof Notifications</Label>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div 
            className={`bg-white border-2 border-dashed border-gray-200 rounded-lg shadow-sm min-h-full ${getViewportClass()} transition-all duration-200`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {canvasElements.length === 0 ? (
              <div className="p-8 h-full flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-coral-100 to-navy-200 rounded-full flex items-center justify-center">
                      <Globe className="w-10 h-10 text-coral-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Drop Zone - Build Your Page
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Drag marketing elements from the sidebar to start building your high-converting funnel page. 
                      All elements are optimized for maximum conversions.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Target className="w-8 h-8 text-coral-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Conversion Optimized</h3>
                        <p className="text-sm text-muted-foreground">
                          Every element is designed for maximum conversion rates
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Sparkles className="w-8 h-8 text-coral-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">AI-Powered</h3>
                        <p className="text-sm text-muted-foreground">
                          AI analyzes and optimizes your pages automatically
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-coral-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">A/B Testing</h3>
                        <p className="text-sm text-muted-foreground">
                          Built-in A/B testing for continuous optimization
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {canvasElements.map((element, index) => (
                  <Card 
                    key={element.id} 
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedElement === element.id ? 'ring-2 ring-coral-500 shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-coral-600">
                            {marketingElements.find(el => el.id === element.type)?.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{element.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {marketingElements.find(el => el.id === element.type)?.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeElement(element.id);
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Element Content Preview */}
                      <div className="bg-gray-50 rounded-lg p-4 min-h-32 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {marketingElements.find(el => el.id === element.type)?.icon}
                          </div>
                          <p className="text-sm text-gray-600">
                            {element.name} Preview
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            Click to configure this element
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - AI Assistant */}
        {isAIAssistOpen && (
          <div className="w-80 border-l bg-white p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-coral-600" />
                  AI Marketing Assistant
                </h3>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setIsAIAssistOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2">Smart Suggestions</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded text-blue-800">
                    💡 Add a countdown timer to create urgency
                  </div>
                  <div className="bg-green-50 p-2 rounded text-green-800">
                    ✅ Include customer testimonials above the fold
                  </div>
                  <div className="bg-yellow-50 p-2 rounded text-yellow-800">
                    ⚡ Consider adding exit-intent popup
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2">Conversion Tips</h4>
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>• Use action-oriented headlines</p>
                  <p>• Place CTA buttons above the fold</p>
                  <p>• Add social proof elements</p>
                  <p>• Optimize for mobile devices</p>
                  <p>• Test different color schemes</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2">Ask AI Assistant</h4>
                <Textarea 
                  placeholder="Ask me to optimize your page, suggest improvements, or generate copy..."
                  className="mt-2 text-sm"
                  rows={3}
                />
                <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-coral-500 to-navy-600">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Get AI Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}