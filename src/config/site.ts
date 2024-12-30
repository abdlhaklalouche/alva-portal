export const siteConfig = {
  name: "Alva Portal",
  backend: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export type SiteConfig = typeof siteConfig;
