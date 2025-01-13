"use client";
// Google Login Button Start %%%%%%%%% Google Button is at page.tsx main "/" route of the page
import { GoogleLogin } from "@react-oauth/google";
import React, { useCallback, ReactNode } from "react";
import { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";

import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphQLClient } from "@/app/clients/api";

export function LoginComponent() {
  const queryClient = useQueryClient();
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

      toast.success("Verified successfully");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient],
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

// Google Login Button Ends

// This QueryProvider is used in layout.tsx

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
