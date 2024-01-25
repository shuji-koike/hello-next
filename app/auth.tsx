"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { execDate } from "./actions";

export const AuthHeader = () => {
  return (
    <SessionProvider>
      <AuthButton />
    </SessionProvider>
  );
};

export const AuthButton = () => {
  const { status, data } = useSession();
  if (data) console.log(data);
  if (status === "loading")
    return <button onClick={() => signIn}>loading...</button>;
  return (
    <div className="flex gap-3">
      <UserAvatar />
      {status === "authenticated" ? <SignOutButton /> : <SignInButton />}
    </div>
  );
};

export const UserAvatar = () => {
  const { data } = useSession();
  if (!data?.user?.image) return null;
  return (
    <Image
      alt={data.user.name || ""}
      className="rounded-full ring-2 ring-black"
      width={32}
      height={32}
      src={data.user.image}
      onClick={async () => {
        console.log("execDate");
        console.log(await execDate());
      }}
    />
  );
};

export const SignInButton = () => {
  return (
    <Button variant={"secondary"} size="sm" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button variant={"ghost"} size="sm" onClick={() => signOut()}>
      Sign out
    </Button>
  );
};
