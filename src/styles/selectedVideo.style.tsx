import { StyleSheet } from "react-native";

export const selectedVideoStyle = StyleSheet.create({
  container: {
    height: "62%"
  },
  videoContainer: {
    height: 234,
    backgroundColor: "#000",
  },
  metaSection: {
    marginTop: 10,
    paddingHorizontal: 10,
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(215, 215, 215, 1)",
  },
  metaItem: {
    alignItems: "center",
    flex: 1,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.8,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  descriptionContainer: {
    margin: 12
  },
  descriptionText: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    lineHeight: 20,
  },

  channelSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12
  },
  channelImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "500",
  },
});
