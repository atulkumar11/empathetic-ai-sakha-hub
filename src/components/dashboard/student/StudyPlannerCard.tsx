
import { useState } from "react";
import { Calendar, Check, Circle, Clock, Plus, BookOpen, Brain } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  timeSlot: string;
  isComplete: boolean;
}

export default function StudyPlannerCard() {
  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "task-1",
      title: "Physics - Electromagnetism",
      description: "Chapter 7 - Complete practice problems and review key concepts",
      subject: "Physics",
      timeSlot: "9:00 AM - 10:30 AM",
      isComplete: true
    },
    {
      id: "task-2",
      title: "Mathematics - Integration",
      description: "Practice indefinite and definite integrals with substitution method",
      subject: "Mathematics",
      timeSlot: "11:00 AM - 12:30 PM",
      isComplete: true
    },
    {
      id: "task-3",
      title: "Chemistry - Organic Chemistry",
      description: "Study alkanes and alkynes reactions and nomenclature",
      subject: "Chemistry",
      timeSlot: "2:00 PM - 3:30 PM",
      isComplete: false
    },
    {
      id: "task-4",
      title: "Biology - Human Physiology",
      description: "Read about the nervous system structure and function",
      subject: "Biology",
      timeSlot: "4:00 PM - 5:30 PM",
      isComplete: false
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subject: "Physics",
    timeSlot: ""
  });

  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const task: StudyTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      subject: newTask.subject,
      timeSlot: newTask.timeSlot,
      isComplete: false
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      subject: "Physics",
      timeSlot: ""
    });

    setIsDialogOpen(false);

    toast({
      title: "Task Added",
      description: "Your study task has been added to today's plan."
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.isComplete ? "Task Reopened" : "Task Completed",
        description: task.isComplete 
          ? `"${task.title}" marked as incomplete` 
          : `Great job! You completed "${task.title}"`
      });
    }
  };

  // Calculate completion statistics
  const completedTasks = tasks.filter(task => task.isComplete).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="border-t-4 border-t-sky-500 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar size={20} className="text-sky-500" />
            <span>Today's Study Plan (May 12, 2025)</span>
          </span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-sky-500 to-violet-500">
                <Plus size={16} className="mr-1" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Study Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your study plan for today.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Physics - Wave Optics"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Select 
                    value={newTask.subject}
                    onValueChange={(value) => setNewTask({...newTask, subject: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="timeSlot" className="text-sm font-medium">
                    Time Slot
                  </label>
                  <Input
                    id="timeSlot"
                    placeholder="e.g., 3:00 PM - 4:30 PM"
                    value={newTask.timeSlot}
                    onChange={(e) => setNewTask({...newTask, timeSlot: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Add more details about the task"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask} className="bg-gradient-to-r from-sky-500 to-violet-500">
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
              <Brain className="text-sky-500" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Today's Progress</h3>
              <p className="text-sm text-muted-foreground">Keep going! You're doing great.</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{completionPercentage}%</span>
            <p className="text-xs text-muted-foreground">{completedTasks} of {totalTasks} tasks</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                task.isComplete
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  : "bg-white border-gray-200 dark:bg-gray-800/20 dark:border-gray-700"
              }`}
            >
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
                  task.isComplete
                    ? "bg-gradient-to-br from-green-400 to-emerald-500"
                    : "bg-gradient-to-br from-sky-400 to-violet-500 opacity-70"
                }`}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.isComplete ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${task.isComplete ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1 text-sky-500" />
                    <span>{task.timeSlot}</span>
                  </div>
                </div>
                <p className={`text-sm ${task.isComplete ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
                <div className="mt-2 flex items-center">
                  <BookOpen size={14} className="mr-1 text-sky-500" />
                  <span className="text-xs text-sky-500 font-medium">{task.subject}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="text-sm">
          View Weekly Plan
        </Button>
        <Button size="sm" className="text-sm bg-gradient-to-r from-sky-500 to-violet-500">
          Generate Tomorrow's Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
