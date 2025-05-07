
import { cn } from "@/lib/utils";
import { BookIcon, HomeIcon, LeafIcon } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "journal", label: "Journal", icon: BookIcon },
    { id: "insights", label: "Insights", icon: LeafIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-bonsai-sage/20 py-2 px-4 md:relative md:border-none md:py-0 md:px-0 z-10">
      <div className="flex justify-around md:justify-center md:gap-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center px-4 py-2 rounded-full transition-all",
                isActive 
                  ? "text-foreground bg-bonsai-sage/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-bonsai-sage/10"
              )}
            >
              <tab.icon size={18} className={cn("mb-1", isActive && "text-bonsai-sage")} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
