import React, { useState } from 'react';
import FunnelDashboard from '@/components/FunnelDashboard';
import FunnelTemplateSelector from '@/components/FunnelTemplateSelector';
import AIFunnelGenerator from '@/components/AIFunnelGenerator';
import AdvancedFunnelBuilder from '@/components/AdvancedFunnelBuilder';
import { toast } from 'sonner';

const Funnels = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'template-selector' | 'ai-generator' | 'editor'>('dashboard');
  const [editingFunnel, setEditingFunnel] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [aiGeneratedFunnel, setAiGeneratedFunnel] = useState(null);

  const handleCreateNew = () => {
    setCurrentView('template-selector');
  };

  const handleCreateAIFunnel = () => {
    setCurrentView('ai-generator');
  };

  const handleEditFunnel = (funnel: any) => {
    setEditingFunnel(funnel);
    setCurrentView('editor');
  };

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  const handleAIComplete = (funnelData: any) => {
    setAiGeneratedFunnel(funnelData);
    setCurrentView('editor');
  };

  const handleBackToMain = () => {
    setCurrentView('dashboard');
    setEditingFunnel(null);
    setSelectedTemplate(null);
    setAiGeneratedFunnel(null);
  };

  // Route to different views based on current state
  switch (currentView) {
    case 'template-selector':
      return (
        <FunnelTemplateSelector
          onSelectTemplate={handleSelectTemplate}
          onBack={handleBackToMain}
        />
      );
    
    case 'ai-generator':
      return (
        <AIFunnelGenerator
          onComplete={handleAIComplete}
          onBack={handleBackToMain}
        />
      );
    
    case 'editor':
      return (
        <AdvancedFunnelBuilder 
          onBack={handleBackToMain}
          onComplete={(funnelData) => {
            console.log('Funnel created:', funnelData);
            handleBackToMain();
            toast.success('Funnel created successfully!');
          }}
          initialTemplate={selectedTemplate}
          aiGeneratedData={aiGeneratedFunnel}
          editingFunnel={editingFunnel}
        />
      );
    
    default:
      return (
        <FunnelDashboard
          onCreateNew={handleCreateNew}
          onCreateAI={handleCreateAIFunnel}
          onEditFunnel={handleEditFunnel}
        />
      );
  }
};

export default Funnels;