import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { addTopaste, updateTopaste } from '../redux/pasteSlice';
import Paste from './Paste';
const Viewpaste = () => {
  const {id} =useParams();
  const allpastes=useSelector((state)=>state.paste.pastes);
  const paste =allpastes.filter((p)=>p._id===id)[0];
  console.log("final paste",paste);
  return(
    <div>
    <div className='flex flex-row gap-7 place-content-between'>
        <input
            className=' flex flex-row p-2 rounded-2xl mt-2 w-[67%] pl-4'
            type='text'
            placeholder='enter title here'
            value={paste.title}
            onChange={(e) => setTitle(e.target.value)}

        >
        </input>

    </div>
    <div>
        <textarea
        className='rounded-2xl min-w-[600px]  min-h-[500px] p-4 mt-5' row={60} value={paste.content} onChange={(e)=>setValue(e.target.value)} 
        placeholder='enter content here'
        ></textarea>
   
    </div>
    </div>
  )


}

export default Viewpaste
