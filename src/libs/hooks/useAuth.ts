import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export function useAuth(): AuthState {
  const isE2E = process.env.NEXT_PUBLIC_E2E_MODE === "true";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isE2E) return;
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [isE2E]);

  async function signInWithGoogle() {
    if (isE2E) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getFirebaseAuth(), provider);
  }

  async function signOut() {
    if (isE2E) return;
    await firebaseSignOut(getFirebaseAuth());
  }

  if (isE2E) {
    return {
      user: { uid: "e2e-user" } as unknown as User,
      loading: false,
      signInWithGoogle,
      signOut,
    };
  }

  return { user, loading, signInWithGoogle, signOut };
}
