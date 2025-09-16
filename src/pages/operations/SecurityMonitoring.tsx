import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Globe
} from "lucide-react";

export default function SecurityMonitoring() {
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

  const realtimeAlerts = [
    {
      id: "ALT-2024-001",
      timestamp: "15:42:33",
      severity: "Critical",
      source: "Network Monitor",
      message: "Unusual traffic spike detected from external IP 192.168.1.100",
      status: "Active",
      category: "Network Anomaly"
    },
    {
      id: "ALT-2024-002", 
      timestamp: "15:41:15",
      severity: "High",
      source: "SIEM",
      message: "Failed authentication attempts exceed threshold for user 'admin'",
      status: "Investigating",
      category: "Authentication"
    },
    {
      id: "ALT-2024-003",
      timestamp: "15:39:47",
      severity: "Medium",
      source: "Endpoint",
      message: "Suspicious process execution detected on workstation WS-001",
      status: "Active",
      category: "Malware"
    },
    {
      id: "ALT-2024-004",
      timestamp: "15:38:22",
      severity: "Low",
      source: "Web Filter",
      message: "Access attempt to blocked website category: Malware",
      status: "Resolved",
      category: "Web Security"
    },
    {
      id: "ALT-2024-005",
      timestamp: "15:36:58",
      severity: "Medium",
      source: "DLP",
      message: "Sensitive data transmission detected - Credit card patterns",
      status: "Investigating",
      category: "Data Loss"
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
          <Button className="w-full sm:w-auto">
            <Eye className="h-4 w-4 mr-2" />
            View Dashboard
          </Button>
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
              <div className="space-y-4">
                {realtimeAlerts.map((alert) => (
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
                      <Button variant="ghost" size="sm">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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