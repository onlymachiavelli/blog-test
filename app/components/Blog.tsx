import Image from "next/image"
import Link from "next/link"
const Blog = ({...props}) =>{
    const linkHref = props.Data ? `/by/${props.Data.id}` : '';
    return (
        <div className="w-1/2 flex items-center justify-center h-auto flex-col">

           <Link href={linkHref} className="w-full  flex items-center justify-center h-auto flex-col">
           <Image
                alt={"things"}
                src={props.Data ? props.Data.image : "Loading"}
                width={600}
                height={300}
                className="rounded-xl shadow-lg w-10/12 hover:w-11/12 max-w-10/12  duration-500  hover:w-550 hover:h-550"
            />

            <p className="w-full text-left pl-20 p-5 text-[#6d1e72] font-semibold">{props.Data ? props.Data.category : "Loading"}</p>

            <p className="w-full text-left pl-20  text-[#222] font-semibold">{props.Data ? props.Data.title : "Loading"}</p>
        
            <div className="w-full h-auto flex items-center pl-20 gap-3 mt-5">
                <Image
                    alt={"things"}
                    src={props.Data ? props.Data.avatar : "Loading"}
                    width={30}
                    height={30}
                    className="rounded-full"
                />

                <p className="text-bold text-sm text-[#ccc]">{props.Data ? props.Data.username : "Loading Name"}  At {props.Data ? props.Data.date : "Loadingf Date"}</p>
            </div>
           </Link>
        </div>
    )
}

export default Blog