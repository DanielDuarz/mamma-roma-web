import { defineType, defineField } from "sanity";

export const sauceProduct = defineType({
  name: "sauceProduct",
  title: "Salsa Envasada Mamma Roma",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Frasco",
      type: "string",
      description: "Ej. Sugo Preparato alla Napoletana, Preparato al Pesto Genovese",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "italianName",
      title: "Nombre en Italiano / D.O.P.",
      type: "string",
      description: "Ej. Sugo alla Napoletana D.O.P.",
    }),
    defineField({
      name: "netWeight",
      title: "Peso Neto",
      type: "string",
      initialValue: "400g e",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio en Quetzales (GTQ)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Fotografía del Frasco / Presentación",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción y Notas de Sabor",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ingredients",
      title: "Lista de Ingredientes",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "pairing",
      title: "Maridaje Sugerido",
      type: "string",
      description: "Ej. Ideal para spaghetti, tagliatelle y polenta",
    }),
    defineField({
      name: "badge",
      title: "Etiqueta Destacada",
      type: "string",
      initialValue: "100% Natural • Sin Preservantes",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "netWeight",
      price: "price",
      media: "image",
    },
    prepare({ title, subtitle, price, media }) {
      return {
        title: `${title} - Q${price}`,
        subtitle: `Frasco ${subtitle}`,
        media,
      };
    },
  },
});
