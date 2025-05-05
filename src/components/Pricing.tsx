import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function Pricing() {
  return (
    <section className="py-16 px-4 bg-background rounded-3xl mx-4 md:mx-10 my-6" id="pricing">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <Badge className="mb-4">Simple Pricing</Badge>
          <h2 className="text-4xl font-bold mb-4">
            Start Building Today
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your project with our straightforward pricing options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Free Plan */}
          <Card className="border-2 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <CardDescription className="mt-4">
                Perfect for small projects and experimentation
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span><strong>5</strong> API keys</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span><strong>100</strong> requests per day per key</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Basic documentation access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Community support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary relative flex flex-col">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
              RECOMMENDED
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <CardDescription className="mt-4">
                For professional developers and growing projects
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span><strong>20</strong> API keys</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span><strong>1,000</strong> requests per day per key</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup?plan=pro">Upgrade to Pro</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your enterprise?
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;