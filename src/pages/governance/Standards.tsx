import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Award,
  Download,
  Search,
  Eye,
  Edit,
  RefreshCw,
  ExternalLink,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function Standards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("all");

  const securityFrameworks = [
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
      auditor: "BSI Group",
      certificateNumber: "IS 123456",
      scope: "Information Security Management for all business operations",
      keyBenefits: [
        "Enhanced information security posture",
        "Regulatory compliance demonstration", 
        "Risk management framework",
        "Customer trust and confidence"
      ],
      controls: [
        { id: "A.5.1", name: "Information Security Policies", status: "Implemented", compliance: 100 },
        { id: "A.6.1", name: "Organization of Information Security", status: "Implemented", compliance: 95 },
        { id: "A.7.1", name: "Human Resource Security", status: "In Progress", compliance: 80 },
        { id: "A.8.1", name: "Asset Management", status: "Implemented", compliance: 90 }
      ]
    },
    {
      id: "SOC2-TYPE2",
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 - Trust Services Criteria", 
      category: "Service Organization",
      status: "Implemented",
      compliance: 98,
      totalControls: 20,
      implementedControls: 20,
      version: "2017",
      certificationDate: "2024-01-10",
      nextAudit: "2024-07-10",
      auditor: "KPMG",
      certificateNumber: "SOC2-2024-001",
      scope: "Security, Availability, and Confidentiality of SaaS platform",
      keyBenefits: [
        "Customer assurance for SaaS services",
        "Competitive advantage in B2B sales",
        "Operational efficiency improvements",
        "Vendor risk management compliance"
      ],
      controls: [
        { id: "CC1.1", name: "Control Environment", status: "Implemented", compliance: 100 },
        { id: "CC2.1", name: "Communication and Information", status: "Implemented", compliance: 100 },
        { id: "CC3.1", name: "Risk Assessment", status: "Implemented", compliance: 95 },
        { id: "CC6.1", name: "Logical and Physical Access Controls", status: "Implemented", compliance: 98 }
      ]
    },
    {
      id: "NIST-CSF",
      name: "NIST Cybersecurity Framework",
      description: "Framework for Improving Critical Infrastructure Cybersecurity",
      category: "Cybersecurity",
      status: "In Progress", 
      compliance: 76,
      totalControls: 100,
      implementedControls: 76,
      version: "1.1",
      certificationDate: "N/A",
      nextAudit: "2024-06-30",
      auditor: "Internal Assessment",
      certificateNumber: "N/A",
      scope: "Cybersecurity risk management across all business functions",
      keyBenefits: [
        "Comprehensive cybersecurity posture",
        "Risk-based approach to security",
        "Industry best practice alignment",
        "Stakeholder communication framework"
      ],
      controls: [
        { id: "ID.AM", name: "Asset Management", status: "Implemented", compliance: 90 },
        { id: "PR.AC", name: "Access Control", status: "Implemented", compliance: 85 },
        { id: "DE.AE", name: "Anomalies and Events", status: "In Progress", compliance: 65 },
        { id: "RS.RP", name: "Response Planning", status: "In Progress", compliance: 70 }
      ]
    },
    {
      id: "GDPR",
      name: "General Data Protection Regulation",
      description: "EU Regulation on Data Protection and Privacy",
      category: "Privacy & Data Protection",
      status: "Implemented",
      compliance: 89,
      totalControls: 30,
      implementedControls: 27,
      version: "2018",
      certificationDate: "2023-05-25",
      nextAudit: "2024-05-25", 
      auditor: "Data Protection Consultancy",
      certificateNumber: "GDPR-CERT-2023",
      scope: "Personal data processing for all EU customers and employees",
      keyBenefits: [
        "Legal compliance in EU markets",
        "Enhanced data subject rights",
        "Improved data governance",
        "Reduced regulatory risk"
      ],
      controls: [
        { id: "Art.25", name: "Data Protection by Design", status: "Implemented", compliance: 95 },
        { id: "Art.32", name: "Security of Processing", status: "Implemented", compliance: 90 },
        { id: "Art.33", name: "Notification of Data Breach", status: "In Progress", compliance: 80 },
        { id: "Art.35", name: "Data Protection Impact Assessment", status: "Implemented", compliance: 85 }
      ]
    },
    {
      id: "PCI-DSS",
      name: "PCI DSS v4.0",
      description: "Payment Card Industry Data Security Standard",
      category: "Payment Security",
      status: "Planning",
      compliance: 45,
      totalControls: 12,
      implementedControls: 5,
      version: "4.0",
      certificationDate: "Pending",
      nextAudit: "2024-09-30",
      auditor: "TBD",
      certificateNumber: "Pending",
      scope: "Credit card processing and storage systems",
      keyBenefits: [
        "Payment card acceptance capability",
        "Reduced fraud risk",
        "Customer payment security",
        "Merchant account compliance"
      ],
      controls: [
        { id: "Req.1", name: "Install Firewalls", status: "Implemented", compliance: 100 },
        { id: "Req.2", name: "Change Default Passwords", status: "Implemented", compliance: 95 },
        { id: "Req.3", name: "Protect Stored Cardholder Data", status: "Planning", compliance: 30 },
        { id: "Req.4", name: "Encrypt Transmission", status: "In Progress", compliance: 60 }
      ]
    }
  ];

  const implementationTasks = [
    {
      id: "TASK-001",
      framework: "NIST CSF",
      control: "DE.AE-1",
      title: "Establish Network Monitoring Baseline",
      priority: "High",
      assignee: "Network Security Team", 
      dueDate: "2024-02-15",
      status: "In Progress",
      completion: 75
    },
    {
      id: "TASK-002", 
      framework: "GDPR",
      control: "Art.33",
      title: "Implement Automated Breach Notification", 
      priority: "Medium",
      assignee: "Privacy Team",
      dueDate: "2024-03-01",
      status: "Planning",
      completion: 25
    },
    {
      id: "TASK-003",
      framework: "PCI DSS",
      control: "Req.3",
      title: "Deploy Cardholder Data Encryption",
      priority: "Critical",
      assignee: "Payment Systems Team",
      dueDate: "2024-02-28", 
      status: "Not Started",
      completion: 0
    },
    {
      id: "TASK-004",
      framework: "ISO 27001",
      control: "A.7.1",
      title: "Update Security Awareness Training",
      priority: "Medium",
      assignee: "HR & Training",
      dueDate: "2024-03-15",
      status: "In Progress", 
      completion: 60
    }
  ];

  const auditSchedule = [
    {
      framework: "ISO 27001",
      type: "Surveillance Audit",
      auditor: "BSI Group",
      date: "2024-04-15",
      status: "Scheduled",
      scope: "Information Security Controls A.5-A.8"
    },
    {
      framework: "SOC 2",
      type: "Readiness Assessment", 
      auditor: "KPMG",
      date: "2024-05-10",
      status: "Scheduled",
      scope: "Security and Availability Controls"
    },
    {
      framework: "GDPR",
      type: "Compliance Review",
      auditor: "Internal Audit",
      date: "2024-03-20",
      status: "Preparing",
      scope: "Data Processing Activities"
    },
    {
      framework: "NIST CSF",
      type: "Maturity Assessment",
      auditor: "External Consultant",
      date: "2024-06-05", 
      status: "Planning",
      scope: "All Five Functions"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Implemented": "status-success",
      "In Progress": "status-warning", 
      "Planning": "status-info",
      "Not Started": "status-secondary"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Critical": "status-danger",
      "High": "status-danger",
      "Medium": "status-warning",
      "Low": "status-success"
    };
    return colors[priority as keyof typeof priority] || "status-info";
  };

  const getAuditStatusColor = (status: string) => {
    const colors = {
      "Scheduled": "status-success",
      "Preparing": "status-warning",
      "Planning": "status-info",
      "Completed": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "text-success";
    if (compliance >= 70) return "text-warning"; 
    return "text-danger";
  };

  const filteredFrameworks = securityFrameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = frameworkFilter === "all" || framework.category === frameworkFilter;
    
    return matchesSearch && matchesFilter;
  });

  const frameworkStats = {
    total: securityFrameworks.length,
    implemented: securityFrameworks.filter(f => f.status === "Implemented").length,
    inProgress: securityFrameworks.filter(f => f.status === "In Progress").length,
    avgCompliance: Math.round(securityFrameworks.reduce((acc, f) => acc + f.compliance, 0) / securityFrameworks.length)
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Standards & Frameworks</h1>
          <p className="text-muted-foreground mt-2">
            Manage compliance with security frameworks, standards, and certifications
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Status
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="w-full sm:w-auto">
            <Target className="h-4 w-4 mr-2" />
            Gap Analysis
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Frameworks</p>
                <p className="text-3xl font-bold text-primary">{frameworkStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Implemented</p>
                <p className="text-3xl font-bold text-success">{frameworkStats.implemented}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-warning">{frameworkStats.inProgress}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Compliance</p>
                <p className={`text-3xl font-bold ${getComplianceColor(frameworkStats.avgCompliance)}`}>
                  {frameworkStats.avgCompliance}%
                </p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <Award className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="frameworks">Security Frameworks</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Tasks</TabsTrigger>
          <TabsTrigger value="audits">Audit Schedule</TabsTrigger>
          <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle>Security Frameworks Overview</CardTitle>
              <CardDescription>
                Current status and compliance level for each security framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search frameworks by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Information Security">Information Security</SelectItem>
                    <SelectItem value="Service Organization">Service Organization</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Privacy & Data Protection">Privacy & Data Protection</SelectItem>
                    <SelectItem value="Payment Security">Payment Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                {filteredFrameworks.map((framework) => (
                  <div key={framework.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-lg">{framework.name}</h3>
                          <Badge className={`status-badge ${getStatusColor(framework.status)}`}>
                            {framework.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {framework.category}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{framework.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">Compliance Level:</span>
                            <div className={`text-2xl font-bold ${getComplianceColor(framework.compliance)}`}>
                              {framework.compliance}%
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Controls:</span>
                            <div className="font-medium">
                              {framework.implementedControls}/{framework.totalControls}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Audit:</span>
                            <div className="font-medium">{framework.nextAudit}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Implementation Progress</span>
                            <span className="text-sm font-medium">{framework.compliance}%</span>
                          </div>
                          <Progress value={framework.compliance} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span>Auditor: {framework.auditor}</span>
                          </div>
                          <div>
                            <span>Certificate: {framework.certificateNumber}</span>
                          </div>
                          <div className="md:col-span-2">
                            <span>Scope: {framework.scope}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Edit className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                Implementation Tasks
              </CardTitle>
              <CardDescription>
                Track progress on framework implementation and remediation tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {implementationTasks.map((task) => (
                  <div key={task.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={`status-badge ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <Badge className={`status-badge ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>Framework: <span className="font-medium">{task.framework}</span></div>
                          <div>Control: <span className="font-medium">{task.control}</span></div>
                          <div>Assignee: <span className="font-medium">{task.assignee}</span></div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">{task.completion}%</span>
                          </div>
                          <Progress value={task.completion} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 md:flex-col md:space-x-0 md:space-y-1">
                        <div className="text-sm">
                          <div className="text-muted-foreground">Due Date</div>
                          <div className="font-medium">{task.dueDate}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                Audit Schedule
              </CardTitle>
              <CardDescription>
                Upcoming audits, assessments, and compliance reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {auditSchedule.map((audit, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{audit.framework}</h3>
                      <Badge className={`status-badge ${getAuditStatusColor(audit.status)}`}>
                        {audit.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type: </span>
                        <span className="font-medium">{audit.type}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Auditor: </span>
                        <span className="font-medium">{audit.auditor}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span className="font-medium">{audit.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Scope: </span>
                        <span className="font-medium">{audit.scope}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gap-analysis">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Gap Analysis & Recommendations
              </CardTitle>
              <CardDescription>
                Identify gaps and improvement opportunities across frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Priority Gaps</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Incident Response Automation</span>
                        <Badge className="status-badge status-danger text-xs">High Risk</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Multiple frameworks require automated incident response capabilities
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Data Classification</span>
                        <Badge className="status-badge status-warning text-xs">Medium Risk</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enhanced data classification needed for GDPR and ISO 27001
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Continuous Monitoring</span>
                        <Badge className="status-badge status-warning text-xs">Medium Risk</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Real-time security monitoring gaps in NIST CSF implementation
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Improvement Opportunities</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <div className="font-medium text-sm mb-1">Security Training Program</div>
                      <p className="text-xs text-muted-foreground">
                        Enhance security awareness to support multiple compliance requirements
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <div className="font-medium text-sm mb-1">Risk Assessment Automation</div>
                      <p className="text-xs text-muted-foreground">
                        Automate risk assessments for better ISO 27001 and NIST CSF alignment
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <div className="font-medium text-sm mb-1">Third-Party Management</div>
                      <p className="text-xs text-muted-foreground">
                        Strengthen vendor assessment processes across all frameworks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}