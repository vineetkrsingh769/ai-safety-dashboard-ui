import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ChevronDown,
  Flag,
  AlertCircle,
  Type,
  TextCursorInput
} from "lucide-react";

const IncidentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      reported_at: new Date().toISOString(),
    });
    // Reset form
    setFormData({
      title: '',
      description: '',
      severity: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-6 w-6 text-blue-500" />
          <h2>Report New Incident</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Fill in the details of the AI safety incident
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
            <Type className="h-4 w-4" />
            Title
          </label>
          <div className="relative">
            <TextCursorInput className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Model Bias Detection"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
            <TextCursorInput className="h-4 w-4" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the incident..."
            rows={5}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 "
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="severity" className="flex items-center gap-2 text-sm font-medium ">
            <Flag className="h-4 w-4" />
            Severity Level
          </label>
          <div className="relative">
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full pl-9 pr-10 py-2 appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 "
            >
              <option value="">Select severity level</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {formData.severity === "High" && <XCircle className="h-4 w-4 text-red-500" />}
              {formData.severity === "Medium" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              {formData.severity === "Low" && <CheckCircle className="h-4 w-4 text-green-500" />}
              {!formData.severity && <AlertCircle className="h-4 w-4 text-gray-400" />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;