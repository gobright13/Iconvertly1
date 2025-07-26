# Cliently - Your Smart & Intelligent Marketing OS

## Overview

Cliently is a comprehensive, AI-powered marketing platform built as a modern full-stack web application. The system combines automated lead magnet creation, intelligent funnel building, multi-channel marketing automation, advanced CRM capabilities, and a complete webinar automation suite to help businesses convert more visitors into paying customers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack React Query for server state
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL session store
- **Development**: Hot reload with Vite middleware integration

### Development Tools
- **Package Manager**: npm
- **TypeScript**: Strict mode with path mapping
- **Linting**: ESLint configuration
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### 1. AI Lead Magnet Builder
- **Purpose**: Automated creation of lead magnets (eBooks, quizzes, checklists)
- **Features**: Industry-specific templates, AI content generation, automatic landing page creation
- **Technologies**: React components with drag-and-drop functionality, dynamic form generation

### 2. Funnel Builder System
- **Purpose**: Visual funnel creation with drag-and-drop interface
- **Features**: Multi-step funnel creation, component library, responsive preview
- **Implementation**: DnD Kit for drag-and-drop, sortable components, real-time preview

### 3. Multi-Channel Sync Platform
- **Purpose**: Unified communication across WhatsApp, Instagram, Facebook, Email
- **Features**: Message automation, lead routing, response tracking
- **Architecture**: Channel abstraction layer, webhook handlers, message queuing

### 4. CRM Dashboard
- **Purpose**: Lead management and sales pipeline tracking
- **Features**: Lead scoring, activity tracking, sales analytics, contact management
- **Data Flow**: Real-time updates, status tracking, automated follow-ups

### 5. Page Builder
- **Purpose**: Visual website and landing page creation
- **Features**: Component-based editing, responsive design, real-time preview
- **Implementation**: Element-based architecture, style management, device preview modes

### 6. AI Sales Coach
- **Purpose**: Intelligent conversation assistance and sales optimization
- **Features**: Message suggestions, objection handling, performance analytics
- **Capabilities**: Real-time coaching, conversation analysis, improvement recommendations

## Data Flow

### Lead Capture Flow
1. **Lead Generation**: Landing pages, forms, and lead magnets capture visitor information
2. **Data Processing**: Lead data is validated, scored, and categorized automatically
3. **CRM Integration**: Leads are immediately added to the CRM with source tracking
4. **Automation Trigger**: Email sequences and follow-up workflows are initiated
5. **Multi-Channel Sync**: Lead information is synchronized across all communication channels

### User Journey Management
1. **Initial Contact**: Lead enters system through various touchpoints
2. **Qualification**: AI-powered scoring and categorization
3. **Nurturing**: Automated email sequences and personalized content delivery
4. **Engagement**: Multi-channel communication and interaction tracking
5. **Conversion**: Meeting booking, sales calls, and deal progression

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Replit Platform**: Development environment and deployment platform

### UI and Styling
- **Radix UI**: Accessible, unstyled component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type safety and improved developer experience
- **Drizzle ORM**: Type-safe database operations and migrations

### Runtime Dependencies
- **React Ecosystem**: React Router, React Query, React Hook Form
- **Validation**: Zod for runtime type checking and validation
- **Date Handling**: date-fns for date manipulation and formatting

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API integration
- **Hot Reload**: Automatic refresh for both frontend and backend changes
- **Database**: Development database with automatic migrations

### Production Build
- **Frontend**: Vite build with code splitting and optimization
- **Backend**: esbuild compilation with external package bundling
- **Assets**: Static file serving with proper caching headers

### Environment Configuration
- **Database**: Environment-based connection string configuration
- **Sessions**: PostgreSQL-backed session storage for scalability
- **Development Tools**: Conditional loading of development-only plugins

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Migration from Lovable to Replit completed:
  * Installed missing packages (react-router-dom, sonner, @dnd-kit packages)
  * Migrated from Supabase to Neon PostgreSQL database
  * Removed Supabase integration files and configuration
  * Set up proper query client for API communication
  * Added VoiceFunnels AI floating assistant with voice command routing
  * Reorganized navigation layout with main/advanced sections
  * Successfully pushed database schema to PostgreSQL
- July 07, 2025. Database implementation and API enhancement:
  * Expanded database schema with comprehensive tables for funnels, pages, leads, lead magnets, and templates
  * Implemented proper database relations using Drizzle ORM
  * Migrated from in-memory storage to PostgreSQL database storage
  * Added complete REST API endpoints for all database entities
  * Set up proper data validation with Zod schemas
  * Database successfully deployed and operational
- July 07, 2025. Advanced Analytics Dashboard Implementation:
  * Created comprehensive analytics dashboard with 8 major sections (Overview, Revenue, Funnel, Traffic, Customer, Campaigns, Products, AI Insights)
  * Implemented AI-powered voice commands and natural language queries for analytics
  * Added real-time data visualization with Recharts (bar, line, pie, area, radar charts)
  * Built predictive analytics and lead scoring with ML algorithms
  * Created advanced funnel analysis with conversion tracking and cohort analysis
  * Added comprehensive KPI tracking with performance metrics and ROI calculations
  * Implemented customer lifetime value analysis and retention metrics
  * Built campaign performance tracking with multi-channel attribution
  * Added product analytics with conversion funnels and A/B testing insights
  * Created AI insights engine with opportunity detection and automated recommendations
