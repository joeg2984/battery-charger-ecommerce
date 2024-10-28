// src/components/ShakeDetector.jsx
import React, { useEffect } from 'react';

const ShakeDetector = () => {
  useEffect(() => {
    let shakeCount = 0;

    const handleShake = () => {
      shakeCount += 1;
      if (shakeCount >= 3) {
        alert('Your charger is now turbo-charged! ⚡⚡⚡');
        shakeCount = 0;
      }
    };

    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      const totalAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );

      if (totalAcceleration > 15) {
        handleShake();
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  return null;
};

export default ShakeDetector;
