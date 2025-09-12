// animations.js
import { useEffect } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

/* ===============================
   1 → 50 : BASE ANIMATIONS
   =============================== */

// 1. Fade In
export const fadeIn = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 2. Fade Out
export const fadeOut = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(20, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 3. Slide Up
export const slideUp = () => {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 4. Slide Down
export const slideDown = () => {
  const translateY = useSharedValue(-30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 5. Scale In
export const scaleIn = () => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 6. Scale Out
export const scaleOut = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.9, { duration: 400, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 7. Fade In Up
export const fadeInUp = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 8. Fade In Down
export const fadeInDown = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 9. Fade In Left
export const fadeInLeft = () => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

// 10. Fade In Right
export const fadeInRight = () => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

/* ===============================
   11 → 50 : BASE ANIMATIONS SUITE
   =============================== */

// 11. Slide In Left
export const slideInLeft = () => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 12. Slide In Right
export const slideInRight = () => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 13. Slide Out Left
export const slideOutLeft = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(-50, { duration: 700, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 14. Slide Out Right
export const slideOutRight = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(50, { duration: 700, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 15. Scale In Up
export const scaleInUp = () => {
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 16. Scale In Down
export const scaleInDown = () => {
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(-30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 17. Scale Out Up
export const scaleOutUp = () => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.8, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(-30, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 18. Scale Out Down
export const scaleOutDown = () => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.8, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(30, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 19. Fade In Left Big
export const fadeInLeftBig = () => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-100);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

// 20. Fade In Right Big
export const fadeInRightBig = () => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(100);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

// 21. Fade Out Left
export const fadeOutLeft = () => {
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(-50, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

// 22. Fade Out Right
export const fadeOutRight = () => {
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    translateX.value = withTiming(50, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
};

// 23. Fade Out Up
export const fadeOutUp = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(-40, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 24. Fade Out Down
export const fadeOutDown = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(40, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
};

// 25. Bounce
export const bounce = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.3, { duration: 300 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 26. Pulse
export const pulse = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 27. Spin
export const spin = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 28. Spin Slow
export const spinSlow = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 29. Scale Bounce
export const scaleBounce = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, { duration: 500 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 30. Wobble
export const wobble = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(10, { duration: 200 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};


/* ===============================
   31 → 50 : Animations avancées
   =============================== */

// 31. Jello
export const jello = () => {
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    scaleX.value = withRepeat(
      withTiming(1.25, { duration: 100, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    scaleY.value = withRepeat(
      withTiming(0.75, { duration: 100, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }));
};

// 32. Flash
export const flash = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: 500 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 33. Heartbeat
export const heartbeat = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.3, { duration: 400 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 34. Rubber Band
export const rubberBand = () => {
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    scaleX.value = withRepeat(
      withTiming(1.25, { duration: 300 }),
      -1,
      true
    );
    scaleY.value = withRepeat(
      withTiming(0.75, { duration: 300 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }));
};

// 35. Shake Horizontal
export const shakeHorizontal = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(10, { duration: 100 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 36. Shake Vertical
export const shakeVertical = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(10, { duration: 100 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 37. Swing
export const swing = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(15, { duration: 300 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 38. Tada
export const tada = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 200 }),
      -1,
      true
    );
    rotate.value = withRepeat(
      withTiming(3, { duration: 200 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));
};

// 39. Wobble Scale
export const wobbleScale = () => {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(5, { duration: 200 }),
      -1,
      true
    );
    scale.value = withRepeat(
      withTiming(1.05, { duration: 200 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));
};

// 40. Roll In
export const rollIn = () => {
  const translateX = useSharedValue(-100);
  const rotate = useSharedValue(-120);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 800 });
    rotate.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 41. Roll Out
export const rollOut = () => {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(100, { duration: 800 });
    rotate.value = withTiming(120, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 42. Light Speed In
export const lightSpeedIn = () => {
  const translateX = useSharedValue(300);
  const skewX = useSharedValue(45);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 700 });
    skewX.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { skewX: `${skewX.value}deg` }],
    opacity: opacity.value,
  }));
});

// 43. Light Speed Out
export const lightSpeedOut = () => {
  const translateX = useSharedValue(0);
  const skewX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(300, { duration: 700 });
    skewX.value = withTiming(45, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { skewX: `${skewX.value}deg` }],
    opacity: opacity.value,
  }));
});

// 44. Flip In X
export const flipInX = () => {
  const rotateX = useSharedValue(90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
});

// 45. Flip Out X
export const flipOutX = () => {
  const rotateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateX.value = withTiming(90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
});

// 46. Flip In Y
export const flipInY = () => {
  const rotateY = useSharedValue(90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
});

// 47. Flip Out Y
export const flipOutY = () => {
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
});

// 48. Slide Flip In
export const slideFlipIn = () => {
  const rotateY = useSharedValue(90);
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 800 });
    translateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }, { translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 49. Slide Flip Out
export const slideFlipOut = () => {
  const rotateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(90, { duration: 800 });
    translateX.value = withTiming(50, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }, { translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 50. Spin Fade In
export const spinFadeIn = () => {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(360, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));
};

/* ===============================
   51 → 70 : Animations avancées supplémentaires
   =============================== */

// 51. Spin Fade Out
export const spinFadeOut = () => {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotate.value = withTiming(360, { duration: 1000 });
    scale.value = withTiming(0.3, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 52. Bounce In
export const bounceIn = () => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 53. Bounce Out
export const bounceOut = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0, { duration: 600, easing: Easing.bounce });
    opacity.value = withTiming(0, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 54. Zoom In
export const zoomIn = () => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 55. Zoom Out
export const zoomOut = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.5, { duration: 600, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 56. Zoom In Up
export const zoomInUp = () => {
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600 });
    translateY.value = withTiming(0, { duration: 600 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 57. Zoom Out Down
export const zoomOutDown = () => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.5, { duration: 600 });
    translateY.value = withTiming(30, { duration: 600 });
    opacity.value = withTiming(0, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 58. Rotate In
export const rotateIn = () => {
  const rotate = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 59. Rotate Out
export const rotateOut = () => {
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotate.value = withTiming(200, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 60. Flip In
export const flipIn = () => {
  const rotateY = useSharedValue(180);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 61. Flip Out
export const flipOut = () => {
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(180, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 62. Fade In Left Small
export const fadeInLeftSmall = () => {
  const translateX = useSharedValue(-20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 63. Fade In Right Small
export const fadeInRightSmall = () => {
  const translateX = useSharedValue(20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 64. Fade Out Left Small
export const fadeOutLeftSmall = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(-20, { duration: 500 });
    opacity.value = withTiming(0, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 65. Fade Out Right Small
export const fadeOutRightSmall = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(20, { duration: 500 });
    opacity.value = withTiming(0, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 66. Slide Up Big
export const slideUpBig = () => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 67. Slide Down Big
export const slideDownBig = () => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 68. Slide In Up
export const slideInUp = () => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 69. Slide In Down
export const slideInDown = () => {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 70. Slide Out Up
export const slideOutUp = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-50, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

/* ===============================
   71 → 85 : Animations supplémentaires
   =============================== */

// 71. Slide Out Down
export const slideOutDown = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(50, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 72. Flip In Top
export const flipInTop = () => {
  const rotateX = useSharedValue(90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 73. Flip Out Top
export const flipOutTop = () => {
  const rotateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateX.value = withTiming(90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 74. Flip In Bottom
export const flipInBottom = () => {
  const rotateX = useSharedValue(-90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 75. Flip Out Bottom
export const flipOutBottom = () => {
  const rotateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateX.value = withTiming(-90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 76. Bounce In Down
export const bounceInDown = () => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 77. Bounce In Up
export const bounceInUp = () => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 78. Bounce Out Down
export const bounceOutDown = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(100, { duration: 700, easing: Easing.bounce });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 79. Bounce Out Up
export const bounceOutUp = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-100, { duration: 700, easing: Easing.bounce });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 80. Flip In Left
export const flipInLeft = () => {
  const rotateY = useSharedValue(-90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 81. Flip Out Left
export const flipOutLeft = () => {
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(-90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 82. Flip In Right
export const flipInRight = () => {
  const rotateY = useSharedValue(90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 83. Flip Out Right
export const flipOutRight = () => {
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(90, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 84. Swing Slow
export const swingSlow = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(10, { duration: 500 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 85. Shake Slow
export const shakeSlow = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(10, { duration: 300 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

/* ===============================
   86 → 100 : Animations supplémentaires
   =============================== */

// 86. Pulse Slow
export const pulseSlow = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 87. Rotate Slow
export const rotateSlow = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 88. Bounce Small
export const bounceSmall = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 89. Bounce Medium
export const bounceMedium = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 90. Bounce Large
export const bounceLarge = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 91. Wiggle
export const wiggle = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 92. Swing Medium
export const swingMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 300 }),
        withTiming(-15, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 93. Swing Large
export const swingLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 400 }),
        withTiming(-25, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 94. Flash Fast
export const flashFast = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 95. Flash Medium
export const flashMedium = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 96. Flash Slow
export const flashSlow = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 97. Shake Horizontal Small
export const shakeHorizontalSmall = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 98. Shake Horizontal Medium
export const shakeHorizontalMedium = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 150 }),
        withTiming(-10, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 99. Shake Horizontal Large
export const shakeHorizontalLarge = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 200 }),
        withTiming(-20, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 100. Wiggle Slow
export const wiggleSlow = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 200 }),
        withTiming(-3, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};


/* ===============================
   101 → 125 : Animations avancées supplémentaires
   =============================== */

// 101. Fade In Slow
export const fadeInSlow = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 102. Fade Out Slow
export const fadeOutSlow = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

// 103. Fade In Left
export const fadeInLeft = () => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 104. Fade In Right
export const fadeInRight = () => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 700 });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 105. Fade Out Left
export const fadeOutLeft = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(-50, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 106. Fade Out Right
export const fadeOutRight = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(50, { duration: 700 });
    opacity.value = withTiming(0, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 107. Slide In Left
export const slideInLeft = () => {
  const translateX = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 108. Slide In Right
export const slideInRight = () => {
  const translateX = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 109. Slide Out Left
export const slideOutLeft = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(-100, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 110. Slide Out Right
export const slideOutRight = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(100, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 111. Zoom In Fast
export const zoomInFast = () => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 112. Zoom Out Fast
export const zoomOutFast = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.3, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 113. Flip In Slow
export const flipInSlow = () => {
  const rotateY = useSharedValue(180);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 114. Flip Out Slow
export const flipOutSlow = () => {
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withTiming(180, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    opacity: opacity.value,
  }));
};

// 115. Spin Fast
export const spinFast = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 800 }),
      -1,
      false
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 116. Spin Backwards
export const spinBackwards = () => {
  const rotate = useSharedValue(360);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(0, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 117. Bounce Vertical Small
export const bounceVerticalSmall = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 118. Bounce Vertical Medium
export const bounceVerticalMedium = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 119. Bounce Vertical Large
export const bounceVerticalLarge = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 120. Swing Horizontal Small
export const swingHorizontalSmall = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 121. Swing Horizontal Medium
export const swingHorizontalMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 122. Swing Horizontal Large
export const swingHorizontalLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 300 }),
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 123. Wiggle Small
export const wiggleSmall = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 150 }),
        withTiming(-3, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 124. Wiggle Medium
export const wiggleMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(6, { duration: 200 }),
        withTiming(-6, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 125. Wiggle Large
export const wiggleLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 300 }),
        withTiming(-12, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

/* ===============================
   126 → 150 : Animations avancées supplémentaires
   =============================== */

// 126. Fade In Up Slow
export const fadeInUpSlow = () => {
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 127. Fade In Down Slow
export const fadeInDownSlow = () => {
  const translateY = useSharedValue(-40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 128. Fade Out Up Slow
export const fadeOutUpSlow = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-40, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 129. Fade Out Down Slow
export const fadeOutDownSlow = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(40, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 130. Zoom In Up Slow
export const zoomInUpSlow = () => {
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 131. Zoom Out Down Slow
export const zoomOutDownSlow = () => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.5, { duration: 1000 });
    translateY.value = withTiming(40, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 132. Rotate In Slow
export const rotateInSlow = () => {
  const rotate = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 133. Rotate Out Slow
export const rotateOutSlow = () => {
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotate.value = withTiming(200, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
};

// 134. Flip In Top Slow
export const flipInTopSlow = () => {
  const rotateX = useSharedValue(90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 135. Flip Out Top Slow
export const flipOutTopSlow = () => {
  const rotateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateX.value = withTiming(90, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 136. Flip In Bottom Slow
export const flipInBottomSlow = () => {
  const rotateX = useSharedValue(-90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 137. Flip Out Bottom Slow
export const flipOutBottomSlow = () => {
  const rotateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotateX.value = withTiming(-90, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
    opacity: opacity.value,
  }));
};

// 138. Bounce In Up Slow
export const bounceInUpSlow = () => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 139. Bounce Out Down Slow
export const bounceOutDownSlow = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(100, { duration: 1000, easing: Easing.bounce });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 140. Bounce In Down Slow
export const bounceInDownSlow = () => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 141. Bounce Out Up Slow
export const bounceOutUpSlow = () => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-100, { duration: 1000, easing: Easing.bounce });
    opacity.value = withTiming(0, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 142. Shake Slow Horizontal
export const shakeSlowHorizontal = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 300 }),
        withTiming(-10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 143. Shake Slow Vertical
export const shakeSlowVertical = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 300 }),
        withTiming(-10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 144. Pulse Vertical Slow
export const pulseVerticalSlow = () => {
  const scaleY = useSharedValue(1);

  useEffect(() => {
    scaleY.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY.value }],
  }));
};

// 145. Pulse Horizontal Slow
export const pulseHorizontalSlow = () => {
  const scaleX = useSharedValue(1);

  useEffect(() => {
    scaleX.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
  }));
};

// 146. Flip Horizontal Slow
export const flipHorizontalSlow = () => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));
};

// 147. Flip Vertical Slow
export const flipVerticalSlow = () => {
  const rotateX = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
  }));
};

/* ===============================
   148 → 160 : Animations avancées supplémentaires
   =============================== */

// 148. Spin Half
export const spinHalf = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 800 }),
        withTiming(0, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 149. Spin Quarter
export const spinQuarter = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(90, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 150. Rotate Y Slow
export const rotateYSlow = () => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));
};

// 151. Rotate X Slow
export const rotateXSlow = () => {
  const rotateX = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
  }));
};

// 152. Fade In Big
export const fadeInBig = () => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
};

// 153. Fade Out Big
export const fadeOutBig = () => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 1000 });
    scale.value = withTiming(0.5, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
};

// 154. Slide Up Fast
export const slideUpFast = () => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 155. Slide Down Fast
export const slideDownFast = () => {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

// 156. Slide Left Fast
export const slideLeftFast = () => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 157. Slide Right Fast
export const slideRightFast = () => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 158. Scale Up Fast
export const scaleUpFast = () => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 159. Scale Down Fast
export const scaleDownFast = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.8, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 160. Swing Back and Forth
export const swingBackAndForth = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 400 }),
        withTiming(-15, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

/* ===============================
   161 → 180 : Animations avancées supplémentaires
   =============================== */

// 161. Pulse Quick
export const pulseQuick = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 162. Pulse Medium
export const pulseMedium = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

// 163. Bounce Quick
export const bounceQuick = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 164. Bounce Medium
export const bounceMedium = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 165. Bounce Large
export const bounceLarge = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 166. Shake Quick Horizontal
export const shakeQuickHorizontal = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 167. Shake Medium Horizontal
export const shakeMediumHorizontal = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 168. Shake Large Horizontal
export const shakeLargeHorizontal = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 300 }),
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 169. Shake Quick Vertical
export const shakeQuickVertical = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 170. Shake Medium Vertical
export const shakeMediumVertical = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 171. Shake Large Vertical
export const shakeLargeVertical = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 300 }),
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

// 172. Swing Small
export const swingSmall = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 150 }),
        withTiming(-5, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 173. Swing Medium
export const swingMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 174. Swing Large
export const swingLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 300 }),
        withTiming(-20, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
});

// 175. Wiggle Small
export const wiggleSmall = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 150 }),
        withTiming(-3, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 176. Wiggle Medium
export const wiggleMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(6, { duration: 200 }),
        withTiming(-6, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 177. Wiggle Large
export const wiggleLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 300 }),
        withTiming(-12, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 178. Flip Horizontal Quick
export const flipHorizontalQuick = () => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(180, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));
};

// 179. Flip Vertical Quick
export const flipVerticalQuick = () => {
  const rotateX = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(180, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
  }));
};

// 180. Rotate Clockwise Quick
export const rotateClockwiseQuick = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(360, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

/* ===============================
   181 → 200 : Dernières animations pour compléter le pack
   =============================== */

// 181. Rotate Counter Clockwise Quick
export const rotateCounterClockwiseQuick = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(-360, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 182. Zoom In Quick
export const zoomInQuick = () => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 183. Zoom Out Quick
export const zoomOutQuick = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(0.5, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};

// 184. Flip Horizontal Medium
export const flipHorizontalMedium = () => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    rotateY.value = withTiming(180, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));
};

// 185. Flip Vertical Medium
export const flipVerticalMedium = () => {
  const rotateX = useSharedValue(0);

  useEffect(() => {
    rotateX.value = withTiming(180, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotateX: `${rotateX.value}deg` }],
  }));
};

// 186. Fade In Left Quick
export const fadeInLeftQuick = () => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 187. Fade In Right Quick
export const fadeInRightQuick = () => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 188. Fade Out Left Quick
export const fadeOutLeftQuick = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(-50, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 189. Fade Out Right Quick
export const fadeOutRightQuick = () => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(50, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
};

// 190. Slide In Left
export const slideInLeft = () => {
  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 191. Slide In Right
export const slideInRight = () => {
  const translateX = useSharedValue(200);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 192. Slide Out Left
export const slideOutLeft = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(-200, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 193. Slide Out Right
export const slideOutRight = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(200, { duration: 600 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
};

// 194. Rotate Small
export const rotateSmall = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(45, { duration: 500 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 195. Rotate Medium
export const rotateMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(90, { duration: 700 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 196. Rotate Large
export const rotateLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(180, { duration: 1000 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 197. Wiggle Quick
export const wiggleQuick = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 150 }),
        withTiming(-5, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 198. Wiggle Medium
export const wiggleMedium = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 199. Wiggle Large
export const wiggleLarge = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 250 }),
        withTiming(-15, { duration: 250 }),
        withTiming(0, { duration: 250 })
      ),
      -1,
      true
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
};

// 200. Bounce In Quick
export const bounceInQuick = () => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 400, easing: Easing.bounce });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};
