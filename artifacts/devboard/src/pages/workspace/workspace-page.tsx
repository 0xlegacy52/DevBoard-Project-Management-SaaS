import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Kanban,
  Users,
  ArrowRight,
  Activity,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import CreateProjectModal from "@/components/project/create-project-modal";

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  archived: boolean;
}

interface ActivityEntry {
  id: string;
  action: string;
  details?: string;
  createdAt: string;
  user: { id: string; name: string; avatarUrl?: string };
}

const ACTION_LABELS: Record<string, string> = {
  WORKSPACE_CREATED: "created this workspace",
  PROJECT_CREATED: "created project",
  CARD_CREATED: "created card",
  CARD_UPDATED: "updated card",
  COMMENT_ADDED: "commented on",
};

export default function WorkspacePage() {
  const [, params] = useRoute("/workspace/:id");
  const workspaceId = params?.id ?? "";
  const [showCreateProject, setShowCreateProject] = useState(false);

  const { data: workspace } = useQuery<{ id: string; name: string; role: string }>({
    queryKey: ["workspace", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}`),
    enabled: !!workspaceId,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["workspace-projects", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}/projects`),
    enabled: !!workspaceId,
  });

  const { data: activity = [] } = useQuery<ActivityEntry[]>({
    queryKey: ["workspace-activity", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}/activity?limit=10`),
    enabled: !!workspaceId,
  });

  const { data: members = [] } = useQuery<{ id: string; user: { id: string; name: string; avatarUrl?: string }; role: string }[]>({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}/members`),
    enabled: !!workspaceId,
  });

  const activeProjects = projects.filter((p) => !p.archived);

  return (
    <AppLayout workspaceId={workspaceId}>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{workspace?.name ?? "Workspace"}</h1>
            <p className="text-neutral-500 text-sm mt-0.5">{activeProjects.length} project{activeProjects.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/workspace/${workspaceId}/members`}>
                <Users className="mr-1.5 h-3.5 w-3.5" /> Members ({members.length})
              </Link>
            </Button>
            <Button size="sm" onClick={() => setShowCreateProject(true)}>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> New project
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-neutral-800">Projects</h2>
            {projectsLoading ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
              </div>
            ) : activeProjects.length === 0 ? (
              <Card className="border-dashed border-neutral-200">
                <CardContent className="p-10 text-center">
                  <Kanban className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                  <p className="font-medium text-neutral-700 mb-1">No projects yet</p>
                  <p className="text-sm text-neutral-500 mb-4">Create your first project to get started</p>
                  <Button onClick={() => setShowCreateProject(true)}>
                    <Plus className="mr-1.5 h-4 w-4" /> New project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {activeProjects.map((project) => (
                  <Link key={project.id} href={`/workspace/${workspaceId}/project/${project.id}`}>
                    <Card className="border-neutral-200 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer h-full">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${project.color}20` }}
                          >
                            <Kanban className="h-5 w-5" style={{ color: project.color }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-neutral-900 truncate">{project.name}</p>
                            {project.description && (
                              <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{project.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xs text-neutral-400">View board</span>
                          <ArrowRight className="h-4 w-4 text-neutral-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-neutral-800">Recent activity</h2>
            {activity.length === 0 ? (
              <Card className="border-neutral-200">
                <CardContent className="p-6 text-center text-neutral-400">
                  <Activity className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">No activity yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {activity.map((entry) => (
                  <div key={entry.id} className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-indigo-700 text-xs font-bold">
                        {entry.user.name[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-neutral-700">
                        <span className="font-medium">{entry.user.name}</span>{" "}
                        <span className="text-neutral-500">{ACTION_LABELS[entry.action] ?? entry.action}</span>
                        {entry.details && <span className="font-medium text-neutral-700"> {entry.details}</span>}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateProjectModal
        workspaceId={workspaceId}
        open={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />
    </AppLayout>
  );
}
