import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileEdit, ShieldCheck, User, Calendar, CircleDollarSign } from "lucide-react";
import Image from "next/image";

export default function Insurance() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 p-6">
        <div className="flex items-center gap-4">
          <Image src="https://picsum.photos/seed/insurance-logo/64/64" alt="Insurance Logo" width={64} height={64} className="rounded-lg" data-ai-hint="company logo"/>
          <div>
            <CardTitle className="text-2xl font-headline">Star Health Insurance</CardTitle>
            <CardDescription>Family Health Optima</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Policy Information</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Policy Number</span>
                <p className="font-medium">SHAPPO-987654321</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Policy Holder</span>
                <p className="font-medium">Anjali Devi</p>
              </div>
            </li>
             <li className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Effective Dates</span>
                <p className="font-medium">01/01/2024 - 12/31/2024</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Coverage Details</h3>
           <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <CircleDollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Individual Deductible</span>
                <p className="font-medium">₹50,000 / ₹2,50,000 (met / total)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CircleDollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Family Deductible</span>
                <p className="font-medium">₹1,00,000 / ₹5,00,000 (met / total)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
                <CircleDollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div>
                    <span className="text-muted-foreground">Out-of-pocket Max</span>
                    <p className="font-medium">₹3,00,000 / ₹8,00,000 (met / total)</p>
                </div>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 flex justify-end">
        <Button>
          <FileEdit className="mr-2 h-4 w-4" />
          Update Information
        </Button>
      </CardFooter>
    </Card>
  );
}
