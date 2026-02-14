import type { Metadata } from "next";
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import "./globals.css";

import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // you can use Tailwind CSS too
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "UI Horizontal Registry",
  description: "UI Horizontal Registry is a collection of shadcn/ui components created by xyz.",
};
