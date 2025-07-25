import analyzer from '@next/bundle-analyzer';
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: [
			'github.com',
			'img.clerk.com',
			`${process.env.VERCEL_BLOB_USER_ID}.public.blob.vercel-storage.com`,
			`jxavqwzcp5avqdlx.public.blob.vercel-storage.com`,
		],
	},
	// https://github.com/yjs/yjs/issues/438#issuecomment-2239984668
	remotePatterns: [
		{
			protocol: 'https',
			hostname: 'img.clerk.com',
		},
	],
};

const withBundleAnalyzer = analyzer({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
