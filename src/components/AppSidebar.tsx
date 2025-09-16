import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Shield,
  Activity,
  AlertTriangle,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Database,
  Lock,
  Monitor,
  BookOpen,
  Target,
  Zap,
  Menu,
  X
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainModules = [
  {
    title: "Operations",
    url: "/operations",
    icon: Monitor,
    description: "Security Operations Center",
    submenu: [
      { title: "Dashboard", url: "/operations", icon: BarChart3 },
      { title: "Incidents", url: "/operations/incidents", icon: AlertTriangle },
      { title: "Monitoring", url: "/operations/monitoring", icon: Activity },
      { title: "Threat Intelligence", url: "/operations/threats", icon: Zap },
    ]
  },
  {
    title: "Governance",
    url: "/governance",
    icon: Shield,
    description: "Security Governance & Policies",
    submenu: [
      { title: "Dashboard", url: "/governance", icon: BarChart3 },
      { title: "Policies", url: "/governance/policies", icon: FileText },
      { title: "Standards", url: "/governance/standards", icon: BookOpen },
      { title: "Committees", url: "/governance/committees", icon: Users },
    ]
  },
  {
    title: "Risk Management",
    url: "/risk",
    icon: AlertTriangle,
    description: "Risk Assessment & Treatment",
    submenu: [
      { title: "Dashboard", url: "/risk", icon: BarChart3 },
      { title: "Risk Register", url: "/risk/register", icon: Database },
      { title: "Assessments", url: "/risk/assessments", icon: Target },
      { title: "Treatment Plans", url: "/risk/treatment", icon: TrendingUp },
    ]
  },
  {
    title: "Compliance",
    url: "/compliance",
    icon: CheckSquare,
    description: "Compliance & Audit Management",
    submenu: [
      { title: "Dashboard", url: "/compliance", icon: BarChart3 },
      { title: "Frameworks", url: "/compliance/frameworks", icon: Lock },
      { title: "Audits", url: "/compliance/audits", icon: CheckSquare },
      { title: "Evidence", url: "/compliance/evidence", icon: FileText },
    ]
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const isActiveModule = (moduleUrl: string) => {
    return currentPath.startsWith(moduleUrl);
  };

  const isActiveSubmenu = (url: string) => {
    return currentPath === url;
  };

  const getNavClasses = (isActive: boolean) => {
    return `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-foreground shadow-glow"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;
  };

  const getSubmenuClasses = (isActive: boolean) => {
    return `flex items-center space-x-3 p-2 pl-6 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary/10 text-primary border-l-2 border-primary"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    }`;
  };

  return (
    <Sidebar
      className={`border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">CISO Assistant</h1>
                <p className="text-xs text-sidebar-foreground/60">Security Management</p>
              </div>
            </div>
          )}
          {collapsed && <Shield className="h-8 w-8 text-primary mx-auto" />}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Modules
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainModules.map((module) => {
                const isModuleActive = isActiveModule(module.url);
                const isExpanded = expandedModule === module.title || isModuleActive;
                
                return (
                  <div key={module.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="p-0">
                        <div>
                          <NavLink
                            to={module.url}
                            className={getNavClasses(isModuleActive)}
                            onClick={() => {
                              setExpandedModule(
                                expandedModule === module.title ? null : module.title
                              );
                            }}
                          >
                            <module.icon className="h-5 w-5 flex-shrink-0" />
                            {!collapsed && (
                              <div className="flex-1">
                                <div className="font-medium">{module.title}</div>
                                <div className="text-xs opacity-70">{module.description}</div>
                              </div>
                            )}
                          </NavLink>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Submenu */}
                    {!collapsed && isExpanded && (
                      <div className="mt-1 space-y-1">
                        {module.submenu.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton asChild className="p-0">
                              <NavLink
                                to={item.url}
                                className={getSubmenuClasses(isActiveSubmenu(item.url))}
                              >
                                <item.icon className="h-4 w-4" />
                                <span className="text-sm">{item.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-0">
              <NavLink
                to="/settings"
                className={getNavClasses(currentPath === "/settings")}
              >
                <Settings className="h-5 w-5" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}