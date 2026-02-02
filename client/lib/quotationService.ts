export interface QuotationDetails {
  invoiceNumber: string;
  date: string;
  company: {
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  };
  authoriser: {
    name: string;
    position: string;
    department: string;
    email: string;
  };
  items: {
    courseTitle: string;
    location: string;
    delegateCount: number;
    basePrice: number;
    laptopPrice: number;
    includesLaptop: boolean;
    discountPercentage: number;
    subtotal: number;
  }[];
  total: number;
  validityDays?: number;
  marketingOptIn?: boolean;
}

export function generateQuotationHTML(details: QuotationDetails): string {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (details.validityDays || 30));

  const itemsHTML = details.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.courseTitle}</strong><br>
        <small style="color: #666;">
          ${item.delegateCount} delegate${item.delegateCount > 1 ? "s" : ""}
          ${item.includesLaptop ? " + Laptop" : ""}
        </small>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ZAR ${item.subtotal.toLocaleString("en-ZA")}
      </td>
    </tr>
  `
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #1e40af; padding-bottom: 20px; }
    .company-info { }
    .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
    .company-tagline { color: #666; font-size: 14px; }
    .invoice-info { text-align: right; }
    .invoice-number { font-weight: bold; font-size: 14px; }
    .invoice-date { color: #666; font-size: 12px; }
    .section { margin-bottom: 30px; }
    .section-title { font-weight: bold; margin-bottom: 10px; }
    .bill-to { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
    .bill-section h3 { margin: 0 0 10px 0; font-size: 14px; }
    .bill-section p { margin: 3px 0; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    thead { background-color: #f3f4f6; border-bottom: 2px solid #1e40af; }
    th { padding: 12px; text-align: left; font-weight: bold; font-size: 13px; }
    .totals { text-align: right; width: 400px; margin-left: auto; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .totals-row.total { font-size: 18px; font-weight: bold; border-top: 2px solid #1e40af; padding-top: 12px; color: #b45309; }
    .notes { background-color: #fef3c7; padding: 15px; border-radius: 4px; font-size: 12px; margin-bottom: 20px; }
    .footer { text-align: center; color: #666; font-size: 11px; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="company-info">
        <div class="company-name">Knowledge Camp Global</div>
        <div class="company-tagline">Professional Training & Skills Development</div>
      </div>
      <div class="invoice-info">
        <div class="invoice-number">Quotation: ${details.invoiceNumber}</div>
        <div class="invoice-date">Date: ${details.date}</div>
        <div class="invoice-date" style="margin-top: 8px;">Valid until: ${validUntil.toLocaleDateString("en-ZA")}</div>
      </div>
    </div>

    <div class="bill-to">
      <div class="bill-section">
        <h3>BILL TO:</h3>
        <p><strong>${details.company.name}</strong></p>
        <p>${details.company.address}</p>
        <p>${details.company.city}, ${details.company.country}</p>
        <p>${details.company.email}</p>
        <p>${details.company.phone}</p>
      </div>
      <div class="bill-section">
        <h3>AUTHORIZED BY:</h3>
        <p><strong>${details.authoriser.name}</strong></p>
        <p>${details.authoriser.position}</p>
        <p>${details.authoriser.department}</p>
        <p>${details.authoriser.email}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-row">
        <span>Subtotal:</span>
        <span>ZAR ${details.total.toLocaleString("en-ZA")}</span>
      </div>
      <div class="totals-row">
        <span>Tax (if applicable):</span>
        <span>Calculated and shown on the official tax invoice (e.g. VAT 15% where applicable)</span>
      </div>
      <div class="totals-row total">
        <span>TOTAL DUE:</span>
        <span>ZAR ${details.total.toLocaleString("en-ZA")}</span>
      </div>
    </div>

    <div class="notes">
      <strong>Important Notes:</strong>
      <ul style="margin: 8px 0 0 20px;">
        <li>This quotation is valid for ${details.validityDays || 30} days from the date above.</li>
        <li>Prices are in South African Rand (ZAR) and include applicable discounts.</li>
        <li>In-house training options are available at special rates - please inquire.</li>
        <li>Laptop options can be added or removed per delegate.</li>
        <li>Invoicing will be raised upon confirmation and 50% deposit required to secure dates.</li>
        <li>Full payment required 7 days before training commences.</li>
        <li>
          Marketing communications: ${
            details.marketingOptIn
              ? "authoriser opted in to receive training calendars, specials and offers."
              : "authoriser did not opt in to additional marketing communications."
          }
        </li>
      </ul>
    </div>

    <div class="section">
      <h3 style="margin-bottom: 10px;">DELIVERY OPTIONS:</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
        <li><strong>Local (South Africa):</strong> Cape Town, Johannesburg, Pretoria, Durban</li>
        <li><strong>Africa Hubs:</strong> Lagos, Nairobi, Accra, Cairo, other major cities</li>
        <li><strong>International (Premium):</strong> London, Dubai, Singapore, New York, Sydney</li>
        <li><strong>Virtual/In-House:</strong> Available for all locations with special rates</li>
      </ul>
    </div>

    <div class="footer">
      <p>Knowledge Camp Global | Email: info@knowledgecamp.co.za | www.knowledgecamp.co.za</p>
      <p>This quotation is confidential and prepared specifically for ${details.company.name}</p>
    </div>
  </div>
</body>
</html>
  `;

  return html;
}

export function downloadQuotationAsHTML(
  details: QuotationDetails,
  filename: string = `quotation-${details.invoiceNumber}.html`
) {
  const html = generateQuotationHTML(details);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function generateEmailTemplate(details: QuotationDetails): string {
  return `
<html>
<body style="font-family: Arial, sans-serif; color: #333;">
  <p>Dear ${details.authoriser.name},</p>

  <p>Thank you for your interest in Knowledge Camp Global training programs. Please find below the quotation for your requested training courses.</p>

  <h3>Quotation Summary</h3>
  <p><strong>Quotation Number:</strong> ${details.invoiceNumber}<br>
  <strong>Date:</strong> ${details.date}<br>
  <strong>Valid Until:</strong> ${new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString("en-ZA")}</p>

  <h3>Company Details</h3>
  <p>${details.company.name}<br>
  ${details.company.address}<br>
  ${details.company.city}, ${details.company.country}</p>

  <p><strong>Marketing Updates:</strong>
  ${
    details.marketingOptIn
      ? "You have opted in to receive training calendars, specials and offers from Knowledge Camp Global."
      : "You are not currently subscribed to additional marketing communications."
  }
  </p>

  <h3>Training Courses</h3>
  <ul>
    ${details.items
      .map(
        (item) =>
          `<li>${item.courseTitle} - ${item.delegateCount} delegate(s) - ZAR ${item.subtotal.toLocaleString("en-ZA")}</li>`
      )
      .join("")}
  </ul>

  <h3 style="color: #b45309;">Total Amount: ZAR ${details.total.toLocaleString("en-ZA")}</h3>

  <p><strong>Next Steps:</strong></p>
  <ol>
    <li>Please review the attached quotation document</li>
    <li>Contact us to confirm the training dates and venues</li>
    <li>A 50% deposit will secure your reserved dates</li>
    <li>Full payment is due 7 days before training commences</li>
  </ol>

  <p><strong>Special Options Available:</strong></p>
  <ul>
    <li>In-house training at your premises (with special discounts)</li>
    <li>Virtual training programs</li>
    <li>Customized content for your organization</li>
    <li>Post-training support and mentoring</li>
  </ul>

  <p>For any questions or to proceed with booking, please reply to this email or contact our training coordinators:</p>
  <p>
    <strong>Knowledge Camp Global</strong><br>
    Email: <a href="mailto:info@knowledgecamp.co.za">info@knowledgecamp.co.za</a><br>
    Phone: +27 11 568 6712<br>
    Web: www.knowledgecamp.co.za
  </p>

  <p>We look forward to partnering with you on your training and development journey!</p>

  <p>Best regards,<br>
  <strong>Knowledge Camp Global Training Team</strong></p>
</body>
</html>
  `;
}
