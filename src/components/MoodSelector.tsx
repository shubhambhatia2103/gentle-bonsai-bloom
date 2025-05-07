
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Heart, Smile, Meh, Frown, Cloud } from "lucide-react";

export type MoodType = "joyful" | "calm" | "neutral" | "sad" | "stormy" | undefined;

interface MoodSelectorProps {
  onSelect: (mood: MoodType) => void;
  selectedMood?: MoodType;
  className?: string;
}

const moodOptions = [
  { value: "joyful", label: "Joyful", icon: Smile, color: "text-amber-400" },
  { value: "calm", label: "Calm", icon: Heart, color: "text-bonsai-sage" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-blue-300" },
  { value: "sad", label: "Sad", icon: Frown, color: "text-bonsai-lavender" },
  { value: "stormy", label: "Stormy", icon: Cloud, color: "text-gray-400" },
];

const MoodSelector = ({ onSelect, selectedMood, className }: MoodSelectorProps) => {
  const [hoverMood, setHoverMood] = useState<string | null>(null);
  
  return (
    <div className={className}>
      <div className="mb-2">
        <p className="text-sm text-muted-foreground mb-1">How are you feeling today?</p>
      </div>
      
      <RadioGroup
        className="flex gap-3 items-center justify-center"
        value={selectedMood}
        onValueChange={(value) => onSelect(value as MoodType)}
      >
        {moodOptions.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.value;
          const isHovering = hoverMood === mood.value;
          
          return (
            <div key={mood.value} className="text-center">
              <Label
                htmlFor={`mood-${mood.value}`}
                className="flex flex-col items-center cursor-pointer space-y-1"
                onMouseEnter={() => setHoverMood(mood.value)}
                onMouseLeave={() => setHoverMood(null)}
              >
                <motion.div 
                  className={`p-3 rounded-full relative ${isSelected ? 'bg-bonsai-sage/20' : 'bg-transparent'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {(isSelected || isHovering) && (
                    <motion.div 
                      className="absolute inset-0 bg-bonsai-sage/10 rounded-full -z-10"
                      layoutId="activeMood"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Icon className={`${isSelected ? mood.color : 'text-muted-foreground'} h-5 w-5`} />
                </motion.div>
                <span className={`text-xs ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {mood.label}
                </span>
                <RadioGroupItem 
                  value={mood.value} 
                  id={`mood-${mood.value}`} 
                  className="sr-only" 
                />
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default MoodSelector;
