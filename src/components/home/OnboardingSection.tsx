
import React from 'react';
import { motion } from 'framer-motion';

const OnboardingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Onboarding Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get started with PREPZR through our intuitive, chat-based onboarding process that personalizes your experience from day one.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              description: "Tell us about your learning goals, preferences and exam targets.",
              color: "from-blue-500 to-blue-600"
            },
            {
              step: "2",
              title: "Personal Assessment",
              description: "Complete a quick assessment to help us understand your current knowledge level.",
              color: "from-purple-500 to-purple-600"
            },
            {
              step: "3",
              title: "Get Your Custom Plan",
              description: "Receive your AI-personalized study plan tailored to your specific needs.",
              color: "from-green-500 to-green-600"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-xl`}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
