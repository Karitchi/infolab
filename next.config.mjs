import { createProxyMiddleware } from 'http-proxy-middleware';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/calendar',
        destination: 'https://outlook.office365.com/owa/calendar/9d490f6291574ed794b57fe9d33e3fd2@students.ephec.be/87d23e0576a549a888ac627d182ca85c15461609017930916619/calendar.ics',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/calendar',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;