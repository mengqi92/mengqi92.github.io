import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    async rewrites() {
        return [
            // 这个规则会匹配所有类似于 /2015/10/06/complex 的路径
            // 并将它们重定向到 /complex
            {
                source: '/:year/:month/:day/:slug',
                destination: '/:slug', // 被重写到的新地址
            },
        ]
    },

    // show remote images
    images: {
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