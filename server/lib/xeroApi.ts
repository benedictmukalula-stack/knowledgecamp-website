import axios from "axios";

const XERO_BASE_URL = "https://api.xero.com/api.xro/2.0";

function getXeroHeaders() {
  const accessToken = process.env.XERO_ACCESS_TOKEN;
  const tenantId = process.env.XERO_TENANT_ID;
  if (!accessToken || !tenantId) return null;
  return {
    Authorization: `Bearer ${accessToken}`,
    "Xero-tenant-id": tenantId,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function isXeroConfigured() {
  return Boolean(process.env.XERO_ACCESS_TOKEN && process.env.XERO_TENANT_ID);
}

export async function createXeroContact(input: {
  name: string;
  email?: string;
  phone?: string;
}) {
  const headers = getXeroHeaders();
  if (!headers) return null;

  const payload = {
    Contacts: [
      {
        Name: input.name,
        EmailAddress: input.email,
        Phones: input.phone
          ? [{ PhoneType: "MOBILE", PhoneNumber: input.phone }]
          : undefined,
      },
    ],
  };

  const response = await axios.post(`${XERO_BASE_URL}/Contacts`, payload, { headers });
  const contact = response.data?.Contacts?.[0];
  return contact?.ContactID || null;
}

export async function createXeroInvoice(input: {
  contactId?: string | null;
  contactName: string;
  email?: string;
  courseTitle: string;
  total: number;
  delegateCount: number;
}) {
  const headers = getXeroHeaders();
  if (!headers) return null;

  const accountCode = process.env.XERO_SALES_ACCOUNT_CODE || "200";
  const today = new Date();
  const dueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const payload = {
    Invoices: [
      {
        Type: "ACCREC",
        Contact: input.contactId
          ? { ContactID: input.contactId }
          : { Name: input.contactName, EmailAddress: input.email },
        Date: today.toISOString().split("T")[0],
        DueDate: dueDate.toISOString().split("T")[0],
        Status: "AUTHORISED",
        LineItems: [
          {
            Description: `${input.courseTitle} (training)`,
            Quantity: input.delegateCount || 1,
            UnitAmount: Number((input.total / (input.delegateCount || 1)).toFixed(2)),
            AccountCode: accountCode,
          },
        ],
      },
    ],
  };

  const response = await axios.post(`${XERO_BASE_URL}/Invoices`, payload, { headers });
  const invoice = response.data?.Invoices?.[0];
  return invoice
    ? {
        id: invoice.InvoiceID,
        number: invoice.InvoiceNumber,
        status: invoice.Status,
      }
    : null;
}

export async function createXeroQuote(input: {
  contactId?: string | null;
  contactName: string;
  email?: string;
  courseTitle: string;
  total: number;
  delegateCount: number;
}) {
  const headers = getXeroHeaders();
  if (!headers) return null;

  const accountCode = process.env.XERO_SALES_ACCOUNT_CODE || "200";
  const today = new Date();
  const expiryDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const payload = {
    Quotes: [
      {
        Contact: input.contactId
          ? { ContactID: input.contactId }
          : { Name: input.contactName, EmailAddress: input.email },
        Date: today.toISOString().split("T")[0],
        ExpiryDate: expiryDate.toISOString().split("T")[0],
        Status: "DRAFT",
        LineItems: [
          {
            Description: `${input.courseTitle} (training)`,
            Quantity: input.delegateCount || 1,
            UnitAmount: Number((input.total / (input.delegateCount || 1)).toFixed(2)),
            AccountCode: accountCode,
          },
        ],
      },
    ],
  };

  const response = await axios.post(`${XERO_BASE_URL}/Quotes`, payload, { headers });
  const quote = response.data?.Quotes?.[0];
  return quote
    ? {
        id: quote.QuoteID,
        number: quote.QuoteNumber,
        status: quote.Status,
      }
    : null;
}
