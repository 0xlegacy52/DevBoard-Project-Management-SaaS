import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
export interface HealthStatus {
    status: string;
}
export interface ErrorResponse {
    error: string;
}
export interface SuccessResponse {
    success: boolean;
}
export interface RegisterBody {
    email: string;
    name: string;
    /** @minLength 8 */
    password: string;
}
export interface LoginBody {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
}
export type UserResponseAvatarUrl = string | null;
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    avatarUrl?: UserResponseAvatarUrl;
    emailVerified: boolean;
    createdAt: string;
}
export interface CreateWorkspaceBody {
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
}
export interface UpdateWorkspaceBody {
    name?: string;
    description?: string;
    logoUrl?: string;
}
export type WorkspaceResponseDescription = string | null;
export type WorkspaceResponseLogoUrl = string | null;
export type WorkspaceResponseRole = (typeof WorkspaceResponseRole)[keyof typeof WorkspaceResponseRole];
export declare const WorkspaceResponseRole: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
    readonly VIEWER: "VIEWER";
};
export interface WorkspaceResponse {
    id: string;
    name: string;
    slug: string;
    description?: WorkspaceResponseDescription;
    logoUrl?: WorkspaceResponseLogoUrl;
    memberCount?: number;
    role?: WorkspaceResponseRole;
    createdAt: string;
    updatedAt: string;
}
export type InviteMemberBodyRole = (typeof InviteMemberBodyRole)[keyof typeof InviteMemberBodyRole];
export declare const InviteMemberBodyRole: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
    readonly VIEWER: "VIEWER";
};
export interface InviteMemberBody {
    email: string;
    role?: InviteMemberBodyRole;
}
export type UpdateMemberRoleBodyRole = (typeof UpdateMemberRoleBodyRole)[keyof typeof UpdateMemberRoleBodyRole];
export declare const UpdateMemberRoleBodyRole: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
    readonly VIEWER: "VIEWER";
};
export interface UpdateMemberRoleBody {
    role: UpdateMemberRoleBodyRole;
}
export type WorkspaceMemberResponseUserAvatarUrl = string | null;
export type WorkspaceMemberResponseRole = (typeof WorkspaceMemberResponseRole)[keyof typeof WorkspaceMemberResponseRole];
export declare const WorkspaceMemberResponseRole: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
    readonly VIEWER: "VIEWER";
};
export interface WorkspaceMemberResponse {
    id: string;
    userId: string;
    userName?: string;
    userEmail?: string;
    userAvatarUrl?: WorkspaceMemberResponseUserAvatarUrl;
    role: WorkspaceMemberResponseRole;
    createdAt: string;
}
export type CreateProjectBodyVisibility = (typeof CreateProjectBodyVisibility)[keyof typeof CreateProjectBodyVisibility];
export declare const CreateProjectBodyVisibility: {
    readonly WORKSPACE: "WORKSPACE";
    readonly PRIVATE: "PRIVATE";
};
export interface CreateProjectBody {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    visibility?: CreateProjectBodyVisibility;
}
export type UpdateProjectBodyVisibility = (typeof UpdateProjectBodyVisibility)[keyof typeof UpdateProjectBodyVisibility];
export declare const UpdateProjectBodyVisibility: {
    readonly WORKSPACE: "WORKSPACE";
    readonly PRIVATE: "PRIVATE";
};
export interface UpdateProjectBody {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    visibility?: UpdateProjectBodyVisibility;
    archived?: boolean;
}
export type ProjectResponseDescription = string | null;
export type ProjectResponseColor = string | null;
export type ProjectResponseIcon = string | null;
export type ProjectResponseVisibility = (typeof ProjectResponseVisibility)[keyof typeof ProjectResponseVisibility];
export declare const ProjectResponseVisibility: {
    readonly WORKSPACE: "WORKSPACE";
    readonly PRIVATE: "PRIVATE";
};
export interface ProjectResponse {
    id: string;
    workspaceId: string;
    name: string;
    description?: ProjectResponseDescription;
    color?: ProjectResponseColor;
    icon?: ProjectResponseIcon;
    visibility: ProjectResponseVisibility;
    archived: boolean;
    cardCount?: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateColumnBody {
    name: string;
    order?: number;
}
export interface UpdateColumnBody {
    name?: string;
    order?: number;
}
export interface ReorderColumnsBody {
    columnIds: string[];
}
export interface ColumnResponse {
    id: string;
    projectId: string;
    name: string;
    order: number;
    cards?: CardResponse[];
    createdAt: string;
    updatedAt: string;
}
export type CreateCardBodyPriority = (typeof CreateCardBodyPriority)[keyof typeof CreateCardBodyPriority];
export declare const CreateCardBodyPriority: {
    readonly NO_PRIORITY: "NO_PRIORITY";
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type CreateCardBodyDueDate = string | null;
export interface CreateCardBody {
    title: string;
    description?: string;
    priority?: CreateCardBodyPriority;
    dueDate?: CreateCardBodyDueDate;
    order?: number;
}
export type UpdateCardBodyPriority = (typeof UpdateCardBodyPriority)[keyof typeof UpdateCardBodyPriority];
export declare const UpdateCardBodyPriority: {
    readonly NO_PRIORITY: "NO_PRIORITY";
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type UpdateCardBodyDueDate = string | null;
export interface UpdateCardBody {
    title?: string;
    description?: string;
    priority?: UpdateCardBodyPriority;
    dueDate?: UpdateCardBodyDueDate;
}
export interface MoveCardBody {
    columnId: string;
    order: number;
}
export type CardResponseDescription = string | null;
export type CardResponsePriority = (typeof CardResponsePriority)[keyof typeof CardResponsePriority];
export declare const CardResponsePriority: {
    readonly NO_PRIORITY: "NO_PRIORITY";
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type CardResponseDueDate = string | null;
export interface CardResponse {
    id: string;
    columnId: string;
    title: string;
    description?: CardResponseDescription;
    order: number;
    priority: CardResponsePriority;
    dueDate?: CardResponseDueDate;
    assignees?: CardAssigneeResponse[];
    labels?: LabelResponse[];
    commentCount?: number;
    checklistProgress?: number;
    createdAt: string;
    updatedAt: string;
}
export type CardDetailResponseDescription = string | null;
export type CardDetailResponsePriority = (typeof CardDetailResponsePriority)[keyof typeof CardDetailResponsePriority];
export declare const CardDetailResponsePriority: {
    readonly NO_PRIORITY: "NO_PRIORITY";
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type CardDetailResponseDueDate = string | null;
export interface CardDetailResponse {
    id: string;
    columnId: string;
    title: string;
    description?: CardDetailResponseDescription;
    order: number;
    priority: CardDetailResponsePriority;
    dueDate?: CardDetailResponseDueDate;
    assignees?: CardAssigneeResponse[];
    labels?: LabelResponse[];
    checklists?: ChecklistResponse[];
    comments?: CommentResponse[];
    attachments?: AttachmentResponse[];
    activity?: ActivityLogResponse[];
    createdAt: string;
    updatedAt: string;
}
export interface CardAssigneeBody {
    userId: string;
}
export type CardAssigneeResponseUserAvatarUrl = string | null;
export interface CardAssigneeResponse {
    id: string;
    userId: string;
    userName?: string;
    userAvatarUrl?: CardAssigneeResponseUserAvatarUrl;
}
export interface CardLabelBody {
    labelId: string;
}
export interface CardLabelResponse {
    id: string;
    cardId: string;
    labelId: string;
}
export interface LabelResponse {
    id: string;
    projectId: string;
    name: string;
    color: string;
    createdAt?: string;
}
export interface CreateLabelBody {
    name: string;
    color: string;
}
export interface UpdateLabelBody {
    name?: string;
    color?: string;
}
export interface CreateChecklistBody {
    title: string;
}
export interface UpdateChecklistBody {
    title?: string;
}
export interface ChecklistResponse {
    id: string;
    cardId: string;
    title: string;
    items?: ChecklistItemResponse[];
    progress?: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateChecklistItemBody {
    title: string;
}
export interface UpdateChecklistItemBody {
    title?: string;
    completed?: boolean;
}
export interface ChecklistItemResponse {
    id: string;
    checklistId: string;
    title: string;
    completed: boolean;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}
export type CreateCommentBodyParentId = string | null;
export interface CreateCommentBody {
    content: string;
    parentId?: CreateCommentBodyParentId;
}
export interface UpdateCommentBody {
    content: string;
}
export type CommentResponseUserAvatarUrl = string | null;
export type CommentResponseParentId = string | null;
export interface CommentResponse {
    id: string;
    cardId: string;
    userId: string;
    userName?: string;
    userAvatarUrl?: CommentResponseUserAvatarUrl;
    content: string;
    parentId?: CommentResponseParentId;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAttachmentBody {
    name: string;
    url: string;
    type?: string;
}
export type AttachmentResponseType = string | null;
export interface AttachmentResponse {
    id: string;
    cardId: string;
    userId: string;
    userName?: string;
    name: string;
    url: string;
    type?: AttachmentResponseType;
    createdAt: string;
}
export type NotificationResponseType = (typeof NotificationResponseType)[keyof typeof NotificationResponseType];
export declare const NotificationResponseType: {
    readonly CARD_ASSIGNED: "CARD_ASSIGNED";
    readonly MENTIONED: "MENTIONED";
    readonly CARD_OVERDUE: "CARD_OVERDUE";
    readonly CARD_UPDATED: "CARD_UPDATED";
    readonly COMMENT_ADDED: "COMMENT_ADDED";
};
export type NotificationResponseMessage = string | null;
export type NotificationResponseCardId = string | null;
export type NotificationResponseWorkspaceId = string | null;
export interface NotificationResponse {
    id: string;
    userId: string;
    type: NotificationResponseType;
    title: string;
    message?: NotificationResponseMessage;
    cardId?: NotificationResponseCardId;
    workspaceId?: NotificationResponseWorkspaceId;
    read: boolean;
    createdAt: string;
}
export interface MarkNotificationsReadBody {
    ids?: string[];
    all?: boolean;
}
export type ActivityLogResponseUserAvatarUrl = string | null;
export type ActivityLogResponseProjectId = string | null;
export type ActivityLogResponseCardId = string | null;
export type ActivityLogResponseDetails = string | null;
export interface ActivityLogResponse {
    id: string;
    userId: string;
    userName?: string;
    userAvatarUrl?: ActivityLogResponseUserAvatarUrl;
    workspaceId: string;
    projectId?: ActivityLogResponseProjectId;
    cardId?: ActivityLogResponseCardId;
    action: string;
    details?: ActivityLogResponseDetails;
    createdAt: string;
}
export interface DashboardSummaryResponse {
    overdue: number;
    dueToday: number;
    upcoming: number;
    totalTasks: number;
    recentProjects: ProjectResponse[];
    activityFeed: ActivityLogResponse[];
}
export type ProjectStatsResponseCardsByColumnItem = {
    columnId: string;
    columnName: string;
    count: number;
};
export type ProjectStatsResponseCardsByPriorityItem = {
    priority: string;
    count: number;
};
export interface ProjectStatsResponse {
    totalCards: number;
    cardsByColumn: ProjectStatsResponseCardsByColumnItem[];
    cardsByPriority: ProjectStatsResponseCardsByPriorityItem[];
}
export type GetWorkspaceActivityParams = {
    limit?: number;
};
export type ListProjectCardsParams = {
    assigneeId?: string;
    priority?: ListProjectCardsPriority;
    labelId?: string;
    columnId?: string;
};
export type ListProjectCardsPriority = (typeof ListProjectCardsPriority)[keyof typeof ListProjectCardsPriority];
export declare const ListProjectCardsPriority: {
    readonly NO_PRIORITY: "NO_PRIORITY";
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type ListNotificationsParams = {
    unreadOnly?: boolean;
};
/**
 * @summary Health check
 */
export declare const getHealthz: (signal?: AbortSignal) => Promise<HealthStatus>;
export declare const getGetHealthzQueryKey: () => readonly ["/healthz"];
export declare const getGetHealthzQueryOptions: <TData = Awaited<ReturnType<typeof getHealthz>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHealthz>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getHealthz>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetHealthzQueryResult = NonNullable<Awaited<ReturnType<typeof getHealthz>>>;
export type GetHealthzQueryError = unknown;
/**
 * @summary Health check
 */
export declare function useGetHealthz<TData = Awaited<ReturnType<typeof getHealthz>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHealthz>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Register a new user
 */
export declare const register: (registerBody: RegisterBody, signal?: AbortSignal) => Promise<AuthResponse>;
export declare const getRegisterMutationOptions: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: RegisterBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
    data: RegisterBody;
}, TContext>;
export type RegisterMutationResult = NonNullable<Awaited<ReturnType<typeof register>>>;
export type RegisterMutationBody = RegisterBody;
export type RegisterMutationError = ErrorResponse;
/**
 * @summary Register a new user
 */
export declare const useRegister: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: RegisterBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof register>>, TError, {
    data: RegisterBody;
}, TContext>;
/**
 * @summary Login
 */
export declare const login: (loginBody: LoginBody, signal?: AbortSignal) => Promise<AuthResponse>;
export declare const getLoginMutationOptions: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: LoginBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
    data: LoginBody;
}, TContext>;
export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = LoginBody;
export type LoginMutationError = ErrorResponse;
/**
 * @summary Login
 */
export declare const useLogin: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: LoginBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof login>>, TError, {
    data: LoginBody;
}, TContext>;
/**
 * @summary Refresh access token
 */
export declare const refreshToken: (signal?: AbortSignal) => Promise<AuthResponse>;
export declare const getRefreshTokenMutationOptions: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, void, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, void, TContext>;
export type RefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof refreshToken>>>;
export type RefreshTokenMutationError = ErrorResponse;
/**
 * @summary Refresh access token
 */
export declare const useRefreshToken: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError, void, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof refreshToken>>, TError, void, TContext>;
/**
 * @summary Logout
 */
export declare const logout: (signal?: AbortSignal) => Promise<void>;
export declare const getLogoutMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>;
export type LogoutMutationError = unknown;
/**
 * @summary Logout
 */
export declare const useLogout: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
/**
 * @summary Get current user
 */
export declare const getMe: (signal?: AbortSignal) => Promise<UserResponse>;
export declare const getGetMeQueryKey: () => readonly ["/v1/auth/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorResponse>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorResponse;
/**
 * @summary Get current user
 */
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorResponse>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List my workspaces
 */
export declare const listWorkspaces: (signal?: AbortSignal) => Promise<WorkspaceResponse[]>;
export declare const getListWorkspacesQueryKey: () => readonly ["/v1/workspaces"];
export declare const getListWorkspacesQueryOptions: <TData = Awaited<ReturnType<typeof listWorkspaces>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWorkspaces>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listWorkspaces>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListWorkspacesQueryResult = NonNullable<Awaited<ReturnType<typeof listWorkspaces>>>;
export type ListWorkspacesQueryError = unknown;
/**
 * @summary List my workspaces
 */
export declare function useListWorkspaces<TData = Awaited<ReturnType<typeof listWorkspaces>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWorkspaces>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a workspace
 */
export declare const createWorkspace: (createWorkspaceBody: CreateWorkspaceBody, signal?: AbortSignal) => Promise<WorkspaceResponse>;
export declare const getCreateWorkspaceMutationOptions: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWorkspace>>, TError, {
        data: CreateWorkspaceBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createWorkspace>>, TError, {
    data: CreateWorkspaceBody;
}, TContext>;
export type CreateWorkspaceMutationResult = NonNullable<Awaited<ReturnType<typeof createWorkspace>>>;
export type CreateWorkspaceMutationBody = CreateWorkspaceBody;
export type CreateWorkspaceMutationError = ErrorResponse;
/**
 * @summary Create a workspace
 */
export declare const useCreateWorkspace: <TError = ErrorResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWorkspace>>, TError, {
        data: CreateWorkspaceBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createWorkspace>>, TError, {
    data: CreateWorkspaceBody;
}, TContext>;
/**
 * @summary Get workspace
 */
export declare const getWorkspace: (workspaceId: string, signal?: AbortSignal) => Promise<WorkspaceResponse>;
export declare const getGetWorkspaceQueryKey: (workspaceId?: string) => readonly [`/v1/workspaces/${string}`];
export declare const getGetWorkspaceQueryOptions: <TData = Awaited<ReturnType<typeof getWorkspace>>, TError = ErrorResponse>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkspace>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWorkspace>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorkspaceQueryResult = NonNullable<Awaited<ReturnType<typeof getWorkspace>>>;
export type GetWorkspaceQueryError = ErrorResponse;
/**
 * @summary Get workspace
 */
export declare function useGetWorkspace<TData = Awaited<ReturnType<typeof getWorkspace>>, TError = ErrorResponse>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkspace>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update workspace
 */
export declare const updateWorkspace: (workspaceId: string, updateWorkspaceBody: UpdateWorkspaceBody) => Promise<WorkspaceResponse>;
export declare const getUpdateWorkspaceMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWorkspace>>, TError, {
        workspaceId: string;
        data: UpdateWorkspaceBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateWorkspace>>, TError, {
    workspaceId: string;
    data: UpdateWorkspaceBody;
}, TContext>;
export type UpdateWorkspaceMutationResult = NonNullable<Awaited<ReturnType<typeof updateWorkspace>>>;
export type UpdateWorkspaceMutationBody = UpdateWorkspaceBody;
export type UpdateWorkspaceMutationError = unknown;
/**
 * @summary Update workspace
 */
export declare const useUpdateWorkspace: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWorkspace>>, TError, {
        workspaceId: string;
        data: UpdateWorkspaceBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateWorkspace>>, TError, {
    workspaceId: string;
    data: UpdateWorkspaceBody;
}, TContext>;
/**
 * @summary Delete workspace
 */
export declare const deleteWorkspace: (workspaceId: string) => Promise<void>;
export declare const getDeleteWorkspaceMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteWorkspace>>, TError, {
        workspaceId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteWorkspace>>, TError, {
    workspaceId: string;
}, TContext>;
export type DeleteWorkspaceMutationResult = NonNullable<Awaited<ReturnType<typeof deleteWorkspace>>>;
export type DeleteWorkspaceMutationError = unknown;
/**
 * @summary Delete workspace
 */
export declare const useDeleteWorkspace: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteWorkspace>>, TError, {
        workspaceId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteWorkspace>>, TError, {
    workspaceId: string;
}, TContext>;
/**
 * @summary List workspace members
 */
export declare const listWorkspaceMembers: (workspaceId: string, signal?: AbortSignal) => Promise<WorkspaceMemberResponse[]>;
export declare const getListWorkspaceMembersQueryKey: (workspaceId?: string) => readonly [`/v1/workspaces/${string}/members`];
export declare const getListWorkspaceMembersQueryOptions: <TData = Awaited<ReturnType<typeof listWorkspaceMembers>>, TError = unknown>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWorkspaceMembers>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listWorkspaceMembers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListWorkspaceMembersQueryResult = NonNullable<Awaited<ReturnType<typeof listWorkspaceMembers>>>;
export type ListWorkspaceMembersQueryError = unknown;
/**
 * @summary List workspace members
 */
export declare function useListWorkspaceMembers<TData = Awaited<ReturnType<typeof listWorkspaceMembers>>, TError = unknown>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWorkspaceMembers>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Invite member to workspace
 */
export declare const inviteWorkspaceMember: (workspaceId: string, inviteMemberBody: InviteMemberBody, signal?: AbortSignal) => Promise<WorkspaceMemberResponse>;
export declare const getInviteWorkspaceMemberMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof inviteWorkspaceMember>>, TError, {
        workspaceId: string;
        data: InviteMemberBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof inviteWorkspaceMember>>, TError, {
    workspaceId: string;
    data: InviteMemberBody;
}, TContext>;
export type InviteWorkspaceMemberMutationResult = NonNullable<Awaited<ReturnType<typeof inviteWorkspaceMember>>>;
export type InviteWorkspaceMemberMutationBody = InviteMemberBody;
export type InviteWorkspaceMemberMutationError = unknown;
/**
 * @summary Invite member to workspace
 */
export declare const useInviteWorkspaceMember: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof inviteWorkspaceMember>>, TError, {
        workspaceId: string;
        data: InviteMemberBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof inviteWorkspaceMember>>, TError, {
    workspaceId: string;
    data: InviteMemberBody;
}, TContext>;
/**
 * @summary Update member role
 */
export declare const updateWorkspaceMember: (workspaceId: string, memberId: string, updateMemberRoleBody: UpdateMemberRoleBody) => Promise<WorkspaceMemberResponse>;
export declare const getUpdateWorkspaceMemberMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWorkspaceMember>>, TError, {
        workspaceId: string;
        memberId: string;
        data: UpdateMemberRoleBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateWorkspaceMember>>, TError, {
    workspaceId: string;
    memberId: string;
    data: UpdateMemberRoleBody;
}, TContext>;
export type UpdateWorkspaceMemberMutationResult = NonNullable<Awaited<ReturnType<typeof updateWorkspaceMember>>>;
export type UpdateWorkspaceMemberMutationBody = UpdateMemberRoleBody;
export type UpdateWorkspaceMemberMutationError = unknown;
/**
 * @summary Update member role
 */
export declare const useUpdateWorkspaceMember: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWorkspaceMember>>, TError, {
        workspaceId: string;
        memberId: string;
        data: UpdateMemberRoleBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateWorkspaceMember>>, TError, {
    workspaceId: string;
    memberId: string;
    data: UpdateMemberRoleBody;
}, TContext>;
/**
 * @summary Remove member from workspace
 */
export declare const removeWorkspaceMember: (workspaceId: string, memberId: string) => Promise<void>;
export declare const getRemoveWorkspaceMemberMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeWorkspaceMember>>, TError, {
        workspaceId: string;
        memberId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeWorkspaceMember>>, TError, {
    workspaceId: string;
    memberId: string;
}, TContext>;
export type RemoveWorkspaceMemberMutationResult = NonNullable<Awaited<ReturnType<typeof removeWorkspaceMember>>>;
export type RemoveWorkspaceMemberMutationError = unknown;
/**
 * @summary Remove member from workspace
 */
export declare const useRemoveWorkspaceMember: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeWorkspaceMember>>, TError, {
        workspaceId: string;
        memberId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeWorkspaceMember>>, TError, {
    workspaceId: string;
    memberId: string;
}, TContext>;
/**
 * @summary List projects in workspace
 */
export declare const listProjects: (workspaceId: string, signal?: AbortSignal) => Promise<ProjectResponse[]>;
export declare const getListProjectsQueryKey: (workspaceId?: string) => readonly [`/v1/workspaces/${string}/projects`];
export declare const getListProjectsQueryOptions: <TData = Awaited<ReturnType<typeof listProjects>>, TError = unknown>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProjectsQueryResult = NonNullable<Awaited<ReturnType<typeof listProjects>>>;
export type ListProjectsQueryError = unknown;
/**
 * @summary List projects in workspace
 */
export declare function useListProjects<TData = Awaited<ReturnType<typeof listProjects>>, TError = unknown>(workspaceId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create project
 */
export declare const createProject: (workspaceId: string, createProjectBody: CreateProjectBody, signal?: AbortSignal) => Promise<ProjectResponse>;
export declare const getCreateProjectMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError, {
        workspaceId: string;
        data: CreateProjectBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError, {
    workspaceId: string;
    data: CreateProjectBody;
}, TContext>;
export type CreateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof createProject>>>;
export type CreateProjectMutationBody = CreateProjectBody;
export type CreateProjectMutationError = unknown;
/**
 * @summary Create project
 */
export declare const useCreateProject: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError, {
        workspaceId: string;
        data: CreateProjectBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProject>>, TError, {
    workspaceId: string;
    data: CreateProjectBody;
}, TContext>;
/**
 * @summary Recent activity in workspace
 */
export declare const getWorkspaceActivity: (workspaceId: string, params?: GetWorkspaceActivityParams, signal?: AbortSignal) => Promise<ActivityLogResponse[]>;
export declare const getGetWorkspaceActivityQueryKey: (workspaceId?: string, params?: GetWorkspaceActivityParams) => readonly [`/v1/workspaces/${string}/activity`, ...GetWorkspaceActivityParams[]];
export declare const getGetWorkspaceActivityQueryOptions: <TData = Awaited<ReturnType<typeof getWorkspaceActivity>>, TError = unknown>(workspaceId: string, params?: GetWorkspaceActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkspaceActivity>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWorkspaceActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorkspaceActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getWorkspaceActivity>>>;
export type GetWorkspaceActivityQueryError = unknown;
/**
 * @summary Recent activity in workspace
 */
export declare function useGetWorkspaceActivity<TData = Awaited<ReturnType<typeof getWorkspaceActivity>>, TError = unknown>(workspaceId: string, params?: GetWorkspaceActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorkspaceActivity>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get project
 */
export declare const getProject: (projectId: string, signal?: AbortSignal) => Promise<ProjectResponse>;
export declare const getGetProjectQueryKey: (projectId?: string) => readonly [`/v1/projects/${string}`];
export declare const getGetProjectQueryOptions: <TData = Awaited<ReturnType<typeof getProject>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProjectQueryResult = NonNullable<Awaited<ReturnType<typeof getProject>>>;
export type GetProjectQueryError = unknown;
/**
 * @summary Get project
 */
export declare function useGetProject<TData = Awaited<ReturnType<typeof getProject>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update project
 */
export declare const updateProject: (projectId: string, updateProjectBody: UpdateProjectBody) => Promise<ProjectResponse>;
export declare const getUpdateProjectMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError, {
        projectId: string;
        data: UpdateProjectBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError, {
    projectId: string;
    data: UpdateProjectBody;
}, TContext>;
export type UpdateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof updateProject>>>;
export type UpdateProjectMutationBody = UpdateProjectBody;
export type UpdateProjectMutationError = unknown;
/**
 * @summary Update project
 */
export declare const useUpdateProject: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError, {
        projectId: string;
        data: UpdateProjectBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProject>>, TError, {
    projectId: string;
    data: UpdateProjectBody;
}, TContext>;
/**
 * @summary Delete project
 */
export declare const deleteProject: (projectId: string) => Promise<void>;
export declare const getDeleteProjectMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError, {
        projectId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError, {
    projectId: string;
}, TContext>;
export type DeleteProjectMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProject>>>;
export type DeleteProjectMutationError = unknown;
/**
 * @summary Delete project
 */
export declare const useDeleteProject: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError, {
        projectId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteProject>>, TError, {
    projectId: string;
}, TContext>;
/**
 * @summary List columns in project
 */
export declare const listColumns: (projectId: string, signal?: AbortSignal) => Promise<ColumnResponse[]>;
export declare const getListColumnsQueryKey: (projectId?: string) => readonly [`/v1/projects/${string}/columns`];
export declare const getListColumnsQueryOptions: <TData = Awaited<ReturnType<typeof listColumns>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listColumns>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listColumns>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListColumnsQueryResult = NonNullable<Awaited<ReturnType<typeof listColumns>>>;
export type ListColumnsQueryError = unknown;
/**
 * @summary List columns in project
 */
export declare function useListColumns<TData = Awaited<ReturnType<typeof listColumns>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listColumns>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create column
 */
export declare const createColumn: (projectId: string, createColumnBody: CreateColumnBody, signal?: AbortSignal) => Promise<ColumnResponse>;
export declare const getCreateColumnMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createColumn>>, TError, {
        projectId: string;
        data: CreateColumnBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createColumn>>, TError, {
    projectId: string;
    data: CreateColumnBody;
}, TContext>;
export type CreateColumnMutationResult = NonNullable<Awaited<ReturnType<typeof createColumn>>>;
export type CreateColumnMutationBody = CreateColumnBody;
export type CreateColumnMutationError = unknown;
/**
 * @summary Create column
 */
export declare const useCreateColumn: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createColumn>>, TError, {
        projectId: string;
        data: CreateColumnBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createColumn>>, TError, {
    projectId: string;
    data: CreateColumnBody;
}, TContext>;
/**
 * @summary List all cards in project with filters
 */
export declare const listProjectCards: (projectId: string, params?: ListProjectCardsParams, signal?: AbortSignal) => Promise<CardResponse[]>;
export declare const getListProjectCardsQueryKey: (projectId?: string, params?: ListProjectCardsParams) => readonly [`/v1/projects/${string}/cards`, ...ListProjectCardsParams[]];
export declare const getListProjectCardsQueryOptions: <TData = Awaited<ReturnType<typeof listProjectCards>>, TError = unknown>(projectId: string, params?: ListProjectCardsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProjectCards>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProjectCards>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProjectCardsQueryResult = NonNullable<Awaited<ReturnType<typeof listProjectCards>>>;
export type ListProjectCardsQueryError = unknown;
/**
 * @summary List all cards in project with filters
 */
export declare function useListProjectCards<TData = Awaited<ReturnType<typeof listProjectCards>>, TError = unknown>(projectId: string, params?: ListProjectCardsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProjectCards>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List labels in project
 */
export declare const listLabels: (projectId: string, signal?: AbortSignal) => Promise<LabelResponse[]>;
export declare const getListLabelsQueryKey: (projectId?: string) => readonly [`/v1/projects/${string}/labels`];
export declare const getListLabelsQueryOptions: <TData = Awaited<ReturnType<typeof listLabels>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLabels>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLabels>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLabelsQueryResult = NonNullable<Awaited<ReturnType<typeof listLabels>>>;
export type ListLabelsQueryError = unknown;
/**
 * @summary List labels in project
 */
export declare function useListLabels<TData = Awaited<ReturnType<typeof listLabels>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLabels>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create label
 */
export declare const createLabel: (projectId: string, createLabelBody: CreateLabelBody, signal?: AbortSignal) => Promise<LabelResponse>;
export declare const getCreateLabelMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLabel>>, TError, {
        projectId: string;
        data: CreateLabelBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLabel>>, TError, {
    projectId: string;
    data: CreateLabelBody;
}, TContext>;
export type CreateLabelMutationResult = NonNullable<Awaited<ReturnType<typeof createLabel>>>;
export type CreateLabelMutationBody = CreateLabelBody;
export type CreateLabelMutationError = unknown;
/**
 * @summary Create label
 */
export declare const useCreateLabel: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLabel>>, TError, {
        projectId: string;
        data: CreateLabelBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLabel>>, TError, {
    projectId: string;
    data: CreateLabelBody;
}, TContext>;
/**
 * @summary Project statistics
 */
export declare const getProjectStats: (projectId: string, signal?: AbortSignal) => Promise<ProjectStatsResponse>;
export declare const getGetProjectStatsQueryKey: (projectId?: string) => readonly [`/v1/projects/${string}/stats`];
export declare const getGetProjectStatsQueryOptions: <TData = Awaited<ReturnType<typeof getProjectStats>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProjectStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectStats>>>;
export type GetProjectStatsQueryError = unknown;
/**
 * @summary Project statistics
 */
export declare function useGetProjectStats<TData = Awaited<ReturnType<typeof getProjectStats>>, TError = unknown>(projectId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update column
 */
export declare const updateColumn: (columnId: string, updateColumnBody: UpdateColumnBody) => Promise<ColumnResponse>;
export declare const getUpdateColumnMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateColumn>>, TError, {
        columnId: string;
        data: UpdateColumnBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateColumn>>, TError, {
    columnId: string;
    data: UpdateColumnBody;
}, TContext>;
export type UpdateColumnMutationResult = NonNullable<Awaited<ReturnType<typeof updateColumn>>>;
export type UpdateColumnMutationBody = UpdateColumnBody;
export type UpdateColumnMutationError = unknown;
/**
 * @summary Update column
 */
export declare const useUpdateColumn: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateColumn>>, TError, {
        columnId: string;
        data: UpdateColumnBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateColumn>>, TError, {
    columnId: string;
    data: UpdateColumnBody;
}, TContext>;
/**
 * @summary Delete column
 */
export declare const deleteColumn: (columnId: string) => Promise<void>;
export declare const getDeleteColumnMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteColumn>>, TError, {
        columnId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteColumn>>, TError, {
    columnId: string;
}, TContext>;
export type DeleteColumnMutationResult = NonNullable<Awaited<ReturnType<typeof deleteColumn>>>;
export type DeleteColumnMutationError = unknown;
/**
 * @summary Delete column
 */
export declare const useDeleteColumn: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteColumn>>, TError, {
        columnId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteColumn>>, TError, {
    columnId: string;
}, TContext>;
/**
 * @summary Create card in column
 */
export declare const createCard: (columnId: string, createCardBody: CreateCardBody, signal?: AbortSignal) => Promise<CardResponse>;
export declare const getCreateCardMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCard>>, TError, {
        columnId: string;
        data: CreateCardBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCard>>, TError, {
    columnId: string;
    data: CreateCardBody;
}, TContext>;
export type CreateCardMutationResult = NonNullable<Awaited<ReturnType<typeof createCard>>>;
export type CreateCardMutationBody = CreateCardBody;
export type CreateCardMutationError = unknown;
/**
 * @summary Create card in column
 */
export declare const useCreateCard: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCard>>, TError, {
        columnId: string;
        data: CreateCardBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCard>>, TError, {
    columnId: string;
    data: CreateCardBody;
}, TContext>;
/**
 * @summary Reorder columns
 */
export declare const reorderColumns: (reorderColumnsBody: ReorderColumnsBody) => Promise<ColumnResponse[]>;
export declare const getReorderColumnsMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof reorderColumns>>, TError, {
        data: ReorderColumnsBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof reorderColumns>>, TError, {
    data: ReorderColumnsBody;
}, TContext>;
export type ReorderColumnsMutationResult = NonNullable<Awaited<ReturnType<typeof reorderColumns>>>;
export type ReorderColumnsMutationBody = ReorderColumnsBody;
export type ReorderColumnsMutationError = unknown;
/**
 * @summary Reorder columns
 */
export declare const useReorderColumns: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof reorderColumns>>, TError, {
        data: ReorderColumnsBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof reorderColumns>>, TError, {
    data: ReorderColumnsBody;
}, TContext>;
/**
 * @summary Get card detail
 */
export declare const getCard: (cardId: string, signal?: AbortSignal) => Promise<CardDetailResponse>;
export declare const getGetCardQueryKey: (cardId?: string) => readonly [`/v1/cards/${string}`];
export declare const getGetCardQueryOptions: <TData = Awaited<ReturnType<typeof getCard>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCard>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCardQueryResult = NonNullable<Awaited<ReturnType<typeof getCard>>>;
export type GetCardQueryError = unknown;
/**
 * @summary Get card detail
 */
export declare function useGetCard<TData = Awaited<ReturnType<typeof getCard>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCard>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update card
 */
export declare const updateCard: (cardId: string, updateCardBody: UpdateCardBody) => Promise<CardResponse>;
export declare const getUpdateCardMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCard>>, TError, {
        cardId: string;
        data: UpdateCardBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCard>>, TError, {
    cardId: string;
    data: UpdateCardBody;
}, TContext>;
export type UpdateCardMutationResult = NonNullable<Awaited<ReturnType<typeof updateCard>>>;
export type UpdateCardMutationBody = UpdateCardBody;
export type UpdateCardMutationError = unknown;
/**
 * @summary Update card
 */
export declare const useUpdateCard: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCard>>, TError, {
        cardId: string;
        data: UpdateCardBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCard>>, TError, {
    cardId: string;
    data: UpdateCardBody;
}, TContext>;
/**
 * @summary Delete card
 */
export declare const deleteCard: (cardId: string) => Promise<void>;
export declare const getDeleteCardMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCard>>, TError, {
        cardId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCard>>, TError, {
    cardId: string;
}, TContext>;
export type DeleteCardMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCard>>>;
export type DeleteCardMutationError = unknown;
/**
 * @summary Delete card
 */
export declare const useDeleteCard: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCard>>, TError, {
        cardId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCard>>, TError, {
    cardId: string;
}, TContext>;
/**
 * @summary Move card to another column
 */
export declare const moveCard: (cardId: string, moveCardBody: MoveCardBody) => Promise<CardResponse>;
export declare const getMoveCardMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof moveCard>>, TError, {
        cardId: string;
        data: MoveCardBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof moveCard>>, TError, {
    cardId: string;
    data: MoveCardBody;
}, TContext>;
export type MoveCardMutationResult = NonNullable<Awaited<ReturnType<typeof moveCard>>>;
export type MoveCardMutationBody = MoveCardBody;
export type MoveCardMutationError = unknown;
/**
 * @summary Move card to another column
 */
export declare const useMoveCard: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof moveCard>>, TError, {
        cardId: string;
        data: MoveCardBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof moveCard>>, TError, {
    cardId: string;
    data: MoveCardBody;
}, TContext>;
/**
 * @summary Add assignee to card
 */
export declare const addCardAssignee: (cardId: string, cardAssigneeBody: CardAssigneeBody, signal?: AbortSignal) => Promise<CardAssigneeResponse>;
export declare const getAddCardAssigneeMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addCardAssignee>>, TError, {
        cardId: string;
        data: CardAssigneeBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addCardAssignee>>, TError, {
    cardId: string;
    data: CardAssigneeBody;
}, TContext>;
export type AddCardAssigneeMutationResult = NonNullable<Awaited<ReturnType<typeof addCardAssignee>>>;
export type AddCardAssigneeMutationBody = CardAssigneeBody;
export type AddCardAssigneeMutationError = unknown;
/**
 * @summary Add assignee to card
 */
export declare const useAddCardAssignee: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addCardAssignee>>, TError, {
        cardId: string;
        data: CardAssigneeBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof addCardAssignee>>, TError, {
    cardId: string;
    data: CardAssigneeBody;
}, TContext>;
/**
 * @summary Remove assignee from card
 */
export declare const removeCardAssignee: (cardId: string, userId: string) => Promise<void>;
export declare const getRemoveCardAssigneeMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeCardAssignee>>, TError, {
        cardId: string;
        userId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeCardAssignee>>, TError, {
    cardId: string;
    userId: string;
}, TContext>;
export type RemoveCardAssigneeMutationResult = NonNullable<Awaited<ReturnType<typeof removeCardAssignee>>>;
export type RemoveCardAssigneeMutationError = unknown;
/**
 * @summary Remove assignee from card
 */
export declare const useRemoveCardAssignee: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeCardAssignee>>, TError, {
        cardId: string;
        userId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeCardAssignee>>, TError, {
    cardId: string;
    userId: string;
}, TContext>;
/**
 * @summary Add label to card
 */
export declare const addCardLabel: (cardId: string, cardLabelBody: CardLabelBody, signal?: AbortSignal) => Promise<CardLabelResponse>;
export declare const getAddCardLabelMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addCardLabel>>, TError, {
        cardId: string;
        data: CardLabelBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addCardLabel>>, TError, {
    cardId: string;
    data: CardLabelBody;
}, TContext>;
export type AddCardLabelMutationResult = NonNullable<Awaited<ReturnType<typeof addCardLabel>>>;
export type AddCardLabelMutationBody = CardLabelBody;
export type AddCardLabelMutationError = unknown;
/**
 * @summary Add label to card
 */
export declare const useAddCardLabel: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addCardLabel>>, TError, {
        cardId: string;
        data: CardLabelBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof addCardLabel>>, TError, {
    cardId: string;
    data: CardLabelBody;
}, TContext>;
/**
 * @summary Remove label from card
 */
export declare const removeCardLabel: (cardId: string, labelId: string) => Promise<void>;
export declare const getRemoveCardLabelMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeCardLabel>>, TError, {
        cardId: string;
        labelId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeCardLabel>>, TError, {
    cardId: string;
    labelId: string;
}, TContext>;
export type RemoveCardLabelMutationResult = NonNullable<Awaited<ReturnType<typeof removeCardLabel>>>;
export type RemoveCardLabelMutationError = unknown;
/**
 * @summary Remove label from card
 */
export declare const useRemoveCardLabel: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeCardLabel>>, TError, {
        cardId: string;
        labelId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeCardLabel>>, TError, {
    cardId: string;
    labelId: string;
}, TContext>;
/**
 * @summary List checklists on card
 */
export declare const listChecklists: (cardId: string, signal?: AbortSignal) => Promise<ChecklistResponse[]>;
export declare const getListChecklistsQueryKey: (cardId?: string) => readonly [`/v1/cards/${string}/checklists`];
export declare const getListChecklistsQueryOptions: <TData = Awaited<ReturnType<typeof listChecklists>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listChecklists>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listChecklists>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListChecklistsQueryResult = NonNullable<Awaited<ReturnType<typeof listChecklists>>>;
export type ListChecklistsQueryError = unknown;
/**
 * @summary List checklists on card
 */
export declare function useListChecklists<TData = Awaited<ReturnType<typeof listChecklists>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listChecklists>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create checklist
 */
export declare const createChecklist: (cardId: string, createChecklistBody: CreateChecklistBody, signal?: AbortSignal) => Promise<ChecklistResponse>;
export declare const getCreateChecklistMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createChecklist>>, TError, {
        cardId: string;
        data: CreateChecklistBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createChecklist>>, TError, {
    cardId: string;
    data: CreateChecklistBody;
}, TContext>;
export type CreateChecklistMutationResult = NonNullable<Awaited<ReturnType<typeof createChecklist>>>;
export type CreateChecklistMutationBody = CreateChecklistBody;
export type CreateChecklistMutationError = unknown;
/**
 * @summary Create checklist
 */
export declare const useCreateChecklist: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createChecklist>>, TError, {
        cardId: string;
        data: CreateChecklistBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createChecklist>>, TError, {
    cardId: string;
    data: CreateChecklistBody;
}, TContext>;
/**
 * @summary Update checklist
 */
export declare const updateChecklist: (checklistId: string, updateChecklistBody: UpdateChecklistBody) => Promise<ChecklistResponse>;
export declare const getUpdateChecklistMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateChecklist>>, TError, {
        checklistId: string;
        data: UpdateChecklistBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateChecklist>>, TError, {
    checklistId: string;
    data: UpdateChecklistBody;
}, TContext>;
export type UpdateChecklistMutationResult = NonNullable<Awaited<ReturnType<typeof updateChecklist>>>;
export type UpdateChecklistMutationBody = UpdateChecklistBody;
export type UpdateChecklistMutationError = unknown;
/**
 * @summary Update checklist
 */
export declare const useUpdateChecklist: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateChecklist>>, TError, {
        checklistId: string;
        data: UpdateChecklistBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateChecklist>>, TError, {
    checklistId: string;
    data: UpdateChecklistBody;
}, TContext>;
/**
 * @summary Delete checklist
 */
export declare const deleteChecklist: (checklistId: string) => Promise<void>;
export declare const getDeleteChecklistMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteChecklist>>, TError, {
        checklistId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteChecklist>>, TError, {
    checklistId: string;
}, TContext>;
export type DeleteChecklistMutationResult = NonNullable<Awaited<ReturnType<typeof deleteChecklist>>>;
export type DeleteChecklistMutationError = unknown;
/**
 * @summary Delete checklist
 */
export declare const useDeleteChecklist: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteChecklist>>, TError, {
        checklistId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteChecklist>>, TError, {
    checklistId: string;
}, TContext>;
/**
 * @summary Add item to checklist
 */
export declare const createChecklistItem: (checklistId: string, createChecklistItemBody: CreateChecklistItemBody, signal?: AbortSignal) => Promise<ChecklistItemResponse>;
export declare const getCreateChecklistItemMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createChecklistItem>>, TError, {
        checklistId: string;
        data: CreateChecklistItemBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createChecklistItem>>, TError, {
    checklistId: string;
    data: CreateChecklistItemBody;
}, TContext>;
export type CreateChecklistItemMutationResult = NonNullable<Awaited<ReturnType<typeof createChecklistItem>>>;
export type CreateChecklistItemMutationBody = CreateChecklistItemBody;
export type CreateChecklistItemMutationError = unknown;
/**
 * @summary Add item to checklist
 */
export declare const useCreateChecklistItem: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createChecklistItem>>, TError, {
        checklistId: string;
        data: CreateChecklistItemBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createChecklistItem>>, TError, {
    checklistId: string;
    data: CreateChecklistItemBody;
}, TContext>;
/**
 * @summary Update checklist item
 */
export declare const updateChecklistItem: (itemId: string, updateChecklistItemBody: UpdateChecklistItemBody) => Promise<ChecklistItemResponse>;
export declare const getUpdateChecklistItemMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateChecklistItem>>, TError, {
        itemId: string;
        data: UpdateChecklistItemBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateChecklistItem>>, TError, {
    itemId: string;
    data: UpdateChecklistItemBody;
}, TContext>;
export type UpdateChecklistItemMutationResult = NonNullable<Awaited<ReturnType<typeof updateChecklistItem>>>;
export type UpdateChecklistItemMutationBody = UpdateChecklistItemBody;
export type UpdateChecklistItemMutationError = unknown;
/**
 * @summary Update checklist item
 */
export declare const useUpdateChecklistItem: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateChecklistItem>>, TError, {
        itemId: string;
        data: UpdateChecklistItemBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateChecklistItem>>, TError, {
    itemId: string;
    data: UpdateChecklistItemBody;
}, TContext>;
/**
 * @summary Delete checklist item
 */
export declare const deleteChecklistItem: (itemId: string) => Promise<void>;
export declare const getDeleteChecklistItemMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteChecklistItem>>, TError, {
        itemId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteChecklistItem>>, TError, {
    itemId: string;
}, TContext>;
export type DeleteChecklistItemMutationResult = NonNullable<Awaited<ReturnType<typeof deleteChecklistItem>>>;
export type DeleteChecklistItemMutationError = unknown;
/**
 * @summary Delete checklist item
 */
export declare const useDeleteChecklistItem: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteChecklistItem>>, TError, {
        itemId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteChecklistItem>>, TError, {
    itemId: string;
}, TContext>;
/**
 * @summary List comments on card
 */
export declare const listComments: (cardId: string, signal?: AbortSignal) => Promise<CommentResponse[]>;
export declare const getListCommentsQueryKey: (cardId?: string) => readonly [`/v1/cards/${string}/comments`];
export declare const getListCommentsQueryOptions: <TData = Awaited<ReturnType<typeof listComments>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCommentsQueryResult = NonNullable<Awaited<ReturnType<typeof listComments>>>;
export type ListCommentsQueryError = unknown;
/**
 * @summary List comments on card
 */
export declare function useListComments<TData = Awaited<ReturnType<typeof listComments>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add comment to card
 */
export declare const createComment: (cardId: string, createCommentBody: CreateCommentBody, signal?: AbortSignal) => Promise<CommentResponse>;
export declare const getCreateCommentMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError, {
        cardId: string;
        data: CreateCommentBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError, {
    cardId: string;
    data: CreateCommentBody;
}, TContext>;
export type CreateCommentMutationResult = NonNullable<Awaited<ReturnType<typeof createComment>>>;
export type CreateCommentMutationBody = CreateCommentBody;
export type CreateCommentMutationError = unknown;
/**
 * @summary Add comment to card
 */
export declare const useCreateComment: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError, {
        cardId: string;
        data: CreateCommentBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createComment>>, TError, {
    cardId: string;
    data: CreateCommentBody;
}, TContext>;
/**
 * @summary Update comment
 */
export declare const updateComment: (commentId: string, updateCommentBody: UpdateCommentBody) => Promise<CommentResponse>;
export declare const getUpdateCommentMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateComment>>, TError, {
        commentId: string;
        data: UpdateCommentBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateComment>>, TError, {
    commentId: string;
    data: UpdateCommentBody;
}, TContext>;
export type UpdateCommentMutationResult = NonNullable<Awaited<ReturnType<typeof updateComment>>>;
export type UpdateCommentMutationBody = UpdateCommentBody;
export type UpdateCommentMutationError = unknown;
/**
 * @summary Update comment
 */
export declare const useUpdateComment: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateComment>>, TError, {
        commentId: string;
        data: UpdateCommentBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateComment>>, TError, {
    commentId: string;
    data: UpdateCommentBody;
}, TContext>;
/**
 * @summary Delete comment
 */
export declare const deleteComment: (commentId: string) => Promise<void>;
export declare const getDeleteCommentMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteComment>>, TError, {
        commentId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteComment>>, TError, {
    commentId: string;
}, TContext>;
export type DeleteCommentMutationResult = NonNullable<Awaited<ReturnType<typeof deleteComment>>>;
export type DeleteCommentMutationError = unknown;
/**
 * @summary Delete comment
 */
export declare const useDeleteComment: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteComment>>, TError, {
        commentId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteComment>>, TError, {
    commentId: string;
}, TContext>;
/**
 * @summary List attachments on card
 */
export declare const listAttachments: (cardId: string, signal?: AbortSignal) => Promise<AttachmentResponse[]>;
export declare const getListAttachmentsQueryKey: (cardId?: string) => readonly [`/v1/cards/${string}/attachments`];
export declare const getListAttachmentsQueryOptions: <TData = Awaited<ReturnType<typeof listAttachments>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttachments>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAttachments>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAttachmentsQueryResult = NonNullable<Awaited<ReturnType<typeof listAttachments>>>;
export type ListAttachmentsQueryError = unknown;
/**
 * @summary List attachments on card
 */
export declare function useListAttachments<TData = Awaited<ReturnType<typeof listAttachments>>, TError = unknown>(cardId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttachments>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add attachment to card
 */
export declare const createAttachment: (cardId: string, createAttachmentBody: CreateAttachmentBody, signal?: AbortSignal) => Promise<AttachmentResponse>;
export declare const getCreateAttachmentMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttachment>>, TError, {
        cardId: string;
        data: CreateAttachmentBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAttachment>>, TError, {
    cardId: string;
    data: CreateAttachmentBody;
}, TContext>;
export type CreateAttachmentMutationResult = NonNullable<Awaited<ReturnType<typeof createAttachment>>>;
export type CreateAttachmentMutationBody = CreateAttachmentBody;
export type CreateAttachmentMutationError = unknown;
/**
 * @summary Add attachment to card
 */
export declare const useCreateAttachment: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttachment>>, TError, {
        cardId: string;
        data: CreateAttachmentBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAttachment>>, TError, {
    cardId: string;
    data: CreateAttachmentBody;
}, TContext>;
/**
 * @summary Delete attachment
 */
export declare const deleteAttachment: (attachmentId: string) => Promise<void>;
export declare const getDeleteAttachmentMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAttachment>>, TError, {
        attachmentId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAttachment>>, TError, {
    attachmentId: string;
}, TContext>;
export type DeleteAttachmentMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAttachment>>>;
export type DeleteAttachmentMutationError = unknown;
/**
 * @summary Delete attachment
 */
export declare const useDeleteAttachment: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAttachment>>, TError, {
        attachmentId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAttachment>>, TError, {
    attachmentId: string;
}, TContext>;
/**
 * @summary List notifications
 */
export declare const listNotifications: (params?: ListNotificationsParams, signal?: AbortSignal) => Promise<NotificationResponse[]>;
export declare const getListNotificationsQueryKey: (params?: ListNotificationsParams) => readonly ["/v1/notifications", ...ListNotificationsParams[]];
export declare const getListNotificationsQueryOptions: <TData = Awaited<ReturnType<typeof listNotifications>>, TError = unknown>(params?: ListNotificationsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof listNotifications>>>;
export type ListNotificationsQueryError = unknown;
/**
 * @summary List notifications
 */
export declare function useListNotifications<TData = Awaited<ReturnType<typeof listNotifications>>, TError = unknown>(params?: ListNotificationsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Mark notifications as read
 */
export declare const markNotificationsRead: (markNotificationsReadBody: MarkNotificationsReadBody) => Promise<SuccessResponse>;
export declare const getMarkNotificationsReadMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationsRead>>, TError, {
        data: MarkNotificationsReadBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof markNotificationsRead>>, TError, {
    data: MarkNotificationsReadBody;
}, TContext>;
export type MarkNotificationsReadMutationResult = NonNullable<Awaited<ReturnType<typeof markNotificationsRead>>>;
export type MarkNotificationsReadMutationBody = MarkNotificationsReadBody;
export type MarkNotificationsReadMutationError = unknown;
/**
 * @summary Mark notifications as read
 */
export declare const useMarkNotificationsRead: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationsRead>>, TError, {
        data: MarkNotificationsReadBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof markNotificationsRead>>, TError, {
    data: MarkNotificationsReadBody;
}, TContext>;
/**
 * @summary Dashboard summary for current user
 */
export declare const getDashboardSummary: (signal?: AbortSignal) => Promise<DashboardSummaryResponse>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/v1/dashboard/summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = unknown;
/**
 * @summary Dashboard summary for current user
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update label
 */
export declare const updateLabel: (labelId: string, updateLabelBody: UpdateLabelBody) => Promise<LabelResponse>;
export declare const getUpdateLabelMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLabel>>, TError, {
        labelId: string;
        data: UpdateLabelBody;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLabel>>, TError, {
    labelId: string;
    data: UpdateLabelBody;
}, TContext>;
export type UpdateLabelMutationResult = NonNullable<Awaited<ReturnType<typeof updateLabel>>>;
export type UpdateLabelMutationBody = UpdateLabelBody;
export type UpdateLabelMutationError = unknown;
/**
 * @summary Update label
 */
export declare const useUpdateLabel: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLabel>>, TError, {
        labelId: string;
        data: UpdateLabelBody;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLabel>>, TError, {
    labelId: string;
    data: UpdateLabelBody;
}, TContext>;
/**
 * @summary Delete label
 */
export declare const deleteLabel: (labelId: string) => Promise<void>;
export declare const getDeleteLabelMutationOptions: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLabel>>, TError, {
        labelId: string;
    }, TContext>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteLabel>>, TError, {
    labelId: string;
}, TContext>;
export type DeleteLabelMutationResult = NonNullable<Awaited<ReturnType<typeof deleteLabel>>>;
export type DeleteLabelMutationError = unknown;
/**
 * @summary Delete label
 */
export declare const useDeleteLabel: <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLabel>>, TError, {
        labelId: string;
    }, TContext>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteLabel>>, TError, {
    labelId: string;
}, TContext>;
//# sourceMappingURL=api.d.ts.map