import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

const values = [
  {
    title: "Speed",
    description:
      "Students should spend less time formatting notes and more time learning.",
  },
  {
    title: "Clarity",
    description:
      "AI output should be structured, useful, and easy to trust during revision.",
  },
  {
    title: "Accessibility",
    description:
      "Powerful study tools should stay affordable and easy to use.",
  },
];

const stats = [
  { label: "Students supported", value: "100K+" },
  { label: "Notes generated", value: "1M+" },
  { label: "Questions answered", value: "500K+" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-xl border bg-card p-8 shadow-sm sm:p-10">
        <Badge variant="secondary">About TurboStudy</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          We build AI study tools that fit real university workflows
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          TurboStudy was created to remove the repetitive work around note
          creation and revision. Our mission is to help students move from raw
          lecture files to effective study material quickly and consistently.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Separator className="my-10" />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our mission</CardTitle>
            <CardDescription>
              Build a reliable study assistant that turns coursework into clear,
              review-ready notes with minimal effort.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our approach</CardTitle>
            <CardDescription>
              Keep the product focused: upload, generate, and ask questions with
              consistent quality across subjects.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Core values</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <CardTitle className="text-base">{value.title}</CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Join us on the mission
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Start using TurboStudy and make your study workflow more consistent.
        </p>
        <Link to="/sign-up" className="mt-6 inline-block">
          <Button>Get started</Button>
        </Link>
      </section>
    </div>
  );
}
