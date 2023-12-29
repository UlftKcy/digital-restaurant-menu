import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Soup } from "lucide-react";

export default function EmptyMenu() {
  return (
    <Alert className="flex flex-col items-center justify-center sm:w-1/2 h-64 mx-auto space-y-3">
      <AlertTitle>
        <Soup className="text-slate-500" size={64}/>
      </AlertTitle>
      <AlertDescription className="text-lg">No meal added yet!</AlertDescription>
    </Alert>
  );
}
