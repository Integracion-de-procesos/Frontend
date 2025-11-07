import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(onLoginSuccess: (token: string) => void) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
    });

    useEffect(() => {
        if (response?.type === "success") {
            const token = response.authentication?.accessToken;
            if (token) onLoginSuccess(token);
        }
    }, [response]);

    return { promptAsync, request };
}
