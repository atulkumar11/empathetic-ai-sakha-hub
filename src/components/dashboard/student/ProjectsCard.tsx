
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
  dueDate: string;
}

export default function ProjectsCard() {
  const projects: Project[] = [
    {
      title: "Science Fair: Renewable Energy",
      description: "Exploring solar and wind energy applications",
      status: "In Progress",
      dueDate: "May 30, 2025"
    },
    {
      title: "Math Visualization Tool",
      description: "Interactive graphing calculator for complex functions",
      status: "Planning",
      dueDate: "June 15, 2025"
    }
  ];

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Projects</span>
          <Button size="sm">+ New Project</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {project.description}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">Due: {project.dueDate}</div>
              <Button variant="outline" size="sm">Continue</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
