
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, BookOpen, Trophy } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">90%+</h3>
            <p>Students reported improved exam scores</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">40%</h3>
            <p>Less study time with better retention</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">10,000+</h3>
            <p>Students achieving their exam goals</p>
          </div>
        </div>
        
        <div className="text-center max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">
            Ready to transform your exam preparation journey?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of students who are experiencing personalized AI-powered 
            learning that adapts to their unique needs and goals.
          </p>
          
          <Button 
            className="bg-white hover:bg-gray-100 text-violet-700 text-lg group px-8 py-6"
            asChild
          >
            <Link to="/signup" className="flex items-center gap-2">
              <span>Start Your Free Study Plan</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
