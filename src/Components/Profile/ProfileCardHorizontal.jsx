import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Link as LinkIcon, UserPlus, MessageCircle } from 'lucide-react';

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
    <div className={`${sizes[size]} rounded-full overflow-hidden shrink-0 
    bg-muted flex items-center justify-center font-semibold text-muted-foreground 
    ring-2 ring-border`}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span>{initials}</span>
      }
    </div>
  );
};

const ProfileCardHorizontal = ({
  name = 'Alex Johnson',
  username = 'alexjohnson',
  role = 'Full Stack Developer',
  avatarUrl = null,
  isVerified = false,
  bio = null,
  location = null,
  website = null,
  followers = null,
  following = null,
  onFollow,
  onMessage,
  isFollowing = false,
}) => {
  return (
    <Card className="w-full max-w-[560px] shadow-md">
      <CardContent className="p-5 flex gap-5">
        <Avatar src={avatarUrl} name={name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-foreground">{name}</h3>
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
              <p className="text-sm text-muted-foreground">@{username} · {role}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onFollow && (
                <Button size="sm" variant={isFollowing ? 'outline' : 'default'} 
                onClick={onFollow} className="h-8 px-3 text-xs gap-1.5">
                  <UserPlus size={13} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
              {onMessage && (
                <Button size="sm" variant="outline" onClick={onMessage} 
                className="h-8 px-3 text-xs gap-1.5">
                  <MessageCircle size={13} /> Message
                </Button>
              )}
            </div>
          </div>
          {bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{bio}</p>}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {location && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} /> {location}
              </span>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" 
              className="flex items-center gap-1 text-xs text-primary hover:underline">
                <LinkIcon size={12} /> {website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {(followers !== null || following !== null) && (
              <span className="flex items-center gap-3 text-xs text-muted-foreground">
                {followers !== null && <span><strong className="text-foreground">{followers}</strong> Followers</span>}
                {following !== null && <span><strong className="text-foreground">{following}</strong> Following</span>}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCardHorizontal;

