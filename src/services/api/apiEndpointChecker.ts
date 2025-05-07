
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';
import { generateDatabaseSchema } from '../../utils/schemaExport';

/**
 * Utility to check API endpoints availability and status
 */
export const apiEndpointChecker = {
  /**
   * Check a specific endpoint availability
   */
  async checkEndpoint(endpoint: string): Promise<{ exists: boolean; status?: number; message: string }> {
    try {
      const response = await axios.get(endpoint, {
        timeout: 5000,
        validateStatus: () => true // Accept any status code
      });
      
      if (response.status >= 200 && response.status < 300) {
        return {
          exists: true,
          status: response.status,
          message: `Endpoint available (${response.status})`
        };
      } else {
        return {
          exists: false,
          status: response.status,
          message: `Endpoint returned status code ${response.status}`
        };
      }
    } catch (error) {
      console.error("Error checking endpoint:", error);
      return {
        exists: false,
        message: "Failed to connect to endpoint"
      };
    }
  },
  
  /**
   * Check all API endpoints defined in the system
   */
  async checkAllEndpoints(): Promise<Record<string, { exists: boolean; status?: number; message: string }>> {
    const endpointsToCheck = [
      // Core API endpoints
      `${API_BASE_URL}/auth/login`,
      `${API_BASE_URL}/auth/register`,
      `${API_BASE_URL}/admin/dashboard`,
      `${API_BASE_URL}/admin/students`,
      `${API_BASE_URL}/admin/content`,
      `${API_BASE_URL}/admin/logs`,
      
      // Study habits endpoints
      `${API_BASE_URL}/admin/study-habits/settings`,
      `${API_BASE_URL}/admin/study-habits/analytics`,
      
      // Verification metrics endpoints
      `${API_BASE_URL}/admin/verified-metrics/mood-improvement`,
      `${API_BASE_URL}/admin/verified-metrics/time-saved`,
      `${API_BASE_URL}/admin/verified-metrics/consistent-habits`,
      `${API_BASE_URL}/admin/verified-metrics/exam-confidence`,
      `${API_BASE_URL}/admin/verified-metrics/retention-rate`,
      
      // Flask ML API endpoints
      `${API_BASE_URL}/ai/personalize`,
      `${API_BASE_URL}/ai/learning-style`,
      `${API_BASE_URL}/ai/generate-plan`,
      `${API_BASE_URL}/ai/doubt-response`,
      `${API_BASE_URL}/ai/tutor-chat`,
      `${API_BASE_URL}/ai/mood-suggestions`,
      `${API_BASE_URL}/ai/time-saved-analysis`,
      
      // Database management endpoints
      `${API_BASE_URL}/admin/database/schema`,
      `${API_BASE_URL}/admin/database/backup`,
      `${API_BASE_URL}/admin/database/restore`,
      `${API_BASE_URL}/admin/database/export`
    ];
    
    const results: Record<string, { exists: boolean; status?: number; message: string }> = {};
    
    // Check each endpoint in parallel
    await Promise.all(endpointsToCheck.map(async (endpoint) => {
      results[endpoint] = await this.checkEndpoint(endpoint);
    }));
    
    return results;
  }
};

/**
 * Get database schema information
 */
export const getDatabaseSchema = async () => {
  try {
    // In a real app, this would fetch from the backend
    // For now, generate mock schema data
    return generateDatabaseSchema();
  } catch (error) {
    console.error("Error fetching database schema:", error);
    throw new Error("Failed to fetch database schema");
  }
};

/**
 * Generate SQL schema for the database
 */
export const getDatabaseSchemaSql = () => {
  const schema = generateDatabaseSchema();
  let sqlContent = '';
  
  schema.forEach(table => {
    sqlContent += `CREATE TABLE ${table.tableName} (\n`;
    
    const columns = table.fields.map(field => {
      let columnDef = `  ${field.name} ${field.type}`;
      
      if (field.isPrimaryKey) {
        columnDef += ' PRIMARY KEY';
      }
      
      if (field.isRequired) {
        columnDef += ' NOT NULL';
      }
      
      if (field.references) {
        columnDef += ` REFERENCES ${field.references}`;
      }
      
      return columnDef;
    });
    
    sqlContent += columns.join(',\n');
    sqlContent += '\n);\n\n';
  });
  
  return sqlContent;
};

/**
 * Export database schema as JSON
 */
export const exportDatabaseSchemaAsJson = () => {
  const schema = generateDatabaseSchema();
  return JSON.stringify(schema, null, 2);
};

