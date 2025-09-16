import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Plus, Eye, CheckCircle, Clock } from "lucide-react";

export default function AuditManagement() {
  const audits = [
    {
      id: "AUD-2024-001",
      framework: "ISO 27001",
      type: "Surveillance Audit",
      auditor: "BSI Group",
      startDate: "2024-04-15",
      endDate: "2024-04-17",
      status: "Scheduled",
      scope: "Information Security Controls A.5-A.8",
      findings: 0,
      observations: 0
    },
    {
      id: "AUD-2024-002",
      framework: "SOC 2 Type II",
      type: "Readiness Assessment",
      auditor: "KPMG",
      startDate: "2024-05-10",
      endDate: "2024-05-12", 
      status: "Planning",
      scope: "Security and Availability Controls",
      findings: 0,
      observations: 0
    },
    {
      id: "AUD-2023-003",
      framework: "GDPR",
      type: "Compliance Review",
      auditor: "Internal Audit Team",
      startDate: "2023-12-01",
      endDate: "2023-12-15",
      status: "Completed",
      scope: "Data Processing Activities",
      findings: 3,
      observations: 8
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Scheduled": "status-success",
      "Planning": "status-info",
      "In Progress": "status-warning",
      "Completed": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Management</h1>
          <p className="text-muted-foreground mt-2">
            Plan, track, and manage compliance audits and assessments
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">4</div>
            <p className="text-sm text-muted-foreground">Scheduled Audits</p>
          </CardContent>
        </Card>
        
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-warning mx-auto mb-3" />
            <div className="text-3xl font-bold text-warning mb-1">1</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        
        <Card className="enterprise-card">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
            <div className="text-3xl font-bold text-success mb-1">12</div>
            <p className="text-sm text-muted-foreground">Completed This Year</p>
          </CardContent>
        </Card>
      </div>

      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Audit Schedule</CardTitle>
          <CardDescription>Upcoming and recent compliance audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audits.map((audit) => (
              <div key={audit.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{audit.framework} - {audit.type}</h3>
                    <p className="text-sm text-muted-foreground">{audit.scope}</p>
                  </div>
                  <Badge className={`status-badge ${getStatusColor(audit.status)}`}>
                    {audit.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Auditor:</span>
                    <div className="font-medium">{audit.auditor}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dates:</span>
                    <div className="font-medium">{audit.startDate} - {audit.endDate}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Results:</span>
                    <div className="font-medium">
                      {audit.findings} Findings, {audit.observations} Observations
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}