import { Badge } from "./ui/badge";

function Metrics() {
  return (
    <section className="py-16 px-4 container">
      <div className="text-center">
        <Badge variant="outline" className="mb-3">
          Trusted Platform
        </Badge>
        <h2 className="text-3xl font-bold mb-12">
          Powering Developers Worldwide
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
        <div>
          <p className="text-4xl font-bold text-primary">100+</p>
          <p className="text-muted-foreground mt-2">Active APIs</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-primary">5k+</p>
          <p className="text-muted-foreground mt-2">Developers</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-primary">99.9%</p>
          <p className="text-muted-foreground mt-2">Uptime</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-primary">24/7</p>
          <p className="text-muted-foreground mt-2">Support</p>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
