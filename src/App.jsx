import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home';
import Paste from './components/Paste';
import Viewpaste from './components/Viewpaste';
import Navbar from './components/Navbar';


const ErrorPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/" style={{ textDecoration: 'none', color: 'blue' }}>Go back to Home</a>
  </div>
);
const  router = createBrowserRouter(
  [
    {
      path: "/",
      element:(
        <div>
         <Navbar></Navbar>
          <Home></Home>
        </div>
      ),
 errorElement: <ErrorPage />,
    },
    {
      path: "/pastes",
      element:(
        <div>
          <Navbar></Navbar>
            <Paste></Paste>
        </div>
      ),
      errorElement: <ErrorPage />,
    },
    
    {
      path: "/paste/:id",
      element:(
        <div>
          <Navbar></Navbar>
          <Viewpaste></Viewpaste>
        </div>
    
      ),
      errorElement: <ErrorPage />,

    },
    
{
  path:"*",
  element:<ErrorPage></ErrorPage>,
},


  ]
);
function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    
   
    </>
   
  )
};

export default App
