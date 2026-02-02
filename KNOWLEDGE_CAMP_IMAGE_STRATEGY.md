# Knowledge Camp Global – Image Generation Strategy
## For Builder.io AI Image Generation

**Generated:** February 2026  
**Brand:** Knowledge Camp Global (Professional Training & Education)  
**Tool:** Builder.io AI Image Generator  
**Style Guide:** Clean, premium, corporate, diverse, photorealistic  

---

## MASTER PROMPT (Use at start of every Builder.io image prompt)

```
Create a high-quality, photorealistic corporate training website image for Knowledge Camp Global.
Style: clean, professional, premium, global business education brand.
Tone: confident, calm, credible, executive-level.
Lighting: soft natural light, bright but not harsh.
Composition: minimal, uncluttered, clear focal point.
People: diverse professionals (African and international), well-dressed, modern business attire.
Environment: modern training rooms, conference venues, boardrooms, executive learning spaces.
Avoid: cheesy stock photos, exaggerated smiles, staged poses, clutter, busy backgrounds.
Aspect ratio: 16:9 for hero images; 4:3 for section images.
Quality: ultra-high resolution, website quality, realistic depth of field.
```

---

## SECTION 1: MARKETING / LANDING PAGES

### 1.1 Home Page (Index.tsx)
**Route:** `/`  
**Purpose:** Hero + trust + course discovery  
**Images needed:** 2

#### Hero Background Image
**File name:** `/images/site/home-hero.jpg`  
**Location:** Full-width hero background (16:9)  
**Story:** "Global professionals learning together"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A modern corporate training session in a premium conference room. A diverse group of African and international professionals are seated at tables, laptops open, listening to a facilitator presenting at the front. The room is bright, spacious, minimal, and elegant. Large windows with soft daylight. Professional atmosphere. No clutter. No exaggerated expressions. Executive education environment. 16:9 aspect ratio.
```

---

#### Trust / Value Section Image
**File name:** `/images/site/home-trust-section.jpg`  
**Location:** Mid-page section above CTA  
**Story:** "Real engagement, real learning"

**Builder.io Prompt:**
```
[MASTER PROMPT]
Close-up of a professional workshop in progress: professionals taking notes on laptops, a facilitator pointing at a screen showing data. Focus on engagement, learning, and concentration. Soft background blur. Minimal, corporate, premium training atmosphere. 16:9 aspect ratio.
```

---

### 1.2 About Page (AboutPage.tsx)
**Route:** `/about`  
**Purpose:** Build credibility and organisational story  
**Images needed:** 1

#### Who We Are / Leadership
**File name:** `/images/site/about.jpg`  
**Location:** Hero or leadership section  
**Story:** "Experienced, credible, trusted facilitators"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional senior facilitator leading a group of executives in a modern boardroom-style training environment. Participants are engaged, thoughtful, and attentive. The space is clean, modern, with glass walls and natural light. The image conveys authority, expertise, credibility, and professional trust. 16:9 aspect ratio.
```

---

### 1.3 Contact Page (ContactPage.tsx)
**Route:** `/contact`  
**Purpose:** Build trust and accessibility  
**Images needed:** 1

#### Reception / Office Space
**File name:** `/images/site/contact.jpg`  
**Location:** Hero or contact section  
**Story:** "Accessible, professional, real organisation"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A modern professional office reception or meeting space. Clean, welcoming, corporate, contemporary design. Neutral colour palette, natural light, minimalist furniture. Calm and trustworthy environment. No people or minimal reception staff. 16:9 aspect ratio.
```

---

### 1.4 Partnerships Page (PartnershipPage.tsx)
**Route:** `/partnerships`  
**Purpose:** Show collaboration and trust  
**Images needed:** 1

#### Business Partnership / Collaboration
**File name:** `/images/site/partnerships.jpg`  
**Location:** Hero section  
**Story:** "Trust, collaboration, long-term relationships"

**Builder.io Prompt:**
```
[MASTER PROMPT]
Two senior professionals in a business meeting shaking hands across a clean boardroom table. Modern, minimal background. Confident, professional tone. No exaggerated smiles. The image should feel like a mutual respect moment between two credible partners. 16:9 aspect ratio.
```

---

### 1.5 Sponsors Page (SponsorPage.tsx)
**Route:** `/sponsors`  
**Purpose:** Show organisational credibility  
**Images needed:** 1

#### Corporate Partnership Environment
**File name:** `/images/site/sponsors.jpg`  
**Location:** Hero section  
**Story:** "Strategic partnerships with leading organisations"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A high-end corporate boardroom with floor-to-ceiling windows showing a city skyline. A team of professionals is gathered around a table reviewing partnership materials. Clean, premium, executive environment. Natural light, neutral tones. No clutter. 16:9 aspect ratio.
```

