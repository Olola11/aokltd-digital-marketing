import { type SchemaTypeDefinition } from 'sanity';

import { article } from './article';
import { category } from './category';
import { author } from './author';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, category, author],
};
