import { defineField, defineType } from 'sanity';
import type { Rule as SanityRule } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Vault Article',
  type: 'document',

  // Organise fields into tabs in the studio editor
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO & Social' },
    { name: 'metadata', title: 'Metadata' },
    { name: 'connections', title: 'Connections' },
  ],

  fields: [
    // ════════════════════════════════════════
    // CONTENT TAB
    // ════════════════════════════════════════

    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      description: 'The main headline. Keep it compelling and under 70 characters for SEO.',
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
      },
      description: 'The URL path for this article. Auto-generated from title but you can edit it. Use lowercase, hyphens only, no spaces. e.g., "lost-libraries-of-timbuktu"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      description: 'Which vault category does this belong to?',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
      description: 'Who wrote this article? Leave blank to default to "Apotheosis of Knowledge"',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'A compelling summary shown on cards, search results, and social shares. Max 200 characters. This is your hook — make it count.',
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      of: [
        // ── Rich Text Block ──
        {
          type: 'block',
          styles: [
            { title: 'Normal Paragraph', value: 'normal' },
            { title: 'Heading 2 (Section Title)', value: 'h2' },
            { title: 'Heading 3 (Subsection)', value: 'h3' },
            { title: 'Heading 4 (Minor Heading)', value: 'h4' },
            { title: 'Block Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Superscript (for footnotes)', value: 'sup' },
            ],
            annotations: [
              // ── External Link ──
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'The full URL including https://',
                    validation: (Rule: SanityRule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                    description: 'External links should open in a new tab. Internal links should not.',
                  },
                  {
                    name: 'rel',
                    type: 'string',
                    title: 'Rel Attribute',
                    description: 'Leave blank for default (noopener noreferrer). Use "nofollow" for untrusted sources.',
                    options: {
                      list: [
                        { title: 'Default (noopener noreferrer)', value: '' },
                        { title: 'No Follow (nofollow noopener noreferrer)', value: 'nofollow' },
                        { title: 'Sponsored', value: 'sponsored' },
                      ],
                    },
                  },
                ],
              },
              // ── Internal Link (to another article) ──
              {
                name: 'internalLink',
                type: 'object',
                title: 'Link to Another Article',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    to: [{ type: 'article' }],
                    title: 'Article',
                    description: 'Select an article from the vault to link to',
                  },
                ],
              },
              // ── Footnote Reference ──
              {
                name: 'footnote',
                type: 'object',
                title: 'Footnote / Source Citation',
                fields: [
                  {
                    name: 'noteText',
                    type: 'text',
                    title: 'Footnote Text',
                    description: 'The source citation or footnote content. e.g., "Smith, J. (2019). African Kingdoms. Oxford Press. p. 142"',
                  },
                  {
                    name: 'sourceUrl',
                    type: 'url',
                    title: 'Source URL (optional)',
                    description: 'If the source is available online, add the link',
                  },
                ],
              },
            ],
          },
        },

        // ── Image Block (with full SEO control) ──
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text (Required for SEO)',
              description: 'Describe what the image shows. This is read by screen readers and used by Google Image Search. Be specific: "Benin Bronze plaque showing a warrior in ceremonial dress" not just "Bronze plaque"',
              validation: (Rule: SanityRule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Text displayed below the image. Use for attribution, context, or dates. e.g., "A Benin Bronze plaque, circa 16th century. Currently held at the British Museum."',
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Image Credit / Source',
              description: 'Who took or owns this image? e.g., "Photo: British Museum" or "Wikimedia Commons / CC BY-SA 4.0"',
            },
          ],
        },

        // ── Pull Quote Block ──
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Pull Quote (Highlighted Quote)',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Quote Text',
              description: 'A key sentence or passage to highlight visually. Pulls the reader in.',
              validation: (Rule: SanityRule) => Rule.required(),
            },
            {
              name: 'attribution',
              type: 'string',
              title: 'Attribution (optional)',
              description: 'Who said this? Leave blank if it is from the article itself.',
            },
          ],
          preview: {
            select: { title: 'text', subtitle: 'attribution' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return {
                title: title ? `"${title.slice(0, 60)}..."` : 'Pull Quote',
                subtitle: subtitle || 'No attribution',
              };
            },
          },
        },

        // ── Info Box / Callout ──
        {
          type: 'object',
          name: 'callout',
          title: 'Info Box / Callout',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Callout Type',
              options: {
                list: [
                  { title: 'Did You Know? (blue)', value: 'info' },
                  { title: 'Important Context (amber)', value: 'warning' },
                  { title: 'Source Note (gray)', value: 'note' },
                  { title: "Editor's Note (navy)", value: 'editor' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'heading',
              type: 'string',
              title: 'Callout Heading (optional)',
              description: 'e.g., "Did You Know?" or "Historical Context"',
            },
            {
              name: 'body',
              type: 'text',
              title: 'Callout Text',
              validation: (Rule: SanityRule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'heading', subtitle: 'body', type: 'type' },
            prepare({ title, subtitle, type }: { title?: string; subtitle?: string; type?: string }) {
              const icons: Record<string, string> = {
                info: 'i',
                warning: '!',
                note: '#',
                editor: '*',
              };
              return {
                title: `[${icons[type || 'note'] || ''}] ${title || 'Callout'}`,
                subtitle: subtitle?.slice(0, 80),
              };
            },
          },
        },

        // ── Divider / Section Break ──
        {
          type: 'object',
          name: 'divider',
          title: 'Section Divider',
          fields: [
            {
              name: 'style',
              type: 'string',
              title: 'Divider Style',
              options: {
                list: [
                  { title: 'Simple Line', value: 'line' },
                  { title: 'Three Dots', value: 'dots' },
                  { title: 'Space Only', value: 'space' },
                ],
              },
              initialValue: 'dots',
            },
          ],
          preview: {
            prepare() {
              return { title: '-- Section Divider --' };
            },
          },
        },
      ],
    }),

    // ════════════════════════════════════════
    // MEDIA TAB
    // ════════════════════════════════════════

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'The main image for this article. Appears on cards, social shares, and at the top of the article page. Recommended: 1200x630px for best social media display.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (Required for SEO)',
          description: 'Describe the image for screen readers and Google Image Search.',
          validation: (Rule: SanityRule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (shown below image on article page)',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Image Credit',
          description: 'e.g., "Photo: Wikimedia Commons / CC BY-SA 4.0"',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ════════════════════════════════════════
    // SEO & SOCIAL TAB
    // ════════════════════════════════════════

    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      group: 'seo',
      description: 'Override the page title for search engines. Leave blank to use the article title. Keep under 60 characters. Google truncates anything longer.',
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description Override',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Override the meta description for search engines. Leave blank to use the excerpt. Keep between 120-155 characters for best display in Google results.',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
      description: 'Additional keywords for this article. These supplement the tags. Think about what people would Google to find this article.',
    }),

    defineField({
      name: 'ogImage',
      title: 'Social Share Image Override',
      type: 'image',
      group: 'seo',
      description: 'Custom image for Facebook/Twitter/LinkedIn shares. Leave blank to use the featured image. Must be 1200x630px for best results.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'ogTitle',
      title: 'Social Share Title Override',
      type: 'string',
      group: 'seo',
      description: 'Custom title for social shares. Leave blank to use the article title. Can be more provocative/click-worthy than the SEO title.',
      validation: (Rule) => Rule.max(90),
    }),

    defineField({
      name: 'ogDescription',
      title: 'Social Share Description Override',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Custom description for social shares. Leave blank to use the excerpt.',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      group: 'seo',
      description: 'Only set this if the article was originally published elsewhere and you want to credit the original URL. Leave blank for articles original to AOK (which is almost always).',
    }),

    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Check this to prevent Google from indexing this article. Use only for drafts or test content that accidentally gets published.',
    }),

    // ════════════════════════════════════════
    // METADATA TAB
    // ════════════════════════════════════════

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'metadata',
      description: 'When this article was first published. Shown on the article page and used by Google for freshness ranking.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
      description: 'When the article was last significantly edited. Google favours recently updated content. Update this when you make meaningful changes (not typo fixes).',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      group: 'metadata',
      description: 'e.g., "10 min". Shown on cards and article pages.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sourceCount',
      title: 'Number of Sources Cited',
      type: 'number',
      group: 'metadata',
      description: 'How many sources are cited in this article. Shown as a trust badge on cards.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'metadata',
      description: 'Content tags for search and filtering. 3-6 tags recommended. e.g., "Benin Kingdom", "British colonialism", "art repatriation"',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      group: 'metadata',
      initialValue: false,
      description: 'Featured articles appear prominently on the vault homepage and the main site. Only 1-3 articles should be featured at a time.',
    }),

    defineField({
      name: 'depthTier',
      title: 'Research Depth',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Brief (under 5 min, light research)', value: 'brief' },
          { title: 'Investigation (5-12 min, moderate depth)', value: 'investigation' },
          { title: 'Deep Dive (12+ min, heavily sourced)', value: 'deep-dive' },
        ],
      },
      description: 'Indicates research intensity. Shown as a visual indicator on article cards.',
    }),

    // ════════════════════════════════════════
    // CONNECTIONS TAB
    // ════════════════════════════════════════

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles (The Thread)',
      type: 'array',
      group: 'connections',
      description: 'Link this article to related articles to create narrative chains. Readers see these at the bottom as "Continue the Thread".',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'article',
              type: 'reference',
              to: [{ type: 'article' }],
              title: 'Article',
            },
            {
              name: 'connectionReason',
              type: 'string',
              title: 'Connection Reason',
              description: 'Why are these connected? e.g., "Same region", "Connected event", "Parallel phenomenon"',
            },
          ],
          preview: {
            select: {
              title: 'article.title',
              subtitle: 'connectionReason',
            },
          },
        },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Published (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published (Oldest)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'featuredImage',
      date: 'publishedAt',
      featured: 'featured',
    },
    prepare({ title, category, media, date, featured }: {
      title?: string;
      category?: string;
      media?: unknown;
      date?: string;
      featured?: boolean;
    }) {
      return {
        title: `${featured ? '* ' : ''}${title || 'Untitled'}`,
        subtitle: `${category || 'No category'} · ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
        media: media as undefined,
      };
    },
  },
});
