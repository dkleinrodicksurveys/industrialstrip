import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Check against environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin'
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        if (credentials.username !== adminUsername) {
          return null
        }

        // If no hash is set, compare directly (for initial setup)
        if (!adminPasswordHash) {
          // Default password for initial setup - CHANGE THIS!
          if (credentials.password === 'changeme123') {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@industrialstrip.com',
            }
          }
          return null
        }

        // Compare with hashed password
        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash)

        if (isValid) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@industrialstrip.com',
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
      }
      return session
    },
  },
}
