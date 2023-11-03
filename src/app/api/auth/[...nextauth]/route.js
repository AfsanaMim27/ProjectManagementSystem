import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../services";

const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token, user }) {
      let dbConnection = await connectToDatabase();
      const [rowsUser, fieldsUser] = await dbConnection.execute( "SELECT UserId, UserName FROM Users Where UserName = '" + token.name + "'");
      const [rowsContact, fieldsContact] = await dbConnection.execute( "SELECT ContactId, FirstName, LastName FROM Contacts Where UserId = " + rowsUser[0].UserId);
      dbConnection.end();
      session.user.contactId = rowsContact[0].ContactId;
      session.user.firstName = rowsContact[0].FirstName;
      session.user.lastName = rowsContact[0].LastName;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "User name" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        let dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute( "SELECT UserId, UserName FROM Users Where UserName = '" + credentials.username + "' AND UserPassword = '" + credentials.password + "'");
        dbConnection.end();
        if (rows && rows[0]) {
          return {
            id: rows[0].UserId,
            name: rows[0].UserName,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
