import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Button } from "./ui/button";

function FAQ() {
  return (
    <section
      className="py-16 px-4 bg-background rounded-3xl mx-4 md:mx-10 my-6"
      id="faq"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our API platform
          </p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Do I need a backend to use this?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  No, our API platform is designed to be used with any frontend
                  technology. You can use our client SDKs for direct API access
                  without needing your own backend. However, for sensitive
                  operations and handling authentication tokens securely, we
                  recommend using a backend to protect your API keys.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is it really free?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, we offer a free tier for all our APIs with reasonable
                  rate limits for development and small-scale projects. For
                  higher volume usage and premium features, we offer paid plans
                  that scale with your needs. Check our pricing page for more
                  details on limits and features.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize the form?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Our API platform provides full customization options. You can
                  customize the request parameters, authentication methods, and
                  response formats. We also provide SDKs in multiple languages
                  that make it easy to integrate our APIs into your applications
                  with your own UI elements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do I contact the people who sign up?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  When users register for your API services through our
                  platform, you'll receive notifications and can access their
                  contact information through the dashboard. Our platform also
                  provides analytics on API usage and tools for communicating
                  with your users about updates or issues.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Is there a limit to how many signups I can collect?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  On our free tier, there's a limit of 1,000 user signups per
                  month. Our paid plans offer higher or unlimited signup
                  capacities depending on the tier. You can always upgrade as
                  your needs grow, and we provide tools to manage and scale your
                  user base effectively.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <Button asChild>
            <Link href="/docs">Visit Documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
