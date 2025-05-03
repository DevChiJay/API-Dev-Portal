import { CheckCircle, Code, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

function Benefits() {
  return (
    <section className="py-16 px-4 hero-gradient rounded-3xl my-6 mx-4 md:mx-10">
      <div className="text-center mb-12">
        <Badge className="mb-4">Why Choose Us</Badge>
        <h2 className="text-3xl font-bold">Why Choose Our API Platform</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Built for developers, by developers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="glass-effect p-6 rounded-xl shadow-sm">
          <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">High Performance</h3>
          <p className="text-muted-foreground">
            Our APIs are optimized for speed and reliability, with 99.9% uptime
            guarantee.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Low latency
              responses
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Global CDN
              distribution
            </li>
          </ul>
        </div>

        <div className="glass-effect p-6 rounded-xl shadow-sm">
          <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
          <p className="text-muted-foreground">
            Comprehensive documentation, code samples, and SDKs for multiple
            languages.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Interactive
              API explorer
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Multiple SDK
              options
            </li>
          </ul>
        </div>

        <div className="glass-effect p-6 rounded-xl shadow-sm">
          <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
          <p className="text-muted-foreground">
            Robust security with OAuth2, API keys, and comprehensive audit logs.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Encrypted
              data transfer
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-primary mr-2" /> Key rotation
              & revocation
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
