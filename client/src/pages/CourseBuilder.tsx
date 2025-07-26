
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DragAndDropCourseBuilder } from '@/components/lms/DragAndDropCourseBuilder';
import { 
  Plus, 
  BookOpen,
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function CourseBuilder() {
  const [showDragDropBuilder, setShowDragDropBuilder] = useState(false);

  const courseTemplates = [
    {
      id: 1,
      name: 'Marketing Course',
      description: 'Complete marketing course structure',
      modules: 8,
      lessons: 32,
      category: 'Marketing'
    },
    {
      id: 2,
      name: 'Business Strategy',
      description: 'Strategic business planning course',
      modules: 6,
      lessons: 24,
      category: 'Business'
    },
    {
      id: 3,
      name: 'Technical Training',
      description: 'Technical skills development course',
      modules: 10,
      lessons: 40,
      category: 'Technology'
    }
  ];

  const handleUseTemplate = (templateId: number) => {
    setShowDragDropBuilder(true);
  };

  const handleCreateWithAI = () => {
    setShowDragDropBuilder(true);
  };

  if (showDragDropBuilder) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowDragDropBuilder(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course Setup
          </Button>
        </div>
        <DragAndDropCourseBuilder />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and publish your online courses
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/lms'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to LMS
          </Button>
          <Button 
            className="bg-coral-500 hover:bg-coral-600"
            onClick={() => setShowDragDropBuilder(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Start Building
          </Button>
        </div>
      </div>

      {/* Quick Start Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Start Templates
          </CardTitle>
          <CardDescription>
            Get started quickly with pre-built course structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {template.modules} modules • {template.lessons} lessons
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Course Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI Course Generator
          </CardTitle>
          <CardDescription>
            Generate complete course outline and content with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Topic</Label>
                <Input
                  id="courseTitle"
                  placeholder="e.g., Digital Marketing for Beginners"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Beginners"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseGoals">Learning Objectives</Label>
                <Textarea
                  id="courseGoals"
                  placeholder="What should students achieve after completing this course?"
                  rows={3}
                />
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleCreateWithAI}
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate Course with AI
              </Button>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                AI Will Generate:
              </h4>
              <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                <li>• Complete course outline and structure</li>
                <li>• Module and lesson titles</li>
                <li>• Learning objectives for each section</li>
                <li>• Suggested content and activities</li>
                <li>• Quiz questions and assignments</li>
                <li>• Resource recommendations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Course Builder</CardTitle>
          <CardDescription>
            Use our drag-and-drop interface for complete control over your course structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drag & Drop Course Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Build your course with our advanced visual editor
              </p>
              <Button 
                onClick={() => setShowDragDropBuilder(true)}
                className="bg-coral-500 hover:bg-coral-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Open Course Builder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
