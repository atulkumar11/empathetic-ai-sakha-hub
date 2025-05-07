
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Timer, Calendar, BookOpen, Target, BarChart2, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const stats = [
  {
    percentage: "56%",
    text: "of students said PREPZR helped reduce exam stress",
    icon: <Target className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  },
  {
    percentage: "5+ hours",
    text: "saved weekly through personalized study plans",
    icon: <Timer className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  },
  {
    percentage: "70%",
    text: "of students built a consistent study habit in 2 weeks",
    icon: <Calendar className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  },
  {
    percentage: "4 out of 5",
    text: "students felt more confident before their exam",
    icon: <BookOpen className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  },
  {
    percentage: "70%+",
    text: "of PREPZR users continued after their 1st month",
    icon: <BarChart2 className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  },
  {
    percentage: "63%",
    text: "use mood-based learning themes daily",
    icon: <CheckCircle2 className="h-10 w-10 text-primary/70" />,
    animation: "fade-up"
  }
];

const StudentBenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Students Benefit with PREPZR</h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform delivers measurable results for students preparing for competitive exams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.percentage}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700">
            <Link to="/signup">
              Start Your Journey Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentBenefitsSection;
