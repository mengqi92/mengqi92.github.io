import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    // show remote images
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.mengqi.life',
                port: ''
            },
        ],
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
}

export default withContentlayer(nextConfig);