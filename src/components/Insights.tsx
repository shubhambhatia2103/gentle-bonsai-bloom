
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BookOpenIcon, TreeDeciduous, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoodType } from "./MoodSelector";
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
  mood?: MoodType;
}

interface InsightsProps {
  entries: JournalEntryType[];
  className?: string;
  onDeleteTodayEntries?: () => void;
}

const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case "joyful": return "😊";
    case "calm": return "❤️";
    case "neutral": return "😐";
    case "sad": return "😔";
    case "stormy": return "☁️";
    default: return "";
  }
};

const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case "joyful": return "bg-amber-100";
    case "calm": return "bg-bonsai-sage/20";
    case "neutral": return "bg-blue-100";
    case "sad": return "bg-bonsai-lavender/20";
    case "stormy": return "bg-gray-100";
    default: return "bg-transparent";
  }
};

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

  // Group entries by date for mood visualization
  const entriesByDate = sortedEntries.reduce<Record<string, JournalEntryType[]>>((acc, entry) => {
    const dateStr = new Date(entry.date).toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(entry);
    return acc;
  }, {});

  // Count moods for summary
  const moodCounts = entries.reduce<Record<string, number>>((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

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
      
      {/* Mood summary section - only show if there are entries with moods */}
      {Object.keys(moodCounts).length > 0 && (
        <CardContent className="pb-0">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Your Mood Journey</h3>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(moodCounts).map(([mood, count]) => (
                <div 
                  key={mood}
                  className={cn("px-3 py-1 rounded-full text-xs flex items-center gap-1", getMoodColor(mood as MoodType))}
                >
                  <span>{getMoodEmoji(mood as MoodType)}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
      
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
              <TreeDeciduous size={40} strokeWidth={1.5} className="mb-2 opacity-40" />
              <p>Start your journey by writing your first reflection</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(entriesByDate).map(([date, dayEntries]) => (
                <div key={date} className="border-b border-bonsai-lavender/10 pb-3 last:border-0 animate-fade-in">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">{format(new Date(date), "MMMM d, yyyy")}</p>
                    
                    {/* Show mood icons for the day */}
                    <div className="flex gap-1">
                      {[...new Set(dayEntries.map(entry => entry.mood).filter(Boolean))].map((mood, idx) => (
                        <span 
                          key={`${mood}-${idx}`}
                          className={cn("text-xs px-2 py-1 rounded-full", getMoodColor(mood as MoodType))}
                        >
                          {getMoodEmoji(mood as MoodType)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {dayEntries.map((entry) => (
                    <div key={entry.id} className="mb-2 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(entry.date), "h:mm a")}
                        </span>
                        {entry.mood && (
                          <span className="text-xs">{getMoodEmoji(entry.mood)}</span>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  ))}
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
