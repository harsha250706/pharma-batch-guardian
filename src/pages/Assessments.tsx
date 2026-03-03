import { motion } from "framer-motion";
import { ClipboardList, Search, Filter, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const assessments = [
  { id: "BRAHMS-2026-0142", product: "Metformin HCl 500mg", batch: "MET-2603-A", plant: "Naidupeta Unit-I", status: "Pending Review", date: "2026-02-28", initiator: "R. Sharma" },
  { id: "BRAHMS-2026-0141", product: "Amlodipine Besylate 5mg", batch: "AML-2603-B", plant: "Naidupeta Unit-II", status: "In Progress", date: "2026-02-27", initiator: "P. Kumar" },
  { id: "BRAHMS-2026-0140", product: "Omeprazole 20mg", batch: "OMP-2602-C", plant: "Naidupeta Unit-I", status: "Approved", date: "2026-02-25", initiator: "S. Reddy" },
  { id: "BRAHMS-2026-0139", product: "Losartan Potassium 50mg", batch: "LOS-2602-A", plant: "Naidupeta Unit-III", status: "QA Review", date: "2026-02-24", initiator: "A. Patel" },
  { id: "BRAHMS-2026-0138", product: "Ciprofloxacin 250mg", batch: "CIP-2602-D", plant: "Naidupeta Unit-II", status: "Approved", date: "2026-02-22", initiator: "M. Singh" },
  { id: "BRAHMS-2026-0137", product: "Atorvastatin 10mg", batch: "ATV-2602-B", plant: "Naidupeta Unit-I", status: "Closed", date: "2026-02-20", initiator: "V. Rao" },
  { id: "BRAHMS-2026-0136", product: "Paracetamol 650mg", batch: "PAR-2602-A", plant: "Naidupeta Unit-III", status: "Closed", date: "2026-02-18", initiator: "K. Naidu" },
  { id: "BRAHMS-2026-0135", product: "Ibuprofen 400mg", batch: "IBU-2602-C", plant: "Naidupeta Unit-I", status: "Approved", date: "2026-02-15", initiator: "D. Gupta" },
];

const statusColors: Record<string, string> = {
  "Pending Review": "bg-warning/10 text-warning border-warning/20",
  "In Progress": "bg-info/10 text-info border-info/20",
  "Approved": "bg-success/10 text-success border-success/20",
  "QA Review": "bg-primary/10 text-primary border-primary/20",
  "Closed": "bg-muted text-muted-foreground border-border",
};

const Assessments = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" /> Assessments
          </h1>
          <p className="text-sm text-muted-foreground">View and manage all batch raw material assessments</p>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg">All Assessments</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-9 w-[200px]" />
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
                <TableHead className="font-semibold text-xs uppercase">ID</TableHead>
                <TableHead className="font-semibold text-xs uppercase">Product</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Batch</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden lg:table-cell">Plant</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden lg:table-cell">Initiator</TableHead>
                <TableHead className="font-semibold text-xs uppercase">Status</TableHead>
                <TableHead className="font-semibold text-xs uppercase hidden md:table-cell">Date</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((a) => (
                <TableRow key={a.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-primary text-sm">{a.id}</TableCell>
                  <TableCell className="text-sm">{a.product}</TableCell>
                  <TableCell className="text-sm hidden md:table-cell text-muted-foreground">{a.batch}</TableCell>
                  <TableCell className="text-sm hidden lg:table-cell text-muted-foreground">{a.plant}</TableCell>
                  <TableCell className="text-sm hidden lg:table-cell text-muted-foreground">{a.initiator}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[11px] ${statusColors[a.status] || ""}`}>{a.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm hidden md:table-cell text-muted-foreground">{a.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Assessments;
