import { CourseSchedule } from "@shared/courseData";

export function generateBrochureHTML(course: CourseSchedule): string {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .page { max-width: 800px; margin: 20px auto; background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e40af 0%, #b45309 100%); color: white; padding: 30px; margin: -40px -40px 30px -40px; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 5px 0 0 0; opacity: 0.9; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 18px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #b45309; padding-bottom: 10px; margin-bottom: 15px; }
    .content { line-height: 1.6; color: #333; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .grid-item { background: #f9f9f9; padding: 15px; border-left: 4px solid #b45309; }
    .grid-item strong { color: #1e40af; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin: 5px 0; }
    .highlight { background: #fef3c7; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .footer { border-top: 2px solid #1e40af; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
    .price-box { background: linear-gradient(135deg, #1e40af 0%, #b45309 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .price { font-size: 24px; font-weight: bold; }
    .pricing-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    .pricing-table th { background: #f9f9f9; padding: 10px; border: 1px solid #ddd; text-align: left; font-weight: bold; }
    .pricing-table td { padding: 10px; border: 1px solid #ddd; }
    @media print { body { background: white; } .page { margin: 0; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <h1>${course.title}</h1>
      <p>${course.category} • ${course.duration} Days • ${course.location === "international" ? "International (Premium)" : course.location === "africa" ? "Africa" : "Local"}</p>
    </div>

    <!-- Course Overview -->
    <div class="section">
      <div class="section-title">Course Overview</div>
      <div class="content">
        <p>${course.fullDescription}</p>
        <div class="highlight">
          <strong>Perfect for:</strong> Professionals and organizations looking to develop expertise in ${course.category.toLowerCase()}. Whether you're an individual learner or managing a team, this course delivers practical, immediately applicable skills.
        </div>
      </div>
    </div>

    <!-- Key Information -->
    <div class="section">
      <div class="section-title">Key Information</div>
      <div class="grid">
        <div class="grid-item">
          <strong>Duration:</strong> ${course.duration} Days
        </div>
        <div class="grid-item">
          <strong>Venue:</strong> ${course.venue}
        </div>
        <div class="grid-item">
          <strong>Start Date:</strong> ${course.startDate}
        </div>
        <div class="grid-item">
          <strong>Instructor:</strong> ${course.instructor}
        </div>
        <div class="grid-item">
          <strong>Max Participants:</strong> ${course.maxParticipants}
        </div>
        <div class="grid-item">
          <strong>Rating:</strong> ${course.rating}/5 (${course.reviews} reviews)
        </div>
      </div>
    </div>

    <!-- Instructor -->
    <div class="section">
      <div class="section-title">Your Instructor</div>
      <div class="content">
        <strong>${course.instructor}</strong>
        <p>${course.instructorBio}</p>
      </div>
    </div>

    <!-- Learning Outcomes -->
    <div class="section">
      <div class="section-title">What You'll Learn</div>
      <ul>
        ${course.learningOutcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
      </ul>
    </div>

    <!-- Curriculum -->
    <div class="section">
      <div class="section-title">Course Curriculum</div>
      <div class="content">
        ${course.curriculum
          .map(
            (mod, index) => `
          <div style="margin-bottom: 15px;">
            <strong>Module ${index + 1}: ${mod.module}</strong>
            <ul style="margin: 8px 0;">
              ${mod.topics.map((topic) => `<li>${topic}</li>`).join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <!-- Pricing -->
    <div class="section">
      <div class="section-title">Pricing Options</div>
      <table class="pricing-table">
        <tr>
          <th>Option</th>
          <th>Price per Delegate</th>
          <th>Laptop Included</th>
        </tr>
        <tr>
          <td>Standard Course</td>
          <td>ZAR ${course.pricing.basePrice.toLocaleString("en-ZA")}</td>
          <td>${course.pricing.laptopIncluded ? "Yes" : "No"}</td>
        </tr>
        ${!course.pricing.laptopIncluded ? `
        <tr>
          <td>With Laptop</td>
          <td>ZAR ${(course.pricing.basePrice + course.pricing.laptopPrice).toLocaleString("en-ZA")}</td>
          <td>Yes</td>
        </tr>
        ` : ""}
      </table>

      <div class="highlight">
        <strong>Bulk Discounts Available:</strong>
        <ul style="margin: 8px 0 0 0;">
          <li>3-4 Delegates: ${course.pricing.discounts.three}% discount</li>
          <li>5-9 Delegates: ${course.pricing.discounts.five}% discount</li>
          <li>10+ Delegates: ${course.pricing.discounts.ten}% discount</li>
          <li>In-House Training: ${course.pricing.inHouseDiscount}% discount</li>
        </ul>
      </div>
    </div>

    <!-- Requirements -->
    <div class="section">
      <div class="section-title">Course Requirements</div>
      <ul>
        <li>Maximum Participants: ${course.maxParticipants}</li>
        <li>Laptop/Device: Required (can be provided for additional fee)</li>
        <li>Software: Will be provided during the course</li>
        <li>Pre-requisites: None (suitable for all experience levels)</li>
      </ul>
    </div>

    <!-- Locations Available -->
    <div class="section">
      <div class="section-title">Training Locations</div>
      <div class="content">
        <strong>This course is available at:</strong>
        <ul>
          <li>Local Venues (South Africa): Cape Town, Johannesburg, Pretoria, Durban</li>
          <li>Africa Hubs: Lagos, Nairobi, Accra, Cairo, and other major cities</li>
          <li>International Hubs (Premium): London, Dubai, Singapore, New York, Sydney</li>
          <li>Virtual/Online: Available worldwide</li>
          <li>In-House: At your organization's location</li>
        </ul>
      </div>
    </div>

    <!-- How to Register -->
    <div class="section">
      <div class="section-title">How to Register</div>
      <ol style="line-height: 1.8;">
        <li>Visit www.knowledgecamp.co.za and select this course</li>
        <li>Choose your preferred location and date</li>
        <li>Add course options (laptop, in-house training, etc.)</li>
        <li>Proceed to checkout and receive your quotation</li>
        <li>Confirm enrollment with 50% deposit</li>
        <li>Receive course materials and schedule confirmation</li>
      </ol>
    </div>

    <!-- Contact -->
    <div class="section">
      <div class="section-title">Contact Knowledge Camp Global</div>
      <div class="content" style="line-height: 1.8;">
        <p>
          <strong>Email:</strong> info@knowledgecamp.co.za<br>
          <strong>Phone:</strong> +27 11 568 6712<br>
          <strong>WhatsApp:</strong> +27 83 391 0863<br>
          <strong>Website:</strong> www.knowledgecamp.co.za<br>
          <strong>Locations:</strong> South Africa, African Hubs, International
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Knowledge Camp Global | Professional Training & Skills Development</p>
      <p>This brochure is valid for 2026. Prices and schedules subject to change. For the latest information, visit our website.</p>
      <p style="margin-top: 10px;">Generated: ${new Date().toLocaleDateString("en-ZA")}</p>
    </div>
  </div>
</body>
</html>
  `;

  return html;
}

export function downloadBrochure(
  course: CourseSchedule,
  filename: string = `${course.title.replace(/\s+/g, "-").toLowerCase()}-brochure.html`
) {
  const html = generateBrochureHTML(course);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
