
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

const ContentManagement = () => {
  // Mock content data
  const conceptCards = [
    { id: 1, title: "Newton's Laws of Motion", subject: "Physics", topic: "Mechanics", author: "Admin", status: "Published", createdAt: "2023-05-10" },
    { id: 2, title: "Periodic Table", subject: "Chemistry", topic: "General Chemistry", author: "Admin", status: "Published", createdAt: "2023-05-12" },
    { id: 3, title: "Cell Structure", subject: "Biology", topic: "Cell Biology", author: "Admin", status: "Draft", createdAt: "2023-05-15" },
  ];
  
  const flashcards = [
    { id: 1, question: "What is Newton's First Law?", subject: "Physics", topic: "Mechanics", author: "Admin", status: "Published", createdAt: "2023-05-20" },
    { id: 2, title: "Periodic Table Elements", subject: "Chemistry", topic: "General Chemistry", author: "Admin", status: "Published", createdAt: "2023-05-22" },
    { id: 3, title: "Cell Organelles", subject: "Biology", topic: "Cell Biology", author: "Admin", status: "Draft", createdAt: "2023-05-25" },
  ];
  
  const practiceExams = [
    { id: 1, title: "Physics Mid-Term", subject: "Physics", questions: 30, author: "Admin", status: "Published", createdAt: "2023-06-10" },
    { id: 2, title: "Chemistry Quiz", subject: "Chemistry", questions: 20, author: "Admin", status: "Published", createdAt: "2023-06-12" },
    { id: 3, title: "Biology Final", subject: "Biology", questions: 50, author: "Admin", status: "Draft", createdAt: "2023-06-15" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
      </div>
      
      <Tabs defaultValue="concepts">
        <TabsList>
          <TabsTrigger value="concepts">Concept Cards</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="exams">Practice Exams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="concepts" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Concept Cards</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Card
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conceptCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.title}</TableCell>
                      <TableCell>{card.subject}</TableCell>
                      <TableCell>{card.topic}</TableCell>
                      <TableCell>{card.author}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          card.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {card.status}
                        </span>
                      </TableCell>
                      <TableCell>{card.createdAt}</TableCell>
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
        </TabsContent>
        
        <TabsContent value="flashcards" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Flashcards</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Flashcard
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flashcards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.question || card.title}</TableCell>
                      <TableCell>{card.subject}</TableCell>
                      <TableCell>{card.topic}</TableCell>
                      <TableCell>{card.author}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          card.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {card.status}
                        </span>
                      </TableCell>
                      <TableCell>{card.createdAt}</TableCell>
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
        </TabsContent>
        
        <TabsContent value="exams" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Practice Exams</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Exam
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {practiceExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.title}</TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>{exam.questions}</TableCell>
                      <TableCell>{exam.author}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          exam.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {exam.status}
                        </span>
                      </TableCell>
                      <TableCell>{exam.createdAt}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
