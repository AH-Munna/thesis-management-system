import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "domain-login",
            name: "Domain Account",
            async authorize(credentials, req) {
              const user = {
                /* add function to get user */
              }
              return user
            },
            credentials: {
              domain: {
                label: "Domain",
                type: "text ",
                placeholder: "CORPNET",
                value: "CORPNET",
              },
              username: { label: "Username", type: "text ", placeholder: "jsmith" },
              password: { label: "Password", type: "password" },
            },
          }),
      ],
    callbacks: {
        async jwt({ token }) {
            const userDb = async () => {
                try {
                    return await prisma.user.findFirst({
                        where: {
                            email: token.email,
                        },
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    await prisma.$disconnect();
                }
            };
            const dbUser = await userDb();
            if (!dbUser) {
                return null;
            }
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.image = dbUser.image;
            token.role = dbUser.role;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.image;
            session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };