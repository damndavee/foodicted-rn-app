import { 
    AuthCredential, 
    FacebookAuthProvider, 
    GoogleAuthProvider, 
    User, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,  
    signInWithCredential,  
    signInWithEmailAndPassword, 
    signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { doc, setDoc } from "firebase/firestore";

export const generateGoogleSignInCredentials = (token: string): AuthCredential => GoogleAuthProvider.credential(token);

export const generateFacebookSignInCredentials = (token: string): AuthCredential => FacebookAuthProvider.credential(token);

export const signInWithExternalCredentials = (credentials: AuthCredential) => signInWithCredential(auth, credentials);

export const authStateChangeListener = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            unsubscribe();
            resolve(user)
        }, reject)
    });
};

export const signOutFromExternalSource = () => signOut(auth);

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const creasteUserWithAdditionalData = async (uid: string) => {
    const additionalData = {
        showBiometrics: true, 
        showOnboarding: true, 
        showTermsAndConditions: true, 
        biometricsEnabled: false, 
        notificationEnabled: false, 
        nickname: null, 
        isNicknameSkipped: false, 
        phoneNumber: null, 
        isPhoneNumberSkipped: false, 
        avatarUrl: null
    };

    const userDocRef = doc(db, 'users', uid);
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {id: uid, createdAt, ...additionalData})
    } catch (error) {
        throw new Error(error as string);
    }

};