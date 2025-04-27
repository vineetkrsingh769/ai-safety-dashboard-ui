import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Plus, Filter, AlertCircle, XCircle, AlertTriangle, CheckCircle, Calendar, Clock, User, Tag, FileText, ChevronDown, AlertOctagon, AlertTriangleIcon, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { IncidentList } from './IncidentList';
import { useIncidentStore } from '@/store/useIncidentStore';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IncidentForm from './IncidentForm';

export const IncidentDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { 
    incidents, 
    selectedSeverity, 
    sortOrder,
    theme, 
    addIncident, 
    setSeverityFilter, 
    setSortOrder 
  } = useIncidentStore();

  const handleAddIncident = (newIncident) => {
    addIncident(newIncident);
    toast({
      title: "Incident Reported",
      description: "New incident has been successfully added to the dashboard.",
    });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <div className="container mx-auto w-full  max-w-7xl px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className={`text-4xl font-bold mb-3 bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                AI Safety Incident Dashboard
              </h1>
              <p className={`flex items-center gap-2 text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Monitor and manage AI safety incidents
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }} 
              transition={{ duration: 0.2 }}
              className="transition-all duration-200"
            >
              <Card className={`p-6 backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-red-800/20 border-red-800/30 shadow-lg shadow-red-900/10 hover:shadow-red-900/20'
                  : 'bg-gradient-to-br from-red-50 to-white border-red-200 shadow-lg shadow-red-100/30 hover:shadow-red-100/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                  <XCircle className="h-5 w-5" />
                  High Severity
                </h3>
                  <div className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-red-500' : 'bg-red-400'
                  }`} />
                </div>
                <p className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {incidents.filter(i => i.severity === "High").length}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Critical incidents requiring immediate attention
                </p>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }} 
              transition={{ duration: 0.2 }}
              className="transition-all duration-200"
            >
              <Card className={`p-6 backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-amber-800/20 border-amber-800/30 shadow-lg shadow-amber-900/10 hover:shadow-amber-900/20'
                  : 'bg-gradient-to-br from-amber-50 to-white border-amber-200 shadow-lg shadow-amber-100/30 hover:shadow-amber-100/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                  <AlertTriangle className="h-5 w-5" />
                  Medium Severity
                </h3>
                  <div className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-amber-500' : 'bg-amber-400'
                  }`} />
                </div>
                <p className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {incidents.filter(i => i.severity === "Medium").length}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Issues that need monitoring and regular updates
                </p>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }} 
              transition={{ duration: 0.2 }}
              className="transition-all duration-200"
            >
              <Card className={`p-6 backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-green-900/20 border-green-800/30 shadow-lg shadow-green-900/10 hover:shadow-green-900/20'
                  : 'bg-gradient-to-br from-green-50 to-white border-green-200 shadow-lg shadow-green-100/30 hover:shadow-green-100/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                  <CheckCircle className="h-5 w-5" />
                  Low Severity
                </h3>
                  <div className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-green-500' : 'bg-green-400'
                  }`} />
                </div>
                <p className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {incidents.filter(i => i.severity === "Low").length}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Minor issues that can be addressed in regular updates
                </p>
              </Card>
            </motion.div>
          </div>

          <div className={`flex flex-wrap gap-6 items-center justify-between p-6 rounded-lg backdrop-blur-md border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-900/40 border-gray-700/50 shadow-lg shadow-gray-900/20' 
              : 'bg-white/60 border-gray-200/50 shadow-lg shadow-gray-200/20'
          }`}>
            <div className="flex gap-4 items-center">
              <Filter className="text-blue-500" size={20} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 shadow-sm transition-all duration-200 backdrop-blur-sm ${
                      theme === 'dark'
                          ? 'hover:border-blue-400/30 bg-gray-900/30'
                          : 'hover:border-blue-200 bg-white/30'
                    }`}
                  >
                    <span className={`${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {selectedSeverity === "All" ? "Select Priority" : selectedSeverity}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className={`w-56 ${
                    theme === 'dark' 
                      ? 'bg-gray-900 border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                  align="start"
                >
                  <DropdownMenuItem
                    onClick={() => setSeverityFilter("All")}
                    className={`${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSeverityFilter("High")}
                    className={`${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSeverityFilter("Medium")}
                    className={`${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSeverityFilter("Low")}
                    className={`${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className={`shadow-sm backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'hover:border-blue-400/30 bg-gray-900/30'
                    : 'hover:border-blue-200 bg-white/30'
                }`}
              >
                {sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {" Date"}
              </Button>
              <Button
                onClick={() => setShowForm(true)}
                className={`shadow-md backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-blue-600/80 hover:bg-blue-700/80'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Plus className="mr-2" size={16} />
                Report Incident
              </Button>
            </div>
          </div>

          <IncidentList
            incidents={incidents}
            selectedSeverity={selectedSeverity}
            sortOrder={sortOrder}
            theme={theme}
          />

          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg"
              >
                <Card className={`shadow-xl ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Report New Incident
                      </h2>
                      <button
                        onClick={() => setShowForm(false)}
                        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                    <div className={`space-y-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                  <IncidentForm onSubmit={handleAddIncident} onCancel={() => setShowForm(false)} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Skeleton Loading State */}
          {!incidents.length && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className={`p-6 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className={`h-6 w-32 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`} />
                      <Skeleton className={`h-4 w-4 rounded-full ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`} />
                    </div>
                    <Skeleton className={`h-8 w-16 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`} />
                    <Skeleton className={`h-4 w-48 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
