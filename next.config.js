/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swiperjs.com",
        port: "",
        pathname: "/demos/images/**",
      },
    ],
    domains: ["localhost"],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
