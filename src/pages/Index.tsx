
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BonsaiTree from "@/components/BonsaiTree";
import JournalEntry from "@/components/JournalEntry";
import Insights from "@/components/Insights";
import Navigation from "@/components/Navigation";
import { JournalEntryType } from "@/components/Insights";
import { getEntries, saveEntry, hasTreeGrownToday, deleteTodayEntries } from "@/services/storageService";
import { TreeDeciduous } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [treeHasGrownToday, setTreeHasGrownToday] = useState(false);
  const { toast } = useToast();

  // Load entries and check if tree has grown today
  useEffect(() => {
    const loadedEntries = getEntries();
    setEntries(loadedEntries);
    setTreeHasGrownToday(hasTreeGrownToday());
  }, []);
  
  const handleSaveEntry = (content: string) => {    
    const newEntry = saveEntry(content);
    
    // Update entries list
    setEntries([...entries, newEntry]);
    
    // Check if this is the first entry of the day (which grows the tree)
    const wasTreeGrownBefore = treeHasGrownToday;
    const isTreeGrownNow = hasTreeGrownToday();
    
    if (!wasTreeGrownBefore && isTreeGrownNow) {
      setTreeHasGrownToday(true);
      
      // Show success animation
      toast({
        title: "Your bonsai is growing!",
        description: "Thank you for taking time to reflect.",
      });
      
      // Switch to home tab to show tree growth
      setActiveTab("home");
    } else {
      toast({
        title: "Entry saved",
        description: "Your thought has been recorded.",
      });
    }
  };
  
  const handleDeleteTodayEntries = () => {
    deleteTodayEntries();
    const remainingEntries = getEntries();
    setEntries(remainingEntries);
    
    toast({
      title: "Today's entries cleared",
      description: "Your bonsai growth is preserved.",
    });
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
              <div className="text-center">
                <p className="mb-3">Ready to reflect?</p>
                <Button
                  onClick={() => setActiveTab("journal")}
                  className="bg-bonsai-sage hover:bg-bonsai-sage/90 text-foreground"
                >
                  Write a thought
                </Button>
              </div>
              
              {treeHasGrownToday && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your bonsai has grown today. It will grow again tomorrow with new reflections.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "journal" && (
          <div className="py-4">
            <h2 className="text-xl font-medium mb-4">Journal</h2>
            <JournalEntry onSave={handleSaveEntry} />
            {treeHasGrownToday && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Your bonsai has already grown today. Continue journaling as much as you wish.
              </p>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="py-4">
            <h2 className="text-xl font-medium mb-4">Your Journey</h2>
            <Insights 
              entries={entries} 
              onDeleteTodayEntries={handleDeleteTodayEntries}
            />
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
