import React, { useState, useRef, useEffect } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";
import { useTheme } from "../contexts/theme.context";

const AnimatedToggleSwitch = () => {
  const { toggleTheme, isDark } = useTheme();

  // Estado inicial coherente con el tema
  const [active, setActive] = useState(isDark);
  const offset = useRef(new Animated.Value(isDark ? 24 : 0)).current;

  // Mantiene sincronizado el estado si cambia el tema externamente
  useEffect(() => {
    Animated.timing(offset, {
      toValue: isDark ? 24 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setActive(isDark);
  }, [isDark]);

  const toggle = () => {
    const newState = !active;
    toggleTheme();
    Animated.timing(offset, {
      toValue: newState ? 24 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setActive(newState);
  };

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.switchContainer,
        {
          backgroundColor: active ? "#2563EB" : "#E5E7EB",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX: offset }],
            backgroundColor: active ? "#FFFFFF" : "#111827",
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 56,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default AnimatedToggleSwitch;
