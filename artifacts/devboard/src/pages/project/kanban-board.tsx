import { useState, useRef } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal, Calendar, Flag, Loader2, X, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import CardDetailModal from "@/components/card/card-detail-modal";
import { cn } from "@/lib/utils";

interface Column {
  id: string;
  name: string;
  order: number;
}

interface Card {
  id: string;
  title: string;
  priority: string;
  dueDate?: string;
  order: number;
  columnId: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: "text-red-600",
  HIGH: "text-orange-500",
  MEDIUM: "text-yellow-500",
  LOW: "text-blue-500",
  NO_PRIORITY: "text-neutral-300",
};

const PRIORITY_LABELS: Record<string, string> = {
  URGENT: "Urgent",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  NO_PRIORITY: "No priority",
};

function AddCardForm({ columnId, projectId, workspaceId, onDone }: {
  columnId: string;
  projectId: string;
  workspaceId: string;
  onDone: () => void;
}) {
  const [title, setTitle] = useState("");
  const qc = useQueryClient();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (t: string) =>
      apiFetch(`/v1/cards/column/${columnId}`, {
        method: "POST",
        body: JSON.stringify({ title: t }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cards", columnId] });
      setTitle("");
      inputRef.current?.focus();
    },
    onError: (err) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const submit = () => {
    if (!title.trim()) return;
    mutation.mutate(title.trim());
  };

  return (
    <div className="p-2 space-y-2">
      <Input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") onDone();
        }}
        placeholder="Card title..."
        className="h-8 text-sm"
        autoFocus
      />
      <div className="flex gap-1.5">
        <Button size="sm" className="h-7 text-xs" onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
          Add
        </Button>
        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onDone}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

function KanbanCard({
  card,
  onClick,
}: {
  card: Card;
  onClick: () => void;
}) {
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-neutral-200 p-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all group"
    >
      <p className="text-sm font-medium text-neutral-900 leading-snug">{card.title}</p>
      <div className="flex items-center gap-2 mt-2">
        {card.priority !== "NO_PRIORITY" && (
          <span className={cn("text-xs font-medium", PRIORITY_COLORS[card.priority])}>
            <Flag className="inline h-3 w-3 mr-0.5" />
            {PRIORITY_LABELS[card.priority]}
          </span>
        )}
        {card.dueDate && (
          <span className={cn("flex items-center text-xs gap-0.5", isOverdue ? "text-red-500" : "text-neutral-400")}>
            <Calendar className="h-3 w-3" />
            {new Date(card.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({
  column,
  workspaceId,
  projectId,
  onCardClick,
}: {
  column: Column;
  workspaceId: string;
  projectId: string;
  onCardClick: (cardId: string) => void;
}) {
  const [addingCard, setAddingCard] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: cards = [], isLoading } = useQuery<Card[]>({
    queryKey: ["cards", column.id],
    queryFn: () => apiFetch(`/v1/cards/column/${column.id}`),
  });

  const deleteColumnMutation = useMutation({
    mutationFn: () => apiFetch(`/v1/columns/${column.id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["columns", projectId] });
      toast({ title: "Column deleted" });
    },
  });

  return (
    <div className="flex flex-col w-72 shrink-0 bg-neutral-50 rounded-xl border border-neutral-200">
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-neutral-800">{column.name}</span>
          <span className="text-xs text-neutral-400 bg-neutral-200 rounded px-1.5 py-0.5">
            {cards.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-neutral-400 hover:text-neutral-600"
            onClick={() => setAddingCard(true)}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-neutral-400 hover:text-neutral-600">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAddingCard(true)}>Add card</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => deleteColumnMutation.mutate()}
              >
                Delete column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 min-h-[80px] max-h-[calc(100vh-220px)]">
        {isLoading ? (
          <div className="space-y-2 p-1">
            {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard key={card.id} card={card} onClick={() => onCardClick(card.id)} />
          ))
        )}
      </div>

      {addingCard ? (
        <AddCardForm
          columnId={column.id}
          projectId={projectId}
          workspaceId={workspaceId}
          onDone={() => setAddingCard(false)}
        />
      ) : (
        <button
          onClick={() => setAddingCard(true)}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 px-3 py-2 hover:bg-neutral-100 rounded-b-xl transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add card
        </button>
      )}
    </div>
  );
}

export default function KanbanBoardPage() {
  const [, params] = useRoute("/workspace/:workspaceId/project/:projectId");
  const workspaceId = params?.workspaceId ?? "";
  const projectId = params?.projectId ?? "";
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: project } = useQuery<{ id: string; name: string; color: string; description?: string }>({
    queryKey: ["project", projectId],
    queryFn: () => apiFetch(`/v1/projects/${projectId}`),
    enabled: !!projectId,
  });

  const { data: columns = [], isLoading: columnsLoading } = useQuery<Column[]>({
    queryKey: ["columns", projectId],
    queryFn: () => apiFetch(`/v1/projects/${projectId}/columns`),
    enabled: !!projectId,
  });

  const addColumnMutation = useMutation({
    mutationFn: (name: string) =>
      apiFetch(`/v1/projects/${projectId}/columns`, {
        method: "POST",
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["columns", projectId] });
      setNewColumnName("");
      setAddingColumn(false);
      toast({ title: "Column added" });
    },
    onError: (err) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  return (
    <AppLayout workspaceId={workspaceId}>
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 border-b border-neutral-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${project?.color ?? "#6366f1"}20` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project?.color ?? "#6366f1" }} />
            </div>
            <div>
              <h1 className="font-bold text-neutral-900">{project?.name ?? "Project"}</h1>
              {project?.description && (
                <p className="text-xs text-neutral-500">{project.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 p-6 h-full items-start">
            {columnsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-72 h-64 shrink-0 rounded-xl" />
              ))
            ) : (
              columns.map((col) => (
                <KanbanColumn
                  key={col.id}
                  column={col}
                  workspaceId={workspaceId}
                  projectId={projectId}
                  onCardClick={setSelectedCardId}
                />
              ))
            )}

            {addingColumn ? (
              <div className="w-72 shrink-0 bg-neutral-50 rounded-xl border border-neutral-200 p-3 space-y-2">
                <Input
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newColumnName.trim()) addColumnMutation.mutate(newColumnName.trim());
                    if (e.key === "Escape") setAddingColumn(false);
                  }}
                  placeholder="Column name..."
                  className="h-8 text-sm"
                  autoFocus
                />
                <div className="flex gap-1.5">
                  <Button size="sm" className="h-7 text-xs" onClick={() => addColumnMutation.mutate(newColumnName.trim())} disabled={!newColumnName.trim() || addColumnMutation.isPending}>
                    {addColumnMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                    Add column
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setAddingColumn(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAddingColumn(true)}
                className="w-72 shrink-0 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" /> Add column
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedCardId && (
        <CardDetailModal
          cardId={selectedCardId}
          workspaceId={workspaceId}
          onClose={() => setSelectedCardId(null)}
        />
      )}
    </AppLayout>
  );
}
