import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // session expire time
  session: {
    maxAge: 24 * 60 * 60, // 1 day
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Please fill required fields");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new Error("Not found user");
          }

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Check your password");
          }

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // add user role to jwt
      if (user) {
        token.role = user.role;
        /* token.id = user.id */
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        /*  session.user.id = token.id */
      };
      return session;
    },
  },
};