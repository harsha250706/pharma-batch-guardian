import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Save,
  FileUp,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const STEPS = [
  "Batch Details",
  "New Raw Materials",
  "Existing Raw Materials",
  "Process Documents",
  "Material Assessment",
  "Cross-Functional Approvals",
  "QA Evaluation",
  "Department Comments",
  "PR Status",
  "Final Closure",
];

interface MaterialRow {
  id: number;
  stage: string;
  name: string;
  category: string;
  manufacturer: string;
  address: string;
}

interface ExistingMaterialRow {
  id: number;
  sno: string;
  stage: string;
  name: string;
  category: string;
  itemCode: string;
}

const emptyMaterial = (): MaterialRow => ({
  id: Date.now(),
  stage: "",
  name: "",
  category: "",
  manufacturer: "",
  address: "",
});

const emptyExisting = (): ExistingMaterialRow => ({
  id: Date.now(),
  sno: "",
  stage: "",
  name: "",
  category: "",
  itemCode: "",
});

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const NewAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [materials, setMaterials] = useState<MaterialRow[]>([emptyMaterial()]);
  const [existingMaterials, setExistingMaterials] = useState<ExistingMaterialRow[]>([emptyExisting()]);

  const goTo = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const addMaterialRow = () => {
    if (materials.length < 12) setMaterials([...materials, emptyMaterial()]);
  };

  const removeMaterialRow = (id: number) => {
    if (materials.length > 1) setMaterials(materials.filter((m) => m.id !== id));
  };

  const addExistingRow = () => setExistingMaterials([...existingMaterials, emptyExisting()]);
  const removeExistingRow = (id: number) => {
    if (existingMaterials.length > 1) setExistingMaterials(existingMaterials.filter((m) => m.id !== id));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="date">Assessment Date</Label>
              <Input id="date" type="date" aria-label="Assessment date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="e.g., Metformin HCl 500mg" aria-label="Product name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-code">Product Code</Label>
              <Input id="product-code" placeholder="e.g., MET-500" aria-label="Product code" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plant">
                Manufacturing Plant
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1 text-muted-foreground cursor-help text-xs">(i)</span>
                  </TooltipTrigger>
                  <TooltipContent>Select the plant where the batch will be manufactured</TooltipContent>
                </Tooltip>
              </Label>
              <Select>
                <SelectTrigger id="plant" aria-label="Manufacturing plant">
                  <SelectValue placeholder="Select plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naidupeta-1">Naidupeta Unit-I</SelectItem>
                  <SelectItem value="naidupeta-2">Naidupeta Unit-II</SelectItem>
                  <SelectItem value="naidupeta-3">Naidupeta Unit-III</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="batch-no">Batch Number</Label>
              <Input id="batch-no" placeholder="e.g., MET-2603-A" aria-label="Batch number" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea id="remarks" placeholder="Any additional notes..." rows={3} aria-label="Remarks" />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Add up to 12 new raw materials (M1-M12)</p>
              <Button variant="outline" size="sm" onClick={addMaterialRow} disabled={materials.length >= 12} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Row
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs w-10">#</TableHead>
                    <TableHead className="text-xs">Stage/Step</TableHead>
                    <TableHead className="text-xs">Material Name</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Manufacturer</TableHead>
                    <TableHead className="text-xs">Address</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((m, i) => (
                    <TableRow key={m.id}>
                      <TableCell className="text-xs font-medium text-muted-foreground">M{i + 1}</TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Stage" /></TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Name" /></TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Category" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="excipient">Excipient</SelectItem>
                            <SelectItem value="packaging">Packaging</SelectItem>
                            <SelectItem value="solvent">Solvent</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Manufacturer" /></TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Address" /></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeMaterialRow(m.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Existing approved raw materials for this product</p>
              <Button variant="outline" size="sm" onClick={addExistingRow} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Row
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">S.No.</TableHead>
                    <TableHead className="text-xs">Stage/Step</TableHead>
                    <TableHead className="text-xs">Material Name</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Item Code</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingMaterials.map((m, i) => (
                    <TableRow key={m.id}>
                      <TableCell><Input className="h-8 text-sm w-16" defaultValue={String(i + 1)} /></TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Stage" /></TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Name" /></TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Category" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="excipient">Excipient</SelectItem>
                            <SelectItem value="packaging">Packaging</SelectItem>
                            <SelectItem value="solvent">Solvent</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell><Input className="h-8 text-sm" placeholder="Item Code" /></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeExistingRow(m.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">Reference process documents for this assessment</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["BMR (Batch Manufacturing Record)", "BPR (Batch Packing Record)", "Process Flow Diagram", "Stability Protocol"].map((doc) => (
                <Card key={doc} className="shadow-card">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium">{doc}</span>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <FileUp className="h-3.5 w-3.5" /> Upload
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <span className="text-lg font-semibold text-muted-foreground">{currentStep + 1}</span>
            </div>
            <h3 className="font-semibold mb-1">{STEPS[currentStep]}</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              This section will be implemented with full form fields, validation, and compliance controls.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Assessment</h1>
          <p className="text-sm text-muted-foreground">Create a new batch raw material assessment</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Save className="h-3.5 w-3.5" /> Save Draft
        </Button>
      </motion.div>

      {/* Stepper */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {STEPS.map((step, i) => (
            <button
              key={step}
              onClick={() => goTo(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                i === currentStep
                  ? "bg-primary text-primary-foreground"
                  : i < currentStep
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i < currentStep ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{step}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <Card className="shadow-card min-h-[400px]">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">{currentStep + 1}/{STEPS.length}</Badge>
            {STEPS[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => goTo(currentStep - 1)} disabled={currentStep === 0} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={() => goTo(currentStep + 1)} className="gap-1.5 pharma-gradient border-0">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-1.5 bg-success hover:bg-success/90 border-0">
            <Check className="h-4 w-4" /> Submit for Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewAssessment;
