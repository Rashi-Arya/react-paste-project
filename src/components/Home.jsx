import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addTopaste, updateTopaste } from '../redux/pasteSlice';
import Paste from './Paste';
const Home = () => {

    const [title, setTitle] = useState('');
    const [value,setValue]= useState('');
    const [searchParams,setSearchparams]=useSearchParams();
   const pasteId = searchParams.get("pasteId");
const dispatch= useDispatch();
const allPastes = useSelector((state)=>state.paste.pastes);

useEffect(()=>{
    console.log("inside use effect");
    if(pasteId){
        const paste=allPastes.find((p)=>p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);

    }
   
},[pasteId])
   function createPaste(){
    const paste={
        title:title,
        content:value,
        _id:pasteId ||
        Date.now().toString(36),
        createdAt:new Date().toISOString(),

    }
    
    if(pasteId){
        //update
        dispatch(updateTopaste(paste));
    }
    else{
        //create
        dispatch(addTopaste(paste));
    }

    //AFTER CREATION OR UPDATION

    setTitle('');
    setValue('');
    setSearchparams({});

   }
    return (
       <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input
                className=' flex flex-row p-2 rounded-2xl mt-2 w-[67%] pl-4'
                type='text'
                placeholder='enter title here'
                value={title}
                onChange={(e) => setTitle(e.target.value)}

            >
            </input>
            <button className= 'flex  flex-row p-2 rounded-2xl mt-2'
            onClick={createPaste}>
                {
                    pasteId ?"Update My Paste" : "Create My Paste"
                }
            </button>
        </div>
        <div>
            <textarea
            className='rounded-2xl min-w-[600px]  min-h-[500px] p-4 mt-5' row={60} value={value} onChange={(e)=>setValue(e.target.value)} 
            placeholder='enter content here'
            ></textarea>
       
        </div>
        </div>
    )
}

export default Home
