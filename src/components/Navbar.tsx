import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import SignOut from "./Signout";

// if the following is the server side component (without the 'use client ')
//  we can use the async component function directly.
const Navbar = async () => {
  const session = await getCurrentUser();


  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user.image && (
              <Image
                src={session?.user?.image as string}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}

            <SignOut/>
            {/* <Link href="/create-project">share work</Link> */}
          </>
        ) : (
          <>
            <AuthProviders></AuthProviders>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
