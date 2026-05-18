import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Check, User, Clock, FileText, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: string;
  title: string;
  message?: string;
  read: boolean;
  createdAt: string;
}

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  CARD_ASSIGNED: User,
  MENTIONED: MessageSquare,
  CARD_OVERDUE: Clock,
  CARD_UPDATED: FileText,
  COMMENT_ADDED: MessageSquare,
};

export default function NotificationsPage() {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => apiFetch("/v1/notifications?limit=50"),
  });

  const markRead = useMutation({
    mutationFn: (ids?: string[]) =>
      apiFetch("/v1/notifications/mark-read", {
        method: "POST",
        body: JSON.stringify({ ids }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
  });

  const unread = notifications.filter((n) => !n.read);

  return (
    <AppLayout>
      <div className="p-6 max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Notifications</h1>
            {unread.length > 0 && (
              <p className="text-sm text-neutral-500 mt-0.5">{unread.length} unread</p>
            )}
          </div>
          {unread.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markRead.mutate(undefined)}
              disabled={markRead.isPending}
            >
              <Check className="mr-1.5 h-3.5 w-3.5" /> Mark all read
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="h-12 w-12 mx-auto mb-4 text-neutral-200" />
            <p className="font-medium text-neutral-600">All caught up!</p>
            <p className="text-sm text-neutral-400 mt-1">You have no notifications</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((n) => {
              const Icon = TYPE_ICONS[n.type] ?? Bell;
              return (
                <div
                  key={n.id}
                  onClick={() => !n.read && markRead.mutate([n.id])}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl border transition-all",
                    n.read
                      ? "border-transparent hover:bg-neutral-50"
                      : "border-indigo-100 bg-indigo-50/50 cursor-pointer hover:bg-indigo-50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    n.read ? "bg-neutral-100" : "bg-indigo-100"
                  )}>
                    <Icon className={cn("h-4 w-4", n.read ? "text-neutral-400" : "text-indigo-600")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium", n.read ? "text-neutral-600" : "text-neutral-900")}>
                      {n.title}
                    </p>
                    {n.message && (
                      <p className="text-xs text-neutral-500 mt-0.5 truncate">{n.message}</p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
