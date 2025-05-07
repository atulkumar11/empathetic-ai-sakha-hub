
import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  location: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, bio, imageSrc, location }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-6">
      <img
        src={imageSrc}
        alt={name}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-purple-100 dark:border-purple-900"
      />
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-1">{name}</h3>
      <p className="text-center text-purple-600 dark:text-purple-400 mb-3">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 text-center">{bio}</p>
      <p className="text-gray-500 dark:text-gray-400 text-center mt-3 text-sm">Based in {location}</p>
    </div>
  </motion.div>
);

const FoundingTeamSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Team Behind PREPZR</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the visionaries who are revolutionizing exam preparation with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ProfileCard
            name="Amit Singh"
            role="Founder & CEO"
            bio="Building AI tech startups in education. Based in India."
            imageSrc="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png"
            location="India"
          />
          <ProfileCard
            name="Dr. Atul Sharma"
            role="Cofounder & Chief AI Scientist"
            bio="Doctorate in Engineering (USA), IIT Alumni. Research Scientist & Professor focused on advanced AI solutions."
            imageSrc="/lovable-uploads/0fa1cac6-aec8-4484-82f8-54739838449c.png"
            location="USA"
          />
        </div>
      </div>
    </section>
  );
};

export default FoundingTeamSection;
