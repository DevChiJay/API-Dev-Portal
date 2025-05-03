'use client';

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
      <main className="container max-w-4xl py-10 flex-1">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: May 1, 2025</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to DevChi API Platform. By accessing or using our platform, website, and services, 
              you agree to be bound by these Terms of Service. Please read them carefully before using our services.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              "Platform" refers to DevChi API Platform, accessible from our website and related applications.
              "Services" means the API services, documentation, and related tools we provide.
              "User", "you", and "your" refers to individuals or entities using our services.
            </p>
            
            <h2>3. Account Registration</h2>
            <p>
              To access certain features of the Platform, you must register for an account. You agree to provide accurate, 
              current, and complete information during the registration process and to update such information to keep it 
              accurate, current, and complete.
            </p>
            
            <h2>4. API Usage and Rate Limits</h2>
            <p>
              Our services are provided with specific rate limits and usage restrictions as documented in our API documentation. 
              You agree not to exceed these limits or attempt to circumvent any restrictions in place.
            </p>
            
            <h2>5. Security and API Keys</h2>
            <p>
              You are responsible for maintaining the security of your API keys and access credentials. Do not share your API keys 
              with unauthorized third parties. You are responsible for all activities that occur under your account.
            </p>
            
            <h2>6. Acceptable Use Policy</h2>
            <p>
              You agree not to use the services for any unlawful purpose or in any way that could damage, disable, overburden, 
              or impair our servers or networks, or interfere with any other party's use and enjoyment of the services.
            </p>
            
            <h2>7. Modifications to the Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without 
              notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation.
            </p>
            
            <h2>8. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to 
              understand how we collect, use, and disclose information about you.
            </p>
            
            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the services at our sole discretion, without notice, 
              for conduct that we believe violates these Terms of Service or is harmful to other users of the services, 
              us, or third parties, or for any other reason.
            </p>
            
            <h2>10. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 
              WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
            
            <h2>11. Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, 
              SPECIAL OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
            </p>
            
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to change these Terms of Service at any time. If we make changes, we will provide notice 
              and the date of the last revision. Continued use of the services after any changes shall constitute your consent 
              to such changes.
            </p>
            
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@devchi.io.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2025 DevChi API Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}