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
import { Database, Plus, Search, AlertTriangle, TrendingUp, Eye, Edit, Trash2 } from "lucide-react";

export default function RiskRegister() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    likelihood: "",
    impact: "",
    owner: "",
    mitigation: ""
  });

  const { risks, addRisk, updateRisk, deleteRisk } = useData();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const riskScore = calculateRiskScore(formData.likelihood, formData.impact);
    const riskData = {
      ...formData,
      riskScore,
      status: "Active",
      dateIdentified: new Date().toISOString().split('T')[0],
      lastReviewed: new Date().toISOString().split('T')[0],
      residualRisk: formData.likelihood === "High" && formData.impact === "Critical" ? "High" : "Medium"
    };

    if (editingRisk) {
      updateRisk(editingRisk.id, riskData);
      toast({
        title: "Risk Updated",
        description: "Risk has been successfully updated.",
      });
    } else {
      addRisk(riskData);
      toast({
        title: "Risk Added",
        description: "New risk has been added to the register.",
      });
    }

    resetForm();
  };

  const calculateRiskScore = (likelihood: string, impact: string) => {
    const likelihoodValues = { "Low": 1, "Medium": 2, "High": 3 };
    const impactValues = { "Low": 1, "Medium": 2, "High": 3, "Critical": 4 };
    return (likelihoodValues[likelihood] || 1) * (impactValues[impact] || 1) * 1.5;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      likelihood: "",
      impact: "",
      owner: "",
      mitigation: ""
    });
    setEditingRisk(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (risk) => {
    setEditingRisk(risk);
    setFormData({
      title: risk.title,
      description: risk.description,
      category: risk.category,
      likelihood: risk.likelihood,
      impact: risk.impact,
      owner: risk.owner,
      mitigation: risk.mitigation
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (riskId: string) => {
    deleteRisk(riskId);
    toast({
      title: "Risk Deleted",
      description: "Risk has been removed from the register.",
      variant: "destructive"
    });
  };

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || risk.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRiskColor = (score: number) => {
    if (score >= 8) return "text-danger";
    if (score >= 6) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Register</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive inventory of organizational risks and their management
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      <Card className="enterprise-card">
        <CardContent className="p-6">
          <div className="flex space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search risks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Controlled">Controlled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Title & Category</th>
                  <th>Risk Score</th>
                  <th>Probability</th>
                  <th>Impact</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Treatment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.map((risk) => (
                  <tr key={risk.id}>
                    <td className="font-medium">{risk.id}</td>
                    <td>
                      <div className="font-medium">{risk.title}</div>
                      <Badge variant="outline" className="text-xs mt-1">{risk.category}</Badge>
                    </td>
                    <td>
                      <span className={`text-2xl font-bold ${getRiskColor(risk.riskScore)}`}>
                        {risk.riskScore}
                      </span>
                    </td>
                    <td>
                      <Badge className={`status-badge ${risk.likelihood === 'High' ? 'status-danger' : risk.likelihood === 'Medium' ? 'status-warning' : 'status-success'}`}>
                        {risk.likelihood}
                      </Badge>
                    </td>
                    <td>
                      <Badge className={`status-badge ${risk.impact === 'Critical' ? 'status-danger' : risk.impact === 'High' ? 'status-danger' : 'status-warning'}`}>
                        {risk.impact}
                      </Badge>
                    </td>
                    <td className="text-sm">{risk.owner}</td>
                    <td>
                      <Badge className={`status-badge ${risk.status === 'Active' ? 'status-danger' : risk.status === 'Monitoring' ? 'status-warning' : 'status-success'}`}>
                        {risk.status}
                      </Badge>
                    </td>
                    <td className="text-sm">{risk.residualRisk}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(risk)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(risk.id)}>
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

      {/* Add/Edit Risk Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRisk ? "Edit Risk" : "Add New Risk"}</DialogTitle>
            <DialogDescription>
              {editingRisk ? "Update risk information" : "Create a new risk entry in the register"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Risk Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter risk title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of the risk"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="likelihood">Likelihood *</Label>
                <Select value={formData.likelihood} onValueChange={(value) => setFormData({...formData, likelihood: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select likelihood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact">Impact *</Label>
                <Select value={formData.impact} onValueChange={(value) => setFormData({...formData, impact: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Risk Owner *</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  placeholder="Risk owner/responsible team"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mitigation">Mitigation Strategy</Label>
              <Textarea
                id="mitigation"
                value={formData.mitigation}
                onChange={(e) => setFormData({...formData, mitigation: e.target.value})}
                placeholder="Describe mitigation measures and controls"
                className="min-h-[80px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingRisk ? "Update Risk" : "Add Risk"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}