import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AIChatbotWidget } from './components/chatbot/AIChatbotWidget';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { MarketplacePage } from './pages/public/MarketplacePage';
import { ProblemDetailPage } from './pages/public/ProblemDetailPage';
import { InnovationMapPage } from './pages/public/InnovationMapPage';
import { ShowcasePage } from './pages/public/ShowcasePage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ProfilePage } from './pages/public/ProfilePage';

// Role Dashboards
import { ReportProblemPage } from './pages/citizen/ReportProblemPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { TeamBuilderPage } from './pages/student/TeamBuilderPage';
import { UniversityDashboard } from './pages/university/UniversityDashboard';
import { IndustryDashboard } from './pages/industry/IndustryDashboard';
import { ExpertDashboard } from './pages/expert/ExpertDashboard';
import { GovtCommandCenter } from './pages/government/GovtCommandCenter';
import { ProjectWorkspacePage } from './pages/project/ProjectWorkspacePage';
import { SolutionProposalPage } from './pages/project/SolutionProposalPage';
import { SolutionDetailPage } from './pages/project/SolutionDetailPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
          {/* Global Navigation Header */}
          <Navbar />

          {/* Route Canvas */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/problems/:id" element={<ProblemDetailPage />} />
              <Route path="/map" element={<InnovationMapPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/universities" element={<UniversityDashboard />} />
              <Route path="/industry" element={<IndustryDashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/solutions/:id" element={<SolutionDetailPage />} />
              <Route path="/projects/:id" element={<ProjectWorkspacePage />} />

              {/* Citizen Routes - Limited to Citizens and Admin */}
              <Route
                path="/citizen/report"
                element={
                  <ProtectedRoute allowedRoles={['CITIZEN', 'ADMIN']}>
                    <ReportProblemPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizen/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['CITIZEN', 'ADMIN']}>
                    <CitizenDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Student Innovator Routes - Limited to Students and Admin */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/team-builder"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                    <TeamBuilderPage />
                  </ProtectedRoute>
                }
              />

              {/* Solution Proposal Route - Limited to Students, Faculty Mentors, and Admin */}
              <Route
                path="/solutions/propose"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT', 'FACULTY_MENTOR', 'ADMIN']}>
                    <SolutionProposalPage />
                  </ProtectedRoute>
                }
              />

              {/* Domain Expert & Evaluator */}
              <Route
                path="/expert/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['EXPERT', 'ADMIN']}>
                    <ExpertDashboard />
                  </ProtectedRoute>
                }
              />

              {/* University & Dean */}
              <Route
                path="/university/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['UNIVERSITY', 'FACULTY_MENTOR', 'ADMIN']}>
                    <UniversityDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Government Command Center - Limited to Govt Officers and Admin */}
              <Route
                path="/government/command-center"
                element={
                  <ProtectedRoute allowedRoles={['GOVT_OFFICER', 'ADMIN']}>
                    <GovtCommandCenter />
                  </ProtectedRoute>
                }
              />

              {/* Admin - Strictly Super Admin only */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Floating AI Copilot Widget */}
          <AIChatbotWidget />

          {/* Global National Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
