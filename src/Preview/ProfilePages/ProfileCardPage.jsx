import React, { useState } from 'react';
import ProfileCard from '@/Components/Profile/ProfileCard';
import PreviewCodeWrapper from '../PreviewCodeWrapper';
import profileCardDefaultCode from '@/Components/Profile/ProfileCardDefault.jsx?raw';
import profileCardCompactCode from '@/Components/Profile/ProfileCardCompact.jsx?raw';
import profileCardHorizontalCode from '@/Components/Profile/ProfileCardHorizontal.jsx?raw';

// ─── Preview section wrapper ──────────────────────────────────────────────────
const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      {label}
    </p>
    <div className="flex flex-wrap gap-6">
      {children}
    </div>
  </div>
);

// ─── Shared demo data ─────────────────────────────────────────────────────────
const demoUser = {
  name: 'Alex Johnson',
  username: 'alexjohnson',
  role: 'Full Stack Developer',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&mouth=smile&eyes=default&eyebrows=default&backgroundColor=b6e3f4',
  coverUrl: null,
  bio: 'Building products that people love. Open source contributor & coffee enthusiast.',
  location: 'San Francisco, CA',
  website: 'https://alexjohnson.dev',
  joinedDate: 'March 2021',
  followers: '12.4k',
  following: '342',
  posts: '186',
  badges: ['React', 'TypeScript', 'Node.js'],
  twitter: 'alexjohnson',
  github: 'alexjohnson',
  linkedin: 'https://linkedin.com/in/alexjohnson',
  email: 'alex@example.com',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProfileCardPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Profile Card</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Versatile profile card in three variants — default, compact, and horizontal — with stats, badges, social links, and action buttons.
      </p>

      <Section label="Default variant">
        <PreviewCodeWrapper
          title="Default"
          description="Same default component — full example, minimal props, and cover image."
          code={profileCardDefaultCode}
        >
          <div className="flex flex-col gap-10 w-full">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Default — full
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Full profile card with cover, socials, badges, meta, stats, and actions.
              </p>
              <ProfileCard
                {...demoUser}
                isVerified={true}
                isFollowing={isFollowing}
                onFollow={() => setIsFollowing(p => !p)}
                onMessage={() => alert('Message')}
                onMore={() => alert('More options')}
              />
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Default — minimal (no stats, no socials)
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Same default variant, fewer props (no stats/socials).
              </p>
              <ProfileCard
                name="Sara Chen"
                username="sarachen"
                role="UI/UX Designer"
                avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&mouth=smile&eyes=happy&eyebrows=raisedExcitedNatural&backgroundColor=ffd5dc"
                bio="Designing intuitive experiences. Currently at Figma."
                location="New York, NY"
                badges={['Figma', 'Prototyping', 'Design Systems']}
                onFollow={() => {}}
                onMessage={() => {}}
              />
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Default — with cover image
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Default variant using a cover image.
              </p>
              <ProfileCard
                {...demoUser}
                name="Marcus Webb"
                username="marcuswebb"
                avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&mouth=serious&eyes=default&eyebrows=defaultNatural&backgroundColor=c0aede"
                coverUrl="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80"
                isVerified={true}
                onFollow={() => {}}
                onMessage={() => {}}
              />
            </div>
          </div>
        </PreviewCodeWrapper>
      </Section>

      <Section label="Compact Variant">
        <PreviewCodeWrapper
          title="Compact"
          description="Compact summary layout."
          code={profileCardCompactCode}
        >
          <>
            <ProfileCard
              {...demoUser}
              variant="compact"
              isFollowing={isFollowing}
              onFollow={() => setIsFollowing(p => !p)}
            />
            <ProfileCard
              name="Sara Chen"
              username="sarachen"
              role="UI/UX Designer"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&mouth=smile&eyes=happy&eyebrows=raisedExcitedNatural&backgroundColor=ffd5dc"
              variant="compact"
              isVerified={true}
              onFollow={() => {}}
            />
            <ProfileCard
              name="Marcus Webb"
              username="marcuswebb"
              role="Product Manager"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&mouth=serious&eyes=default&eyebrows=defaultNatural&backgroundColor=c0aede"
              variant="compact"
              isFollowing={true}
              onFollow={() => {}}
            />
          </>
        </PreviewCodeWrapper>
      </Section>

      <Section label="Horizontal Variant">
        <PreviewCodeWrapper
          title="Horizontal"
          description="Wide layout with optional bio and meta."
          code={profileCardHorizontalCode}
        >
          <>
            <ProfileCard
              {...demoUser}
              variant="horizontal"
              isVerified={true}
              isFollowing={isFollowing}
              onFollow={() => setIsFollowing(p => !p)}
              onMessage={() => alert('Message')}
            />
            <ProfileCard
              name="Sara Chen"
              username="sarachen"
              role="UI/UX Designer"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&mouth=smile&eyes=happy&eyebrows=raisedExcitedNatural&backgroundColor=ffd5dc"
              bio="Designing intuitive experiences. Currently crafting design systems at Figma."
              location="New York, NY"
              website="https://sarachen.design"
              followers="8.2k"
              following="210"
              variant="horizontal"
              onFollow={() => {}}
              onMessage={() => {}}
            />
          </>
        </PreviewCodeWrapper>
      </Section>

      <Section label="No Actions (view only)">
        <PreviewCodeWrapper
          title="Default (View only)"
          description="Default variant without actions."
          code={profileCardDefaultCode}
        >
          <ProfileCard
            {...demoUser}
            name="Jamie Rivera"
            username="jamierivera"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&mouth=smile&eyes=default&eyebrows=defaultNatural&backgroundColor=d1f7c4"
            isVerified={false}
          />
        </PreviewCodeWrapper>
      </Section>

    </div>
  );
};

export default ProfileCardPage;