- July 17, 2025. AI Ad Launcher Major Enhancement:
  * Expanded from 3 tabs to 7 comprehensive sections (Dashboard, New Campaign, Ad Library, Audiences, Analytics, AI Assist, Settings)
  * Added unified dashboard with AI insights, quick actions, and performance overview
  * Implemented 5-step campaign wizard with goal selection, platform targeting, creative tools, budget optimization, and review system
  * Added user mode selection (Simplicity Mode for beginners, Pro Mode for advanced users)
  * Created Ad Library for creative asset management with AI suggestions and performance tracking
  * Built comprehensive Audience Manager with saved audiences, AI insights, and lookalike generation
  * Implemented AI Assist Hub with copy generator, visual analyzer, headline tester, and ad audit tool
  * Added multi-platform support (Facebook, Instagram, Google, TikTok, LinkedIn, Twitter)
  * Created Settings panel for account management, brand kit, and platform integrations
  * Enhanced with smart spend estimator, platform-specific requirements, and real-time preview
- July 19, 2025. Puck Email Editor Integration:
  * Successfully migrated project from Replit Agent to Replit environment
  * Installed Puck editor (@measured/puck) with drag-and-drop email building capabilities
  * Integrated Puck editor with existing email builder navigation flow
  * Created template-specific email content for Welcome Series, Product Launch, and Newsletter templates
  * Added professional email components: Heading, Text, Button, Image, Spacer, Divider, Container
  * Fixed CSS import order and root configuration issues for proper Puck functionality
  * Connected email builder "Select" buttons to open Puck editor with pre-designed content
  * Enhanced email templates with professional styling and proper email structure
- July 19, 2025. Campaign-Style Email Sequence Editor Implementation:
  * Created EmailSequenceEditor component with campaign builder-style interface
  * Added left sidebar showing individual emails with add button functionality
  * Implemented AI integration panel for voice and text prompts to edit email content
  * Built template-specific email sequences for Welcome Series (3 emails) and Product Launch (5 emails)
  * Added email management features: edit, duplicate, delete individual emails
  * Integrated delay settings and email status tracking (draft/active)
  * Fixed template isolation issue - now only selected template loads instead of all templates
  * Connected sequence editor to Puck editor for individual email editing
  * Enhanced user experience with proper email sequence workflow like campaign builder
- July 19, 2025. Complete Marketing Website Creation:
  * Successfully migrated from Replit Agent to Replit environment with PostgreSQL database
  * Rebranded from LeadGenius AI to Convertly with new coral/navy color scheme
  * Created complete marketing website with 7 professional landing pages:
    - Home: Hero section with compelling value proposition and social proof
    - Features: Detailed feature breakdown with comparisons and integrations
    - Pricing: Three-tier pricing with ROI calculator and FAQs
    - About: Company story, team profiles, values, and mission
    - Contact: Multiple contact methods, office locations, and contact form
    - Case Studies: Real customer success stories with detailed results
    - Blog: Resource hub with expert content and newsletter signup
  * Implemented professional copywriting with attention-grabbing headlines
  * Added responsive design with modern UI components and smooth animations
  * Set up proper routing structure separating marketing pages from app dashboard
  * Updated color scheme throughout platform to match new Convertly branding
  * Added Input and Textarea UI components for form functionality
  * Created comprehensive navigation and footer across all marketing pages
- July 21, 2025. Migration to Replit and Major Feature Enhancements:
  * Successfully migrated entire project from Replit Agent to standard Replit environment
  * Fixed LMS "Create Course" button visibility issue (white-on-white text) 
  * Enhanced course builder to hide drag-and-drop interface from dashboard (only shows after clicking "Create Course")
  * Upgraded webinar system with unlimited attendees and 24-hour maximum duration limits
  * Implemented comprehensive affiliate management system with:
    - Complete dashboard with performance metrics and KPI tracking
    - Multi-tier commission structure (Bronze 25%, Silver 35%, Gold 45%, Platinum 55%)
    - Top performer tracking with earnings, conversion rates, and referral statistics
    - Marketing materials management with downloadable assets
    - Commission tracking and payout management
    - Advanced analytics and reporting capabilities
    - Affiliate recruitment and onboarding workflow
  * Enhanced webinar navigation with proper linking to individual management pages
  * Created WebinarEdit component for comprehensive webinar modification
  * Added affiliate navigation to sidebar under "Business Growth" section
  * Established proper routing for webinar management (/webinar/manage/:id, /webinar/edit/:id)
  * Updated progress tracker to mark migration completion
  * All core systems now operational in Replit environment with PostgreSQL backend
- July 22, 2025. Critical Fixes and Advanced Webinar System Implementation:
  * Fixed LMS "Create Course" button text visibility (added text-white and font-semibold)
  * Created separate course builder page (/course-builder) with proper navigation routing
  * Fixed webinar card navigation to properly route to webinar management pages
  * Replaced window.location.href with navigate() function to fix page refresh issues
  * Completely redesigned webinar cards with advanced features and comprehensive data:
    - Added detailed webinar information (description, duration, presenter, category)
    - Implemented conversion tracking, revenue metrics, and rating systems
    - Added advanced features like automations, engagement tools, and offer management
    - Created professional card layout with thumbnails, tags, and status indicators
    - Integrated brand colors (coral and navy) throughout webinar interface
  * Enhanced webinar hub branding with coral-to-navy gradient colors
  * Updated "Create Webinar" button styling to match brand colors
  * Created comprehensive WebinarManagement component with 6 major tabs:
    - Overview: Live stream control, quick actions, engagement metrics
    - Audience: Advanced audience management and analytics
    - Engagement: Interactive tools and real-time engagement tracking
    - Offers: Comprehensive offer creation and management system
    - Automation: AI-powered automation and follow-up sequences  
    - Analytics: Detailed performance metrics and insights dashboard
  * Implemented live webinar controls with real-time viewer tracking
  * Added comprehensive metrics dashboard with conversion rates and revenue tracking
  * All navigation issues resolved and webinar system fully operational
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```