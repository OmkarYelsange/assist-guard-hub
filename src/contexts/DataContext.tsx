import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for all modules

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: string;
  impact: string;
  riskScore: number;
  status: string;
  owner: string;
  dateIdentified: string;
  lastReviewed: string;
  mitigation: string;
  residualRisk: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  category: string;
  assignee: string;
  reporter: string;
  dateReported: string;
  dateResolved?: string;
  affectedSystems: string[];
  timeToResolve?: number;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  version: string;
  status: string;
  category: string;
  owner: string;
  approvedBy: string;
  effectiveDate: string;
  reviewDate: string;
  lastModified: string;
  tags: string[];
}

export interface Audit {
  id: string;
  title: string;
  framework: string;
  scope: string;
  status: string;
  auditor: string;
  startDate: string;
  endDate: string;
  findings: number;
  compliance: number;
  riskLevel: string;
}

export interface TreatmentPlan {
  id: string;
  title: string;
  riskId: string;
  riskTitle: string;
  treatmentType: string;
  status: string;
  progress: number;
  priority: string;
  owner: string;
  budget: string;
  budgetUsed: string;
  startDate: string;
  targetDate: string;
  actualCompletion?: string;
  controls: string[];
  milestones: number;
  completedMilestones: number;
  effectiveness: number;
  lastUpdated: string;
}

export interface DataContextType {
  // Risks
  risks: Risk[];
  addRisk: (risk: Omit<Risk, 'id'>) => void;
  updateRisk: (id: string, risk: Partial<Risk>) => void;
  deleteRisk: (id: string) => void;
  
