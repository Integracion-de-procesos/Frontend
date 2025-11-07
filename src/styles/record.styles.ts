import { StyleSheet } from "react-native";


export const recordScreenStyles = StyleSheet.create({
    /* RecordScreen */
    RS_generalContainer: {
        flex: 1,
    },
    RS_container: {
        flex: 1,
        marginTop: "10%",
        gap: 10,
        alignItems: "center",
    },
    /* ListRecordVideos */
    LRV_container: {
        flex: 1,
        width: "94%",
        /*borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 14,*/
    },
    LRV_dateText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 14,
    },
    /* ShortVideoCard */
    SVC_generalContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 6,
        marginBottom: 10,
    },
    SVC_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    SVC_videoContainer: {
        height: 120,
        aspectRatio: 3 / 2,
        borderRadius: 6,
        marginRight: 10,
    },
    SVC_textContainer: {
        width: "50%",
        gap: 1,
    },

    SVC_metaText: {
        fontSize: 12,
        fontWeight: "500",
    },

    SVC_titleText: {
        fontSize: 16,
        fontWeight: "600",
    }
})