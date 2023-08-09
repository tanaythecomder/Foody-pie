import React, { useRef, useState,useEffect } from "react";
import { useCartDispatch, useCartState } from "./ContextReducer";


export default function Card(props) {
  let dispatch = useCartDispatch();
  let data = useCartState()
  let options = props.options
  let priceOptions = Object.keys(options);
  
  const priceRef = useRef()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("");
useEffect(()=>{
  setSize(priceRef.current.value)
},[]) 

const handleAddToCart = async () => {
  let food = []
  for (const item of data) {
    if (item.id === props.items._id) {
      food = item;

      break;
    }
  }
  console.log(food)
  console.log(new Date())
  if (food != []) {
    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: props.items._id, price: finalPrice, qty: qty })
      return
    }
    else if (food.size !== size) {
      await dispatch({ type: "ADD", id: props.items._id, name: props.items.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
      console.log("Size different so simply ADD one more to the list")
      return
    }
    return
  }

  await dispatch({ type: "ADD", id: props.items._id, name: props.items.name, price: finalPrice, qty: qty, size: size })


  // setBtnEnable(true)

}
let finalPrice = qty * parseInt(props.options[size]);
  return (
    <div>
      <div className="card mt-3" style={{width: "18rem", maxHeight:"360px"}} >
        <img src={props.items.img} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.items.name}</h5>
          {/* <p className="card-text">{props.description}</p> */}
          <div className="container w-100 col ">
            <select className="d-inline m-2 h-100  bg-muted rounded" onChange={(e)=>setQty(e.target.value)} >
                {Array.from(Array(6), (e,i) =>{
                    return (
                        <option value={i+1}> {i+1}</option>
                    )
                })}
            </select>
            <select className=" m-2 h-100  bg-muted rounded" ref = {priceRef} onChange={(e)=>setSize(e.target.value)}>
                {
                  
                  priceOptions.map((data)=>{
                    return <option key = {data} value = {data} > {data}</option>
                  })
                }
            </select>
            <div className='h-100 fs-5'>Price = ${finalPrice}  {}</div>
            <hr />
            <button className="btn btn-primary justify-center ms-2" onClick={handleAddToCart}> Add to Cart</button>

          </div>
        </div>
      </div>
    </div>
  );
}
