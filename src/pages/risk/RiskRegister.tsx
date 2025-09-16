import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Plus, Search, AlertTriangle, TrendingUp, Eye, Edit } from "lucide-react";

export default function RiskRegister() {
  const [searchTerm, setSearchTerm] = useState("");

  const risks = [
    {
      id: "RISK-2024-001",
      title: "Ransomware Attack on Critical Systems",
      category: "Cyber Threat",
      probability: "High",
      impact: "Critical", 
      riskScore: 9.2,
      owner: "IT Security Team",
      status: "Active",
      treatment: "Mitigate",
      lastReview: "2024-01-10"
    },
    {
      id: "RISK-2024-002", 
      title: "Third-Party Data Breach",
      category: "Vendor Risk",
      probability: "Medium",
      impact: "High",
      riskScore: 7.5,
      owner: "Vendor Management",
      status: "Monitoring", 
      treatment: "Transfer",
      lastReview: "2024-01-08"
    },
    {
      id: "RISK-2024-003",
      title: "Insider Threat - Data Exfiltration", 
      category: "People Risk",
      probability: "Low",
      impact: "High",
      riskScore: 6.8,
      owner: "HR Security",
      status: "Controlled",
      treatment: "Accept",
      lastReview: "2024-01-05"
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 8) return "text-danger";
    if (score >= 6) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Register</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive inventory of organizational risks and their management
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      <Card className="enterprise-card">
        <CardContent className="p-6">
          <div className="flex space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search risks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cyber">Cyber Threat</SelectItem>
                <SelectItem value="vendor">Vendor Risk</SelectItem>
                <SelectItem value="people">People Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Title & Category</th>
                  <th>Risk Score</th>
                  <th>Probability</th>
                  <th>Impact</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Treatment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id}>
                    <td className="font-medium">{risk.id}</td>
                    <td>
                      <div className="font-medium">{risk.title}</div>
                      <Badge variant="outline" className="text-xs mt-1">{risk.category}</Badge>
                    </td>
                    <td>
                      <span className={`text-2xl font-bold ${getRiskColor(risk.riskScore)}`}>
                        {risk.riskScore}
                      </span>
                    </td>
                    <td>
                      <Badge className={`status-badge ${risk.probability === 'High' ? 'status-danger' : risk.probability === 'Medium' ? 'status-warning' : 'status-success'}`}>
                        {risk.probability}
                      </Badge>
                    </td>
                    <td>
                      <Badge className={`status-badge ${risk.impact === 'Critical' ? 'status-danger' : risk.impact === 'High' ? 'status-danger' : 'status-warning'}`}>
                        {risk.impact}
                      </Badge>
                    </td>
                    <td className="text-sm">{risk.owner}</td>
                    <td>
                      <Badge className={`status-badge ${risk.status === 'Active' ? 'status-danger' : risk.status === 'Monitoring' ? 'status-warning' : 'status-success'}`}>
                        {risk.status}
                      </Badge>
                    </td>
                    <td className="text-sm">{risk.treatment}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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