/*Component author Massimo*/
import React from "react";
import { Button } from "./Button";
import {useFetch} from "../custom-hooks/useFetch"
import {useLocalUser} from "../custom-hooks/useLocalUser"
const ProductCard = ({ name, description, originalPrice, discount, imageUrl, onClick , id}) => {
    const {user} = useLocalUser()
    const [onAddCart , addData , addError  ] = useFetch("cart/add/user/" + user.id , "POST" )
    
    async function handleAddCart(){
        await onAddCart({gearId: id })
        
        if(addError){
            alert(addError)
            throw new Error(addError)
        }
        
        alert(` Item ${name} added to cart`)

    }
    return (
        <div className="product-card" onClick={onClick}>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>
                <span className="original-price">Original Price: $ {originalPrice}</span></p>
               <p> <span className="discount"> Discount: $ {discount}</span>
            </p>
            <div className="bottonecard " onClick={(event)=>{event.stopPropagation() 
                handleAddCart()}
                 } >
            <Button className="bottone" text={"Add to Cart"} />
            </div>
           
        </div>
    );
};

export default ProductCard;
