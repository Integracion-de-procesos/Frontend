import { StyleSheet } from "react-native";

export const settingsScreenStyles = StyleSheet.create({
    generalContainer: {
        flex: 1,
    },

    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },

    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        marginBottom: 10,
    },

    profileName: {
        fontSize: 22,
        fontWeight: "700",
    },

    contentContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        opacity: 0.8,
    },

    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 10,
    },

    optionText: {
        fontSize: 16,
        fontWeight: "500",
    },

    languageText: {
        fontSize: 15,
        fontWeight: "500",
        opacity: 0.8,
    },

    logoutRow: {
        marginTop: 20,
        backgroundColor: "#E53935",
    },

    button: {
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
    },
    menu: {
        position: "absolute",
        top: 48,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        elevation: 5,
        zIndex: 100,
        paddingVertical: 4,
    },
    itemButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    item: {
        fontSize: 15,
    },
});
