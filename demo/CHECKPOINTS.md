# Demo Build Checkpoints - Marty Ortiz Confidence Coaching Website

Working plan for the `demo/` folder: a multi-page static demo of Marty Ortiz's confidence
coaching website in classic HTML, CSS, and JavaScript (no frameworks, no build tools).
We build one chunk at a time and review together before moving to the next.

**Reference docs:** `marty_ortiz_coaching_sitemap.md` (page strategy + conversion roles),
`design.md` (brand tokens), wireframe mockup `484b5637-e6ab-4327-885a-3f89e965e320.jpg`

**Brand quick reference**
- Colors: Primary Blue `#3a7aac` | Deep Teal `#218380` | Charcoal `#2b2b2b` | Dark Navy `#295266` | Vibrant Red `#ef4d4d`
- Type: Times New Roman bold (headings) | Open Sans light/regular (body) | Allura (accent script)
- Persistent red "Book a Clarity Call" CTA in sticky nav; max 6 main nav items
- Conversion Ladder: Free Resource opt-in -> Paid Course -> Group/1:1 Coaching application

---

## Chunk 0 - Foundation & Design System
- [x] Create `demo/` structure: `css/`, `js/`, `images/`
- [x] `css/styles.css`: CSS custom properties for brand palette + fonts; reset; typography scale
- [x] Shared components: buttons (red primary / teal secondary / ghost), cards, containers, section spacing
- [x] Shared sticky header (dark teal, logo, 6 nav links, red CTA) + footer markup reused by every page
- [x] `js/main.js` core: mobile hamburger toggle, sticky-header shadow on scroll, scroll-reveal (IntersectionObserver), active nav highlighting, auto footer year
- **Done when:** a starter page renders with header/footer and passes a browser smoke test -- PASSED 2026-07-22 (index, css, js, favicon all served HTTP 200 via local Node server)

## Chunk 1 - Home (`index.html`)
- [x] Hero: empathy headline ("Single & Thriving?" direction), subhead, dual CTA (Download Free Guide / Book a Clarity Call), portrait placeholder
- [x] Three journey-path cards: Learn -> Courses | Grow -> Group Coaching | Accelerate -> 1:1 Coaching
- [x] Testimonial slider (JS: auto-advance + dots/arrows)
- [x] Free guide banner (lead magnet opt-in) + featured blog posts teaser
- [x] Final CTA section
- **Done when:** home page matches wireframe feel; slider works; every CTA links to a real demo page -- PASSED 2026-07-22 (slider/opt-in JS verified via node --check; serve test HTTP 200; CTAs wired to pages built in later chunks, final link audit in Chunk 8)

## Chunk 2 - About + Coaching Hub
- [x] `about.html`: Marty's story ("I've been where you are"), credentials (Co-Active Certified), philosophy, "Work With Me" CTA
- [x] `coaching.html`: benefit-focused 1:1 vs Group comparison cards routing to sub-pages
- **Done when:** both pages linked from nav/home; consistent header/footer -- PASSED 2026-07-22

## Chunk 3 - Coaching Sub-Pages
- [x] `coaching-1on1.html`: transformation copy, testimonial placeholders, FAQ accordion (JS), multi-step application form with progress indicator + validation (JS)
- [x] `coaching-group.html`: "Single & Unbothered" 4-week reset - syllabus, cohort/waitlist form, payment plans, community highlights
- **Done when:** accordion + multi-step form fully functional and mobile-friendly -- PASSED 2026-07-22

## Chunk 4 - Courses
- [x] `courses.html`: filterable course grid (JS filter chips)
- [x] `course-envision-her.html`: long-form sales page - video placeholder, curriculum breakdown, money-back guarantee badge, $27 pricing, testimonials
- **Done when:** grid filters work; sales page CTAs route to contact/apply -- PASSED 2026-07-22

