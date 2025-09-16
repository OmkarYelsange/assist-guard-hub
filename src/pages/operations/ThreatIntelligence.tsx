import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Globe, 
  Shield, 
  AlertTriangle, 
  Eye,
  Download,
  Search,
  TrendingUp,
  Target,
  Users,
  Calendar,
  ExternalLink,
  Layers,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ThreatIntelligence() {
  const [searchTerm, setSearchTerm] = useState("");
  const [threatFilter, setThreatFilter] = useState("all");

  const threatFeeds = [
    {
      source: "MISP Threat Intelligence",
      status: "Active",
      lastUpdate: "5 minutes ago",
      indicators: 15420,
      confidence: "High",
      type: "Commercial"
    },
    {
      source: "AlienVault OTX",
      status: "Active", 
      lastUpdate: "12 minutes ago",
      indicators: 8950,
      confidence: "Medium",
      type: "Community"
    },
    {
      source: "VirusTotal Intelligence",
      status: "Active",
      lastUpdate: "3 minutes ago",
      indicators: 23100,
      confidence: "High",
      type: "Commercial"
    },
    {
      source: "FBI InfraGard",
      status: "Warning",
      lastUpdate: "1 hour ago",
      indicators: 1250,
      confidence: "High",
      type: "Government"
    },
    {
      source: "Cisco Talos Intelligence",
      status: "Active",
      lastUpdate: "8 minutes ago",
      indicators: 12480,
      confidence: "High",
      type: "Commercial"
    }
  ];

  const currentThreats = [
    {
      id: "TI-2024-001",
      name: "APT29 Cozy Bear Campaign",
      severity: "Critical",
      category: "APT",
      firstSeen: "2024-01-10",
      lastSeen: "2024-01-15",
      confidence: "High",
      targets: "Government, Healthcare",
      description: "Sophisticated phishing campaign targeting government entities with COVID-19 themed lures",
      indicators: 47,
      geography: "Global",
      attribution: "Russia-linked APT29",
      status: "Active"
    },
    {
      id: "TI-2024-002",
      name: "Ransomware-as-a-Service: LockBit",
      severity: "High",
      category: "Ransomware",
      firstSeen: "2024-01-08",
      lastSeen: "2024-01-15",
      confidence: "High",
      targets: "Financial, Manufacturing",
      description: "LockBit ransomware group targeting financial institutions with double extortion tactics",
      indicators: 23,
      geography: "North America, Europe",
      attribution: "LockBit Group",
      status: "Active"
    },
    {
      id: "TI-2024-003", 
      name: "Supply Chain Attack: SolarWinds II",
      severity: "Critical",
      category: "Supply Chain",
      firstSeen: "2024-01-12",
      lastSeen: "2024-01-14",
      confidence: "Medium",
      targets: "Technology, Government",
      description: "Suspected supply chain compromise affecting multiple software vendors",
      indicators: 12,
      geography: "Global",
      attribution: "Unknown",
      status: "Investigating"
    },
    {
      id: "TI-2024-004",
      name: "Cryptojacking Malware: XMRig Variant",
      severity: "Medium",
      category: "Cryptojacking",
      firstSeen: "2024-01-05",
      lastSeen: "2024-01-15",
      confidence: "High",
      targets: "Enterprise Networks",
      description: "Modified XMRig cryptocurrency miner spreading through compromised RDP connections",
      indicators: 156,
      geography: "Asia-Pacific",
      attribution: "Financially Motivated",
      status: "Monitoring"
    },
    {
      id: "TI-2024-005",
      name: "Business Email Compromise: CEO Fraud",
      severity: "High",
      category: "BEC",
      firstSeen: "2024-01-01",
      lastSeen: "2024-01-15",
      confidence: "Medium",
      targets: "SMB, Enterprise",
      description: "Sophisticated CEO fraud campaigns targeting finance departments during tax season",
      indicators: 34,
      geography: "North America",
      attribution: "Nigeria-linked Groups",
      status: "Active"
    }
  ];

  const iocs = [
    {
      type: "IP Address",
      value: "185.220.101.182",
      threat: "APT29 C2 Server",
      confidence: "High",
      firstSeen: "2024-01-14",
      source: "MISP"
    },
    {
      type: "Domain",
      value: "covid19-relief-gov[.]com",
      threat: "Phishing Campaign",
      confidence: "High",
      firstSeen: "2024-01-13",
      source: "VirusTotal"
    },
    {
      type: "File Hash",
      value: "d41d8cd98f00b204e9800998ecf8427e",
      threat: "LockBit Ransomware",
      confidence: "Medium",
      firstSeen: "2024-01-12",
      source: "Cisco Talos"
    },
    {
      type: "URL",
      value: "hxxps://secure-login-microsoft[.]tk/",
      threat: "Credential Harvesting",
      confidence: "High",
      firstSeen: "2024-01-15",
      source: "AlienVault OTX"
    },
    {
      type: "Email",
      value: "ceo@company-finance[.]org",
      threat: "BEC Campaign",
      confidence: "Medium",
      firstSeen: "2024-01-11",
      source: "FBI InfraGard"
    }
  ];

  const attackTechniques = [
    { technique: "T1566.001 - Spearphishing Attachment", count: 23, trend: "+15%" },
    { technique: "T1059.001 - PowerShell", count: 18, trend: "+8%" },
    { technique: "T1055 - Process Injection", count: 15, trend: "+22%" },
    { technique: "T1027 - Obfuscated Files", count: 12, trend: "-5%" },
    { technique: "T1071.001 - Web Protocols", count: 9, trend: "+12%" },
    { technique: "T1105 - Ingress Tool Transfer", count: 7, trend: "+18%" }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      "Critical": "status-danger",
      "High": "status-danger",
      "Medium": "status-warning",
      "Low": "status-success"
    };
    return colors[severity as keyof typeof colors] || "status-info";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "status-danger",
      "Monitoring": "status-warning",
      "Investigating": "status-info",
      "Inactive": "status-success"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const getConfidenceColor = (confidence: string) => {
    const colors = {
      "High": "status-success",
      "Medium": "status-warning",
      "Low": "status-danger"
    };
    return colors[confidence as keyof typeof colors] || "status-info";
  };

  const getFeedStatusColor = (status: string) => {
    const colors = {
      "Active": "status-success",
      "Warning": "status-warning",
      "Error": "status-danger",
      "Inactive": "status-info"
    };
    return colors[status as keyof typeof colors] || "status-info";
  };

  const filteredThreats = currentThreats.filter(threat => {
    const matchesSearch = threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = threatFilter === "all" || threat.category === threatFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Threat Intelligence</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive threat intelligence feeds, indicators, and analysis
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Feeds
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export IOCs
          </Button>
          <Button className="w-full sm:w-auto">
            <Target className="h-4 w-4 mr-2" />
            Hunt Threats
          </Button>
        </div>
      </div>

      {/* Threat Intelligence Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Threats</p>
                <p className="text-3xl font-bold text-danger">{currentThreats.filter(t => t.status === "Active").length}</p>
              </div>
              <div className="p-3 bg-danger/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">IOC Indicators</p>
                <p className="text-3xl font-bold text-primary">{iocs.length * 1000 + 247}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Intelligence Feeds</p>
                <p className="text-3xl font-bold text-success">{threatFeeds.length}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Globe className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attack Techniques</p>
                <p className="text-3xl font-bold text-warning">{attackTechniques.length * 10 + 4}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Layers className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intelligence Feeds Status */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            Threat Intelligence Feeds
          </CardTitle>
          <CardDescription>
            Status and health of external threat intelligence sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatFeeds.map((feed, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{feed.source}</h3>
                  <Badge className={`status-badge ${getFeedStatusColor(feed.status)}`}>
                    {feed.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Indicators:</span>
                    <span className="font-medium">{feed.indicators.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <Badge className={`status-badge ${getConfidenceColor(feed.confidence)} text-xs`}>
                      {feed.confidence}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{feed.type}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Updated: {feed.lastUpdate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="threats">Current Threats</TabsTrigger>
          <TabsTrigger value="iocs">IOCs & Indicators</TabsTrigger>
          <TabsTrigger value="techniques">Attack Techniques</TabsTrigger>
          <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="threats">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle>Current Threat Landscape</CardTitle>
              <CardDescription>
                Active and emerging threats based on intelligence feeds
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search threats by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={threatFilter} onValueChange={setThreatFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="APT">APT</SelectItem>
                    <SelectItem value="Ransomware">Ransomware</SelectItem>
                    <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                    <SelectItem value="Cryptojacking">Cryptojacking</SelectItem>
                    <SelectItem value="BEC">BEC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredThreats.map((threat) => (
                  <div key={threat.id} className="p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-lg">{threat.name}</h3>
                          <Badge className={`status-badge ${getSeverityColor(threat.severity)}`}>
                            {threat.severity}
                          </Badge>
                          <Badge className={`status-badge ${getStatusColor(threat.status)}`}>
                            {threat.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {threat.category}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{threat.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Attribution:</span>
                            <div className="font-medium">{threat.attribution}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Targets:</span>
                            <div className="font-medium">{threat.targets}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Geography:</span>
                            <div className="font-medium">{threat.geography}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <Badge className={`status-badge ${getConfidenceColor(threat.confidence)} text-xs`}>
                              {threat.confidence}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">IOCs:</span>
                            <div className="font-medium">{threat.indicators} indicators</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Timeline:</span>
                            <div className="font-medium">{threat.firstSeen} - {threat.lastSeen}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="w-full lg:w-auto">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          IOCs
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iocs">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle>Indicators of Compromise (IOCs)</CardTitle>
              <CardDescription>
                Current indicators extracted from threat intelligence feeds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Indicator Value</th>
                      <th>Associated Threat</th>
                      <th>Confidence</th>
                      <th>First Seen</th>
                      <th>Source</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iocs.map((ioc, index) => (
                      <tr key={index}>
                        <td>
                          <Badge variant="outline" className="text-xs">
                            {ioc.type}
                          </Badge>
                        </td>
                        <td>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {ioc.value}
                          </code>
                        </td>
                        <td className="font-medium">{ioc.threat}</td>
                        <td>
                          <Badge className={`status-badge ${getConfidenceColor(ioc.confidence)}`}>
                            {ioc.confidence}
                          </Badge>
                        </td>
                        <td className="text-sm text-muted-foreground">{ioc.firstSeen}</td>
                        <td className="text-sm">{ioc.source}</td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techniques">
          <Card className="enterprise-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-primary" />
                MITRE ATT&CK Techniques
              </CardTitle>
              <CardDescription>
                Most observed attack techniques based on current threat landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attackTechniques.map((technique, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{technique.technique}</h3>
                      <Badge variant="outline" className="text-xs">
                        {technique.count} observed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trend:</span>
                      <span className={`font-medium ${
                        technique.trend.startsWith('+') ? 'text-danger' : 'text-success'
                      }`}>
                        <TrendingUp className={`h-3 w-3 inline mr-1 ${
                          technique.trend.startsWith('-') ? 'transform rotate-180' : ''
                        }`} />
                        {technique.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Threat Actor Profiles</CardTitle>
                <CardDescription>
                  Known threat actors and their capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">APT29 (Cozy Bear)</h3>
                      <Badge className="status-badge status-danger">Critical</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Russia-linked advanced persistent threat group targeting government entities
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <Users className="h-3 w-3" />
                      <span>Government, Healthcare targets</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">LockBit Group</h3>
                      <Badge className="status-badge status-danger">High</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ransomware-as-a-Service operation with global reach
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <Users className="h-3 w-3" />
                      <span>Financial, Manufacturing targets</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Threat origins and target locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Threat geography visualization</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Top Threat Origins:</div>
                    <div className="text-muted-foreground">Russia (35%)</div>
                    <div className="text-muted-foreground">China (28%)</div>
                    <div className="text-muted-foreground">North Korea (15%)</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Most Targeted:</div>
                    <div className="text-muted-foreground">North America (45%)</div>
                    <div className="text-muted-foreground">Europe (32%)</div>
                    <div className="text-muted-foreground">Asia-Pacific (23%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}