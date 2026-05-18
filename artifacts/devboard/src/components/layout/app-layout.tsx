import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  Settings,
  ChevronDown,
  Plus,
  LogOut,
  ChevronsUpDown,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CreateWorkspaceModal from "@/components/workspace/create-workspace-modal";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: string;
}

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, label, badge, onClick }: NavItemProps) {
  const [location] = useLocation();
  const isActive = location === href || (href !== "/" && location.startsWith(href));
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-indigo-600" : "text-neutral-400")} />
        <span className="flex-1">{label}</span>
        {badge !== undefined && badge > 0 && (
          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4 min-w-4 bg-indigo-100 text-indigo-700">
            {badge > 99 ? "99+" : badge}
          </Badge>
        )}
      </div>
    </Link>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
  workspaceId?: string;
}

export default function AppLayout({ children, workspaceId }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);

  const { data: workspaces = [] } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: () => apiFetch("/v1/workspaces"),
  });

  const { data: currentWorkspace } = useQuery<Workspace>({
    queryKey: ["workspace", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}`),
    enabled: !!workspaceId,
  });

  const { data: summary } = useQuery<{ unreadNotifications: number }>({
    queryKey: ["dashboard-summary"],
    queryFn: () => apiFetch("/v1/dashboard/summary"),
    refetchInterval: 30000,
  });

  const { data: projects = [] } = useQuery<{ id: string; name: string; color: string }[]>({
    queryKey: ["workspace-projects", workspaceId],
    queryFn: () => apiFetch(`/v1/workspaces/${workspaceId}/projects`),
    enabled: !!workspaceId,
  });

  const activeWorkspace = currentWorkspace ?? workspaces[0];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "?";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-auto p-2 justify-between hover:bg-neutral-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">
                    {activeWorkspace?.name?.[0]?.toUpperCase() ?? "W"}
                  </span>
                </div>
                <span className="font-semibold text-sm text-neutral-900 truncate">
                  {activeWorkspace?.name ?? "Select workspace"}
                </span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-neutral-400 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => navigate(`/workspace/${ws.id}`)}
                className="gap-2"
              >
                <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-700 text-xs font-bold">{ws.name[0]?.toUpperCase()}</span>
                </div>
                {ws.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowCreateWorkspace(true)} className="gap-2">
              <Plus className="h-4 w-4" /> New workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 px-3 pb-2 space-y-0.5 overflow-y-auto">
        <NavItem href="/" icon={LayoutDashboard} label="Dashboard" onClick={() => setSidebarOpen(false)} />
        <NavItem
          href="/notifications"
          icon={Bell}
          label="Notifications"
          badge={summary?.unreadNotifications}
          onClick={() => setSidebarOpen(false)}
        />

        {activeWorkspace && (
          <>
            <div className="pt-4 pb-1">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3">Projects</p>
            </div>
            {projects.map((project) => (
              <Link key={project.id} href={`/workspace/${activeWorkspace.id}/project/${project.id}`} onClick={() => setSidebarOpen(false)}>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.color ?? "#6366f1" }}
                  />
                  <span className="truncate">{project.name}</span>
                </div>
              </Link>
            ))}
            <div className="px-3 pt-1">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate(`/workspace/${activeWorkspace.id}/new-project`);
                }}
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-600 transition-colors py-1"
              >
                <Plus className="h-3.5 w-3.5" /> New project
              </button>
            </div>
          </>
        )}
      </nav>

      <Separator />
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full h-auto p-2 justify-between hover:bg-neutral-100">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-neutral-900 truncate">{user?.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-400 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex h-screen bg-neutral-50 overflow-hidden">
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-neutral-200">
          <SidebarContent />
        </aside>

        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <aside className="relative flex flex-col w-60 bg-white shadow-xl z-50">
              <div className="absolute top-3 right-3">
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-neutral-100">
                  <X className="h-5 w-5 text-neutral-500" />
                </button>
              </div>
              <SidebarContent />
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-neutral-200 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-neutral-100"
            >
              <Menu className="h-5 w-5 text-neutral-600" />
            </button>
            <span className="font-bold text-neutral-900">DevBoard</span>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>

      <CreateWorkspaceModal open={showCreateWorkspace} onClose={() => setShowCreateWorkspace(false)} />
    </>
  );
}
