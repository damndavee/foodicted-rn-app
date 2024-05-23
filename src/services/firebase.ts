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
import { QueryDocumentSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { AuthUser, OnboardingFlags, UserWithOnboardingFlags } from "../storage/store/global/global.type";

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

export const signOutFromExternalSource = async () => await signOut(auth);

export const reauthenticateUser = async () => {
    const { currentUser } = auth;
    try {
        await currentUser?.getIdToken();

        const refreshedToken = await currentUser?.getIdTokenResult();
        return refreshedToken?.token;
    } catch (error) {
        throw new Error(error as string);
    }
};

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const creasteUserWithAdditionalData = async (id: string, user: AuthUser): Promise<UserWithOnboardingFlags> => {
    const onboardingFlags: OnboardingFlags = {
        showOnboarding: true, 
        termsAndConditionsAgreed: false, 
        biometricsEnabled: false, 
        notificationEnabled: false, 
        isNicknameSkipped: false, 
        isPhoneNumberSkipped: false, 
    };

    const userDocRef = doc(db, 'users', id);
    const createdAt = new Date();

    const userWithOnboardingFlags = {
        id,
        createdAt,
        ...onboardingFlags,
        ...user
    }

    try {
        await setDoc(userDocRef, userWithOnboardingFlags)

        return userWithOnboardingFlags;
    } catch (error) {
        throw new Error(error as string);
    }
};

export const getUserSnapshot = async (uid: string): Promise<QueryDocumentSnapshot | void> => {
    const userDocRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.data() as QueryDocumentSnapshot;
}