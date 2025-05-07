
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PenIcon, SparklesIcon, WindIcon } from "lucide-react";

interface JournalEntryProps {
  onSave: (entry: string) => void;
  disabled?: boolean;
}

const JournalEntry = ({ onSave, disabled = false }: JournalEntryProps) => {
  const [entry, setEntry] = useState("");
  const [isWriting, setIsWriting] = useState(false);
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
    setIsWriting(false);
    toast({
      title: "Journal entry saved",
      description: "Your thoughts have been recorded.",
    });
  };
  
  return (
    <Card className="w-full shadow-sm border-bonsai-sage/20 bg-white/80 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <span className={`text-bonsai-sage transition-transform duration-300 ${isWriting ? 'rotate-[-8deg]' : ''}`}>
            {isWriting ? <SparklesIcon size={18} /> : <PenIcon size={18} />}
          </span>
          Write a Thought
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Start writing..."
          className="min-h-[120px] focus:border-bonsai-sage focus:ring-bonsai-sage/20 transition-all duration-300"
          value={entry}
          onChange={(e) => {
            setEntry(e.target.value);
            setIsWriting(e.target.value.length > 0);
          }}
          onFocus={() => setIsWriting(true)}
          onBlur={() => setIsWriting(entry.length > 0)}
          disabled={disabled}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={disabled || !entry.trim()}
          className="bg-bonsai-sage hover:bg-bonsai-sage/90 text-foreground group relative overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Save Thought
            <WindIcon size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-bonsai-sage/20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300"></span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
