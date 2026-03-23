import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Vault')
    .items([
      S.documentTypeListItem('article').title('Vault Articles'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['article', 'category', 'author'].includes(item.getId()!),
      ),
    ]);
