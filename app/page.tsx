import { GetServerSideProps, GetStaticProps } from 'next'
import Navbar from "./components/navbar"
import Head from "next/head"
import Blog from "./components/Blog"
import axios from 'axios'

const getBlogs = async () => { 
  try {
    const res = await axios.get("http://localhost:3001/api/all")
    return res.data
  } catch (error) {
    console.error("Error fetching data:", error);
    return []
  }
}


const Home = async () => {
  const blogs = await getBlogs()
  console.log("test", blogs);
  return !blogs ? (<>Loading</>) :  (
    <div className="w-full h-screen bg-white ">
      <Navbar />
      <section className="w-full h-auto m-auto flex items-center justify-center text-center pt-10 flex-wrap gap-y-10">
        {
          blogs.map((blog:any, index:any) => {
            return (
              <Blog key={index} Data={blog} />
            )
          }
          )
        }
      </section>
      <br/><br/>
    </div>
  )
}

export default Home