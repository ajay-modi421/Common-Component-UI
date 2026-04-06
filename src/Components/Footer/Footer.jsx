import React from 'react';
import FooterMarketplace from './FooterMarketplace';
import FooterCorporate from './FooterCorporate';
import FooterEditorial from './FooterEditorial';

/**
 * Footer variants (prop-driven):
 * - `columns` — marketplace layout (back to top, link grid, logo + language/region Selects)
 * - `simple` — corporate grid + region Select + mid links + social Buttons
 * - `minimal` — contact / menu / posts / newsletter (Input + Button) + socials
 *
 * Uses shadcn UI via subcomponents (Button, Separator, Select, Input, Label).
 */
const Footer = ({
  variant = 'columns',
  columns = [],
  brand = {},
  socials = [],
  bottomLinks = [],
  midRowLinks,
  copyright = '',
  backToTopLabel,
  languageOptions,
  regionOptions,
  defaultLanguage,
  defaultRegion,
  legalLinks,
  contactLines,
  menuLinks,
  recentPosts,
  newsletter,
  brandTitle,
  credit,
  onNewsletterSubmit,
}) => {
  if (variant === 'minimal') {
    return (
      <FooterEditorial
        contactLines={contactLines}
        menuLinks={menuLinks}
        recentPosts={recentPosts}
        newsletter={newsletter}
        socials={socials}
        brandTitle={brandTitle ?? brand?.name}
        copyright={copyright}
        credit={credit}
        onNewsletterSubmit={onNewsletterSubmit}
      />
    );
  }

  if (variant === 'simple') {
    return (
      <FooterCorporate
        columns={columns}
        socials={socials}
        midRowLinks={midRowLinks?.length ? midRowLinks : bottomLinks}
        regionOptions={regionOptions}
        defaultRegion={defaultRegion}
        copyright={copyright}
        legalLinks={legalLinks ?? []}
      />
    );
  }

  return (
    <FooterMarketplace
      columns={columns}
      brand={brand}
      backToTopLabel={backToTopLabel}
      languageOptions={languageOptions}
      regionOptions={regionOptions}
      defaultLanguage={defaultLanguage}
      defaultRegion={defaultRegion}
    />
  );
};

export default Footer;
