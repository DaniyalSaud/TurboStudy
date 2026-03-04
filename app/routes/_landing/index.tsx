import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Brain,
  FileText,
  MessageCircle,
  Sparkles,
  Upload,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    title: "Smart Note Generation",
    description:
      "Upload lecture slides and get clear, structured notes in seconds.",
    icon: FileText,
  },
  {
    title: "AI Study Assistant",
    description:
      "Ask questions on your material and receive contextual answers instantly.",
    icon: MessageCircle,
  },
  {
    title: "Auto Flashcards",
    description:
      "Turn your notes into revision cards that are easy to review.",
    icon: Brain,
  },
  {
    title: "Flexible Study Formats",
    description:
      "Generate summaries, outlines, and detailed notes based on your needs.",
    icon: BookOpen,
  },
  {
    title: "Fast Upload Workflow",
    description:
      "Drop in files and keep all your study material organized in one place.",
    icon: Upload,
  },
  {
    title: "Built for Coursework",
    description:
      "Designed for university classes with practical output you can use immediately.",
    icon: Sparkles,
  },
];

const steps = [
  {
    title: "Upload",
    description: "Add your slides and lecture documents.",
  },
  {
    title: "Generate",
    description: "TurboStudy creates clean notes with key concepts.",
  },
  {
    title: "Review",
    description: "Chat with your notes and revise faster.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            AI-powered study workflow
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Turn your university slides into notes you can actually study from
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            TurboStudy helps you upload material, generate structured notes, and
            ask focused questions so revision is faster and less overwhelming.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/sign-up">
              <Button size="lg">Start for free</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to study better
          </h2>
          <p className="mt-2 text-muted-foreground">
            A focused set of tools designed for day-to-day university revision.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="my-12" />

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Simple three-step flow
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get from raw slides to practical notes quickly.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <CardHeader>
                <Badge className="w-fit" variant="outline">
                  Step {index + 1}
                </Badge>
                <CardTitle className="text-base">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to study with less friction?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Create your account and start generating notes from your course files.
        </p>
        <Link to="/sign-up" className="mt-6 inline-block">
          <Button size="lg">Create account</Button>
        </Link>
      </section>
    </div>
  );
}
