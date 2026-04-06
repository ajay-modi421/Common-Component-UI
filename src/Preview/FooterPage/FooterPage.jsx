import React from 'react';
import { Link2, Mail, MessageCircle, Rss, Send, Share2, Video } from 'lucide-react';
import Footer from '@/Components/Footer/Footer';
import SidebarPreviewSection from '../SidebarPage/SidebarPreviewSection';
import footerMarketplaceCode from '@/Components/Footer/FooterMarketplace.jsx?raw';
import footerCorporateCode from '@/Components/Footer/FooterCorporate.jsx?raw';
import footerEditorialCode from '@/Components/Footer/FooterEditorial.jsx?raw';

// Same logo + name as Login / Signup “With Logo & Custom Title” (LoginFormPage, SignupFormPage).
const AUTH_BRAND = {
  name: 'Acme Corp',
  logo: (
    <img
      src="https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=111827&fontSize=40"
      alt="Acme Corp"
      className="h-12 w-12 object-contain"
    />
  ),
};

const MARKETPLACE_COLUMNS = [
  {
    title: 'Get to Know Us',
    links: [
      { label: 'About Acme', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Releases', href: '#' },
      { label: 'Acme Labs', href: '#' },
    ],
  },
  {
    title: 'Connect with Us',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
  {
    title: 'Partner With Us',
    links: [
      { label: 'Sell on Acme', href: '#' },
      { label: 'Accelerator Program', href: '#' },
      { label: 'Protect and Build Your Brand', href: '#' },
      { label: 'Global Selling', href: '#' },
      { label: 'Become a Supplier', href: '#' },
      { label: 'Become an Affiliate', href: '#' },
      { label: 'Fulfillment Services', href: '#' },
      { label: 'Advertise Your Products', href: '#' },
      { label: 'Payments for Merchants', href: '#' },
    ],
  },
  {
    title: 'Let Us Help You',
    links: [
      { label: 'Your Account', href: '#' },
      { label: 'Returns Centre', href: '#' },
      { label: 'Recalls and Product Safety Alerts', href: '#' },
      { label: '100% Purchase Protection', href: '#' },
      { label: 'Download the App', href: '#' },
      { label: 'Help', href: '#' },
    ],
  },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
];

const REGION_OPTIONS = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
];

// ─── Corporate ────────────────────────────────────────────────────────────────
const CORPORATE_COLUMNS = [
  {
    title: 'Where To Buy',
    links: [{ label: 'See Authorized Retailers', href: '#' }],
  },
  {
    title: 'Rewards',
    links: [
      { label: 'Join Now', href: '#' },
      { label: 'Learn More', href: '#' },
      { label: 'Manage Account', href: '#' },
    ],
  },
  {
    title: 'News & Info',
    links: [
      { label: 'Press Releases', href: '#' },
      { label: 'About Us', href: '#' },
      { label: 'Product Support', href: '#' },
      { label: 'Product Manuals', href: '#' },
      { label: 'Product Registration', href: '#' },
      { label: 'Newsletter sign up', href: '#' },
      { label: 'Accessibility and Usability', href: '#' },
    ],
  },
  {
    title: 'Other Sites',
    links: [
      { label: 'PlayStation', href: '#' },
      { label: 'Pictures', href: '#' },
      { label: 'Music', href: '#' },
      { label: 'Mobile', href: '#' },
      { label: 'Crackle', href: '#' },
      { label: 'Flagship Store', href: '#' },
    ],
  },
];

const CORPORATE_SOCIALS = [
  { label: 'Social', href: '#', icon: <Share2 size={14} /> },
  { label: 'Feed', href: '#', icon: <Rss size={14} /> },
  { label: 'Messages', href: '#', icon: <MessageCircle size={14} /> },
  { label: 'Video', href: '#', icon: <Video size={14} /> },
];

const CORPORATE_MID_LINKS = [
  { label: 'For Professionals', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Company Info', href: '#' },
  { label: 'Voluntary Recall', href: '#' },
];

const CORPORATE_REGION_OPTIONS = [{ value: 'us', label: 'United States' }];

const CORPORATE_LEGAL = [
  { label: 'Terms and Conditions', href: '#' },
  { label: 'Privacy Policy / Your California Privacy Rights', href: '#' },
];

// ─── Editorial ────────────────────────────────────────────────────────────────
const COACHING_CONTACT = [
  '2017 Harron Drive',
  'Baltimore',
  'Maryland',
  '21201',
  '443-498-7166',
  '443-934-9384',
];

const COACHING_MENU = [
  { label: 'Home', href: '#' },
  { label: 'Books', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Courses', href: '#' },
  { label: 'Our blog', href: '#' },
  { label: 'Pricing', href: '#' },
];

const COACHING_POSTS = [
  { label: 'Breaking Down Barriers', href: '#' },
  { label: 'A Celebration of Success', href: '#' },
  { label: 'A World of Opportunities', href: '#' },
];

const COACHING_SOCIALS = [
  { label: 'Share', href: '#', icon: <Share2 size={14} /> },
  { label: 'Link', href: '#', icon: <Link2 size={14} /> },
  { label: 'Video', href: '#', icon: <Video size={14} /> },
  { label: 'Mail', href: '#', icon: <Mail size={14} /> },
  { label: 'Subscribe', href: '#', icon: <Send size={14} /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const FooterPage = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <h1 className="text-xl font-bold mb-1">Footer</h1>
    <p className="text-sm text-muted-foreground mb-8">
      Three reference layouts built with shadcn UI (Button, Separator, Select, Input, Label). All
      content is prop-driven and colors follow the active theme tokens.
    </p>

    <SidebarPreviewSection label="Marketplace — Multi-column + back to top + localization" code={footerMarketplaceCode}>
      <div className="bg-muted/30">
        <div className="flex-1 p-6 text-sm text-muted-foreground">
          Scroll this frame and use “Back to top” to jump here.
        </div>
        <Footer
          variant="columns"
          brand={AUTH_BRAND}
          columns={MARKETPLACE_COLUMNS}
          languageOptions={LANGUAGE_OPTIONS}
          regionOptions={REGION_OPTIONS}
          defaultLanguage="en"
          defaultRegion="in"
          backToTopLabel="Back to top"
        />
      </div>
    </SidebarPreviewSection>

    <SidebarPreviewSection label="Corporate — Grid + region + links + social row" code={footerCorporateCode}>
      <div className="bg-muted/30">
        <div className="flex-1 p-6 text-sm text-muted-foreground">
          Placeholder page content.
        </div>
        <Footer
          variant="simple"
          columns={CORPORATE_COLUMNS}
          socials={CORPORATE_SOCIALS}
          midRowLinks={CORPORATE_MID_LINKS}
          regionOptions={CORPORATE_REGION_OPTIONS}
          defaultRegion="us"
          copyright={`© ${new Date().getFullYear()} Example Corp. All rights reserved.`}
          legalLinks={CORPORATE_LEGAL}
        />
      </div>
    </SidebarPreviewSection>

    <SidebarPreviewSection label="Editorial — Contact, menu, posts + newsletter" code={footerEditorialCode}>
      <div className="bg-muted/30">
        <div className="flex-1 p-6 text-sm text-muted-foreground">
          Placeholder page content.
        </div>
        <Footer
          variant="minimal"
          contactLines={COACHING_CONTACT}
          menuLinks={COACHING_MENU}
          recentPosts={COACHING_POSTS}
          newsletter={{ placeholder: 'Your email address', buttonLabel: 'Sign up' }}
          socials={COACHING_SOCIALS}
        brandTitle="Editorial"
        copyright={`© ${new Date().getFullYear()} Editorial. All rights reserved.`}
          credit={
            <p className="mt-2 text-xs text-muted-foreground">
              Built using{' '}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                WordPress
              </a>{' '}
              and{' '}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Mesmerize Theme
              </a>
            </p>
          }
        />
      </div>
    </SidebarPreviewSection>
  </div>
);

export default FooterPage;
