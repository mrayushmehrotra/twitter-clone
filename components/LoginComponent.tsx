"use client";
import { GoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";

import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphQLClient } from "@/app/clients/api";

export function LoginComponent() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken || googleToken === undefined) {
        return toast.error("Google Token not found");
      }

      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        },
      );

      toast.success("Verified successfully"), console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }
    },
    [],
  );

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
