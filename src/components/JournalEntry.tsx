
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PenIcon } from "lucide-react";

interface JournalEntryProps {
  prompt: string;
  onSave: (entry: string) => void;
  disabled?: boolean;
}

const JournalEntry = ({ prompt, onSave, disabled = false }: JournalEntryProps) => {
  const [entry, setEntry] = useState("");
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!entry.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }
    
    onSave(entry);
    setEntry("");
    toast({
      title: "Journal entry saved",
      description: "Your bonsai appreciates your reflection.",
    });
  };
  
  return (
    <Card className="w-full shadow-sm border-bonsai-sage/20 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <span className="text-bonsai-sage">
            <PenIcon size={18} />
          </span>
          Daily Reflection
        </CardTitle>
        <p className="text-sm text-muted-foreground">{prompt}</p>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your thoughts here..."
          className="min-h-[120px] focus:border-bonsai-sage focus:ring-bonsai-sage/20"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          disabled={disabled}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={disabled || !entry.trim()}
          className="bg-bonsai-sage hover:bg-bonsai-sage/90 text-foreground"
        >
          Save Reflection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
