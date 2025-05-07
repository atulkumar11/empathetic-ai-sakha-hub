
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DemographicsStepProps {
  onSubmit: (data: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    age: "",
    educationLevel: "",
    city: "",
    examDate: "",
  });
  
  const [errors, setErrors] = useState({
    age: "",
    educationLevel: "",
    examDate: "",
  });

  const calculateMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Validate age
    if (name === "age") {
      const ageNum = parseInt(value);
      if (isNaN(ageNum) || ageNum < 12 || ageNum > 100) {
        setErrors({ ...errors, age: "Age must be between 12-100" });
      } else {
        setErrors({ ...errors, age: "" });
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "educationLevel" && value === "") {
      setErrors({ ...errors, educationLevel: "Education level is required" });
    } else {
      setErrors({ ...errors, educationLevel: "" });
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    if (name === "examDate") {
      if (!value) {
        setErrors({ ...errors, examDate: "Exam date is required" });
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        
        if (selectedDate < today) {
          setErrors({ ...errors, examDate: "Exam date must be in the future" });
        } else {
          setErrors({ ...errors, examDate: "" });
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      age: formValues.age ? (parseInt(formValues.age) < 12 || parseInt(formValues.age) > 100) ? "Age must be between 12-100" : "" : "Age is required",
      educationLevel: formValues.educationLevel ? "" : "Education level is required",
      examDate: formValues.examDate ? "" : "Exam date is required",
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).every(error => error === "")) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input 
          id="age" 
          name="age" 
          type="number" 
          placeholder="Enter your age" 
          min="12" 
          max="100"
          value={formValues.age} 
          onChange={handleInputChange}
        />
        {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="educationLevel">Education Level</Label>
        <Select 
          value={formValues.educationLevel} 
          onValueChange={(value) => handleSelectChange("educationLevel", value)}
        >
          <SelectTrigger id="educationLevel">
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highSchool">High School (9-10th)</SelectItem>
            <SelectItem value="higherSecondary">Higher Secondary (11-12th)</SelectItem>
            <SelectItem value="undergraduate">Undergraduate</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="postgraduate">Post Graduate</SelectItem>
          </SelectContent>
        </Select>
        {errors.educationLevel && <p className="text-sm text-red-500">{errors.educationLevel}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">City (Optional)</Label>
        <Input 
          id="city" 
          name="city" 
          type="text" 
          placeholder="Enter your city" 
          value={formValues.city} 
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="examDate">Exam Appearing Date</Label>
        <Input 
          id="examDate" 
          name="examDate" 
          type="date" 
          min={calculateMinDate()} 
          value={formValues.examDate} 
          onChange={handleDateChange}
        />
        {errors.examDate && <p className="text-sm text-red-500">{errors.examDate}</p>}
      </div>
      
      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
};

export default DemographicsStep;
