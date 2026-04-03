import React from 'react';
import ProfileCardDefault from './ProfileCardDefault';
import ProfileCardCompact from './ProfileCardCompact';
import ProfileCardHorizontal from './ProfileCardHorizontal';

const ProfileCard = ({ variant = 'default', ...props }) => {
  if (variant === 'compact') return <ProfileCardCompact {...props} />;
  if (variant === 'horizontal') return <ProfileCardHorizontal {...props} />;
  return <ProfileCardDefault {...props} />;
};

export default ProfileCard;