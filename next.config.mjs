/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // 忽略在建構時的 ESLint 錯誤
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['cloudflare-ipfs.com', 'avatars.githubusercontent.com', '10.0.0.136', 'tutor-online.zeabur.app', 'boss-shad-deadly.ngrok-free.app', 'alive-lizard-eagerly.ngrok-free.app', 'tutor-online2024wb.uk']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default nextConfig
