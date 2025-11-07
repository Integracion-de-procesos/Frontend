import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import FilterButton from "./filterButton.component";
import { homeScreenStyles as styles } from "../styles/home.styles";

type Props = {
  filters: string[];
};

const ListFilterButtons = ({ filters }: Props) => {
  const [selected, setSelected] = useState(filters[0] ?? "");  // (??) : si es null o undefined, entonces toma ""

  return (
    <View style={styles.LFB_container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filtro) => (
          <FilterButton
            key={filtro}
            label={filtro}
            selected={selected === filtro}
            onPress={() => setSelected(filtro)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ListFilterButtons;
