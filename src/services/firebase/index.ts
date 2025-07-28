//Firebase config
import { signInWithEmailAndPassword, signInWithPopup, OAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { authInstanceFirebase, provider } from './firebase.config';

//Types
import type { AuthFirebaseLoginAndPasswordProps, AuthFirebaseForgotPasswordProps } from "./firebase.interface"

// Service
import {
  LoginUser,
  SignUpUser,
  ValidateUserToken,
} from '../auth';

const AuthLoginAndPassword = async (login: AuthFirebaseLoginAndPasswordProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(authInstanceFirebase, login.email, login.password);
    const token = await userCredential.user.getIdToken();
    await ValidateUserToken({ token });
    const user = await LoginUser({ token });

    return { ...user, access_token: token };
  } catch (error) {
    console.error(error);
  }
}

const signInWithMicrosoft = async () => {
  try {
    const result = await signInWithPopup(authInstanceFirebase, provider);

    const credential = OAuthProvider.credentialFromResult(result);
    if (credential && credential.accessToken) {
      const token = await result.user.getIdToken();
      await ValidateUserToken({ token });
      const user =  await LoginUser({ token });

      return { ...user, access_token: token }
    } else {
      console.error("No credentials returned from Microsoft SSO.");
    }
  } catch (error) {
    console.error("Error during Microsoft SSO:", error);
  }
};

const signUpWithMicrosoft = async () => {
  try {
    const result = await signInWithPopup(authInstanceFirebase, provider);

    const credential = OAuthProvider.credentialFromResult(result);
    if (credential && credential.accessToken) {
      const token = await result.user.getIdToken();

      const data = await SignUpUser({
        email: result.user.email || '',
        name: result.user.displayName || '',
        phone: result.user.phoneNumber || '',
        password: '',
        threadId: '',
        provider: 'microsoft',
        msToken: token,
      });

      return { ...data, access_token: token };
    } else {
      console.error('No credentials returned from Microsoft SSO.');
    }
  } catch (error) {
    console.error('Error during Microsoft SSO:', error);
  }
};

const forgotPassword = async ({ email }: AuthFirebaseForgotPasswordProps) => {
  try {
    await sendPasswordResetEmail(authInstanceFirebase, email);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  AuthLoginAndPassword,
  signInWithMicrosoft,
  signUpWithMicrosoft,
  forgotPassword,
}
