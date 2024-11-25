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
        // This callback is called after successful authentication
        async signIn({ user }) {
            try {
                await connectDB(); // Ensure the DB is connected

                // Check if user exists in the database
                const existingUser = await UserModel.findOne({ email: user.email });
                if (!existingUser) {
                    // If user doesn't exist, create a new user
                    await UserModel.create({
                        email: user.email,
                        username: user?.name || "",
                        profile_picture: user?.image || "", // Save profile picture if needed
                        date_created: new Date(),
                    });
                }

                // Always return true to proceed with authentication
                return true;
            } catch (error) {
                console.error("Error during signIn callback:", error);
                return false; // Returning false cancels the sign-in process
            }
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.date_created = token.date_created;
                session.user.profile_picture = token.profile_picture;
                
            }
            return session;
          },
          async jwt({ token, user }) {
            if (user) {
              token._id = user._id;
              token.username = user.username;
              token.date_created = user.date_created;
              token.profile_picture = user.profile_picture;
            }
            return token;
          },
    },
    
}