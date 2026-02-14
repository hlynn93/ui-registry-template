// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "aui/example-form.mdx": () => import("../content/docs/aui/example-form.mdx?collection=docs"), "aui/index.mdx": () => import("../content/docs/aui/index.mdx?collection=docs"), }),
};
export default browserCollections;