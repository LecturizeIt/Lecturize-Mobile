import { useRef } from "react";
import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const useScrollUpHandler = () => {

  const buttonVisible = useSharedValue(0);
  const lastOffsetY = useRef(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;

      if (currentOffset > lastOffsetY.current) {
        buttonVisible.value = withTiming(1); // show button
      } else {
        buttonVisible.value = withTiming(0); // hide button
      }

      lastOffsetY.current = currentOffset;
    }
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonVisible.value,
      transform: [
        {
          translateY: buttonVisible.value === 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  });

  return { animatedButtonStyle, scrollHandler }
}

export default useScrollUpHandler;
