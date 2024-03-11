import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'
import TabItem from '../TabItem'

class Home extends Component {
  state = {
    allDishes: [],
    displayData: [],
    restName: '',
    activeTabId: 0,
    cartItems: [], // Array to store items in the cart
  }

  componentDidMount() {
    this.getAllDishesData()
  }

  getAllDishesData = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      console.log(response)
      const data = await response.json()

      // console.log('data : ', data)

      const array = data.map(each => ({
        tableMenuList: each.table_menu_list,
        restaurantName: each.restaurant_name,
      }))

      const totalDetails = array[0]
      const {tableMenuList, restaurantName} = totalDetails
      this.setState({restName: restaurantName})

      const format = tableMenuList.map(each => ({
        categoryDishes: each.category_dishes.map(each1 => ({
          dishId: each1.dish_id,
          dishQuantity: 0,
          dishName: each1.dish_name,
          dishAvailability: each1.dish_Availability,
          dishCurrency: each1.dish_currency,
          dishType: each1.dish_Type,
          dishCalories: each1.dish_calories,
          dishImage: each1.dish_image,
          dishPrice: each1.dish_price,
          dishDescription: each1.dish_description,
          nexturl: each1.nexturl,
          addonCat: each1.addonCat,
          // ...
        })),
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nexturl: each.nexturl,
      }))
      // console.log('format:-->', format)
      const single = format[0]
      const activeId = single.menuCategoryId
      const {categoryDishes} = single
      // this.setState({displayData: categoryDishes})
      this.setState({
        allDishes: format,
        activeTabId: activeId,
        displayData: categoryDishes,
      })
    }
  }

  setActiveTabId = (tabId, dishesDet) => {
    this.setState({activeTabId: tabId, displayData: dishesDet})
  }

  updateDecrementCount = dishId => {
    this.setState(prevState => ({
      displayData: prevState.displayData.map(dish => {
        if (dish.dishId === dishId) {
          return {
            ...dish,
            dishQuantity: dish.dishQuantity > 1 ? dish.dishQuantity - 1 : 0,
          }
        }
        return dish
      }),
    }))
  }

  updateIncrementCount = dishId => {
    this.setState(prevState => ({
      displayData: prevState.displayData.map(dish => {
        if (dish.dishId === dishId) {
          return {
            ...dish,
            dishQuantity: dish.dishQuantity + 1,
          }
        }
        return dish
      }),
    }))
  }

  addToCart = dish => {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, dish],
    }))
  }

  renderRestaurantDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {displayData, cartItems} = this.state
        console.log('cartItems : ', cartItems)
        const {addCartItem} = value
        const onClickAddToCart = dish => {
          this.addToCart(dish)
          addCartItem(dish)
        }
        return (
          <ul className="list-con">
            {displayData.map(each => (
              <li key={each.dishId} className="app-item">
                <div>
                  <p className="app-name">{each.dishName}</p>
                  <p>
                    {each.dishCurrency} {each.dishPrice}
                  </p>
                  <p>{each.dishDescription}</p>
                  {each.dishAvailability ? (
                    <div>
                      <div className="button-custom">
                        <button
                          type="button"
                          className="button-class"
                          onClick={() => this.updateDecrementCount(each.dishId)}
                        >
                          -
                        </button>
                        <p className="button-text">
                          {each.dishQuantity /* Display count here */}
                        </p>
                        <button
                          type="button"
                          className="button-class"
                          onClick={() => this.updateIncrementCount(each.dishId)}
                        >
                          +
                        </button>
                      </div>
                      {each.dishQuantity > 0 ? (
                        <button
                          type="button"
                          className="button add-to-cart-btn"
                          onClick={() => onClickAddToCart(each)}
                        >
                          ADD TO CART
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                  {each.addonCat.length > 0 ? (
                    <p className="custom-text">Customizations available</p>
                  ) : null}
                </div>
                <div>
                  <p className="claories-text">{each.dishCalories} calories</p>
                </div>
                <img
                  className="app-image"
                  src={each.dishImage}
                  alt={each.dishName}
                />
              </li>
            ))}
          </ul>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {allDishes, restName, activeTabId, cartItems} = this.state
    const {displayData} = this.state
    console.log('allDishes : ', allDishes)
    console.log('displayData : ', displayData)
    const cartItemsCount = cartItems.length

    return (
      <>
        <div className="container">
          <div className="header-container">
            <Link to="/">
              <h1 className="header-heading">{restName}</h1>
            </Link>

            <div className="cart-container">
              <p className="header-txt">My Orders</p>
              <Link to="/cart" className="cart">
                <button type="button" data-testid="cart">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                    alt="nav cart"
                    className="nav-bar-img"
                  />
                </button>
              </Link>
              {/* <AiOutlineShoppingCart className="cart" /> */}
              <p className="cart-text">{cartItemsCount}</p>
            </div>
          </div>
          <ul className="tabs-list">
            {allDishes.map(eachTab => (
              <TabItem
                key={eachTab.menuCategoryId}
                tabDetails={eachTab}
                setActiveTabId={this.setActiveTabId}
                isActive={activeTabId === eachTab.menuCategoryId}
              />
            ))}
          </ul>
          {this.renderRestaurantDetails()}
          <p>Details of restaurants</p>
        </div>
      </>
    )
  }
}

export default Home
