"use client";
import { GoogleLogin } from "@react-oauth/google";
export function LoginComponent() {
  return (
    <GoogleLogin
      onSuccess={(credentials) => {
        console.log(credentials);
      }}
    />
  );
}
