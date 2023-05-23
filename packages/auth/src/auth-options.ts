import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@wove/db";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      name: string | null | undefined;
      firstName: string | null | undefined;
      lastName: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      console.log(user);
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.firstName = user.name?.split(" ")[0];
      session.user.lastName = user.name?.split(" ")[1];
      session.user.email = user.email;
      session.user.image = user.image;
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log(message.user);
      if (message.isNewUser) {
        // Create a new Team for the user
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  pages: {
    signIn: "/login",
  },
};
