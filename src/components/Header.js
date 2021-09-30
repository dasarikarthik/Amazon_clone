import Image from 'next/image'
import {MenuIcon,SearchIcon,searchIcon,ShoppingCartIcon} from "@heroicons/react/outline" ;
import {signIn,signOut,useSession} from "next-auth/client";
import {useRouter} from "next/router"; 
import { selectItems } from '../slices/basketSlice';
import { useSelector } from 'react-redux';
function Header() {
    const [session]=useSession();
    const router=useRouter();
    const  items=useSelector(selectItems);
    return (
        <header>
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                onClick={()=>router.push("/")}
                    src="https://links.papareact.com/f90"
                    width={150}
                    height={40}
                    objectFit="contain"
                    className="cursor-pointer"
                />
                </div>
                {/* Search Bar*/}
                <div className="hidden sm:flex items-center cursor-pointer h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus-outline-none" type="text" />
                    <SearchIcon className="h-12 p-4"/>
                </div>
                {/*right side */}
                <div className="text-white flex items-center text-xs space-x-6 mx-4 whitespace-nowrap">
                <div className="link" onClick={!session ? signIn : signOut}>
                    <p> {session? `Hello! ${session.user.name}` : "SignIn"}</p>
                    <p className="font-extrabold md:text-sm"> Accounts and lists</p>

                </div>
                <div onClick={()=> router.push("/orders")} className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">&Orders</p>
                </div>
                
                <div onClick={()=>router.push("/checkout")} className=" relative flex items-center link">
                <span className="absolute right-0 md:right-10 top-0 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">{items.length}</span>
                <ShoppingCartIcon className="h-10"/>
                <p className="hidden font-extrabold md:text-sm  md:inline mt-2">basket</p>

                </div>

                </div>


            </div>

            {/*Bottom bar*/}
         <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
            <p className="link items-center flex">
                <MenuIcon className="h-6 mr-1" />
                All
            </p>
            <p className="link">Prime Video</p>
            <p className="link">Amazon Business</p>
            <p className="link">Today's Deals</p>
            <p className="link hidden lg:inline">Electronics</p>
            <p className="link hidden lg:inline">Food & Grocery</p>
            <p className="link hidden lg:inline">Prime</p>
            <p className="link hidden lg:inline">Buy Again</p>
            <p className="link hidden lg:inline">Shopper Toolkit</p>
            <p className="link hidden lg:inline">Health & Personal Care</p>

        </div>
        </header>
    )
}

export default Header
