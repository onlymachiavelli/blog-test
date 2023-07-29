"use client"

import React, { useState, useRef, useLayoutEffect } from 'react';
import Navbar from "./components/navbar";
import Head from "next/head";
import Blog from "./components/Blog";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const getBlogs = async (pg:any) => {
  try {
    const res = await axios.get(`https://blogtst.vercel.app/api/all?pg=${pg}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Home = () => {
  const [pg, setPg] = useState(0);
  const [blogs, setBlogs]:any = useState([]);
  const [blockDimensions, setBlockDimensions]:any = useState({}); // Store width and height of each block

  const fetchMoreBlogs = async () => {
    const nextPage = pg + 1;
    const newBlogs = await getBlogs(nextPage);

    // Check if the API response is empty, and if it is, set hasMore to false
    if (newBlogs.length === 0) {
      setPg(-1); // Set pg to a value that indicates there are no more items to fetch
    } else {
      setBlogs((prevBlogs:any) => [...prevBlogs, ...newBlogs]);
      setPg(nextPage);
    }
  };

  // Create a ref to track the InfiniteScroll container
  const infiniteScrollRef = useRef(null);
  React.useEffect(() => {
    // Fetch first set of elements
    fetchMoreBlogs();
  }, []);

  // Use useLayoutEffect to check the dimensions of each block after rendering
  useLayoutEffect(() => {
    const updateBlockDimensions = () => {
      const blocks:any = document.getElementsByClassName('blog-block');
      const dimensions:any = {};
      for (let i = 0; i < blocks.length; i++) {
        const block:any = blocks[i];
        const rect:any = block.getBoundingClientRect();
        dimensions[i] = {
          width: rect.width,
          height: rect.height,
        };
      }
      setBlockDimensions(dimensions);
    };

    // Call the function after the render is committed to the screen
    updateBlockDimensions();

    // Listen for window resize events to update block dimensions if needed
    window.addEventListener('resize', updateBlockDimensions);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateBlockDimensions);
    };
  }, [blogs]); // Run this effect whenever the blogs state changes

  console.log("test", blogs);

  return !blogs ? (
    <>Loading</>
  ) : (
    <div className="w-full h-auto">
      <Navbar/>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreBlogs}
          hasMore={pg !== -1} // Set to false when there are no more items to fetch
          loader={<h4 className='text-center'>Loading...</h4>} // Loading indicator shown while new data is being fetched
          endMessage={<h4>No more items to load.</h4>} // Message shown when all items have been loaded
          scrollThreshold={0.9} // Percentage of the scrollable area that triggers the next fetch
          style={{
            width: "100%",
          }}
          ref={infiniteScrollRef} // Assign the ref to the InfiniteScroll container
        >
          <div className="w-full  m-auto flex flex-wrap gap-y-10">
            {blogs.map((blog:any, index:any) => (
              <Blog
                key={index}
                Data={blog}
                style={{
                  width: blockDimensions[index]?.width,
                  height: blockDimensions[index]?.height,
                }}
              />
            ))}
          </div>
        </InfiniteScroll>
    </div>
  );
};

export default Home;
