import { AuthCredential, FacebookAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithCredential, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

export const generateGoogleSignInCredentials = (token: string): AuthCredential => GoogleAuthProvider.credential(token);
export const generateFacebookSignInCredentials = (token: string): OAuthCredential => FacebookAuthProvider.credential(token);

export const signInWithExternalCredentials = (credentials: AuthCredential) => signInWithCredential(auth, credentials);

export const signOutFromExternalSource = () => signOut(auth);