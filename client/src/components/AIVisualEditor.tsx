import React, { useState, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Save, Eye, Settings, Zap, MessageSquare, Mic, MicOff, Volume2, 
  VolumeX, Target, AlertTriangle, CheckCircle, X, Send, Sparkles, Mouse,
  Type, Image, Square, Circle, ChevronRight, Edit, Trash2, Copy, Move,
  Palette, Layout, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface AIVisualEditorProps {
  funnelData: any;
  onSave: (data: any) => void;
  onBack: () => void;
}

interface SelectedElement {
  id: string;
  type: string;
  content: any;
  position: { x: number; y: number };
}

interface ComplianceIssue {
  id: string;
  type: 'error' | 'warning';
  message: string;
  suggestion: string;
  elementId: string;
}

const AIVisualEditor: React.FC<AIVisualEditorProps> = ({ funnelData, onSave, onBack }) => {
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [complianceIssues, setComplianceIssues] = useState<ComplianceIssue[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Mock funnel steps data
  const [funnelSteps, setFunnelSteps] = useState(funnelData?.steps || [
    {
      id: '1',
      title: 'Landing Page',
      type: 'landing-page',
      elements: [
        {
          id: 'hero-headline',
          type: 'heading',
          content: { text: 'Transform Your Business Today', level: 1 },
          position: { x: 50, y: 100 },
          styles: { fontSize: '48px', color: '#1F2937', textAlign: 'center' }
        },
        {
          id: 'hero-subheadline',
          type: 'text',
          content: { text: 'Discover the proven strategies that helped 10,000+ entrepreneurs scale their businesses' },
          position: { x: 50, y: 180 },
          styles: { fontSize: '20px', color: '#6B7280', textAlign: 'center' }
        },
        {
          id: 'cta-button',
          type: 'button',
          content: { text: 'Get Started Now', action: 'submit-form' },
          position: { x: 50, y: 260 },
          styles: { backgroundColor: '#3B82F6', color: 'white', padding: '16px 32px', borderRadius: '8px'}
        }
      ]
    }
  ]);

  // Simulated compliance issues
  const mockComplianceIssues: ComplianceIssue[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Income claims detected',
      suggestion: 'Replace specific income amounts with general success language',
      elementId: 'hero-subheadline'
    },
    {
      id: '2',
      type: 'error',
      message: 'Missing disclaimer',
      suggestion: 'Add disclaimer about results not being typical',
      elementId: 'cta-button'
    }
  ];

  React.useEffect(() => {
    // Simulate compliance scanning
    setTimeout(() => {
      setComplianceIssues(mockComplianceIssues);
    }, 2000);
  }, []);

  const handleElementClick = (element: any, event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setSelectedElement({
        ...element,
        position: { x: event.clientX - rect.left, y: event.clientY - rect.top }
      });
      setAiPanelOpen(true);
    }
  };

  const handleCanvasClick = () => {
    setSelectedElement(null);
    setAiPanelOpen(false);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setAiMessage(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          toast.error('Voice recognition failed. Please try again.');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        toast.error('Voice recognition not supported in this browser');
      }
    } else {
      setIsListening(false);
    }
  };

  const handleAISubmit = async () => {
    if (!aiMessage.trim() || !selectedElement) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI response and element update
    const updatedElement = { ...selectedElement };
    
    if (aiMessage.toLowerCase().includes('change color') || aiMessage.toLowerCase().includes('make it blue')) {
      updatedElement.styles = { ...updatedElement.styles, color: '#3B82F6' };
    } else if (aiMessage.toLowerCase().includes('bigger') || aiMessage.toLowerCase().includes('larger')) {
      updatedElement.styles = { ...updatedElement.styles, fontSize: '56px' };
    } else if (aiMessage.toLowerCase().includes('center')) {
      updatedElement.styles = { ...updatedElement.styles, textAlign: 'center' };
    } else if (aiMessage.toLowerCase().includes('change text')) {
      const newText = aiMessage.replace(/.*change text.*to\s*/i, '').replace(/"/g, '');
      if (newText) {
        updatedElement.content = { ...updatedElement.content, text: newText };
      }
    }

    // Update the funnel steps
    const updatedSteps = funnelSteps.map(step => ({
      ...step,
      elements: step.elements.map(el => el.id === selectedElement.id ? updatedElement : el)
    }));
    
    setFunnelSteps(updatedSteps);
    setSelectedElement(updatedElement);
    setAiMessage('');
    setIsProcessing(false);
    
    toast.success('Element updated successfully!');
  };

  const runComplianceCheck = () => {
    toast.success('Running compliance scan...');
    // Simulate scanning
    setTimeout(() => {
      setComplianceIssues(mockComplianceIssues);
      toast.success(`Found ${mockComplianceIssues.length} compliance issues`);
    }, 2000);
  };

  const fixComplianceIssue = (issue: ComplianceIssue) => {
    // Simulate fixing the issue
    const updatedSteps = funnelSteps.map(step => ({
      ...step,
      elements: step.elements.map(el => {
        if (el.id === issue.elementId) {
          if (issue.type === 'warning' && issue.message.includes('Income claims')) {
            return {
              ...el,
              content: { ...el.content, text: 'Discover the proven strategies that helped thousands of entrepreneurs scale their businesses' }
            };
          }
        }
        return el;
      })
    }));
    
    setFunnelSteps(updatedSteps);
    setComplianceIssues(prev => prev.filter(i => i.id !== issue.id));
    toast.success('Compliance issue fixed!');
  };

  const renderElement = (element: any) => {
    const isSelected = selectedElement?.id === element.id;
    const hasIssue = complianceIssues.some(issue => issue.elementId === element.id);
    
    const baseStyle = {
      position: 'absolute' as const,
      left: element.position.x,
      top: element.position.y,
      cursor: 'pointer',
      border: isSelected ? '2px solid #3B82F6' : hasIssue ? '2px solid #EF4444' : '2px solid transparent',
      ...element.styles
    };

    const handleClick = (e: React.MouseEvent) => handleElementClick(element, e);

    switch (element.type) {
      case 'heading':
        return (
          <div key={element.id} style={baseStyle} onClick={handleClick} className="relative">
            {React.createElement(`h${element.content.level}`, {}, element.content.text)}
            {hasIssue && (
              <AlertTriangle className="absolute -top-2 -right-2 w-4 h-4 text-red-500" />
            )}
          </div>
        );
      
      case 'text':
        return (
          <div key={element.id} style={baseStyle} onClick={handleClick} className="relative">
            <p>{element.content.text}</p>
            {hasIssue && (
              <AlertTriangle className="absolute -top-2 -right-2 w-4 h-4 text-red-500" />
            )}
          </div>
        );
      
      case 'button':
        return (
          <div key={element.id} style={baseStyle} onClick={handleClick} className="relative">
            <button style={{ all: 'inherit', border: 'none' }}>
              {element.content.text}
            </button>
            {hasIssue && (
              <AlertTriangle className="absolute -top-2 -right-2 w-4 h-4 text-red-500" />
            )}
          </div>
        );
      
      default:
        return (
          <div key={element.id} style={baseStyle} onClick={handleClick}>
            {element.content.text || 'Element'}
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Steps */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <Button variant="outline" onClick={onBack} className="w-full mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h2 className="font-semibold text-gray-900">Funnel Steps</h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {funnelSteps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`cursor-pointer transition-all ${currentStep === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => setCurrentStep(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.type}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Compliance Issues */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Compliance</h3>
            <Button size="sm" variant="outline" onClick={runComplianceCheck}>
              <Target className="w-3 h-3 mr-1" />
              Scan
            </Button>
          </div>
          {complianceIssues.length > 0 ? (
            <div className="space-y-2">
              {complianceIssues.map(issue => (
                <div key={issue.id} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-red-800">{issue.message}</p>
                    <p className="text-xs text-red-600 mt-1">{issue.suggestion}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 h-6 text-xs" 
                      onClick={() => fixComplianceIssue(issue)}
                    >
                      Fix Issue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-2">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">All good!</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{funnelSteps[currentStep]?.title}</h1>
            <Badge variant="secondary">{funnelSteps[currentStep]?.type}</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => onSave(funnelSteps)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto bg-white">
          <div 
            ref={canvasRef}
            className="relative w-full h-full min-h-[800px] bg-white"
            onClick={handleCanvasClick}
            style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {funnelSteps[currentStep]?.elements.map(renderElement)}
            
            {/* Selection Indicator */}
            {selectedElement && (
              <div 
                className="absolute pointer-events-none"
                style={{
                  left: selectedElement.position.x - 10,
                  top: selectedElement.position.y - 10,
                  width: 20,
                  height: 20
                }}
              >
                <Mouse className="w-5 h-5 text-blue-500" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - AI Assistant & Properties */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <Tabs defaultValue="ai" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="flex-1 px-4 pb-4">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  AI Editor Assistant
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {selectedElement ? (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm text-blue-900">Selected: {selectedElement.type}</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      {selectedElement.content.text?.substring(0, 50)}...
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Click on any element to edit with AI</p>
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <Label className="text-sm font-medium mb-2">Tell AI what to change:</Label>
                  <Textarea
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="e.g., 'Make this heading blue and larger' or 'Change text to: Welcome to our course'"
                    className="flex-1 min-h-[120px] resize-none"
                    disabled={isProcessing}
                  />
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleVoiceToggle}
                      disabled={isProcessing}
                      className={isListening ? 'bg-red-50 border-red-200' : ''}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAISubmit}
                      disabled={!aiMessage.trim() || !selectedElement || isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Apply Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <h4 className="text-sm font-medium mb-2">Quick Actions:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAiMessage('Make this text bigger and bolder')}
                      disabled={!selectedElement}
                    >
                      Make Bigger
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAiMessage('Change color to blue')}
                      disabled={!selectedElement}
                    >
                      Blue Color
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAiMessage('Center align this element')}
                      disabled={!selectedElement}
                    >
                      Center
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAiMessage('Make this more compelling and action-oriented')}
                      disabled={!selectedElement}
                    >
                      Optimize
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="flex-1 px-4 pb-4">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Element Properties</CardTitle>
              </CardHeader>
              
              <CardContent>
                {selectedElement ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Element Type</Label>
                      <Input value={selectedElement.type} disabled className="mt-1" />
                    </div>
                    
                    {selectedElement.content.text && (
                      <div>
                        <Label className="text-sm">Content</Label>
                        <Textarea 
                          value={selectedElement.content.text}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <div>
                      <Label className="text-sm">Position</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input placeholder="X" value={selectedElement.position.x} />
                        <Input placeholder="Y" value={selectedElement.position.y} />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Styling</Label>
                      <div className="mt-2 space-y-2">
                        <Input 
                          placeholder="Font Size" 
                          value={selectedElement.styles?.fontSize || ''} 
                        />
                        <Input 
                          placeholder="Color" 
                          value={selectedElement.styles?.color || ''} 
                        />
                        <Input 
                          placeholder="Background" 
                          value={selectedElement.styles?.backgroundColor || ''} 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select an element to view properties</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIVisualEditor;