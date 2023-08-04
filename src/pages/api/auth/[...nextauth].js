import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import prisma from '../../../lib/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nodemailer from 'nodemailer';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`,
    }),
    EmailProvider({
      server: {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.SMTP_API_KEY
        }
      },
      from: 'raynbouneb@gmail.com',
      sendVerificationRequest: async ({ identifier: email, url, baseUrl, provider }) => {
        const { server, from } = provider;
        // Initialize nodemailer
        let transporter = nodemailer.createTransport({
          host: server.host,
          port: server.port,
          secure: false, // true for 465, false for other ports
          auth: {
            user: server.auth.user,
            pass: server.auth.pass,
          },
        });
    
        // Email structure
        const mailOptions = {
          from: `Your App Name <${from}>`,
          to: email,
          subject: `Sign-in link for Web3Deals`,
          text: `Hey there ✨ ! Click the link below to sign in to your account: ${url} This link expires in 24 hours and can only be used once. `,
          html: `<div>
                  <p>Hey there ✨ !<br/> Click the link below to sign in to your account:</p>
                  <a href="${url}">Sign in</a>
                  <p>This link expires in 24 hours and can only be used once.</p>
                  <p>If you did not try to log into your account, you can safely ignore it 🤗.</p>
                </div>`,
        };
    
        // Send the email
        await transporter.sendMail(mailOptions);
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/signin',
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  
};

export default NextAuth(authOptions);