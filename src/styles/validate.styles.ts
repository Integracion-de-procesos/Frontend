import { StyleSheet } from "react-native";

export const validateScreenStyles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flexDirection: "column",
        gap: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 36,
        fontWeight: "600",
        paddingBottom: 20
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
    },
    resend: {
        fontSize: 14,
        fontWeight: "300"
    },
    inputContainer: {
        width: 280,
        justifyContent: "center",
        backgroundColor: "#e2f0ffff",
        borderRadius: 20,
        marginVertical: 40
    },
    input: {
        textAlign: "center",
        fontSize: 36,
        borderRadius: 12,
        letterSpacing: 10
    },
    btnRegister: {
        width: 200,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 26,
        borderRadius: 24,
        marginBottom: 20
    },
    btnRegisterText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold"
    },
    btnResend: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#4b78ffff",
        marginBottom:20
    },
    btnResendText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#fff"
    },
    messageContainer: {
        width:"90%",
    },
    error: {
        fontSize: 14,
        color: "red",
        fontWeight: "400"
    },
    success: {
        fontSize: 14,
        color: "green",
        fontWeight: "400"
    }
})