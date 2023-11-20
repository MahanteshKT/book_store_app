import React from "react";
import ProductItem from "./ProductItem";

function ProductList(props) {
  console.log(props.books.length);
  return (
    <div className={`${props.className || ""} `}>
      {props.books.length === 0 && (
        <h2 className="text-xl font-medium">No Book Found.</h2>
      )}
      {props.books?.length === 0
        ? ""
        : props.books?.map((each) => (
            <ProductItem key={each._id} book={{ ...each }} />
          ))}
    </div>
  );
}

export default ProductList;
