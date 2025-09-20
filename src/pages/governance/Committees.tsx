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
  Users, 
  Plus, 
  Search, 
  Calendar,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  UserCheck,
  Settings
} from "lucide-react";

export default function Committees() {
  const { committees, addCommittee, updateCommittee, deleteCommittee } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    chair: "",
    members: "" as string | string[],
    meetingFrequency: "",
    lastMeeting: "",
    nextMeeting: "",
    status: "Active",
    charter: "",
    responsibilities: "" as string | string[]
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      chair: "",
      members: "",
      meetingFrequency: "",
      lastMeeting: "",
      nextMeeting: "",
      status: "Active",
      charter: "",
      responsibilities: ""
    });
    setEditingCommittee(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.chair) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const committeeData = {
      ...formData,
      members: typeof formData.members === 'string' ? 
              formData.members.split(',').map(m => m.trim()).filter(m => m.length > 0) : 
              formData.members,
      responsibilities: typeof formData.responsibilities === 'string' ? 
                       formData.responsibilities.split(',').map(r => r.trim()).filter(r => r.length > 0) : 
                       formData.responsibilities
    };

    if (editingCommittee) {
      updateCommittee(editingCommittee.id, committeeData);
      toast({
        title: "Success",
        description: "Committee updated successfully",
      });
    } else {
      addCommittee(committeeData);
      toast({
        title: "Success",
        description: "Committee created successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (committee: any) => {
    setEditingCommittee(committee);
    setFormData({
      name: committee.name,
      type: committee.type,
      chair: committee.chair,
      members: Array.isArray(committee.members) ? committee.members.join(', ') : committee.members || "",
      meetingFrequency: committee.meetingFrequency,
      lastMeeting: committee.lastMeeting,
      nextMeeting: committee.nextMeeting,
      status: committee.status,
      charter: committee.charter,
      responsibilities: Array.isArray(committee.responsibilities) ? committee.responsibilities.join(', ') : committee.responsibilities || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (committeeId: string) => {
    if (window.confirm('Are you sure you want to delete this committee?')) {
      deleteCommittee(committeeId);
      toast({
        title: "Success",
        description: "Committee deleted successfully",
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "status-success",
      "Inactive": "status-secondary",
      "On Hold": "status-warning",
      "Dissolved": "status-danger"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const filteredCommittees = committees.filter(committee => {
    const matchesSearch = committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.chair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || committee.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const committeeStats = {
    total: committees.length,
    active: committees.filter(c => c.status === "Active").length,
    meetings: committees.reduce((acc, c) => acc + (c.nextMeeting ? 1 : 0), 0)
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Committees Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage governance committees, meetings, and member responsibilities
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              New Committee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editingCommittee ? 'Edit Committee' : 'Create New Committee'}</DialogTitle>
              <DialogDescription>
                {editingCommittee ? 'Update committee details' : 'Set up a new governance committee'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="committee-name">Committee Name *</Label>
                  <Input 
                    id="committee-name" 
                    placeholder="Enter committee name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committee-type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select committee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Executive Committee">Executive Committee</SelectItem>
                      <SelectItem value="Steering Committee">Steering Committee</SelectItem>
                      <SelectItem value="Advisory Committee">Advisory Committee</SelectItem>
                      <SelectItem value="Working Group">Working Group</SelectItem>
                      <SelectItem value="Review Board">Review Board</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chair">Committee Chair *</Label>
                  <Input 
                    id="chair" 
                    placeholder="Chair name"
                    value={formData.chair}
                    onChange={(e) => setFormData({...formData, chair: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-frequency">Meeting Frequency</Label>
                  <Select value={formData.meetingFrequency} onValueChange={(value) => setFormData({...formData, meetingFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Semi-annually">Semi-annually</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                      <SelectItem value="As Needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="last-meeting">Last Meeting Date</Label>
                  <Input 
                    id="last-meeting" 
                    type="date"
                    value={formData.lastMeeting}
                    onChange={(e) => setFormData({...formData, lastMeeting: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="next-meeting">Next Meeting Date</Label>
                  <Input 
                    id="next-meeting" 
                    type="date"
                    value={formData.nextMeeting}
                    onChange={(e) => setFormData({...formData, nextMeeting: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Dissolved">Dissolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="members">Members (comma-separated)</Label>
                <Textarea 
                  id="members" 
                  placeholder="List committee members separated by commas"
                  value={String(formData.members || '')}
                  onChange={(e) => setFormData({...formData, members: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="charter">Charter</Label>
                <Textarea 
                  id="charter" 
                  placeholder="Committee charter and purpose"
                  value={formData.charter}
                  onChange={(e) => setFormData({...formData, charter: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities (comma-separated)</Label>
                <Textarea 
                  id="responsibilities" 
                  placeholder="List key responsibilities separated by commas"
                  value={String(formData.responsibilities || '')}
                  onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCommittee ? 'Update Committee' : 'Create Committee'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Committees</p>
                <p className="text-3xl font-bold text-primary">{committeeStats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Committees</p>
                <p className="text-3xl font-bold text-success">{committeeStats.active}</p>
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
                <p className="text-sm text-muted-foreground">Upcoming Meetings</p>
                <p className="text-3xl font-bold text-warning">{committeeStats.meetings}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Committees List */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Committees Overview</CardTitle>
          <CardDescription>
            Governance committees and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search committees by name or chair..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Executive Committee">Executive Committee</SelectItem>
                <SelectItem value="Steering Committee">Steering Committee</SelectItem>
                <SelectItem value="Advisory Committee">Advisory Committee</SelectItem>
                <SelectItem value="Working Group">Working Group</SelectItem>
                <SelectItem value="Review Board">Review Board</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredCommittees.map((committee) => (
              <div key={committee.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-lg">{committee.name}</h3>
                      <Badge className={`status-badge ${getStatusColor(committee.status)}`}>
                        {committee.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {committee.type}
                      </Badge>
                    </div>
                    
                    {committee.charter && (
                      <p className="text-sm text-muted-foreground mb-4">{committee.charter}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Chair:</span>
                        <div className="font-medium">{committee.chair}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Meeting Frequency:</span>
                        <div className="font-medium">{committee.meetingFrequency || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Members:</span>
                        <div className="font-medium">{committee.members?.length || 0} members</div>
                      </div>
                    </div>

                    {committee.nextMeeting && (
                      <div className="mt-3 text-sm">
                        <span className="text-muted-foreground">Next Meeting: </span>
                        <span className="font-medium">{committee.nextMeeting}</span>
                      </div>
                    )}

                    {committee.responsibilities && committee.responsibilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {committee.responsibilities.slice(0, 3).map((responsibility: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {responsibility}
                          </Badge>
                        ))}
                        {committee.responsibilities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{committee.responsibilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(committee)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(committee.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCommittees.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No committees found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}