SELECT
  c.id,
  c.nombre,
  count(p.id) AS productosenstock
FROM
  (
    "Categoria" c
    LEFT JOIN "Producto" p ON (
      (
        (c.id = p."categoriaId")
        AND (p.stock > 0)
      )
    )
  )
GROUP BY
  c.id,
  c.nombre;