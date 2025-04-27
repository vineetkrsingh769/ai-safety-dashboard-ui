
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const severityColors = {
  High: {
    dark: "bg-red-950/50 text-red-400 border-red-800",
    light: "bg-red-50 text-red-600 border-red-200"
  },
  Medium: {
    dark: "bg-amber-950/50 text-amber-400 border-amber-800",
    light: "bg-amber-50 text-amber-600 border-amber-200"
  },
  Low: {
    dark: "bg-green-950/50 text-green-400 border-green-800",
    light: "bg-green-50 text-green-600 border-green-200"
  }
};

export const IncidentList = ({ incidents, selectedSeverity, sortOrder, theme }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredIncidents = incidents
    .filter(incident => selectedSeverity === "All" || incident.severity === selectedSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <AnimatePresence>
      <div className="grid gap-4">
        {filteredIncidents.map((incident) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`p-6 transition-all duration-300 backdrop-blur-md border ${
              theme === 'dark'
                ? 'bg-gray-900/40 border-gray-700/50 hover:bg-gray-800/50 shadow-lg shadow-gray-900/20'
                : 'bg-white/60 border-gray-200/50 hover:bg-white/80 shadow-lg shadow-gray-200/20'
            }`}>
              <div className="flex flex-wrap gap-4 items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {incident.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                      severityColors[incident.severity][theme]
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Reported: {format(new Date(incident.reported_at), "PPp")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === incident.id ? null : incident.id)}
                  className={`backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50/50'
                  }`}
                >
                  {expandedId === incident.id ? (
                    <ChevronUp size={16} className="mr-1" />
                  ) : (
                    <ChevronDown size={16} className="mr-1" />
                  )}
                  {expandedId === incident.id ? "Hide" : "View"} Details
                </Button>
              </div>
              <AnimatePresence>
                {expandedId === incident.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`mt-4 p-4 rounded-lg backdrop-blur-sm ${
                      theme === 'dark'
                        ? 'bg-gray-950/50 text-gray-300 border border-gray-800/50'
                        : 'bg-gray-50/50 text-gray-700 border border-gray-200/50'
                    }`}>
                      {incident.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
        {filteredIncidents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 rounded-lg backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-gray-900/40 text-gray-400 border border-gray-700/50'
                : 'bg-white/60 text-gray-500 border border-gray-200/50'
            }`}
          >
            No incidents found matching the current filters.
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
