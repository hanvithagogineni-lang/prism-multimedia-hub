import graphicImg from "@/assets/course-graphic-design.jpg";
import animationImg from "@/assets/course-animation.jpg";
import uiuxImg from "@/assets/course-uiux.jpg";
import videoImg from "@/assets/course-video-editing.jpg";
import marketingImg from "@/assets/course-digital-marketing.jpg";
import portfolioImg from "@/assets/works-portfolio.jpg";

export type Course = {
  slug: string;
  title: string;
  note: string;
  image: string;
  duration: string;
  mode: string;
  level: string;
  overview: string;
  highlights: string[];
  modules: { title: string; points: string[] }[];
  software: string[];
  careers: string[];
  eligibility: string;
};

export const courses: Course[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    note: "Brand systems, layout, print",
    image: graphicImg,
    duration: "4 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "A complete visual design track that builds your eye for typography, colour and composition, then applies it to real branding, print and social media projects with portfolio reviews at every stage.",
    highlights: [
      "Live client-style branding projects",
      "Print production and pre-press training",
      "Portfolio of 10+ finished pieces",
      "Placement assistance on completion",
    ],
    modules: [
      {
        title: "Design Foundations",
        points: ["Elements & principles of design", "Colour theory", "Typography and hierarchy", "Grids and layout systems"],
      },
      {
        title: "Software Craft",
        points: ["Photoshop image editing & retouching", "Illustrator vector artwork", "CorelDRAW", "InDesign multi-page layouts"],
      },
      {
        title: "Brand & Print",
        points: ["Logo and identity design", "Brochures, flyers, packaging", "Pre-press, CMYK and print finishing"],
      },
      {
        title: "Digital & Portfolio",
        points: ["Social media creatives", "Ad campaign visuals", "Portfolio building and interview prep"],
      },
    ],
    software: ["Photoshop", "Illustrator", "InDesign", "CorelDRAW"],
    careers: ["Graphic Designer", "Brand Identity Designer", "DTP / Layout Artist", "Social Media Designer"],
    eligibility: "10th / 12th / any degree. No prior design experience required.",
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics",
    note: "Animate type, logos and explainers",
    image: animationImg,
    duration: "3 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "Learn to bring design to life — animated logos, kinetic typography, broadcast packaging and explainer videos built in After Effects with sound design and delivery workflows.",
    highlights: [
      "Kinetic typography and logo reveals",
      "Explainer video from script to render",
      "Sound design and timing",
      "Showreel production",
    ],
    modules: [
      { title: "Animation Principles", points: ["Timing and spacing", "Easing and graph editor", "Storyboarding"] },
      { title: "After Effects Core", points: ["Layers, masks, shape layers", "Text animators", "Effects and colour"] },
      { title: "Advanced Motion", points: ["Expressions basics", "Tracking and stabilisation", "3D camera and lighting"] },
      { title: "Delivery", points: ["Render settings and codecs", "Sound design", "Showreel edit"] },
    ],
    software: ["After Effects", "Premiere Pro", "Illustrator", "Photoshop"],
    careers: ["Motion Graphics Artist", "Broadcast Designer", "Explainer Video Animator", "Social Content Creator"],
    eligibility: "Basic computer knowledge. Design basics helpful but taught from scratch.",
  },
  {
    slug: "ui-design-development",
    title: "UI Design & Development",
    note: "Interfaces, design systems, front-end",
    image: uiuxImg,
    duration: "5 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "Design and build modern digital products — from wireframes and design systems in Figma to responsive, accessible front-end implementation with HTML, CSS and JavaScript.",
    highlights: [
      "Design systems and component libraries",
      "Responsive, accessible interfaces",
      "Hand-off to development",
      "Two full product case studies",
    ],
    modules: [
      { title: "UI Fundamentals", points: ["Layout, spacing, type scale", "Colour and contrast", "Iconography"] },
      { title: "Figma Mastery", points: ["Components and variants", "Auto layout", "Prototyping and hand-off"] },
      { title: "Front-end Build", points: ["HTML5 and semantic markup", "CSS layout and Flex/Grid", "JavaScript interactions"] },
      { title: "Product Case Study", points: ["Mobile app UI", "Web dashboard", "Portfolio presentation"] },
    ],
    software: ["Figma", "Adobe XD", "HTML / CSS", "JavaScript"],
    careers: ["UI Designer", "Product Designer", "Front-end Developer", "Design System Designer"],
    eligibility: "Any degree or diploma. Interest in digital products.",
  },
  {
    slug: "ux-design",
    title: "UX Design",
    note: "Research, flows, usability",
    image: uiuxImg,
    duration: "3 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "A research-led course covering user interviews, journey mapping, information architecture, wireframing and usability testing so your design decisions are evidence-based.",
    highlights: [
      "End-to-end UX case study",
      "Usability testing with real users",
      "Journey maps and personas",
      "Portfolio storytelling",
    ],
    modules: [
      { title: "Discover", points: ["User interviews and surveys", "Personas", "Competitive audit"] },
      { title: "Define", points: ["Problem framing", "Journey mapping", "Information architecture"] },
      { title: "Design", points: ["Wireframes", "Interaction patterns", "Prototypes"] },
      { title: "Validate", points: ["Usability testing", "Metrics and iteration", "Case study writing"] },
    ],
    software: ["Figma", "FigJam", "Maze", "Notion"],
    careers: ["UX Designer", "UX Researcher", "Interaction Designer", "Product Analyst"],
    eligibility: "Any graduate. Suitable for career switchers.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    note: "Campaigns, analytics, content",
    image: marketingImg,
    duration: "3 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "Practical performance marketing — run real search and social campaigns, learn SEO and content, and read the analytics that prove results.",
    highlights: [
      "Live ad campaigns with real budgets",
      "SEO audit of a real website",
      "Analytics and reporting dashboards",
      "Certification exam guidance",
    ],
    modules: [
      { title: "Foundations", points: ["Marketing funnel", "Audience research", "Website basics"] },
      { title: "Search & SEO", points: ["Keyword research", "On-page and technical SEO", "Google Ads / PPC"] },
      { title: "Social & Content", points: ["Meta and Instagram ads", "Content calendars", "Creative writing for ads"] },
      { title: "Measure", points: ["Google Analytics 4", "Conversion tracking", "Reporting and optimisation"] },
    ],
    software: ["Google Ads", "Meta Ads Manager", "GA4", "Search Console", "Canva"],
    careers: ["Digital Marketing Executive", "SEO Specialist", "Performance Marketer", "Social Media Manager"],
    eligibility: "12th pass or above. No technical background needed.",
  },
  {
    slug: "2d-animation",
    title: "2D Animation",
    note: "Character animation and storytelling",
    image: animationImg,
    duration: "6 months",
    mode: "Classroom",
    level: "Beginner to Advanced",
    overview:
      "Classical animation principles applied digitally — drawing, character acting, walk cycles, cut-out rigs and complete short-film production.",
    highlights: [
      "12 principles of animation",
      "Character design and rigging",
      "Short film as final project",
      "Studio-style production pipeline",
    ],
    modules: [
      { title: "Drawing & Design", points: ["Gesture and anatomy", "Character design", "Storyboarding"] },
      { title: "Animation Principles", points: ["Squash and stretch", "Walk and run cycles", "Lip sync and acting"] },
      { title: "Digital Production", points: ["Cut-out rigging", "Backgrounds and layout", "Compositing"] },
      { title: "Short Film", points: ["Pre-production", "Animation", "Sound and final render"] },
    ],
    software: ["Toon Boom Harmony", "Adobe Animate", "Photoshop", "After Effects"],
    careers: ["2D Animator", "Character Animator", "Storyboard Artist", "Cartoon Studio Artist"],
    eligibility: "10th / 12th onwards. Drawing interest recommended.",
  },
  {
    slug: "3d-animation",
    title: "3D Animation",
    note: "Modelling, rigging, lighting, render",
    image: animationImg,
    duration: "9 months",
    mode: "Classroom",
    level: "Beginner to Professional",
    overview:
      "A full 3D pipeline course — model, texture, rig, animate, light and render, ending with a professional demo reel aimed at film, gaming and advertising studios.",
    highlights: [
      "Complete 3D production pipeline",
      "Character and prop modelling",
      "Lighting and rendering for realism",
      "Industry-standard demo reel",
    ],
    modules: [
      { title: "Modelling", points: ["Polygon modelling", "Hard-surface and organic", "UV unwrapping"] },
      { title: "Texturing & Shading", points: ["PBR materials", "Substance workflow", "Look development"] },
      { title: "Rigging & Animation", points: ["Skeletons and skinning", "Body mechanics", "Acting shots"] },
      { title: "Lighting & Render", points: ["Three-point and HDRI lighting", "Render passes", "Compositing"] },
    ],
    software: ["Autodesk Maya", "3ds Max", "Blender", "Substance Painter", "Nuke"],
    careers: ["3D Modeller", "3D Animator", "Lighting Artist", "Game Asset Artist"],
    eligibility: "12th / any degree. Strong interest in film and gaming.",
  },
  {
    slug: "audio-video-editing",
    title: "Audio & Video Editing",
    note: "Edit, grade, mix, finish",
    image: videoImg,
    duration: "3 months",
    mode: "Classroom / Online",
    level: "Beginner to Advanced",
    overview:
      "Post-production from ingest to delivery — narrative and commercial editing, colour grading, audio mixing and export for broadcast, YouTube and social platforms.",
    highlights: [
      "Edit ads, films and social cuts",
      "Colour grading workflow",
      "Clean audio mixing and mastering",
      "Deliver for every platform",
    ],
    modules: [
      { title: "Editing Craft", points: ["Story structure", "Cutting on action", "Pace and rhythm"] },
      { title: "Premiere Pro", points: ["Project and media management", "Multicam", "Titles and graphics"] },
      { title: "Colour & Audio", points: ["Primary and secondary grading", "LUTs", "Noise removal and mixing"] },
      { title: "Delivery", points: ["Codecs and compression", "Platform specs", "Archiving"] },
    ],
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Audition"],
    careers: ["Video Editor", "Post-production Assistant", "Colourist", "YouTube / Social Editor"],
    eligibility: "Basic computer knowledge. Open to all streams.",
  },
  {
    slug: "vfx-course",
    title: "VFX Course",
    note: "Compositing, tracking, simulations",
    image: animationImg,
    duration: "8 months",
    mode: "Classroom",
    level: "Intermediate to Professional",
    overview:
      "Learn film-grade visual effects — roto and paint, keying, match-moving, CG integration, FX simulations and final compositing, following the workflow used in VFX studios.",
    highlights: [
      "Green-screen keying and clean-up",
      "3D camera tracking and integration",
      "Fire, smoke and destruction FX",
      "Studio-standard shot breakdowns",
    ],
    modules: [
      { title: "Prep", points: ["Rotoscoping", "Paint and clean-up", "Wire removal"] },
      { title: "Compositing", points: ["Keying", "Node-based compositing", "Colour matching"] },
      { title: "3D Integration", points: ["Camera tracking", "CG element lighting", "Render passes"] },
      { title: "FX & Finishing", points: ["Particles and dynamics", "Simulations", "Shot breakdown reel"] },
    ],
    software: ["Nuke", "After Effects", "Maya", "Houdini basics", "Mocha"],
    careers: ["VFX Compositor", "Roto / Paint Artist", "FX Artist", "Match-move Artist"],
    eligibility: "12th / degree. Prior animation or editing exposure is an advantage.",
  },
  {
    slug: "edp-course",
    title: "EDP Course",
    note: "Entrepreneurship development programme",
    image: portfolioImg,
    duration: "2 months",
    mode: "Classroom / Weekend",
    level: "All levels",
    overview:
      "Our Entrepreneurship Development Programme helps creative professionals turn skills into a business — pricing, client acquisition, studio operations, finance and self-branding.",
    highlights: [
      "Build your own studio business plan",
      "Client pitching and pricing practice",
      "Freelance and agency operations",
      "Mentoring from industry founders",
    ],
    modules: [
      { title: "Business Basics", points: ["Idea validation", "Business models", "Registration and compliance"] },
      { title: "Getting Clients", points: ["Positioning and personal brand", "Proposals and pitching", "Negotiation"] },
      { title: "Money", points: ["Pricing your work", "Costing and cash flow", "Invoicing and taxes"] },
      { title: "Scale", points: ["Hiring and delegation", "Studio workflow", "Growth planning"] },
    ],
    software: ["Notion", "Google Workspace", "Canva", "Invoice tools"],
    careers: ["Studio Founder", "Freelance Creative", "Creative Producer", "Agency Manager"],
    eligibility: "Open to students, working professionals and aspiring founders.",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
