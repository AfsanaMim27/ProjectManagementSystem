"use client";
import { SessionProvider } from "next-auth/react";
import RestrictedPage from "./restrictedPage";

export default function RestrictedLayout({ children, Session }) {
  return (
    <div className="restrictedLayout pb-5">
      <SessionProvider session={Session}>
        <RestrictedPage>{children}</RestrictedPage>
      </SessionProvider>
    </div>
  );
}
