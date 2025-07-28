'use client'

import React, { Suspense } from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

// @TODO: To add theme wrapper from the registry

export type ComponentBlockProps = {
  name: string;
  description: string;
  type: string;
  path: string
};

type PreviewProps = {
  path: string;
  type?: string
}

function Preview({ path, type }: PreviewProps) {
  const Component = React.lazy(
    async () => {
      const mod = await import(`@/registry/${path}`);
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object')

      return { default: mod.default || mod[exportName ?? ''] }
    }
  )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        type === "block" ? (
          // handle block preview later
          <Component />
        ) : (
          <Component />
        )
      }
    </Suspense>
  );
}

function CodeView({ name }: { name: string }) {
  return (
    <DynamicCodeBlock
      lang="ts"
      code={
`import { ${name} } from 'your-component-library';

<${name} />`
  }
    />
  )
}

function ComponentBlock(args: ComponentBlockProps) {
  const {
    name,
    type,
    path,
    // children,
  } = args;
  // const [Example, Code, ...Children] = React.Children.toArray(
  //   children
  // ) as React.ReactElement[]
  // console.log(Example, Code, Children);
  return (
    <div>
      <Tabs items={["Preview", "Code"]}>
        <Tab className="flex justify-center direction-row items-center">
          <Preview type={type} path={path} />
        </Tab>
        <Tab>
          <CodeView name={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ComponentBlock;
