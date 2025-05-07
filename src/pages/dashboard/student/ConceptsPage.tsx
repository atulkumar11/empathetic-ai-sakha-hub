
import React, { useState, useMemo } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);

  // Get unique subjects from concept cards
  const subjects = useMemo(() => {
    const subjectsSet = new Set(conceptCards.map(card => card.subject));
    return Array.from(subjectsSet);
  }, [conceptCards]);

  // Count concepts per subject
  const conceptCounts = useMemo(() => {
    return conceptCards.reduce((acc, card) => {
      acc[card.subject] = (acc[card.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [conceptCards]);

  // Filter cards based on time view, subject, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards.filter(card => card.scheduledFor === timeView);
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [conceptCards, timeView, activeSubject, showAllCards]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ConceptsPageLayout>
      <div className="space-y-6">
        {/* Time-based Tabs */}
        <Tabs value={timeView} onValueChange={(v) => setTimeView(v as typeof timeView)}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Subject Tabs */}
        <SubjectTabs
          subjects={subjects}
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
          conceptCounts={conceptCounts}
        />

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
              </motion.div>
            ))
          ) : filteredCards.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No concept cards found for {activeSubject !== 'all' ? activeSubject : ''} {timeView === 'today' ? 'today' : timeView === 'week' ? 'this week' : 'this month'}</p>
            </div>
          ) : (
            filteredCards.map((card) => (
              <motion.div key={card.id} variants={itemVariants}>
                <ConceptCard 
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  subject={card.subject}
                  difficulty={card.difficulty.toLowerCase() as any}
                  completed={card.completed}
                  progress={card.progress}
                  relatedConcepts={card.relatedConcepts}
                  onView={() => window.location.href = `/dashboard/student/concepts/${card.id}`}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Button */}
        {!showAllCards && filteredCards.length === 6 && filteredCards.length < conceptCards.filter(card => card.scheduledFor === timeView && (activeSubject === 'all' || card.subject === activeSubject)).length && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAllCards(true)}
              className="group"
            >
              View All Concepts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptsPage;
