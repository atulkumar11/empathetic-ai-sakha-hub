
import React from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ExamDateStepProps {
  examDate: Date | undefined;
  setExamDate: (date: Date | undefined) => void;
}

export default function ExamDateStep({ examDate, setExamDate }: ExamDateStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CalendarIcon className="text-sky-500" size={20} />
            Target Exam Date
          </h3>
          <p className="text-muted-foreground mb-4">When are you planning to take the exam?</p>
          
          <div className="flex flex-col space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {examDate ? format(examDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={examDate}
                  onSelect={setExamDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="mt-4 bg-sky-50 p-4 rounded-md">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-sky-500" />
              <span>Common exam dates are typically in May-June and November-December.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
