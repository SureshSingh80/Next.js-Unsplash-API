"use client"
import { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

  const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
  

  const [data,setData] = useState([]);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [notFound,setNotFound]=useState(false);

  useEffect(() => {
       setData([]);
    },[])

  const handleChange = (e) => {
    setQuery(e.target.value);
  }
  

  const handleSearch = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res= await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&client_id=${API_KEY}`);
      const result = await res.json();
    
      if(result.total === 0){
        setNotFound(true);
        setLoading(false);
        setData([]);
        console.log("No result found");
        return;
      }else{
        setNotFound(false);
        setLoading(false);
        setData(result.results);
        console.log(result);
           
      }
      
    } catch (error) {
        setError(true);
        setLoading(false);
       console.log("Error in fetching data");
    }
    
  }
  
  const goToHome = () => {
    window.location.href = '/';
  }
  {console.log("Errors= ",error)}
  return (
    
  <div>
      <div className=" bg-pink-300 p-3 flex justify-start  fixed top-0 left-0 right-0 z-50">
        
         <div className="mr-[5%] text-pink-600"><HomeIcon onClick={goToHome} className="text-2xl cursor-pointer"></HomeIcon></div>

         <div style={{}} className="flex flex-col  w-[100%]  ">
            <form onSubmit={handleSearch} className="flex justify-center items-center">
             <input  onChange={handleChange} className="border-pink-400 border-2 mx-2 rounded  max-w-2xl w-full       text-pink-600 outline-none  sm:text-xl  pl-2" placeholder="Find/Search Images" type="text"></input>                   
             <button onClick={handleSearch} className="bg-pink-500 px-3 py-1 rounded text-white cursor-pointer">Search</button>           
            </form>
         </div>
        
      </div>
      {
         loading ?
         <div className="flex justify-center items-center h-screen">
            <CircularProgress />
         </div>
         : error ?
         <div className="flex justify-center  items-center h-screen">
            <h1 className="text-2xl text-red-500 font-bold">Error in fetching Image</h1>
         </div>
         : 
         data?.length ? (<div className="image-container">
                    {data.map((item) => (
                      <div key={item.id} className="">
                        <a href={item.urls.raw} target="_blank" >
                          <img style={{width:'300px', height:'300px',objectFit:'cover'}}  className="rounded-lg"  src={item.urls.raw} alt={item.alt_description} />
                        </a>
                        <a href={item.urls.raw}  target="_blank" >
                          <button  className="bg-blue-500 w-full mt-2 text-white rounded-full cursor-pointer">Download <DownloadIcon></DownloadIcon></button>
                        </a>
                      </div>
                    ))}
                   
               </div>)
         
            :notFound?
            <div className=" mt-12 w-[100%] h-[100%] absolute flex flex-col  justify-center items-center">
             
              <h1 className="text-2xl text-black font-bold mt-5 italic">No Image found !!</h1>
              <img className="mt-2" style={{objectFit:'contain'}} src="https://www.shutterstock.com/image-vector/vector-flat-illustration-confused-people-600nw-2154797767.jpg" alt="unsplash" ></img>
        
            </div>:
            (
          <div className="flex flex-col justify-center items-center mt-12 bg-pink-200  rounded-lg absolute w-[100%] h-[100%] z-0">
             <h1 className="text-xl  text-center font-bold mt-5 italic">Search and Download Image here...</h1>
             <img className="mt-2" style={{objectFit:'contain'}} src="https://static.beebom.com/wp-content/uploads/2019/05/Best-Reverse-Image-Search-Engines-Apps-and-Uses-2020.jpg?w=750&quality=75" alt="unsplash" ></img>
          </div>
           )
      
      }
     
     
      
  </div>
    
  );
}
