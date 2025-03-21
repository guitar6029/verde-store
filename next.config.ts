import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zrjoqoqiqwdlhbqwvxwb.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Add the headers function here
  async headers() {
    return [
      {
        source: "/plants",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalidate=30",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
