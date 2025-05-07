
/**
 * Utility functions for downloading data from admin dashboard
 */

/**
 * Convert JSON data to CSV format
 * @param data Array of objects to convert
 * @returns CSV string
 */
export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return '';
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create CSV data rows
  const rows = data.map(item => {
    return headers.map(header => {
      const value = item[header];
      
      // Handle different data types
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'object') {
        // For objects and arrays, convert to JSON string and escape quotes
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      } else if (typeof value === 'string') {
        // Escape quotes in strings and wrap with quotes
        return `"${value.replace(/"/g, '""')}"`;
      } else {
        // For numbers, booleans, etc.
        return String(value);
      }
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Download data as a CSV file
 * @param data Data to download
 * @param filename Name of the file
 */
export const downloadCSV = (data: any[], filename: string): void => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Format current date for filename
 * @returns Formatted date string (YYYY-MM-DD)
 */
export const getFormattedDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Download student data as CSV
 * @param students Array of student data
 */
export const downloadStudentData = (students: any[]): void => {
  const filename = `sakha-students-${getFormattedDate()}.csv`;
  downloadCSV(students, filename);
};

/**
 * Download system logs as CSV
 * @param logs Array of system logs
 */
export const downloadSystemLogs = (logs: any[]): void => {
  const filename = `sakha-system-logs-${getFormattedDate()}.csv`;
  downloadCSV(logs, filename);
};

/**
 * Download dashboard statistics as CSV
 * @param stats Dashboard statistics object
 */
export const downloadDashboardStats = (stats: any): void => {
  // Convert stats object to array for CSV conversion
  const statsArray = [stats];
  const filename = `sakha-dashboard-stats-${getFormattedDate()}.csv`;
  downloadCSV(statsArray, filename);
};

/**
 * Download exam results as CSV
 * @param examResults Array of exam results
 */
export const downloadExamResults = (examResults: any[]): void => {
  const filename = `sakha-exam-results-${getFormattedDate()}.csv`;
  downloadCSV(examResults, filename);
};
