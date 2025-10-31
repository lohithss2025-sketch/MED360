import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const schemes = [
    {
        name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
        description: "Provides health coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
        logoUrl: "https://picsum.photos/seed/pmjay/80/80",
        link: "#"
    },
    {
        name: "Rashtriya Swasthya Bima Yojana (RSBY)",
        description: "Aims to provide health insurance coverage for Below Poverty Line (BPL) families.",
        logoUrl: "https://picsum.photos/seed/rsby/80/80",
        link: "#"
    },
    {
        name: "Central Government Health Scheme (CGHS)",
        description: "Comprehensive medical care facilities for Central Government employees and pensioners.",
        logoUrl: "https://picsum.photos/seed/cghs/80/80",
        link: "#"
    },
    {
        name: "State Health Insurance Schemes",
        description: "Various schemes offered by state governments, e.g., 'Bhamashah Swasthya Bima Yojana' in Rajasthan.",
        logoUrl: "https://picsum.photos/seed/state/80/80",
        link: "#"
    }
]

export default function MedicalSchemes() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Government Medical Schemes</CardTitle>
          <CardDescription>Information on various health schemes available for citizens.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {schemes.map((scheme, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex-row items-start gap-4">
                 <Image src={scheme.logoUrl} alt={`${scheme.name} logo`} width={80} height={80} className="rounded-lg" data-ai-hint="government logo"/>
                 <div>
                    <CardTitle className="text-lg">{scheme.name}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
              </CardContent>
              <CardContent>
                 <Button variant="link" asChild className="p-0 h-auto">
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                        Learn More <ArrowUpRight className="h-4 w-4 ml-1" />
                    </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
