"use client"

import React, { useState, useRef, useLayoutEffect } from 'react'
import Navbar from "./components/navbar";
import Head from "next/head";
import Blog from "./components/Blog";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'

const getBlogs = async (pg:any) => {
  try {
    const res = await axios.get(`https://blogtst.vercel.app/api/all?pg=${pg}`)
    return res.data
  } catch (error) {
    console.error("Error fetching data:", error)
    return []
  }
};

const Home = () => {
  const [pg, setPg] = useState(0)
  const [blogs, setBlogs]:any = useState([])
  const [blockDimensions, setBlockDimensions]:any = useState({})

  const fetchMoreBlogs = async () => {
    const nextPage = pg + 1
    const newBlogs = await getBlogs(nextPage)

    if (newBlogs.length === 0) {
      setPg(-1)
    } else {
      setBlogs((prevBlogs:any) => [...prevBlogs, ...newBlogs])
      setPg(nextPage);
    }
  };

  const infiniteScrollRef = useRef(null)
  React.useEffect(() => {
    fetchMoreBlogs()
  }, [])

  useLayoutEffect(() => {
    const updateBlockDimensions = () => {
      const blocks:any = document.getElementsByClassName('blog-block')
      const dimensions:any = {};
      for (let i = 0; i < blocks.length; i++) {
        const block:any = blocks[i];
        const rect:any = block.getBoundingClientRect();
        dimensions[i] = {
          width: rect.width,
          height: rect.height,
        };
      }
      setBlockDimensions(dimensions)
    };

    updateBlockDimensions()

    window.addEventListener('resize', updateBlockDimensions)

    return () => {
      window.removeEventListener('resize', updateBlockDimensions)
    }
  }, [blogs])

  console.log("test", blogs)

  return !blogs ? (
    <>Loading</>
  ) : (
    <div className="w-full h-auto">
      <Navbar/>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreBlogs}
          hasMore={pg !== -1} 
          loader={<h4 className='text-center'>Loading...</h4>} 
          endMessage={<h4>No more items to load.</h4>} 
          scrollThreshold={0.9} 
          style={{
            width: "100%",
          }}
          ref={infiniteScrollRef}
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
  )
}

export default Home