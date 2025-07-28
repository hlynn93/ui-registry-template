import React from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

// @TODO: To add theme wrapper from the registry

export type ReactComponentBlockProps = {
  name: string;
  description: string;
  type: string;
  chidlren?: React.ReactNode;
};

function Preview({ name, description, type }: ReactComponentBlockProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{type}</p>
    </div>
  );
}

function CodeBlock({ name }: { name: string }) {
  return (
    <pre>
      <code>
        {`import { ${name} } from 'your-component-library';\n\n<${name} />`}
      </code>
    </pre>
  )
}

function ReactComponentBlock(args: ReactComponentBlockProps) {
  const {
    name,
    description,
    type,
    children,
  } = args;
  const [Example, Code, ...Children] = React.Children.toArray(
    children
  ) as React.ReactElement[]
  console.log(Example, Code, Children);
  return (
    <div>
      <Tabs items={["Preview", "Code"]}>
        <Tab>
          <Preview name={name} description={description} type={type} />
        </Tab>
        <Tab>
          <CodeBlock name={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ReactComponentBlock;
