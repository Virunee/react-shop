import { useNavigate } from 'react-router-dom'

import {BackgroundImage, Body, CategoryItemContainer} from './category-item.styles.jsx'

const CategoryItem = ({ category }) => {
    const { title, imageUrl, route} = category
    const navigate = useNavigate()

    const useNavigateHandler = () => navigate(route)

    return (
        <CategoryItemContainer onClick={useNavigateHandler}>
        <BackgroundImage
        imageUrl={imageUrl}
        />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
      </CategoryItemContainer>

    )
}

export default CategoryItem