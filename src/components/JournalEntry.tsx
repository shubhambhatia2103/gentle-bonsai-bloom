
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PenIcon } from "lucide-react";

interface JournalEntryProps {
  onSave: (entry: string) => void;
  disabled?: boolean;
}

const JournalEntry = ({ onSave, disabled = false }: JournalEntryProps) => {
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
      description: "Your thoughts have been recorded.",
    });
  };
  
  return (
    <Card className="w-full shadow-sm border-bonsai-sage/20 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <span className="text-bonsai-sage">
            <PenIcon size={18} />
          </span>
          Write a Thought
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Start writing..."
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
          Save Thought
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
