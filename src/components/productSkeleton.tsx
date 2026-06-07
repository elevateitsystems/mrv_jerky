import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border border-white/10 bg-[#070609]">
      <CardHeader className="p-0">
        <Skeleton className="aspect-[4/5] w-full rounded-none bg-zinc-800" />
      </CardHeader>

      <CardContent className="space-y-3 p-6">
        <Skeleton className="h-4 w-20 bg-zinc-800" />

        <Skeleton className="h-7 w-32 bg-zinc-800" />

        <Skeleton className="h-6 w-20 bg-zinc-800" />

        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-3/4 bg-zinc-800" />

        <Skeleton className="mt-2 h-4 w-24 bg-zinc-800" />
      </CardContent>

      <CardFooter className="p-6 pt-0 border-t-0 bg-[#070609] ">
        <Skeleton className="h-11 w-full bg-zinc-800" />
      </CardFooter>
    </Card>
  );
}
