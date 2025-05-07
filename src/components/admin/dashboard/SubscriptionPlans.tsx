
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";

const SubscriptionPlans = () => {
  // Mock subscription plans data
  const plans = [
    { 
      id: 1, 
      name: "Free", 
      price: 0, 
      billingCycle: "N/A", 
      users: 120, 
      features: ["Basic Content Access", "Limited Practice Tests", "Community Access"],
      isActive: true
    },
    { 
      id: 2, 
      name: "Basic", 
      price: 9.99, 
      billingCycle: "Monthly", 
      users: 78, 
      features: ["All Free Features", "Unlimited Practice Tests", "Personalized Study Plan", "Progress Tracking"],
      isActive: true
    },
    { 
      id: 3, 
      name: "Premium", 
      price: 19.99, 
      billingCycle: "Monthly", 
      users: 45, 
      features: ["All Basic Features", "1-on-1 Tutoring", "Advanced Analytics", "Exam Simulations"],
      isActive: true
    },
    { 
      id: 4, 
      name: "Ultimate", 
      price: 29.99, 
      billingCycle: "Monthly", 
      users: 23, 
      features: ["All Premium Features", "Priority Support", "Personalized AI Tutor", "Unlimited Resources"],
      isActive: true
    },
    { 
      id: 5, 
      name: "Enterprise", 
      price: "Custom", 
      billingCycle: "Annual", 
      users: 2, 
      features: ["All Ultimate Features", "Dedicated Support Manager", "Custom Content", "API Access"],
      isActive: false
    }
  ];
  
  // Calculate total subscribed users and revenue
  const totalUsers = plans.reduce((sum, plan) => sum + plan.users, 0);
  const monthlyRevenue = plans.reduce((sum, plan) => {
    if (typeof plan.price === 'number') {
      return sum + (plan.price * plan.users);
    }
    return sum;
  }, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Subscription Plans</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Subscribed Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${monthlyRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{plans.filter(p => p.isActive).length} / {plans.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</TableCell>
                  <TableCell>{plan.billingCycle}</TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>
                    {plan.isActive ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-1" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {plan.features.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
