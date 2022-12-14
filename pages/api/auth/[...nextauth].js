import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      //here we can add informations to the session by ourself
      // name: Oliver Kusch >>> username: oliverkusch
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      //token.sub is the userId of Google
      session.user.uid = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
