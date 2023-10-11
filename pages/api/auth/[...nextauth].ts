import NextAuth, { NextAuthOptions } from "next-auth";
import { Auth } from "@auth/core";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "@auth/hasura-adapter";
import * as jsonwebtoken from "jsonwebtoken";

type JWTEncodeParamsWithoutBuffer = {
  token?: JWT;
  secret: Exclude<string | Buffer, Buffer>;
  maxAge?: number;
};
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT,
    adminSecret: process.env.HASURA_ADMIN_SECRET,
  }),
  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }: JWTEncodeParamsWithoutBuffer) => {
      const encodedToken = jsonwebtoken.sign(token, secret, {
        algorithm: "HS256",
      });
      console.log(encodedToken);
      return encodedToken;
    },
    decode: ({ token, secret }) => {
      const decodedToken = jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
      });
      console.log(decodedToken);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    jwt: async ({ token }) => {
      console.log(token);
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
