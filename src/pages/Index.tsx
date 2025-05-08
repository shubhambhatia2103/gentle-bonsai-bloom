
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BonsaiTree from "@/components/BonsaiTree";
import JournalEntry from "@/components/JournalEntry";
import Insights from "@/components/Insights";
import Navigation from "@/components/Navigation";
import { JournalEntryType } from "@/components/Insights";
import { getEntries, saveEntry, hasTreeGrownToday, deleteTodayEntries } from "@/services/storageService";
import { TreeDeciduous, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [treeHasGrownToday, setTreeHasGrownToday] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  const { toast } = useToast();

  // Load entries and check if tree has grown today
  useEffect(() => {
    const loadedEntries = getEntries();
    setEntries(loadedEntries);
    setTreeHasGrownToday(hasTreeGrownToday());
    
    // Set time of day
    updateTimeOfDay();
    
    // Update time of day periodically
    const interval = setInterval(() => {
      updateTimeOfDay();
    }, 60 * 60 * 1000); // Update every hour
    
    return () => clearInterval(interval);
  }, []);
  
  const updateTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) setTimeOfDay("morning");
    else if (hour >= 11 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17 && hour < 21) setTimeOfDay("evening");
    else setTimeOfDay("night");
  };
  
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

  // Gentle greeting based on time of day
  const getTimeBasedGreeting = () => {
    switch(timeOfDay) {
      case "morning": return "Good morning";
      case "afternoon": return "Good afternoon";
      case "evening": return "Good evening";
      case "night": return "Peaceful night";
      default: return "Hello";
    }
  };
  
  // Background gradient based on time of day
  const getTimeBasedBackground = () => {
    switch(timeOfDay) {
      case "morning": 
        return "from-bonsai-sky/20 to-bonsai-ivory";
      case "afternoon": 
        return "from-bonsai-ivory to-bonsai-sky/10";
      case "evening": 
        return "from-bonsai-pink/10 to-bonsai-ivory";
      case "night": 
        return "from-bonsai-lavender/20 to-bonsai-ivory";
      default: 
        return "from-bonsai-ivory to-bonsai-sky/30";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getTimeBasedBackground()} flex flex-col transition-colors duration-1000`}>
      <header className="p-4 text-center">
        <motion.div 
          className="flex items-center justify-center gap-2.5 pl-1.5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TreeDeciduous className="text-bonsai-sage" size={24} />
          <h1 className="text-2xl font-medium tracking-wide text-shadow-sm">Digital Bonsai</h1>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-1 italic">Grow through reflection</p>
      </header>
      
      <main className="flex-1 container max-w-md mx-auto px-4 pb-16 md:pb-4">
        {activeTab === "home" && (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-xl font-medium mb-2">{getTimeBasedGreeting()}</h2>
              <p className="text-sm text-muted-foreground">
                {entries.length === 0 
                  ? "Plant your first reflection to start growing" 
                  : `${entries.length} reflection${entries.length !== 1 ? 's' : ''} so far`
                }
              </p>
            </motion.div>
            
            <motion.div 
              className="relative w-full h-72 flex items-center justify-center mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-bonsai-sage/10 animate-pulse"></div>
              </div>
              <BonsaiTree entriesCount={entries.length} timeOfDay={timeOfDay} className="z-10" />
            </motion.div>
            
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-center">
                <p className="mb-3">Ready to reflect?</p>
                <Button
                  onClick={() => setActiveTab("journal")}
                  className="bg-bonsai-sage hover:bg-bonsai-sage/90 text-foreground group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Write a thought
                    <Leaf size={14} className="transition-transform group-hover:rotate-12" />
                  </span>
                  <span className="absolute inset-0 bg-bonsai-sage/20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300"></span>
                </Button>
              </div>
              
              {treeHasGrownToday && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your bonsai has grown today. It will grow again tomorrow with new reflections.
                </p>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === "journal" && (
          <motion.div 
            className="py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-medium mb-4">Journal</h2>
            <JournalEntry onSave={handleSaveEntry} />
            {treeHasGrownToday && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Your bonsai has already grown today. Continue journaling as much as you wish.
              </p>
            )}
          </motion.div>
        )}

        {activeTab === "insights" && (
          <motion.div 
            className="py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-medium mb-4">Your Journey</h2>
            <Insights 
              entries={entries} 
              onDeleteTodayEntries={handleDeleteTodayEntries}
            />
          </motion.div>
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
