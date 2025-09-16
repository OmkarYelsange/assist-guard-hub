import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  TrendingUp, 
  Users, 
  Clock,
  ChevronRight,
  Zap,
  Eye,
  AlertCircle
} from "lucide-react";

export default function OperationsDashboard() {
  const securityMetrics = [
    {
      title: "Active Incidents",
      value: "12",
      change: "+3 from yesterday",
      icon: AlertTriangle,
      color: "danger",
      trend: "up"
    },
    {
      title: "Threats Detected",
      value: "47",
      change: "+8 from yesterday",
      icon: Shield,
      color: "warning",
      trend: "up"
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "0.2% this month",
      icon: Activity,
      color: "success",
      trend: "stable"
    },
    {
      title: "Response Time",
      value: "4.2m",
      change: "-1.3m improvement",
      icon: Clock,
      color: "info",
      trend: "down"
    }
  ];

  const recentIncidents = [
    {
      id: "INC-2024-001",
      title: "Suspicious login attempts detected",
      severity: "High",
      status: "Investigating",
      assignee: "John Doe",
      time: "2 hours ago"
    },
    {
      id: "INC-2024-002", 
      title: "Unusual network traffic pattern",
      severity: "Medium",
      status: "In Progress",
      assignee: "Jane Smith",
      time: "4 hours ago"
    },
    {
      id: "INC-2024-003",
      title: "Failed backup process",
      severity: "Low",
      status: "Resolved",
      assignee: "Mike Johnson",
      time: "6 hours ago"
    }
  ];

  const threats = [
    {
      type: "Malware",
      count: 23,
      severity: "Critical",
      lastSeen: "15 min ago"
    },
    {
      type: "Phishing",
      count: 18,
      severity: "High", 
      lastSeen: "1 hour ago"
    },
    {
      type: "Brute Force",
      count: 6,
      severity: "Medium",
      lastSeen: "3 hours ago"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      Critical: "status-danger",
      High: "status-danger", 
      Medium: "status-warning",
      Low: "status-success"
    };
    return variants[severity as keyof typeof variants] || "status-info";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Investigating: "status-warning",
      "In Progress": "status-info",
      Resolved: "status-success"
    };
    return variants[status as keyof typeof variants] || "status-info";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Operations Center</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and respond to security incidents in real-time
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View All Incidents
          </Button>
          <Button>
            <AlertCircle className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric) => (
          <Card key={metric.title} className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-${metric.color}/10`}>
                    <metric.icon className={`h-5 w-5 text-${metric.color}`} />
                  </div>
                </div>
                <TrendingUp className={`h-4 w-4 ${
                  metric.trend === 'up' ? 'text-danger' : 
                  metric.trend === 'down' ? 'text-success' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="mt-4">
                <div className="metric-value">{metric.value}</div>
                <p className="metric-label">{metric.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Incidents
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Latest security incidents requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{incident.id}</span>
                      <Badge className={`status-badge ${getSeverityBadge(incident.severity)}`}>
                        {incident.severity}
                      </Badge>
                      <Badge className={`status-badge ${getStatusBadge(incident.status)}`}>
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-2">{incident.title}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Assigned to {incident.assignee}</span>
                      <span>{incident.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat Intelligence */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-warning" />
                Threat Intelligence
              </div>
              <Button variant="ghost" size="sm">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Current threat landscape and indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threats.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning/10">
                      <Zap className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{threat.type}</div>
                      <div className="text-xs text-muted-foreground">
                        Last seen: {threat.lastSeen}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-warning">{threat.count}</div>
                    <Badge className={`status-badge ${getSeverityBadge(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Real-time status of security monitoring systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-success/10">
                <Activity className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-medium">SIEM Platform</h3>
              <p className="text-sm text-success">Operational</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-success/10">
                <Shield className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-medium">Firewall</h3>
              <p className="text-sm text-success">Protected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-warning/10">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <h3 className="font-medium">Endpoint Protection</h3>
              <p className="text-sm text-warning">Partial Coverage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}