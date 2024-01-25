"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";
import { execDate, execUname } from "./actions";
import { exec } from "child_process";

export const AuthHeader = () => {
  return (
    <SessionProvider>
      <AuthButton />
    </SessionProvider>
  );
};

export const AuthButton = () => {
  const [value, setValue] = useOptimistic("");
  const [state, setState] = useState("");
  const { status, data } = useSession();
  if (data) console.log(data);
  if (status === "loading")
    return <button onClick={() => signIn}>loading...</button>;
  return (
    <>
      <UserAvatar />
      {status === "authenticated" ? <SignOutButton /> : <SignInButton />}
      <Button size={"sm"} onClick={() => execUname().then(setValue)}>
        Server Action
      </Button>
      <Button size={"sm"} onClick={() => execUname().then(setState)}>
        Server Action (State)
      </Button>
      {value && <span>uname: {value}</span>}
      {state && <span>uname: {state}</span>}
    </>
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
