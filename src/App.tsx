import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import IncidentManagement from "./pages/operations/IncidentManagement";
import SecurityMonitoring from "./pages/operations/SecurityMonitoring";
import ThreatIntelligence from "./pages/operations/ThreatIntelligence";
import GovernanceDashboard from "./pages/governance/GovernanceDashboard";
import PolicyManagement from "./pages/governance/PolicyManagement";
import Standards from "./pages/governance/Standards";
import Committees from "./pages/governance/Committees";
import RiskDashboard from "./pages/risk/RiskDashboard";
import RiskRegister from "./pages/risk/RiskRegister";
import RiskAssessment from "./pages/risk/RiskAssessment";
import TreatmentPlans from "./pages/risk/TreatmentPlans";
import ComplianceDashboard from "./pages/compliance/ComplianceDashboard";
import AuditManagement from "./pages/compliance/AuditManagement";
import ComplianceFrameworks from "./pages/compliance/ComplianceFrameworks";
import EvidenceRepository from "./pages/compliance/EvidenceRepository";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Operations Module Routes */}
          <Route path="/operations" element={<Layout><OperationsDashboard /></Layout>} />
          <Route path="/operations/incidents" element={<Layout><IncidentManagement /></Layout>} />
          <Route path="/operations/monitoring" element={<Layout><SecurityMonitoring /></Layout>} />
          <Route path="/operations/threats" element={<Layout><ThreatIntelligence /></Layout>} />
          
          {/* Governance Module Routes */}
          <Route path="/governance" element={<Layout><GovernanceDashboard /></Layout>} />
          <Route path="/governance/policies" element={<Layout><PolicyManagement /></Layout>} />
          <Route path="/governance/standards" element={<Layout><Standards /></Layout>} />
          <Route path="/governance/committees" element={<Layout><Committees /></Layout>} />
          
          {/* Risk Module Routes */}
          <Route path="/risk" element={<Layout><RiskDashboard /></Layout>} />
          <Route path="/risk/register" element={<Layout><RiskRegister /></Layout>} />
          <Route path="/risk/assessments" element={<Layout><RiskAssessment /></Layout>} />
          <Route path="/risk/treatment-plans" element={<Layout><TreatmentPlans /></Layout>} />
          
          {/* Compliance Module Routes */}
          <Route path="/compliance" element={<Layout><ComplianceDashboard /></Layout>} />
          <Route path="/compliance/frameworks" element={<Layout><ComplianceFrameworks /></Layout>} />
          <Route path="/compliance/audits" element={<Layout><AuditManagement /></Layout>} />
          <Route path="/compliance/evidence" element={<Layout><EvidenceRepository /></Layout>} />
          
          {/* Settings */}
          <Route path="/settings" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">System configuration and preferences</p></div></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
