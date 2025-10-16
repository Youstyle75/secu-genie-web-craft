
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/projects/ProjectList';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectDetail from './pages/projects/ProjectDetail';
import DocumentEditor from './pages/documents/DocumentEditor';
import DocumentList from './pages/documents/DocumentList';
import PlanEditor from './pages/plans/PlanEditor';
import RegulatoryUpdates from './pages/regulatory/RegulatoryUpdates';
import NoticeSecuriteCreate from './pages/documents/notices/NoticeSecuriteCreate';
import PlanPreventionCreate from './pages/documents/plans/PlanPreventionCreate';
import DocumentReview from './pages/documents/DocumentReview';
import DocumentSign from './pages/documents/DocumentSign';
import DocumentExport from './pages/documents/DocumentExport';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Routes protégées */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/demo" element={<ProtectedRoute><Demo /></ProtectedRoute>} />
          
          {/* Projets */}
          <Route path="/projects" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
          <Route path="/projects/create" element={<ProtectedRoute><ProjectCreate /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><DocumentList /></ProtectedRoute>} />
          <Route path="/documents/:id/edit" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>} />
          <Route path="/documents/:id/sign" element={<ProtectedRoute><DocumentSign /></ProtectedRoute>} />
          <Route path="/documents/:id/export" element={<ProtectedRoute><DocumentExport /></ProtectedRoute>} />
          <Route path="/plans/:id" element={<ProtectedRoute><PlanEditor /></ProtectedRoute>} />
          <Route path="/regulatory" element={<ProtectedRoute><RegulatoryUpdates /></ProtectedRoute>} />
          
          {/* Documents */}
          <Route path="/documents/notice-securite/creer" element={<ProtectedRoute><NoticeSecuriteCreate /></ProtectedRoute>} />
          <Route path="/documents/plan-prevention/creer" element={<ProtectedRoute><PlanPreventionCreate /></ProtectedRoute>} />
          <Route path="/documents/:id/relecture" element={<ProtectedRoute><DocumentReview /></ProtectedRoute>} />
          <Route path="/documents/:id/signer" element={<ProtectedRoute><DocumentSign /></ProtectedRoute>} />
          <Route path="/documents/:id/exporter" element={<ProtectedRoute><DocumentExport /></ProtectedRoute>} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
