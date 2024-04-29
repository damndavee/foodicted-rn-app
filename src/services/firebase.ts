import { 
    AuthCredential, 
    FacebookAuthProvider, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithCredential,  
    signInWithEmailAndPassword, 
    signOut,

} from "firebase/auth";
import { auth } from "../../firebase.config";

export const generateGoogleSignInCredentials = (token: string): AuthCredential => GoogleAuthProvider.credential(token);

export const generateFacebookSignInCredentials = (token: string): AuthCredential => FacebookAuthProvider.credential(token);

export const signInWithExternalCredentials = (credentials: AuthCredential) => signInWithCredential(auth, credentials);

// TODO: add types for callback prop;
export const authStateChangeListener = (callback: any) => onAuthStateChanged(auth, callback);

export const signOutFromExternalSource = () => signOut(auth);

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const creasteUserWithAdditionalData = () => {};
