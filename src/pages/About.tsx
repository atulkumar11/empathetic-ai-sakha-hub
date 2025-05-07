
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Heart, BookOpen, BrainCircuit, PencilRuler, PersonStanding, Globe, Shield, CheckCircle } from "lucide-react";

const About = () => {
  const capabilities = [
    {
      icon: <BrainCircuit size={32} className="text-sakha-blue" />,
      title: "Multi-Role Understanding",
      description: "Adapts to each user type – whether a student, professional, doctor, researcher, or founder – tailoring insights and suggestions accordingly."
    },
    {
      icon: <Heart size={32} className="text-sakha-blue" />,
      title: "Context-Based Emotional Intelligence",
      description: "Understands emotional tone, stress indicators, and mental well-being using empathetic questioning and natural language patterns."
    },
    {
      icon: <Brain size={32} className="text-sakha-blue" />,
      title: "Critical Thinking Development",
      description: "Guides users with reflection-based prompts and challenging, open-ended questions that enhance reasoning and depth of understanding."
    },
    {
      icon: <PersonStanding size={32} className="text-sakha-blue" />,
      title: "Integrated Well-being Companion",
      description: "Tracks mood, habits, motivation, and emotional trends to offer timely nudges, support, and care-based interactions."
    },
    {
      icon: <BookOpen size={32} className="text-sakha-blue" />,
      title: "AI-Powered Learning Mentor",
      description: "Enables real-time tutoring, concept explanations, skill development paths, and even academic project guidance."
    },
    {
      icon: <PencilRuler size={32} className="text-sakha-blue" />,
      title: "Life-Long Personalization Engine",
      description: "Learns and grows with the user over time through behavior, preferences, and engagement style – adjusting dashboards, tools, and responses accordingly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
                What is Sakha 1.0?
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Sakha 1.0 is an advanced Large Language Model (LLM) system designed as an intelligent, 
                emotionally-aware companion for individuals across learning, career and well-being journeys.
              </p>
              <p className="text-xl font-display text-sakha-blue italic mb-8">
                "The empathetic AI that listens, learns, and evolves with you."
              </p>
              <Button 
                className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                size="lg"
                asChild
              >
                <Link to="/signup">Experience Sakha AI</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Key Capabilities of Sakha 1.0
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-5 p-3 bg-sakha-lavender/10 inline-block rounded-lg">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How Sakha Works */}
        <section className="py-16 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                How Sakha AI Works
              </h2>
              <p className="text-lg text-gray-700">
                Sakha AI combines advanced machine learning with emotional intelligence to deliver a 
                truly personalized experience that evolves with you.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Globe size={40} className="text-sakha-blue mb-6" />
                  <h3 className="text-2xl font-display font-semibold mb-4">Advanced LLM Technology</h3>
                  <p className="text-gray-700">
                    Sakha is built on state-of-the-art large language model technology, trained on diverse 
                    datasets to understand context, nuance, and domain-specific knowledge across multiple fields.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Heart size={40} className="text-sakha-blue mb-6" />
                  <h3 className="text-2xl font-display font-semibold mb-4">Emotional Intelligence Layer</h3>
                  <p className="text-gray-700">
                    What sets Sakha apart is its emotional intelligence layer that detects sentiment, 
                    stress signals, and patterns in user behavior to provide empathetic, timely support.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <CheckCircle size={40} className="text-sakha-blue mb-6" />
                  <h3 className="text-2xl font-display font-semibold mb-4">Personalization Engine</h3>
                  <p className="text-gray-700">
                    Sakha continuously learns from your interactions, preferences, and feedback to 
                    create an increasingly personalized experience that evolves alongside you.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Shield size={40} className="text-sakha-blue mb-6" />
                  <h3 className="text-2xl font-display font-semibold mb-4">Privacy & Security</h3>
                  <p className="text-gray-700">
                    Your data is encrypted and protected. Sakha is designed with privacy at its core, 
                    ensuring your personal information remains secure and confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 bg-sakha-dark-blue text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-6">
                Ready to Experience the Future of AI Companionship?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of users who have transformed their learning, career, and well-being 
                journey with Sakha AI's empathetic guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-sakha-blue hover:bg-gray-100"
                  size="lg"
                  asChild
                >
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                  asChild
                >
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  );
};

export default About;
