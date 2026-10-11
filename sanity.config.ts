import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Mamma Roma & Sette Colli - CMS Administrativo",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mamma-roma-group",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/admin",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
