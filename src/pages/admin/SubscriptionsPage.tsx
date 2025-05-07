
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, TrendingUp, Users, DollarSign, Edit, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const SubscriptionsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const navigateToPlanManagement = () => {
    navigate("/admin/dashboard", { state: { activeTab: "subscriptions" } });
  };

  const handleEditPlan = (planName: string) => {
    toast({
      title: "Editing Plan",
      description: `Navigating to edit ${planName}...`,
    });
    navigateToPlanManagement();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor and manage subscription plans and payments
          </p>
        </div>
        <Button onClick={navigateToPlanManagement}>
          Manage Plans
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹4,62,450</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">1,013</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Users size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +42 from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">86</div>
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <CreditCard size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +12 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Subscription Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹1,280</div>
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +₹120 from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">Free Plan (7 Days)</div>
                      <div className="text-sm text-gray-500">Trial</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹0</td>
                    <td className="px-6 py-4 whitespace-nowrap">564</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹0</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("Free Plan")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium">Pro Plan (Monthly)</div>
                        <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-800 border-purple-200">
                          Popular
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">Monthly</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹999</td>
                    <td className="px-6 py-4 whitespace-nowrap">284</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹2,83,716</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("Pro Plan (Monthly)")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">Pro Plan (Annual)</div>
                      <div className="text-sm text-gray-500">Annual</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹9,999</td>
                    <td className="px-6 py-4 whitespace-nowrap">103</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹10,29,897</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("Pro Plan (Annual)")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium">Group Plan (5 Users)</div>
                        <Package className="h-4 w-4 ml-2 text-blue-600" />
                      </div>
                      <div className="text-sm text-gray-500">Monthly</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹3,999</td>
                    <td className="px-6 py-4 whitespace-nowrap">45</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹1,79,955</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("Group Plan (5 Users)")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium">Group Plan (Annual)</div>
                        <Package className="h-4 w-4 ml-2 text-blue-600" />
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-800 border-green-200">
                          Best Value
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">Annual</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹39,999</td>
                    <td className="px-6 py-4 whitespace-nowrap">17</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹6,79,983</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("Group Plan (Annual)")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Card Credit Packs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales (MTD)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">50 Credits</div>
                      <div className="text-sm text-gray-500">Standard Cards</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹99</td>
                    <td className="px-6 py-4 whitespace-nowrap">50</td>
                    <td className="px-6 py-4 whitespace-nowrap">142</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹14,058</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("50 Credits")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium">100 Credits</div>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-800 border-green-200">
                          Best Value
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">Standard Cards</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹179</td>
                    <td className="px-6 py-4 whitespace-nowrap">100</td>
                    <td className="px-6 py-4 whitespace-nowrap">237</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹42,423</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("100 Credits")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">250 Credits</div>
                      <div className="text-sm text-gray-500">Standard Cards</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹399</td>
                    <td className="px-6 py-4 whitespace-nowrap">250</td>
                    <td className="px-6 py-4 whitespace-nowrap">96</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹38,304</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("250 Credits")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">100 Exam Credits</div>
                      <div className="text-sm text-gray-500">Exam Cards</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₹499</td>
                    <td className="px-6 py-4 whitespace-nowrap">100</td>
                    <td className="px-6 py-4 whitespace-nowrap">83</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹41,417</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlan("100 Exam Credits")}
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </Button>
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

export default SubscriptionsPage;
