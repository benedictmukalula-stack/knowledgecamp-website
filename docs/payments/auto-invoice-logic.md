Auto-invoice + quote logic

1) Pay Now (Stripe)
- Create Stripe PaymentIntent
- On success: create paid Xero invoice
- Email receipt + confirmation
- Log in CRM

2) Request Invoice (Xero)
- Create Xero draft invoice
- Email invoice with due date
- Log in CRM

3) Request Quote (Xero)
- Create Xero quote
- Email quote for approval
- On approval: convert to invoice
- Log in CRM

Shared rules
- Pricing totals always from pricing engine
- VAT applied via Xero tax codes
- All emails include course, dates, totals, and payment link
