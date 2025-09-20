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

export interface SecurityMonitoringAlert {
  id: string;
  timestamp: string;
  severity: string;
  source: string;
  message: string;
  status: string;
  category: string;
}

export interface ThreatIntelligence {
  id: string;
  name: string;
  severity: string;
  category: string;
  firstSeen: string;
  lastSeen: string;
  confidence: string;
  targets: string;
  description: string;
  indicators: number;
  geography: string;
  attribution: string;
  status: string;
}

export interface Committee {
  id: string;
  name: string;
  type: string;
  chair: string;
  members: string[];
  meetingFrequency: string;
  lastMeeting: string;
  nextMeeting: string;
  status: string;
  charter: string;
  responsibilities: string[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  compliance: number;
  totalControls: number;
  implementedControls: number;
  version: string;
  certificationDate: string;
  nextAudit: string;
  auditor: string;
}

export interface Evidence {
  id: string;
  title: string;
  type: string;
  framework: string;
  control: string;
  description: string;
  owner: string;
  uploadDate: string;
  lastReviewed: string;
  status: string;
  fileSize: string;
  tags: string[];
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

  // Security Monitoring Alerts
  alerts: SecurityMonitoringAlert[];
  addAlert: (alert: Omit<SecurityMonitoringAlert, 'id'>) => void;
  updateAlert: (id: string, alert: Partial<SecurityMonitoringAlert>) => void;
  deleteAlert: (id: string) => void;

  // Threat Intelligence
  threats: ThreatIntelligence[];
  addThreat: (threat: Omit<ThreatIntelligence, 'id'>) => void;
  updateThreat: (id: string, threat: Partial<ThreatIntelligence>) => void;
  deleteThreat: (id: string) => void;

  // Committees
  committees: Committee[];
  addCommittee: (committee: Omit<Committee, 'id'>) => void;
  updateCommittee: (id: string, committee: Partial<Committee>) => void;
  deleteCommittee: (id: string) => void;

  // Compliance Frameworks
  complianceFrameworks: ComplianceFramework[];
  addComplianceFramework: (framework: Omit<ComplianceFramework, 'id'>) => void;
  updateComplianceFramework: (id: string, framework: Partial<ComplianceFramework>) => void;
  deleteComplianceFramework: (id: string) => void;

  // Evidence
  evidence: Evidence[];
  addEvidence: (evidence: Omit<Evidence, 'id'>) => void;
  updateEvidence: (id: string, evidence: Partial<Evidence>) => void;
  deleteEvidence: (id: string) => void;
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

const mockAlerts: SecurityMonitoringAlert[] = [
  {
    id: "ALT-2024-001",
    timestamp: "15:42:33",
    severity: "Critical",
    source: "Network Monitor",
    message: "Unusual traffic spike detected from external IP 192.168.1.100",
    status: "Active",
    category: "Network Anomaly"
  },
  {
    id: "ALT-2024-002",
    timestamp: "15:41:15",
    severity: "High",
    source: "SIEM",
    message: "Failed authentication attempts exceed threshold for user 'admin'",
    status: "Investigating",
    category: "Authentication"
  }
];

const mockThreats: ThreatIntelligence[] = [
  {
    id: "TI-2024-001",
    name: "APT29 Cozy Bear Campaign",
    severity: "Critical",
    category: "APT",
    firstSeen: "2024-01-10",
    lastSeen: "2024-01-15",
    confidence: "High",
    targets: "Government, Healthcare",
    description: "Sophisticated phishing campaign targeting government entities",
    indicators: 47,
    geography: "Global",
    attribution: "Russia-linked APT29",
    status: "Active"
  }
];

const mockCommittees: Committee[] = [
  {
    id: "COM-001",
    name: "Information Security Steering Committee",
    type: "Executive Committee",
    chair: "Chief Information Security Officer",
    members: ["CISO", "CTO", "Legal Counsel", "HR Director"],
    meetingFrequency: "Monthly",
    lastMeeting: "2024-01-15",
    nextMeeting: "2024-02-15",
    status: "Active",
    charter: "Provide strategic oversight and governance for information security initiatives",
    responsibilities: ["Policy approval", "Risk oversight", "Budget allocation", "Strategic planning"]
  }
];

const mockComplianceFrameworks: ComplianceFramework[] = [
  {
    id: "ISO-27001",
    name: "ISO/IEC 27001:2022",
    description: "Information Security Management Systems - Requirements",
    category: "Information Security",
    status: "Implemented",
    compliance: 94,
    totalControls: 114,
    implementedControls: 107,
    version: "2022",
    certificationDate: "2023-10-15",
    nextAudit: "2024-10-15",
    auditor: "BSI Group"
  }
];

const mockEvidence: Evidence[] = [
  {
    id: "EVD-001",
    title: "Security Awareness Training Records",
    type: "Training Records",
    framework: "ISO 27001",
    control: "A.7.2.2",
    description: "Employee security awareness training completion records and certificates",
    owner: "HR Security Team",
    uploadDate: "2024-01-15",
    lastReviewed: "2024-01-15",
    status: "Current",
    fileSize: "2.3 MB",
    tags: ["Training", "HR", "Security Awareness"]
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans);
  const [alerts, setAlerts] = useState<SecurityMonitoringAlert[]>(mockAlerts);
  const [threats, setThreats] = useState<ThreatIntelligence[]>(mockThreats);
  const [committees, setCommittees] = useState<Committee[]>(mockCommittees);
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>(mockComplianceFrameworks);
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);

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

