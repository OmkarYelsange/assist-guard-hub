import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Clock, MapPin, Plus, Eye } from "lucide-react";

export default function Committees() {
  const committees = [
    {
      name: "Security Steering Committee",
      description: "Executive oversight of information security strategy and governance",
      chair: "Chief Security Officer",
      members: 8,
      frequency: "Monthly",
      nextMeeting: "2024-01-25 14:00",
      location: "Executive Conference Room",
      status: "Active",
      responsibilities: ["Security strategy approval", "Budget oversight", "Risk appetite setting"]
    },
    {
      name: "Risk Management Committee", 
      description: "Enterprise-wide risk assessment and treatment coordination",
      chair: "Chief Risk Officer",
      members: 6,
      frequency: "Bi-weekly",
      nextMeeting: "2024-01-30 10:00",
      location: "Virtual Meeting",
      status: "Active",
      responsibilities: ["Risk identification", "Treatment planning", "KRI monitoring"]
    },
    {
      name: "Compliance Review Board",
      description: "Regulatory compliance monitoring and audit coordination",
      chair: "Compliance Officer", 
      members: 5,
      frequency: "Monthly",
      nextMeeting: "2024-02-05 15:30",
      location: "Legal Conference Room",
      status: "Active",
      responsibilities: ["Audit oversight", "Compliance monitoring", "Remediation tracking"]
    }
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Governance Committees</h1>
          <p className="text-muted-foreground mt-2">
            Security governance committees and oversight groups
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Committee
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {committees.map((committee, index) => (
          <Card key={index} className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {committee.name}
                <Badge className="status-badge status-success">{committee.status}</Badge>
              </CardTitle>
              <CardDescription>{committee.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Chair:</span>
                  <div className="font-medium">{committee.chair}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Members:</span>
                  <div className="font-medium">{committee.members}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Frequency:</span>
                  <div className="font-medium">{committee.frequency}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <div className="font-medium">{committee.location}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Next Meeting: {committee.nextMeeting}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Key Responsibilities:</span>
                <ul className="mt-2 space-y-1">
                  {committee.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Members
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}