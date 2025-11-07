import { StyleSheet } from "react-native";

export const generalHeaderStyles = StyleSheet.create({
    /* ChanelCard (CC) */
    CC_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 2
    },
    CC_chanelImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        resizeMode: "cover"
    },
    CC_channelName: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "600",
    },
    CC_iconBell: {
        color: "#fff",
        fontSize: 24
    },
    CC_notificationButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff5a5a",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    /* ListSuscriptionsChanels */
    LSC_container: {
        width: "94%",
        borderWidth: 1,
        borderColor: "#dbdbdbff",
        borderRadius: 10,
        padding: 6
    },

    /* SuscriptionScreen */
    SS_generalContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    SS_container: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        gap: 20,
    },

    /* GeneralHeader */
    GH_header: {
        width: "100%",
        flexDirection: "column",
        gap: 6
    },
    GH_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    GH_title: {
        fontSize: 18,
        fontWeight: "600",
    },
    GH_userImage: {
        width: 36,
        height: 35,
        borderRadius: 20,
    },
    GH_searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 2,
        marginHorizontal: 20,
        backgroundColor: "#eeeeeeff",
        borderRadius: 30,
        gap: 5
    },
    GH_input: {
        fontSize: 14,
        fontWeight: 500
    }
});
