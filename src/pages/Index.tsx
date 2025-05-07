
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BonsaiTree from "@/components/BonsaiTree";
import JournalEntry from "@/components/JournalEntry";
import Insights from "@/components/Insights";
import Navigation from "@/components/Navigation";
import { JournalEntryType } from "@/components/Insights";
import { canSaveEntryToday, getEntries, hasEntryToday, saveEntry } from "@/services/storageService";
import { getPromptForToday } from "@/services/promptService";
import { TreeDeciduous } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [todayPrompt, setTodayPrompt] = useState("");
  const [hasAddedToday, setHasAddedToday] = useState(false);
  const { toast } = useToast();

  // Load entries and check if an entry was added today
  useEffect(() => {
    const loadedEntries = getEntries();
    setEntries(loadedEntries);
    setHasAddedToday(hasEntryToday());
    setTodayPrompt(getPromptForToday());
  }, []);
  
  const handleSaveEntry = (content: string) => {
    if (!canSaveEntryToday()) {
      toast({
        title: "Already journaled today",
        description: "You can add a new reflection tomorrow",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry = saveEntry(content, todayPrompt);
    if (newEntry) {
      setEntries([...entries, newEntry]);
      setHasAddedToday(true);
      
      // Show success animation
      toast({
        title: "Your bonsai is growing!",
        description: "Thank you for taking time to reflect.",
      });
      
      // Switch to home tab to show tree growth
      setActiveTab("home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bonsai-ivory to-bonsai-sky/30 flex flex-col">
      <header className="p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <TreeDeciduous className="text-bonsai-sage" size={24} />
          <h1 className="text-2xl font-medium">Digital Bonsai</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Grow through reflection</p>
      </header>
      
      <main className="flex-1 container max-w-md mx-auto px-4 pb-16 md:pb-4">
        {activeTab === "home" && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-4">
              <h2 className="text-xl font-medium mb-2">Your Bonsai</h2>
              <p className="text-sm text-muted-foreground">
                {entries.length === 0 
                  ? "Plant your first reflection to start growing" 
                  : `${entries.length} reflection${entries.length !== 1 ? 's' : ''} so far`
                }
              </p>
            </div>
            
            <div className="relative w-full h-72 flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-bonsai-sage/10 animate-pulse"></div>
              </div>
              <BonsaiTree entriesCount={entries.length} className="z-10" />
            </div>
            
            <div className="w-full">
              {hasAddedToday ? (
                <div className="text-center p-4 bg-bonsai-sage/20 rounded-lg">
                  <p className="font-medium">Today's reflection complete ✓</p>
                  <p className="text-sm text-muted-foreground mt-1">Return tomorrow to continue growing</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-3">Ready to reflect on your day?</p>
                  <Button
                    onClick={() => setActiveTab("journal")}
                    className="bg-bonsai-sage hover:bg-bonsai-sage/90 text-foreground"
                  >
                    Write a reflection
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "journal" && (
          <div className="py-4">
            <h2 className="text-xl font-medium mb-4">Daily Reflection</h2>
            <JournalEntry 
              prompt={todayPrompt}
              onSave={handleSaveEntry}
              disabled={hasAddedToday}
            />
            {hasAddedToday && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                You've already reflected today. Return tomorrow for a new prompt.
              </p>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="py-4">
            <h2 className="text-xl font-medium mb-4">Your Journey</h2>
            <Insights entries={entries} />
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
