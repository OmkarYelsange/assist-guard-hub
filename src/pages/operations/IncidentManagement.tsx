import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function IncidentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
    category: "",
    assignee: "",
    reporter: "SOC Team"
  });

  const { incidents, addIncident, updateIncident, deleteIncident } = useData();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const incidentData = {
      ...formData,
      status: "Investigating",
      dateReported: new Date().toISOString(),
      affectedSystems: [],
      timeToResolve: null
    };

    if (editingIncident) {
      updateIncident(editingIncident.id, incidentData);
      toast({
        title: "Incident Updated",
        description: "Incident has been successfully updated.",
      });
    } else {
      addIncident(incidentData);
      toast({
        title: "Incident Created",
        description: "New incident has been created and assigned.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      severity: "",
      category: "",
      assignee: "",
      reporter: "SOC Team"
    });
    setEditingIncident(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (incident: any) => {
    setEditingIncident(incident);
    setFormData({
      title: incident.title,
      description: incident.description,
      severity: incident.severity,
      category: incident.category,
      assignee: incident.assignee,
      reporter: incident.reporter
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (incidentId: string) => {
    deleteIncident(incidentId);
    toast({
      title: "Incident Deleted",
      description: "Incident has been removed from the system.",
      variant: "destructive"
    });
  };

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

  const getStatusIcon = (status: string) => {
    const icons = {
      "Investigating": AlertCircle,
      "In Progress": Clock,
      "Containment": AlertTriangle,
      "Mitigating": AlertTriangle,
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
    overdue: incidents.filter(i => i.status === "Investigating").length
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
          <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
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
                <p className="text-sm text-muted-foreground">Under Investigation</p>
                <p className="text-3xl font-bold text-info">{incidentStats.overdue}</p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-info" />
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
                  <th>Assignee</th>
                  <th>Reporter</th>
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
                    <td className="text-sm">{incident.assignee}</td>
                    <td className="text-sm">{incident.reporter}</td>
                    <td className="text-sm">{incident.dateReported?.split('T')[0]}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(incident)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(incident.id)}>
                          <Trash2 className="h-4 w-4" />
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingIncident ? "Edit Incident" : "Create New Incident"}</DialogTitle>
            <DialogDescription>
              {editingIncident ? "Update incident information" : "Report a new security incident for investigation and response"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incident-title">Incident Title *</Label>
                <Input 
                  id="incident-title" 
                  placeholder="Brief description of the incident"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity *</Label>
                <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Security Breach">Security Breach</SelectItem>
                    <SelectItem value="Malware">Malware</SelectItem>
                    <SelectItem value="Data Breach">Data Breach</SelectItem>
                    <SelectItem value="Network Attack">Network Attack</SelectItem>
                    <SelectItem value="Social Engineering">Social Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  placeholder="Assigned to..."
                  value={formData.assignee}
                  onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description"
                placeholder="Detailed description of the incident, including symptoms, affected systems, and initial observations..."
                className="min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              <Button type="submit">{editingIncident ? "Update Incident" : "Create Incident"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}