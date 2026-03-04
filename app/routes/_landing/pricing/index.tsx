import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { Link } from "react-router";

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    description: "For trying TurboStudy with core features.",
    features: [
      "5 uploads per month",
      "Basic note generation",
      "50 AI questions per month",
      "Basic flashcards",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/month",
    description: "For students who use TurboStudy every week.",
    features: [
      "Unlimited uploads",
      "Advanced note generation",
      "Unlimited AI questions",
      "Smart flashcards",
      "Study analytics",
      "Priority support",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$8",
    cadence: "/user/month",
    description: "For study groups and collaborative revision.",
    features: [
      "Everything in Pro",
      "Shared note libraries",
      "Real-time collaboration",
      "Team analytics",
      "Admin controls",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel from billing settings and keep access until the end of the billing period.",
  },
  {
    question: "Which file types are supported?",
    answer:
      "TurboStudy supports common study formats including PDFs and slide exports.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes, student discounts are available for eligible academic accounts.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-xl border bg-card p-8 shadow-sm sm:p-10">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Simple plans for every stage of your study journey
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Start free, upgrade when you need more volume and advanced features.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.highlighted ? "border-primary" : undefined}
          >
            <CardHeader>
              {plan.highlighted && <Badge className="w-fit">Most popular</Badge>}
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-1 flex items-end gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="pb-1 text-sm text-muted-foreground">
                  {plan.cadence}
                </span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
                <CardDescription>{faq.answer}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to get started?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Create an account and begin with the free plan.
        </p>
        <Link to="/sign-up" className="mt-6 inline-block">
          <Button>Start free</Button>
        </Link>
      </section>
    </div>
  );
}
