import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import GovernanceDashboard from "./pages/governance/GovernanceDashboard";
import RiskDashboard from "./pages/risk/RiskDashboard";
import ComplianceDashboard from "./pages/compliance/ComplianceDashboard";
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
          <Route path="/operations/incidents" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Incident Management</h1><p className="text-muted-foreground">Manage security incidents and responses</p></div></Layout>} />
          <Route path="/operations/monitoring" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Security Monitoring</h1><p className="text-muted-foreground">Real-time security monitoring and alerts</p></div></Layout>} />
          <Route path="/operations/threats" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Threat Intelligence</h1><p className="text-muted-foreground">Threat analysis and intelligence feeds</p></div></Layout>} />
          
          {/* Governance Module Routes */}
          <Route path="/governance" element={<Layout><GovernanceDashboard /></Layout>} />
          <Route path="/governance/policies" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Policy Management</h1><p className="text-muted-foreground">Manage security policies and procedures</p></div></Layout>} />
          <Route path="/governance/standards" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Security Standards</h1><p className="text-muted-foreground">Security standards and frameworks</p></div></Layout>} />
          <Route path="/governance/committees" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Governance Committees</h1><p className="text-muted-foreground">Security governance committees and meetings</p></div></Layout>} />
          
          {/* Risk Module Routes */}
          <Route path="/risk" element={<Layout><RiskDashboard /></Layout>} />
          <Route path="/risk/register" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Risk Register</h1><p className="text-muted-foreground">Comprehensive risk inventory and tracking</p></div></Layout>} />
          <Route path="/risk/assessments" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Risk Assessments</h1><p className="text-muted-foreground">Conduct and manage risk assessments</p></div></Layout>} />
          <Route path="/risk/treatment" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Treatment Plans</h1><p className="text-muted-foreground">Risk treatment and mitigation plans</p></div></Layout>} />
          
          {/* Compliance Module Routes */}
          <Route path="/compliance" element={<Layout><ComplianceDashboard /></Layout>} />
          <Route path="/compliance/frameworks" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Compliance Frameworks</h1><p className="text-muted-foreground">Manage compliance frameworks and standards</p></div></Layout>} />
          <Route path="/compliance/audits" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Audit Management</h1><p className="text-muted-foreground">Plan and track compliance audits</p></div></Layout>} />
          <Route path="/compliance/evidence" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Evidence Repository</h1><p className="text-muted-foreground">Manage compliance evidence and documentation</p></div></Layout>} />
          
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
