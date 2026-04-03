import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <div className={`${sizes[size]} rounded-full overflow-hidden shrink-0 bg-muted flex items-center justify-center font-semibold text-muted-foreground ring-2 ring-border`}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span>{initials}</span>
      }
    </div>
  );
};

const ProfileCardCompact = ({
  name = 'Alex Johnson',
  username = 'alexjohnson',
  role = 'Full Stack Developer',
  avatarUrl = null,
  isVerified = false,
  onFollow,
  isFollowing = false,
}) => {
  return (
    <Card className="w-full max-w-[320px] shadow-md">
      <CardContent className="p-4 flex items-center gap-3">
        <Avatar src={avatarUrl} name={name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            {isVerified && (
              <span className="text-primary shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">@{username}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{role}</p>
        </div>
        {onFollow && (
          <Button
            size="sm"
            variant={isFollowing ? 'outline' : 'default'}
            onClick={onFollow}
            className="shrink-0 h-8 px-3 text-xs"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCardCompact;

