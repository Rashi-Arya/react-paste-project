import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFrompaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router';


const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) => paste?.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(id) {

    if (id) {
      dispatch(removeFrompaste(id)); // Only dispatch if ID is valid
    } else {
      console.error("Invalid ID for delete");
    }
  }
  async function handleShare(paste) {
    const urlToShare = `${window.location.origin}/paste/${paste._id}`; // Construct URL

    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: urlToShare,
        });
        console.log('Shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for unsupported browsers
      console.log(`Share this link manually: ${urlToShare}`);
      alert(`Copy this link to share: ${urlToShare}`);
    }
  }





  return (
    <div>

      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'

        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className='flex flex-col gap-5 mt-5'>
        {
          filterData.length > 0 &&
          filterData.map(
            (paste) => {
              return (
                <div className='border py-3' key={paste?._id} >
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>

                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                    </button>
                    <button>
                      <Link to={`/paste/${paste?._id}`}>View</Link>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clipboard")

                    }}>
                      copy
                    </button>
                    <button onClick={() => handleShare(paste)}>
                      share
                    </button>
                  </div >
                  <div>
                  </div>
                  {paste.createdAt}

                </div>
              )

            }
          )


        }

      </div>


    </div>
  )
}


export default Pastes
