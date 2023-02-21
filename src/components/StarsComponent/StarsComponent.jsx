import React, { useState } from 'react'
import {AiFillStar, AiOutlineStar} from "react-icons/ai"



const StarsComponent = () => {

  const [star,setStar]  = useState(0);


  return (
    <div>
      {star >=1 ? <AiFillStar onClick={()=>setStar(1)}/> : <AiOutlineStar onClick={()=>setStar(1)}/>}
      {star >=2 ? <AiFillStar onClick={()=>setStar(2)}/> : <AiOutlineStar onClick={()=>setStar(2)}/>}
      {star >=3 ? <AiFillStar onClick={()=>setStar(3)}/> : <AiOutlineStar onClick={()=>setStar(3)}/>}
      {star >=4 ? <AiFillStar onClick={()=>setStar(4)}/> : <AiOutlineStar onClick={()=>setStar(4)}/>}
      {star >=5 ? <AiFillStar onClick={()=>setStar(5)}/> : <AiOutlineStar onClick={()=>setStar(5)}/>}
    </div>
  )
}

export default StarsComponent
