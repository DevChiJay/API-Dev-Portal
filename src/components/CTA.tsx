"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "./ui/button";

function CTA() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <section className="py-16 px-4 bg-primary/5 rounded-3xl mx-4 md:mx-10 my-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of developers building with our API platform
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="px-8 btn-transition" asChild>
            <Link href={isSignedIn ? "/dashboard" : "/signup"}>
              {isSignedIn ? "Go to Dashboard" : "Create Free Account"}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 btn-transition"
            asChild
          >
            <a href="mailto:support@devchihub.com">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