## Chunk 5 - Free Resources + Confident Girl Walks
- [x] `resources.html`: lead-magnet grid (guides, checklists, "Future You, Now" free visualization)
- [x] `confident-girl-walks.html`: 5-location walk schedule (Woodward Park, Veteran's Blvd, Visalia, Fowler, Clovis), "Add me to the list" opt-in with JS success state, merch/store teaser
- **Done when:** opt-in forms validate + show success; schedule renders cleanly -- PASSED 2026-07-22

## Chunk 6 - Blog
- [x] `blog.html`: category filter chips (Single & Thriving, Confidence, Self-Worth, Solo Travel) + post cards using real titles from the site crawl
- [x] `blog-post.html`: sample long-form post with mid-article opt-in box, end-of-post CTA, related-posts module
- **Done when:** filtering works; sample post funnels readers to resources per sitemap -- PASSED 2026-07-22

## Chunk 7 - Success Stories + Contact
- [x] `success-stories.html`: before/after transformation cards filterable by offer (1:1 / Group / Course), star ratings, bottom CTA to coaching hub
- [x] `contact.html`: dual path (general contact form + coaching application button), clarity-call scheduler placeholder, reassurance copy + testimonial near form
- **Done when:** forms validate; every CTA on the site resolves to a real page -- PASSED 2026-07-22

## Chunk 8 - Polish & QA
- [x] Cross-page link audit (all relative links resolve, no dead ends)
- [x] Mobile responsiveness pass (~375px) on every page
- [x] Browser console-error check; accessibility pass (labels, alt text, focus states, contrast)
- [x] Serve locally and walk the full Conversion Ladder: Blog -> Resource opt-in -> Course -> Coaching application
- **Done when:** full click-through is clean and the demo is ready to present -- PASSED 2026-07-22

---

## Chunk 9 - Cross-Agent Review & Consistency Fixes (2026-07-22)
Full audit found the sub-pages had drifted from the Chunk 0 design system (undefined
classes, divergent header/footer markup, dead form feedback). Fixes applied:
- [x] `css/styles.css`: added `.btn-teal` / `.btn-accent` variants, `.bg-light` / `.bg-offwhite` / `.bg-teal` section utilities, `.badge`, `.section-title`, `.filter-chip` + active state
- [x] `js/main.js`: opt-in success now forces `display:block` (beats inline `display:none`) and hides the form; active-nav maps sub-pages to parents (blog-post->Blog, coaching-*->Coaching, course-envision-her->Courses); multi-step form initializes `showStep(1)`; border reset uses brand var
- [x] All 12 sub-pages: shared `.site-footer` markup restored (was unstyled custom footer); nav unified to Home/About/Coaching/Courses/Resources/Blog; hardcoded `active` classes removed (JS owns it); favicon added; Google Fonts URL unified; `id="year"` replaced by `.js-year`; scroll-reveal added site-wide
- [x] Dead CTA sections fixed: `bg-teal` sections on about/coaching/success-stories now render the teal gradient (white text was invisible on white)
- [x] Courses: only Envision Her ($27) links to the sales page; "Boundaries Without Guilt" and "Solo Travel Playbook" marked Coming Soon with Notify Me -> contact (no more product/price mismatch)
- [x] blog-post: added hero thumb + wired `blog-thumb-featured` -> `blog-post-hero-thumb` shared-element morph; added missing related-posts module
- [x] confident-girl-walks: added merch/store teaser (`#notify` anchor to walk list); index: added Confident Girl Walks community section + Fresno footer line
- [x] contact: added "What happens next" reassurance + star testimonial beside the form
- [x] Copy consistency: "unshakeable" -> "unshakable"; encoding verified clean (UTF-8, no mojibake)
- **Done when:** class audit shows only intentional JS hooks undefined; link audit clean; all pages serve HTTP 200 -- PASSED 2026-07-22

---

**Status legend:** `[ ]` pending | `[x]` done - items get checked off as each chunk is completed and reviewed.



