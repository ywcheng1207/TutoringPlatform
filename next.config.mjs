/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 忽略在建構時的 ESLint 錯誤
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['cloudflare-ipfs.com', 'avatars.githubusercontent.com']
  }
}

export default nextConfig
