Stripe + Xero field mapping

Core identifiers
- course_id: COURSE_CATALOG.id
- course_title: COURSE_CATALOG.title
- delegate_count: integer
- hub: local | africa | international
- delivery_mode: online | hybrid | in-person | in-house
- currency: ZAR | USD | GBP | EUR

Pricing fields
- base_price: pricing.basePrice
- laptop_price: pricing.laptopPrice
- early_bird_discount: pricing.earlyBirdDiscount
- group_discount: pricing.groupDiscount
- vip_discount: pricing.vipDiscount
- in_house_discount: pricing.inHouseDiscount
- total: pricing.total

Stripe
- payment_intent_id
- receipt_url
- paid_at
- status

Xero Quote
- xero_quote_id
- quote_number
- quote_status
- quote_url
- created_at

Xero Invoice
- xero_invoice_id
- invoice_number
- invoice_status
- invoice_url
- due_date

Customer fields
- full_name
- email
- phone
- country
- company_name (optional)
- vat_number (optional)

CRM log fields
- source_page
- campaign
- created_at
- updated_at
- payment_option
