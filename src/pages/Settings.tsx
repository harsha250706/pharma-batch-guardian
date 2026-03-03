import { motion } from "framer-motion";
import { Settings as SettingsIcon, Users, Shield, Bell, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const users = [
  { name: "R. Sharma", email: "r.sharma@pharma.com", role: "Initiator", status: "Active" },
  { name: "P. Kumar", email: "p.kumar@pharma.com", role: "Reviewer", status: "Active" },
  { name: "Dr. A. Verma", email: "a.verma@pharma.com", role: "Approver", status: "Active" },
  { name: "S. Reddy", email: "s.reddy@pharma.com", role: "QA", status: "Active" },
  { name: "Admin", email: "admin@pharma.com", role: "Admin", status: "Active" },
];

const roleColors: Record<string, string> = {
  Initiator: "bg-info/10 text-info",
  Reviewer: "bg-warning/10 text-warning",
  Approver: "bg-success/10 text-success",
  QA: "bg-primary/10 text-primary",
  Admin: "bg-destructive/10 text-destructive",
};

const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground">System configuration and user management</p>
      </div>

      {/* Users */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><Users className="h-4 w-4" /> User Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((u) => (
            <div key={u.email} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <Badge className={`text-[10px] border-0 ${roleColors[u.role] || ""}`}>{u.role}</Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2">Add User</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Email notifications for pending reviews", "SMS alerts for overdue assessments", "Daily digest summary"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <Label className="text-sm">{item}</Label>
              <Switch />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><Shield className="h-4 w-4" /> Compliance Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Enforce electronic signatures</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">21 CFR Part 11 audit trail</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Require dual approval for closure</Label>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm">Session timeout (minutes)</Label>
            <Input type="number" defaultValue="30" className="w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Backup */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><Database className="h-4 w-4" /> Data & Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Last backup: 2026-03-03 02:00 UTC</p>
          <Button variant="outline" size="sm">Run Manual Backup</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Settings;
