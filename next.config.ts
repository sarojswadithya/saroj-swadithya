import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local SVG banners. These are self-authored, not user-uploaded.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