---

### 1.6 Pricing Page (PricingPage.tsx)
**Route:** `/pricing`  
**Purpose:** Establish value and transparency  
**Images needed:** 1

#### Value / Investment
**File name:** `/images/site/pricing.jpg`  
**Location:** Hero section  
**Story:** "Premium investment in professional development"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A close-up of professionals reviewing training materials and pricing options on a laptop, with notebooks and coffee on a clean, modern desk. Soft natural light, calm focused atmosphere. Minimal background. The image should feel like a serious, thoughtful investment decision. 16:9 aspect ratio.
```

---

### 1.7 FAQ Page (FAQPage.tsx)
**Route:** `/faq`  
**Purpose:** Transparency and support  
**Images needed:** 1

#### Customer Support / Clarity
**File name:** `/images/site/faq.jpg`  
**Location:** Hero section  
**Story:** "Clear answers, accessible support"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional support agent or facilitator at a desk with multiple monitors, helping a customer via video call or in-person. Clean, modern office environment. Helpful, calm, professional tone. Bright, minimal background. 16:9 aspect ratio.
```

---

### 1.8 Privacy Page (PrivacyPage.tsx)
**Route:** `/privacy`  
**Purpose:** Build trust through data responsibility  
**Images needed:** 1 (optional, can reuse contact or generic corporate)

#### Data Security / Trust
**File name:** `/images/site/privacy.jpg`  
**Location:** Hero section  
**Story:** "Your data is safe, secure, professional"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional in a modern office using a secure, encrypted digital interface on a laptop. Clean workspace, soft lighting, neutral tones, professional but reassuring. The image should feel trustworthy and protective. 16:9 aspect ratio.
```

---

## SECTION 2: COURSE PAGES

### 2.1 Courses List Page (CoursesPage.tsx)
**Route:** `/courses`  
**Purpose:** Showcase course discovery and engagement  
**Images needed:** 1

#### Courses Header / Classroom Setup
**File name:** `/images/site/courses-header.jpg`  
**Location:** Hero section  
**Story:** "Structured learning, real outcomes"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A clean, professional training classroom with neatly arranged tables, notebooks, laptops, and a presentation screen. No people in focus. Calm, minimal, executive learning environment. The image should feel like a premium training venue ready for delegates. Modern, bright, organised. 16:9 aspect ratio.
```

---

### 2.2 Course Detail Page (CourseDetailPage.tsx)
**Route:** `/courses/:id`  
**Purpose:** Showcase course value, curriculum, outcomes  
**Images needed:** 2-3

#### What You Will Learn / Focus
**File name:** `/images/site/course-learning.jpg`  
**Location:** "What You Will Learn" section  
**Story:** "Focused learning, practical skills development"

**Builder.io Prompt:**
```
[MASTER PROMPT]
Close-up of a professional taking detailed notes, laptop open with training materials visible on the desk. Soft lighting, neutral tones, minimal distractions. Pencil, notebook, coffee. The image should feel intimate and focused, showing real learning in progress. 16:9 aspect ratio.
```

---

#### Who Should Attend / Collaboration
**File name:** `/images/site/course-attend.jpg`  
**Location:** "Who Should Attend" section  
**Story:** "Professionals at different levels learning together"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A diverse group of professionals seated around a table discussing training materials, collaborative but calm, business-like environment. Subtle confident expressions. Modern conference room with neutral colours. Everyone is engaged, professional. 16:9 aspect ratio.
```

---

#### Course Outcomes / Success
**File name:** `/images/site/course-outcomes.jpg`  
**Location:** "After This Course" or outcomes section  
**Story:** "Measurable results, professional growth"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional presenting data or insights to a group in a boardroom, showing confidence and expertise gained from training. Clean, modern environment, positive and professional tone. Subtle success/achievement feeling without being over-the-top. 16:9 aspect ratio.
```

---

### 2.3 Course Calendar Page (CourseCalendarPage.tsx)
**Route:** `/calendar`  
**Purpose:** Show course scheduling and planning  
**Images needed:** 1

