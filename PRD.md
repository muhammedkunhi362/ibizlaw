# Product Requirements Document (PRD): iBizLaw Corporate Website

## 1. Executive Summary
**Project Name:** iBizLaw Corporate Website  
**Objective:** To design and develop a professional, informative, and legally compliant website for iBizLaw, a Bengaluru-based full-service law practice. The website serves as a digital brochure to inform potential clients about the firm’s expertise while strictly adhering to the **Bar Council of India (BCI)** regulations against legal advertising.
**Design Vision:** A "Luxury Corporate" aesthetic characterized by high-contrast dark sections, gold accents, and a clean, storytelling layout.

---

## 2. Target Audience
* **Individuals:** Seeking civil, criminal, or general legal representation.
* **Businesses & Startups:** Requiring legal advisory, business incorporation, compliance, drafting, and due diligence.
* **Institutions:** Needing specialized sector-based legal counsel and representation in tribunals or high courts.

---

## 3. Site Architecture (Sitemap)
1.  **Home:** Professional overview and firm identity.
2.  **About Us:** Detailed firm philosophy and Bengaluru heritage.
3.  **Practice Areas:**
    * **Litigation:** Civil, Criminal, Commercial, etc.
    * **Non-Litigation:** Incorporation, Compliance, Drafting, etc.
4.  **Contact Us:** Location, secure contact form, and direct contact details.
5.  **Legal/Compliance:** Mandatory Disclaimer, Privacy Policy, Terms of Use.

---

## 4. Visual Identity & UI Design (Luxury Corporate Theme)

### 4.1. Color Palette
| Element | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark** | `#1A1A1A` | Hero background, Footer, and High-contrast sections. |
| **Accent Gold** | `#8C764D` | Buttons, icons, borders, and active states. |
| **Secondary Light**| `#F8F9FA` | Main content areas to ensure readability. |
| **Text Primary** | `#FFFFFF` | Primary text on dark backgrounds. |
| **Text Secondary** | `#2D2D2D` | Primary text on light backgrounds. |

### 4.2. Typography
* **Headings:** Modern Serif (e.g., *Cormorant Garamond* or *Playfair Display*) to convey tradition and authority.
* **Body:** Clean Sans-serif (e.g., *Inter* or *Montserrat*) for high readability and a modern corporate feel.

### 4.3. UI Components
* **Glassmorphism:** Navigation bar with backdrop-blur over the Hero image.
* **High-Contrast Sections:** Intentional alternating between Deep Charcoal (`#1A1A1A`) and Off-white (`#F8F9FA`) backgrounds.
* **Modern Cards:** Service cards with subtle shadows and gold border accents on hover.

---

## 5. Functional & Compliance Requirements

### 5.1. Mandatory BCI Disclaimer (Gatekeeper)
A full-screen, non-dismissible modal (Click-wrap Agreement) must appear before any content is visible.
* **Content:** As per Bar Council of India rules, advocates are not permitted to solicit work. The user must acknowledge they are seeking information voluntarily.
* **Logic:** Persistent state using `localStorage` to prevent re-triggering during the same session.
* **Design:** Deep charcoal background with gold-bordered "I Agree" button.

### 5.2. Contact Form & Lead Management
* **Fields:** Full Name, Email, Phone Number, Subject, Message.
* **Acknowledgment:** Automated, non-soliciting email response.
* **Security:** SSL encryption (HTTPS) for all data submissions.

---

## 6. Content Structure

### 6.1. Homepage Breakdown
* **Hero Section:** High-resolution architectural background, dark overlay, and Gold-accented CTA buttons.
* **Logo/Pillar Bar:** Grayscale row featuring core legal sectors (e.g., Courtroom Advocacy, Business Advisory).
* **Practice Structure:** Specialized sections for "Department 1: Litigation" and "Department 2: Non-Litigation" using premium photography.
* **Value Prop:** "Why Clients Choose iBizLaw" section with gold iconography.

### 6.2. Footer
* **Layout:** 4-column dark layout containing firm description, navigation, social links (compliance permitting), and copyright.

---

## 7. Technical Requirements

### 7.1. Tech Stack
* **Framework:** **Next.js 14+** (App Router) for SSR and SEO.
* **Styling:** **Tailwind CSS** (Utility-first, responsive).
* **Animations:** **Framer Motion** for premium scroll-triggered reveals.
* **Icons:** **Lucide-React** (themed to `#8C764D`).

### 7.2. Performance & SEO
* **Speed:** Optimized for sub-3-second load times.
* **SEO:** Technical SEO for organic visibility in Bengaluru without violating solicitation rules.
* **Responsiveness:** Fluid transitions between 4K desktop, tablet, and mobile views.

---

## 8. Ethics & Standards
* **Non-Solicitation:** Content remains strictly informational.
* **Professionalism:** No usage of generic legal clichés (gavels, scales of justice); focus on professional imagery and corporate environments.