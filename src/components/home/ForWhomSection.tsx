
import { Book, Briefcase, Stethoscope, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForWhomSection = () => {
  const userTypes = [
    {
      icon: <Book size={36} className="text-sakha-blue" />,
      title: "Students",
      description: "From classroom learning to competitive exams, Sakha helps students build deeper understanding, stay motivated, and develop critical thinking.",
      benefits: [
        "24/7 personalized tutoring",
        "Exam preparation strategies",
        "Memory skills & flashcards",
        "Project development support"
      ]
    },
    {
      icon: <Briefcase size={36} className="text-sakha-blue" />,
      title: "Employees",
      description: "Navigate workplace challenges, develop new skills, and maintain work-life balance with Sakha's career-focused guidance.",
      benefits: [
        "Productivity enhancement",
        "Skill development paths",
        "Burnout prevention",
        "Career growth strategies"
      ]
    },
    {
      icon: <Stethoscope size={36} className="text-sakha-blue" />,
      title: "Doctors & Researchers",
      description: "From thesis planning to research organization, Sakha helps medical professionals and researchers stay focused and productive.",
      benefits: [
        "Research planning tools",
        "Literature review assistance",
        "Publication strategy guidance",
        "Work-life balance support"
      ]
    },
    {
      icon: <Rocket size={36} className="text-sakha-blue" />,
      title: "Founders",
      description: "Build your vision with Sakha's startup-focused support, from idea validation to team growth and investor pitches.",
      benefits: [
        "MVP development guidance",
        "Pitch deck assistance",
        "Team building strategies",
        "Founder wellness support"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10" id="for-whom">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Who Benefits from Sakha AI?</h2>
          <p className="text-lg text-gray-700">
            Sakha AI adapts to your unique needs, providing personalized support across different roles and life stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {userTypes.map((type, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6 p-4 bg-sakha-lavender/10 inline-block rounded-lg">
                {type.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3">{type.title}</h3>
              <p className="text-gray-700 mb-6">{type.description}</p>
              
              <h4 className="text-lg font-medium mb-3">Key Benefits:</h4>
              <ul className="space-y-2">
                {type.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center gap-2">
                    <span className="text-sakha-blue">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white text-lg py-6 px-8"
            asChild
          >
            <Link to="/signup">Start Your Journey with Sakha</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
