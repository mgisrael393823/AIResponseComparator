import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ResponsePanelProps {
  title: string;
  response?: string;
  isLoading: boolean;
  accentColor: string;
}

export default function ResponsePanel({
  title,
  response,
  isLoading,
  accentColor,
}: ResponsePanelProps) {
  const colorClasses = {
    blue: "border-blue-500/20 hover:border-blue-500/30",
    purple: "border-purple-500/20 hover:border-purple-500/30",
    green: "border-green-500/20 hover:border-green-500/30",
  }[accentColor] || "border-gray-200";

  return (
    <Card className={cn(
      "transition-all duration-300 border-2",
      colorClasses,
      !response && !isLoading && "opacity-50"
    )}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : response ? (
          <p className="whitespace-pre-wrap">{response}</p>
        ) : (
          <p className="text-muted-foreground">No response yet</p>
        )}
      </CardContent>
    </Card>
  );
}
