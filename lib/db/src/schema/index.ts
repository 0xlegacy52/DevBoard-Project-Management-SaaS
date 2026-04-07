import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  uniqueIndex,
  index,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const memberRoleEnum = pgEnum("member_role", [
  "OWNER",
  "ADMIN",
  "MEMBER",
  "VIEWER",
]);

export const priorityEnum = pgEnum("priority", [
  "NO_PRIORITY",
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

export const projectVisibilityEnum = pgEnum("project_visibility", [
  "WORKSPACE",
  "PRIVATE",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "CARD_ASSIGNED",
  "MENTIONED",
  "CARD_OVERDUE",
  "CARD_UPDATED",
  "COMMENT_ADDED",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  passwordHash: text("password_hash").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const workspacesTable = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const workspaceMembersTable = pgTable(
  "workspace_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    role: memberRoleEnum("role").notNull().default("MEMBER"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("workspace_member_unique").on(table.workspaceId, table.userId),
  ]
);

export const projectsTable = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").default("#6366f1"),
  icon: text("icon").default("folder"),
  visibility: projectVisibilityEnum("visibility").notNull().default("WORKSPACE"),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const projectMembersTable = pgTable(
  "project_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id").notNull().references(() => projectsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("project_member_unique").on(table.projectId, table.userId),
  ]
);

export const columnsTable = pgTable("columns", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projectsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const cardsTable = pgTable(
  "cards",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    columnId: uuid("column_id").notNull().references(() => columnsTable.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull().default(0),
    priority: priorityEnum("priority").notNull().default("NO_PRIORITY"),
    dueDate: timestamp("due_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("cards_column_id_idx").on(table.columnId),
  ]
);

export const labelsTable = pgTable("labels", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projectsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#6366f1"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const cardLabelsTable = pgTable(
  "card_labels",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cardId: uuid("card_id").notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
    labelId: uuid("label_id").notNull().references(() => labelsTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("card_label_unique").on(table.cardId, table.labelId),
  ]
);

export const cardAssigneesTable = pgTable(
  "card_assignees",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cardId: uuid("card_id").notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("card_assignee_unique").on(table.cardId, table.userId),
  ]
);

export const checklistsTable = pgTable("checklists", {
  id: uuid("id").primaryKey().defaultRandom(),
  cardId: uuid("card_id").notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const checklistItemsTable = pgTable("checklist_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  checklistId: uuid("checklist_id").notNull().references(() => checklistsTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const commentsTable = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cardId: uuid("card_id").notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    parentId: uuid("parent_id").references((): AnyPgColumn => commentsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("comments_card_id_idx").on(table.cardId),
  ]
);

export const attachmentsTable = pgTable("attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  cardId: uuid("card_id").notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const notificationsTable = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    type: notificationTypeEnum("type").notNull(),
    title: text("title").notNull(),
    message: text("message"),
    cardId: uuid("card_id").references(() => cardsTable.id, { onDelete: "set null" }),
    workspaceId: uuid("workspace_id").references(() => workspacesTable.id, { onDelete: "set null" }),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
  ]
);

export const activityLogsTable = pgTable(
  "activity_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => projectsTable.id, { onDelete: "set null" }),
    cardId: uuid("card_id").references(() => cardsTable.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    details: text("details"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("activity_logs_workspace_id_idx").on(table.workspaceId),
  ]
);

export const refreshTokensTable = pgTable(
  "refresh_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("refresh_tokens_user_id_idx").on(table.userId),
  ]
);

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;

export const insertWorkspaceSchema = createInsertSchema(workspacesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
export type Workspace = typeof workspacesTable.$inferSelect;

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;

export const insertColumnSchema = createInsertSchema(columnsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertColumn = z.infer<typeof insertColumnSchema>;
export type Column = typeof columnsTable.$inferSelect;

export const insertCardSchema = createInsertSchema(cardsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cardsTable.$inferSelect;

export const insertLabelSchema = createInsertSchema(labelsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLabel = z.infer<typeof insertLabelSchema>;
export type Label = typeof labelsTable.$inferSelect;

export const insertCommentSchema = createInsertSchema(commentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof commentsTable.$inferSelect;

export const insertChecklistSchema = createInsertSchema(checklistsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChecklist = z.infer<typeof insertChecklistSchema>;
export type Checklist = typeof checklistsTable.$inferSelect;

export const insertChecklistItemSchema = createInsertSchema(checklistItemsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChecklistItem = z.infer<typeof insertChecklistItemSchema>;
export type ChecklistItem = typeof checklistItemsTable.$inferSelect;

export const insertAttachmentSchema = createInsertSchema(attachmentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAttachment = z.infer<typeof insertAttachmentSchema>;
export type Attachment = typeof attachmentsTable.$inferSelect;

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;

export const usersRelations = relations(usersTable, ({ many }) => ({
  workspaceMemberships: many(workspaceMembersTable),
  projectMemberships: many(projectMembersTable),
  comments: many(commentsTable),
  cardAssignees: many(cardAssigneesTable),
  notifications: many(notificationsTable),
  activityLogs: many(activityLogsTable),
  attachments: many(attachmentsTable),
  refreshTokens: many(refreshTokensTable),
}));

export const workspacesRelations = relations(workspacesTable, ({ many }) => ({
  members: many(workspaceMembersTable),
  projects: many(projectsTable),
  activityLogs: many(activityLogsTable),
  notifications: many(notificationsTable),
}));

export const workspaceMembersRelations = relations(workspaceMembersTable, ({ one }) => ({
  workspace: one(workspacesTable, { fields: [workspaceMembersTable.workspaceId], references: [workspacesTable.id] }),
  user: one(usersTable, { fields: [workspaceMembersTable.userId], references: [usersTable.id] }),
}));

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  workspace: one(workspacesTable, { fields: [projectsTable.workspaceId], references: [workspacesTable.id] }),
  members: many(projectMembersTable),
  columns: many(columnsTable),
  labels: many(labelsTable),
}));

export const projectMembersRelations = relations(projectMembersTable, ({ one }) => ({
  project: one(projectsTable, { fields: [projectMembersTable.projectId], references: [projectsTable.id] }),
  user: one(usersTable, { fields: [projectMembersTable.userId], references: [usersTable.id] }),
}));

export const columnsRelations = relations(columnsTable, ({ one, many }) => ({
  project: one(projectsTable, { fields: [columnsTable.projectId], references: [projectsTable.id] }),
  cards: many(cardsTable),
}));

export const cardsRelations = relations(cardsTable, ({ one, many }) => ({
  column: one(columnsTable, { fields: [cardsTable.columnId], references: [columnsTable.id] }),
  assignees: many(cardAssigneesTable),
  labels: many(cardLabelsTable),
  comments: many(commentsTable),
  checklists: many(checklistsTable),
  attachments: many(attachmentsTable),
}));

export const cardAssigneesRelations = relations(cardAssigneesTable, ({ one }) => ({
  card: one(cardsTable, { fields: [cardAssigneesTable.cardId], references: [cardsTable.id] }),
  user: one(usersTable, { fields: [cardAssigneesTable.userId], references: [usersTable.id] }),
}));

export const labelsRelations = relations(labelsTable, ({ one, many }) => ({
  project: one(projectsTable, { fields: [labelsTable.projectId], references: [projectsTable.id] }),
  cardLabels: many(cardLabelsTable),
}));

export const cardLabelsRelations = relations(cardLabelsTable, ({ one }) => ({
  card: one(cardsTable, { fields: [cardLabelsTable.cardId], references: [cardsTable.id] }),
  label: one(labelsTable, { fields: [cardLabelsTable.labelId], references: [labelsTable.id] }),
}));

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  card: one(cardsTable, { fields: [commentsTable.cardId], references: [cardsTable.id] }),
  user: one(usersTable, { fields: [commentsTable.userId], references: [usersTable.id] }),
  parent: one(commentsTable, { fields: [commentsTable.parentId], references: [commentsTable.id], relationName: "commentReplies" }),
  replies: many(commentsTable, { relationName: "commentReplies" }),
}));

export const checklistsRelations = relations(checklistsTable, ({ one, many }) => ({
  card: one(cardsTable, { fields: [checklistsTable.cardId], references: [cardsTable.id] }),
  items: many(checklistItemsTable),
}));

export const checklistItemsRelations = relations(checklistItemsTable, ({ one }) => ({
  checklist: one(checklistsTable, { fields: [checklistItemsTable.checklistId], references: [checklistsTable.id] }),
}));

export const attachmentsRelations = relations(attachmentsTable, ({ one }) => ({
  card: one(cardsTable, { fields: [attachmentsTable.cardId], references: [cardsTable.id] }),
  user: one(usersTable, { fields: [attachmentsTable.userId], references: [usersTable.id] }),
}));

export const notificationsRelations = relations(notificationsTable, ({ one }) => ({
  user: one(usersTable, { fields: [notificationsTable.userId], references: [usersTable.id] }),
  card: one(cardsTable, { fields: [notificationsTable.cardId], references: [cardsTable.id] }),
  workspace: one(workspacesTable, { fields: [notificationsTable.workspaceId], references: [workspacesTable.id] }),
}));

export const activityLogsRelations = relations(activityLogsTable, ({ one }) => ({
  user: one(usersTable, { fields: [activityLogsTable.userId], references: [usersTable.id] }),
  workspace: one(workspacesTable, { fields: [activityLogsTable.workspaceId], references: [workspacesTable.id] }),
  project: one(projectsTable, { fields: [activityLogsTable.projectId], references: [projectsTable.id] }),
  card: one(cardsTable, { fields: [activityLogsTable.cardId], references: [cardsTable.id] }),
}));

export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, { fields: [refreshTokensTable.userId], references: [usersTable.id] }),
}));
