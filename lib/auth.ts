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
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        if (credentials.username !== adminUsername) {
          return null
        }

        // Check plain text password first (simpler setup)
        if (adminPassword && credentials.password === adminPassword) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@industrialstrip.com',
          }
        }

        // If hash is set, compare with hashed password
        if (adminPasswordHash) {
          const isValid = await bcrypt.compare(credentials.password, adminPasswordHash)
          if (isValid) {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@industrialstrip.com',
            }
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
