
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIncidentStore } from "@/store/useIncidentStore";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useIncidentStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full ${
        theme === 'dark' ? 'bg-slate-800 text-yellow-300' : 'bg-slate-200 text-slate-800'
      } hover:bg-slate-700 hover:text-yellow-200 transition-all duration-300`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </Button>
  );
};
