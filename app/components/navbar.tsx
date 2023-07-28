

import Link from "next/link";
const Navbar = () =>{
    return (
        <header className="w-full h-auto flex items-center border-b">
            {
                //logo

            }

            <nav className=" h-auto flex items-center p-5">
                <Link href={"/"} className="font-bold text-xl text-[#555]">
                    Randomize 
                </Link>
            </nav>

            <nav className="flex items-center justify-center gap-3 pt-0.5">
                <Link href={"/"} className="text-[#555]">Home</Link>
                <Link href={""} className="text-[#555]">Archive</Link>
                <Link href={""} className="text-[#555]">Blogs</Link>
                <Link href={""} className="text-[#555]">Contact Us</Link>
                <Link href={""} className="text-[#555]">About</Link>
            </nav>
        </header>
    )
}

export default Navbar