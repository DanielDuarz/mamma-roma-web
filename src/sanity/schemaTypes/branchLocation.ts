import { defineType, defineField } from "sanity";

export const branchLocation = defineType({
  name: "branchLocation",
  title: "Sucursal y Restaurante",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
      options: {
        list: [
          { title: "Mamma Roma", value: "mamma-roma" },
          { title: "Sette Colli", value: "sette-colli" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nombre de la Sucursal",
      type: "string",
      description: "Ej. Mamma Roma - Flamingo Histórico, Sette Colli - Paseo Cayalá",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Dirección Completa",
      type: "string",
      description: "Ej. Plaza Flamingo - 8a Avenida, 5-17 - Zona 1",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zone",
      title: "Zona / Sector",
      type: "string",
      description: "Ej. Zona 1, Centro Histórico / Zona 16, Cayalá",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Teléfono Directo de la Sucursal",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Directo de la Sucursal",
      type: "string",
      description: "Número al que ingresarán los mensajes de esta sucursal (ej. 50254707177)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Horario de Atención",
      type: "string",
      description: "Ej. Lun - Dom: 12:00 PM a 10:00 PM",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Enlace Directo de Google Maps",
      type: "url",
      description: "URL para abrir la ubicación en la app de Google Maps",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "wazeUrl",
      title: "Enlace Directo de Waze",
      type: "url",
      description: "URL de navegación en Waze (ej. https://waze.com/ul?q=...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "URL de Inserción (Google Maps Embed)",
      type: "url",
      description: "URL segura de iframe embed para mostrar el mapa interactivo en la tarjeta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Calificación Promedio (Estrellas)",
      type: "number",
      initialValue: 4.8,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "reviewsCount",
      title: "Cantidad de Reseñas",
      type: "number",
      initialValue: 150,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      brand: "brand",
    },
    prepare({ title, subtitle, brand }) {
      return {
        title,
        subtitle: `${brand === "sette-colli" ? "🍕 Sette Colli" : "🍝 Mamma Roma"} • ${subtitle}`,
      };
    },
  },
});
