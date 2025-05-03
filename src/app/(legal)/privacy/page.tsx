'use client';

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: May 1, 2025</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At DevChi API Platform, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform and services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our services, including:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Name, email address, company name, and other contact information you provide us.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our API services, including API requests, frequency, 
                errors, and performance metrics.
              </li>
              <li>
                <strong>Technical Data:</strong> IP addresses, browser type and version, time zone setting, operating system, 
                and platform.
              </li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to maintain the safety of your personal information. However, 
              no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
            
            <h2>5. API Keys and Authentication</h2>
            <p>
              API keys are used to authenticate requests to our API services. It is your responsibility to keep your API 
              keys secure. Do not share your API keys in publicly accessible areas such as GitHub, client-side code, or 
              blog posts.
            </p>
            
            <h2>6. Data Retention</h2>
            <p>
              We will retain your information for as long as your account is active or as needed to provide you services. 
              We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, 
              and enforce our agreements.
            </p>
            
            <h2>7. Third-Party Services</h2>
            <p>
              Our services may contain links to or integrate with third-party websites and services. We are not responsible 
              for the content or privacy practices of such third parties. We encourage you to read their privacy policies.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for use by children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If we learn that we have collected personal information from a child under 
              13, we will delete that information promptly.
            </p>
            
            <h2>9. Your Data Protection Rights</h2>
            <p>
              Depending on your location and applicable laws, you may have certain rights regarding your personal information, 
              including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure (the "right to be forgotten")</li>
              <li>The right to restriction of processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@devchi.io.
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