// Write your code here
import './index.css'

const TabItem = props => {
  const {tabDetails, setActiveTabId, isActive} = props
  const {menuCategoryId, menuCategory, categoryDishes} = tabDetails

  const onClickTab = () => {
    setActiveTabId(menuCategoryId, categoryDishes)
  }

  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'

  return (
    <li className="tab-item">
      <button type="button" onClick={onClickTab} className={tabBtnClassName}>
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
