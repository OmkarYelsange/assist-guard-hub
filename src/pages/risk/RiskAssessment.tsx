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
  Calculator, 
  Plus, 
  Search, 
  FileText,
  Calendar,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Download
} from "lucide-react";

export default function RiskAssessment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const assessments = [
    {
      id: "RA-2024-001",
      name: "Annual Cybersecurity Risk Assessment",
      scope: "IT Infrastructure & Data Security",
      methodology: "NIST RMF",
      status: "In Progress",
      progress: 75,
      assessor: "Sarah Johnson",
      startDate: "2024-01-01",
      dueDate: "2024-03-15",
      risksIdentified: 24,
      criticalRisks: 3,
      highRisks: 8,
      mediumRisks: 10,
      lowRisks: 3,
      lastUpdated: "2024-01-15"
    },
    {
      id: "RA-2024-002", 
      name: "Third-Party Vendor Risk Assessment",
      scope: "Vendor Management & Supply Chain",
      methodology: "SIG Lite",
      status: "Planning",
      progress: 25,
      assessor: "Mike Wilson",
      startDate: "2024-02-01",
      dueDate: "2024-04-30",
      risksIdentified: 0,
      criticalRisks: 0,
      highRisks: 0,
      mediumRisks: 0,
      lowRisks: 0,
      lastUpdated: "2024-01-10"
    },
    {
      id: "RA-2024-003",
      name: "Cloud Infrastructure Assessment",
      scope: "AWS & Azure Cloud Services",
      methodology: "CSCC CCM",
      status: "Completed",
      progress: 100,
      assessor: "Alex Brown",
      startDate: "2023-11-01", 
      dueDate: "2023-12-31",
      risksIdentified: 15,
      criticalRisks: 1,
      highRisks: 4,
      mediumRisks: 7,
      lowRisks: 3,
      lastUpdated: "2023-12-31"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Planning": "status-info",
      "In Progress": "status-warning", 
      "Review": "status-warning",
      "Completed": "status-success",
      "Overdue": "status-danger"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Planning": Clock,
      "In Progress": Target,
      "Review": Eye,
      "Completed": CheckCircle,
      "Overdue": AlertTriangle
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.scope.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || assessment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const assessmentStats = {
    total: assessments.length,
    inProgress: assessments.filter(a => a.status === "In Progress").length,
    completed: assessments.filter(a => a.status === "Completed").length,
    overdue: assessments.filter(a => a.status === "Overdue").length
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Assessments</h1>
          <p className="text-muted-foreground mt-2">
            Conduct comprehensive risk assessments to identify and evaluate organizational threats
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Risk Assessment</DialogTitle>
                <DialogDescription>
                  Initialize a new risk assessment project with defined scope and methodology
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assessment-name">Assessment Name *</Label>
                    <Input id="assessment-name" placeholder="e.g., Q1 2024 Cybersecurity Assessment" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="methodology">Methodology</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select methodology" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nist-rmf">NIST Risk Management Framework</SelectItem>
                        <SelectItem value="iso-27005">ISO 27005</SelectItem>
                        <SelectItem value="octave">OCTAVE</SelectItem>
                        <SelectItem value="fair">FAIR</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assessor">Lead Assessor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign assessor..." />
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
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope">Assessment Scope *</Label>
                  <Textarea 
                    id="scope"
                    placeholder="Define the scope of the risk assessment including systems, processes, and business areas to be evaluated..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button>Create Assessment</Button>
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
                <p className="text-sm text-muted-foreground">Total Assessments</p>
                <p className="text-3xl font-bold text-primary">{assessmentStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-warning">{assessmentStats.inProgress}</p>
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
                <p className="text-3xl font-bold text-success">{assessmentStats.completed}</p>
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
                <p className="text-3xl font-bold text-danger">{assessmentStats.overdue}</p>
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
                  placeholder="Search assessments by name, ID, or scope..."
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Risk Assessments ({filteredAssessments.length})</CardTitle>
          <CardDescription>
            Track progress and results of all risk assessment activities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Assessment ID</th>
                  <th>Name & Scope</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Risks Found</th>
                  <th>Assessor</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td>
                      <div className="font-medium text-primary">{assessment.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium text-sm mb-1">{assessment.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{assessment.scope}</div>
                        <Badge variant="outline" className="text-xs">
                          {assessment.methodology}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(assessment.status)}
                        <Badge className={`status-badge ${getStatusColor(assessment.status)}`}>
                          {assessment.status}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-2">
                        <Progress value={assessment.progress} className="h-2" />
                        <span className="text-xs text-muted-foreground">{assessment.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{assessment.risksIdentified} Total</div>
                        <div className="flex space-x-2 text-xs">
                          <span className="text-danger">{assessment.criticalRisks}C</span>
                          <span className="text-warning">{assessment.highRisks}H</span>
                          <span className="text-info">{assessment.mediumRisks}M</span>
                          <span className="text-success">{assessment.lowRisks}L</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{assessment.assessor}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>{assessment.dueDate}</div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {assessment.lastUpdated}
                        </div>
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