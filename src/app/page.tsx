import { Link } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Button>
      <Link href="/price">Price</Link>
    </Button>
  );
}
