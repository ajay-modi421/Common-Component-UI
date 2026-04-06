import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Link as LinkIcon,
  Mail,
  Calendar,
  Users,
  FileText,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
} from 'lucide-react';

// ─── Custom Brand Icons ────────────────────────────────────────────────────────
const TwitterIcon = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
  fill="currentColor" width={size}
   height={size} className={className}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.05 9.05 
    0 01-2.88 1.1A4.52 4.52 0 0016 0c-2.5 0-4.5 2.1-4.5 4.68 0 .37.04.73.12
    1.08A12.94 12.94 0 013 1.64a4.57 4.57 
    0 00-.61 2.35c0 1.62.8 3.05 2 3.89a4.48 4.48 0 01-2-.56v.06c0 2.27 
    1.6 4.17 3.75 4.6a4.52 
    4.52 0 01-2 .08 4.51 4.51 0 004.21 3.23A9.05 9.05 0 012 19.54 12.82 
    12.82 0 007 21c8.27 0 
    12.79-7.03 12.79-13.13 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
  </svg>
);

const GithubIcon = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} 
  height={size} className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.583 
    0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.392-1.333-1.762-1.333-1.762-1.09-.745.083-.729.083-.729 
    1.205.086 1.84 1.242 1.84 1.242 1.07 1.84 2.807 1.308 
    3.492.998.108-.775.418-1.308.762-1.608-2.665-.305-5.466-1.336-5.466-5.938 
    0-1.31.467-2.38 1.235-3.22-.124-.304-.535-1.523.117-3.176 0 0 1.008-.32 3.3 1.23a11.41 
    11.41 0 016 0c2.29-1.55 3.296-1.23 3.296-1.23.653 
    1.653.243 2.872.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.63-5.48 5.928.43.37.823 
    1.102.823 2.222 0 1.606-.015 2.903-.015 3.296 
    0 .324.192.7.8.58C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
  fill="currentColor" width={size} height={size} className={className}>
    <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM2.5 
    9h5v12h-5V9zm7 0h4.8v1.71h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 
    3.33 6 7.66V21h-5v-6.17c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.61-2.38 
    3.28V21h-5V9z" />
  </svg>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ src, name, size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl',
  };

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden 
    shrink-0 bg-muted flex items-center justify-center font-semibold
     text-muted-foreground ring-2 ring-border`}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span>{initials}</span>
      }
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-base font-bold text-foreground">{value}</span>
    <span className="text-[0.7rem] text-muted-foreground flex items-center gap-1">
      {Icon && <Icon size={11} />}
      {label}
    </span>
  </div>
);

const SocialLink = ({ icon: Icon, href, label }) => (
  <a
    href={href || '#'}
    aria-label={label}
    className="text-muted-foreground hover:text-foreground transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={16} />
  </a>
);

const ProfileCardDefault = ({
  name = 'Alex Johnson',
  username = 'alexjohnson',
  role = 'Full Stack Developer',
  avatarUrl = null,
  coverUrl = null,
  isVerified = false,
  bio = 'Building products that people love. Open source contributor & coffee enthusiast.',
  location = null,
  website = null,
  joinedDate = null,
  followers = null,
  following = null,
  posts = null,
  badges = [],
  twitter = null,
  github = null,
  linkedin = null,
  email = null,
  onFollow,
  onMessage,
  onMore,
  isFollowing = false,
}) => {
  return (
    <Card className="w-full max-w-[360px] shadow-lg overflow-hidden">
      <div className="relative h-24 bg-muted">
        {coverUrl
          ? <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20" />
        }

        {onMore && (
          <button
            onClick={onMore}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/70 
            backdrop-blur-sm flex items-center justify-center text-foreground 
            hover:bg-background transition-colors"
          >
            <MoreHorizontal size={15} />
          </button>
        )}

        <div className="absolute -bottom-8 left-5">
          <Avatar src={avatarUrl} name={name} size="lg" />
        </div>
      </div>

      <CardContent className="pt-10 px-5 pb-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-foreground leading-tight">{name}</h3>
              {isVerified && (
                <span className="text-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                  strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{username}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            {twitter && <SocialLink icon={TwitterIcon} href={`https://twitter.com/${twitter}`} label="Twitter" />}
            {github && <SocialLink icon={GithubIcon} href={`https://github.com/${github}`} label="GitHub" />}
            {linkedin && <SocialLink icon={LinkedinIcon} href={linkedin} label="LinkedIn" />}
            {email && <SocialLink icon={Mail} href={`mailto:${email}`} label="Email" />}
          </div>
        </div>

        {bio && (
          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        )}

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge, i) => (
              <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {(location || website || joinedDate) && (
          <div className="flex flex-col gap-1.5">
            {location && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={13} /> {location}
              </span>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-primary hover:underline underline-offset-2"
              >
                <LinkIcon size={13} /> {website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {joinedDate && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={13} /> Joined {joinedDate}
              </span>
            )}
          </div>
        )}

        {(followers !== null || following !== null || posts !== null) && (
          <>
            <Separator />
            <div className="flex justify-around">
              {followers !== null && <StatItem icon={Users} label="Followers" value={followers} />}
              {following !== null && <StatItem icon={UserPlus} label="Following" value={following} />}
              {posts !== null && <StatItem icon={FileText} label="Posts" value={posts} />}
            </div>
          </>
        )}

        {(onFollow || onMessage) && (
          <div className="flex gap-2 mt-1">
            {onFollow && (
              <Button
                className="flex-1 gap-2"
                variant={isFollowing ? 'outline' : 'default'}
                onClick={onFollow}
              >
                <UserPlus size={15} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
            {onMessage && (
              <Button className="flex-1 gap-2" variant="outline" onClick={onMessage}>
                <MessageCircle size={15} /> Message
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCardDefault;

