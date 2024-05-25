## La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior) ✅

`http://localhost:5000/api/products`

`http://localhost:5000/api/products?limit=2`

## La ruta GET /:pid deberá traer sólo el producto con el id proporcionado ✅

`http://localhost:5000/api/products/2`

## La ruta raíz POST / deberá agregar un nuevo producto con los campos: ✅

`http://localhost:5000/api/products`

`{
    "title": "Product 4",
    "description": "Description 4",
    "code": "P0004",
    "price": 10,
    "status": true,
    "stock": 100,
    "category": "category4",
    "thumbnail": "/img/product4.jpg"
  }
 `

## Todos los campos son obligatorios, a excepción de thumbnails ✅

## La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización. ✅

`http://localhost:5000/api/products/1`

`{
    "description": "Description modified",
    "price": 110
}
`

## La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.✅

`http://localhost:5000/api/products/4`

## Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

## La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura: ✅

`http://localhost:5000/api/carts`

- Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
- products: Array que contendrá objetos que representen cada producto

## La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados. ✅

`http://localhost:5000/api/carts/2`

## La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato: ✅

- product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
- quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

## Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.✅

`http://localhost:5000/api/carts/2/product/3`

## La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información. ✅
