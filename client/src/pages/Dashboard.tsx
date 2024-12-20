import { useState } from "react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import ResponsePanel from "@/components/ResponsePanel";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/compare', query],
    queryFn: async () => {
      if (!query) return null;
      const res = await fetch(`/api/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error('Failed to fetch responses');
      return res.json();
    },
    enabled: false,
  });

  const handleSubmit = async (input: string) => {
    setQuery(input);
    try {
      await refetch();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch AI responses",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">AI Response Comparison</h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <Card className="p-4 mb-8 bg-destructive/10 text-destructive">
            {error.message}
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResponsePanel 
            title="OpenAI"
            response={data?.openai}
            isLoading={isLoading}
            accentColor="blue"
          />
          <ResponsePanel
            title="Perplexity"
            response={data?.perplexity}
            isLoading={isLoading}
            accentColor="purple"
          />
          <ResponsePanel
            title="Cloud AI"
            response={data?.cloud}
            isLoading={isLoading}
            accentColor="green"
          />
        </div>
      </div>
    </div>
  );
}
