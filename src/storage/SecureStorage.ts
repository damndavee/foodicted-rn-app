import * as SecureStore from 'expo-secure-store';
import { authUserTokenKey, expiryTokenKey } from './constants';

import { Buffer } from 'buffer';

export const saveToken = async (token: string) => {
    const [headerEncoded, payloadEncoded] = token.split('.');

    const decodedToken = JSON.parse(
        Buffer.from(payloadEncoded, "base64").toString("ascii"),
    );

    const expTokenDate = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

    if(expTokenDate) {
        await SecureStore.setItemAsync(
            expiryTokenKey,
            expTokenDate.toISOString(),
        );
    };

    return SecureStore.setItemAsync(authUserTokenKey, token);
};

export const removeTokens = async () => {
    [authUserTokenKey, expiryTokenKey].forEach(async key => await SecureStore.deleteItemAsync(key));
}

export const restoreToken = async () => {
    const expiryTokenDate = await SecureStore.getItemAsync(expiryTokenKey);
    let isTokenValid = false;

    if(expiryTokenDate) {
        const expiryDate = new Date(expiryTokenDate);
        isTokenValid = expiryDate.getTime() > new Date().getTime();
    };

    return isTokenValid ? SecureStore.getItemAsync(authUserTokenKey) : null;
};