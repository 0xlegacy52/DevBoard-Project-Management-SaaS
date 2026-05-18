import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiFetch } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Kanban,
  Bell,
  FolderOpen,
  ClipboardList,
  Plus,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DashboardSummary {
  workspaces: number;
  projects: number;
  assignedCards: number;
  unreadNotifications: number;
}

interface MyCard {
  id: string;
  title: string;
  priority: string;
  dueDate?: string;
  column: { id: string; name: string };
  project: { id: string; name: string; color: string };
}

interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: "text-red-700 bg-red-50",
  HIGH: "text-orange-700 bg-orange-50",
  MEDIUM: "text-yellow-700 bg-yellow-50",
  LOW: "text-blue-700 bg-blue-50",
  NO_PRIORITY: "text-neutral-600 bg-neutral-100",
};

const PRIORITY_LABELS: Record<string, string> = {
  URGENT: "Urgent",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  NO_PRIORITY: "—",
};

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: summary, isLoading: summaryLoading } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: () => apiFetch("/v1/dashboard/summary"),
  });

  const { data: myCards = [], isLoading: cardsLoading } = useQuery<MyCard[]>({
    queryKey: ["my-cards"],
    queryFn: () => apiFetch("/v1/dashboard/my-cards?limit=10"),
  });

  const { data: workspaces = [], isLoading: wsLoading } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: () => apiFetch("/v1/workspaces"),
  });

  const stats = [
    { label: "Workspaces", value: summary?.workspaces ?? 0, icon: FolderOpen, color: "text-violet-600" },
    { label: "Projects", value: summary?.projects ?? 0, icon: Kanban, color: "text-indigo-600" },
    { label: "Assigned cards", value: summary?.assignedCards ?? 0, icon: ClipboardList, color: "text-blue-600" },
    { label: "Unread notifications", value: summary?.unreadNotifications ?? 0, icon: Bell, color: "text-orange-600" },
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Good {getGreeting()}, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-neutral-500 text-sm mt-0.5">Here's what's happening across your workspaces</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="border-neutral-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-500 font-medium">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                {summaryLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <span className="text-2xl font-bold text-neutral-900">{s.value}</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800">Assigned to me</h2>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-xs text-neutral-500 h-7">
                  See all <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
            {cardsLoading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : myCards.length === 0 ? (
              <Card className="border-dashed border-neutral-200">
                <CardContent className="p-8 text-center text-neutral-500">
                  <ClipboardList className="h-8 w-8 mx-auto mb-2 text-neutral-300" />
                  <p className="text-sm">No cards assigned to you</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {myCards.map((card) => (
                  <Link key={card.id} href={`/card/${card.id}`}>
                    <Card className="border-neutral-200 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                      <CardContent className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-neutral-900 truncate">{card.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="text-xs font-medium"
                                style={{ color: card.project.color ?? "#6366f1" }}
                              >
                                {card.project.name}
                              </span>
                              <span className="text-neutral-300">·</span>
                              <span className="text-xs text-neutral-500">{card.column.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {card.priority !== "NO_PRIORITY" && (
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[card.priority]}`}>
                                {PRIORITY_LABELS[card.priority]}
                              </span>
                            )}
                            {card.dueDate && (
                              <span className="flex items-center text-xs text-neutral-400 gap-0.5">
                                <Calendar className="h-3 w-3" />
                                {formatDistanceToNow(new Date(card.dueDate), { addSuffix: true })}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800">Workspaces</h2>
            </div>
            {wsLoading ? (
              <div className="space-y-2">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
            ) : workspaces.length === 0 ? (
              <Card className="border-dashed border-neutral-200">
                <CardContent className="p-6 text-center text-neutral-500">
                  <p className="text-sm mb-3">No workspaces yet</p>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-1.5 h-3.5 w-3.5" /> Create one
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {workspaces.map((ws) => (
                  <Link key={ws.id} href={`/workspace/${ws.id}`}>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">{ws.name[0]?.toUpperCase()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 truncate">{ws.name}</p>
                        <p className="text-xs text-neutral-500 capitalize">{ws.role.toLowerCase()}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-neutral-300 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
