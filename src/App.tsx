
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';
import NoticeSecuriteCreate from './pages/documents/notices/NoticeSecuriteCreate';
import PlanPreventionCreate from './pages/documents/plans/PlanPreventionCreate';
import DocumentReview from './pages/documents/DocumentReview';
import DocumentSign from './pages/documents/DocumentSign';
import DocumentExport from './pages/documents/DocumentExport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/demo" element={<Demo />} />
        
        {/* Routes pour les documents */}
        <Route path="/documents/notice-securite/creer" element={<NoticeSecuriteCreate />} />
        <Route path="/documents/plan-prevention/creer" element={<PlanPreventionCreate />} />
        <Route path="/documents/:id/relecture" element={<DocumentReview />} />
        <Route path="/documents/:id/signer" element={<DocumentSign />} />
        <Route path="/documents/:id/exporter" element={<DocumentExport />} />
        
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
