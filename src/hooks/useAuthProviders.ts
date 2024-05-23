import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import * as AppleAuth from 'expo-apple-authentication';
import { signOutFromExternalSource } from '../services/firebase';
import { Settings } from "react-native-fbsdk-next";

import { removeTokens } from '../storage/SecureStorage';
import { EXPO_WEB_CLIENT_ID } from '@env';
import { PermissionResponse, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Alert, Platform } from 'react-native';
import { useAppDispatch } from '../storage/store';
import { authenticateWithCustomProviderThunk } from '../storage/store/global/global.thunk';
import { toggleSpinnerVisibility } from '../storage/store/global/global.reducer';
import { AppProviders } from '../storage/store/global/global.type';

const useAuthProviders = () => {
    const [isAppleAvailable, setIsAppleAvailable] = useState<boolean>(false);
    const dispatch = useAppDispatch();

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
                    dispatch(authenticateWithCustomProviderThunk({
                        uid: user.idToken, 
                        provider: AppProviders.GOOGLE,
                    }));
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
                    // TODO: add toast for canceling
                    return;
                }
                
                dispatch(authenticateWithCustomProviderThunk({
                    uid: tokenObject.accessToken, 
                    provider: AppProviders.FACEBOOK, 
                }));
            } catch (error) {
                throw new Error('An Error occured: ', error as Error);
            }
        },
        logout: async () => {
            dispatch(toggleSpinnerVisibility(true));

            signOutFromExternalSource();

            try {
                const accessToken = await AccessToken.getCurrentAccessToken();
                
                let logoutRequest = new GraphRequest('me/permissions/', {
                    httpMethod: 'DELETE',
                    accessToken: accessToken?.accessToken
                }, async (error, result) => {
                    if(error) {
                        throw new Error('An Error occured: ', error.message as Error);
                    }
                    
                    if(result) {
                        dispatch(toggleSpinnerVisibility(false));

                        await removeTokens();
                        LoginManager.logOut();
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