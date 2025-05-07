
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Search } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  description: string;
  paymentMethod: string;
  invoiceUrl?: string;
}

const BillingHistoryPanel: React.FC = () => {
  // Mock transaction data - in a real app, this would come from an API
  const transactions: Transaction[] = [
    {
      id: "INV-001",
      date: "2023-10-01",
      amount: 499,
      status: "completed",
      description: "Premium Subscription - Monthly",
      paymentMethod: "HDFC Bank •••• 4242",
      invoiceUrl: "#"
    },
    {
      id: "INV-002",
      date: "2023-09-01",
      amount: 499,
      status: "completed",
      description: "Premium Subscription - Monthly",
      paymentMethod: "HDFC Bank •••• 4242",
      invoiceUrl: "#"
    },
    {
      id: "INV-003",
      date: "2023-08-01",
      amount: 499,
      status: "completed",
      description: "Premium Subscription - Monthly",
      paymentMethod: "HDFC Bank •••• 4242",
      invoiceUrl: "#"
    }
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Billing History</h2>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-1" />
          Search Transactions
        </Button>
      </div>
      
      {transactions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <h3 className="text-lg font-medium mb-2">No billing history</h3>
            <p className="text-muted-foreground text-center">
              You don't have any billing history yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-muted/50">
                      <td className="p-4">{transaction.id}</td>
                      <td className="p-4">{formatDate(transaction.date)}</td>
                      <td className="p-4">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          Paid with {transaction.paymentMethod}
                        </div>
                      </td>
                      <td className="p-4 font-medium">{formatAmount(transaction.amount)}</td>
                      <td className="p-4">{getStatusBadge(transaction.status)}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download Invoice</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillingHistoryPanel;
