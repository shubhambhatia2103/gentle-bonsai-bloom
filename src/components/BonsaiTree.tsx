
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BonsaiTreeProps {
  entriesCount: number;
  className?: string;
}

const BonsaiTree = ({ entriesCount, className }: BonsaiTreeProps) => {
  // Define growth stages based on entries count
  const getGrowthStage = () => {
    if (entriesCount === 0) return 0; // Seedling
    else if (entriesCount < 5) return 1; // Small plant
    else if (entriesCount < 10) return 2; // Young tree
    else if (entriesCount < 20) return 3; // Mature tree
    else return 4; // Full bonsai
  };

  const [growthStage, setGrowthStage] = useState(getGrowthStage());
  
  // Animate tree growth when entries count changes
  useEffect(() => {
    setGrowthStage(getGrowthStage());
  }, [entriesCount]);

  return (
    <div className={cn("relative flex items-center justify-center h-64", className)}>
      <div className="absolute bottom-0 w-20 h-8 bg-bonsai-sage/20 rounded-full mx-auto"></div>
      
      {/* Tree Pot */}
      <div className="absolute bottom-0 w-16 h-10 bg-bonsai-pink/70 rounded-t-lg overflow-hidden flex items-end justify-center">
        <div className="w-14 h-8 bg-bonsai-pink rounded-t-lg"></div>
      </div>
      
      {/* Tree Trunk */}
      <div 
        className={cn(
          "absolute bottom-10 w-2 bg-amber-800 rounded-full transition-all duration-1000 ease-in-out",
          growthStage === 0 && "h-1 opacity-0",
          growthStage === 1 && "h-6",
          growthStage === 2 && "h-14",
          growthStage === 3 && "h-20",
          growthStage === 4 && "h-28"
        )}
      >
        {/* Small Branch - only show for stages 2+ */}
        {growthStage >= 2 && (
          <div className="absolute top-3 -right-3 w-4 h-1 bg-amber-800 rounded-full transform rotate-12"></div>
        )}
        
        {/* Medium Branch - only show for stages 3+ */}
        {growthStage >= 3 && (
          <div className="absolute top-8 -left-4 w-4 h-1 bg-amber-800 rounded-full transform -rotate-6"></div>
        )}
      </div>
      
      {/* Foliage/Leaves */}
      <div
        className={cn(
          "absolute rounded-full bg-bonsai-sage/90 transition-all duration-1000 ease-in-out animate-sway origin-bottom",
          growthStage === 0 && "w-0 h-0 bottom-12 opacity-0",
          growthStage === 1 && "w-8 h-8 bottom-16",
          growthStage === 2 && "w-16 h-12 bottom-24",
          growthStage === 3 && "w-24 h-16 bottom-28",
          growthStage === 4 && "w-32 h-24 bottom-36"
        )}
      ></div>
      
      {/* Additional smaller leaves for more developed trees */}
      {growthStage >= 2 && (
        <div className={cn(
          "absolute rounded-full bg-bonsai-sage/80 transition-all duration-1000 -right-4 animate-float",
          growthStage === 2 && "w-8 h-6 bottom-20",
          growthStage === 3 && "w-10 h-8 bottom-24",
          growthStage === 4 && "w-12 h-10 bottom-30"
        )}></div>
      )}
      
      {growthStage >= 3 && (
        <div className={cn(
          "absolute rounded-full bg-bonsai-sage/80 transition-all duration-1000 -left-6 animate-float animation-delay-1000",
          growthStage === 3 && "w-8 h-6 bottom-24",
          growthStage === 4 && "w-10 h-8 bottom-30"
        )}></div>
      )}
      
      {/* Only show these elements for a full grown bonsai */}
      {growthStage === 4 && (
        <>
          <div className="absolute rounded-full bg-bonsai-sage/70 w-10 h-8 bottom-36 -left-10 animate-float"></div>
          <div className="absolute rounded-full bg-bonsai-sage/70 w-8 h-6 bottom-40 left-2 animate-float"></div>
          <div className="absolute rounded-full bg-bonsai-sage/70 w-9 h-7 bottom-40 right-0 animate-float"></div>
        </>
      )}
    </div>
  );
};

export default BonsaiTree;
