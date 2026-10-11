import { defineType, defineField } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Platillo del Menú Digital",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
      options: {
        list: [
          { title: "Mamma Roma (Pastas & Cocina Tradicional)", value: "mamma-roma" },
          { title: "Sette Colli (Pizzas Artesanales)", value: "sette-colli" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nombre del Platillo",
      type: "string",
      description: "Ej. Fettuccine ai Funghi Porcini, Pizza Margherita Verace",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Entradas", value: "Entradas" },
          { title: "Pastas", value: "Pastas" },
          { title: "Pizzas", value: "Pizzas" },
          { title: "Pizzas Clásicas", value: "Pizzas Clásicas" },
          { title: "Pizzas de Autor", value: "Pizzas de Autor" },
          { title: "Calzones", value: "Calzones" },
          { title: "Postres", value: "Postres" },
          { title: "Bebidas", value: "Bebidas" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio en Quetzales (GTQ)",
      type: "number",
      description: "Ej. 95 (se mostrará como Q95)",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Fotografía en Alta Calidad",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Recomendado: formato JPG/PNG/WebP, proporción cuadrada o 4:3",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción e Ingredientes",
      type: "text",
      rows: 3,
      description: "Detalla la preparación, origen de insumos y acompañamientos",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Etiqueta Destacada (Opcional)",
      type: "string",
      description: "Ej. 'Chef Choice', 'Imperdible', 'Top Seller', 'Masa Madre'",
    }),
    defineField({
      name: "isGlutenFree",
      title: "¿Opción Sin Gluten?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isVegetarian",
      title: "¿Apto para Vegetarianos?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isSpicy",
      title: "¿Platillo Picante?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isAvailable",
      title: "¿Disponible en Menú?",
      type: "boolean",
      initialValue: true,
      description: "Desmarca si el plato se agotó temporalmente",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      price: "price",
      brand: "brand",
      media: "image",
    },
    prepare({ title, subtitle, price, brand, media }) {
      const brandLabel = brand === "sette-colli" ? "🍕 Sette Colli" : "🍝 Mamma Roma";
      return {
        title: `${title} - Q${price}`,
        subtitle: `${brandLabel} • ${subtitle}`,
        media,
      };
    },
  },
});
