import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Lock, 
  FileText, 
  TrendingUp, 
  Calendar,
  Clock,
  ChevronRight,
  Award,
  AlertCircle,
  Users,
  Database,
  Target,
  BookOpen
} from "lucide-react";

export default function ComplianceDashboard() {
  const complianceMetrics = [
    {
      title: "Overall Compliance",
      value: "87%",
      change: "+5% this quarter",
      icon: CheckSquare,
      color: "success",
      trend: "up"
    },
    {
      title: "Active Frameworks",
      value: "8",
      change: "2 new this year",
      icon: Lock,
      color: "primary",
      trend: "up"
    },
    {
      title: "Open Findings",
      value: "23",
      change: "-8 resolved",
      icon: AlertCircle,
      color: "warning",
      trend: "down"
    },
    {
      title: "Audits Scheduled",
      value: "4",
      change: "Next in 2 weeks",
      icon: Calendar,
      color: "info",
      trend: "stable"
    }
  ];

  const complianceFrameworks = [
    {
      name: "ISO 27001:2022",
      status: "Compliant",
      coverage: 94,
      controls: "116/123",
      lastAudit: "Oct 2024",
      nextAudit: "Oct 2025",
      certificate: "Valid",
      findings: 3
    },
    {
      name: "SOC 2 Type II",
      status: "Compliant", 
      coverage: 98,
      controls: "20/20",
      lastAudit: "Sep 2024",
      nextAudit: "Sep 2025",
      certificate: "Valid",
      findings: 1
    },
    {
      name: "NIST Cybersecurity Framework",
      status: "In Progress",
      coverage: 76,
      controls: "76/100",
      lastAudit: "Nov 2024",
      nextAudit: "May 2024",
      certificate: "N/A",
      findings: 12
    },
    {
      name: "GDPR",
      status: "Compliant",
      coverage: 89,
      controls: "27/30",
      lastAudit: "Aug 2024",
      nextAudit: "Aug 2025",
      certificate: "N/A",
      findings: 4
    }
  ];

  const upcomingAudits = [
    {
      framework: "PCI DSS",
      auditor: "External Auditor LLC",
      date: "Jan 25, 2024",
      type: "External",
      scope: "Payment Processing",
      status: "Scheduled"
    },
    {
      framework: "ISO 27001",
      auditor: "Internal Audit Team",
      date: "Feb 8, 2024", 
      type: "Internal",
      scope: "Information Security Management",
      status: "Preparing"
    },
    {
      framework: "SOC 2",
      auditor: "Compliance Partners Inc",
      date: "Feb 15, 2024",
      type: "External",
      scope: "Security & Availability",
      status: "Scheduled"
    }
  ];

  const recentFindings = [
    {
      id: "FIND-2024-001",
      framework: "ISO 27001",
      control: "A.12.6.1",
      title: "Vulnerability Management Process",
      severity: "Medium",
      status: "Open",
      dueDate: "Feb 1, 2024",
      owner: "IT Operations"
    },
    {
      id: "FIND-2024-002",
      framework: "SOC 2",
      control: "CC6.1",
      title: "Logical Access Controls",
      severity: "Low",
      status: "Remediation",
      dueDate: "Jan 30, 2024",
      owner: "Security Team"
    },
    {
      id: "FIND-2024-003",
      framework: "GDPR",
      control: "Art. 32",
      title: "Data Processing Records",
      severity: "High",
      status: "Open",
      dueDate: "Jan 20, 2024",
      owner: "Privacy Officer"
    }
  ];

  const evidenceStats = [
    {
      type: "Policies & Procedures",
      count: 124,
      updated: "2 this week"
    },
    {
      type: "Technical Controls",
      count: 89,
      updated: "5 this week"
    },
    {
      type: "Training Records",
      count: 67,
      updated: "12 this week"
    },
    {
      type: "Audit Reports",
      count: 23,
      updated: "1 this week"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Compliant": "status-success",
      "In Progress": "status-warning",
      "Non-Compliant": "status-danger",
      "Scheduled": "status-info",
      "Preparing": "status-warning",
      "Open": "status-danger",
      "Remediation": "status-warning",
      "Resolved": "status-success",
      "Valid": "status-success"
    };
    return variants[status as keyof typeof variants] || "status-info";
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      "Critical": "status-danger",
      "High": "status-danger",
      "Medium": "status-warning", 
      "Low": "status-success"
    };
    return variants[severity as keyof typeof variants] || "status-info";
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      "External": "status-primary",
      "Internal": "status-secondary"
    };
    return variants[type as keyof typeof variants] || "status-info";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor compliance status across security frameworks and regulations
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Framework Library
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric) => (
          <Card key={metric.title} className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-${metric.color}/10`}>
                    <metric.icon className={`h-5 w-5 text-${metric.color}`} />
                  </div>
                </div>
                <TrendingUp className={`h-4 w-4 ${
                  metric.trend === 'up' ? 'text-success' : 
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

      {/* Compliance Frameworks */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              Compliance Frameworks
            </div>
            <Button variant="ghost" size="sm">
              Manage All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
          <CardDescription>
            Current status of compliance frameworks and certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{framework.name}</h3>
                  <Badge className={`status-badge ${getStatusBadge(framework.status)}`}>
                    {framework.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Coverage</span>
                    <span className="text-sm font-medium">{framework.coverage}%</span>
                  </div>
                  <Progress value={framework.coverage} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Controls:</span>
                      <div className="font-medium">{framework.controls}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Findings:</span>
                      <div className="font-medium text-warning">{framework.findings}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Audit:</span>
                      <div className="font-medium">{framework.lastAudit}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Audit:</span>
                      <div className="font-medium">{framework.nextAudit}</div>
                    </div>
                  </div>
                  {framework.certificate !== "N/A" && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">Certificate</span>
                      <Badge className={`status-badge ${getStatusBadge(framework.certificate)}`}>
                        {framework.certificate}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Audits */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Audits
              <Button variant="ghost" size="sm">
                Schedule <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Scheduled compliance audits and assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAudits.map((audit, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{audit.framework}</h3>
                    <Badge className={`status-badge ${getTypeBadge(audit.type)}`}>
                      {audit.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Scope: {audit.scope}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{audit.date}</span>
                    </div>
                    <Badge className={`status-badge ${getStatusBadge(audit.status)}`}>
                      {audit.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Auditor: {audit.auditor}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Findings */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Findings
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Latest compliance findings requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFindings.map((finding) => (
                <div key={finding.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{finding.id}</span>
                      <Badge className={`status-badge ${getSeverityBadge(finding.severity)}`}>
                        {finding.severity}
                      </Badge>
                    </div>
                    <Badge className={`status-badge ${getStatusBadge(finding.status)}`}>
                      {finding.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-2">{finding.title}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{finding.framework} - {finding.control}</span>
                    <span>Due: {finding.dueDate}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Owner: {finding.owner}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Management */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            Evidence Management
          </CardTitle>
          <CardDescription>
            Compliance evidence repository and documentation status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {evidenceStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border border-border rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-sm mb-1">{stat.type}</h3>
                <div className="text-2xl font-bold text-primary mb-1">{stat.count}</div>
                <p className="text-xs text-muted-foreground">{stat.updated}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}