#### Calendar / Planning
**File name:** `/images/site/calendar.jpg`  
**Location:** Hero or calendar section  
**Story:** "Flexible scheduling, real options"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional reviewing a calendar or schedule on a desk with a planner, laptop, and notebook. Clean, organised workspace. Soft natural light. The image should feel strategic and planned, showing someone making an informed decision about their training timing. 16:9 aspect ratio.
```

---

## SECTION 3: VENUE & HUB PAGES

### 3.1 Venues Page (VenuesPage.tsx)
**Route:** `/venues`  
**Purpose:** Showcase training locations and quality  
**Images needed:** 1 (overview)

#### Venues Overview
**File name:** `/images/site/venues-header.jpg`  
**Location:** Hero section  
**Story:** "Premium, reliable, consistent training venues across Africa"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A premium modern training complex or conference centre with multiple bright spaces visible. Clean, professional, modern architecture. Neutral tones, natural light. The image should convey quality, scale, and professionalism across multiple training environments. 16:9 aspect ratio.
```

---

### 3.2 Hub Page - South Africa (HubPage.tsx?hub=sa)
**Route:** `/hubs/sa`  
**Purpose:** Showcase SA training capacity  
**Images needed:** 1

#### South Africa Hub
**File name:** `/images/site/hub-sa.jpg`  
**Location:** Hero section  
**Story:** "Premium, accessible training across South Africa"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A modern hotel conference suite or corporate training venue in an urban South African setting (Johannesburg/Sandton feel). Clean tables, professional setup, soft natural light. Executive learning environment. No people or minimal people. Premium and accessible. 16:9 aspect ratio.
```

---

### 3.3 Hub Page - Africa (HubPage.tsx?hub=africa)
**Route:** `/hubs/africa`  
**Purpose:** Showcase pan-African reach  
**Images needed:** 1

#### Africa Hub / Pan-African Presence
**File name:** `/images/site/hub-africa.jpg`  
**Location:** Hero section  
**Story:** "Pan-African professional development, global standard"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional training session in Africa with diverse participants from different African countries in a modern venue. Professional, contemporary, well-equipped training environment. No stereotypes. Show modernity, professionalism, and growth. Diverse, confident learners. 16:9 aspect ratio.
```

---

### 3.4 Hub Page - International (HubPage.tsx?hub=international)
**Route:** `/hubs/international`  
**Purpose:** Showcase global reach and international standards  
**Images needed:** 1

#### International Hub
**File name:** `/images/site/hub-international.jpg`  
**Location:** Hero section  
**Story:** "Global standard professional education"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A high-end corporate training environment in a global business city (London, Singapore, New York style). Diverse international professionals learning together in a premium, modern venue. Clean, minimalist, executive environment. 16:9 aspect ratio.
```

---

### 3.5 Online/Hybrid Page (OnlineHybridPage.tsx)
**Route:** `/online-hybrid`  
**Purpose:** Showcase flexible learning options  
**Images needed:** 1

#### Hybrid / Flexible Learning
**File name:** `/images/site/online-hybrid.jpg`  
**Location:** Hero section  
**Story:** "Professional learning, anywhere, anytime"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional working from a modern home office or café, on a video call with training facilitators, laptop open. Clean, bright, professional environment. The image should feel flexible, modern, connected, and professional. 16:9 aspect ratio.
```

---

### 3.6 In-House Page (InHousePage.tsx)
**Route:** `/in-house`  
**Purpose:** Promote custom corporate training  
**Images needed:** 1

#### Custom In-House Training
**File name:** `/images/site/in-house.jpg`  
**Location:** Hero section  
**Story:** "Tailored training for your organisation"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A private corporate training session in a company boardroom. Knowledge Camp facilitator leading a team training session for a specific organisation. Professional, focused, bespoke feel. The image should convey customisation and expertise. 16:9 aspect ratio.
```

---

## SECTION 4: REGISTRATION & FLOW PAGES

### 4.1 Register Page (RegisterPage.tsx)
**Route:** `/register`  
**Purpose:** Enable course registration  
**Images needed:** 1 (optional)

#### Registration / Next Steps
**File name:** `/images/site/register.jpg`  
**Location:** Hero or CTA section (optional)  
**Story:** "Easy registration, quick action"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional filling out a registration form on a laptop, pen in hand, taking action. Clean, bright workspace, modern design. The image should feel easy, clear, and action-oriented without being pushy. 16:9 aspect ratio.
```

