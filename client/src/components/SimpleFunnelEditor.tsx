
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Plus, Edit, Trash2, Move, Settings, Palette, Type, Image as ImageIcon, Square, Layout, Send, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Element {
  id: string;
  type: 'heading' | 'text' | 'button' | 'image' | 'form' | 'container';
  content: any;
  styles: any;
}

interface SimpleFunnelEditorProps {
  onBack: () => void;
  onSave: (data: any) => void;
  funnelTemplate: {
    name: string;
    description: string;
  };
  initialData?: any;
}

export default function SimpleFunnelEditor({ onBack, onSave, funnelTemplate, initialData }: SimpleFunnelEditorProps) {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [pageSettings, setPageSettings] = useState({
    backgroundColor: '#ffffff',
    canvasColor: '#f8fafc',
    maxWidth: '1200px'
  });
  const [funnelStatus, setFunnelStatus] = useState<'draft' | 'completed' | 'published'>('draft');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      autoSave();
    }, 10000);

    return () => clearInterval(autoSaveInterval);
  }, [elements, pageSettings]);

  const autoSave = () => {
    setIsAutoSaving(true);
    
    const funnelData = {
      id: initialData?.id || `funnel-${Date.now()}`,
      name: funnelTemplate.name,
      description: funnelTemplate.description,
      elements,
      pageSettings,
      status: funnelStatus,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
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

  const addElement = (type: Element['type']) => {
    const newElement: Element = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    };
    
    setElements(prev => [...prev, newElement]);
  };

  const getDefaultContent = (type: Element['type']) => {
    switch (type) {
      case 'heading': return { text: 'Your Heading Here', level: 'h2' };
      case 'text': return { text: 'Your text content goes here.' };
      case 'button': return { text: 'Click Here', url: '#' };
      case 'image': return { src: 'https://via.placeholder.com/400x300', alt: 'Placeholder' };
      case 'form': return { title: 'Contact Form', fields: [{ label: 'Email', type: 'email' }] };
      case 'container': return { backgroundColor: '#f8fafc' };
      default: return {};
    }
  };

  const getDefaultStyles = (type: Element['type']) => {
    return {
      marginBottom: '20px',
      padding: type === 'container' ? '20px' : '0',
      textAlign: 'left'
    };
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const handleSave = () => {
    const data = {
      elements,
      pageSettings,
      status: funnelStatus,
      name: funnelTemplate.name,
      description: funnelTemplate.description
    };
    onSave(data);
    autoSave();
  };

  const handlePublish = () => {
    setFunnelStatus('published');
    const data = {
      elements,
      pageSettings,
      status: 'published',
      name: funnelTemplate.name,
      description: funnelTemplate.description
    };
    onSave(data);
    autoSave();
    alert('Funnel published successfully!');
  };

  const renderElement = (element: Element) => {
    const isSelected = selectedElement === element.id;
    const commonStyle = {
      ...element.styles,
      border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
      position: 'relative' as const,
      cursor: 'pointer'
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedElement(element.id);
    };

    switch (element.type) {
      case 'heading':
        const HeadingTag = element.content.level as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={element.id}
            style={commonStyle}
            onClick={handleClick}
          >
            {element.content.text}
          </HeadingTag>
        );
      
      case 'text':
        return (
          <p
            key={element.id}
            style={commonStyle}
            onClick={handleClick}
          >
            {element.content.text}
          </p>
        );
      
      case 'button':
        return (
          <div key={element.id} style={commonStyle} onClick={handleClick}>
            <a
              href={element.content.url}
              style={{
                display: 'inline-block',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              {element.content.text}
            </a>
          </div>
        );
      
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content.src}
            alt={element.content.alt}
            style={{...commonStyle, maxWidth: '100%', height: 'auto'}}
            onClick={handleClick}
          />
        );
      
      case 'container':
        return (
          <div
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.content.backgroundColor,
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleClick}
          >
            <div className="text-gray-500">Container - Click to edit properties</div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderElementProperties = () => {
    if (!selectedElement) return null;
    
    const element = elements.find(el => el.id === selectedElement);
    if (!element) return null;

    return (
      <div className="space-y-4">
        <h3 className="font-semibold">Edit {element.type.charAt(0).toUpperCase() + element.type.slice(1)}</h3>
        
        {element.type === 'heading' && (
          <>
            <div>
              <Label>Heading Text</Label>
              <Input
                value={element.content.text}
                onChange={(e) => updateElement(element.id, {
                  content: { ...element.content, text: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Heading Level</Label>
              <Select
                value={element.content.level}
                onValueChange={(value) => updateElement(element.id, {
                  content: { ...element.content, level: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {element.type === 'text' && (
          <div>
            <Label>Text Content</Label>
            <Textarea
              value={element.content.text}
              onChange={(e) => updateElement(element.id, {
                content: { ...element.content, text: e.target.value }
              })}
              rows={4}
            />
          </div>
        )}

        {element.type === 'button' && (
          <>
            <div>
              <Label>Button Text</Label>
              <Input
                value={element.content.text}
                onChange={(e) => updateElement(element.id, {
                  content: { ...element.content, text: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Button URL</Label>
              <Input
                value={element.content.url}
                onChange={(e) => updateElement(element.id, {
                  content: { ...element.content, url: e.target.value }
                })}
              />
            </div>
          </>
        )}

        {element.type === 'container' && (
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={element.content.backgroundColor}
              onChange={(e) => updateElement(element.id, {
                content: { ...element.content, backgroundColor: e.target.value }
              })}
            />
          </div>
        )}

        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => removeElement(element.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Element
        </Button>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
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
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge className={`${
                  funnelStatus === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  funnelStatus === 'published' ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {funnelStatus.charAt(0).toUpperCase() + funnelStatus.slice(1)}
                </Badge>
                {lastSaved && (
                  <span>
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
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              size="sm" 
              onClick={handlePublish}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Elements */}
        <div className="w-80 border-r bg-white p-4 overflow-y-auto">
          <Tabs defaultValue="elements">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Add Elements</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement('heading')}
                    className="flex flex-col h-16"
                  >
                    <Type className="w-4 h-4 mb-1" />
                    Heading
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement('text')}
                    className="flex flex-col h-16"
                  >
                    <Type className="w-4 h-4 mb-1" />
                    Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement('button')}
                    className="flex flex-col h-16"
                  >
                    <Square className="w-4 h-4 mb-1" />
                    Button
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement('image')}
                    className="flex flex-col h-16"
                  >
                    <ImageIcon className="w-4 h-4 mb-1" />
                    Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement('container')}
                    className="flex flex-col h-16"
                  >
                    <Layout className="w-4 h-4 mb-1" />
                    Container
                  </Button>
                </div>
              </div>

              {selectedElement && (
                <div className="border-t pt-4">
                  {renderElementProperties()}
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Page Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Background Color</Label>
                    <Input
                      type="color"
                      value={pageSettings.backgroundColor}
                      onChange={(e) => setPageSettings(prev => ({ 
                        ...prev, 
                        backgroundColor: e.target.value 
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Canvas Color</Label>
                    <Input
                      type="color"
                      value={pageSettings.canvasColor}
                      onChange={(e) => setPageSettings(prev => ({ 
                        ...prev, 
                        canvasColor: e.target.value 
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Max Width</Label>
                    <Input
                      value={pageSettings.maxWidth}
                      onChange={(e) => setPageSettings(prev => ({ 
                        ...prev, 
                        maxWidth: e.target.value 
                      }))}
                      placeholder="e.g., 1200px"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div 
          className="flex-1 p-6 overflow-auto"
          style={{ backgroundColor: pageSettings.canvasColor }}
        >
          <div 
            className="mx-auto bg-white rounded-lg shadow-sm min-h-full p-8"
            style={{ 
              maxWidth: pageSettings.maxWidth,
              backgroundColor: pageSettings.backgroundColor 
            }}
            onClick={() => setSelectedElement(null)}
          >
            {elements.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Layout className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Start Building Your Funnel
                </h3>
                <p className="text-gray-500">
                  Add elements from the sidebar to create your funnel page
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map(renderElement)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
