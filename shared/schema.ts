import { pgTable, text, serial, integer, boolean, json, jsonb, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phoneNumber: varchar("phone_number"),
  accountType: varchar("account_type").default("Free"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  // Business & Marketing Context
  businessName: varchar("business_name"),
  industry: varchar("industry"),
  targetAudience: text("target_audience"),
  mainGoal: text("main_goal"),
  productServiceDescription: text("product_service_description"),
  
  // AI Funnel Customization
  funnelObjective: text("funnel_objective"),
  preferredFunnelStyle: varchar("preferred_funnel_style"),
  leadMagnetType: varchar("lead_magnet_type"),
  preferredPlatform: varchar("preferred_platform"),
  crmIntegration: text("crm_integration"),
  
  // Performance & Usage Tracking
  funnelsCreated: integer("funnels_created").default(0),
  lastActive: timestamp("last_active"),
  leadsCollected: integer("leads_collected").default(0),
  emailsSent: integer("emails_sent").default(0),
  openRate: decimal("open_rate", { precision: 5, scale: 2 }),
  clickRate: decimal("click_rate", { precision: 5, scale: 2 }),
  
  // Tools & Features Access
  hasAccessTo: text("has_access_to").array(),
  currentPlan: varchar("current_plan").default("Starter"),
  
  // Optional Advanced Fields
  customDomain: varchar("custom_domain"),
  aiPromptHistory: jsonb("ai_prompt_history"),
  zapierWebhooks: text("zapier_webhooks").array(),
  referralCode: varchar("referral_code"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const billingHistory = pgTable("billing_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subscriptionType: varchar("subscription_type").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  paymentMethod: varchar("payment_method"),
  invoiceUrl: varchar("invoice_url"),
  status: varchar("status").default("pending"),
  billingDate: timestamp("billing_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  memberEmail: varchar("member_email").notNull(),
  role: varchar("role").default("member"),
  permissions: text("permissions").array(),
  invitedAt: timestamp("invited_at").defaultNow(),
  joinedAt: timestamp("joined_at"),
  status: varchar("status").default("pending"),
});

export const funnels = pgTable("funnels", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'lead_magnet', 'sales', 'webinar', etc.
  status: text("status").notNull().default('draft'), // 'draft', 'live', 'paused'
  settings: json("settings"),
  analytics: json("analytics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  funnelId: integer("funnel_id").references(() => funnels.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'landing', 'optin', 'thankyou', 'offer', 'upsell', 'downsell'
  url: text("url").notNull(),
  content: json("content"), // Page content and styling
  elements: json("elements"), // Array of page elements
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leadMagnets = pgTable("lead_magnets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'ebook', 'quiz', 'checklist', 'template', 'video'
  description: text("description"),
  content: json("content"),
  landingPageId: integer("landing_page_id").references(() => pages.id),
  status: text("status").notNull().default('draft'),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  funnelId: integer("funnel_id").references(() => funnels.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  source: text("source"), // 'organic', 'facebook', 'instagram', 'google', etc.
  status: text("status").notNull().default('new'), // 'new', 'qualified', 'contacted', 'converted'
  score: integer("score").default(0),
  notes: text("notes"),
  customFields: json("custom_fields"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'funnel', 'page', 'email'
  type: text("type").notNull(),
  content: json("content"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Email Marketing Tables
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  preheader: text("preheader"),
  content: json("content").notNull(),
  type: text("type").notNull(), // 'broadcast', 'automation', 'sequence'
  status: text("status").notNull().default('draft'), // 'draft', 'scheduled', 'sent', 'active', 'paused'
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  settings: json("settings"),
  stats: json("stats"), // open rate, click rate, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subject: text("subject"),
  preheader: text("preheader"),
  content: json("content").notNull(),
  thumbnail: text("thumbnail"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailContacts = pgTable("email_contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  tags: text("tags").array(),
  customFields: json("custom_fields"),
  status: text("status").notNull().default('subscribed'), // 'subscribed', 'unsubscribed', 'bounced'
  source: text("source"), // where they came from
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailAutomations = pgTable("email_automations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(), // 'signup', 'purchase', 'tag_added', etc.
  conditions: json("conditions"),
  emails: json("emails").notNull(), // array of email sequences
  status: text("status").notNull().default('draft'), // 'draft', 'active', 'paused'
  stats: json("stats"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailSends = pgTable("email_sends", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => emailCampaigns.id),
  contactId: integer("contact_id").references(() => emailContacts.id),
  status: text("status").notNull(), // 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  sentAt: timestamp("sent_at").defaultNow(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  bouncedAt: timestamp("bounced_at"),
  unsubscribedAt: timestamp("unsubscribed_at"),
  metadata: json("metadata")
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles),
  funnels: many(funnels),
  leadMagnets: many(leadMagnets),
  leads: many(leads),
  billingHistory: many(billingHistory),
  teamMembers: many(teamMembers),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const billingHistoryRelations = relations(billingHistory, ({ one }) => ({
  user: one(users, {
    fields: [billingHistory.userId],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const funnelsRelations = relations(funnels, ({ one, many }) => ({
  user: one(users, { fields: [funnels.userId], references: [users.id] }),
  pages: many(pages),
  leads: many(leads),
}));

export const pagesRelations = relations(pages, ({ one }) => ({
  funnel: one(funnels, { fields: [pages.funnelId], references: [funnels.id] }),
}));

export const leadMagnetsRelations = relations(leadMagnets, ({ one }) => ({
  user: one(users, { fields: [leadMagnets.userId], references: [users.id] }),
  landingPage: one(pages, { fields: [leadMagnets.landingPageId], references: [pages.id] }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, { fields: [leads.userId], references: [users.id] }),
  funnel: one(funnels, { fields: [leads.funnelId], references: [funnels.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFunnelSchema = createInsertSchema(funnels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadMagnetSchema = createInsertSchema(leadMagnets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type Funnel = typeof funnels.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertLeadMagnet = z.infer<typeof insertLeadMagnetSchema>;
export type LeadMagnet = typeof leadMagnets.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

// Membership Site Platform Tables
export const membershipPlans = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  billingCycle: varchar("billing_cycle").notNull(), // 'monthly', 'yearly', 'one-time'
  features: text("features").array(),
  accessLevel: integer("access_level").notNull().default(1), // 1, 2, 3 for tiering
  maxMembers: integer("max_members"), // for group memberships
  trialDays: integer("trial_days").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  planId: integer("plan_id").notNull().references(() => membershipPlans.id),
  status: varchar("status").notNull().default("active"), // 'active', 'cancelled', 'paused', 'expired'
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  paypalSubscriptionId: varchar("paypal_subscription_id"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  trialEndDate: timestamp("trial_end_date"),
  cancelledAt: timestamp("cancelled_at"),
  pausedAt: timestamp("paused_at"),
  resumedAt: timestamp("resumed_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberContent = pgTable("member_content", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  contentType: varchar("content_type").notNull(), // 'video', 'pdf', 'audio', 'text', 'download'
  contentUrl: text("content_url"),
  thumbnailUrl: text("thumbnail_url"),
  requiredAccessLevel: integer("required_access_level").notNull().default(1),
  isPublic: boolean("is_public").default(false),
  isDripContent: boolean("is_drip_content").default(false),
  dripDate: timestamp("drip_date"),
  unlockConditions: jsonb("unlock_conditions"), // AI-based conditions
  tags: text("tags").array(),
  category: varchar("category"),
  order: integer("order").default(0),
  viewCount: integer("view_count").default(0),
  downloadCount: integer("download_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberProgress = pgTable("member_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  contentId: integer("content_id").notNull().references(() => memberContent.id, { onDelete: "cascade" }),
  progressPercentage: integer("progress_percentage").default(0),
  isCompleted: boolean("is_completed").default(false),
  lastAccessedAt: timestamp("last_accessed_at"),
  timeSpent: integer("time_spent").default(0), // in seconds
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberActivity = pgTable("member_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  activityType: varchar("activity_type").notNull(), // 'login', 'content_view', 'download', 'comment', 'like'
  entityType: varchar("entity_type"), // 'content', 'forum_post', 'webinar'
  entityId: integer("entity_id"),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberTags = pgTable("member_tags", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tag: varchar("tag").notNull(),
  addedBy: varchar("added_by").default("system"), // 'system', 'manual', 'ai'
  aiReason: text("ai_reason"), // AI explanation for the tag
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityForum = pgTable("community_forum", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category"),
  requiredAccessLevel: integer("required_access_level").default(1),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  replyCount: integer("reply_count").default(0),
  lastReplyAt: timestamp("last_reply_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const forumReplies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  forumId: integer("forum_id").notNull().references(() => communityForum.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  parentReplyId: integer("parent_reply_id"), // for nested replies
  likeCount: integer("like_count").default(0),
  isEdited: boolean("is_edited").default(false),
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberRewards = pgTable("member_rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rewardType: varchar("reward_type").notNull(), // 'points', 'badge', 'unlock', 'discount'
  rewardValue: varchar("reward_value"),
  reason: text("reason"),
  points: integer("points").default(0),
  isRedeemed: boolean("is_redeemed").default(false),
  redeemedAt: timestamp("redeemed_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberChat = pgTable("member_chat", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: integer("receiver_id").references(() => users.id, { onDelete: "cascade" }),
  roomId: varchar("room_id"), // for group chats
  message: text("message").notNull(),
  messageType: varchar("message_type").default("text"), // 'text', 'image', 'file', 'system'
  fileUrl: text("file_url"),
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  isEdited: boolean("is_edited").default(false),
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const liveEvents = pgTable("live_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  eventType: varchar("event_type").notNull(), // 'webinar', 'workshop', 'q&a', 'mastermind'
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  timezone: varchar("timezone").default("UTC"),
  maxAttendees: integer("max_attendees"),
  requiredAccessLevel: integer("required_access_level").default(1),
  meetingUrl: text("meeting_url"),
  recordingUrl: text("recording_url"),
  status: varchar("status").default("scheduled"), // 'scheduled', 'live', 'ended', 'cancelled'
  reminderSent: boolean("reminder_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const eventRSVPs = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => liveEvents.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status").default("attending"), // 'attending', 'maybe', 'not_attending'
  attended: boolean("attended").default(false),
  joinTime: timestamp("join_time"),
  leaveTime: timestamp("leave_time"),
  feedback: text("feedback"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const memberAffiliates = pgTable("member_affiliates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  referrerUserId: integer("referrer_user_id").references(() => users.id, { onDelete: "cascade" }),
  affiliateCode: varchar("affiliate_code").unique(),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("10.00"),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0.00"),
  totalReferrals: integer("total_referrals").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



// Global Activity Tracker
export const globalActivity = pgTable("global_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  module: varchar("module").notNull(), // 'membership', 'webinar', 'lms', 'funnel', 'crm'
  activityType: varchar("activity_type").notNull(),
  entityId: integer("entity_id"),
  entityType: varchar("entity_type"),
  metadata: jsonb("metadata"),
  engagementScore: integer("engagement_score").default(0),
  timeSpent: integer("time_spent").default(0),
  completionPercentage: integer("completion_percentage").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI Assistant Interactions
export const aiInteractions = pgTable("ai_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  module: varchar("module").notNull(), // 'membership', 'webinar', 'lms', 'general'
  assistantType: varchar("assistant_type").notNull(), // 'instructor', 'chat', 'coach', 'support'
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  context: jsonb("context"),
  feedbackRating: integer("feedback_rating"), // 1-5 stars
  feedbackComment: text("feedback_comment"),
  processingTime: integer("processing_time"), // in milliseconds
  tokensUsed: integer("tokens_used"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Webinar Automation System Tables
export const webinars = pgTable("webinars", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'live', 'automated', 'hybrid'
  status: text("status").notNull().default('draft'), // 'draft', 'scheduled', 'live', 'completed', 'cancelled'
  
  // Content & Media
  videoUrl: text("video_url"),
  presentationUrl: text("presentation_url"),
  thumbnailUrl: text("thumbnail_url"),
  duration: integer("duration"), // in minutes
  
  // Scheduling
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  timezone: text("timezone").default('UTC'),
  isRecurring: boolean("is_recurring").default(false),
  recurringSettings: json("recurring_settings"),
  
  // Registration & Landing Page
  registrationPageId: integer("registration_page_id").references(() => pages.id),
  thankyouPageId: integer("thankyou_page_id").references(() => pages.id),
  replayPageId: integer("replay_page_id").references(() => pages.id),
  
  // Settings & Features
  settings: json("settings"), // chat, Q&A, polls, etc.
  maxAttendees: integer("max_attendees"),
  autoRecord: boolean("auto_record").default(true),
  chatEnabled: boolean("chat_enabled").default(true),
  qaEnabled: boolean("qa_enabled").default(true),
  pollsEnabled: boolean("polls_enabled").default(true),
  
  // Automation Features
  simulatedChatMessages: json("simulated_chat_messages"),
  autoOfferTriggers: json("auto_offer_triggers"),
  attendeeBehaviorTriggers: json("attendee_behavior_triggers"),
  
  // Analytics
  registrationCount: integer("registration_count").default(0),
  attendeeCount: integer("attendee_count").default(0),
  replayViews: integer("replay_views").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default('0'),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarRegistrations = pgTable("webinar_registrations", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  customFields: json("custom_fields"),
  source: text("source"), // utm source, referrer, etc.
  
  // Attendance Tracking
  attended: boolean("attended").default(false),
  joinedAt: timestamp("joined_at"),
  leftAt: timestamp("left_at"),
  attendanceDuration: integer("attendance_duration"), // in minutes
  engagementScore: integer("engagement_score").default(0),
  
  // Actions & Engagement
  clickedOffer: boolean("clicked_offer").default(false),
  purchased: boolean("purchased").default(false),
  purchaseAmount: decimal("purchase_amount", { precision: 10, scale: 2 }),
  questionsAsked: integer("questions_asked").default(0),
  chatMessages: integer("chat_messages").default(0),
  pollsAnswered: integer("polls_answered").default(0),
  
  // Follow-up
  remindersSent: integer("reminders_sent").default(0),
  followUpStatus: text("follow_up_status").default('pending'),
  
  registeredAt: timestamp("registered_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarSessions = pgTable("webinar_sessions", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  sessionName: text("session_name").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  timezone: text("timezone").default('UTC'),
  isMainSession: boolean("is_main_session").default(true),
  maxAttendees: integer("max_attendees"),
  
  // Session Status
  status: text("status").notNull().default('scheduled'), // 'scheduled', 'live', 'completed', 'cancelled'
  recordingUrl: text("recording_url"),
  
  // Analytics for this specific session
  registrations: integer("registrations").default(0),
  attendees: integer("attendees").default(0),
  peakAttendance: integer("peak_attendance").default(0),
  averageWatchTime: integer("average_watch_time"), // in minutes
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarChats = pgTable("webinar_chats", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  registrationId: integer("registration_id").references(() => webinarRegistrations.id),
  
  // Message Details
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email"),
  message: text("message").notNull(),
  messageType: text("message_type").default('attendee'), // 'attendee', 'host', 'simulated', 'system'
  
  // Moderation
  isApproved: boolean("is_approved").default(true),
  isVisible: boolean("is_visible").default(true),
  moderatedBy: text("moderated_by"),
  moderationReason: text("moderation_reason"),
  
  sentAt: timestamp("sent_at").defaultNow(),
});

export const webinarQuestions = pgTable("webinar_questions", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  registrationId: integer("registration_id").references(() => webinarRegistrations.id),
  
  // Question Details
  question: text("question").notNull(),
  askerName: text("asker_name").notNull(),
  askerEmail: text("asker_email"),
  isAnonymous: boolean("is_anonymous").default(false),
  
  // Response
  answer: text("answer"),
  answeredBy: text("answered_by"),
  answeredAt: timestamp("answered_at"),
  isAnsweredLive: boolean("is_answered_live").default(false),
  
  // Status
  status: text("status").default('pending'), // 'pending', 'answered', 'dismissed'
  priority: integer("priority").default(0),
  upvotes: integer("upvotes").default(0),
  
  askedAt: timestamp("asked_at").defaultNow(),
});

export const webinarPolls = pgTable("webinar_polls", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  
  // Poll Details
  question: text("question").notNull(),
  options: json("options").notNull(), // array of poll options
  pollType: text("poll_type").default('multiple_choice'), // 'multiple_choice', 'yes_no', 'rating', 'text'
  
  // Settings
  isActive: boolean("is_active").default(false),
  allowMultipleAnswers: boolean("allow_multiple_answers").default(false),
  showResults: boolean("show_results").default(true),
  isAnonymous: boolean("is_anonymous").default(false),
  
  // Timing
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in seconds
  
  // Results
  totalResponses: integer("total_responses").default(0),
  results: json("results"), // aggregated poll results
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarPollResponses = pgTable("webinar_poll_responses", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id").notNull().references(() => webinarPolls.id, { onDelete: "cascade" }),
  registrationId: integer("registration_id").references(() => webinarRegistrations.id),
  
  // Response Details
  selectedOptions: json("selected_options"), // array of selected option IDs
  textResponse: text("text_response"), // for text-based polls
  rating: integer("rating"), // for rating polls
  
  respondedAt: timestamp("responded_at").defaultNow(),
});

export const webinarOffers = pgTable("webinar_offers", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  
  // Offer Details
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  currency: text("currency").default('USD'),
  
  // Timing & Triggers
  triggerType: text("trigger_type").notNull(), // 'time_based', 'behavior_based', 'manual'
  triggerConditions: json("trigger_conditions"),
  showDuration: integer("show_duration"), // how long to show offer in seconds
  
  // Scarcity & Urgency
  isLimitedTime: boolean("is_limited_time").default(false),
  isLimitedQuantity: boolean("is_limited_quantity").default(false),
  maxQuantity: integer("max_quantity"),
  quantitySold: integer("quantity_sold").default(0),
  
  // CTA & Links
  ctaText: text("cta_text").default('Get This Offer'),
  checkoutUrl: text("checkout_url").notNull(),
  
  // Analytics
  views: integer("views").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default('0'),
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarReminders = pgTable("webinar_reminders", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  
  // Reminder Settings
  type: text("type").notNull(), // 'email', 'sms', 'push'
  triggerTime: integer("trigger_time").notNull(), // minutes before webinar
  
  // Content
  subject: text("subject"),
  message: text("message").notNull(),
  templateId: integer("template_id").references(() => emailTemplates.id),
  
  // Targeting
  sendToAllRegistrants: boolean("send_to_all_registrants").default(true),
  targetConditions: json("target_conditions"),
  
  // Status & Analytics
  isActive: boolean("is_active").default(true),
  sent: integer("sent").default(0),
  delivered: integer("delivered").default(0),
  opened: integer("opened").default(0),
  clicked: integer("clicked").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarAnalytics = pgTable("webinar_analytics", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").notNull().references(() => webinars.id, { onDelete: "cascade" }),
  
  // Date for daily analytics
  date: timestamp("date").notNull(),
  
  // Registration Metrics
  registrations: integer("registrations").default(0),
  registrationRate: decimal("registration_rate", { precision: 5, scale: 2 }),
  
  // Attendance Metrics
  showUpRate: decimal("show_up_rate", { precision: 5, scale: 2 }),
  averageWatchTime: integer("average_watch_time"), // in minutes
  dropOffPoints: json("drop_off_points"), // timestamps where people left
  
  // Engagement Metrics
  chatMessages: integer("chat_messages").default(0),
  questionsAsked: integer("questions_asked").default(0),
  pollParticipation: decimal("poll_participation", { precision: 5, scale: 2 }),
  
  // Conversion Metrics
  offerViews: integer("offer_views").default(0),
  offerClicks: integer("offer_clicks").default(0),
  conversions: integer("conversions").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default('0'),
  
  // Replay Metrics
  replayViews: integer("replay_views").default(0),
  replayConversions: integer("replay_conversions").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Webinar Relations
export const webinarsRelations = relations(webinars, ({ one, many }) => ({
  user: one(users, { fields: [webinars.userId], references: [users.id] }),
  registrationPage: one(pages, { fields: [webinars.registrationPageId], references: [pages.id] }),
  thankyouPage: one(pages, { fields: [webinars.thankyouPageId], references: [pages.id] }),
  replayPage: one(pages, { fields: [webinars.replayPageId], references: [pages.id] }),
  registrations: many(webinarRegistrations),
  sessions: many(webinarSessions),
  chats: many(webinarChats),
  questions: many(webinarQuestions),
  polls: many(webinarPolls),
  offers: many(webinarOffers),
  reminders: many(webinarReminders),
  analytics: many(webinarAnalytics),
}));

export const webinarRegistrationsRelations = relations(webinarRegistrations, ({ one, many }) => ({
  webinar: one(webinars, { fields: [webinarRegistrations.webinarId], references: [webinars.id] }),
  chats: many(webinarChats),
  questions: many(webinarQuestions),
  pollResponses: many(webinarPollResponses),
}));

export const webinarSessionsRelations = relations(webinarSessions, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarSessions.webinarId], references: [webinars.id] }),
}));

export const webinarChatsRelations = relations(webinarChats, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarChats.webinarId], references: [webinars.id] }),
  registration: one(webinarRegistrations, { fields: [webinarChats.registrationId], references: [webinarRegistrations.id] }),
}));

export const webinarQuestionsRelations = relations(webinarQuestions, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarQuestions.webinarId], references: [webinars.id] }),
  registration: one(webinarRegistrations, { fields: [webinarQuestions.registrationId], references: [webinarRegistrations.id] }),
}));

export const webinarPollsRelations = relations(webinarPolls, ({ one, many }) => ({
  webinar: one(webinars, { fields: [webinarPolls.webinarId], references: [webinars.id] }),
  responses: many(webinarPollResponses),
}));

export const webinarPollResponsesRelations = relations(webinarPollResponses, ({ one }) => ({
  poll: one(webinarPolls, { fields: [webinarPollResponses.pollId], references: [webinarPolls.id] }),
  registration: one(webinarRegistrations, { fields: [webinarPollResponses.registrationId], references: [webinarRegistrations.id] }),
}));

export const webinarOffersRelations = relations(webinarOffers, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarOffers.webinarId], references: [webinars.id] }),
}));

export const webinarRemindersRelations = relations(webinarReminders, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarReminders.webinarId], references: [webinars.id] }),
  template: one(emailTemplates, { fields: [webinarReminders.templateId], references: [emailTemplates.id] }),
}));

export const webinarAnalyticsRelations = relations(webinarAnalytics, ({ one }) => ({
  webinar: one(webinars, { fields: [webinarAnalytics.webinarId], references: [webinars.id] }),
}));

// Webinar Insert Schemas
export const insertWebinarSchema = createInsertSchema(webinars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebinarRegistrationSchema = createInsertSchema(webinarRegistrations).omit({
  id: true,
  registeredAt: true,
  updatedAt: true,
});

export const insertWebinarSessionSchema = createInsertSchema(webinarSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebinarPollSchema = createInsertSchema(webinarPolls).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebinarOfferSchema = createInsertSchema(webinarOffers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Webinar Types
export type InsertWebinar = z.infer<typeof insertWebinarSchema>;
export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinarRegistration = z.infer<typeof insertWebinarRegistrationSchema>;
export type WebinarRegistration = typeof webinarRegistrations.$inferSelect;
export type InsertWebinarSession = z.infer<typeof insertWebinarSessionSchema>;
export type WebinarSession = typeof webinarSessions.$inferSelect;
export type InsertWebinarPoll = z.infer<typeof insertWebinarPollSchema>;
export type WebinarPoll = typeof webinarPolls.$inferSelect;
export type InsertWebinarOffer = z.infer<typeof insertWebinarOfferSchema>;
export type WebinarOffer = typeof webinarOffers.$inferSelect;
export type WebinarChat = typeof webinarChats.$inferSelect;
export type WebinarQuestion = typeof webinarQuestions.$inferSelect;
export type WebinarPollResponse = typeof webinarPollResponses.$inferSelect;
export type WebinarReminder = typeof webinarReminders.$inferSelect;
export type WebinarAnalytics = typeof webinarAnalytics.$inferSelect;

// Email Marketing Types
export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertEmailContactSchema = createInsertSchema(emailContacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  subscribedAt: true,
  unsubscribedAt: true
});

export const insertEmailAutomationSchema = createInsertSchema(emailAutomations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailContact = z.infer<typeof insertEmailContactSchema>;
export type EmailContact = typeof emailContacts.$inferSelect;
export type InsertEmailAutomation = z.infer<typeof insertEmailAutomationSchema>;
export type EmailAutomation = typeof emailAutomations.$inferSelect;
export type EmailSend = typeof emailSends.$inferSelect;

// User Profile Types
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBillingHistorySchema = createInsertSchema(billingHistory).omit({
  id: true,
  createdAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  invitedAt: true,
  joinedAt: true,
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertBillingHistory = z.infer<typeof insertBillingHistorySchema>;
export type BillingHistory = typeof billingHistory.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;



// Membership Platform Relations
export const membershipPlansRelations = relations(membershipPlans, ({ one, many }) => ({
  user: one(users, { fields: [membershipPlans.userId], references: [users.id] }),
  memberships: many(memberships),
}));

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, { fields: [memberships.userId], references: [users.id] }),
  plan: one(membershipPlans, { fields: [memberships.planId], references: [membershipPlans.id] }),
}));

export const memberContentRelations = relations(memberContent, ({ one, many }) => ({
  user: one(users, { fields: [memberContent.userId], references: [users.id] }),
  progress: many(memberProgress),
}));

export const memberProgressRelations = relations(memberProgress, ({ one }) => ({
  user: one(users, { fields: [memberProgress.userId], references: [users.id] }),
  content: one(memberContent, { fields: [memberProgress.contentId], references: [memberContent.id] }),
}));

export const communityForumRelations = relations(communityForum, ({ one, many }) => ({
  user: one(users, { fields: [communityForum.userId], references: [users.id] }),
  replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({ one, many }) => ({
  forum: one(communityForum, { fields: [forumReplies.forumId], references: [communityForum.id] }),
  user: one(users, { fields: [forumReplies.userId], references: [users.id] }),
  parentReply: one(forumReplies, { fields: [forumReplies.parentReplyId], references: [forumReplies.id] }),
  childReplies: many(forumReplies),
}));

export const liveEventsRelations = relations(liveEvents, ({ one, many }) => ({
  user: one(users, { fields: [liveEvents.userId], references: [users.id] }),
  rsvps: many(eventRSVPs),
}));

export const eventRSVPsRelations = relations(eventRSVPs, ({ one }) => ({
  event: one(liveEvents, { fields: [eventRSVPs.eventId], references: [liveEvents.id] }),
  user: one(users, { fields: [eventRSVPs.userId], references: [users.id] }),
}));

// Membership Platform Insert Schemas
export const insertMembershipPlanSchema = createInsertSchema(membershipPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMembershipSchema = createInsertSchema(memberships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMemberContentSchema = createInsertSchema(memberContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMemberProgressSchema = createInsertSchema(memberProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunityForumSchema = createInsertSchema(communityForum).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForumReplySchema = createInsertSchema(forumReplies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLiveEventSchema = createInsertSchema(liveEvents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventRSVPSchema = createInsertSchema(eventRSVPs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Membership Platform Types
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type MembershipPlan = typeof membershipPlans.$inferSelect;
export type InsertMembership = z.infer<typeof insertMembershipSchema>;
export type Membership = typeof memberships.$inferSelect;
export type InsertMemberContent = z.infer<typeof insertMemberContentSchema>;
export type MemberContent = typeof memberContent.$inferSelect;
export type InsertMemberProgress = z.infer<typeof insertMemberProgressSchema>;
export type MemberProgress = typeof memberProgress.$inferSelect;
export type InsertCommunityForum = z.infer<typeof insertCommunityForumSchema>;
export type CommunityForum = typeof communityForum.$inferSelect;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type ForumReply = typeof forumReplies.$inferSelect;
export type InsertLiveEvent = z.infer<typeof insertLiveEventSchema>;
export type LiveEvent = typeof liveEvents.$inferSelect;
export type InsertEventRSVP = z.infer<typeof insertEventRSVPSchema>;
export type EventRSVP = typeof eventRSVPs.$inferSelect;
export type MemberActivity = typeof memberActivity.$inferSelect;
export type MemberTag = typeof memberTags.$inferSelect;
export type MemberReward = typeof memberRewards.$inferSelect;
export type MemberChat = typeof memberChat.$inferSelect;
export type MemberAffiliate = typeof memberAffiliates.$inferSelect;
export type GlobalActivity = typeof globalActivity.$inferSelect;
export type AiInteraction = typeof aiInteractions.$inferSelect;
