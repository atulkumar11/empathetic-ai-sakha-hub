
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter 
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { StudentData } from "@/types/admin";

const StudentsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, filter]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await adminService.getStudents(currentPage, studentsPerPage);
      setStudents(response.data);
      setTotalStudents(response.total);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast({
        title: "Error",
        description: "Failed to load students data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Exporting students data to CSV...",
    });
    // In a real implementation, this would trigger an API call to export data
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Students data has been exported successfully.",
      });
    }, 1500);
  };

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-gray-500">View and manage all student accounts</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Students Directory</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </form>
            
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Filter by:</span>
              <div className="flex items-center">
                <Button
                  variant={filter === 'all' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'active' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filter === 'new' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('new')}
                >
                  New
                </Button>
                <Button
                  variant={filter === 'inactive' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('inactive')}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading students data...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Phone</th>
                      <th className="text-left p-4 font-medium">Registration Date</th>
                      <th className="text-left p-4 font-medium">Exam Type</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">{student.email}</td>
                        <td className="p-4">{student.phoneNumber}</td>
                        <td className="p-4">{formatDate(student.registrationDate)}</td>
                        <td className="p-4">{student.examType}</td>
                        <td className="p-4">
                          {student.completedOnboarding ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                              Onboarding
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * studentsPerPage + 1} to {Math.min(currentPage * studentsPerPage, totalStudents)} of {totalStudents} students
                </p>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <Button
                        key={i}
                        variant={pageNumber === currentPage ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default StudentsPage;
