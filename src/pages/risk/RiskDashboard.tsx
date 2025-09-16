import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  BarChart3,
  Shield,
  Clock,
  ChevronRight,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  Zap
} from "lucide-react";

export default function RiskDashboard() {
  const riskMetrics = [
    {
      title: "Total Risks",
      value: "89",
      change: "+7 this month",
      icon: AlertTriangle,
      color: "danger",
      trend: "up"
    },
    {
      title: "Critical Risks",
      value: "12",
      change: "-2 mitigated",
      icon: XCircle,
      color: "danger",
      trend: "down"
    },
    {
      title: "Risk Score",
      value: "6.8/10",
      change: "-0.3 this quarter",
      icon: BarChart3,
      color: "warning",
      trend: "down"
    },
    {
      title: "Treatments Active",
      value: "34",
      change: "78% completion rate",
      icon: CheckCircle,
      color: "success",
      trend: "stable"
    }
  ];

  const topRisks = [
    {
      id: "RISK-2024-001",
      title: "Ransomware Attack on Critical Infrastructure",
      category: "Cyber Threat",
      probability: "High",
      impact: "Critical",
      riskScore: 9.2,
      owner: "IT Security Team",
      status: "Active",
      treatment: "In Progress"
    },
    {
      id: "RISK-2024-002",
      title: "Data Breach via Third-Party Vendor",
      category: "Third Party",
      probability: "Medium",
      impact: "High",
      riskScore: 7.8,
      owner: "Vendor Management",
      status: "Active",
      treatment: "Planning"
    },
    {
      id: "RISK-2024-003",
      title: "Insider Threat - Privileged Access Abuse",
      category: "Insider Threat",
      probability: "Low",
      impact: "High",
      riskScore: 6.5,
      owner: "HR & Security",
      status: "Monitoring",
      treatment: "Implemented"
    }
  ];

  const riskCategories = [
    {
      name: "Cyber Threats",
      count: 23,
      critical: 5,
      high: 8,
      medium: 7,
      low: 3,
      trend: "+12%"
    },
    {
      name: "Third Party",
      count: 18,
      critical: 2,
      high: 6,
      medium: 8,
      low: 2,
      trend: "+5%"
    },
    {
      name: "Operational",
      count: 16,
      critical: 1,
      high: 4,
      medium: 9,
      low: 2,
      trend: "-3%"
    },
    {
      name: "Compliance",
      count: 14,
      critical: 2,
      high: 3,
      medium: 6,
      low: 3,
      trend: "+8%"
    },
    {
      name: "Physical",
      count: 12,
      critical: 1,
      high: 2,
      medium: 5,
      low: 4,
      trend: "0%"
    },
    {
      name: "Strategic",
      count: 6,
      critical: 1,
      high: 1,
      medium: 2,
      low: 2,
      trend: "+15%"
    }
  ];

  const recentAssessments = [
    {
      name: "Cloud Infrastructure Risk Assessment",
      date: "Jan 10, 2024",
      scope: "AWS Production Environment",
      status: "Completed",
      findings: 23,
      criticality: "High"
    },
    {
      name: "Third-Party Vendor Assessment",
      date: "Jan 8, 2024",
      scope: "SaaS Providers",
      status: "In Progress",
      findings: 12,
      criticality: "Medium"
    },
    {
      name: "Business Continuity Risk Review",
      date: "Jan 5, 2024",
      scope: "Core Business Processes",
      status: "Completed",
      findings: 8,
      criticality: "Medium"
    }
  ];

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return "text-danger";
    if (score >= 6) return "text-warning"; 
    if (score >= 4) return "text-warning";
    return "text-success";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "Active": "status-danger",
      "Monitoring": "status-warning",
      "Completed": "status-success",
      "In Progress": "status-info",
      "Planning": "status-warning",
      "Implemented": "status-success"
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Management</h1>
          <p className="text-muted-foreground mt-1">
            Identify, assess, and manage organizational security risks
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Risk Register
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Risks */}
        <div className="lg:col-span-2">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Risk Exposures
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardTitle>
              <CardDescription>
                Highest priority risks requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRisks.map((risk) => (
                  <div key={risk.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{risk.id}</span>
                          <Badge className={`status-badge ${getStatusBadge(risk.status)}`}>
                            {risk.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-2">{risk.title}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Category: {risk.category}</span>
                          <span>Owner: {risk.owner}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getRiskScoreColor(risk.riskScore)}`}>
                          {risk.riskScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Risk Score</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge className={`status-badge ${getSeverityBadge(risk.probability)}`}>
                          {risk.probability} Probability
                        </Badge>
                        <Badge className={`status-badge ${getSeverityBadge(risk.impact)}`}>
                          {risk.impact} Impact
                        </Badge>
                      </div>
                      <Badge className={`status-badge ${getStatusBadge(risk.treatment)}`}>
                        Treatment: {risk.treatment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Categories */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Risk Categories
            </CardTitle>
            <CardDescription>
              Risk distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskCategories.map((category, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <span className="text-xs text-muted-foreground">{category.trend}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary">{category.count}</span>
                    <div className="text-right text-xs">
                      <div className="text-danger">{category.critical} Critical</div>
                      <div className="text-warning">{category.high} High</div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 h-2 bg-danger rounded" style={{width: `${(category.critical / category.count) * 100}%`}}></div>
                    <div className="flex-1 h-2 bg-warning rounded" style={{width: `${(category.high / category.count) * 100}%`}}></div>
                    <div className="flex-1 h-2 bg-info rounded" style={{width: `${(category.medium / category.count) * 100}%`}}></div>
                    <div className="flex-1 h-2 bg-success rounded" style={{width: `${(category.low / category.count) * 100}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Risk Assessments
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
          <CardDescription>
            Latest risk assessment activities and findings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <Badge className={`status-badge ${getStatusBadge(assessment.status)}`}>
                      {assessment.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{assessment.date}</span>
                </div>
                <h3 className="font-medium text-sm mb-2">{assessment.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">Scope: {assessment.scope}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{assessment.findings}</div>
                    <div className="text-xs text-muted-foreground">Findings</div>
                  </div>
                  <Badge className={`status-badge ${getSeverityBadge(assessment.criticality)}`}>
                    {assessment.criticality}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}