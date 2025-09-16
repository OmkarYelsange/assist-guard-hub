import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Monitor, AlertTriangle, CheckSquare, ArrowRight, BarChart3, Users, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Security Operations",
      description: "Monitor and respond to security incidents in real-time with comprehensive SOC capabilities",
      icon: Monitor,
      path: "/operations",
      color: "bg-gradient-primary",
      features: ["Incident Management", "Threat Intelligence", "Security Monitoring", "Response Automation"]
    },
    {
      title: "Governance",
      description: "Manage security policies, standards, and governance frameworks across your organization",
      icon: Shield,
      path: "/governance", 
      color: "bg-gradient-secondary",
      features: ["Policy Management", "Standards Framework", "Governance Committees", "Strategic Planning"]
    },
    {
      title: "Risk Management",
      description: "Identify, assess, and manage organizational security risks with comprehensive risk analytics",
      icon: AlertTriangle,
      path: "/risk",
      color: "bg-gradient-status",
      features: ["Risk Register", "Risk Assessments", "Treatment Plans", "Risk Analytics"]
    },
    {
      title: "Compliance",
      description: "Ensure regulatory compliance and manage audits across multiple security frameworks",
      icon: CheckSquare,
      path: "/compliance",
      color: "bg-gradient-subtle",
      features: ["Framework Management", "Audit Tracking", "Evidence Repository", "Compliance Reporting"]
    }
  ];

  const stats = [
    { label: "Security Frameworks", value: "8+", icon: Lock },
    { label: "Active Policies", value: "156", icon: Shield },
    { label: "Risk Assessments", value: "89", icon: AlertTriangle },
    { label: "SOC Incidents", value: "12", icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">CISO Assistant</h1>
                <p className="text-muted-foreground">Comprehensive Security Management Platform</p>
              </div>
            </div>
            <Button onClick={() => navigate('/operations')} size="lg">
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Enterprise Security Management Made Simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamline your security operations, governance, risk management, and compliance 
            with our integrated platform designed for modern cybersecurity teams.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="enterprise-card text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <Card 
              key={index} 
              className="enterprise-card hover:shadow-medium transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(module.path)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-lg ${module.color}`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Access Module <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-primary rounded-lg text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Security Operations?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of security professionals who trust CISO Assistant to manage their 
            cybersecurity programs effectively and efficiently.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/operations')}
            >
              Start with Operations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/governance')}
            >
              Explore Governance
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
