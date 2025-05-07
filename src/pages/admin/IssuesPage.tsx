
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";

const IssuesPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Issue Management",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Issue Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track and resolve system issues and student reported problems
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +3 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">12</div>
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              2 updated today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">8</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +3 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">142</div>
              <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                <XCircle size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#1842</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Login authentication error</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Rahul Sharma</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Apr 11, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Open
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={showToast}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#1841</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Study planner not loading</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Priya Patel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Apr 11, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={showToast}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#1840</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Payment confirmation not received</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Arjun Singh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Apr 10, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={showToast}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default IssuesPage;
