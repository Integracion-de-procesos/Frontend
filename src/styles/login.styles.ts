import { StyleSheet } from "react-native";

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 44,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  forgotText: {
    textAlign: "right",
    marginVertical: 24,
    fontSize: 14,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGoogle: {
    backgroundColor: "#DB4437",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  buttonError: {
    backgroundColor: "#6c0067ff",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  error: {
    color: "#ff0000ff",
    fontSize: 12,
    marginBottom: 10
  },
  footerContainer: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  }
});
