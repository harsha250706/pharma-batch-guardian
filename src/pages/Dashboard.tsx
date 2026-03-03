import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Assessments", value: "142", icon: ClipboardList, change: "+12 this month", color: "text-primary" },
  { label: "Pending Review", value: "8", icon: Clock, change: "3 urgent", color: "text-warning" },
  { label: "Approved", value: "127", icon: CheckCircle2, change: "89% rate", color: "text-success" },
  { label: "Requires Action", value: "7", icon: AlertCircle, change: "2 overdue", color: "text-destructive" },
];

const assessments = [
  { id: "BRAHMS-2026-0142", product: "Metformin HCl 500mg", batch: "MET-2603-A", plant: "Naidupeta Unit-I", status: "Pending Review", date: "2026-02-28", initiator: "R. Sharma" },
  { id: "BRAHMS-2026-0141", product: "Amlodipine Besylate 5mg", batch: "AML-2603-B", plant: "Naidupeta Unit-II", status: "In Progress", date: "2026-02-27", initiator: "P. Kumar" },
  { id: "BRAHMS-2026-0140", product: "Omeprazole 20mg", batch: "OMP-2602-C", plant: "Naidupeta Unit-I", status: "Approved", date: "2026-02-25", initiator: "S. Reddy" },
  { id: "BRAHMS-2026-0139", product: "Losartan Potassium 50mg", batch: "LOS-2602-A", plant: "Naidupeta Unit-III", status: "QA Review", date: "2026-02-24", initiator: "A. Patel" },
  { id: "BRAHMS-2026-0138", product: "Ciprofloxacin 250mg", batch: "CIP-2602-D", plant: "Naidupeta Unit-II", status: "Approved", date: "2026-02-22", initiator: "M. Singh" },
  { id: "BRAHMS-2026-0137", product: "Atorvastatin 10mg", batch: "ATV-2602-B", plant: "Naidupeta Unit-I", status: "Closed", date: "2026-02-20", initiator: "V. Rao" },
];

const statusColors: Record<string, string> = {
  "Pending Review": "bg-warning/10 text-warning border-warning/20",
  "In Progress": "bg-info/10 text-info border-info/20",
  "Approved": "bg-success/10 text-success border-success/20",
  "QA Review": "bg-primary/10 text-primary border-primary/20",
  "Closed": "bg-muted text-muted-foreground border-border",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Batch raw material assessment overview</p>
        </div>
        <Button onClick={() => navigate("/assessment/new")} className="gap-2 pharma-gradient border-0">
          <FilePlus className="h-4 w-4" />
          New Assessment
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={item}>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg">Recent Assessments</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assessments..." className="pl-9 h-9 w-[200px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[130px]">
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-xs uppercase">Assessment ID</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Product</TableHead>
                  <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Batch</TableHead>
                  <TableHead className="font-semibold text-xs uppercase hidden lg:table-cell">Plant</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Status</TableHead>
                  <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Date</TableHead>
                  <TableHead className="font-semibold text-xs uppercase w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-primary text-sm">{a.id}</TableCell>
                    <TableCell className="text-sm">{a.product}</TableCell>
                    <TableCell className="text-sm hidden md:table-cell text-muted-foreground">{a.batch}</TableCell>
                    <TableCell className="text-sm hidden lg:table-cell text-muted-foreground">{a.plant}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[11px] ${statusColors[a.status] || ""}`}>
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm hidden md:table-cell text-muted-foreground">{a.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
