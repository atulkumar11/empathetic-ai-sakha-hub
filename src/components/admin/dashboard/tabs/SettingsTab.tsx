
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Settings,
  Key,
  Shield,
  Database,
  Brain,
  Save,
  Download,
  EyeOff,
  Eye,
  Clock,
  Server,
  CloudUpload
} from "lucide-react";

const SettingsTab = () => {
  const [showAPIKey, setShowAPIKey] = React.useState(false);
  const [showDBPass, setShowDBPass] = React.useState(false);
  const [showRedisPass, setShowRedisPass] = React.useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="general" className="text-sm">General</TabsTrigger>
          <TabsTrigger value="api" className="text-sm">API Keys</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
          <TabsTrigger value="database" className="text-sm">Database</TabsTrigger>
          <TabsTrigger value="ai" className="text-sm">AI Settings</TabsTrigger>
          <TabsTrigger value="backup" className="text-sm">Backup & Logs</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure basic application settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Application Name</label>
                  <Input defaultValue="Sakha AI Admin Dashboard" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Admin Email</label>
                  <Input defaultValue="admin@sakhaai.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Language</label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ml">Malayalam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Default Timezone</label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Maintenance Mode</label>
                    <p className="text-xs text-gray-500">Enable maintenance mode</p>
                    <p className="text-xs text-gray-500">When enabled, users will see a maintenance message.</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Analytics</label>
                    <p className="text-xs text-gray-500">Enable usage analytics</p>
                    <p className="text-xs text-gray-500">Collect anonymized usage data to improve the platform.</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">System Notifications</label>
                    <p className="text-xs text-gray-500">Enable admin notifications</p>
                    <p className="text-xs text-gray-500">Receive alerts for important system events.</p>
                  </div>
                  <Switch id="system-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Debug Mode</label>
                    <p className="text-xs text-gray-500">Enable debug mode</p>
                    <p className="text-xs text-gray-500">Show detailed error messages and logs.</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Configuration</CardTitle>
              <p className="text-sm text-gray-500">Manage API keys and third-party integrations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">OpenAI Integration</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Input 
                        type={showAPIKey ? "text" : "password"} 
                        defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                      />
                      <button 
                        className="absolute right-2 top-2 text-gray-500" 
                        onClick={() => setShowAPIKey(!showAPIKey)}
                      >
                        {showAPIKey ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Button className="ml-2">Show</Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Default GPT Model</label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Key size={16} />
                    <span>Test Connection</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">Hugging Face Integration</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Hugging Face API Key</label>
                  <div className="flex">
                    <Input type="password" defaultValue="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                    <Button className="ml-2">Show</Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Key size={16} />
                    <span>Test Connection</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">OAuth Providers</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-sm font-medium">Google Login</label>
                      <p className="text-xs text-gray-500">Allow users to sign in with Google</p>
                    </div>
                    <Switch id="google-login" defaultChecked />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Client ID</label>
                    <Input defaultValue="XXXXXXXXXXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Client Secret</label>
                    <Input type="password" defaultValue="GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save API Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure security and access controls</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Password Policy</label>
                <Select defaultValue="strong">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ with numbers and letters)</SelectItem>
                    <SelectItem value="strong">Strong (8+ with numbers, symbols, mixed case)</SelectItem>
                    <SelectItem value="verystrong">Very Strong (12+ with numbers, symbols, mixed case)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Session Timeout</label>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Login Attempts</label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
                    <p className="text-xs text-gray-500">All admin users will be required to set up 2FA.</p>
                  </div>
                  <Switch id="twofa" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">IP Restrictions</label>
                    <p className="text-xs text-gray-500">Enable IP restrictions</p>
                    <p className="text-xs text-gray-500">Limit admin access to specific IP addresses.</p>
                  </div>
                  <Switch id="ip-restrictions" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Allowed IP Addresses</label>
                  <p className="text-xs text-gray-500 mb-1">Leave empty to allow all IPs (if restrictions disabled).</p>
                  <Input placeholder="e.g. 192.168.1.1, 10.0.0.1/24" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Security Audit Log</h3>
                    <p className="text-sm text-gray-500">Security audit logging is enabled. All admin actions are being recorded.</p>
                  </div>
                  <Button variant="outline">View Security Logs</Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Shield size={16} />
                  <span>Save Security Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Database Tab */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Database Configuration</CardTitle>
              <p className="text-sm text-gray-500">Manage database settings and connections</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">Primary Database Connection</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Database Host</label>
                    <Input defaultValue="db.sakhaai.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Port</label>
                    <Input defaultValue="3306" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Database Name</label>
                  <Input defaultValue="sakha_production" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Database User</label>
                    <Input defaultValue="sakha_admin" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Database Password</label>
                    <div className="flex">
                      <div className="relative flex-grow">
                        <Input 
                          type={showDBPass ? "text" : "password"} 
                          defaultValue="xxxxxxxxxxxxxxxx" 
                        />
                        <button 
                          className="absolute right-2 top-2 text-gray-500" 
                          onClick={() => setShowDBPass(!showDBPass)}
                        >
                          {showDBPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <Button className="ml-2">Show</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Database size={16} />
                    <span>Test Connection</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">Redis Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Redis Host</label>
                    <Input defaultValue="redis.sakhaai.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Port</label>
                    <Input defaultValue="6379" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Redis Password</label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Input 
                        type={showRedisPass ? "text" : "password"} 
                        defaultValue="xxxxxxxxxxxxxxxx" 
                      />
                      <button 
                        className="absolute right-2 top-2 text-gray-500" 
                        onClick={() => setShowRedisPass(!showRedisPass)}
                      >
                        {showRedisPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Button className="ml-2">Show</Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Database size={16} />
                    <span>Test Connection</span>
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Database Status</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Primary Database: Connected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Redis Cache: Connected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Last Backup: 2024-01-15 04:00 AM UTC</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Database Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Settings Tab */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Model Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure AI models and parameters</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Default LLM Provider</label>
                <Select defaultValue="openai">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google AI</SelectItem>
                    <SelectItem value="huggingface">Hugging Face</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Max Tokens</label>
                  <p className="text-xs text-gray-500 mb-1">Maximum tokens for LLM responses</p>
                  <Input type="number" defaultValue="1024" min="128" max="32768" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Default Temperature</label>
                  <p className="text-xs text-gray-500 mb-1">Controls randomness in AI responses (0-1)</p>
                  <Input type="number" defaultValue="0.7" min="0" max="1" step="0.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Frequency Penalty</label>
                  <p className="text-xs text-gray-500 mb-1">Reduces repetition in AI responses</p>
                  <Input type="number" defaultValue="0.3" min="0" max="2" step="0.1" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Model Caching</label>
                    <p className="text-xs text-gray-500">Enable response caching</p>
                    <p className="text-xs text-gray-500">Cache identical queries for faster responses and reduced API costs</p>
                  </div>
                  <Switch id="model-caching" defaultChecked />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cache TTL (seconds)</label>
                  <p className="text-xs text-gray-500 mb-1">Time-to-live for cached responses (86400s = 24h)</p>
                  <Input type="number" defaultValue="86400" min="60" step="60" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Content Moderation</label>
                    <p className="text-xs text-gray-500">Enable content filtering</p>
                    <p className="text-xs text-gray-500">Filter inappropriate content from AI responses</p>
                  </div>
                  <Switch id="content-filtering" defaultChecked />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Moderation Level</label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium (Default)</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="strict">Strict</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">AI Usage Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Free Plan Daily Queries</label>
                    <Input type="number" defaultValue="20" min="0" step="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Basic Plan Daily Queries</label>
                    <Input type="number" defaultValue="100" min="0" step="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Premium Plan Daily Queries</label>
                    <Input type="number" defaultValue="500" min="0" step="1" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Brain size={16} />
                  <span>Save AI Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Backup & Logs Tab */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backup & Log Management</CardTitle>
              <p className="text-sm text-gray-500">Configure backups and system logs</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Automatic Backups</h3>
                  <Switch id="automatic-backups" defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Backup Frequency</label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Backup Time</label>
                    <Input type="time" defaultValue="04:00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Retention Period</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Backup Storage</label>
                  <Select defaultValue="s3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                      <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CloudUpload size={16} />
                    <span>View Backups</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Manual Backup</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">System Logs</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Log Level</label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info (Default)</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Log Rotation</label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Log Retention</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Available Log Files</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      <span>application-2024-01-15.log</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      <span>application-2024-01-14.log</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      <span>application-2024-01-13.log</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      <span>error-2024-01-15.log</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Download Logs</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Backup Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
