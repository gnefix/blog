import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [ sitemap(), vue()],
  image: {
    remotePatterns: [{ protocol: "https" }],
    domains: ["images8.alphacoders.com"],
  }
});