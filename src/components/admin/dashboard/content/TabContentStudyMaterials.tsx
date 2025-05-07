
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Tag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TabContentStudyMaterialsProps {
  handleUpload: () => void;
  handleContentAction: (action: string, title: string) => void;
}

const TabContentStudyMaterials = ({ 
  handleUpload,
  handleContentAction 
}: TabContentStudyMaterialsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="font-medium">Study Materials Repository</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleUpload}>
            <Upload size={16} />
            <span>Upload Materials</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 block">Filter by Subject</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="computer_science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block">Filter by Exam Goal</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select exam goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exam Goals</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="gate">GATE</SelectItem>
              <SelectItem value="cat">CAT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block">Material Type</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select material type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="study_material">Study Material</SelectItem>
              <SelectItem value="syllabus">Syllabus</SelectItem>
              <SelectItem value="exam_material">Exam Material</SelectItem>
              <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Exam Goal</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                title: "JEE Physics Formula Sheet",
                type: "study_material",
                subject: "Physics",
                examGoal: "JEE",
                tags: ["formulas", "quick-reference", "mechanics"]
              },
              {
                title: "NEET Biology Syllabus 2024",
                type: "syllabus",
                subject: "Biology",
                examGoal: "NEET",
                tags: ["syllabus", "official", "2024"]
              },
              {
                title: "CAT Quantitative Aptitude Notes",
                type: "study_material",
                subject: "Mathematics",
                examGoal: "CAT",
                tags: ["aptitude", "shortcuts", "practice"]
              },
              {
                title: "UPSC Previous Year Paper 2023",
                type: "previous_papers",
                subject: "General Studies",
                examGoal: "UPSC",
                tags: ["2023", "solved", "paper"]
              },
              {
                title: "GATE Computer Science MCQ Bank",
                type: "exam_material",
                subject: "Computer Science",
                examGoal: "GATE",
                tags: ["mcq", "practice", "database"]
              }
            ].map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {item.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.examGoal}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => handleContentAction("View", item.title)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleContentAction("Tag", item.title)}
                    >
                      <Tag size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TabContentStudyMaterials;
