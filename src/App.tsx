import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoadingFallback from './components/ui/loading-fallback';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Faq = lazy(() => import('./pages/Faq'));
const Demo = lazy(() => import('./pages/Demo'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ProjectList = lazy(() => import('./pages/projects/ProjectList'));
const ProjectCreate = lazy(() => import('./pages/projects/ProjectCreate'));
const ProjectDetail = lazy(() => import('./pages/projects/ProjectDetail'));
const DocumentEditor = lazy(() => import('./pages/documents/DocumentEditor'));
const DocumentList = lazy(() => import('./pages/documents/DocumentList'));
const PlanEditor = lazy(() => import('./pages/plans/PlanEditor'));
const RegulatoryUpdates = lazy(() => import('./pages/regulatory/RegulatoryUpdates'));
const SecuBot = lazy(() => import('./pages/chatbot/SecuBot'));
const NoticeSecuriteCreate = lazy(() => import('./pages/documents/notices/NoticeSecuriteCreate'));
const PlanPreventionCreate = lazy(() => import('./pages/documents/plans/PlanPreventionCreate'));
const GN6Create = lazy(() => import('./pages/documents/gn6/GN6Create'));
const DocumentSign = lazy(() => import('./pages/documents/DocumentSign'));
const DocumentExport = lazy(() => import('./pages/documents/DocumentExport'));
const Security = lazy(() => import('./pages/settings/Security'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Configure React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/solutions" element={<Layout><Solutions /></Layout>} />
              <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
              <Route path="/faq" element={<Layout><Faq /></Layout>} />
              <Route path="/demo" element={<Layout><Demo /></Layout>} />
              <Route path="/auth/login" element={<Layout><Login /></Layout>} />
              <Route path="/auth/register" element={<Layout><Register /></Layout>} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
              <Route path="/projects/create" element={<ProtectedRoute><ProjectCreate /></ProtectedRoute>} />
              <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
              <Route path="/documents" element={<ProtectedRoute><DocumentList /></ProtectedRoute>} />
              <Route path="/documents/:id/edit" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>} />
              <Route path="/documents/:id/sign" element={<ProtectedRoute><DocumentSign /></ProtectedRoute>} />
              <Route path="/documents/:id/export" element={<ProtectedRoute><DocumentExport /></ProtectedRoute>} />
              <Route path="/plans/:id" element={<ProtectedRoute><PlanEditor /></ProtectedRoute>} />
              <Route path="/regulatory" element={<ProtectedRoute><RegulatoryUpdates /></ProtectedRoute>} />
              <Route path="/secubot" element={<ProtectedRoute><SecuBot /></ProtectedRoute>} />
              <Route path="/documents/notice-securite/creer" element={<ProtectedRoute><NoticeSecuriteCreate /></ProtectedRoute>} />
              <Route path="/documents/plan-prevention/creer" element={<ProtectedRoute><PlanPreventionCreate /></ProtectedRoute>} />
              <Route path="/documents/gn6/creer" element={<ProtectedRoute><GN6Create /></ProtectedRoute>} />
              <Route path="/settings/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
