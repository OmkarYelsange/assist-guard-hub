import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DataProvider } from "./contexts/DataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Risk Management
import RiskDashboard from "./pages/risk/RiskDashboard";
import RiskRegister from "./pages/risk/RiskRegister";
import RiskAssessment from "./pages/risk/RiskAssessment";
import TreatmentPlans from "./pages/risk/TreatmentPlans";

// Operations
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import IncidentManagement from "./pages/operations/IncidentManagement";
import SecurityMonitoring from "./pages/operations/SecurityMonitoring";
import ThreatIntelligence from "./pages/operations/ThreatIntelligence";

// Governance
import GovernanceDashboard from "./pages/governance/GovernanceDashboard";
import PolicyManagement from "./pages/governance/PolicyManagement";
import Standards from "./pages/governance/Standards";
import Committees from "./pages/governance/Committees";

// Compliance
import ComplianceDashboard from "./pages/compliance/ComplianceDashboard";
import AuditManagement from "./pages/compliance/AuditManagement";
import ComplianceFrameworks from "./pages/compliance/ComplianceFrameworks";
import EvidenceRepository from "./pages/compliance/EvidenceRepository";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Risk Management Routes */}
        <Route path="/risk" element={<RiskDashboard />} />
        <Route path="/risk/register" element={<RiskRegister />} />
        <Route path="/risk/assessments" element={<RiskAssessment />} />
        <Route path="/risk/treatment-plans" element={<TreatmentPlans />} />
        
        {/* Operations Routes */}
        <Route path="/operations" element={<OperationsDashboard />} />
        <Route path="/operations/incidents" element={<IncidentManagement />} />
        <Route path="/operations/monitoring" element={<SecurityMonitoring />} />
        <Route path="/operations/threats" element={<ThreatIntelligence />} />
        
        {/* Governance Routes */}
        <Route path="/governance" element={<GovernanceDashboard />} />
        <Route path="/governance/policies" element={<PolicyManagement />} />
        <Route path="/governance/standards" element={<Standards />} />
        <Route path="/governance/committees" element={<Committees />} />
        
        {/* Compliance Routes */}
        <Route path="/compliance" element={<ComplianceDashboard />} />
        <Route path="/compliance/audits" element={<AuditManagement />} />
        <Route path="/compliance/frameworks" element={<ComplianceFrameworks />} />
        <Route path="/compliance/evidence" element={<EvidenceRepository />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DataProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
