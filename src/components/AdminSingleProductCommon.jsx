/* Component Author Andrea */

import { AdminOrderProduct } from "./AdminOrderProduct";

export function AdminSingleProductCommon({ children, product, refresh, type }) {
  return (
    <div className="flex flex-col items-center admin-products-list admin-single-product">
      <h1 className="admin-single-product-name">
        {product.series ? product.series : product.name}
      </h1>
      <div className="flex flex-col justify-between items-center admin-products-list-container">
        <div className="flex justify-center single-image-container">
          {product.image && <img
            src={"http://localhost:3000" + product.image}
            alt="Product Image"
          />}
          </div>
        <div className="flex flex-col justify-between products-container">

          <div className="admin-product-line">
            <p>Type: {product.type}</p>
          </div>

          {children}

          <div className="flex flex-col justify-between admin-product-line admin-single-product-price">
            <p>{`Original Price: ${product.originalPrice} $`}</p>
            <p
              className={product.discount === null ? "product-no-discount" : ""}
            >
              {product.discount === null ? "No Discount" : "Discounted Price:"}{" "}
              {product.discount && (
                <span className="product-discount">{product.discount} $</span>
              )}
            </p>
          </div>
          <div className="flex flex-col admin-product-line">
            <div className="flex justify-between stock-names">
              <p>Stock</p>
              <p>Ordered</p>
            </div>
            <AdminOrderProduct product={product} refresh={refresh} type={type}/>
          </div>
        </div>
      </div>
    </div>
  );
}
