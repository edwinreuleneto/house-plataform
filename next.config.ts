import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  images: {
    domains: ['ged-invoice-ai.s3.amazonaws.com', 'randomuser.me'],
  },
  env: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    TAG_COOKIE_USER: process.env.TAG_COOKIE_USER,
    TAG_COOKIE_TOKEN: process.env.TAG_COOKIE_TOKEN,
    TAG_COOKIE_USER_LOGOUT: process.env.TAG_COOKIE_USER_LOGOUT,
    MICROSOFT_TENANT: process.env.MICROSOFT_TENANT,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
