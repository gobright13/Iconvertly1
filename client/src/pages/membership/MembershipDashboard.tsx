import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Award,
  Star,
  Play,
  Download,
  FileText,
  Headphones,
  Clock,
  CheckCircle
} from "lucide-react";

interface MembershipStats {
  activeMembership: {
    id: number;
    planName: string;
    status: string;
    accessLevel: number;
    nextBilling: string;
  } | null;
  contentProgress: {
    totalItems: number;
    completedItems: number;
    progressPercentage: number;
  };
  communityActivity: {
    postsCount: number;
    repliesCount: number;
    likesReceived: number;
  };
  upcomingEvents: number;
}

interface ContentItem {
  id: number;
  title: string;
  contentType: 'video' | 'pdf' | 'audio' | 'text' | 'download';
  thumbnailUrl?: string;
  duration?: number;
  isCompleted: boolean;
  progressPercentage: number;
  requiredAccessLevel: number;
}



export default function MembershipDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: membershipStats } = useQuery<MembershipStats>({
    queryKey: ["/api/membership/stats"],
  });

  const { data: recentContent } = useQuery<ContentItem[]>({
    queryKey: ["/api/member-content/recent"],
  });

  const { data: inProgressContent } = useQuery<ContentItem[]>({
    queryKey: ["/api/member-content/in-progress"],
  });

  

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your Membership Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access exclusive content, connect with the community, and accelerate your success
          </p>
        </div>

        {/* Membership Status Card */}
        {membershipStats?.activeMembership && (
          <Card className="border-2 border-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-950">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    {membershipStats.activeMembership.planName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Access Level {membershipStats.activeMembership.accessLevel} • Next billing: {new Date(membershipStats.activeMembership.nextBilling).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {membershipStats.activeMembership.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {membershipStats.contentProgress.progressPercentage}%
                  </div>
                  <p className="text-sm text-muted-foreground">Content Progress</p>
                  <Progress value={membershipStats.contentProgress.progressPercentage} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {membershipStats.communityActivity.postsCount + membershipStats.communityActivity.repliesCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Community Interactions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {membershipStats.upcomingEvents}
                  </div>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800 border-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Continue Learning */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Continue Learning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inProgressContent?.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getContentIcon(item.contentType)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <Progress value={item.progressPercentage} className="mt-1 h-2" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.progressPercentage}%
                      </Badge>
                    </div>
                  ))}
                  <Link href="/membership/content">
                    <Button variant="outline" className="w-full">
                      View All Content
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Completed "Advanced Marketing Strategies"</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Posted in community forum</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>RSVP'd to upcoming webinar</span>
                    </div>
                  </div>
                  <Link href="/membership/activity">
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Community Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Community Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Top Discussion</p>
                      <p className="text-xs text-muted-foreground">"Best tools for email automation"</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">24 replies</Badge>
                        <Badge variant="outline" className="text-xs">156 likes</Badge>
                      </div>
                    </div>
                  </div>
                  <Link href="/membership/community">
                    <Button variant="outline" className="w-full">
                      Join Discussion
                    </Button>
                  </Link>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentContent?.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-4">
                    {item.thumbnailUrl && (
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    <CardTitle className="flex items-center gap-2">
                      {getContentIcon(item.contentType)}
                      <span className="text-sm font-medium">{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {item.duration && (
                          <>
                            <Clock className="h-3 w-3" />
                            {formatDuration(item.duration)}
                          </>
                        )}
                      </div>
                      {item.isCompleted && (
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                    {!item.isCompleted && (
                      <Progress value={item.progressPercentage} className="mt-3 h-2" />
                    )}
                    <Button className="w-full mt-4 group-hover:bg-primary/90">
                      {item.isCompleted ? 'Review' : 'Continue'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Forum</CardTitle>
                <p className="text-muted-foreground">
                  Connect with fellow members, share insights, and get support
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Community Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're building an amazing community space for you to connect and learn together.
                  </p>
                  <Button disabled>
                    Join Community (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <p className="text-muted-foreground">
                  Live webinars, workshops, and exclusive member events
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground mb-4">
                    Check back soon for exclusive member events and live sessions.
                  </p>
                  <Button disabled>
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Member Profile</CardTitle>
                <p className="text-muted-foreground">
                  Manage your membership and preferences
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Update your profile information and membership preferences.
                  </p>
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}