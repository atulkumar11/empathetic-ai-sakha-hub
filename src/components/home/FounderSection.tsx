
import { Quote } from "lucide-react";

const FounderSection = () => {
  return (
    <section className="py-20 bg-white" id="founder-message">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png" 
                alt="Amit Singh - Founder of PREPZR" 
                className="relative z-10 rounded-2xl object-cover w-full max-w-md mx-auto"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <Quote size={48} className="text-blue-600 opacity-20" />
            </div>
            <blockquote className="text-xl md:text-2xl font-display text-gray-800 mb-8">
              We created PREPZR to transform how students prepare for competitive exams in India.
              At PREPZR, our mission is simple — to make learning truly personalized, engaging and result-driven.
              We're committed to empowering every student unbiasedly with the right tools, guidance and support
              to confidently reach their exam goals.
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold">Amit Singh</h3>
                <p className="text-gray-600">Founder & CEO, PREPZR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