  // Incidents
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  updateIncident: (id: string, incident: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  
  // Policies
  policies: Policy[];
  addPolicy: (policy: Omit<Policy, 'id'>) => void;
  updatePolicy: (id: string, policy: Partial<Policy>) => void;
  deletePolicy: (id: string) => void;
  
  // Audits
  audits: Audit[];
  addAudit: (audit: Omit<Audit, 'id'>) => void;
  updateAudit: (id: string, audit: Partial<Audit>) => void;
  deleteAudit: (id: string) => void;
  
  // Treatment Plans
  treatmentPlans: TreatmentPlan[];
  addTreatmentPlan: (plan: Omit<TreatmentPlan, 'id'>) => void;
  updateTreatmentPlan: (id: string, plan: Partial<TreatmentPlan>) => void;
  deleteTreatmentPlan: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockRisks: Risk[] = [
  {
    id: "RISK-2024-001",
    title: "Ransomware Attack on Critical Systems",
    description: "Potential ransomware attack targeting critical infrastructure systems through phishing campaigns and unpatched vulnerabilities.",
    category: "Cyber Security",
    likelihood: "High",
    impact: "Critical",
    riskScore: 85,
    status: "Active",
    owner: "IT Security Team",
    dateIdentified: "2024-01-15",
    lastReviewed: "2024-01-30",
    mitigation: "Multi-factor authentication, security awareness training, patch management",
    residualRisk: "Medium"
  },
  {
    id: "RISK-2024-002",
    title: "Third-Party Data Breach",
    description: "Risk of data breach through third-party vendors with access to sensitive company information.",
    category: "Data Privacy",
    likelihood: "Medium",
    impact: "High",
    riskScore: 65,
    status: "Under Review",
    owner: "Vendor Management",
    dateIdentified: "2024-01-20",
    lastReviewed: "2024-02-01",
    mitigation: "Vendor security assessments, contractual obligations, monitoring",
    residualRisk: "Low"
  }
];

const mockIncidents: Incident[] = [
  {
    id: "INC-2024-001",
    title: "Phishing Email Campaign",
    description: "Multiple employees received phishing emails attempting to steal credentials",
    severity: "High",
    status: "Resolved",
    category: "Security",
    assignee: "John Smith",
    reporter: "Jane Doe",
    dateReported: "2024-01-15",
    dateResolved: "2024-01-16",
    affectedSystems: ["Email System", "User Workstations"],
    timeToResolve: 24
  }
];

const mockPolicies: Policy[] = [
  {
    id: "POL-2024-001",
    title: "Information Security Policy",
    description: "Comprehensive policy governing information security practices across the organization",
    version: "2.1",
    status: "Active",
    category: "Security",
    owner: "CISO Office",
    approvedBy: "Board of Directors",
    effectiveDate: "2024-01-01",
    reviewDate: "2024-12-31",
    lastModified: "2024-01-15",
    tags: ["Security", "Compliance", "Privacy"]
  }
];

const mockAudits: Audit[] = [
  {
    id: "AUD-2024-001",
    title: "SOC 2 Type II Audit",
    framework: "SOC 2",
    scope: "Security, Availability, Confidentiality",
    status: "In Progress",
    auditor: "External Audit Firm",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    findings: 3,
    compliance: 92,
    riskLevel: "Low"
  }
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "TP-2024-001",
    title: "Multi-Factor Authentication Implementation",
    riskId: "RISK-2024-001",
    riskTitle: "Ransomware Attack on Critical Systems",
    treatmentType: "Mitigate",
    status: "In Progress",
    progress: 65,
    priority: "High",
    owner: "IT Security Team",
    budget: "$150,000",
    budgetUsed: "$97,500",
    startDate: "2024-01-01",
    targetDate: "2024-03-31",
    controls: ["MFA Deployment", "User Training", "Policy Updates"],
    milestones: 8,
    completedMilestones: 5,
    effectiveness: 85,
    lastUpdated: "2024-01-15"
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRisks = localStorage.getItem('cisoRisks');
    if (savedRisks) {
      setRisks(JSON.parse(savedRisks));
    }

    const savedIncidents = localStorage.getItem('cisoIncidents');
    if (savedIncidents) {
      setIncidents(JSON.parse(savedIncidents));
    }

    const savedPolicies = localStorage.getItem('cisoPolicies');
    if (savedPolicies) {
      setPolicies(JSON.parse(savedPolicies));
    }

    const savedAudits = localStorage.getItem('cisoAudits');
    if (savedAudits) {
      setAudits(JSON.parse(savedAudits));
    }

    const savedTreatmentPlans = localStorage.getItem('cisoTreatmentPlans');
    if (savedTreatmentPlans) {
      setTreatmentPlans(JSON.parse(savedTreatmentPlans));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('cisoRisks', JSON.stringify(risks));
  }, [risks]);

  useEffect(() => {
    localStorage.setItem('cisoIncidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('cisoPolicies', JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem('cisoAudits', JSON.stringify(audits));
  }, [audits]);

  useEffect(() => {
    localStorage.setItem('cisoTreatmentPlans', JSON.stringify(treatmentPlans));
  }, [treatmentPlans]);


  // Risk functions
  const addRisk = (risk: Omit<Risk, 'id'>) => {
    const newRisk = { ...risk, id: `RISK-${Date.now()}` };
    setRisks(prev => [...prev, newRisk]);
  };

  const updateRisk = (id: string, updatedRisk: Partial<Risk>) => {
    setRisks(prev => prev.map(risk => risk.id === id ? { ...risk, ...updatedRisk } : risk));
  };

  const deleteRisk = (id: string) => {
    setRisks(prev => prev.filter(risk => risk.id !== id));
  };

  // Incident functions
  const addIncident = (incident: Omit<Incident, 'id'>) => {
    const newIncident = { ...incident, id: `INC-${Date.now()}` };
    setIncidents(prev => [...prev, newIncident]);
  };

  const updateIncident = (id: string, updatedIncident: Partial<Incident>) => {
    setIncidents(prev => prev.map(incident => incident.id === id ? { ...incident, ...updatedIncident } : incident));
  };

  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  // Policy functions
  const addPolicy = (policy: Omit<Policy, 'id'>) => {
    const newPolicy = { ...policy, id: `POL-${Date.now()}` };
    setPolicies(prev => [...prev, newPolicy]);
  };

  const updatePolicy = (id: string, updatedPolicy: Partial<Policy>) => {
    setPolicies(prev => prev.map(policy => policy.id === id ? { ...policy, ...updatedPolicy } : policy));
  };

  const deletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Audit functions
  const addAudit = (audit: Omit<Audit, 'id'>) => {
    const newAudit = { ...audit, id: `AUD-${Date.now()}` };
    setAudits(prev => [...prev, newAudit]);
  };

  const updateAudit = (id: string, updatedAudit: Partial<Audit>) => {
    setAudits(prev => prev.map(audit => audit.id === id ? { ...audit, ...updatedAudit } : audit));
  };

  const deleteAudit = (id: string) => {
    setAudits(prev => prev.filter(audit => audit.id !== id));
  };

  // Treatment Plan functions
  const addTreatmentPlan = (plan: Omit<TreatmentPlan, 'id'>) => {
    const newPlan = { ...plan, id: `TP-${Date.now()}` };
    setTreatmentPlans(prev => [...prev, newPlan]);
  };

  const updateTreatmentPlan = (id: string, updatedPlan: Partial<TreatmentPlan>) => {
    setTreatmentPlans(prev => prev.map(plan => plan.id === id ? { ...plan, ...updatedPlan } : plan));
  };

  const deleteTreatmentPlan = (id: string) => {
    setTreatmentPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const value: DataContextType = {
    risks,
    addRisk,
    updateRisk,
    deleteRisk,
    incidents,
    addIncident,
    updateIncident,
    deleteIncident,
    policies,
    addPolicy,
    updatePolicy,
    deletePolicy,
    audits,
    addAudit,
    updateAudit,
    deleteAudit,
    treatmentPlans,
    addTreatmentPlan,
    updateTreatmentPlan,
    deleteTreatmentPlan,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}