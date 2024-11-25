import "next-auth";
import { DefaultSession } from "next-auth";

// Extend NextAuth's built-in User and Session interfaces
declare module "next-auth" {
  interface User {
    _id?: string;
    email: string;
    username: string;
    profile_picture?: string;
    date_created?: Date;
    // other_details?: string;
    // progress?: number;
    // goal?: string;
    // current_status?: string;
    // specifications?: string;
  }

  interface Session {
    user: {
      _id?: string;
      username: string;
      profile_picture?: string;
      date_created?: Date;
    //   other_details?: string;
    //   progress?: number;
    //   goal?: string;
    //   current_status?: string;
    //   specifications?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    email: string;
    username: string;
    profile_picture?: string;
    date_created?: Date;
    // other_details?: string;
    // progress?: number;
    // goal?: string;
    // current_status?: string;
    // specifications?: string;
  }
}
