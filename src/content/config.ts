import {defineCollection, z} from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		lastUpdated: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		banner: z.string().optional()
	}),
});

export interface Post {
	slug: string;
	data: {
		title: string;
		description: string;
		lastUpdated: Date;
		banner: string
	}
}

export const collections = { blog };
