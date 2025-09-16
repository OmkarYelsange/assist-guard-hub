import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Plus, 
  Search, 
  Download,
  Edit,
  Eye,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  BookOpen,
  Users,
  Target,
  RefreshCw
} from "lucide-react";

export default function PolicyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const policies = [
    {
      id: "POL-001",
      title: "Information Security Policy",
      version: "3.2",
      category: "Security",
      status: "Active",
      owner: "CISO Office",
      approver: "Chief Security Officer",
      effectiveDate: "2024-01-01",
      reviewDate: "2024-12-31",
      lastModified: "2023-12-15",
      compliance: ["ISO 27001", "SOC 2"],
      description: "Comprehensive information security policy covering all aspects of data protection and cybersecurity governance.",
      approvalWorkflow: "In Review",
      stakeholders: ["IT Team", "Legal", "HR"],
      attachments: 3,
      views: 1247
    },
    {
      id: "POL-002",
      title: "Data Classification and Handling Policy",
      version: "2.1", 
      category: "Data Protection",
      status: "Active",
      owner: "Data Protection Officer",
      approver: "Chief Privacy Officer",
      effectiveDate: "2024-01-15",
      reviewDate: "2025-01-14",
      lastModified: "2024-01-10",
      compliance: ["GDPR", "CCPA"],
      description: "Guidelines for classifying, handling, and protecting sensitive organizational data.",
      approvalWorkflow: "Approved",
      stakeholders: ["All Employees"],
      attachments: 2,
      views: 892
    },
    {
      id: "POL-003",
      title: "Incident Response Policy",
      version: "1.5",
      category: "Security",
      status: "Under Review",
      owner: "SOC Manager",
      approver: "Chief Security Officer",
      effectiveDate: "2024-02-01",
      reviewDate: "2025-02-01",
      lastModified: "2024-01-12",
      compliance: ["ISO 27035", "NIST"],
      description: "Procedures for detecting, reporting, and responding to cybersecurity incidents.",
      approvalWorkflow: "Pending Approval",
      stakeholders: ["Security Team", "IT Operations"],
      attachments: 5,
      views: 654
    },
    {
      id: "POL-004",
      title: "Access Control Policy",
      version: "2.3",
      category: "Access Management",
      status: "Active",
      owner: "IAM Team",
      approver: "IT Director",
      effectiveDate: "2023-11-01",
      reviewDate: "2024-11-01",
      lastModified: "2023-10-20",
      compliance: ["ISO 27001", "SOC 2"],
      description: "Guidelines for managing user access, privileges, and authentication across all systems.",
      approvalWorkflow: "Approved",
      stakeholders: ["IT Team", "HR", "All Employees"],
      attachments: 4,
      views: 1156
    },
    {
      id: "POL-005",
      title: "Business Continuity Policy",
      version: "1.2",
      category: "Business Continuity",
      status: "Draft",
      owner: "BCP Coordinator",
      approver: "Chief Operating Officer",
      effectiveDate: "TBD",
      reviewDate: "TBD",
      lastModified: "2024-01-08",
      compliance: ["ISO 22301"],
      description: "Framework for maintaining critical business operations during disruptions.",
      approvalWorkflow: "In Development",
      stakeholders: ["Operations", "IT", "Facilities"],
      attachments: 1,
      views: 234
    },
    {
      id: "POL-006",
      title: "Third-Party Risk Management Policy",
      version: "1.0",
      category: "Risk Management",
      status: "Active",
      owner: "Vendor Management",
      approver: "Chief Risk Officer",
      effectiveDate: "2024-01-01",
      reviewDate: "2024-12-31",
      lastModified: "2023-12-28",
      compliance: ["SOC 2", "ISO 27001"],
      description: "Guidelines for assessing and managing risks associated with third-party vendors.",
      approvalWorkflow: "Approved",
      stakeholders: ["Procurement", "Legal", "Security"],
      attachments: 3,
      views: 445
    }
  ];

  const policyTemplates = [
    {
      name: "Information Security Policy Template",
      category: "Security",
      description: "Comprehensive template for organizational information security policies",
      framework: "ISO 27001"
    },
    {
      name: "Privacy Policy Template",
      category: "Privacy",
      description: "GDPR-compliant privacy policy template for data processing activities",
      framework: "GDPR"
    },
    {
      name: "Acceptable Use Policy Template",
      category: "IT Governance",
      description: "Template for defining acceptable use of organizational IT resources",
      framework: "NIST"
    },
    {
      name: "Risk Management Policy Template",
      category: "Risk Management",
      description: "Framework template for organizational risk management processes",
      framework: "ISO 31000"
    }
  ];

  const approvalWorkflow = [
    { stage: "Draft", status: "completed", assignee: "Policy Owner", date: "2024-01-08" },
    { stage: "Review", status: "active", assignee: "Legal Team", date: "2024-01-15" },
    { stage: "Approval", status: "pending", assignee: "CISO", date: "TBD" },
    { stage: "Publication", status: "pending", assignee: "Communications", date: "TBD" }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "status-success",
      "Under Review": "status-warning",
      "Draft": "status-info",
      "Expired": "status-danger",
      "Archived": "status-secondary"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getWorkflowColor = (workflow: string) => {
    const colors = {
      "Approved": "status-success",
      "Pending Approval": "status-warning",
      "In Review": "status-info",
      "In Development": "status-secondary"
    };
    return colors[workflow as keyof typeof colors] || "status-info";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Security": "bg-primary/10 text-primary",
      "Data Protection": "bg-info/10 text-info",
      "Access Management": "bg-success/10 text-success",
      "Business Continuity": "bg-warning/10 text-warning",
      "Risk Management": "bg-danger/10 text-danger"
    };
    return colors[category as keyof typeof colors] || "bg-secondary/10 text-secondary";
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || policy.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || policy.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const policyStats = {
    total: policies.length,
    active: policies.filter(p => p.status === "Active").length,
    pending: policies.filter(p => p.status === "Under Review").length,
    draft: policies.filter(p => p.status === "Draft").length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Policy Management</h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and maintain organizational security policies and procedures
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <BookOpen className="h-4 w-4 mr-2" />
            Policy Library
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Policies
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Policy</DialogTitle>
                <DialogDescription>
                  Create a new organizational policy or procedure document
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policy-title">Policy Title *</Label>
                    <Input id="policy-title" placeholder="Enter policy title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy-category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="data-protection">Data Protection</SelectItem>
                        <SelectItem value="access-management">Access Management</SelectItem>
                        <SelectItem value="business-continuity">Business Continuity</SelectItem>
                        <SelectItem value="risk-management">Risk Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policy-owner">Policy Owner *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ciso">CISO Office</SelectItem>
                        <SelectItem value="dpo">Data Protection Officer</SelectItem>
                        <SelectItem value="it-director">IT Director</SelectItem>
                        <SelectItem value="legal">Legal Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compliance-frameworks">Compliance Frameworks</Label>
                    <Input id="compliance-frameworks" placeholder="e.g., ISO 27001, GDPR" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-description">Description *</Label>
                  <Textarea 
                    id="policy-description"
                    placeholder="Brief description of the policy purpose and scope..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-content">Policy Content</Label>
                  <Textarea 
                    id="policy-content"
                    placeholder="Enter the detailed policy content, procedures, and requirements..."
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Create Policy</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Policies</p>
                <p className="text-3xl font-bold text-primary">{policyStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-3xl font-bold text-success">{policyStats.active}</p>
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
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold text-warning">{policyStats.pending}</p>
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
                <p className="text-sm text-muted-foreground">Draft Policies</p>
                <p className="text-3xl font-bold text-info">{policyStats.draft}</p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <Edit className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="policies">Policy Library</TabsTrigger>
          <TabsTrigger value="workflow">Approval Workflow</TabsTrigger>
          <TabsTrigger value="templates">Policy Templates</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="policies">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle>Policy Library ({filteredPolicies.length})</CardTitle>
              <CardDescription>
                Comprehensive library of organizational policies and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search policies by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Data Protection">Data Protection</SelectItem>
                      <SelectItem value="Access Management">Access Management</SelectItem>
                      <SelectItem value="Business Continuity">Business Continuity</SelectItem>
                      <SelectItem value="Risk Management">Risk Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-lg">{policy.title}</h3>
                          <Badge className={`text-xs ${getCategoryColor(policy.category)}`}>
                            {policy.category}
                          </Badge>
                          <Badge className={`status-badge ${getStatusColor(policy.status)}`}>
                            {policy.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">v{policy.version}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{policy.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Owner:</span>
                            <div className="font-medium">{policy.owner}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Effective Date:</span>
                            <div className="font-medium">{policy.effectiveDate}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Review Date:</span>
                            <div className="font-medium">{policy.reviewDate}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Compliance:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {policy.compliance.map((framework, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {framework}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Approval Status:</span>
                            <Badge className={`status-badge ${getWorkflowColor(policy.approvalWorkflow)} text-xs ml-2`}>
                              {policy.approvalWorkflow}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Views:</span>
                            <div className="font-medium">{policy.views.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                Policy Approval Workflow
              </CardTitle>
              <CardDescription>
                Track policy approval process and workflow stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Workflow Visualization */}
                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg">
                  {approvalWorkflow.map((stage, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        stage.status === 'completed' ? 'bg-success text-success-foreground' :
                        stage.status === 'active' ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {stage.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : stage.status === 'active' ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-3 text-sm">
                        <div className="font-medium">{stage.stage}</div>
                        <div className="text-muted-foreground">{stage.assignee}</div>
                        <div className="text-xs text-muted-foreground">{stage.date}</div>
                      </div>
                      {index < approvalWorkflow.length - 1 && (
                        <div className="w-16 h-0.5 bg-border ml-6"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Current Pending Approvals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Pending Approvals</h3>
                    <div className="space-y-3">
                      {policies.filter(p => p.approvalWorkflow === "Pending Approval").map((policy) => (
                        <div key={policy.id} className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{policy.title}</div>
                              <div className="text-xs text-muted-foreground">Waiting for: {policy.approver}</div>
                            </div>
                            <Badge className="status-badge status-warning text-xs">
                              Pending
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Recently Approved</h3>
                    <div className="space-y-3">
                      {policies.filter(p => p.approvalWorkflow === "Approved").slice(0, 3).map((policy) => (
                        <div key={policy.id} className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{policy.title}</div>
                              <div className="text-xs text-muted-foreground">Approved by: {policy.approver}</div>
                            </div>
                            <Badge className="status-badge status-success text-xs">
                              Approved
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Policy Templates
              </CardTitle>
              <CardDescription>
                Pre-built policy templates for common security frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policyTemplates.map((template, index) => (
                  <div key={index} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge className={`text-xs mt-2 ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.framework}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                Compliance Framework Mapping
              </CardTitle>
              <CardDescription>
                Policy alignment with compliance frameworks and standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Framework Coverage</h3>
                  {["ISO 27001", "GDPR", "SOC 2", "NIST CSF"].map((framework, index) => {
                    const coverage = Math.floor(Math.random() * 30) + 70; // Random percentage between 70-100
                    const policyCount = policies.filter(p => p.compliance.includes(framework)).length;
                    
                    return (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{framework}</span>
                          <span className="text-sm text-muted-foreground">
                            {policyCount} policies
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Coverage</span>
                          <span className="text-sm font-medium">{coverage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${coverage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="font-medium mb-4">Policy Distribution by Framework</h3>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Framework compliance chart</p>
                      <p className="text-xs text-muted-foreground">Policy coverage visualization</p>
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