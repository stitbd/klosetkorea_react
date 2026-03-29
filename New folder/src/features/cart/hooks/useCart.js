import { useDispatch, useSelector } from "react-redux";
import {
  addItem, removeItem, updateQty, clearCart,
  openDrawer, closeDrawer, toggleDrawer,
  selectCartItems, selectCartTotal, selectCartCount, selectCartDrawerOpen,
} from "../cartSlice";

/**
 * useCart — single hook that exposes the full cart API to any component.
 *
 * @example
 *   const { items, total, addToCart, removeFromCart } = useCart();
 */
const useCart = () => {
  const dispatch = useDispatch();

  return {
    // State
    items:      useSelector(selectCartItems),
    total:      useSelector(selectCartTotal),
    count:      useSelector(selectCartCount),
    drawerOpen: useSelector(selectCartDrawerOpen),

    // Actions
    addToCart:      (product)          => dispatch(addItem(product)),
    removeFromCart: (productId)        => dispatch(removeItem(productId)),
    changeQty:      (productId, qty)   => dispatch(updateQty({ productId, qty })),
    emptyCart:      ()                 => dispatch(clearCart()),
    openCart:       ()                 => dispatch(openDrawer()),
    closeCart:      ()                 => dispatch(closeDrawer()),
    toggleCart:     ()                 => dispatch(toggleDrawer()),
  };
};

export default useCart;
