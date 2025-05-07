
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, CreditCard, Timer, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,45,750",
    description: "Last month: ₹11,32,500",
    changeValue: "+10%",
    changeType: "positive",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Paid Subscribers",
    value: "449",
    description: "Last month: 425",
    changeValue: "+5.6%",
    changeType: "positive",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Average Subscription Value",
    value: "₹2,775",
    description: "Last month: ₹2,665",
    changeValue: "+4.1%",
    changeType: "positive", 
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Average Subscription Length",
    value: "4.2 months",
    description: "Last month: 3.9 months",
    changeValue: "+7.7%",
    changeType: "positive",
    icon: <Timer className="h-5 w-5" />,
  },
];

const SubscriptionStats = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Subscription Overview</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-1.5 ${
                  stat.changeType === "positive" 
                    ? "bg-green-100 text-green-600" 
                    : "bg-red-100 text-red-600"
                }`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-2">
                    {stat.changeType === "positive" ? (
                      <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4 text-red-600" />
                    )}
                    <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                      {stat.changeValue}
                    </span>
                  </div>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Revenue chart visualization will be available in the next update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats;
