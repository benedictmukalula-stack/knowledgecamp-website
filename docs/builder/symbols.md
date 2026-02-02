Builder Symbols to create

1) Header (dropdown navigation)
- Component: Header
- Source: client/components/Header.tsx
- Purpose: Enterprise navigation with dropdowns + WhatsApp + Register Now

2) Courses mega menu
- Component: Header (Courses dropdown)
- Notes: Categories are encoded in menu JSON, can be edited in Builder content if desired

3) Pricing Overview page
- Page: /pricing
- Source: client/pages/PricingPage.tsx
- Sections: pricing, delegates, early-bird, group, laptop, vip, hub, delivery, custom-quote

4) Checkout block
- Page: /checkout
- Source: client/pages/CheckoutPage.tsx
- Options: Pay Now (Stripe), Request Invoice (Xero), Request Quote (Xero)

5) Quote block
- Component: QuoteForm
- Source: client/components/QuoteForm.tsx
- Builder component name: QuoteForm

6) Footer
- Component: Footer
- Source: client/components/Footer.tsx
- Includes CTA band

Execution order
- Replace header in Builder with Header symbol
- Publish pricing overview page (/pricing)
- Publish checkout page (/checkout)
- Add QuoteForm where required
- Replace footer with Footer symbol
