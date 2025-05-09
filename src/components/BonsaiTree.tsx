
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BonsaiTreeProps {
  entriesCount: number;
  timeOfDay?: "morning" | "afternoon" | "evening" | "night";
  className?: string;
}

const BonsaiTree = ({ entriesCount, className, timeOfDay }: BonsaiTreeProps) => {
  // Define growth stages based on entries count
  const getGrowthStage = () => {
    if (entriesCount === 0) return 0; // Seedling
    else if (entriesCount < 5) return 1; // Small plant
    else if (entriesCount < 10) return 2; // Young tree
    else if (entriesCount < 20) return 3; // Mature tree
    else return 4; // Full bonsai
  };

  const [growthStage, setGrowthStage] = useState(getGrowthStage());
  const [animate, setAnimate] = useState(false);
  
  // Time of day based color adjustments
  const getTimeBasedColors = () => {
    const time = timeOfDay || getTimeOfDay();
    
    switch(time) {
      case "morning":
        return {
          base: "bg-bonsai-sage/90",
          highlight: "bg-bonsai-sage/70",
          shadow: "bg-amber-100/20",
          pot: "bg-bonsai-pink/70",
          trunk: "bg-amber-800"
        };
      case "afternoon":
        return {
          base: "bg-bonsai-sage",
          highlight: "bg-bonsai-sage/80",
          shadow: "bg-amber-50/30",
          pot: "bg-bonsai-pink/80",
          trunk: "bg-amber-700"
        };
      case "evening":
        return {
          base: "bg-bonsai-sage/80",
          highlight: "bg-bonsai-sage/70",
          shadow: "bg-bonsai-lavender/20",
          pot: "bg-bonsai-pink/90",
          trunk: "bg-amber-900"
        };
      case "night":
        return {
          base: "bg-bonsai-sage/70",
          highlight: "bg-bonsai-sage/60",
          shadow: "bg-bonsai-sky/30",
          pot: "bg-bonsai-pink",
          trunk: "bg-amber-950"
        };
      default:
        return {
          base: "bg-bonsai-sage/90",
          highlight: "bg-bonsai-sage/70",
          shadow: "bg-amber-50/20",
          pot: "bg-bonsai-pink/70",
          trunk: "bg-amber-800"
        };
    }
  };
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };
  
  const colors = getTimeBasedColors();
  
  // Animate tree growth when entries count changes
  useEffect(() => {
    const newGrowthStage = getGrowthStage();
    if (newGrowthStage !== growthStage) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setGrowthStage(newGrowthStage);
  }, [entriesCount]);

  // Update colors every hour to match time of day
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Re-render with updated time colors
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 60 * 60 * 1000); // Update every hour
    
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center h-64", className)}>
      {/* Subtle light glow effect */}
      <div className={cn("absolute bottom-0 w-28 h-8 rounded-full mx-auto filter blur-md transition-opacity duration-1000", 
        colors.shadow, 
        growthStage === 0 && "opacity-0",
        growthStage === 1 && "opacity-30 scale-90",
        growthStage === 2 && "opacity-40 scale-100",
        growthStage === 3 && "opacity-50 scale-105",
        growthStage === 4 && "opacity-60 scale-110"
      )}></div>
      
      {/* Tree Pot */}
      <div className={cn(
        "absolute bottom-0 w-16 h-10 rounded-t-lg overflow-hidden flex items-end justify-center transition-all duration-1000",
        colors.pot,
        animate && "animate-bounce"
      )}>
        <div className="w-14 h-8 bg-bonsai-pink rounded-t-lg"></div>
      </div>
      
      {/* Tree Trunk */}
      <div 
        className={cn(
          "absolute bottom-10 w-2 rounded-full transition-all duration-1000 ease-in-out",
          colors.trunk,
          growthStage === 0 && "h-1 opacity-0",
          growthStage === 1 && "h-6",
          growthStage === 2 && "h-14",
          growthStage === 3 && "h-20",
          growthStage === 4 && "h-28",
          animate && "animate-pulse"
        )}
      >
        {/* Small Branch - only show for stages 2+ */}
        {growthStage >= 2 && (
          <div className={cn(
            "absolute top-3 -right-3 w-4 h-1 rounded-full transform rotate-12",
            colors.trunk
          )}></div>
        )}
        
        {/* Medium Branch - only show for stages 3+ */}
        {growthStage >= 3 && (
          <div className={cn(
            "absolute top-8 -left-4 w-4 h-1 rounded-full transform -rotate-6",
            colors.trunk
          )}></div>
        )}
      </div>
      
      {/* Foliage/Leaves */}
      <div
        className={cn(
          "absolute rounded-full transition-all duration-1000 ease-in-out animate-sway origin-bottom",
          colors.base,
          growthStage === 0 && "w-0 h-0 bottom-12 opacity-0",
          growthStage === 1 && "w-8 h-8 bottom-16",
          growthStage === 2 && "w-16 h-12 bottom-24",
          growthStage === 3 && "w-24 h-16 bottom-28",
          growthStage === 4 && "w-32 h-24 bottom-36",
          animate && "animate-pulse"
        )}
      ></div>
      
      {/* Additional smaller leaves for more developed trees */}
      {growthStage >= 2 && (
        <div className={cn(
          "absolute rounded-full transition-all duration-1000 -right-4 animate-float",
          colors.highlight,
          growthStage === 2 && "w-8 h-6 bottom-20",
          growthStage === 3 && "w-10 h-8 bottom-24",
          growthStage === 4 && "w-12 h-10 bottom-30"
        )}></div>
      )}
      
      {growthStage >= 3 && (
        <div className={cn(
          "absolute rounded-full transition-all duration-1000 -left-6 animate-float animation-delay-1000",
          colors.highlight,
          growthStage === 3 && "w-8 h-6 bottom-24",
          growthStage === 4 && "w-10 h-8 bottom-30"
        )}></div>
      )}
      
      {/* Only show these elements for a full grown bonsai */}
      {growthStage === 4 && (
        <>
          <div className={cn("absolute rounded-full w-10 h-8 bottom-36 -left-10 animate-float", colors.highlight)}></div>
          <div className={cn("absolute rounded-full w-8 h-6 bottom-40 left-2 animate-float", colors.highlight)}></div>
          <div className={cn("absolute rounded-full w-9 h-7 bottom-40 right-0 animate-float", colors.highlight)}></div>
        </>
      )}
      
      {/* Subtle light particles for animation when growing */}
      {animate && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full bg-bonsai-sky/30 animate-float",
                i % 2 === 0 ? "left-1/2" : i % 3 === 0 ? "left-1/3" : "left-2/3",
                i % 3 === 0 ? "bottom-1/2" : i % 2 === 0 ? "bottom-1/4" : "bottom-3/4"
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BonsaiTree;
