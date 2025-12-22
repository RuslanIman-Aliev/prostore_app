<<<<<<< HEAD
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
=======
export {auth as middleware} from '@/auth'
>>>>>>> d71af639d30e0cb1f483d40db303e3e9f32d8772
