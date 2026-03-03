import { motion } from "framer-motion";
import { FileText, Download, Printer, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reportTypes = [
  { title: "Assessment Summary Report", description: "Overview of all assessments with status breakdown", icon: BarChart3, count: 142 },
  { title: "Material Compliance Report", description: "Compliance status for all raw materials assessed", icon: PieChart, count: 89 },
  { title: "Approval Cycle Time Report", description: "Average time from initiation to final approval", icon: TrendingUp, count: 34 },
  { title: "Audit Trail Export", description: "Complete audit trail log for regulatory inspection", icon: FileText, count: 1205 },
];

const recentReports = [
  { name: "Monthly Assessment Summary - Feb 2026", generated: "2026-03-01", by: "Admin", format: "PDF" },
  { name: "Q4 2025 Compliance Report", generated: "2026-01-05", by: "QA Manager", format: "PDF" },
  { name: "Material Risk Assessment - Naidupeta Unit-I", generated: "2026-02-20", by: "R. Sharma", format: "Excel" },
  { name: "Audit Trail Export - Jan 2026", generated: "2026-02-01", by: "Admin", format: "CSV" },
];

const Reports = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> Reports
        </h1>
        <p className="text-sm text-muted-foreground">Generate and export compliance reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((report) => (
          <Card key={report.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                  <report.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary" className="text-[10px]">{report.count} records</Badge>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-xs ml-auto">
                      <Download className="h-3 w-3" /> Generate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recently Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.generated} • {r.by}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-[10px]">{r.format}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Printer className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Reports;