  useEffect(() => {
    localStorage.setItem('cisoAlerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('cisoThreats', JSON.stringify(threats));
  }, [threats]);

  useEffect(() => {
    localStorage.setItem('cisoCommittees', JSON.stringify(committees));
  }, [committees]);

  useEffect(() => {
    localStorage.setItem('cisoComplianceFrameworks', JSON.stringify(complianceFrameworks));
  }, [complianceFrameworks]);

  useEffect(() => {
    localStorage.setItem('cisoEvidence', JSON.stringify(evidence));
  }, [evidence]);


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

  // Alert functions
  const addAlert = (alert: Omit<SecurityMonitoringAlert, 'id'>) => {
    const newAlert = { ...alert, id: `ALT-${Date.now()}` };
    setAlerts(prev => [...prev, newAlert]);
  };

  const updateAlert = (id: string, updatedAlert: Partial<SecurityMonitoringAlert>) => {
    setAlerts(prev => prev.map(alert => alert.id === id ? { ...alert, ...updatedAlert } : alert));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Threat functions
  const addThreat = (threat: Omit<ThreatIntelligence, 'id'>) => {
    const newThreat = { ...threat, id: `TI-${Date.now()}` };
    setThreats(prev => [...prev, newThreat]);
  };

  const updateThreat = (id: string, updatedThreat: Partial<ThreatIntelligence>) => {
    setThreats(prev => prev.map(threat => threat.id === id ? { ...threat, ...updatedThreat } : threat));
  };

  const deleteThreat = (id: string) => {
    setThreats(prev => prev.filter(threat => threat.id !== id));
  };

  // Committee functions
  const addCommittee = (committee: Omit<Committee, 'id'>) => {
    const newCommittee = { ...committee, id: `COM-${Date.now()}` };
    setCommittees(prev => [...prev, newCommittee]);
  };

  const updateCommittee = (id: string, updatedCommittee: Partial<Committee>) => {
    setCommittees(prev => prev.map(committee => committee.id === id ? { ...committee, ...updatedCommittee } : committee));
  };

  const deleteCommittee = (id: string) => {
    setCommittees(prev => prev.filter(committee => committee.id !== id));
  };

  // Compliance Framework functions
  const addComplianceFramework = (framework: Omit<ComplianceFramework, 'id'>) => {
    const newFramework = { ...framework, id: `FW-${Date.now()}` };
    setComplianceFrameworks(prev => [...prev, newFramework]);
  };

  const updateComplianceFramework = (id: string, updatedFramework: Partial<ComplianceFramework>) => {
    setComplianceFrameworks(prev => prev.map(framework => framework.id === id ? { ...framework, ...updatedFramework } : framework));
  };

  const deleteComplianceFramework = (id: string) => {
    setComplianceFrameworks(prev => prev.filter(framework => framework.id !== id));
  };

  // Evidence functions
  const addEvidence = (evidenceItem: Omit<Evidence, 'id'>) => {
    const newEvidence = { ...evidenceItem, id: `EVD-${Date.now()}` };
    setEvidence(prev => [...prev, newEvidence]);
  };

  const updateEvidence = (id: string, updatedEvidence: Partial<Evidence>) => {
    setEvidence(prev => prev.map(evidence => evidence.id === id ? { ...evidence, ...updatedEvidence } : evidence));
  };

  const deleteEvidence = (id: string) => {
    setEvidence(prev => prev.filter(evidence => evidence.id !== id));
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
    alerts,
    addAlert,
    updateAlert,
    deleteAlert,
    threats,
    addThreat,
    updateThreat,
    deleteThreat,
    committees,
    addCommittee,
    updateCommittee,
    deleteCommittee,
    complianceFrameworks,
    addComplianceFramework,
    updateComplianceFramework,
    deleteComplianceFramework,
    evidence,
    addEvidence,
    updateEvidence,
    deleteEvidence,
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