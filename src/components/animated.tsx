import React from 'react';
import { animated } from '@react-spring/web'

const animated = () => {
    return (
        <animated.div
        style={{
          width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
        }}
      />
    );
};

export default animated;