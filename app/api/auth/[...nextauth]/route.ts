import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // メルアド認証処理
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            email: "user1@example.com",
            password: "user1@example.com",
          },
          {
            id: "2",
            email: "user2@example.com",
            password: "user2@example.com",
          },
        ];
        const user = users.find((user) => user.email === credentials?.email);
        if (user && user?.password === credentials?.password) {
          return {
            id: user.id,
            name: user.email,
            email: user.email,
            role: "admin",
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.user = user;
        token.role = (user as any).role;
      }
      token.accessToken = account?.access_token;
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
