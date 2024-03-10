import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishName, dishImage} = cartItemDetails
      const {dishQuantity, dishPrice} = cartItemDetails

      const onClickDecrement = () => {
        decrementCartItemQuantity(dishId)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(dishId)
      }
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      const totalPrice = dishPrice * dishQuantity

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                // eslint-disable-next-line react/no-unknown-property
                data-testid="minus"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={12} aria-label="close" />
              </button>
              <p className="cart-quantity">{dishQuantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                // eslint-disable-next-line react/no-unknown-property
                data-testid="plus"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={12} aria-label="close" />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {totalPrice}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            // eslint-disable-next-line react/no-unknown-property
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} aria-label="close" />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
