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
import { 
  FileText, 
  Plus, 
  Search, 
  Download,
  Upload,
  Edit,
  Eye,
  Trash2,
  FolderOpen,
  File,
  Image,
  Video,
  Archive,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

export default function EvidenceRepository() {
  const { evidence, addEvidence, updateEvidence, deleteEvidence } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvidence, setEditingEvidence] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    owner: "",
    framework: "",
    control: "",
    status: "Pending",
    confidentiality: "Internal",
    tags: "" as string | string[]
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "",
      category: "",
      owner: "",
      framework: "",
      control: "",
      status: "Pending",
      confidentiality: "Internal",
      tags: ""
    });
    setEditingEvidence(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.category || !formData.owner) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const evidenceData = {
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      version: "1.0",
      fileSize: "1.2 MB", // Mock file size
      tags: typeof formData.tags === 'string' ? 
            formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0) : 
            formData.tags
    };

    if (editingEvidence) {
      updateEvidence(editingEvidence.id, evidenceData);
      toast({
        title: "Success",
        description: "Evidence updated successfully",
      });
    } else {
      addEvidence(evidenceData);
      toast({
        title: "Success",
        description: "Evidence added successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (evidence: any) => {
    setEditingEvidence(evidence);
    setFormData({
      title: evidence.title,
      description: evidence.description,
      type: evidence.type,
      category: evidence.category,
      owner: evidence.owner,
      framework: evidence.framework,
      control: evidence.control,
      status: evidence.status,
      confidentiality: evidence.confidentiality,
      tags: evidence.tags || []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (evidenceId: string) => {
    if (window.confirm('Are you sure you want to delete this evidence?')) {
      deleteEvidence(evidenceId);
      toast({
        title: "Success",
        description: "Evidence deleted successfully",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      "Document": FileText,
      "Image": Image,
      "Video": Video,
      "Archive": Archive,
      "Spreadsheet": File,
      "Certificate": CheckCircle
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Approved": "status-success",
      "Pending": "status-warning",
      "Under Review": "status-info",
      "Rejected": "status-danger",
      "Archived": "status-secondary"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getConfidentialityColor = (level: string) => {
    const colors = {
      "Public": "status-success",
      "Internal": "status-info",
      "Confidential": "status-warning",
      "Restricted": "status-danger"
    };
    return colors[level as keyof typeof colors] || "status-info";
  };

  const filteredEvidence = evidence.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const evidenceStats = {
    total: evidence.length,
    approved: evidence.filter(e => e.status === "Approved").length,
    pending: evidence.filter(e => e.status === "Pending").length,
    underReview: evidence.filter(e => e.status === "Under Review").length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Evidence Repository</h1>
          <p className="text-muted-foreground mt-2">
            Centralized repository for audit evidence, compliance artifacts, and supporting documentation
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Evidence
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Evidence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingEvidence ? 'Edit Evidence' : 'Add New Evidence'}</DialogTitle>
                <DialogDescription>
                  {editingEvidence ? 'Update evidence details' : 'Add new evidence to the compliance repository'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evidence-title">Title *</Label>
                    <Input 
                      id="evidence-title" 
                      placeholder="Evidence title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evidence-type">Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Image">Image</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Archive">Archive</SelectItem>
                        <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evidence-category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="Process">Process</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Audit">Audit</SelectItem>
                        <SelectItem value="Certification">Certification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evidence-owner">Owner *</Label>
                    <Input 
                      id="evidence-owner" 
                      placeholder="Evidence owner"
                      value={formData.owner}
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <Select value={formData.framework} onValueChange={(value) => setFormData({...formData, framework: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                        <SelectItem value="SOC 2">SOC 2</SelectItem>
                        <SelectItem value="GDPR">GDPR</SelectItem>
                        <SelectItem value="NIST CSF">NIST CSF</SelectItem>
                        <SelectItem value="PCI DSS">PCI DSS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="control">Control Reference</Label>
                    <Input 
                      id="control" 
                      placeholder="e.g., A.5.1.1"
                      value={formData.control}
                      onChange={(e) => setFormData({...formData, control: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confidentiality">Confidentiality</Label>
                    <Select value={formData.confidentiality} onValueChange={(value) => setFormData({...formData, confidentiality: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Internal">Internal</SelectItem>
                        <SelectItem value="Confidential">Confidential</SelectItem>
                        <SelectItem value="Restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evidence-description">Description</Label>
                  <Textarea 
                    id="evidence-description"
                    placeholder="Brief description of the evidence..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="e.g., audit, security, compliance"
                    value={Array.isArray(formData.tags) ? formData.tags.join(', ') : String(formData.tags || '')}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEvidence ? 'Update Evidence' : 'Add Evidence'}
                  </Button>
                </div>
              </form>
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
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold text-warning">{evidenceStats.pending}</p>
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
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-3xl font-bold text-info">{evidenceStats.underReview}</p>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Repository */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Evidence Library ({filteredEvidence.length})</CardTitle>
          <CardDescription>
            Repository of all compliance evidence and supporting documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search evidence by title or description..."
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
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Archive">Archive</SelectItem>
                  <SelectItem value="Certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEvidence.map((item) => (
              <div key={item.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`status-badge ${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <Badge className={`status-badge ${getConfidentialityColor(item.confidentiality)} text-xs`}>
                            {item.confidentiality}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Owner:</span>
                        <div className="font-medium">{item.owner}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Framework:</span>
                        <div className="font-medium">{item.framework || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Control:</span>
                        <div className="font-medium">{item.control || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <div className="font-medium">{item.createdDate}</div>
                      </div>
                    </div>
                    
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredEvidence.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No evidence found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}