---

### 4.2 Checkout Page (CheckoutPage.tsx)
**Route:** `/checkout`  
**Purpose:** Secure payment and confirmation  
**Images needed:** 1 (optional)

#### Checkout / Secure Transaction
**File name:** `/images/site/checkout.jpg`  
**Location:** Hero or confirmation section (optional)  
**Story:** "Secure, simple, trusted checkout"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A close-up of a professional completing a secure online transaction on a laptop, credit card visible on desk, calm and confident expression. Clean workspace, soft lighting. The image should convey security, trust, and simplicity. 16:9 aspect ratio.
```

---

### 4.3 Enterprise Registration Page (EnterpriseRegistrationPage.tsx)
**Route:** `/register-enterprise`  
**Purpose:** Enable bulk/enterprise registration and quotation  
**Images needed:** 1

#### Enterprise Solutions / Quotation
**File name:** `/images/site/enterprise.jpg`  
**Location:** Hero section  
**Story:** "Custom enterprise solutions, bulk training"

**Builder.io Prompt:**
```
[MASTER PROMPT]
Senior executives in a boardroom reviewing a training proposal or quotation. Professional, serious, collaborative tone. Clean modern conference room. The image should feel high-level, strategic, and enterprise-focused. 16:9 aspect ratio.
```

---

## SECTION 5: DASHBOARD PAGES

### 5.1 Dashboard / User Area (DashboardPage.tsx)
**Route:** `/dashboard`  
**Purpose:** User account and progress tracking  
**Images needed:** 1 (optional - usually not needed for dashboards)

#### Learning Progress / Dashboard
**File name:** `/images/site/dashboard.jpg`  
**Location:** Hero or welcome section (optional)  
**Story:** "Track your learning journey"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional using a laptop showing a learning dashboard or progress interface, taking notes. Modern workspace, focused environment. The image should feel organised, transparent, and progress-focused. 16:9 aspect ratio.
```

---

### 5.2 Partner Dashboard (PartnerDashboardPage.tsx)
**Route:** `/partner-dashboard`  
**Purpose:** Partner account and approvals  
**Images needed:** 1 (optional)

#### Partner Portal / Management
**File name:** `/images/site/partner-dashboard.jpg`  
**Location:** Hero or welcome section (optional)  
**Story:** "Manage partnerships and collaborations"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A partner or account manager using a management dashboard on a laptop, reviewing metrics and collaboration data. Modern office, professional, organised. The image should feel like a control centre for collaboration. 16:9 aspect ratio.
```

---

## SECTION 6: FUTURE / LMS PAGES

### 6.1 LMS Page (LMSPage.tsx)
**Route:** `/lms`  
**Purpose:** Learning management system (waitlist/announcement)  
**Images needed:** 1

#### LMS / Digital Learning
**File name:** `/images/site/lms.jpg`  
**Location:** Hero section  
**Story:** "Digital learning platform, future-ready education"

**Builder.io Prompt:**
```
[MASTER PROMPT]
A professional using a sophisticated learning management platform on a large monitor. Clean, modern tech environment. The interface should feel intuitive, powerful, and professional. Soft lighting, neutral workspace. 16:9 aspect ratio.
```

---

## FILE NAMING & STORAGE

All images should be stored in your public assets folder:

```
/public/images/site/
  ├── home-hero.jpg
  ├── home-trust-section.jpg
  ├── about.jpg
  ├── contact.jpg
  ├── partnerships.jpg
  ├── sponsors.jpg
  ├── pricing.jpg
  ├── faq.jpg
  ├── privacy.jpg
  ├── courses-header.jpg
  ├── course-learning.jpg
  ├── course-attend.jpg
  ├── course-outcomes.jpg
  ├── calendar.jpg
  ├── venues-header.jpg
  ├── hub-sa.jpg
  ├── hub-africa.jpg
  ├── hub-international.jpg
  ├── online-hybrid.jpg
  ├── in-house.jpg
  ├── register.jpg
  ├── checkout.jpg
  ├── enterprise.jpg
  ├── dashboard.jpg
  ├── partner-dashboard.jpg
  └── lms.jpg
