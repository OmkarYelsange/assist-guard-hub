import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  ChevronRight,
  Shield,
  AlertCircle,
  Calendar,
  Target
} from "lucide-react";

export default function GovernanceDashboard() {
  const governanceMetrics = [
    {
      title: "Active Policies",
      value: "156",
      change: "+12 this quarter",
      icon: FileText,
      color: "primary",
      trend: "up"
    },
    {
      title: "Policy Compliance",
      value: "94%",
      change: "+2% this month",
      icon: CheckCircle,
      color: "success",
      trend: "up"
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "Due this week",
      icon: Clock,
      color: "warning",
      trend: "neutral"
    },
    {
      title: "Framework Coverage",
      value: "87%",
      change: "Across 5 frameworks",
      icon: Shield,
      color: "info",
      trend: "stable"
    }
  ];

  const policyUpdates = [
    {
      id: "POL-2024-001",
      title: "Data Classification Policy",
      version: "v2.1",
      status: "Under Review",
      owner: "CISO Office",
      dueDate: "2024-01-15",
      priority: "High"
    },
    {
      id: "POL-2024-002",
      title: "Incident Response Procedures",
      version: "v1.3",
      status: "Approved",
      owner: "Security Team",
      dueDate: "2024-01-20",
      priority: "Medium"
    },
    {
      id: "POL-2024-003",
      title: "Access Control Standards",
      version: "v3.0",
      status: "Draft",
      owner: "IT Security",
      dueDate: "2024-01-25",
      priority: "High"
    }
  ];

  const frameworks = [
    {
      name: "ISO 27001",
      coverage: 92,
      controls: "114/124",
      status: "Compliant",
      lastReview: "Dec 2024"
    },
    {
      name: "NIST CSF",
      coverage: 88,
      controls: "88/100",
      status: "In Progress",
      lastReview: "Nov 2024"
    },
    {
      name: "SOC 2 Type II",
      coverage: 95,
      controls: "19/20",
      status: "Compliant",
      lastReview: "Oct 2024"
    },
    {
      name: "GDPR",
      coverage: 87,
      controls: "26/30",
      status: "In Progress",
      lastReview: "Dec 2024"
    }
  ];

  const committees = [
    {
      name: "Security Steering Committee",
      nextMeeting: "Jan 18, 2024",
      members: 8,
      status: "Active"
    },
    {
      name: "Risk Management Committee", 
      nextMeeting: "Jan 22, 2024",
      members: 6,
      status: "Active"
    },
    {
      name: "Compliance Review Board",
      nextMeeting: "Jan 25, 2024",
      members: 5,
      status: "Active"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Under Review": "status-warning",
      "Approved": "status-success",
      "Draft": "status-info",
      "Compliant": "status-success",
      "In Progress": "status-warning",
      "Active": "status-success"
    };
    return variants[status as keyof typeof variants] || "status-info";
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      "High": "status-danger",
      "Medium": "status-warning",
      "Low": "status-success"
    };
    return variants[priority as keyof typeof variants] || "status-info";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Governance</h1>
          <p className="text-muted-foreground mt-1">
            Manage policies, standards, and governance frameworks
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Policy Library
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Policy
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {governanceMetrics.map((metric) => (
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
                  metric.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
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
        {/* Policy Updates */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Policy Updates
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Latest changes to security policies and procedures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyUpdates.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{policy.id}</span>
                      <Badge className={`status-badge ${getStatusBadge(policy.status)}`}>
                        {policy.status}
                      </Badge>
                      <Badge className={`status-badge ${getPriorityBadge(policy.priority)}`}>
                        {policy.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-2">{policy.title} ({policy.version})</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Owner: {policy.owner}</span>
                      <span>Due: {policy.dueDate}</span>
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

        {/* Governance Committees */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                Governance Committees
              </div>
              <Button variant="ghost" size="sm">
                Manage <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Security governance and oversight committees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {committees.map((committee, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{committee.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>Next: {committee.nextMeeting}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{committee.members} members</div>
                    <Badge className={`status-badge ${getStatusBadge(committee.status)}`}>
                      {committee.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Framework Compliance */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            Compliance Framework Status
          </CardTitle>
          <CardDescription>
            Current compliance status across security frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworks.map((framework, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{framework.name}</h3>
                  <Badge className={`status-badge ${getStatusBadge(framework.status)}`}>
                    {framework.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span>{framework.coverage}%</span>
                  </div>
                  <Progress value={framework.coverage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Controls: {framework.controls}</span>
                    <span>Last Review: {framework.lastReview}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}