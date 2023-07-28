

import * as React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from './../../components/navbar'
import Image from 'next/image'
import Head from 'next/head'
//dynamic route 

const getBlog = async (id:any) =>{
    try {
        const res:any = await axios.get("http://localhost:3001/api/by?id="+id)
        return res.data
    }catch(e){
        console.log(e)
        return "nothing"
    }
    
}

const Blogger = async ({params} : any) =>{
    const blog : any = await getBlog(params.id)
    return typeof blog ==='string' || blog==="nothing" ?(<div className='w-full h-screen flex items-center justify-center'>NO BLOG WITH THAT ID</div>) :  (
        <div className='w-full h-auto '>
            <Head>
                <title>{blog.title}</title>
            </Head>
            <Navbar/>

            <div className='p-10 w-full'>
                <h3 className='text-center text-[#6d1e72] font-semibold'>
                    {
                        blog.category
                    }
                </h3>

                <h1 className='text-[#333] font-bold text-3xl text-center p-5'>
                    {
                        blog.title
                    }
                </h1>


                    <div className='flex gap-3 m-auto w-full h-auto items-center justify-center pb-10'>
                            <Image
                            alt={"things"}
                            src={blog.avatar}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />

                        <div>
                            <p className='text-sm'>{blog.username}</p>
                            <p className='text-sm text-[#747373]'>{blog.date}</p>
                        </div>
                    </div>
                <div className='flex m-auto w-auto'>

                    <Image
                        src={blog.image}
                        alt={blog.title}

                        width ={800}
                        height={300}
                        className='m-auto rounded '
                    />
                </div>

                <p className='w-3/5 m-auto mt-10 text-xl'>
                    {
                        blog.text
                    }
                </p>
            </div>
        </div>
    )
}

export default Blogger