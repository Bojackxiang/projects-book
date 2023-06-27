import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./action";

// import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: async ({ secret, token }) => {
      try {
        const encoded = await jsonwebtoken.sign(
          {
            ...token!,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          },
          secret!,
          {
            algorithm: "HS512",
          }
        );
        console.log("encoded triggered");
        return encoded;
      } catch (error) {
        console.log("jwt encode error", error);
        return "";
      }
    },
    decode: async ({ secret, token }) => {
      const decodedToken = await jsonwebtoken.verify(token!, secret!, {
        algorithms: ["HS512"],
      });
      console.log("decode triggered");
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    // async session({ session }) {
    //   // now we want to hook up the google user with our database user,
    //   // and return the user session session
    //   const email = session?.user?.email as string;

    //   try {
    //     const data = (await getUser(email)) as { user?: UserProfile };

    //     const newSession = {
    //       ...session,
    //       user: {
    //         ...session.user,
    //         ...data?.user,
    //       },
    //     };

    //     return newSession;

    //   } catch (error: any) {
    //     console.error("Error retrieving user data: ", error.message);
    //     return session;
    //   }
    // },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // sign in when user login
        // check if user is existed in the database, if not, create one
        console.log("google signin user", user);
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

// 如果使用别的 database，这边就是需要改动的地方，通过 email 获取当前的用户
export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
