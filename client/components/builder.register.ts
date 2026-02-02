// Register PartnerReferral
import PartnerReferral from './PartnerReferral';
Builder.registerComponent(PartnerReferral, {
  name: 'PartnerReferral',
  inputs: [
    { name: 'title', type: 'string', required: false },
    { name: 'subtitle', type: 'string', required: false },
    { name: 'buttonLabel', type: 'string', required: false },
    { name: 'partnerCodeLabel', type: 'string', required: false },
    { name: 'partnerCodePlaceholder', type: 'string', required: false },
    { name: 'submitLabel', type: 'string', required: false },
    { name: 'successMessage', type: 'string', required: false },
  ],
});
// Register WhatsAppCampaign
import WhatsAppCampaign from './WhatsAppCampaign';
Builder.registerComponent(WhatsAppCampaign, {
  name: 'WhatsAppCampaign',
  inputs: [
    { name: 'title', type: 'string', required: false },
    { name: 'subtitle', type: 'string', required: false },
    { name: 'buttonLabel', type: 'string', required: false },
    { name: 'phoneNumber', type: 'string', required: true },
    { name: 'prefilledMessage', type: 'string', required: false },
    { name: 'successMessage', type: 'string', required: false },
  ],
});
// Register LandingPageTemplate
import LandingPageTemplate from './LandingPageTemplate';
Builder.registerComponent(LandingPageTemplate, {
  name: 'LandingPageTemplate',
  inputs: [
    { name: 'title', type: 'string', required: true },
    { name: 'subtitle', type: 'string' },
    { name: 'ctaLabel', type: 'string', required: true },
    { name: 'ctaHref', type: 'string', required: true },
    { name: 'imageUrl', type: 'string' },
    { name: 'features', type: 'list', subFields: [{ name: 'feature', type: 'string' }] },
  ],
});
// Register DeliveryStandards
import DeliveryStandards from './DeliveryStandards';
Builder.registerComponent(DeliveryStandards, {
  name: 'DeliveryStandards',
  inputs: [
    { name: 'title', type: 'string' },
    { name: 'standards', type: 'list', subFields: [{ name: 'standard', type: 'string' }], required: true },
  ],
});
// Register Certificate
import Certificate from './Certificate';
Builder.registerComponent(Certificate, {
  name: 'Certificate',
  inputs: [
    { name: 'name', type: 'string', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'imageUrl', type: 'string' },
  ],
});
// Register Methodology
import Methodology from './Methodology';
Builder.registerComponent(Methodology, {
  name: 'Methodology',
  inputs: [
    { name: 'title', type: 'string' },
    { name: 'points', type: 'list', subFields: [{ name: 'point', type: 'string' }], required: true },
  ],
});
// Register TrainerProfile
import TrainerProfile from './TrainerProfile';
Builder.registerComponent(TrainerProfile, {
  name: 'TrainerProfile',
  inputs: [
    { name: 'name', type: 'string', required: true },
    { name: 'bio', type: 'string', required: true },
    { name: 'photoUrl', type: 'string' },
    { name: 'specialties', type: 'list', subFields: [{ name: 'specialty', type: 'string' }] },
    { name: 'credentials', type: 'string' },
  ],
});
// Register FAQ
import FAQ from './FAQ';
Builder.registerComponent(FAQ, {
  name: 'FAQ',
  inputs: [
    { name: 'title', type: 'string' },
    {
      name: 'faqs',
      type: 'list',
      subFields: [
        { name: 'question', type: 'string', required: true },
        { name: 'answer', type: 'string', required: true },
      ],
      required: true
    }
  ],
});
// Register Testimonials
import Testimonials from './Testimonials';
Builder.registerComponent(Testimonials, {
  name: 'Testimonials',
  inputs: [
    { name: 'title', type: 'string' },
    {
      name: 'testimonials',
      type: 'list',
      subFields: [
        { name: 'name', type: 'string', required: true },
        { name: 'role', type: 'string' },
        { name: 'quote', type: 'string', required: true },
        { name: 'avatarUrl', type: 'string' },
      ],
      required: true
    }
  ],
});
import { Builder } from '@builder.io/react';
import Header from './Header';
import Footer from './Footer';
import PrimaryCTA from './PrimaryCTA';

