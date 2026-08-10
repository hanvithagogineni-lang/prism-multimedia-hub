import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Clock, GraduationCap, Laptop, Mail, Phone } from "lucide-react";
import { Reveal, RevealText } from "@/components/Reveal";
import { Parallax, ParallaxImage, ScrollProgress } from "@/components/Motion";
import { courses, getCourse } from "@/lib/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found | Prism Multimedia" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const title = `${course.title} Course in Hyderabad | Prism Multimedia`;
    const description = `${course.overview.slice(0, 150)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CourseDetail,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6">
      <p role="alert" className="text-sm text-muted-foreground">
        {error.message}
      </p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl font-semibold">Course not found</h1>
      <Link to="/" className="text-sm text-spectrum">
        Back to all courses
      </Link>
    </div>
  ),
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const others = courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-sm tracking-[0.22em]">
            PRISM<span className="text-spectrum"> MULTIMEDIA</span>
          </Link>
          <Link
            to="/"
            hash="courses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All courses
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-16 pt-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                Course Detail
              </span>
            </Reveal>
            <h1 className="mt-7 font-display text-[clamp(2.1rem,5vw,3.7rem)] font-semibold leading-[1.05]">
              <RevealText text={course.title} />
            </h1>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
                {course.overview}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#enquire"
                  className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] transition-transform hover:-translate-y-0.5"
                >
                  Enquire about this course
                </a>
                <a
                  href="tel:+919701334133"
                  className="rounded-full border border-border px-7 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  Call +91 97013 34133
                </a>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {[
                { icon: Clock, label: "Duration", value: course.duration },
                { icon: Laptop, label: "Mode", value: course.mode },
                { icon: GraduationCap, label: "Level", value: course.level },
              ].map((m, i) => (
                <Reveal key={m.label} delay={i * 90}>
                  <div className="h-full bg-card p-5">
                    <m.icon className="size-4 text-muted-foreground" />
                    <div className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {m.label}
                    </div>
                    <div className="mt-1 font-display text-sm">{m.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="mask" delay={140}>
            <ParallaxImage src={course.image} alt={`${course.title} training at Prism Multimedia`} ratio="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-ink px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Course Highlights
          </div>
          <h2 className="mt-7 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold">
            <RevealText text="What you take away." />
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {course.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 90}>
                <div className="hover-lift h-full rounded-2xl border border-border bg-card/60 p-6">
                  <div className="font-display text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">{h}</p>
                  <div className="mt-5 h-px w-10" style={{ background: "var(--spectrum)" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Syllabus
          </div>
          <h2 className="mt-7 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold">
            <RevealText text="Module by module." />
          </h2>
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {course.modules.map((m, i) => (
              <Reveal key={m.title} variant="up" delay={i * 100}>
                <div className="rounded-3xl border border-border bg-card/50 p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xs text-muted-foreground">
                      MODULE {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl">{m.title}</h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Software / Careers / Eligibility */}
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-3">
          <div>
            <Reveal>
              <h3 className="font-display text-xl">Software & tools</h3>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              {course.software.map((s, i) => (
                <Reveal key={s} delay={i * 60}>
                  <span className="hover-lift inline-block rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm text-foreground/85">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal delay={80}>
              <h3 className="font-display text-xl">Career opportunities</h3>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {course.careers.map((c, i) => (
                <Reveal key={c} delay={i * 70}>
                  <li className="flex items-center justify-between gap-4 border-b border-border pb-4 text-sm">
                    <span>{c}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal delay={160}>
              <h3 className="font-display text-xl">Eligibility</h3>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{course.eligibility}</p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Batch timings are flexible — morning, evening and weekend batches are available.
                Course fee and current batch dates are shared on enquiry.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enquire */}
      <section id="enquire" className="section-ink px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold">
            <RevealText text={`Join the ${course.title} batch.`} />
          </h2>
          <Parallax distance={20}>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Reveal>
                <a
                  href={`mailto:info@prismmultimedia.com?subject=Enquiry: ${encodeURIComponent(course.title)}`}
                  className="hover-lift block rounded-2xl border border-border bg-card/60 p-6"
                >
                  <Mail className="size-5 text-muted-foreground" />
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                  <div className="mt-2 break-all text-sm">info@prismmultimedia.com</div>
                </a>
              </Reveal>
              <Reveal delay={100}>
                <a
                  href="tel:+919177555040"
                  className="hover-lift block rounded-2xl border border-primary/50 bg-primary/10 p-6"
                >
                  <Phone className="size-5 text-primary" />
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Call us</div>
                  <div className="mt-2 text-sm">+91 97013 34133</div>
                  <div className="text-sm">+91 91775 55040</div>
                </a>
              </Reveal>
              <Reveal delay={200}>
                <div className="rounded-2xl border border-border bg-card/60 p-6">
                  <Clock className="size-5 text-muted-foreground" />
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Visit us
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    #403, Delta Chambers, Ameerpet Circle, Hyderabad – 500016. Mon–Sat, 8 AM – 8 PM.
                  </p>
                </div>
              </Reveal>
            </div>
          </Parallax>
        </div>
      </section>

      {/* Other courses */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Other courses
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {others.map((c, i) => (
              <Reveal key={c.slug} variant="up" delay={i * 90}>
                <Link to="/courses/$slug" params={{ slug: c.slug }} className="group block">
                  <ParallaxImage src={c.image} alt={c.title} ratio="aspect-[4/3]" />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <span className="font-display tracking-[0.2em]">
            PRISM<span className="text-spectrum"> MULTIMEDIA</span>
          </span>
          <span>Established 1999 · Hyderabad, India</span>
        </div>
      </footer>
    </div>
  );
}
