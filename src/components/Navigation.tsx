
import { cn } from "@/lib/utils";
import { BookIcon, HomeIcon, LeafIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const isMobile = useIsMobile();

  return (
    <motion.nav 
      className="fixed bottom-4 sm:bottom-6 left-0 right-0 py-2 z-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex justify-center">
        <motion.div 
          className="flex gap-1 sm:gap-3 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-bonsai-sage/20 shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all dock-item relative",
                  isActive 
                    ? "text-foreground dock-item-active"
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              >
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 bg-bonsai-sage/20 rounded-full -z-10" 
                    layoutId="activeTabDock"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div 
                  animate={isActive ? { y: [-2, 0] } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, repeatType: "reverse", duration: 1.5 }}
                  className="relative"
                >
                  <tab.icon size={isMobile ? 18 : 20} className={cn("mb-0.5 sm:mb-1", isActive && "text-bonsai-sage")} />
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 rounded-full bg-bonsai-sage"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
                <span className="text-xs font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
