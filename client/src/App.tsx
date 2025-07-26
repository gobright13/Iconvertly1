import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { Layout } from "./components/Layout";
import VoiceFunnelsAI from "./components/VoiceFunnelsAI";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/marketing/Home";
import Features from "./pages/marketing/Features";
import Pricing from "./pages/marketing/Pricing";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import CaseStudies from "./pages/marketing/CaseStudies";
import Blog from "./pages/marketing/Blog";
import LeadMagnets from "./pages/LeadMagnets";
import Funnels from "./pages/Funnels";
import Leads from "./pages/Leads";
import EmailMarketing from "./pages/EmailMarketing";
import NotFound from "./pages/NotFound";
import PageBuilder from "./components/PageBuilder";
import AdvancedPageBuilderPage from "./pages/AdvancedPageBuilder";
import AILeadMagnetBuilder from "./components/AILeadMagnetBuilder";
import CRMDashboard from "./components/CRMDashboard";
import MultiChannelSync from "./components/MultiChannelSync";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Webinars from "./pages/Webinars";

import MembershipDashboard from "./pages/membership/MembershipDashboard";
import WebinarCreate from "./pages/webinar/WebinarCreate";
import WebinarManage from "./pages/webinar/WebinarManage";
import WebinarEdit from "./pages/webinar/WebinarEdit";
import CallBookingCloser from "./components/CallBookingCloser";
import AdLaunchTracker from "./components/AdLaunchTracker";
import AISalesCoach from "./components/AISalesCoach";
import IntegrationsHub from "./components/IntegrationsHub";
import AILaunchAssistantPage from "./pages/AILaunchAssistant";
import AIEmailSMSEnginePage from "./pages/AIEmailSMSEngine";
import AIAdLauncherPage from "./pages/AIAdLauncher";
import EmailBuilder from "./components/EmailBuilder";
import FunnelBuilder from "./components/FunnelBuilder";
import EvergreenWebinar from "./pages/EvergreenWebinar";
import CourseSelling from "./pages/CourseSelling";
import Affiliates from "./pages/Affiliates";
import LaunchPlanner from "./pages/LaunchPlanner";
import Membership from "./pages/Membership";
import CourseBuilder from "./pages/CourseBuilder";

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              An error occurred while loading the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


const App = () => {
  // Handle unhandled promise rejections
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Marketing Pages (No Layout) */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/blog" element={<Blog />} />

              {/* App Pages (With Layout) */}
              <Route path="/app" element={<Layout><Index /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/lead-magnets" element={<Layout><LeadMagnets /></Layout>} />
              <Route path="/funnels" element={<Layout><Funnels /></Layout>} />
              <Route path="/leads" element={<Layout><Leads /></Layout>} />
              <Route path="/email-marketing" element={<Layout><EmailMarketing /></Layout>} />
              <Route path="/email-builder" element={<Layout><EmailBuilder /></Layout>} />
              <Route path="/funnel-builder" element={<Layout><FunnelBuilder /></Layout>} />
              <Route path="/webinars" element={<Layout><Webinars /></Layout>} />
              <Route path="/webinar/create/:type" element={<Layout><WebinarCreate /></Layout>} />
              <Route path="/webinar/create/live" element={<Layout><WebinarCreate /></Layout>} />
              <Route path="/webinar/create/automated" element={<Layout><WebinarCreate /></Layout>} />
              <Route path="/webinar/create/hybrid" element={<Layout><WebinarCreate /></Layout>} />
              <Route path="/webinar/manage/:id" element={<Layout><WebinarManage /></Layout>} />
              <Route path="/webinar/edit/:id" element={<Layout><WebinarEdit /></Layout>} />

              <Route path="/course-builder" element={<CourseBuilder />} />
              <Route path="/membership" element={<Layout><MembershipDashboard /></Layout>} />
              <Route path="/crm" element={<Layout><CRMDashboard /></Layout>} />
              <Route path="/channels" element={<Layout><MultiChannelSync /></Layout>} />
              <Route path="/page-builder" element={<Layout><PageBuilder /></Layout>} />
              <Route path="/advanced-builder" element={<Layout><AdvancedPageBuilderPage /></Layout>} />
              <Route path="/ai-builder" element={<Layout><AILeadMagnetBuilder /></Layout>} />
              <Route path="/ai-launch" element={<Layout><AILaunchAssistantPage /></Layout>} />
              <Route path="/ai-email-sms" element={<Layout><AIEmailSMSEnginePage /></Layout>} />
              <Route path="/ai-ads" element={<Layout><AIAdLauncherPage /></Layout>} />
              <Route path="/call-booking" element={<Layout><CallBookingCloser /></Layout>} />
              <Route path="/ads" element={<Layout><AdLaunchTracker /></Layout>} />
              <Route path="/ai-coach" element={<Layout><AISalesCoach /></Layout>} />
              <Route path="/integrations" element={<Layout><IntegrationsHub /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/course-selling" element={<Layout><CourseSelling /></Layout>} />
              <Route path="/evergreen-webinar" element={<Layout><EvergreenWebinar /></Layout>} />
              <Route path="/affiliates" element={<Layout><Affiliates /></Layout>} />
              <Route path="/launch-planner" element={<Layout><LaunchPlanner /></Layout>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <VoiceFunnelsAI />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;