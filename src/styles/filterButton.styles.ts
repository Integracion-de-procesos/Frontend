import { StyleSheet } from "react-native";

type filterButtonStylesProps = {
    isDark: boolean
}

export const filterButtonStyles = ({ isDark }: filterButtonStylesProps) => StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#668",
        backgroundColor: isDark ? "#000" : "#fff",
        marginRight: 6,
    },
    buttonSelected: {
        backgroundColor: isDark ? "#fff" : "#000",
        borderColor: "#333",
    },
    buttonText: {
        fontSize: 12,
        color: isDark ? "#fff" : "#000",
        fontWeight: "500",
    },
    buttonTextSelected: {
        color: isDark ? "#000" : "#fff",
    },
})