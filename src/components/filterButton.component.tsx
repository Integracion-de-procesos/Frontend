import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { filterButtonStyles } from "../styles/filterButton.styles";
import { useTheme } from "../contexts/theme.context";

type FilterButtonProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

const FilterButton = ({ label, selected = false, onPress }: FilterButtonProps) => {
  const { isDark } = useTheme()
  const styles = filterButtonStyles({ isDark })
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
