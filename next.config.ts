/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bzgvskzsmbcgzpycfjux.supabase.co',
      }
    ]
  }
}

module.exports = nextConfig