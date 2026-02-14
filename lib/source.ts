// .source folder will be generated when you run `next dev`
import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});