import React, { Component, useEffect, useState } from 'react';
import { postLogin, postOrders } from '../../api/index';
import { Link, Redirect } from 'react-router-dom';

export default function Order(){
    
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [errors, setErrors ] = useState();
    
    const handleNameChange = (e: any) =>{
        let target = e.target.value;
        setName(target);
    }

    const handleAddressChange = (e: any) =>{
        let target = e.target.value;
        setAddress(target);
    }

    const sumbitOrder = async (e:any) =>{
        e.preventDefault();
        const result = await postOrders(name, address);
        setErrors(result);
        
    }

    const showErrors = () =>{
        
        if(errors !== undefined){
            let array = [];
            for(let i = 0; i< errors.length; i++){
                array.push(<p key={i}>{errors[i].field},{errors[i].message}</p>)
            }
         return array;   
        }
        
    }
    


    return ( 
    <div>
        <h2>Senda inn pöntun</h2>
        {showErrors()}
        <form onSubmit={sumbitOrder}>
        <label htmlFor="name">Nafn:</label>
        <input autoComplete="off"  type="text" name="name" onChange={handleNameChange} />
        <br/>
        <label >Heimilisfang:</label>
        <input autoComplete="off" type="text" name="adress" onChange={handleAddressChange}/>
        <button>Senda inn pöntun</button>
        </form>
    </div>
     )

}