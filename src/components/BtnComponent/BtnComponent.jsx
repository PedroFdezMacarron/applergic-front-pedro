import React from 'react';
import "./BtnComponent.scss";

export function BtnBlue({showText}) { 
    return (    
      <input className='btn btn--blue' type="submit" value={showText}/>
    )
} 

export function BtnGrey({showText}) {
    return (    
      <input className='btn btn--grey' type="submit" value={showText}/>
    )
}

