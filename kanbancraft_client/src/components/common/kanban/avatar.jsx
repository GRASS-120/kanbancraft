import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import './avatar.css';

const AvatarComponent = ({src, size}) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className="AvatarRoot" style={{ width: size, height: size }}>
      <Avatar.Image
        className="AvatarImage"
        src={src}
        alt="Colm Tuite"
        style={{ width: size, height: size }}
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        CT
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default AvatarComponent;


