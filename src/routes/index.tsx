import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealText } from "@/components/Reveal";
import { CountUp, Parallax, ParallaxImage, ScrollProgress } from "@/components/Motion";
import prismAsset from "@/assets/prism.jpg.asset.json";
import campusImg from "@/assets/campus.jpg";
import corporateImg from "@/assets/corporate.jpg";
import graphicImg from "@/assets/course-graphic-design.jpg";
import animationImg from "@/assets/course-animation.jpg";
import uiuxImg from "@/assets/course-uiux.jpg";
import videoImg from "@/assets/course-video-editing.jpg";
import marketingImg from "@/assets/course-digital-marketing.jpg";
import portfolioImg from "@/assets/works-portfolio.jpg";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prism Multimedia | Best Multimedia Training Institute" },
      {
        name: "description",
        content:
          "Prism Multimedia, Hyderabad — multimedia training since 1999 in Graphic Design, Animation, VFX, UI/UX, Digital Marketing and Video Editing with placement support.",
      },
      { property: "og:title", content: "Prism Multimedia | Multimedia Training Institute" },
      {
        property: "og:description",
        content:
          "Industry-focused multimedia education since 1999 — experienced faculty, practical learning, portfolio building and placement assistance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

import { courses as courseData } from "@/lib/courses";

const courses = courseData.map((c) => c.title);

const vision = [
  "Empower students with industry-ready creative skills.",
  "Create employment opportunities through quality education.",
  "Encourage innovation, creativity, and entrepreneurship.",
  "Build a highly skilled workforce for the multimedia and IT industries.",
];

const mission = [
  "Deliver high-quality multimedia education.",
  "Provide practical, project-based learning.",
  "Support students through placement assistance.",
  "Bridge the gap between education and industry.",
  "Promote creativity and lifelong learning.",
];

const whyUs = [
  "Experienced Faculty",
  "Industry-Relevant Curriculum",
  "Hands-on Practical Training",
  "Placement Assistance",
  "Professional Certifications",
  "Strong Alumni Network",
  "Positive Student Feedback",
  "Portfolio Development",
  "Corporate Training Programs",
  "Career Guidance & Mentorship",
];

const benefits = [
  "Live Projects",
  "Practical Workshops",
  "Industry Expert Sessions",
  "Career Counseling",
  "Portfolio Building",
  "Internship Support",
  "Placement Assistance",
  "Resume Preparation",
  "Interview Training",
  "Soft Skills Development",
];

const corporate = [
  "Design Training",
  "Digital Skills Training",
  "Multimedia Training",
  "Employee Skill Enhancement",
  "Customized Learning Programs",
];

const works = [
  "Branding",
  "Logo Design",
  "UI/UX Design",
  "Product Design",
  "Motion Graphics",
  "Animation",
  "VFX",
  "Video Editing",
  "Advertising",
  "Social Media Design",
];

const placement = [
  "Resume Building",
  "Portfolio Guidance",
  "Mock Interviews",
  "Placement Assistance",
  "Industry Connections",
  "Career Mentorship",
  "Internship Opportunities",
];

const features = [
  "Established in 1999",
  "Industry-focused curriculum",
  "Experienced trainers",
  "Practical learning approach",
  "Career-oriented courses",
  "Corporate training",
  "Placement assistance",
  "Alumni support",
  "Certification programs",
  "Modern learning environment",
];

const goals = [
  "Train over 50,000 students in the coming years.",
  "Improve employability through technical education.",
  "Promote entrepreneurship.",
  "Support self-employment and wage employment.",
  "Expand vocational education opportunities.",
];

const nav = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why" },
  { label: "Corporate", href: "#corporate" },
  { label: "Placement", href: "#placement" },
  { label: "Contact", href: "#contact" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground">
        <span className="h-px w-8" style={{ background: "var(--spectrum)" }} />
        {children}
      </div>
    </Reveal>
  );
}

