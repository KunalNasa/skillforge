import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB(); 

        const existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await UserModel.create({
            email: user.email,
            username: user?.name || "",
            profile_picture: user?.image || "",
            date_created: new Date(),
          });
          user._id = newUser._id; 
          user.username = newUser.username; 
          user.date_created = newUser.date_created; 
          user.profile_picture = newUser.profile_picture; 
        } else {
          user._id = existingUser._id;
          user.username = existingUser.username;
          user.date_created = existingUser.date_created;
          user.profile_picture = existingUser.profile_picture;
        }

        return true; // Proceed with authentication
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false; // Cancel sign-in process on error
      }
    },

    // JWT callback: Attach user data directly from `user` (no need for DB call)
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username; 
        token.date_created = user.date_created; 
        token.profile_picture = user.profile_picture; 
      }
      return token; // Return the enriched token
    },

    // Session callback: Attach token data to session
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.date_created = token.date_created as Date;
        session.user.profile_picture = token.profile_picture as string;
      }
      return session; // Return the session with the attached data
    },
  },
};
