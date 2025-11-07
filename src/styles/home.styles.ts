import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
    /* HomeScreen */
    HS_generalContainer: {
        flex: 1,
        paddingTop: "10%",
        gap: 10
    },
    /* HomeHeader */
    HH_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    HH_searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 20,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        gap: 6
    },
    HH_logo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    HH_input: {
        flex: 1,
        color: "#000",
    },
    HH_userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    /* ListVideoCards */
    LVC_container: {
        flex: 1,
    },
    /* ListFilterButton */
    LFB_container: {
        flex: 1,
        marginBottom: 10,
    },
})