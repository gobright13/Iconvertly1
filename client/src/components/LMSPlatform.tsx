import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Trophy, BarChart3, Plus, Play, Edit, Settings } from 'lucide-react';
import { CourseDashboard } from './lms/CourseDashboard';
import { CourseBuilder } from './lms/CourseBuilder';
import { StudentManagement } from './lms/StudentManagement';
import { LMSAnalytics } from './lms/LMSAnalytics';
import { LMSSettings } from './lms/LMSSettings';

export function LMSPlatform() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cliently LMS
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your comprehensive learning management system
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              className="bg-coral-500 hover:bg-coral-600 text-white font-semibold px-4 py-2"
              onClick={() => window.location.href = '/course-builder'}
            >
              <Plus className="w-4 h-4 mr-2 text-white" />
              <span className="text-white">Create Course</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+3 from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+87 from last month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">89.2%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+5.8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Generated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$89,450</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+42% from last month</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-coral-600 dark:text-coral-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="builder">Course Builder</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CourseDashboard />
          </TabsContent>

          <TabsContent value="courses">
            <CourseDashboard />
          </TabsContent>

          <TabsContent value="builder">
            <CourseBuilder />
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <LMSAnalytics />
          </TabsContent>

          <TabsContent value="settings">
            <LMSSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}