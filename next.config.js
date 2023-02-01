/** @type {import('next').NextConfig} */
const nextConfig = {
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
