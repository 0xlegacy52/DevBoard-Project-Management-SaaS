import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import {
  Flag,
  Calendar,
  MessageSquare,
  CheckSquare,
  Paperclip,
  Trash2,
  Plus,
  Check,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface CardDetail {
  id: string;
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
  columnId: string;
  assignees: { id: string; name: string; avatarUrl?: string }[];
  labels: { id: string; name: string; color: string }[];
  checklists: {
    id: string;
    title: string;
    items: { id: string; title: string; completed: boolean }[];
  }[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string };
}

const PRIORITIES = ["NO_PRIORITY", "LOW", "MEDIUM", "HIGH", "URGENT"] as const;
const PRIORITY_LABELS: Record<string, string> = {
  NO_PRIORITY: "No priority",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};
const PRIORITY_COLORS: Record<string, string> = {
  URGENT: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-blue-100 text-blue-700",
  NO_PRIORITY: "bg-neutral-100 text-neutral-500",
};

interface Props {
  cardId: string;
  workspaceId: string;
  onClose: () => void;
}

export default function CardDetailModal({ cardId, workspaceId, onClose }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [newComment, setNewComment] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [descDraft, setDescDraft] = useState<string | null>(null);
  const [newChecklistTitle, setNewChecklistTitle] = useState("");
  const [addingChecklist, setAddingChecklist] = useState(false);
  const [newChecklistItemTitle, setNewChecklistItemTitle] = useState<Record<string, string>>({});

  const { data: card, isLoading } = useQuery<CardDetail>({
    queryKey: ["card", cardId],
    queryFn: () => apiFetch(`/v1/cards/${cardId}`),
    enabled: !!cardId,
  });

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["card-comments", cardId],
    queryFn: () => apiFetch(`/v1/cards/${cardId}/comments`),
    enabled: !!cardId,
  });

  const updateCard = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch(`/v1/cards/${cardId}`, { method: "PATCH", body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card", cardId] });
      if (card) qc.invalidateQueries({ queryKey: ["cards", card.columnId] });
    },
  });

  const deleteCard = useMutation({
    mutationFn: () => apiFetch(`/v1/cards/${cardId}`, { method: "DELETE" }),
    onSuccess: () => {
      if (card) qc.invalidateQueries({ queryKey: ["cards", card.columnId] });
      toast({ title: "Card deleted" });
      onClose();
    },
  });

  const addComment = useMutation({
    mutationFn: (content: string) =>
      apiFetch(`/v1/cards/${cardId}/comments`, { method: "POST", body: JSON.stringify({ content }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card-comments", cardId] });
      setNewComment("");
    },
    onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const addChecklist = useMutation({
    mutationFn: (title: string) =>
      apiFetch(`/v1/cards/${cardId}/checklists`, { method: "POST", body: JSON.stringify({ title }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card", cardId] });
      setNewChecklistTitle("");
      setAddingChecklist(false);
    },
  });

  const addChecklistItem = useMutation({
    mutationFn: ({ checklistId, title }: { checklistId: string; title: string }) =>
      apiFetch(`/v1/cards/${cardId}/checklists/${checklistId}/items`, { method: "POST", body: JSON.stringify({ title }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card", cardId] });
      setNewChecklistItemTitle({});
    },
  });

  const toggleChecklistItem = useMutation({
    mutationFn: ({ checklistId, itemId, completed }: { checklistId: string; itemId: string; completed: boolean }) =>
      apiFetch(`/v1/cards/${cardId}/checklists/${checklistId}/items/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card", cardId] });
    },
  });

  if (isLoading) {
    return (
      <Dialog open onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="max-w-2xl">
          <Skeleton className="h-8 w-2/3" />
          <div className="space-y-4 mt-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!card) return null;

  const totalItems = card.checklists.reduce((sum, cl) => sum + cl.items.length, 0);
  const completedItems = card.checklists.reduce((sum, cl) => sum + cl.items.filter((i) => i.completed).length, 0);
  const checklistProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {editingTitle ? (
            <Input
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                if (titleDraft.trim()) updateCard.mutate({ title: titleDraft.trim() });
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (titleDraft.trim()) updateCard.mutate({ title: titleDraft.trim() });
                  setEditingTitle(false);
                }
                if (e.key === "Escape") setEditingTitle(false);
              }}
              className="text-lg font-semibold"
              autoFocus
            />
          ) : (
            <DialogTitle
              onClick={() => {
                setTitleDraft(card.title);
                setEditingTitle(true);
              }}
              className="cursor-text hover:bg-neutral-50 rounded px-1 -mx-1 py-0.5"
            >
              {card.title}
            </DialogTitle>
          )}
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-5">
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Description</p>
              {descDraft !== null ? (
                <div className="space-y-2">
                  <Textarea
                    value={descDraft}
                    onChange={(e) => setDescDraft(e.target.value)}
                    rows={4}
                    className="text-sm"
                    autoFocus
                  />
                  <div className="flex gap-1.5">
                    <Button size="sm" className="h-7 text-xs" onClick={() => {
                      updateCard.mutate({ description: descDraft });
                      setDescDraft(null);
                    }}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setDescDraft(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setDescDraft(card.description ?? "")}
                  className={cn(
                    "text-sm rounded-lg border border-transparent p-2 -mx-2 cursor-text hover:border-neutral-200 hover:bg-neutral-50 min-h-[60px]",
                    !card.description && "text-neutral-400"
                  )}
                >
                  {card.description || "Add a description..."}
                </div>
              )}
            </div>

            {card.checklists.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-neutral-400" />
                    <p className="text-xs font-medium text-neutral-500">
                      Checklist ({completedItems}/{totalItems})
                    </p>
                  </div>
                  {totalItems > 0 && (
                    <span className="text-xs text-neutral-500">{checklistProgress}%</span>
                  )}
                </div>
                {totalItems > 0 && (
                  <div className="h-1.5 bg-neutral-200 rounded-full mb-3">
                    <div
                      className="h-1.5 bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${checklistProgress}%` }}
                    />
                  </div>
                )}
                {card.checklists.map((cl) => (
                  <div key={cl.id} className="mb-3">
                    <p className="text-xs font-semibold text-neutral-700 mb-1.5">{cl.title}</p>
                    <div className="space-y-1.5">
                      {cl.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              toggleChecklistItem.mutate({ checklistId: cl.id, itemId: item.id, completed: !item.completed })
                            }
                            className={cn(
                              "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                              item.completed ? "bg-indigo-600 border-indigo-600" : "border-neutral-300 hover:border-indigo-400"
                            )}
                          >
                            {item.completed && <Check className="h-2.5 w-2.5 text-white" />}
                          </button>
                          <span className={cn("text-sm", item.completed && "line-through text-neutral-400")}>
                            {item.title}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <Input
                          value={newChecklistItemTitle[cl.id] ?? ""}
                          onChange={(e) => setNewChecklistItemTitle((prev) => ({ ...prev, [cl.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (newChecklistItemTitle[cl.id] ?? "").trim()) {
                              addChecklistItem.mutate({ checklistId: cl.id, title: newChecklistItemTitle[cl.id].trim() });
                            }
                          }}
                          placeholder="Add item..."
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-neutral-400" />
                <p className="text-xs font-medium text-neutral-500">Comments ({comments.length})</p>
              </div>
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-indigo-700">{c.user.name[0]?.toUpperCase()}</span>
                    </div>
                    <div className="flex-1 bg-neutral-50 rounded-lg p-2.5 border border-neutral-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-neutral-700">{c.user.name}</span>
                        <span className="text-xs text-neutral-400">
                          {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700">{c.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-indigo-700">{user?.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      rows={2}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => newComment.trim() && addComment.mutate(newComment.trim())}
                      disabled={!newComment.trim() || addComment.isPending}
                    >
                      {addComment.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Priority</p>
              <div className="flex flex-col gap-1">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    onClick={() => updateCard.mutate({ priority: p })}
                    className={cn(
                      "text-xs px-2 py-1 rounded-md text-left font-medium transition-colors",
                      card.priority === p ? PRIORITY_COLORS[p] : "text-neutral-600 hover:bg-neutral-100"
                    )}
                  >
                    {PRIORITY_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>

            {card.labels.length > 0 && (
              <div>
                <p className="text-xs font-medium text-neutral-500 mb-1.5">Labels</p>
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((l) => (
                    <span
                      key={l.id}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${l.color}20`, color: l.color }}
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {card.assignees.length > 0 && (
              <div>
                <p className="text-xs font-medium text-neutral-500 mb-1.5">Assignees</p>
                <div className="space-y-1">
                  {card.assignees.map((a) => (
                    <div key={a.id} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-700">{a.name[0]?.toUpperCase()}</span>
                      </div>
                      <span className="text-xs text-neutral-700">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Actions</p>
              <div className="space-y-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-7 text-xs justify-start gap-1.5"
                  onClick={() => setAddingChecklist(true)}
                >
                  <CheckSquare className="h-3.5 w-3.5" /> Add checklist
                </Button>
                {addingChecklist && (
                  <div className="space-y-1.5 p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Input
                      value={newChecklistTitle}
                      onChange={(e) => setNewChecklistTitle(e.target.value)}
                      placeholder="Checklist title..."
                      className="h-7 text-xs"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <Button size="sm" className="h-6 text-xs" onClick={() => newChecklistTitle.trim() && addChecklist.mutate(newChecklistTitle.trim())} disabled={!newChecklistTitle.trim() || addChecklist.isPending}>
                        Add
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => setAddingChecklist(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-7 text-xs justify-start gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteCard.mutate()}
                  disabled={deleteCard.isPending}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete card
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
