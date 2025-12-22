import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
<<<<<<< HEAD
import { authConfig } from "./auth.config"; // <-- Импорт конфига

export const config = {
  ...authConfig, // <-- Берем базовые настройки
  adapter: PrismaAdapter(prisma), // <-- Подключаем Призму
=======
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
>>>>>>> d71af639d30e0cb1f483d40db303e3e9f32d8772
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
<<<<<<< HEAD
    ...authConfig.callbacks, // Наследуем authorized из конфига
    
    // Переписываем session и jwt, так как тут нужна полная логика
=======
>>>>>>> d71af639d30e0cb1f483d40db303e3e9f32d8772
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
<<<<<<< HEAD
      
      if (trigger === "update" && session?.user) {
        session.user.name = session.user.name;
      }
      return session;
    },
    
=======
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
>>>>>>> d71af639d30e0cb1f483d40db303e3e9f32d8772
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;

        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
<<<<<<< HEAD
      
      // Логика обновления
      if (trigger === "update" && session?.user) {
         token.name = session.user.name;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
=======
      return token;
    },
    authorized({ request, auth }: any) {
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
>>>>>>> d71af639d30e0cb1f483d40db303e3e9f32d8772
