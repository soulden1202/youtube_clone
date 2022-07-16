/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "imgur.com",
      "i.ibb.co",
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
