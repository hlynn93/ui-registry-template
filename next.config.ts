import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
};

export default withMDX(nextConfig);