```

---

## HOW TO IMPLEMENT IN BUILDER.IO

### Step 1: Generate Each Image
1. Go to Builder.io image generation field
2. Copy the relevant **Builder.io Prompt** from this document
3. Click "Generate image"
4. Review and accept the result
5. Download and save to `/public/images/site/[filename].jpg`

### Step 2: Add Images to Components
In your React components, reference images like:

```tsx
<img 
  src="/images/site/home-hero.jpg" 
  alt="Global professionals learning in a premium conference room"
  className="w-full h-96 object-cover rounded-2xl"
/>
```

### Step 3: Styling Best Practices
- **Hero images:** Full-width, fixed height (h-96 or h-screen), object-cover
- **Section images:** Fixed aspect ratio (16:9), rounded corners (rounded-2xl)
- **Soft overlays:** Optional dark overlay (10–20% opacity) for text readability
- **Responsive:** Use responsive heights (h-48 md:h-96) for mobile

---

## SEO ALT TEXT (Ready to Use)

Copy-paste these alt texts for each image to improve SEO and accessibility:

| Image File | Alt Text |
|---|---|
| home-hero.jpg | "Diverse professionals learning in a modern corporate training session" |
| home-trust-section.jpg | "Professionals engaging in a workshop with facilitator presenting" |
| about.jpg | "Senior facilitator leading executives in a professional boardroom training" |
| contact.jpg | "Modern professional office reception with clean corporate design" |
| partnerships.jpg | "Two business professionals shaking hands in a boardroom meeting" |
| sponsors.jpg | "Corporate team reviewing partnership materials in an executive environment" |
| pricing.jpg | "Professional reviewing training pricing and materials on a laptop" |
| faq.jpg | "Support professional helping customer via video call or in-person" |
| privacy.jpg | "Professional using secure digital interface on modern office laptop" |
| courses-header.jpg | "Empty premium training classroom with organised tables and presentation setup" |
| course-learning.jpg | "Professional taking detailed notes with laptop and training materials" |
| course-attend.jpg | "Diverse professionals discussing training materials around a conference table" |
| course-outcomes.jpg | "Professional presenting insights to colleagues in modern boardroom" |
| calendar.jpg | "Professional reviewing training schedule and calendar on desk planner" |
| venues-header.jpg | "Modern training complex with bright professional conference spaces" |
| hub-sa.jpg | "Premium hotel conference suite set up for corporate training in South Africa" |
| hub-africa.jpg | "Professional training session with diverse African professionals in modern venue" |
| hub-international.jpg | "High-end corporate training environment with diverse international professionals" |
| online-hybrid.jpg | "Professional participating in video training call from modern home office" |
| in-house.jpg | "Knowledge Camp facilitator leading private corporate training session" |
| register.jpg | "Professional completing course registration form on laptop" |
| checkout.jpg | "Professional securely completing online payment transaction" |
| enterprise.jpg | "Senior executives reviewing enterprise training proposal in boardroom" |
| dashboard.jpg | "Professional tracking learning progress on comprehensive dashboard" |
| partner-dashboard.jpg | "Partner manager reviewing collaboration metrics on management dashboard" |
| lms.jpg | "Professional using sophisticated learning management platform on large monitor" |

---

## QUICK CHECKLIST

- [ ] Generate all 25 images using Builder.io AI
- [ ] Save each image with correct filename to `/public/images/site/`
- [ ] Replace placeholder images in each page component
- [ ] Add alt text to each image for SEO
- [ ] Test responsive display on mobile and desktop
- [ ] Add soft overlays to hero images if needed for text readability
- [ ] Use `object-cover` for consistent image display
- [ ] Review each page in live preview for visual consistency

---

## BRAND CONSISTENCY NOTES

All images should feel:
- ✓ Premium and professional
- ✓ Clean and minimal (no clutter)
- ✓ Diverse (African and international professionals)
- ✓ Modern and contemporary
- ✓ Well-lit (soft natural light)
- ✓ Corporate and executive
- ✓ Calm and confident (no exaggerated expressions)
- ✓ Real and authentic (not cheesy stock photos)

If any generated image feels off-brand, regenerate using the same prompt or refine the prompt in the comments section.

---

## NOTES

- **Total images to generate:** 25
- **Aspect ratios:** 16:9 for all images
- **Quality target:** Ultra-high resolution, website hero quality
- **Time estimate:** 1-2 minutes per image with Builder.io AI
- **Total generation time:** 30-50 minutes to generate all images

---

**Ready to generate? Start with home-hero.jpg and work through each section. Each image is independent and can be generated in any order.**
