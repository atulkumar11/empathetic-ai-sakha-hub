
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import ConceptStudyPage from '@/pages/dashboard/student/concept/ConceptStudyPage';
import FlashcardPracticePage from '@/pages/dashboard/student/flashcard/FlashcardPracticePage';
import LoadingScreen from '@/components/common/LoadingScreen';
import { ThemeProvider } from './components/theme-provider';
import AppRoutes from './components/dashboard/student/AppRoutes';
import ConceptCardDetailPage from './components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from './components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from './components/dashboard/student/practice-exam/ExamReviewPage';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import Login from './pages/Login';
import EnhancedFlashcardPage from './pages/dashboard/student/flashcards/EnhancedFlashcardPage';
import ProfilePage from './pages/student/ProfilePage';
import StudentProfile from './pages/dashboard/student/StudentProfile';
import StudyPlanView from './pages/dashboard/student/StudyPlanView';
import TutorView from './pages/dashboard/student/TutorView';
import AcademicAdvisorView from './pages/dashboard/student/AcademicAdvisorView';
import FlashcardPracticeLandingPage from './pages/dashboard/student/flashcard/FlashcardPracticeLandingPage';
import ConceptStudyLandingPage from './pages/dashboard/student/concept/ConceptStudyLandingPage';
import ConceptsLandingPage from './components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from './components/dashboard/student/flashcards/FlashcardsLandingPage';
import EnhancedFlashcardPractice from './components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import FlashcardInteractive from './components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from './pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from './components/flashcards/InteractiveFlashcardBrowser';
import { NotificationsView } from './components/dashboard/student/notifications/NotificationsView';
import EnhancedProfilePage from './pages/dashboard/student/EnhancedProfilePage';
import PracticeExamsSection from './components/dashboard/student/practice-exam/PracticeExamsSection';
import PostLoginWelcomeBack from './pages/dashboard/PostLoginWelcomeBack';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FlaskDeveloperGuide from './pages/admin/FlaskDeveloperGuide';
import StudyGroupsPage from './pages/dashboard/student/StudyGroupsPage';
import BatchManagementPage from './pages/admin/BatchManagementPage';
import DatabaseSchemaCSVPage from './pages/database/DatabaseSchemaCSVPage';
import SubscriptionPage from './pages/dashboard/student/SubscriptionPage';

const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prepzr-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin/flask-guide" element={<FlaskDeveloperGuide />} />
              <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />

              {/* Post-signup flow - Welcome flow only */}
              <Route path="/welcome" element={<WelcomeToPrepr />} />
              
              {/* Post-login welcome back screen */}
              <Route path="/welcome-back" element={<PostLoginWelcomeBack />} />

              {/* Student routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
              <Route path="/dashboard/student/today" element={<TodaysPlanView />} />
              <Route path="/dashboard/student/feel-good-corner" element={<FeelGoodCornerView />} />
              <Route path="/dashboard/student/study-groups" element={<StudyGroupsPage />} />
              <Route path="/dashboard/student/subscription" element={<SubscriptionPage />} />
              <Route path="/dashboard/student/batch-management" element={<BatchManagementPage />} />
              
              {/* Profile routes */}
              <Route path="/dashboard/student/profile" element={<EnhancedProfilePage />} />
              <Route path="/student/profile" element={<ProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* AI Tutor route */}
              <Route path="/dashboard/student/tutor" element={<TutorView />} />
              
              {/* Concept routes */}
              <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={<ConceptStudyPage />} />
              <Route path="/dashboard/student/concepts/:conceptId/study" element={<ConceptStudyPage />} />
              <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
              <Route path="/dashboard/student/concepts/landing" element={<ConceptsLandingPage />} />
              
              {/* Direct Flashcard routes */}
              <Route path="/dashboard/student/flashcards/:flashcardId/interactive" element={<FlashcardInteractive />} />
              <Route path="/dashboard/student/flashcards/:flashcardId" element={<FlashcardDetailsPage />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/browse" element={<InteractiveFlashcardBrowser />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
              
              {/* Practice exam routes */}
              <Route path="/dashboard/student/practice-exam" element={<PracticeExamsSection />} />
              <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
              
              {/* Other routes */}
              <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
              <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
              <Route path="/dashboard/student/study-plan" element={<StudyPlanView />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AdminRouteGuard>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AdminRouteGuard>
              } />
              <Route path="/admin/*" element={
                <AdminRouteGuard>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AdminRouteGuard>
              } />
              <Route path="/admin/dashboard" element={
                <AdminRouteGuard>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AdminRouteGuard>
              } />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
