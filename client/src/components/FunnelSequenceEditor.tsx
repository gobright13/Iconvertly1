import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Copy, Save, Eye, Play, Settings, Mail, Globe, Phone, MessageCircle, Mic, MicOff, Sparkles, CheckCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

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

interface FunnelStep {
  id: string;
  name: string;
  type: 'landing-page' | 'sales-page' | 'thank-you' | 'checkout' | 'upsell' | 'email';
  status: 'draft' | 'active' | 'paused';
  delay?: number;
  delayUnit?: 'minutes' | 'hours' | 'days';
  description?: string;
  isActive: boolean;
}

interface FunnelSequenceEditorProps {
  onBack: () => void;
  template: FunnelTemplate;
  onEditStep: (stepId: string) => void;
}

export default function FunnelSequenceEditor({ onBack, template, onEditStep }: FunnelSequenceEditorProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  // Initialize default steps based on template
  useEffect(() => {
    const defaultSteps: FunnelStep[] = [
      {
        id: 'step-1',
        name: 'Landing Page',
        type: 'landing-page',
        status: 'draft',
        description: 'Main landing page to capture leads',
        isActive: true
      },
      {
        id: 'step-2', 
        name: 'Thank You Page',
        type: 'thank-you',
        status: 'draft',
        description: 'Thank you page after form submission',
        isActive: false
      },
      {
        id: 'step-3',
        name: 'Email Sequence',
        type: 'email',
        status: 'draft',
        delay: 5,
        delayUnit: 'minutes',
        description: 'Automated follow-up email sequence',
        isActive: false
      }
    ];

    setFunnelSteps(defaultSteps);
  }, [template]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      autoSaveSteps();
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [funnelSteps]);

  const autoSaveSteps = async () => {
    setIsAutoSaving(true);

    const funnelData = {
      id: `funnel-${template.id}-${Date.now()}`,
      name: template.name,
      description: template.description,
      template: template,
      steps: funnelSteps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };

    // Save to localStorage
    const existingFunnels = JSON.parse(localStorage.getItem('funnelLibrary') || '[]');
    const funnelIndex = existingFunnels.findIndex((f: any) => f.id === funnelData.id);

    if (funnelIndex >= 0) {
      existingFunnels[funnelIndex] = funnelData;
    } else {
      existingFunnels.push(funnelData);
    }

    localStorage.setItem('funnelLibrary', JSON.stringify(existingFunnels));
    setLastSaved(new Date());
    setIsAutoSaving(false);
  };

  const handlePublishStep = (stepId: string) => {
    setFunnelSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'active' as const }
        : step
    ));

    // Show success message
    const step = funnelSteps.find(s => s.id === stepId);
    alert(`${step?.name} has been published successfully!`);
  };

  const handlePreviewStep = (stepId: string) => {
    const step = funnelSteps.find(s => s.id === stepId);
    if (step) {
      // Create preview URL
      const previewUrl = `/funnel-preview/${template.id}/${stepId}`;
      window.open(previewUrl, '_blank');
    }
  };

  const handleSaveStep = (stepId: string) => {
    const step = funnelSteps.find(s => s.id === stepId);
    if (step && step.status === 'draft') {
      setFunnelSteps(prev => prev.map(s => 
        s.id === stepId 
          ? { ...s, status: 'draft' as const }
          : s
      ));
      autoSaveSteps();
      alert(`${step.name} has been saved as draft!`);
    }
  };

  const addFunnelStep = () => {
    const newStep: FunnelStep = {
      id: Date.now().toString(),
      name: `New Step ${funnelSteps.length + 1}`,
      type: 'landing-page',
      status: 'draft',
      delay: 1,
      delayUnit: 'days',
      description: 'New funnel step',
      isActive: true
    };
    setFunnelSteps([...funnelSteps, newStep]);
  };

  const deleteStep = (stepId: string) => {
    setFunnelSteps(funnelSteps.filter(step => step.id !== stepId));
  };

  const duplicateStep = (stepId: string) => {
    const stepToDuplicate = funnelSteps.find(step => step.id === stepId);
    if (stepToDuplicate) {
      const newStep: FunnelStep = {
        ...stepToDuplicate,
        id: Date.now().toString(),
        name: `${stepToDuplicate.name} (Copy)`,
        status: 'draft'
      };
      const stepIndex = funnelSteps.findIndex(step => step.id === stepId);
      const newSteps = [...funnelSteps];
      newSteps.splice(stepIndex + 1, 0, newStep);
      setFunnelSteps(newSteps);
    }
  };

  const updateStep = (stepId: string, updates: Partial<FunnelStep>) => {
    setFunnelSteps(funnelSteps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const getStepIcon = (type: FunnelStep['type']) => {
    switch (type) {
      case 'landing-page': return <Globe className="w-4 h-4" />;
      case 'sales-page': return <Globe className="w-4 h-4" />;
      case 'thank-you': return <Globe className="w-4 h-4" />;
      case 'checkout': return <Globe className="w-4 h-4" />;
      case 'upsell': return <Globe className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getStepColor = (type: FunnelStep['type']) => {
    switch (type) {
      case 'landing-page': return 'bg-blue-100 text-blue-800';
      case 'sales-page': return 'bg-green-100 text-green-800';
      case 'thank-you': return 'bg-purple-100 text-purple-800';
      case 'checkout': return 'bg-yellow-100 text-yellow-800';
      case 'upsell': return 'bg-orange-100 text-orange-800';
      case 'email': return 'bg-coral-100 text-coral-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Funnel Steps */}
      <div className="w-80 border-r bg-background p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-lg">{template.name}</h2>
            <p className="text-sm text-muted-foreground">Funnel Steps</p>
          </div>
          <Button
            size="sm"
            onClick={addFunnelStep}
            className="bg-gradient-to-r from-coral-500 to-navy-600"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {funnelSteps.map((step, index) => (
            <Card 
              key={step.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedStep === step.id ? 'ring-2 ring-coral-500 shadow-md' : 'hover:shadow-sm'
              }`}
              onClick={() => setSelectedStep(step.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${getStepColor(step.type)}`}>
                      {getStepIcon(step.type)}
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                      <h3 className="font-medium text-sm">{step.name}</h3>
                    </div>
                  </div>
                  <Badge variant={step.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {step.status}
                  </Badge>
                </div>

                {step.description && (
                  <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                )}

                {step.delay && (
                  <p className="text-xs text-muted-foreground mb-2">
                    ⏱️ Delay: {step.delay} {step.delayUnit}
                  </p>
                )}

                <div className="flex items-center space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStep(step.id);
                    }}
                    title="Open Advanced Page Designer"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateStep(step.id);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStep(step.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Step Editor & AI Assistant */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{template.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <p>Configure your funnel steps and sequences</p>
                {lastSaved && (
                  <span className="ml-4">
                    {isAutoSaving ? (
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        Saved {lastSaved.toLocaleTimeString()}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview Funnel
            </Button>
            <Button variant="outline" size="sm" onClick={autoSaveSteps}>
              <Save className="w-4 h-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Step Editor */}
          <div className="flex-1 p-6">
            {selectedStep ? (
              <div className="max-w-2xl">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="automation">Automation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Step Content</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="step-name">Step Name</Label>
                          <Input
                            id="step-name"
                            value={funnelSteps.find(s => s.id === selectedStep)?.name || ''}
                            onChange={(e) => updateStep(selectedStep, { name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-description">Description</Label>
                          <Textarea
                            id="step-description"
                            value={funnelSteps.find(s => s.id === selectedStep)?.description || ''}
                            onChange={(e) => updateStep(selectedStep, { description: e.target.value })}
                            placeholder="Describe this step's purpose..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-type">Step Type</Label>
                          <Select 
                            value={funnelSteps.find(s => s.id === selectedStep)?.type || 'landing-page'}
                            onValueChange={(value: FunnelStep['type']) => updateStep(selectedStep, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="landing-page">Landing Page</SelectItem>
                              <SelectItem value="sales-page">Sales Page</SelectItem>
                              <SelectItem value="thank-you">Thank You Page</SelectItem>
                              <SelectItem value="checkout">Checkout Page</SelectItem>
                              <SelectItem value="upsell">Upsell Page</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={() => onEditStep(selectedStep)} 
                          className="w-full bg-gradient-to-r from-coral-500 to-navy-600"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Design This Step
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Step Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="step-status">Status</Label>
                          <Select 
                            value={funnelSteps.find(s => s.id === selectedStep)?.status || 'draft'}
                            onValueChange={(value: FunnelStep['status']) => updateStep(selectedStep, { status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="paused">Paused</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {funnelSteps.find(s => s.id === selectedStep)?.type === 'email' && (
                          <>
                            <div>
                              <Label htmlFor="delay">Delay</Label>
                              <div className="flex space-x-2">
                                <Input
                                  id="delay"
                                  type="number"
                                  value={funnelSteps.find(s => s.id === selectedStep)?.delay || 0}
                                  onChange={(e) => updateStep(selectedStep, { delay: parseInt(e.target.value) })}
                                />
                                <Select 
                                  value={funnelSteps.find(s => s.id === selectedStep)?.delayUnit || 'days'}
                                  onValueChange={(value) => updateStep(selectedStep, { delayUnit: value as FunnelStep['delayUnit'] })}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="minutes">Minutes</SelectItem>
                                    <SelectItem value="hours">Hours</SelectItem>
                                    <SelectItem value="days">Days</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="step-active"
                            checked={funnelSteps.find(s => s.id === selectedStep)?.isActive || false}
                            onCheckedChange={(checked) => updateStep(selectedStep, { isActive: checked })}
                          />
                          <Label htmlFor="step-active">Step Active</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="automation" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Automation Rules</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Set up automation rules for this step (coming soon)
                        </p>
                        <Button variant="outline" disabled>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure Automation
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Step to Edit</h3>
                  <p className="text-muted-foreground">
                    Choose a funnel step from the sidebar to start editing
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant Panel */}
          <div className="w-80 border-l bg-muted/30 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI Assistant</h3>
                <Button
                  size="sm"
                  variant={isListening ? "default" : "outline"}
                  onClick={() => setIsListening(!isListening)}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>

              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Quick Actions:</p>
                    <div className="space-y-2">
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Optimize Step Content
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        <Copy className="w-4 h-4 mr-2" />
                        Generate Copy
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        A/B Test Ideas
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <Label htmlFor="ai-prompt">AI Prompt</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="Ask AI to help improve this funnel step..."
                      className="mt-2 min-h-20"
                    />
                    <Button size="sm" className="w-full mt-2">
                      <Play className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}