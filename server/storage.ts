import { 
  users, 
  funnels, 
  pages, 
  leadMagnets, 
  leads, 
  templates,
  emailCampaigns,
  emailTemplates,
  emailContacts,
  emailAutomations,
  emailSends,
  userProfiles,
  billingHistory,
  teamMembers,
  membershipPlans,
  memberships,
  memberContent,
  memberProgress,
  communityForum,
  forumReplies,
  liveEvents,
  eventRSVPs,
  memberActivity,
  memberTags,
  memberRewards,
  memberChat,
  memberAffiliates,
  webinars,
  webinarRegistrations,
  type User, 
  type InsertUser,
  type UserProfile,
  type InsertUserProfile,
  type BillingHistory,
  type InsertBillingHistory,
  type TeamMember,
  type InsertTeamMember,
  type Funnel,
  type InsertFunnel,
  type Page,
  type InsertPage,
  type LeadMagnet,
  type InsertLeadMagnet,
  type Lead,
  type InsertLead,
  type Template,
  type InsertTemplate,
  type EmailCampaign,
  type InsertEmailCampaign,
  type EmailTemplate,
  type InsertEmailTemplate,
  type EmailContact,
  type InsertEmailContact,
  type EmailAutomation,
  type InsertEmailAutomation,
  type EmailSend,
  type MembershipPlan,
  type InsertMembershipPlan,
  type Membership,
  type InsertMembership,
  type MemberContent,
  type InsertMemberContent,
  type MemberProgress,
  type InsertMemberProgress,
  type CommunityForum,
  type InsertCommunityForum,
  type ForumReply,
  type InsertForumReply,
  type LiveEvent,
  type InsertLiveEvent,
  type EventRSVP,
  type InsertEventRSVP,
  type Webinar,
  type InsertWebinar,
  type WebinarRegistration,
  type InsertWebinarRegistration
} from "../shared/schema";
import { db } from "./db";
import { eq, desc, and, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Funnel methods
  getFunnels(userId: number): Promise<Funnel[]>;
  getFunnel(id: number): Promise<Funnel | undefined>;
  createFunnel(funnel: InsertFunnel): Promise<Funnel>;
  updateFunnel(id: number, funnel: Partial<InsertFunnel>): Promise<Funnel>;
  deleteFunnel(id: number): Promise<void>;
  
  // Page methods
  getPages(funnelId: number): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: number): Promise<void>;
  
  // Lead Magnet methods
  getLeadMagnets(userId: number): Promise<LeadMagnet[]>;
  getLeadMagnet(id: number): Promise<LeadMagnet | undefined>;
  createLeadMagnet(leadMagnet: InsertLeadMagnet): Promise<LeadMagnet>;
  updateLeadMagnet(id: number, leadMagnet: Partial<InsertLeadMagnet>): Promise<LeadMagnet>;
  deleteLeadMagnet(id: number): Promise<void>;
  
  // Lead methods
  getLeads(userId: number): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead>;
  deleteLead(id: number): Promise<void>;
  
  // Template methods
  getTemplates(category?: string): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template>;
  deleteTemplate(id: number): Promise<void>;
  
  // Email Campaign methods
  getEmailCampaigns(userId: number): Promise<EmailCampaign[]>;
  getEmailCampaign(id: number): Promise<EmailCampaign | undefined>;
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  updateEmailCampaign(id: number, campaign: Partial<InsertEmailCampaign>): Promise<EmailCampaign>;
  deleteEmailCampaign(id: number): Promise<void>;
  
  // Email Template methods
  getEmailTemplates(userId?: number): Promise<EmailTemplate[]>;
  getEmailTemplate(id: number): Promise<EmailTemplate | undefined>;
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateEmailTemplate(id: number, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate>;
  deleteEmailTemplate(id: number): Promise<void>;
  
  // Email Contact methods
  getEmailContacts(userId: number): Promise<EmailContact[]>;
  getEmailContact(id: number): Promise<EmailContact | undefined>;
  createEmailContact(contact: InsertEmailContact): Promise<EmailContact>;
  updateEmailContact(id: number, contact: Partial<InsertEmailContact>): Promise<EmailContact>;
  deleteEmailContact(id: number): Promise<void>;
  
  // Email Automation methods
  getEmailAutomations(userId: number): Promise<EmailAutomation[]>;
  getEmailAutomation(id: number): Promise<EmailAutomation | undefined>;
  createEmailAutomation(automation: InsertEmailAutomation): Promise<EmailAutomation>;
  updateEmailAutomation(id: number, automation: Partial<InsertEmailAutomation>): Promise<EmailAutomation>;
  deleteEmailAutomation(id: number): Promise<void>;
  
  // User Profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Billing History methods
  getBillingHistory(userId: number): Promise<BillingHistory[]>;
  createBillingRecord(billing: InsertBillingHistory): Promise<BillingHistory>;
  
  // Team Member methods
  getTeamMembers(userId: number): Promise<TeamMember[]>;
  addTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  removeTeamMember(id: number): Promise<void>;

  // Membership Plan methods
  getMembershipPlans(userId: number): Promise<MembershipPlan[]>;
  getMembershipPlan(id: number): Promise<MembershipPlan | undefined>;
  createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan>;
  updateMembershipPlan(id: number, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan>;
  deleteMembershipPlan(id: number): Promise<void>;

  // Membership methods
  getMemberships(userId: number): Promise<Membership[]>;
  getMembership(id: number): Promise<Membership | undefined>;
  getUserMembership(userId: number): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  updateMembership(id: number, membership: Partial<InsertMembership>): Promise<Membership>;
  cancelMembership(id: number): Promise<Membership>;

  // Member Content methods
  getMemberContent(userId: number, accessLevel?: number): Promise<MemberContent[]>;
  getMemberContentItem(id: number): Promise<MemberContent | undefined>;
  createMemberContent(content: InsertMemberContent): Promise<MemberContent>;
  updateMemberContent(id: number, content: Partial<InsertMemberContent>): Promise<MemberContent>;
  deleteMemberContent(id: number): Promise<void>;

  // Member Progress methods
  getMemberProgress(userId: number, contentId?: number): Promise<MemberProgress[]>;
  createOrUpdateProgress(progress: InsertMemberProgress): Promise<MemberProgress>;
  markContentComplete(userId: number, contentId: number): Promise<MemberProgress>;

  // Community Forum methods
  getForumPosts(accessLevel?: number): Promise<CommunityForum[]>;
  getForumPost(id: number): Promise<CommunityForum | undefined>;
  createForumPost(post: InsertCommunityForum): Promise<CommunityForum>;
  updateForumPost(id: number, post: Partial<InsertCommunityForum>): Promise<CommunityForum>;
  deleteForumPost(id: number): Promise<void>;

  // Forum Reply methods
  getForumReplies(forumId: number): Promise<ForumReply[]>;
  createForumReply(reply: InsertForumReply): Promise<ForumReply>;
  updateForumReply(id: number, reply: Partial<InsertForumReply>): Promise<ForumReply>;
  deleteForumReply(id: number): Promise<void>;

  // Live Event methods
  getLiveEvents(userId: number): Promise<LiveEvent[]>;
  getLiveEvent(id: number): Promise<LiveEvent | undefined>;
  createLiveEvent(event: InsertLiveEvent): Promise<LiveEvent>;
  updateLiveEvent(id: number, event: Partial<InsertLiveEvent>): Promise<LiveEvent>;
  deleteLiveEvent(id: number): Promise<void>;

  // Event RSVP methods
  getEventRSVPs(eventId: number): Promise<EventRSVP[]>;
  getUserEventRSVP(userId: number, eventId: number): Promise<EventRSVP | undefined>;
  createEventRSVP(rsvp: InsertEventRSVP): Promise<EventRSVP>;
  updateEventRSVP(id: number, rsvp: Partial<InsertEventRSVP>): Promise<EventRSVP>;

  // Webinar methods
  getWebinars(userId: number): Promise<Webinar[]>;
  getWebinar(id: number): Promise<Webinar | undefined>;
  createWebinar(webinar: InsertWebinar): Promise<Webinar>;
  updateWebinar(id: number, webinar: Partial<InsertWebinar>): Promise<Webinar>;
  deleteWebinar(id: number): Promise<void>;

  // Webinar Registration methods
  getWebinarRegistrations(webinarId: number): Promise<WebinarRegistration[]>;
  getWebinarRegistration(id: number): Promise<WebinarRegistration | undefined>;
  createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistration>;
  updateWebinarRegistration(id: number, registration: Partial<InsertWebinarRegistration>): Promise<WebinarRegistration>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Funnel methods
  async getFunnels(userId: number): Promise<Funnel[]> {
    return await db
      .select()
      .from(funnels)
      .where(eq(funnels.userId, userId))
      .orderBy(desc(funnels.createdAt));
  }

  async getFunnel(id: number): Promise<Funnel | undefined> {
    const [funnel] = await db.select().from(funnels).where(eq(funnels.id, id));
    return funnel || undefined;
  }

  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const [newFunnel] = await db
      .insert(funnels)
      .values(funnel)
      .returning();
    return newFunnel;
  }

  async updateFunnel(id: number, funnel: Partial<InsertFunnel>): Promise<Funnel> {
    const [updatedFunnel] = await db
      .update(funnels)
      .set({ ...funnel, updatedAt: new Date() })
      .where(eq(funnels.id, id))
      .returning();
    return updatedFunnel;
  }

  async deleteFunnel(id: number): Promise<void> {
    await db.delete(funnels).where(eq(funnels.id, id));
  }

  // Page methods
  async getPages(funnelId: number): Promise<Page[]> {
    return await db
      .select()
      .from(pages)
      .where(eq(pages.funnelId, funnelId))
      .orderBy(pages.order);
  }

  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db
      .insert(pages)
      .values(page)
      .returning();
    return newPage;
  }

  async updatePage(id: number, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Lead Magnet methods
  async getLeadMagnets(userId: number): Promise<LeadMagnet[]> {
    return await db
      .select()
      .from(leadMagnets)
      .where(eq(leadMagnets.userId, userId))
      .orderBy(desc(leadMagnets.createdAt));
  }

  async getLeadMagnet(id: number): Promise<LeadMagnet | undefined> {
    const [leadMagnet] = await db.select().from(leadMagnets).where(eq(leadMagnets.id, id));
    return leadMagnet || undefined;
  }

  async createLeadMagnet(leadMagnet: InsertLeadMagnet): Promise<LeadMagnet> {
    const [newLeadMagnet] = await db
      .insert(leadMagnets)
      .values(leadMagnet)
      .returning();
    return newLeadMagnet;
  }

  async updateLeadMagnet(id: number, leadMagnet: Partial<InsertLeadMagnet>): Promise<LeadMagnet> {
    const [updatedLeadMagnet] = await db
      .update(leadMagnets)
      .set({ ...leadMagnet, updatedAt: new Date() })
      .where(eq(leadMagnets.id, id))
      .returning();
    return updatedLeadMagnet;
  }

  async deleteLeadMagnet(id: number): Promise<void> {
    await db.delete(leadMagnets).where(eq(leadMagnets.id, id));
  }

  // Lead methods
  async getLeads(userId: number): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.userId, userId))
      .orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values(lead)
      .returning();
    return newLead;
  }

  async updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead> {
    const [updatedLead] = await db
      .update(leads)
      .set({ ...lead, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return updatedLead;
  }

  async deleteLead(id: number): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  // Template methods
  async getTemplates(category?: string): Promise<Template[]> {
    const query = db.select().from(templates);
    
    if (category) {
      return await query.where(eq(templates.category, category)).orderBy(desc(templates.createdAt));
    }
    
    return await query.orderBy(desc(templates.createdAt));
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [newTemplate] = await db
      .insert(templates)
      .values(template)
      .returning();
    return newTemplate;
  }

  async updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template> {
    const [updatedTemplate] = await db
      .update(templates)
      .set(template)
      .where(eq(templates.id, id))
      .returning();
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }

  // Email Campaign methods
  async getEmailCampaigns(userId: number): Promise<EmailCampaign[]> {
    return db.select().from(emailCampaigns).where(eq(emailCampaigns.userId, userId));
  }

  async getEmailCampaign(id: number): Promise<EmailCampaign | undefined> {
    const [campaign] = await db.select().from(emailCampaigns).where(eq(emailCampaigns.id, id));
    return campaign || undefined;
  }

  async createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const [newCampaign] = await db.insert(emailCampaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateEmailCampaign(id: number, campaign: Partial<InsertEmailCampaign>): Promise<EmailCampaign> {
    const [updatedCampaign] = await db
      .update(emailCampaigns)
      .set({ ...campaign, updatedAt: new Date() })
      .where(eq(emailCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }

  async deleteEmailCampaign(id: number): Promise<void> {
    await db.delete(emailCampaigns).where(eq(emailCampaigns.id, id));
  }

  // Email Template methods
  async getEmailTemplates(userId?: number): Promise<EmailTemplate[]> {
    if (userId) {
      return db.select().from(emailTemplates).where(
        or(eq(emailTemplates.userId, userId), eq(emailTemplates.isPublic, true))
      );
    }
    return db.select().from(emailTemplates).where(eq(emailTemplates.isPublic, true));
  }

  async getEmailTemplate(id: number): Promise<EmailTemplate | undefined> {
    const [template] = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id));
    return template || undefined;
  }

  async createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const [newTemplate] = await db.insert(emailTemplates).values(template).returning();
    return newTemplate;
  }

  async updateEmailTemplate(id: number, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate> {
    const [updatedTemplate] = await db
      .update(emailTemplates)
      .set({ ...template, updatedAt: new Date() })
      .where(eq(emailTemplates.id, id))
      .returning();
    return updatedTemplate;
  }

  async deleteEmailTemplate(id: number): Promise<void> {
    await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
  }

  // Email Contact methods
  async getEmailContacts(userId: number): Promise<EmailContact[]> {
    return db.select().from(emailContacts).where(eq(emailContacts.userId, userId));
  }

  async getEmailContact(id: number): Promise<EmailContact | undefined> {
    const [contact] = await db.select().from(emailContacts).where(eq(emailContacts.id, id));
    return contact || undefined;
  }

  async createEmailContact(contact: InsertEmailContact): Promise<EmailContact> {
    const [newContact] = await db.insert(emailContacts).values(contact).returning();
    return newContact;
  }

  async updateEmailContact(id: number, contact: Partial<InsertEmailContact>): Promise<EmailContact> {
    const [updatedContact] = await db
      .update(emailContacts)
      .set({ ...contact, updatedAt: new Date() })
      .where(eq(emailContacts.id, id))
      .returning();
    return updatedContact;
  }

  async deleteEmailContact(id: number): Promise<void> {
    await db.delete(emailContacts).where(eq(emailContacts.id, id));
  }

  // Email Automation methods
  async getEmailAutomations(userId: number): Promise<EmailAutomation[]> {
    return db.select().from(emailAutomations).where(eq(emailAutomations.userId, userId));
  }

  async getEmailAutomation(id: number): Promise<EmailAutomation | undefined> {
    const [automation] = await db.select().from(emailAutomations).where(eq(emailAutomations.id, id));
    return automation || undefined;
  }

  async createEmailAutomation(automation: InsertEmailAutomation): Promise<EmailAutomation> {
    const [newAutomation] = await db.insert(emailAutomations).values(automation).returning();
    return newAutomation;
  }

  async updateEmailAutomation(id: number, automation: Partial<InsertEmailAutomation>): Promise<EmailAutomation> {
    const [updatedAutomation] = await db
      .update(emailAutomations)
      .set({ ...automation, updatedAt: new Date() })
      .where(eq(emailAutomations.id, id))
      .returning();
    return updatedAutomation;
  }

  async deleteEmailAutomation(id: number): Promise<void> {
    await db.delete(emailAutomations).where(eq(emailAutomations.id, id));
  }
  
  // User Profile methods
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile || undefined;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return newProfile;
  }

  async updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }
  
  // Billing History methods
  async getBillingHistory(userId: number): Promise<BillingHistory[]> {
    return await db.select().from(billingHistory).where(eq(billingHistory.userId, userId)).orderBy(desc(billingHistory.billingDate));
  }

  async createBillingRecord(billing: InsertBillingHistory): Promise<BillingHistory> {
    const [newBilling] = await db
      .insert(billingHistory)
      .values(billing)
      .returning();
    return newBilling;
  }
  
  // Team Member methods
  async getTeamMembers(userId: number): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).where(eq(teamMembers.userId, userId));
  }

  async addTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedMember] = await db
      .update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember;
  }

  async removeTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Membership Plan methods
  async getMembershipPlans(userId: number): Promise<MembershipPlan[]> {
    return await db.select().from(membershipPlans).where(eq(membershipPlans.userId, userId)).orderBy(desc(membershipPlans.createdAt));
  }

  async getMembershipPlan(id: number): Promise<MembershipPlan | undefined> {
    const [plan] = await db.select().from(membershipPlans).where(eq(membershipPlans.id, id));
    return plan || undefined;
  }

  async createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan> {
    const [newPlan] = await db.insert(membershipPlans).values(plan).returning();
    return newPlan;
  }

  async updateMembershipPlan(id: number, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan> {
    const [updatedPlan] = await db
      .update(membershipPlans)
      .set({ ...plan, updatedAt: new Date() })
      .where(eq(membershipPlans.id, id))
      .returning();
    return updatedPlan;
  }

  async deleteMembershipPlan(id: number): Promise<void> {
    await db.delete(membershipPlans).where(eq(membershipPlans.id, id));
  }

  // Membership methods
  async getMemberships(userId: number): Promise<Membership[]> {
    return await db.select().from(memberships).where(eq(memberships.userId, userId)).orderBy(desc(memberships.createdAt));
  }

  async getMembership(id: number): Promise<Membership | undefined> {
    const [membership] = await db.select().from(memberships).where(eq(memberships.id, id));
    return membership || undefined;
  }

  async getUserMembership(userId: number): Promise<Membership | undefined> {
    const [membership] = await db.select().from(memberships).where(and(eq(memberships.userId, userId), eq(memberships.status, "active")));
    return membership || undefined;
  }

  async createMembership(membership: InsertMembership): Promise<Membership> {
    const [newMembership] = await db.insert(memberships).values(membership).returning();
    return newMembership;
  }

  async updateMembership(id: number, membership: Partial<InsertMembership>): Promise<Membership> {
    const [updatedMembership] = await db
      .update(memberships)
      .set({ ...membership, updatedAt: new Date() })
      .where(eq(memberships.id, id))
      .returning();
    return updatedMembership;
  }

  async cancelMembership(id: number): Promise<Membership> {
    const [cancelledMembership] = await db
      .update(memberships)
      .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
      .where(eq(memberships.id, id))
      .returning();
    return cancelledMembership;
  }

  // Member Content methods
  async getMemberContent(userId: number, accessLevel?: number): Promise<MemberContent[]> {
    if (accessLevel !== undefined) {
      return await db.select().from(memberContent)
        .where(and(eq(memberContent.userId, userId), eq(memberContent.requiredAccessLevel, accessLevel)))
        .orderBy(memberContent.order, desc(memberContent.createdAt));
    }
    return await db.select().from(memberContent)
      .where(eq(memberContent.userId, userId))
      .orderBy(memberContent.order, desc(memberContent.createdAt));
  }

  async getMemberContentItem(id: number): Promise<MemberContent | undefined> {
    const [content] = await db.select().from(memberContent).where(eq(memberContent.id, id));
    return content || undefined;
  }

  async createMemberContent(content: InsertMemberContent): Promise<MemberContent> {
    const [newContent] = await db.insert(memberContent).values(content).returning();
    return newContent;
  }

  async updateMemberContent(id: number, content: Partial<InsertMemberContent>): Promise<MemberContent> {
    const [updatedContent] = await db
      .update(memberContent)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(memberContent.id, id))
      .returning();
    return updatedContent;
  }

  async deleteMemberContent(id: number): Promise<void> {
    await db.delete(memberContent).where(eq(memberContent.id, id));
  }

  // Member Progress methods
  async getMemberProgress(userId: number, contentId?: number): Promise<MemberProgress[]> {
    if (contentId) {
      return await db.select().from(memberProgress)
        .where(and(eq(memberProgress.userId, userId), eq(memberProgress.contentId, contentId)))
        .orderBy(desc(memberProgress.lastAccessedAt));
    }
    return await db.select().from(memberProgress)
      .where(eq(memberProgress.userId, userId))
      .orderBy(desc(memberProgress.lastAccessedAt));
  }

  async createOrUpdateProgress(progress: InsertMemberProgress): Promise<MemberProgress> {
    const existing = await db.select().from(memberProgress).where(
      and(eq(memberProgress.userId, progress.userId), eq(memberProgress.contentId, progress.contentId))
    );
    
    if (existing.length > 0) {
      const [updated] = await db
        .update(memberProgress)
        .set({ ...progress, updatedAt: new Date() })
        .where(and(eq(memberProgress.userId, progress.userId), eq(memberProgress.contentId, progress.contentId)))
        .returning();
      return updated;
    } else {
      const [newProgress] = await db.insert(memberProgress).values(progress).returning();
      return newProgress;
    }
  }

  async markContentComplete(userId: number, contentId: number): Promise<MemberProgress> {
    const [completed] = await db
      .update(memberProgress)
      .set({ 
        isCompleted: true, 
        progressPercentage: 100, 
        completedAt: new Date(),
        updatedAt: new Date()
      })
      .where(and(eq(memberProgress.userId, userId), eq(memberProgress.contentId, contentId)))
      .returning();
    return completed;
  }

  // Community Forum methods
  async getForumPosts(accessLevel?: number): Promise<CommunityForum[]> {
    if (accessLevel !== undefined) {
      return await db.select().from(communityForum)
        .where(eq(communityForum.requiredAccessLevel, accessLevel))
        .orderBy(desc(communityForum.isPinned), desc(communityForum.createdAt));
    }
    return await db.select().from(communityForum)
      .orderBy(desc(communityForum.isPinned), desc(communityForum.createdAt));
  }

  async getForumPost(id: number): Promise<CommunityForum | undefined> {
    const [post] = await db.select().from(communityForum).where(eq(communityForum.id, id));
    return post || undefined;
  }

  async createForumPost(post: InsertCommunityForum): Promise<CommunityForum> {
    const [newPost] = await db.insert(communityForum).values(post).returning();
    return newPost;
  }

  async updateForumPost(id: number, post: Partial<InsertCommunityForum>): Promise<CommunityForum> {
    const [updatedPost] = await db
      .update(communityForum)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(communityForum.id, id))
      .returning();
    return updatedPost;
  }

  async deleteForumPost(id: number): Promise<void> {
    await db.delete(communityForum).where(eq(communityForum.id, id));
  }

  // Forum Reply methods
  async getForumReplies(forumId: number): Promise<ForumReply[]> {
    return await db.select().from(forumReplies).where(eq(forumReplies.forumId, forumId)).orderBy(forumReplies.createdAt);
  }

  async createForumReply(reply: InsertForumReply): Promise<ForumReply> {
    const [newReply] = await db.insert(forumReplies).values(reply).returning();
    return newReply;
  }

  async updateForumReply(id: number, reply: Partial<InsertForumReply>): Promise<ForumReply> {
    const [updatedReply] = await db
      .update(forumReplies)
      .set({ ...reply, updatedAt: new Date() })
      .where(eq(forumReplies.id, id))
      .returning();
    return updatedReply;
  }

  async deleteForumReply(id: number): Promise<void> {
    await db.delete(forumReplies).where(eq(forumReplies.id, id));
  }

  // Live Event methods
  async getLiveEvents(userId: number): Promise<LiveEvent[]> {
    return await db.select().from(liveEvents).where(eq(liveEvents.userId, userId)).orderBy(desc(liveEvents.startTime));
  }

  async getLiveEvent(id: number): Promise<LiveEvent | undefined> {
    const [event] = await db.select().from(liveEvents).where(eq(liveEvents.id, id));
    return event || undefined;
  }

  async createLiveEvent(event: InsertLiveEvent): Promise<LiveEvent> {
    const [newEvent] = await db.insert(liveEvents).values(event).returning();
    return newEvent;
  }

  async updateLiveEvent(id: number, event: Partial<InsertLiveEvent>): Promise<LiveEvent> {
    const [updatedEvent] = await db
      .update(liveEvents)
      .set({ ...event, updatedAt: new Date() })
      .where(eq(liveEvents.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteLiveEvent(id: number): Promise<void> {
    await db.delete(liveEvents).where(eq(liveEvents.id, id));
  }

  // Event RSVP methods
  async getEventRSVPs(eventId: number): Promise<EventRSVP[]> {
    return await db.select().from(eventRSVPs).where(eq(eventRSVPs.eventId, eventId)).orderBy(desc(eventRSVPs.createdAt));
  }

  async getUserEventRSVP(userId: number, eventId: number): Promise<EventRSVP | undefined> {
    const [rsvp] = await db.select().from(eventRSVPs).where(and(eq(eventRSVPs.userId, userId), eq(eventRSVPs.eventId, eventId)));
    return rsvp || undefined;
  }

  async createEventRSVP(rsvp: InsertEventRSVP): Promise<EventRSVP> {
    const [newRSVP] = await db.insert(eventRSVPs).values(rsvp).returning();
    return newRSVP;
  }

  async updateEventRSVP(id: number, rsvp: Partial<InsertEventRSVP>): Promise<EventRSVP> {
    const [updatedRSVP] = await db
      .update(eventRSVPs)
      .set({ ...rsvp, updatedAt: new Date() })
      .where(eq(eventRSVPs.id, id))
      .returning();
    return updatedRSVP;
  }

  // Webinar methods
  async getWebinars(userId: number): Promise<Webinar[]> {
    return await db.select().from(webinars).where(eq(webinars.userId, userId)).orderBy(desc(webinars.createdAt));
  }

  async getWebinar(id: number): Promise<Webinar | undefined> {
    const [webinar] = await db.select().from(webinars).where(eq(webinars.id, id));
    return webinar || undefined;
  }

  async createWebinar(webinar: InsertWebinar): Promise<Webinar> {
    const [newWebinar] = await db.insert(webinars).values(webinar).returning();
    return newWebinar;
  }

  async updateWebinar(id: number, webinar: Partial<InsertWebinar>): Promise<Webinar> {
    const [updatedWebinar] = await db
      .update(webinars)
      .set({ ...webinar, updatedAt: new Date() })
      .where(eq(webinars.id, id))
      .returning();
    return updatedWebinar;
  }

  async deleteWebinar(id: number): Promise<void> {
    await db.delete(webinars).where(eq(webinars.id, id));
  }

  // Webinar Registration methods
  async getWebinarRegistrations(webinarId: number): Promise<WebinarRegistration[]> {
    return await db.select().from(webinarRegistrations).where(eq(webinarRegistrations.webinarId, webinarId)).orderBy(desc(webinarRegistrations.registeredAt));
  }

  async getWebinarRegistration(id: number): Promise<WebinarRegistration | undefined> {
    const [registration] = await db.select().from(webinarRegistrations).where(eq(webinarRegistrations.id, id));
    return registration || undefined;
  }

  async createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistration> {
    const [newRegistration] = await db.insert(webinarRegistrations).values(registration).returning();
    return newRegistration;
  }

  async updateWebinarRegistration(id: number, registration: Partial<InsertWebinarRegistration>): Promise<WebinarRegistration> {
    const [updatedRegistration] = await db
      .update(webinarRegistrations)
      .set({ ...registration, updatedAt: new Date() })
      .where(eq(webinarRegistrations.id, id))
      .returning();
    return updatedRegistration;
  }
}

export const storage = new DatabaseStorage();
