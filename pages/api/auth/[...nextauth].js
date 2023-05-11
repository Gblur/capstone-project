import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "../../../db/models/User";
import dbConnect from "../../../db/connect";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  events: {
    async signIn(user, account, profile) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({email: user?.user?.email});
        if (existingUser) {
          return true;
        }

        console.log("new User callback", account);

        const newUser = new User({
          name: user.user.name,
          email: user.user.email,
        });

        await newUser.save();
        return true;
      } catch (error) {
        console.error({message: error});
      }
    },
  },
};

export default NextAuth(authOptions);
