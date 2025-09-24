import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Monitor,
  Server,
  Network,
  Database,
  Eye,
  Zap,
  RefreshCw,
  Settings,
  Bell,
  Globe,
  Plus,
  Edit,
  Trash2,
  Search
} from "lucide-react";

export default function SecurityMonitoring() {
  const { securityAlerts, addSecurityAlert, updateSecurityAlert, deleteSecurityAlert } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    source: "",
    message: "",
    severity: "Medium",
    category: "",
    status: "Active"
  });

  const resetForm = () => {
    setFormData({
      source: "",
      message: "",
      severity: "Medium",
      category: "",
      status: "Active"
    });
    setEditingAlert(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.source || !formData.message || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const alertData = {
      ...formData,
      timestamp: new Date().toLocaleTimeString(),
      id: editingAlert ? editingAlert.id : `ALT-${Date.now()}`
    };

    if (editingAlert) {
      updateSecurityAlert(editingAlert.id, alertData);
      toast({
        title: "Success",
        description: "Alert updated successfully",
      });
    } else {
      addSecurityAlert(alertData);
      toast({
        title: "Success",
        description: "Alert created successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (alert: any) => {
    setEditingAlert(alert);
    setFormData({
      source: alert.source,
      message: alert.message,
      severity: alert.severity,
      category: alert.category,
      status: alert.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (alertId: string) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      deleteSecurityAlert(alertId);
      toast({
        title: "Success",
        description: "Alert deleted successfully",
      });
    }
  };

  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const systemHealth = [
    {
      name: "SIEM Platform",
      status: "Operational",
      uptime: 99.8,
      lastCheck: "2 minutes ago",
      alerts: 0,
      icon: Monitor,
      color: "success"
    },
    {
      name: "Firewall Cluster",
      status: "Operational", 
      uptime: 99.9,
      lastCheck: "1 minute ago",
      alerts: 2,
      icon: Shield,
      color: "success"
    },
    {
      name: "Intrusion Detection",
      status: "Warning",
      uptime: 98.5,
      lastCheck: "30 seconds ago",
      alerts: 5,
      icon: AlertTriangle,
      color: "warning"
    },
    {
      name: "Endpoint Protection",
      status: "Operational",
      uptime: 97.2,
      lastCheck: "1 minute ago",
      alerts: 1,
      icon: Server,
      color: "success"
    },
    {
      name: "Network Monitoring",
      status: "Critical",
      uptime: 94.1,
      lastCheck: "5 minutes ago",
      alerts: 12,
      icon: Network,
      color: "danger"
    },
    {
      name: "Database Security",
      status: "Operational",
      uptime: 99.5,
      lastCheck: "1 minute ago",
      alerts: 0,
      icon: Database,
      color: "success"
    }
  ];

  const networkMetrics = [
    { label: "Inbound Traffic", value: "2.4 Gbps", change: "+15%", trend: "up" },
    { label: "Outbound Traffic", value: "1.8 Gbps", change: "+8%", trend: "up" },
    { label: "Blocked Attempts", value: "1,247", change: "+23%", trend: "up" },
    { label: "Active Connections", value: "8,943", change: "-2%", trend: "down" }
  ];

  const securityEvents = [
    { type: "Login Success", count: 1547, color: "success" },
    { type: "Login Failed", count: 89, color: "warning" },
    { type: "Malware Blocked", count: 34, color: "danger" },
    { type: "Policy Violation", count: 12, color: "warning" },
    { type: "Data Access", count: 892, color: "info" },
    { type: "System Alert", count: 23, color: "warning" }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Operational": "status-success",
      "Warning": "status-warning",
      "Critical": "status-danger",
      "Maintenance": "status-info"
    };
    return colors[status as keyof typeof colors] || "status-info";
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

  const getAlertStatusColor = (status: string) => {
    const colors = {
      "Active": "status-danger",
      "Investigating": "status-warning",
      "Resolved": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Monitoring</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring and alerting for your security infrastructure
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Settings className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAlert ? 'Edit Alert' : 'Create New Alert'}</DialogTitle>
                <DialogDescription>
                  {editingAlert ? 'Update alert details' : 'Create a new security alert for monitoring'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert-source">Source *</Label>
                    <Input 
                      id="alert-source" 
                      placeholder="Alert source"
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alert-category">Category *</Label>
                    <Input 
                      id="alert-category" 
                      placeholder="Alert category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
                      <SelectTrigger>
                        <SelectValue />
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
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Investigating">Investigating</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-message">Message *</Label>
                  <Input 
                    id="alert-message"
                    placeholder="Alert message description..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingAlert ? 'Update Alert' : 'Create Alert'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* System Health Overview */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            System Health Overview
          </CardTitle>
          <CardDescription>
            Real-time status of all security monitoring systems and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemHealth.map((system, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg bg-${system.color}/10`}>
                      <system.icon className={`h-5 w-5 text-${system.color}`} />
                    </div>
                    <h3 className="font-medium">{system.name}</h3>
                  </div>
                  <Badge className={`status-badge ${getStatusColor(system.status)}`}>
                    {system.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-sm font-medium">{system.uptime}%</span>
                  </div>
                  <Progress value={system.uptime} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Last Check: {system.lastCheck}</span>
                    <span className={system.alerts > 0 ? "text-warning font-medium" : ""}>
                      {system.alerts} alerts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="network">Network Metrics</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-warning" />
                Real-time Security Alerts
              </CardTitle>
              <CardDescription>
                Live feed of security alerts and incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-full md:w-48">
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

              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`status-badge ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </Badge>
                        <Badge className={`status-badge ${getAlertStatusColor(alert.status)}`}>
                          {alert.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{alert.id}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{alert.source}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(alert)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(alert.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredAlerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No alerts found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-primary" />
                  Network Traffic Metrics
                </CardTitle>
                <CardDescription>
                  Real-time network traffic analysis and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {networkMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-4 border border-border rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                      <div className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-success' : 'text-danger'
                      }`}>
                        <TrendingUp className={`h-3 w-3 inline mr-1 ${
                          metric.trend === 'down' ? 'transform rotate-180' : ''
                        }`} />
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-info" />
                  Geographic Threat Map
                </CardTitle>
                <CardDescription>
                  Attack sources and blocked connections by geography
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive threat map</p>
                    <p className="text-xs text-muted-foreground">Showing global attack vectors</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Top Attack Sources:</div>
                    <div className="text-muted-foreground">China (23%), Russia (18%)</div>
                  </div>
                  <div>
                    <div className="font-medium">Blocked Today:</div>
                    <div className="text-muted-foreground">1,247 attempts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                Security Event Summary
              </CardTitle>
              <CardDescription>
                Breakdown of security events by type and frequency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {securityEvents.map((event, index) => (
                  <div key={index} className="text-center p-4 border border-border rounded-lg">
                    <div className={`text-3xl font-bold mb-2 text-${event.color}`}>
                      {event.count.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{event.type}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Threat Trends</CardTitle>
                <CardDescription>
                  Security threat patterns over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Threat trend analytics</p>
                    <p className="text-xs text-muted-foreground">Interactive charts and graphs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  System performance and response time analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Detection Time</span>
                    <span className="text-sm font-medium">2.3s avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">4.7s avg</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alert Accuracy</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Load</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}