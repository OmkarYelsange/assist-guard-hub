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
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
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
  RefreshCw,
  Trash2
} from "lucide-react";

export default function PolicyManagement() {
  const { policies, addPolicy, updatePolicy, deletePolicy } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    version: "1.0",
    category: "",
    owner: "",
    approvedBy: "",
    effectiveDate: "",
    reviewDate: "",
    tags: "" as string | string[],
    status: "Draft"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      version: "1.0", 
      category: "",
      owner: "",
      approvedBy: "",
      effectiveDate: "",
      reviewDate: "",
      tags: "",
      status: "Draft"
    });
    setEditingPolicy(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.owner) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const policyData = {
      ...formData,
      lastModified: new Date().toISOString().split('T')[0],
      tags: typeof formData.tags === 'string' ? 
            formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0) : 
            formData.tags
    };

    if (editingPolicy) {
      updatePolicy(editingPolicy.id, policyData);
      toast({
        title: "Success",
        description: "Policy updated successfully",
      });
    } else {
      addPolicy(policyData);
      toast({
        title: "Success", 
        description: "Policy created successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (policy: any) => {
    setEditingPolicy(policy);
    setFormData({
      title: policy.title,
      description: policy.description,
      version: policy.version,
      category: policy.category,
      owner: policy.owner,
      approvedBy: policy.approvedBy,
      effectiveDate: policy.effectiveDate,
      reviewDate: policy.reviewDate,
      tags: policy.tags || [],
      status: policy.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      deletePolicy(policyId);
      toast({
        title: "Success",
        description: "Policy deleted successfully",
      });
    }
  };

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingPolicy ? 'Edit Policy' : 'Create New Policy'}</DialogTitle>
                <DialogDescription>
                  {editingPolicy ? 'Update policy details' : 'Create a new organizational policy or procedure document'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policy-title">Policy Title *</Label>
                    <Input 
                      id="policy-title" 
                      placeholder="Enter policy title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy-category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Data Protection">Data Protection</SelectItem>
                        <SelectItem value="Access Management">Access Management</SelectItem>
                        <SelectItem value="Business Continuity">Business Continuity</SelectItem>
                        <SelectItem value="Risk Management">Risk Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policy-owner">Policy Owner *</Label>
                    <Input 
                      id="policy-owner" 
                      placeholder="Policy owner"
                      value={formData.owner}
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approved-by">Approved By</Label>
                    <Input 
                      id="approved-by" 
                      placeholder="Approver name"
                      value={formData.approvedBy}
                      onChange={(e) => setFormData({...formData, approvedBy: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="effective-date">Effective Date</Label>
                    <Input 
                      id="effective-date" 
                      type="date"
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-date">Review Date</Label>
                    <Input 
                      id="review-date" 
                      type="date"
                      value={formData.reviewDate}
                      onChange={(e) => setFormData({...formData, reviewDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input 
                      id="version" 
                      placeholder="e.g., 1.0"
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-description">Description *</Label>
                  <Textarea 
                    id="policy-description"
                    placeholder="Brief description of the policy purpose and scope..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="e.g., Security, Compliance, Privacy"
                    value={Array.isArray(formData.tags) ? formData.tags.join(', ') : String(formData.tags || '')}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingPolicy ? 'Update Policy' : 'Create Policy'}
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

      {/* Policy Library */}
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
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-lg">{policy.title}</h3>
                      <Badge className={`status-badge ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        v{policy.version}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {policy.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Owner:</span>
                        <div className="font-medium">{policy.owner}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Effective Date:</span>
                        <div className="font-medium">{policy.effectiveDate || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Modified:</span>
                        <div className="font-medium">{policy.lastModified}</div>
                      </div>
                    </div>
                    
                    {policy.tags && policy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {policy.tags.map((tag, index) => (
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
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(policy)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(policy.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPolicies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No policies found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}