// Register Header
Builder.registerComponent(Header, {
  name: 'Header',
  inputs: [],
});

// Register Footer
Builder.registerComponent(Footer, {
  name: 'Footer',
  inputs: [],
});

// Register PrimaryCTA
Builder.registerComponent(PrimaryCTA, {
  name: 'PrimaryCTA',
  inputs: [
    { name: 'label', type: 'string', required: true },
    { name: 'href', type: 'string', required: true },
    { name: 'variant', type: 'string', enum: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'] },
    { name: 'size', type: 'string', enum: ['default', 'sm', 'lg', 'icon'] },
  ],
});

// Register HeroSection
import HeroSection from './HeroSection';
Builder.registerComponent(HeroSection, {
  name: 'HeroSection',
  inputs: [
    { name: 'title', type: 'string', required: true },
    { name: 'subtitle', type: 'string' },
    { name: 'ctaLabel', type: 'string', required: true },
    { name: 'ctaHref', type: 'string', required: true },
  ],
});

// Register CourseCard
import CourseCard from './CourseCard';
Builder.registerComponent(CourseCard, {
  name: 'CourseCard',
  inputs: [
    { name: 'title', type: 'string', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'price', type: 'string', required: true },
    { name: 'date', type: 'string' },
    { name: 'ctaLabel', type: 'string' },
    { name: 'ctaHref', type: 'string' },
  ],
});

// Register PricingBlock
import PricingBlock from './PricingBlock';
Builder.registerComponent(PricingBlock, {
  name: 'PricingBlock',
  inputs: [
    { name: 'price', type: 'string', required: true },
    { name: 'features', type: 'list', subFields: [{ name: 'feature', type: 'string' }], required: true },
    { name: 'ctaLabel', type: 'string', required: true },
    { name: 'ctaHref', type: 'string', required: true },
    { name: 'note', type: 'string' },
  ],
});

// Register ConversionBand
import ConversionBand from './ConversionBand';
Builder.registerComponent(ConversionBand, {
  name: 'ConversionBand',
  inputs: [
    { name: 'title', type: 'string', required: true },
    { name: 'subtitle', type: 'string' },
    { name: 'ctaLabel', type: 'string', required: true },
    { name: 'ctaHref', type: 'string', required: true },
  ],
});

// Register PricingCalculator
import PricingCalculator from './PricingCalculator';
Builder.registerComponent(PricingCalculator, {
  name: 'PricingCalculator',
  inputs: [
    { name: 'courseId', type: 'string', required: true },
    { name: 'showPayAfterInvoice', type: 'boolean' },
    { name: 'isEarlyBird', type: 'boolean' },
    { name: 'isVIP', type: 'boolean' },
    { name: 'isInHouse', type: 'boolean' },
  ],
});

// Register RegistrationForm
import RegistrationForm from './RegistrationForm';
Builder.registerComponent(RegistrationForm, {
  name: 'RegistrationForm',
  inputs: [],
});

// Register QuoteForm
import QuoteForm from './QuoteForm';
Builder.registerComponent(QuoteForm, {
  name: 'QuoteForm',
  inputs: [],
});

// Register PartnershipForm
import PartnershipForm from './PartnershipForm';
Builder.registerComponent(PartnershipForm, {
  name: 'PartnershipForm',
  inputs: [],
});

// Register ContactForm
import ContactForm from './ContactForm';
Builder.registerComponent(ContactForm, {
  name: 'ContactForm',
  inputs: [],
});

// Register SponsorInterestForm
import SponsorInterestForm from './SponsorInterestForm';
Builder.registerComponent(SponsorInterestForm, {
  name: 'SponsorInterestForm',
  inputs: [],
});

// Register BrochureLeadMagnet
import BrochureLeadMagnet from './BrochureLeadMagnet';
Builder.registerComponent(BrochureLeadMagnet, {
  name: 'BrochureLeadMagnet',
  inputs: [
    { name: 'title', type: 'string', required: false },
    { name: 'subtitle', type: 'string', required: false },
    { name: 'brochureUrl', type: 'string', required: true },
    { name: 'submitLabel', type: 'string', required: false },
    { name: 'downloadLabel', type: 'string', required: false },
    { name: 'successMessage', type: 'string', required: false },
  ],
});
