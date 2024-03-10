// Write your code here
import React from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const AppItem = props => {
  const {
    dishDetails,
    updateCartDecrementCount,
    updateCartIncrementCount,
    quantity,
  } = props
  const {
    dishId,
    dishName,
    dishAvailability,
    dishImage,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishCalories,
    addonCat,
  } = dishDetails

  const handleIncrement = () => {
    updateCartIncrementCount(quantity)
  }

  const handleDecrement = () => {
    updateCartDecrementCount(quantity)
  }

  return (
    <li className="app-item">
      <div>
        <p className="app-name">{dishName}</p>
        <p>
          {dishCurrency} {dishPrice}
        </p>
        <p>{dishDescription}</p>
        {dishAvailability ? (
          <div className="button-custom">
            <button
              type="button"
              className="button-class"
              onClick={handleDecrement}
            >
              -
            </button>
            <p className="button-text">{quantity /* Display count here */}</p>
            <button
              type="button"
              className="button-class"
              onClick={handleIncrement}
            >
              +
            </button>
            {quantity > 0 ? (
              <button type="button" className="button add-to-cart-btn">
                ADD TO CART
              </button>
            ) : null}
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
        {addonCat.length > 0 ? (
          <p className="custom-text">Customizations available</p>
        ) : null}
      </div>
      <div>
        <p className="claories-text">{dishCalories} calories</p>
      </div>
      <img className="app-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default AppItem
