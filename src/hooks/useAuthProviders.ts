import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import * as AppleAuth from 'expo-apple-authentication';
import { generateFacebookSignInCredentials, generateGoogleSignInCredentials, signInWithExternalCredentials, signOutFromExternalSource } from '../services/firebase';
import { Settings } from "react-native-fbsdk-next";

import { removeTokens, saveToken } from '../storage/SecureStorage';
import { EXPO_WEB_CLIENT_ID } from '@env';
import { PermissionResponse, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Alert, Platform } from 'react-native';

const useAuthProviders = () => {
    const [isAppleAvailable, setIsAppleAvailable] = useState<boolean>(false);

    const GoogleAuthentication = {
        init: () => {
            GoogleSignin.configure({
                webClientId: EXPO_WEB_CLIENT_ID,
            });
        },
        signin: async () => {
            try {
                await GoogleSignin.hasPlayServices();
                const user = await GoogleSignin.signIn();
                
                if(user.idToken) {
                    const googleCredentials = generateGoogleSignInCredentials(user.idToken);
                    const credentials = await signInWithExternalCredentials(googleCredentials);
                    const idTokenResult = await credentials.user.getIdTokenResult();
    
                    saveToken(idTokenResult.token);
                }            
            } catch(error) {
                throw new Error('An Error occured: ', error as Error);
            }
        },
        logout: async () => {
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
    
            await removeTokens();
    
            signOutFromExternalSource();
        }
    };

    const FacebookAuthentication = {
        init: async () => {
            const response: PermissionResponse = await requestTrackingPermissionsAsync();

            if(response.status === 'granted') {
                Settings.initializeSDK();
                await Settings.setAdvertiserTrackingEnabled(true);
            }
        },
        signin: async () => {
            try {
                const result = await LoginManager.logInWithPermissions(['public_profile']);
                const tokenObject = await AccessToken.getCurrentAccessToken();
    
                if(!tokenObject) {
                    throw new Error('Couldn\'t fetch access token.')
                }
    
                if(result.isCancelled) {
                    return;
                }
    
                const facebookCredentials = generateFacebookSignInCredentials(tokenObject.accessToken);
                const credentials = await signInWithExternalCredentials(facebookCredentials);
                const idTokenResult = await credentials.user.getIdTokenResult();
                
                await saveToken(idTokenResult.token);
                // TODO: add loading spinner and overlay to differnet stage of request
            } catch (error) {
                throw new Error('An Error occured: ', error as Error);
            }
        },
        logout: async () => {
            try {
                const accessToken = await AccessToken.getCurrentAccessToken();
                
                let logoutRequest = new GraphRequest('me/permissions/', {
                    httpMethod: 'DELETE',
                    accessToken: accessToken?.accessToken
                }, (error, result) => {
                    if(error) {
                        throw new Error('An Error occured: ', error.message as Error);
                    }
                    
                    if(result) {
                        LoginManager.logOut();
                        console.log("LOGOUT");
                        // TODO: add toast for successfully signing out
                    }
                })
                new GraphRequestManager().addRequest(logoutRequest).start();
            } catch (error) {
                throw new Error('An Error occured: ', error as Error);
            }
        }
    };

    const AppleAuthentication = {
        init: async () => {
            const isAvailable = await AppleAuth.isAvailableAsync();
            setIsAppleAvailable(isAvailable);
        },
        signin: async () => {

            // TODO: add further implementation on MAC.
            if(Platform.OS !== 'ios') {
                Alert.alert('Unsupported OS!', 'This OS doesn\'t support this sign in method. Choose another one.');
                return;
            }

            try {
                const credentials = await AppleAuth.signInAsync({
                    requestedScopes: [
                        AppleAuth.AppleAuthenticationScope.FULL_NAME,
                        AppleAuth.AppleAuthenticationScope.EMAIL,
                    ]
                });
            } catch (error) {
                throw new Error('An Error occured: ', error as Error);
            }
        },
        logout: () => {},
        isAvailable: isAppleAvailable
    }

    return { GoogleAuthentication, FacebookAuthentication, AppleAuthentication };
};

export default useAuthProviders;