function ListRows({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <Reveal key={item} variant="up" delay={i * 60}>
          <li className="group flex items-baseline gap-5 py-4">
            <span className="font-display text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base text-foreground/85 transition-colors group-hover:text-foreground md:text-lg">
              {item}
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

function Index() {
  return (
    <div className="relative overflow-hidden bg-background">
      <ScrollProgress />
      {/* ambient spectrum aurora */}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-90 blur-[120px] animate-aurora"
        style={{ background: "var(--spectrum-soft)" }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-sm font-semibold tracking-[0.2em]">
            PRISM<span className="text-spectrum"> MULTIMEDIA</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:+919701334133"
            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Enquire
          </a>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="top" className="relative flex min-h-screen items-center px-6 pt-28 pb-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                <Sparkles className="size-3" /> Since 1999
              </p>
            </Reveal>
            <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.1rem)] font-semibold leading-[0.98]">
              <RevealText text="Best Multimedia" />
              <br />
              <RevealText text="Training Institute" delay={220} wordClassName="text-spectrum" />
            </h1>
            <Reveal delay={420}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Prism Multimedia has been at the forefront of multimedia education since 1999,
                helping students build successful careers in the creative industry — with
                industry-focused training, experienced faculty, practical learning, placement
                support and certification programs.
              </p>
            </Reveal>
            <Reveal delay={560}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#courses"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_36px_-18px_var(--primary)] transition-transform duration-500 hover:-translate-y-1"
                >
                  Explore Courses
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  Talk to a counselor
                </a>
              </div>
            </Reveal>
          </div>

          {/* animated prism */}
          <div className="relative">
            <div className="animate-prism-in">
              <div className="animate-prism-float relative">
                <div
                  aria-hidden
                  className="animate-beam absolute left-1/2 top-1/2 h-40 w-[130%] -translate-y-1/2 rounded-full opacity-40 blur-2xl"
                  style={{ background: "var(--spectrum)" }}
                />
                <img
                  src={prismAsset.url}
                  alt="Light beam refracting through a glass prism into a rainbow spectrum"
                  className="relative w-full rounded-3xl border border-border object-cover"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                />
              </div>
            </div>
            <Reveal delay={900}>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  ["1999", "Established"],
                  ["10+", "Courses"],
                  ["50,000", "Students goal"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border border-border bg-card/50 p-4">
                    <div className="font-display text-xl">{v}</div>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="border-y border-border py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...courses, ...courses].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="font-display text-sm uppercase tracking-[0.24em] text-muted-foreground"
            >
              {c} <span className="text-spectrum">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats counters ───────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: 1999, suffix: "", label: "Established", plain: true },
            { to: 25, suffix: "+", label: "Years of training" },
            { to: 10, suffix: "", label: "Career courses" },
            { to: 50000, suffix: "+", label: "Students targeted" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <div className="border-t border-border pt-6">
                <div className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold leading-none text-spectrum">
                  {s.plain ? s.to : <CountUp to={s.to} suffix={s.suffix} />}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Campus parallax band ─────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <ParallaxImage
            src={campusImg}
            alt="Students learning multimedia design at the Prism Multimedia training lab"
            ratio="aspect-[16/7]"
            zoom={0.18}
            shift={60}
          />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section id="about" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>About Prism Multimedia</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.08]">
              <RevealText text="Professional multimedia education and skill development." />
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <Reveal delay={120}>
                <p className="text-base leading-relaxed md:text-lg">
                  Prism Multimedia is an organization established in 1999 to provide professional
                  multimedia education and skill development. With years of experience in training
                  and development, the institute prepares students for careers in Graphic Design,
                  Animation, VFX, UI/UX Design, Digital Marketing, Video Editing, and related
                  creative industries.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="text-base leading-relaxed md:text-lg">
                  The institute also conducts customized corporate training programs and focuses on
                  practical learning that matches current industry requirements.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <div>
              <Reveal>
                <h3 className="font-display text-2xl">Vision</h3>
              </Reveal>
              <div className="mt-6">
                <ListRows items={vision} />
              </div>
            </div>
            <div>
              <Reveal>
                <h3 className="font-display text-2xl">Mission</h3>
              </Reveal>
              <div className="mt-6">
                <ListRows items={mission} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────────────── */}
      <section id="courses" className="section-ink px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Courses Offered</SectionLabel>
          <h2 className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold">
            <RevealText text="Ten career tracks in creative craft." />
          </h2>

          {/* featured tracks with imagery */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { img: graphicImg, title: "Graphic Design", note: "Brand systems, layout, print", slug: "graphic-design" },
              { img: animationImg, title: "3D Animation", note: "Modelling, rigging, compositing", slug: "3d-animation" },
              { img: uiuxImg, title: "UI / UX Design", note: "Research, wireframes, prototypes", slug: "ui-design-development" },
              { img: videoImg, title: "Audio & Video Editing", note: "Edit, grade, finish", slug: "audio-video-editing" },
              { img: marketingImg, title: "Digital Marketing", note: "Campaigns, analytics, content", slug: "digital-marketing" },
              { img: portfolioImg, title: "EDP Course", note: "Turn your skills into a business", slug: "edp-course" },
            ].map((t, i) => (
              <Reveal key={t.title} variant="up" delay={i * 90}>
                <Link to="/courses/$slug" params={{ slug: t.slug }} className="group block">
                  <ParallaxImage src={t.img} alt={t.title} ratio="aspect-[4/3]" />
                  <Parallax distance={24} className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg">{t.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                  </Parallax>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">

            {courses.map((c, i) => (
              <Reveal key={c} variant="up" delay={i * 70}>
                <Link
                  to="/courses/$slug"
                  params={{ slug: courseData[i]!.slug }}
                  className="hover-lift group flex h-full items-end justify-between gap-4 bg-card p-7 hover:bg-secondary"
                >
                  <div>
                    <div className="font-display text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-3 font-display text-xl leading-snug">{c}</div>
                    <div
                      className="mt-4 h-px w-0 transition-all duration-700 group-hover:w-16"
                      style={{ background: "var(--spectrum)" }}
                    />
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose / benefits ────────────────────────── */}
      <section id="why" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Why Choose Prism Multimedia</SectionLabel>
          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-semibold">Ten reasons students stay</h2>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                {whyUs.map((w, i) => (
                  <Reveal key={w} delay={i * 55}>
                    <span className="hover-lift inline-block rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm text-foreground/85">
                      {w}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-semibold">Student Benefits</h2>
              </Reveal>
              <div className="mt-8">
                <ListRows items={benefits} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate training ───────────────────────────── */}
      <section id="corporate" className="px-6 py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card/50 p-8 md:p-14">
          <SectionLabel>Corporate Training</SectionLabel>
          <div className="mt-10">
            <ParallaxImage
              src={corporateImg}
              alt="Corporate design training session for a client team"
              ratio="aspect-[16/6]"
              zoom={0.16}
              shift={50}
            />
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">

            <Reveal>
              <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
                Prism Multimedia offers customized corporate training solutions to organizations by
                providing industry-specific programs that improve employee productivity and
                technical skills.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {corporate.map((s, i) => (
                <Reveal key={s} delay={i * 80} variant="up">
                  <div className="hover-lift h-full rounded-2xl border border-border bg-background/60 p-5">
                    <div className="rule-spectrum mb-4 w-10" />
                    <div className="text-sm md:text-base">{s}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Student works ────────────────────────────────── */}
      <section className="section-ink px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Student Works</SectionLabel>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-tight">
            <RevealText text="Students create professional-quality projects that become impressive portfolios." />
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              { img: portfolioImg, label: "Branding & Print" },
              { img: uiuxImg, label: "UI / UX Case Studies" },
              { img: animationImg, label: "Animation & VFX Reels" },
            ].map((w, i) => (
              <Reveal key={w.label} variant="mask" delay={i * 120}>
                <ParallaxImage src={w.img} alt={w.label} ratio="aspect-[4/3]" />
                <p className="mt-4 font-display text-base">{w.label}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">

            {works.map((w, i) => (
              <Reveal key={w} variant="mask" delay={i * 60}>
                <div className="group relative flex h-40 items-end bg-card p-5 transition-colors hover:bg-secondary">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
                    style={{ background: "var(--spectrum)" }}
                  />
                  <span className="relative font-display text-base">{w}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Placement + features ─────────────────────────── */}
      <section id="placement" className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <SectionLabel>Placement Support</SectionLabel>
            <div className="mt-8">
              <ListRows items={placement} />
            </div>
          </div>
          <div>
            <SectionLabel>Key Features</SectionLabel>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f} delay={i * 50}>
                  <div className="hover-lift rounded-xl border border-border bg-card/50 px-4 py-3 text-sm text-foreground/85">
                    {f}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Leadership</SectionLabel>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                name: "M. Srinivas Rao",
                role: "Founder & CEO",
                bio: "A visionary entrepreneur who established Prism Multimedia with the goal of providing quality multimedia education and empowering young professionals with practical creative skills.",
              },
              {
                name: "Anjee Yarlagadda",
                role: "Managing Director",
                bio: "A Design Mentor and Administrator with over 15 years of experience in Training & Development, specializing in design education, corporate training, and people management.",
              },
            ].map((p, i) => (
              <Reveal key={p.name} variant="up" delay={i * 140}>
                <article className="hover-lift h-full rounded-[1.75rem] border border-border bg-card/60 p-8">
                  <div className="rule-spectrum w-14" />
                  <h3 className="mt-6 font-display text-2xl">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {p.role}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {p.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future goals ─────────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>Future Goals</SectionLabel>
          <div className="mt-10 space-y-6">
            {goals.map((g, i) => (
              <Reveal key={g} delay={i * 90}>
                <p className="font-display text-[clamp(1.15rem,2.4vw,1.9rem)] leading-snug text-foreground/85">
                  {g}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="px-6 pb-24 pt-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Contact Information</SectionLabel>
          <h2 className="mt-8 font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold">
            <RevealText text="Start your creative career." />
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <Mail className="size-5 text-muted-foreground" />
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </div>
                <a
                  href="mailto:info@prismmultimedia.com"
                  className="mt-2 block break-all text-sm hover:text-spectrum"
                >
                  info@prismmultimedia.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <Phone className="size-5 text-muted-foreground" />
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Phone
                </div>
                <a href="tel:+919701334133" className="mt-2 block text-sm">
                  +91 97013 34133
                </a>
                <a href="tel:+919177555040" className="mt-1 block text-sm">
                  +91 91775 55040
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <Clock className="size-5 text-muted-foreground" />
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Working Hours
                </div>
                <p className="mt-2 text-sm">Monday – Saturday</p>
                <p className="text-sm">8:00 AM – 8:00 PM</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <MapPin className="size-5 text-muted-foreground" />
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Address
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  #403, 4th Floor, Delta Chambers, Beside Jeans Corner Lane, Near Chennai Shopping
                  Mall, Ameerpet Circle, Hyderabad – 500016, Telangana, India.
                </p>
              </div>
            </Reveal>
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
