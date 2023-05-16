import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();

  const login = async () => {
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      console.log(user);
      setIsPending(false)
    } catch (error) {
      console.log(error);
      setError(true);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};