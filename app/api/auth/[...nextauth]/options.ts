import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const options : NextAuthOptions = {
    secret : process.env.NEXTAUTH_SECRET,
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET! ,
        })
    ],
    session : {
        strategy : "jwt"
    },
    jwt : {
        secret : process.env.NEXTAUTH_SECRET,
    }
}