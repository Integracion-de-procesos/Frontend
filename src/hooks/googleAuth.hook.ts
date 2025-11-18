// hooks/useGoogleAuth.ts
import { useState, useEffect, useCallback } from "react";
import {
    GoogleSignin,
    isSuccessResponse,
} from "@react-native-google-signin/google-signin";

export const useGoogleAuth = () => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "797104630359-3dp936rpk248q10uqemei54itf4tcret.apps.googleusercontent.com",
            offlineAccess: false,
        });
    }, []);

    const signIn = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                setUserInfo(response.data);
                return response.data;
            }

            return null;
        } catch (err: any) {
            setError("Error al iniciar sesión con Google");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await GoogleSignin.signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }, []);

    return { userInfo, loading, error, signIn, signOut };
};