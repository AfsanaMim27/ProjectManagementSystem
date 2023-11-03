"use client";
import { useSession, signIn } from "next-auth/react";
import GlobalBar from "../components/globalBar";

export default function RestrictedPage({ children }) {
  const { data } = useSession();
  if (typeof data !== "undefined") {
    if (!data) {
      signIn();
    }
  }
  return data ? (
    <div className="restrictedPage">
      <GlobalBar></GlobalBar>
      <div className="pt-5">{children}</div>
    </div>
  ) : null;
}
