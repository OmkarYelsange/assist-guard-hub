import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Shield,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  FileText,
  Settings,
  TrendingUp
} from "lucide-react";

export default function ComplianceFrameworks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const frameworks = [
    {
      id: "FW-SOC2",
      name: "SOC 2 Type II",
      type: "Security",
      description: "Service Organization Control 2 compliance framework for service providers",
      status: "Active",
      maturityLevel: "Level 3 - Defined",
      totalControls: 64,
      implementedControls: 58,
      complianceScore: 91,
      lastAssessment: "2024-01-10",
      nextReview: "2024-07-10",
      owner: "Sarah Johnson",
      auditor: "External Audit Firm",
      requirements: ["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
      certificationDate: "2023-12-15",
      expiryDate: "2024-12-15",
      gaps: 6,
      risks: 3
    },
    {
      id: "FW-ISO27001",
      name: "ISO 27001:2022",
      type: "Information Security",
      description: "International standard for information security management systems",
      status: "In Progress", 
      maturityLevel: "Level 2 - Managed",
      totalControls: 93,
      implementedControls: 71,
      complianceScore: 76,
      lastAssessment: "2024-01-05",
      nextReview: "2024-04-05",
      owner: "Mike Wilson",
      auditor: "Internal Audit",
      requirements: ["ISMS", "Risk Management", "Security Controls", "Continuous Improvement"],
      certificationDate: null,
      expiryDate: "2024-08-31",
      gaps: 22,
      risks: 8
    },
    {
      id: "FW-GDPR",
      name: "GDPR Compliance",
      type: "Privacy",
      description: "General Data Protection Regulation compliance framework",
      status: "Active",
      maturityLevel: "Level 4 - Quantitatively Managed",
      totalControls: 47,
      implementedControls: 44,
      complianceScore: 94,
      lastAssessment: "2024-01-12",
      nextReview: "2024-03-12",
      owner: "Lisa Davis",
      auditor: "Privacy Officer",
      requirements: ["Data Protection", "Consent Management", "Breach Notification", "Data Subject Rights"],
      certificationDate: "2023-05-25",
      expiryDate: "Ongoing",
      gaps: 3,
      risks: 1
    },
    {
      id: "FW-NIST",
      name: "NIST Cybersecurity Framework",
      type: "Cybersecurity",
      description: "National Institute of Standards and Technology cybersecurity framework",
      status: "Planning",
      maturityLevel: "Level 1 - Initial",
      totalControls: 108,
      implementedControls: 32,
      complianceScore: 30,
      lastAssessment: "2023-12-20",
      nextReview: "2024-06-20",
      owner: "Alex Brown",
      auditor: "Security Team",
      requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      certificationDate: null,
      expiryDate: "2024-12-31",
      gaps: 76,
      risks: 15
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "status-success",
      "In Progress": "status-warning",
      "Planning": "status-info",
      "Expired": "status-danger",
      "Suspended": "status-muted"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getMaturityColor = (level: string) => {
    if (level.includes("Level 4") || level.includes("Level 5")) return "status-success";
    if (level.includes("Level 3")) return "status-warning";
    if (level.includes("Level 2")) return "status-info";
    return "status-danger";
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    if (score >= 50) return "text-info";
    return "text-danger";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Active": CheckCircle,
      "In Progress": Clock,
      "Planning": Settings,
      "Expired": AlertTriangle,
      "Suspended": Clock
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || framework.status === statusFilter;
    const matchesType = typeFilter === "all" || framework.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const frameworkStats = {
    total: frameworks.length,
    active: frameworks.filter(f => f.status === "Active").length,
    inProgress: frameworks.filter(f => f.status === "In Progress").length,
    avgCompliance: Math.round(frameworks.reduce((sum, f) => sum + f.complianceScore, 0) / frameworks.length)
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Frameworks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor compliance with regulatory frameworks and industry standards
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Framework
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Compliance Framework</DialogTitle>
                <DialogDescription>
                  Configure a new compliance framework for monitoring and assessment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework-name">Framework Name *</Label>
                    <Input id="framework-name" placeholder="e.g., SOC 2 Type II" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="framework-type">Framework Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="privacy">Privacy</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="industry-specific">Industry Specific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner">Framework Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign owner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                        <SelectItem value="lisa-davis">Lisa Davis</SelectItem>
                        <SelectItem value="alex-brown">Alex Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-date">Target Compliance Date</Label>
                    <Input id="target-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe the framework requirements and compliance objectives..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button>Add Framework</Button>
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
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-success">{frameworkStats.active}</p>
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
                <p className="text-3xl font-bold text-info">{frameworkStats.avgCompliance}%</p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="enterprise-card">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search frameworks by name, ID, or description..."
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
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Privacy">Privacy</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="Information Security">Information Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Frameworks Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Compliance Frameworks ({filteredFrameworks.length})</CardTitle>
          <CardDescription>
            Monitor compliance status and maturity across all regulatory frameworks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Framework</th>
                  <th>Type & Description</th>
                  <th>Status</th>
                  <th>Compliance Score</th>
                  <th>Controls</th>
                  <th>Maturity Level</th>
                  <th>Owner</th>
                  <th>Next Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFrameworks.map((framework) => (
                  <tr key={framework.id}>
                    <td>
                      <div>
                        <div className="font-medium text-primary">{framework.name}</div>
                        <div className="text-xs text-muted-foreground">{framework.id}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">{framework.type}</Badge>
                        <div className="text-xs text-muted-foreground max-w-xs">
                          {framework.description}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(framework.status)}
                        <Badge className={`status-badge ${getStatusColor(framework.status)}`}>
                          {framework.status}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(framework.complianceScore)}`}>
                          {framework.complianceScore}%
                        </div>
                        <Progress value={framework.complianceScore} className="h-2" />
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {framework.implementedControls}/{framework.totalControls}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {framework.gaps} gaps, {framework.risks} risks
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge className={`status-badge ${getMaturityColor(framework.maturityLevel)} text-xs`}>
                        {framework.maturityLevel}
                      </Badge>
                    </td>
                    <td>
                      <div className="text-sm">{framework.owner}</div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>{framework.nextReview}</div>
                        {framework.expiryDate !== "Ongoing" && (
                          <div className="text-xs text-muted-foreground">
                            Expires: {framework.expiryDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}