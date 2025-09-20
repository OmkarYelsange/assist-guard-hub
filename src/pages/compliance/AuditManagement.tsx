import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { Calendar, Users, FileText, Plus, Eye, CheckCircle, Clock, Edit, Trash2, Search } from "lucide-react";

export default function AuditManagement() {
  const { audits, addAudit, updateAudit, deleteAudit } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAudit, setEditingAudit] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    framework: "",
    scope: "",
    auditor: "",
    startDate: "",
    endDate: "",
    status: "Scheduled",
    findings: 0,
    compliance: 0,
    riskLevel: "Low"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      framework: "",
      scope: "",
      auditor: "",
      startDate: "",
      endDate: "",
      status: "Scheduled",
      findings: 0,
      compliance: 0,
      riskLevel: "Low"
    });
    setEditingAudit(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.framework || !formData.auditor) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingAudit) {
      updateAudit(editingAudit.id, formData);
      toast({
        title: "Success",
        description: "Audit updated successfully",
      });
    } else {
      addAudit(formData);
      toast({
        title: "Success",
        description: "Audit scheduled successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (audit: any) => {
    setEditingAudit(audit);
    setFormData({
      title: audit.title,
      framework: audit.framework,
      scope: audit.scope,
      auditor: audit.auditor,
      startDate: audit.startDate,
      endDate: audit.endDate,
      status: audit.status,
      findings: audit.findings,
      compliance: audit.compliance,
      riskLevel: audit.riskLevel
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (auditId: string) => {
    if (window.confirm('Are you sure you want to delete this audit?')) {
      deleteAudit(auditId);
      toast({
        title: "Success",
        description: "Audit deleted successfully",
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Scheduled": "status-success",
      "Planning": "status-info",
      "In Progress": "status-warning",
      "Completed": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.framework?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const auditStats = {
    scheduled: audits.filter(a => a.status === "Scheduled").length,
    inProgress: audits.filter(a => a.status === "In Progress").length,
    completed: audits.filter(a => a.status === "Completed").length
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Management</h1>
          <p className="text-muted-foreground mt-2">
            Plan, track, and manage compliance audits and assessments
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Audit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAudit ? 'Edit Audit' : 'Schedule New Audit'}</DialogTitle>
              <DialogDescription>
                {editingAudit ? 'Update audit details' : 'Schedule a new compliance audit or assessment'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audit-title">Audit Title *</Label>
                  <Input 
                    id="audit-title" 
                    placeholder="Enter audit title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework *</Label>
                  <Select value={formData.framework} onValueChange={(value) => setFormData({...formData, framework: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                      <SelectItem value="SOC 2 Type II">SOC 2 Type II</SelectItem>
                      <SelectItem value="GDPR">GDPR</SelectItem>
                      <SelectItem value="PCI DSS">PCI DSS</SelectItem>
                      <SelectItem value="NIST CSF">NIST CSF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">Scope</Label>
                <Textarea 
                  id="scope" 
                  placeholder="Describe the audit scope and focus areas"
                  value={formData.scope}
                  onChange={(e) => setFormData({...formData, scope: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="auditor">Auditor *</Label>
                  <Input 
                    id="auditor" 
                    placeholder="Auditor/Firm name"
                    value={formData.auditor}
                    onChange={(e) => setFormData({...formData, auditor: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input 
                    id="start-date" 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input 
                    id="end-date" 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="findings">Findings</Label>
                  <Input 
                    id="findings" 
                    type="number"
                    min="0"
                    value={formData.findings}
                    onChange={(e) => setFormData({...formData, findings: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compliance">Compliance %</Label>
                  <Input 
                    id="compliance" 
                    type="number"
                    min="0"
                    max="100"
                    value={formData.compliance}
                    onChange={(e) => setFormData({...formData, compliance: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk-level">Risk Level</Label>
                  <Select value={formData.riskLevel} onValueChange={(value) => setFormData({...formData, riskLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAudit ? 'Update Audit' : 'Schedule Audit'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">{auditStats.scheduled}</div>
            <p className="text-sm text-muted-foreground">Scheduled Audits</p>
          </CardContent>
        </Card>
        
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-warning mx-auto mb-3" />
            <div className="text-3xl font-bold text-warning mb-1">{auditStats.inProgress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
            <div className="text-3xl font-bold text-success mb-1">{auditStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed This Year</p>
          </CardContent>
        </Card>
      </div>

      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Audit Schedule</CardTitle>
          <CardDescription>Upcoming and recent compliance audits</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search audits by title or framework..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAudits.map((audit) => (
              <div key={audit.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{audit.title || `${audit.framework} Audit`}</h3>
                    <p className="text-sm text-muted-foreground">{audit.scope}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`status-badge ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Framework:</span>
                    <div className="font-medium">{audit.framework}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Auditor:</span>
                    <div className="font-medium">{audit.auditor}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dates:</span>
                    <div className="font-medium">{audit.startDate} - {audit.endDate}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Findings:</span>
                    <div className="font-medium">{audit.findings}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Compliance:</span>
                    <div className="font-medium">{audit.compliance}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Risk Level:</span>
                    <div className="font-medium">{audit.riskLevel}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(audit)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(audit.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {filteredAudits.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No audits found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}