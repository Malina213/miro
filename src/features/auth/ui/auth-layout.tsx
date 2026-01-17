import { AuroraBackground } from "@/shared/ui/kit/bg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: string;
  description: string;
  footerText: React.ReactNode;
}) {
  return (
    <AuroraBackground>
        <main className="relative z-10 grow flex items-center justify-center">
        <Card className="w-full max-w-100">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
          <CardFooter className="flex justify-center">
            <p>{footerText}</p>
          </CardFooter>
        </Card>
      </main>
    </AuroraBackground>
    
  );
}
