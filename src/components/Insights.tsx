
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BookOpenIcon, TreeDeciduous, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface JournalEntryType {
  id: string;
  content: string;
  date: string;
}

interface InsightsProps {
  entries: JournalEntryType[];
  className?: string;
  onDeleteTodayEntries?: () => void;
}

const Insights = ({ entries, className, onDeleteTodayEntries }: InsightsProps) => {
  // Sort entries by date in descending order (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Check if there are any entries from today
  const today = new Date().toDateString();
  const hasTodayEntries = entries.some(entry => 
    new Date(entry.date).toDateString() === today
  );

  return (
    <Card className={cn("bg-white/80 backdrop-blur-sm border-bonsai-lavender/20", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon size={18} className="text-bonsai-lavender" />
            Your Journey
          </CardTitle>
          
          {hasTodayEntries && onDeleteTodayEntries && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} className="mr-1" /> 
                  Clear today
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear today's thoughts?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all entries from today. Your tree growth will be preserved.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-muted hover:bg-muted/80">Keep my thoughts</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={onDeleteTodayEntries}
                  >
                    Clear entries
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <CardDescription>
          {entries.length === 0 
            ? "Your reflection history will appear here" 
            : `You have ${entries.length} reflection${entries.length !== 1 ? 's' : ''}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
              <TreeDeciduous size={40} strokeWidth={1.5} className="mb-2 opacity-40" />
              <p>Start your journey by writing your first reflection</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEntries.map((entry) => (
                <div key={entry.id} className="border-b border-bonsai-lavender/10 pb-3 last:border-0 animate-fade-in">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">{format(new Date(entry.date), "MMMM d, yyyy")}</p>
                    <span className="bg-bonsai-lavender/10 text-xs px-2 py-1 rounded-full">
                      {format(new Date(entry.date), "h:mm a")}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Insights;
