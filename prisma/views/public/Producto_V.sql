SELECT
  "Producto".id,
  "Producto".nombre,
  "Producto".descripcion,
  "Producto".precio,
  "Producto".stock,
  "Producto"."createdAt",
  "Producto".imagen,
  "Producto"."categoriaId",
  "Categoria".nombre AS categoria_nombre
FROM
  (
    "Producto"
    JOIN "Categoria" ON (("Categoria".id = "Producto"."categoriaId"))
  );