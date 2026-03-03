import { motion } from "framer-motion";
import { Shield, Search, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const auditLogs = [
  { timestamp: "2026-03-03 09:14:22", user: "R. Sharma", role: "Initiator", action: "Created Assessment", target: "BRAHMS-2026-0142", detail: "New assessment for Metformin HCl 500mg" },
  { timestamp: "2026-03-02 16:45:10", user: "P. Kumar", role: "Initiator", action: "Uploaded Document", target: "BRAHMS-2026-0141", detail: "Attached BMR document" },
  { timestamp: "2026-03-02 14:30:05", user: "Dr. A. Verma", role: "Reviewer", action: "Approved Step", target: "BRAHMS-2026-0140", detail: "Material Assessment approved" },
  { timestamp: "2026-03-01 11:20:33", user: "S. Reddy", role: "Initiator", action: "Modified Materials", target: "BRAHMS-2026-0140", detail: "Added M4 - Sodium Lauryl Sulfate" },
  { timestamp: "2026-03-01 09:05:18", user: "Admin", role: "Admin", action: "User Role Changed", target: "User: M. Singh", detail: "Changed from Initiator to Reviewer" },
  { timestamp: "2026-02-28 17:55:42", user: "A. Patel", role: "QA", action: "QA Evaluation", target: "BRAHMS-2026-0139", detail: "Risk assessment completed" },
  { timestamp: "2026-02-28 15:12:07", user: "V. Rao", role: "Approver", action: "Final Approval", target: "BRAHMS-2026-0137", detail: "Assessment closed with e-signature" },
  { timestamp: "2026-02-27 10:30:50", user: "System", role: "System", action: "Auto-Notification", target: "BRAHMS-2026-0139", detail: "Review reminder sent to approvers" },
];

const actionColors: Record<string, string> = {
  "Created Assessment": "bg-success/10 text-success",
  "Uploaded Document": "bg-info/10 text-info",
  "Approved Step": "bg-success/10 text-success",
  "Modified Materials": "bg-warning/10 text-warning",
  "User Role Changed": "bg-primary/10 text-primary",
  "QA Evaluation": "bg-primary/10 text-primary",
  "Final Approval": "bg-success/10 text-success",
  "Auto-Notification": "bg-muted text-muted-foreground",
};

const AuditTrail = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" /> Audit Trail
          </h1>
          <p className="text-sm text-muted-foreground">Secure, non-editable log of all system actions (21 CFR Part 11 compliant)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Print</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg">Activity Log</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-9 h-9 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-xs uppercase">Timestamp</TableHead>
                <TableHead className="font-semibold text-xs uppercase">User</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Role</TableHead>
                <TableHead className="font-semibold text-xs uppercase">Action</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Target</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden lg:table-cell">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell className="text-sm font-medium">{log.user}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-[10px]">{log.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-[11px] border-0 ${actionColors[log.action] || "bg-muted text-muted-foreground"}`}>{log.action}</Badge>
                  </TableCell>
                  <TableCell className="text-sm hidden md:table-cell text-primary font-medium">{log.target}</TableCell>
                  <TableCell className="text-sm hidden lg:table-cell text-muted-foreground max-w-[250px] truncate">{log.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuditTrail;
