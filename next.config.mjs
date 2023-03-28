import withPlugins from "next-compose-plugins";

import withBundleAnalyzer from "next-bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE || false
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "export"
};

export default withPlugins([bundleAnalyzer], nextConfig);
