
import { cn } from "@/lib/utils";
import { BookIcon, HomeIcon, LeafIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-bonsai-sage/20 py-2 px-4 md:relative md:border-none md:py-0 md:px-0 z-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex justify-around md:justify-center md:gap-4 max-w-md mx-auto">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center px-4 py-2 rounded-full transition-all relative",
                isActive 
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-bonsai-sage/10"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            >
              {isActive && (
                <motion.div 
                  className="absolute inset-0 bg-bonsai-sage/20 rounded-full -z-10" 
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <tab.icon size={18} className={cn("mb-1", isActive && "text-bonsai-sage")} />
              <span className="text-xs">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
