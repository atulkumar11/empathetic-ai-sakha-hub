
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Users, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const plans = [
  { 
    id: "free", 
    name: "Free Plan (7 Days)", 
    price: 0, 
    billingCycle: "N/A", 
    users: 564, 
    features: [
      "5 Concept Cards",
      "5 Flashcards",
      "5 Practice Exams",
      "1 Academic Advisor plan",
      "Basic Smart Study Plan",
      "10 AI Tutor requests",
      "Feel Good Corner"
    ],
    isActive: true,
    maxUsers: 1
  },
  { 
    id: "pro_monthly", 
    name: "Pro Plan (Monthly)", 
    price: 999, 
    billingCycle: "Monthly", 
    users: 284, 
    features: [
      "Unlimited Concept Cards",
      "Unlimited Flashcards",
      "Unlimited Practice Exams",
      "Custom Cards (via credits)",
      "2 Academic Advisor plans/month",
      "Full + Mood-Based Study Plan",
      "Unlimited AI Tutor",
      "Surrounding Influence",
      "Feel Good Corner"
    ],
    isActive: true,
    maxUsers: 1
  },
  { 
    id: "pro_annual", 
    name: "Pro Plan (Annual)", 
    price: 9999, 
    billingCycle: "Annual", 
    users: 103, 
    features: [
      "All Monthly Pro Plan features",
      "₹2,000 savings compared to monthly",
      "Priority support",
      "Early access to new features"
    ],
    isActive: true,
    maxUsers: 1
  },
  { 
    id: "group_small", 
    name: "Group Plan (5 Users)", 
    price: 3999, 
    billingCycle: "Monthly", 
    users: 45, 
    features: [
      "5 Users included",
      "Unlimited Concept Cards",
      "Unlimited Flashcards",
      "Unlimited Practice Exams",
      "Shared credit pool",
      "4 Academic Advisor plans/month",
      "Study Groups",
      "Admin Dashboard",
      "Batch Manager"
    ],
    isActive: true,
    maxUsers: 5
  },
  { 
    id: "group_annual", 
    name: "Group Plan (Annual)", 
    price: 39999, 
    billingCycle: "Annual", 
    users: 17, 
    features: [
      "All Monthly Group Plan features",
      "₹8,000 savings compared to monthly",
      "Priority group support",
      "Enhanced analytics",
      "Customized onboarding session"
    ],
    isActive: true,
    maxUsers: 5
  },
];

const PlansManagement = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  
  const handlePlanAction = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Plan management functionality will be available in the next update.",
    });
  };
  
  const formatPrice = (price: number, cycle?: string) => {
    if (price === 0) return "Free";
    const formattedPrice = `₹${price.toLocaleString()}`;
    if (cycle === "Monthly") return `${formattedPrice}/month`;
    if (cycle === "Annual") return `${formattedPrice}/year`;
    return formattedPrice;
  };
  
  // Calculate total revenue
  const calculateMonthlyRevenue = () => {
    return plans.reduce((sum, plan) => {
      if (plan.billingCycle === "Monthly") {
        return sum + (plan.price * plan.users);
      } else if (plan.billingCycle === "Annual") {
        return sum + ((plan.price / 12) * plan.users);
      }
      return sum;
    }, 0);
  };
  
  const monthlyRevenue = calculateMonthlyRevenue();
  const totalUsers = plans.reduce((sum, plan) => sum + plan.users, 0);
  const groupUsers = plans
    .filter(p => p.id.startsWith('group'))
    .reduce((sum, plan) => sum + plan.users, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold">Plan Management</h3>
        <Button className="flex items-center gap-2" onClick={handlePlanAction}>
          <Plus size={16} />
          <span>Create New Plan</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalUsers - plans[0].users).toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Group Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Max Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {plan.name}
                    {plan.id.startsWith('group') && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        <Users size={12} className="mr-1" /> Group
                      </Badge>
                    )}
                    {plan.id === 'pro_monthly' && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                        Popular
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatPrice(plan.price, plan.billingCycle)}</TableCell>
                <TableCell>{plan.billingCycle}</TableCell>
                <TableCell>{plan.users.toLocaleString()}</TableCell>
                <TableCell>{plan.maxUsers === 1 ? "1" : `${plan.maxUsers} ${plan.id.startsWith('group') ? "(₹799/user extra)" : ""}`}</TableCell>
                <TableCell>
                  {plan.isActive ? (
                    <div className="flex items-center text-green-600">
                      <Check size={16} className="mr-1" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <X size={16} className="mr-1" />
                      <span>Inactive</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPlan(plan)}>
                          <Edit size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Plan: {plan.name}</DialogTitle>
                          <DialogDescription>
                            This feature is coming soon. You'll be able to edit plan details here.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <h4 className="font-medium mb-2">Features:</h4>
                          <ul className="space-y-1">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setSelectedPlan(null)}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={handlePlanAction}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={handlePlanAction}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card Credit Packs section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Card Credit Packs</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">50 Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">₹99</div>
              <p className="text-sm text-muted-foreground mt-2">For creating 50 Concept or Flashcards</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">100 Credits</CardTitle>
              <Badge className="bg-green-100 text-green-800">Best Value</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">₹179</div>
              <p className="text-sm text-muted-foreground mt-2">For creating 100 Concept or Flashcards</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">250 Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">₹399</div>
              <p className="text-sm text-muted-foreground mt-2">For creating 250 Concept or Flashcards</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">100 Exam Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">₹499</div>
              <p className="text-sm text-muted-foreground mt-2">For creating 100 exam cards</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlansManagement;
