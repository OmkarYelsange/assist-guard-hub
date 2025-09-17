import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FolderOpen, 
  Plus, 
  Search, 
  FileText,
  Calendar,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Image,
  Video,
  Archive,
  Link
} from "lucide-react";

export default function EvidenceRepository() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [frameworkFilter, setFrameworkFilter] = useState("all");

  const evidenceItems = [
    {
      id: "EV-2024-001",
      title: "SOC 2 Security Policy Documentation",
      type: "Policy Document",
      framework: "SOC 2",
      control: "CC6.1 - Security Policies",
      fileType: "PDF",
      fileSize: "2.4 MB",
      uploadDate: "2024-01-15",
      expiryDate: "2025-01-15",
      owner: "Sarah Johnson",
      reviewer: "Mike Wilson",
      status: "Approved",
      version: "v2.1",
      description: "Comprehensive security policies and procedures documentation for SOC 2 compliance",
      tags: ["Security", "Policies", "SOC2", "Access Control"],
      lastModified: "2024-01-15 14:30:00",
      auditTrail: 8
    },
    {
      id: "EV-2024-002",
      title: "Vulnerability Assessment Report Q4 2023", 
      type: "Assessment Report",
      framework: "ISO 27001",
      control: "A.12.6.1 - Vulnerability Management",
      fileType: "PDF",
      fileSize: "15.7 MB", 
      uploadDate: "2024-01-10",
      expiryDate: "2024-07-10",
      owner: "Alex Brown",
      reviewer: "Lisa Davis",
      status: "Under Review",
      version: "v1.0",
      description: "Quarterly vulnerability assessment and penetration testing results",
      tags: ["Vulnerability", "Assessment", "ISO27001", "Security Testing"],
      lastModified: "2024-01-10 09:15:00",
      auditTrail: 3
    },
    {
      id: "EV-2024-003",
      title: "Employee Security Training Records",
      type: "Training Record",
      framework: "GDPR",
      control: "Art. 39 - Data Protection Training",
      fileType: "Excel",
      fileSize: "847 KB",
      uploadDate: "2024-01-08",
      expiryDate: "2025-01-08",
      owner: "HR Department",
      reviewer: "Lisa Davis",
      status: "Approved",
      version: "v1.3",
      description: "Comprehensive training records for data protection and security awareness",
      tags: ["Training", "GDPR", "Privacy", "Employee Records"],
      lastModified: "2024-01-08 16:45:00",
      auditTrail: 12
    },
    {
      id: "EV-2024-004",
      title: "Network Architecture Diagram",
      type: "Technical Documentation",
      framework: "NIST CSF",
      control: "ID.AM-3 - Asset Management",
      fileType: "Visio",
      fileSize: "3.2 MB",
      uploadDate: "2024-01-05",
      expiryDate: "2024-06-05",
      owner: "IT Infrastructure",
      reviewer: "Mike Wilson",
      status: "Expired",
      version: "v2.0",
      description: "Current network topology and security architecture documentation",
      tags: ["Network", "Architecture", "NIST", "Infrastructure"],
      lastModified: "2023-12-20 11:20:00",
      auditTrail: 5
    },
    {
      id: "EV-2024-005",
      title: "Incident Response Procedure Screenshots",
      type: "Process Evidence",
      framework: "SOC 2",
      control: "CC7.4 - Incident Management",
      fileType: "Images",
      fileSize: "4.1 MB",
      uploadDate: "2024-01-12",
      expiryDate: null,
      owner: "Security Team",
      reviewer: "Sarah Johnson",
      status: "Draft",
      version: "v1.0",
      description: "Step-by-step screenshots demonstrating incident response procedures",
      tags: ["Incident Response", "Process", "SOC2", "Screenshots"],
      lastModified: "2024-01-12 13:10:00",
      auditTrail: 2
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Approved": "status-success",
      "Under Review": "status-warning",
      "Draft": "status-info",
      "Expired": "status-danger",
      "Rejected": "status-danger"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getFileTypeIcon = (fileType: string) => {
    const icons = {
      "PDF": FileText,
      "Excel": FileText,
      "Word": FileText,
      "Visio": FileText,
      "Images": Image,
      "Video": Video,
      "Archive": Archive,
      "Link": Link
    };
    const Icon = icons[fileType as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Approved": CheckCircle,
      "Under Review": Clock,
      "Draft": Clock,
      "Expired": AlertTriangle,
      "Rejected": AlertTriangle
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesFramework = frameworkFilter === "all" || item.framework === frameworkFilter;
    
    return matchesSearch && matchesType && matchesFramework;
  });

  const evidenceStats = {
    total: evidenceItems.length,
    approved: evidenceItems.filter(e => e.status === "Approved").length,
    underReview: evidenceItems.filter(e => e.status === "Under Review").length,
    expired: evidenceItems.filter(e => e.status === "Expired").length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Evidence Repository</h1>
          <p className="text-muted-foreground mt-2">
            Centralized repository for compliance evidence, documentation, and audit artifacts
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Upload className="h-4 w-4 mr-2" />
                Upload Evidence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Evidence</DialogTitle>
                <DialogDescription>
                  Upload and categorize new compliance evidence or documentation
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evidence-title">Evidence Title *</Label>
                    <Input id="evidence-title" placeholder="e.g., Security Policy Documentation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evidence-type">Evidence Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy Document</SelectItem>
                        <SelectItem value="assessment">Assessment Report</SelectItem>
                        <SelectItem value="training">Training Record</SelectItem>
                        <SelectItem value="technical">Technical Documentation</SelectItem>
                        <SelectItem value="process">Process Evidence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soc2">SOC 2</SelectItem>
                        <SelectItem value="iso27001">ISO 27001</SelectItem>
                        <SelectItem value="gdpr">GDPR</SelectItem>
                        <SelectItem value="nist">NIST CSF</SelectItem>
                        <SelectItem value="pci">PCI DSS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="control">Control Reference</Label>
                    <Input id="control" placeholder="e.g., CC6.1 - Security Policies" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner">Document Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign owner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                        <SelectItem value="alex-brown">Alex Brown</SelectItem>
                        <SelectItem value="lisa-davis">Lisa Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">File Upload *</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-2">
                      <Button variant="outline">Choose File</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports PDF, DOC, XLS, images, and more. Max size: 50MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe the evidence content and its relevance to compliance requirements..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., Security, Policies, SOC2, Access Control" />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button>Upload Evidence</Button>
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
                <p className="text-sm text-muted-foreground">Total Evidence</p>
                <p className="text-3xl font-bold text-primary">{evidenceStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold text-success">{evidenceStats.approved}</p>
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
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-3xl font-bold text-warning">{evidenceStats.underReview}</p>
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
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-3xl font-bold text-danger">{evidenceStats.expired}</p>
              </div>
              <div className="p-3 bg-danger/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-danger" />
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
                  placeholder="Search evidence by title, ID, control, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Policy Document">Policy Document</SelectItem>
                  <SelectItem value="Assessment Report">Assessment Report</SelectItem>
                  <SelectItem value="Training Record">Training Record</SelectItem>
                  <SelectItem value="Technical Documentation">Technical Documentation</SelectItem>
                  <SelectItem value="Process Evidence">Process Evidence</SelectItem>
                </SelectContent>
              </Select>

              <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frameworks</SelectItem>
                  <SelectItem value="SOC 2">SOC 2</SelectItem>
                  <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                  <SelectItem value="GDPR">GDPR</SelectItem>
                  <SelectItem value="NIST CSF">NIST CSF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Evidence Repository ({filteredEvidence.length})</CardTitle>
          <CardDescription>
            Manage and track all compliance evidence and supporting documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Evidence ID</th>
                  <th>Title & Control</th>
                  <th>Type</th>
                  <th>Framework</th>
                  <th>File Info</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Dates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvidence.map((evidence) => (
                  <tr key={evidence.id}>
                    <td>
                      <div className="font-medium text-primary">{evidence.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium text-sm mb-1">{evidence.title}</div>
                        <div className="text-xs text-muted-foreground mb-1">{evidence.control}</div>
                        <div className="flex flex-wrap gap-1">
                          {evidence.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {evidence.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{evidence.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="outline" className="text-xs">
                        {evidence.type}
                      </Badge>
                    </td>
                    <td>
                      <Badge className="status-badge status-info text-xs">
                        {evidence.framework}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getFileTypeIcon(evidence.fileType)}
                        <div className="text-sm">
                          <div className="font-medium">{evidence.fileType}</div>
                          <div className="text-xs text-muted-foreground">{evidence.fileSize}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(evidence.status)}
                        <Badge className={`status-badge ${getStatusColor(evidence.status)}`}>
                          {evidence.status}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>{evidence.owner}</div>
                        <div className="text-xs text-muted-foreground">v{evidence.version}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>Uploaded: {evidence.uploadDate}</div>
                        {evidence.expiryDate && (
                          <div className={`text-xs ${
                            new Date(evidence.expiryDate) < new Date() 
                              ? 'text-danger' 
                              : 'text-muted-foreground'
                          }`}>
                            Expires: {evidence.expiryDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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