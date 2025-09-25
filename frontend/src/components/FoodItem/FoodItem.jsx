import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id = "", name = "Unknown", price = 0, description = "No description available", image = "" }) => {
    const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Debugging: Check if props are being received correctly
    // console.log("FoodItem Props:", { id, name, price, description, image });

    // Fallback UI if id is missing
    if (!id) {
        return <p className="error-message">Error: Food item data is missing</p>;
    }

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url ? `${url}/images/${image}` : assets.placeholder_image} alt={name} />

                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
