import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import ProfilePage from '@/pages/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import ConceptCardsView from '@/components/dashboard/student/concepts/ConceptCardsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeExamsView from '@/components/dashboard/student/practice-exam/PracticeExamsView';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';
import EnhancedFlashcardPractice from '@/components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import ConceptStudyPage from '@/components/dashboard/student/concepts/ConceptStudyPage';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from '@/pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from '@/components/flashcards/InteractiveFlashcardBrowser';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import StudyGroupsPage from '@/pages/dashboard/student/StudyGroupsPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/study-plan" element={<StudyPlanView />} />
      <Route path="/profile" element={<StudentProfile />} />
      
      {/* Concepts routes */}
      <Route path="/concepts" element={<ConceptCardsView />} />
      <Route path="/concepts/landing" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:subject?" element={<ConceptsLandingPage />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
      <Route path="/concepts/:conceptId/study" element={<ConceptStudyPage />} />
      
      {/* Flashcards routes - simplified and direct */}
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/landing" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:flashcardId/interactive" element={<FlashcardInteractive />} />
      <Route path="/flashcards/:flashcardId" element={<FlashcardDetailsPage />} />
      <Route path="/flashcards/:flashcardId/browse" element={<InteractiveFlashcardBrowser />} />
      <Route path="/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
      
      {/* Practice exam routes */}
      <Route path="/practice" element={<PracticeExamsView />} />
      <Route path="/practice/:subject?" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      
      {/* Study Groups route */}
      <Route path="/study-groups" element={<StudyGroupsPage />} />
      
      {/* Other routes */}
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/tutor" element={<TutorView />} />
      <Route path="/ai-tutor" element={<TutorView />} />  {/* Add extra path for consistency */}
      <Route path="/academic" element={<AcademicAdvisorView />} />
      <Route path="/wellness" element={<FeelGoodCornerView />} />
      <Route path="/feel-good-corner" element={<FeelGoodCornerView />} />
    </Routes>
  );
}
