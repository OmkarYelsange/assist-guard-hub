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
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Calendar,
  Target
} from "lucide-react";

export default function IncidentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const incidents = [
    {
      id: "INC-2024-001",
      title: "Suspicious Login Attempts Detected",
      description: "Multiple failed login attempts detected from suspicious IP addresses targeting administrative accounts.",
      severity: "Critical",
      status: "Investigating",
      priority: "P1",
      assignee: "John Smith",
      reporter: "SOC Team",
      category: "Security Breach",
      createdAt: "2024-01-15 09:30:00",
      updatedAt: "2024-01-15 14:22:00",
      sla: "2 hours remaining",
      impact: "High",
      urgency: "High",
      tags: ["Authentication", "Brute Force", "Critical Infrastructure"]
    },
    {
      id: "INC-2024-002",
      title: "Malware Detection in Email System",
      description: "Antivirus system detected malware in incoming email attachments. Quarantine measures activated.",
      severity: "High",
      status: "In Progress", 
      priority: "P2",
      assignee: "Sarah Johnson",
      reporter: "Email Security",
      category: "Malware",
      createdAt: "2024-01-15 08:15:00",
      updatedAt: "2024-01-15 13:45:00",
      sla: "6 hours remaining",
      impact: "Medium",
      urgency: "High",
      tags: ["Email", "Malware", "Quarantine"]
    },
    {
      id: "INC-2024-003",
      title: "Unauthorized Data Access Attempt",
      description: "Database monitoring detected unauthorized access attempts to customer data tables.",
      severity: "High",
      status: "Containment",
      priority: "P1", 
      assignee: "Mike Wilson",
      reporter: "DB Monitor",
      category: "Data Breach",
      createdAt: "2024-01-14 16:20:00",
      updatedAt: "2024-01-15 12:10:00",
      sla: "1 hour remaining",
      impact: "High",
      urgency: "Critical",
      tags: ["Database", "Privacy", "Customer Data"]
    },
    {
      id: "INC-2024-004",
      title: "DDoS Attack on Web Services",
      description: "Distributed denial of service attack targeting main web application causing service degradation.",
      severity: "Medium",
      status: "Mitigating",
      priority: "P2",
      assignee: "Alex Brown",
      reporter: "Network Team",
      category: "Network Attack",
      createdAt: "2024-01-14 11:30:00",
      updatedAt: "2024-01-15 10:15:00",
      sla: "4 hours remaining",
      impact: "Medium",
      urgency: "Medium",
      tags: ["Network", "DDoS", "Web Services"]
    },
    {
      id: "INC-2024-005",
      title: "Phishing Campaign Targeting Employees",
      description: "Coordinated phishing campaign detected targeting employee credentials with convincing fake login pages.",
      severity: "Medium",
      status: "Resolved",
      priority: "P3",
      assignee: "Lisa Davis",
      reporter: "Security Awareness",
      category: "Social Engineering",
      createdAt: "2024-01-13 14:45:00",
      updatedAt: "2024-01-14 16:30:00",
      sla: "Completed",
      impact: "Low",
      urgency: "Medium",
      tags: ["Phishing", "Social Engineering", "Training"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      "Critical": "status-danger",
      "High": "status-danger",
      "Medium": "status-warning", 
      "Low": "status-success"
    };
    return colors[severity as keyof typeof colors] || "status-info";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Investigating": "status-warning",
      "In Progress": "status-info",
      "Containment": "status-danger",
      "Mitigating": "status-warning",
      "Resolved": "status-success",
      "Closed": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "P1": "status-danger",
      "P2": "status-warning",
      "P3": "status-info",
      "P4": "status-success"
    };
    return colors[priority as keyof typeof colors] || "status-info";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Investigating": AlertCircle,
      "In Progress": Clock,
      "Containment": AlertTriangle,
      "Mitigating": Target,
      "Resolved": CheckCircle,
      "Closed": XCircle
    };
    const Icon = icons[status as keyof typeof icons] || AlertCircle;
    return <Icon className="h-4 w-4" />;
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const incidentStats = {
    total: incidents.length,
    critical: incidents.filter(i => i.severity === "Critical").length,
    open: incidents.filter(i => !["Resolved", "Closed"].includes(i.status)).length,
    overdue: incidents.filter(i => i.sla.includes("remaining") && parseInt(i.sla) < 2).length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
          <p className="text-muted-foreground mt-2">
            Track, investigate, and resolve security incidents across your organization
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
                Create Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Incident</DialogTitle>
                <DialogDescription>
                  Report a new security incident for investigation and response
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-title">Incident Title *</Label>
                    <Input id="incident-title" placeholder="Brief description of the incident" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security-breach">Security Breach</SelectItem>
                        <SelectItem value="malware">Malware</SelectItem>
                        <SelectItem value="data-breach">Data Breach</SelectItem>
                        <SelectItem value="network-attack">Network Attack</SelectItem>
                        <SelectItem value="social-engineering">Social Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                        <SelectItem value="alex-brown">Alex Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Detailed description of the incident, including symptoms, affected systems, and initial observations..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button>Create Incident</Button>
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
                <p className="text-sm text-muted-foreground">Total Incidents</p>
                <p className="text-3xl font-bold text-primary">{incidentStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Incidents</p>
                <p className="text-3xl font-bold text-danger">{incidentStats.critical}</p>
              </div>
              <div className="p-3 bg-danger/10 rounded-lg">
                <XCircle className="h-6 w-6 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
                <p className="text-3xl font-bold text-warning">{incidentStats.open}</p>
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
                <p className="text-sm text-muted-foreground">Overdue SLA</p>
                <p className="text-3xl font-bold text-danger">{incidentStats.overdue}</p>
              </div>
              <div className="p-3 bg-danger/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-danger" />
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
                  placeholder="Search incidents by ID, title, or category..."
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
                  <SelectItem value="Investigating">Investigating</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Containment">Containment</SelectItem>
                  <SelectItem value="Mitigating">Mitigating</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Active Incidents ({filteredIncidents.length})</CardTitle>
          <CardDescription>
            Manage and track all security incidents with real-time status updates
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Title & Category</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>SLA</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <div className="font-medium text-primary">{incident.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium text-sm mb-1">{incident.title}</div>
                        <Badge variant="outline" className="text-xs">
                          {incident.category}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Badge className={`status-badge ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(incident.status)}
                        <Badge className={`status-badge ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Badge className={`status-badge ${getPriorityColor(incident.priority)}`}>
                        {incident.priority}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{incident.assignee}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <span className={
                          incident.sla.includes("remaining") && parseInt(incident.sla) < 2 
                            ? "text-danger font-medium" 
                            : "text-muted-foreground"
                        }>
                          {incident.sla}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-muted-foreground">
                        <div>{incident.createdAt.split(' ')[0]}</div>
                        <div>{incident.createdAt.split(' ')[1]}</div>
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