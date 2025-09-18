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
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Plus, 
  Search, 
  Shield,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  TrendingUp,
  Trash2
} from "lucide-react";

export default function TreatmentPlans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    riskId: "",
    riskTitle: "",
    treatmentType: "",
    priority: "",
    owner: "",
    budget: "",
    targetDate: "",
    description: ""
  });

  const { treatmentPlans, addTreatmentPlan, updateTreatmentPlan, deleteTreatmentPlan, risks } = useData();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const planData = {
      title: formData.title,
      riskId: formData.riskId,
      riskTitle: formData.riskTitle,
      treatmentType: formData.treatmentType,
      status: "Planning",
      progress: 0,
      priority: formData.priority,
      owner: formData.owner,
      budget: formData.budget,
      budgetUsed: "$0",
      startDate: new Date().toISOString().split('T')[0],
      targetDate: formData.targetDate,
      controls: [],
      milestones: 5,
      completedMilestones: 0,
      effectiveness: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingPlan) {
      updateTreatmentPlan(editingPlan.id, planData);
      toast({
        title: "Treatment Plan Updated",
        description: "The treatment plan has been successfully updated.",
      });
    } else {
      addTreatmentPlan(planData);
      toast({
        title: "Treatment Plan Created",
        description: "New treatment plan has been successfully created.",
      });
    }

    setIsDialogOpen(false);
    setEditingPlan(null);
    setFormData({
      title: "",
      riskId: "",
      riskTitle: "",
      treatmentType: "",
      priority: "",
      owner: "",
      budget: "",
      targetDate: "",
      description: ""
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      riskId: plan.riskId,
      riskTitle: plan.riskTitle,
      treatmentType: plan.treatmentType,
      priority: plan.priority,
      owner: plan.owner,
      budget: plan.budget,
      targetDate: plan.targetDate,
      description: plan.description || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTreatmentPlan(id);
    toast({
      title: "Treatment Plan Deleted",
      description: "The treatment plan has been successfully deleted.",
      variant: "destructive"
    });
  };

  const resetForm = () => {
    setEditingPlan(null);
    setFormData({
      title: "",
      riskId: "",
      riskTitle: "",
      treatmentType: "",
      priority: "",
      owner: "",
      budget: "",
      targetDate: "",
      description: ""
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Planning": "status-info",
      "In Progress": "status-warning",
      "Review": "status-warning", 
      "Completed": "status-success",
      "Overdue": "status-danger",
      "On Hold": "status-muted"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getTreatmentColor = (type: string) => {
    const colors = {
      "Mitigate": "status-warning",
      "Transfer": "status-info",
      "Accept": "status-success", 
      "Avoid": "status-danger"
    };
    return colors[type as keyof typeof colors] || "status-info";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Critical": "status-danger",
      "High": "status-danger",
      "Medium": "status-warning",
      "Low": "status-success"
    };
    return colors[priority as keyof typeof colors] || "status-info";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Planning": Clock,
      "In Progress": Target,
      "Review": Eye,
      "Completed": CheckCircle,
      "Overdue": AlertTriangle,
      "On Hold": Clock
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const filteredPlans = treatmentPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.riskTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter;
    const matchesTreatment = treatmentFilter === "all" || plan.treatmentType === treatmentFilter;
    
    return matchesSearch && matchesStatus && matchesTreatment;
  });

  const planStats = {
    total: treatmentPlans.length,
    inProgress: treatmentPlans.filter(p => p.status === "In Progress").length,
    completed: treatmentPlans.filter(p => p.status === "Completed").length,
    overdue: treatmentPlans.filter(p => p.status === "Overdue").length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Treatment Plans</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track risk treatment initiatives and control implementations
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Plans
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Treatment Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? "Edit Treatment Plan" : "Create New Treatment Plan"}
                </DialogTitle>
                <DialogDescription>
                  Define a comprehensive plan to treat identified risks through appropriate controls
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-title">Treatment Plan Title *</Label>
                    <Input 
                      id="plan-title" 
                      placeholder="e.g., Multi-Factor Authentication Implementation"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk-selection">Associated Risk *</Label>
                    <Select 
                      value={formData.riskId} 
                      onValueChange={(value) => {
                        const selectedRisk = risks.find(r => r.id === value);
                        setFormData({
                          ...formData, 
                          riskId: value,
                          riskTitle: selectedRisk ? selectedRisk.title : ""
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk to treat" />
                      </SelectTrigger>
                      <SelectContent>
                        {risks.map(risk => (
                          <SelectItem key={risk.id} value={risk.id}>
                            {risk.id} - {risk.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="treatment-type">Treatment Type *</Label>
                    <Select 
                      value={formData.treatmentType} 
                      onValueChange={(value) => setFormData({...formData, treatmentType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mitigate">Mitigate</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Accept">Accept</SelectItem>
                        <SelectItem value="Avoid">Avoid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => setFormData({...formData, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Plan Owner</Label>
                    <Select 
                      value={formData.owner} 
                      onValueChange={(value) => setFormData({...formData, owner: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Assign owner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT Security Team">IT Security Team</SelectItem>
                        <SelectItem value="Vendor Management">Vendor Management</SelectItem>
                        <SelectItem value="HR Security">HR Security</SelectItem>
                        <SelectItem value="Cloud Team">Cloud Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input 
                      id="budget" 
                      placeholder="$0"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-date">Target Completion Date</Label>
                    <Input 
                      id="target-date" 
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Treatment Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe the treatment approach, controls to be implemented, and expected outcomes..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingPlan ? "Update Plan" : "Create Treatment Plan"}
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
                <p className="text-sm text-muted-foreground">Total Plans</p>
                <p className="text-3xl font-bold text-primary">{planStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-warning">{planStats.inProgress}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Target className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-success">{planStats.completed}</p>
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
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-3xl font-bold text-danger">{planStats.overdue}</p>
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
                  placeholder="Search treatment plans by title, ID, or risk..."
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
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Treatments</SelectItem>
                  <SelectItem value="Mitigate">Mitigate</SelectItem>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                  <SelectItem value="Accept">Accept</SelectItem>
                  <SelectItem value="Avoid">Avoid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Plans Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Treatment Plans ({filteredPlans.length})</CardTitle>
          <CardDescription>
            Monitor implementation progress and effectiveness of risk treatment initiatives
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Plan ID</th>
                  <th>Title & Risk</th>
                  <th>Treatment</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Budget</th>
                  <th>Owner</th>
                  <th>Target Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>
                      <div className="font-medium text-primary">{plan.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium text-sm mb-1">{plan.title}</div>
                        <div className="text-xs text-muted-foreground mb-1">{plan.riskId} - {plan.riskTitle}</div>
                        <Badge className={`status-badge ${getPriorityColor(plan.priority)} text-xs`}>
                          {plan.priority}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Badge className={`status-badge ${getTreatmentColor(plan.treatmentType)}`}>
                        {plan.treatmentType}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(plan.status)}
                        <Badge className={`status-badge ${getStatusColor(plan.status)}`}>
                          {plan.status}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-2">
                        <Progress value={plan.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {plan.completedMilestones}/{plan.milestones} milestones ({plan.progress}%)
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="font-medium">{plan.budget}</div>
                        <div className="text-xs text-muted-foreground">
                          Used: {plan.budgetUsed}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{plan.owner}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>{plan.targetDate}</div>
                        {plan.actualCompletion && (
                          <div className="text-xs text-success">
                            Completed: {plan.actualCompletion}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(plan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(plan.id)}
                          className="text-danger hover:text-danger"
                        >
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
    </div>
  );
}
