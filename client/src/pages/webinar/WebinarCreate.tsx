import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Settings,
  Play,
  Upload,
  MessageSquare,
  BarChart3,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  FileText,
  Timer,
  Eye,
  Save,
  Rocket,
  Camera,
  Mic,
  Share2,
  Target
} from "lucide-react";

const webinarSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["live", "automated", "hybrid"]),
  scheduledAt: z.string().optional(),
  duration: z.number().min(15, "Minimum duration is 15 minutes").max(1440, "Maximum duration is 24 hours"),
  maxAttendees: z.union([z.number().min(1), z.string()]),
  registrationRequired: z.boolean().default(true),
  autoRecord: z.boolean().default(true),
  allowChat: z.boolean().default(true),
  allowQA: z.boolean().default(true),
  allowPolls: z.boolean().default(true),
  reminderEmails: z.boolean().default(true),
  followUpEmails: z.boolean().default(false),
  videoFile: z.string().optional(),
  presentationUrl: z.string().optional(),
  offerProduct: z.string().optional(),
  offerPrice: z.number().optional(),
  tags: z.string().optional()
});

type WebinarFormData = z.infer<typeof webinarSchema>;

export default function WebinarCreate() {
  const { type } = useParams<{ type: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<WebinarFormData>({
    resolver: zodResolver(webinarSchema),
    defaultValues: {
      type: (type as "live" | "automated" | "hybrid") || "live",
      duration: 60,
      maxAttendees: "unlimited",
      registrationRequired: true,
      autoRecord: true,
      allowChat: true,
      allowQA: true,
      allowPolls: true,
      reminderEmails: true,
      followUpEmails: false,
    },
  });

  const createWebinarMutation = useMutation({
    mutationFn: (data: WebinarFormData) => 
      apiRequest("POST", "/api/webinars", { 
        ...data, 
        userId: 1 
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/webinars"] });
      toast({
        title: "Webinar Created Successfully",
        description: "Your webinar has been created and is ready to launch.",
      });
      navigate("/webinars");
    },
    onError: (error) => {
      toast({
        title: "Error Creating Webinar",
        description: "There was an error creating your webinar. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getWebinarTypeInfo = (webinarType: string) => {
    const typeInfo = {
      live: {
        title: "Live Webinar",
        subtitle: "Configure your live webinar",
        icon: "🎥",
        color: "from-red-500 to-pink-500",
        description: "Real-time interactive sessions",
      },
      automated: {
        title: "Automated Webinar", 
        subtitle: "Configure your automated webinar",
        icon: "⚙️",
        color: "from-blue-500 to-cyan-500",
        description: "Pre-recorded sessions on autopilot",
      },
      hybrid: {
        title: "Hybrid Webinar",
        subtitle: "Configure your hybrid webinar", 
        icon: "🚀",
        color: "from-purple-500 to-indigo-500",
        description: "Live presentation with automated replay",
      }
    };
    return typeInfo[webinarType as keyof typeof typeInfo] || typeInfo.live;
  };

  const webinarInfo = getWebinarTypeInfo(type || "live");

  const onSubmit = (data: WebinarFormData) => {
    createWebinarMutation.mutate(data);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));

    if (videoFile) {
      setVideoFile(videoFile);
      toast({
        title: "Video Uploaded",
        description: `${videoFile.name} has been uploaded successfully.`,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      toast({
        title: "Video Selected",
        description: `${file.name} has been selected successfully.`,
      });
    }
  };

  const generateTitleIdeas = () => {
    const ideas = [
      "AI-Powered Lead Generation Masterclass",
      "7 Secrets to 10x Your Conversion Rates",
      "The Ultimate Guide to Automated Sales Funnels",
      "How to Build a Million-Dollar Online Business",
      "Advanced Marketing Strategies for 2025"
    ];

    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    form.setValue("title", randomIdea);

    toast({
      title: "Title Generated!",
      description: "AI has generated a compelling title for your webinar.",
    });
  };

  const createDescription = () => {
    const descriptions = [
      "Join us for an exclusive masterclass where you'll discover the latest strategies and tactics used by top entrepreneurs to scale their businesses. Learn proven methods that have generated millions in revenue.",
      "In this comprehensive workshop, you'll uncover the secrets behind high-converting sales funnels, advanced automation techniques, and cutting-edge marketing strategies that drive real results.",
      "Discover the exact blueprint used by industry leaders to transform their business. This interactive session will provide you with actionable insights and practical tools you can implement immediately."
    ];

    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    form.setValue("description", randomDescription);

    toast({
      title: "Description Created!",
      description: "AI has crafted a compelling description for your webinar.",
    });
  };

  const optimizeTiming = () => {
    toast({
      title: "Timing Optimized!",
      description: "AI has analyzed your audience data to suggest optimal scheduling times.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/webinars")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-orange-500">Create Webinar</h1>
              <p className="text-gray-600 dark:text-gray-400">Set up your next high-converting webinar</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Eye className="h-4 w-4 mr-2" />
              Preview & Launch
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Webinar Details */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Webinar Details</CardTitle>
                        <CardDescription>{webinarInfo.subtitle}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={generateTitleIdeas}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Generate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webinar Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your webinar title..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what attendees will learn and why they should attend..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                                <SelectItem value="120">120 minutes</SelectItem>
                                
                                <SelectItem value="1440">24 hours (Maximum)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxAttendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Attendees</FormLabel>
                            <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select capacity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="unlimited">Unlimited (Recommended)</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="250">250</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="1000">1,000</SelectItem>
                                <SelectItem value="2500">2,500</SelectItem>
                                <SelectItem value="5000">5,000</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Upload */}
                {(type === "automated" || type === "hybrid") && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Upload</CardTitle>
                      <CardDescription>Upload your pre-recorded video content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragOver ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' : 'border-gray-300 dark:border-gray-700'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold mb-2">Upload Video File</h3>
                        <p className="text-gray-500 mb-4">Drag and drop your video here, or click to browse</p>

                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload">
                          <Button type="button" variant="outline" className="cursor-pointer">
                            Choose File
                          </Button>
                        </label>

                        <p className="text-xs text-gray-400 mt-2">
                          Supported formats: MP4, MOV, AVI (Max 2GB)
                        </p>

                        {videoFile && (
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <p className="text-green-700 dark:text-green-400 text-sm">
                              ✓ {videoFile.name} uploaded successfully
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Interactive Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Features</CardTitle>
                    <CardDescription>Enable engagement tools for your audience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="allowChat"
                          render={({ field }) => (
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium">Live Chat</p>
                                  <p className="text-sm text-gray-500">Enable real-time messaging</p>
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="allowPolls"
                          render={({ field }) => (
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <BarChart3 className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium">Polls & Surveys</p>
                                  <p className="text-sm text-gray-500">Interactive polling system</p>
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="allowQA"
                          render={({ field }) => (
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium">Q&A Session</p>
                                  <p className="text-sm text-gray-500">Allow questions from attendees</p>
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="autoRecord"
                          render={({ field }) => (
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Camera className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium">Auto Recording</p>
                                  <p className="text-sm text-gray-500">Record webinar automatically</p>
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {form.watch("title") || "Your Webinar Title"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {form.watch("description") || "Your webinar description will appear here..."}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {form.watch("duration") || 60}min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {form.watch("maxAttendees") || 1000}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Setup Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Basic Details</span>
                  <Badge variant={form.watch("title") && form.watch("description") ? "default" : "secondary"}>
                    {form.watch("title") && form.watch("description") ? "Complete" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content Upload</span>
                  <Badge variant={videoFile || type === "live" ? "default" : "secondary"}>
                    {videoFile || type === "live" ? "Complete" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Registration Page</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Sequences</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Let AI help you create compelling content, optimize for conversions, and set up automated sequences.
                </p>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={generateTitleIdeas}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Title Ideas
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={createDescription}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Description
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={optimizeTiming}
                  >
                    <Timer className="h-4 w-4 mr-2" />
                    Optimize Timing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={createWebinarMutation.isPending}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3"
            size="lg"
          >
            {createWebinarMutation.isPending ? (
              "Creating Webinar..."
            ) : (
              <>
                <Rocket className="h-5 w-5 mr-2" />
                Create Webinar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}