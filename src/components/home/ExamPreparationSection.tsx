import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Brain, FileText } from "lucide-react";

const ExamPreparationSection = () => {
  // Only keep UPSC, NEET, IIT-JEE exams
  const exams = [
    {
      name: "IIT-JEE",
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      description: "Master Physics, Chemistry & Mathematics with our specialized JEE preparation program.",
      features: ["Concept-based learning modules", "Previous year paper analysis", "Expert-designed JEE practice tests"]
    },
    {
      name: "NEET",
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      description: "Comprehensive preparation for Biology, Physics & Chemistry to excel in medical entrance exams.",
      features: ["Visual-based learning for Biology", "Chapter-wise practice questions", "Subject-wise performance tracking"]
    },
    {
      name: "UPSC",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      description: "Strategic preparation for all stages of the Civil Services Examination.",
      features: ["Current affairs daily digest", "Answer writing practice", "NCERT foundation revision"]
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950" id="exam-prep">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exam Preparation Tailored to Your Goals</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            PREPZR adapts to the specific requirements of your exam, providing personalized learning paths 
            that focus on your strengths and improve your weaknesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam, index) => (
            <motion.div 
              key={exam.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full mr-3">
                      {exam.icon}
                    </div>
                    <h3 className="text-xl font-bold">{exam.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exam.description}</p>
                  <ul className="space-y-2">
                    {exam.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <span className="mr-2 text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamPreparationSection;
