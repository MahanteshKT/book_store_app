import React, { useContext, useEffect } from "react";
import classes from "./Cart.module.css";
import Model from "../UI/Model/Model";
import CartItems from "./CartItems";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice/ui-slice";
import { cartAction } from "../../store/cart-slice/cart-slice";
import {
  addtolocalStorage,
  deletLocalStorage,
} from "../../services/localStorage";

const initialState = {
  TotalAmount: 0,
  items: [],
  totalQuantity: 0,
  changed: false,
  action: "",
};

const Cart = (props) => {
  const { items, totalQuantity, TotalAmount, ...other } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    console.log("add");
    addtolocalStorage("cart-slice", {
      items,
      totalQuantity,
      TotalAmount,
      ...other,
    });
  }, [items]);
  const { showCart } = useSelector((state) => state.ui);
  //   const ctx = useContext(context);
  const dispatch = useDispatch();

  const AddItemHandler = (products) => {
    products = {
      ...products,
      amount: 1,
    };
    dispatch(cartAction.CartAddItemHandler(products));
    //   ctx.onAddCart(products);
  };

  const RemoveItemHandler = (_id) => {
    //   ctx.onDeleteCart(id);
    dispatch(cartAction.CartRemoveItemHandler({ id: _id }));
  };
  console.log(items, TotalAmount, totalQuantity);
  const CartBooks = (
    <ul className={classes["cart-items"]}>
      {!items.length == 0 &&
        items.map((product) => (
          <>
            <CartItems
              key={product._id}
              CartItem={product}
              onAdd={AddItemHandler.bind(null, product)}
              onRemove={RemoveItemHandler.bind(null, product._id)}
            />
          </>
        ))}
    </ul>
  );

  const OrderItemsHandler = () => {
    console.log("Ordering......");
    deletLocalStorage("cart-slice");
    dispatch(cartAction.EmptyCart());
    dispatch(uiAction.showCartHandler());
  };

  const onHideCart = (e) => {
    e.preventDefault();
    dispatch(uiAction.showCartHandler());
    //   ctx.onshowCart();
  };

  return (
    <Model onClick={onHideCart}>
      <ul className={classes.cartList}>
        {CartBooks ? (
          CartBooks
        ) : (
          <h2 className="text-center capitalize font-medium text-xl">
            Cart is Empty
          </h2>
        )}
      </ul>
      <div className={classes.total}>
        <h3>Total Amount</h3>
        <span>
          {`\u20B9`}
          {TotalAmount.toFixed(2)}
        </span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onHideCart}>
          Close
        </button>
        {items?.length >= 0 && (
          <button className={classes["button"]} onClick={OrderItemsHandler}>
            Order
          </button>
        )}
      </div>
    </Model>
  );
};

export default Cart;
