
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhatIsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-purple-600" />,
      title: "Emotionally Intelligent",
      description: "First-of-its-kind study partner that understands your emotional state and adapts to your learning needs"
    },
    {
      icon: <Heart className="h-10 w-10 text-blue-600" />,
      title: "Personalized Support",
      description: "Tuned to your mood, study habits, and learning style for a truly supportive learning experience"
    },
    {
      icon: <Star className="h-10 w-10 text-amber-600" />,
      title: "Exam Excellence",
      description: "Adaptive techniques that respond to your emotional state for optimal study efficiency and exam success"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            variants={fadeIn}
          >
            What is PREPZR?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={fadeIn}
          >
            PREPZR is India's first emotionally intelligent study companion that understands not just what you need to learn, but how you feel while learning. Our AI adapts to your mood, motivation levels, and learning patterns to create a supportive study experience tailored just for you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-6 mb-6 transform transition-all hover:shadow-2xl"
              variants={fadeIn}
            >
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  {features[0].icon}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-xl mb-2">{features[0].title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{features[0].description}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-6 mb-6 transform transition-all hover:shadow-2xl"
              variants={fadeIn}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  {features[1].icon}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-xl mb-2">{features[1].title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{features[1].description}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-6 transform transition-all hover:shadow-2xl"
              variants={fadeIn}
            >
              <div className="flex items-start">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
                  {features[2].icon}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-xl mb-2">{features[2].title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{features[2].description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full filter blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-60 animate-pulse"></div>
              
              <img 
                src="/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png" 
                alt="PREPZR Platform Demo" 
                className="rounded-xl shadow-2xl border-4 border-white dark:border-gray-700 relative z-10"
              />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl z-20 animate-bounce">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-2">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 text-lg hover:shadow-lg transition-all" 
            size="lg"
            asChild
          >
            <Link to="/signup">
              Meet Your Emotional Study Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsSection;
