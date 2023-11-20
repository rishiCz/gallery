"use client"

import { createSlice } from "@reduxjs/toolkit"
import { imageObjInterface } from "@/app/schemas";

export interface activeImageState {
    isActive: boolean,
    image:imageObjInterface
}

const initialState : {isActive: boolean, image:imageObjInterface, imageID:string,isSidebarOpen:boolean} = {
    isActive: false,
    image:{
        imageLink: "",
        label: [""],
        id: "" ,
        cid:""    
    },
    imageID: "",
    isSidebarOpen:false,    
}

export const activeImageSlice = createSlice({
    name: 'activeImage',
    initialState,
    reducers:{
        setUpdate: (state)=> {
            state.isActive = !state.isActive
        },
        removeActiveImage: (state)=> {
            state.image = initialState.image
            state.isActive = false
        },
        setActiveId: (state,action) =>{
            state.imageID = action.payload
        },
        setIsOpen: (state,action)=>{
            state.isSidebarOpen = action.payload
        }
    }
})

export const {setUpdate,removeActiveImage,setActiveId,setIsOpen} = activeImageSlice.actions
export default activeImageSlice.reducer