
import useWidth from '@/app/hooks/useWidth'
import { HiMiniBars3 } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import Dropdown from '@/app/components/Animation/dropdown'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const { width } = useWidth()
    const pathname = usePathname()

    

    const navMenu = [
        { title: "Why Tuana", url: '/why-tuana' },
        { title: "Docs", url: '/docs' },
        { title: "Tutorial", url: '/tutorial' },
        { title: "FAQ", url: '/faq' },
        { title: "Pricing", url: '/pricing' },
    ]

    if (width <= 1024) {
        return (
            <div className='w-full bg-main px-8 py-4 fixed z-20'>
                <div className='flex w-full justify-between'>
                    <div className='w-1/2 flex items-center justify-around'>
                        <div className='w-full'>
                            <Link href="/"> <img src="/tuana_medium_logo.png" alt="tuana_medium_logo.png" className='h-[40px]' /></Link>
                        </div>

                    </div>
                    <div className='w-1/2 flex items-center justify-end tracking-'>

                        <HiMiniBars3 className='text-stone-900 text-2xl' onClick={() => { setOpenMenu(!openMenu) }} />
                        <Dropdown isOpen={openMenu}>
                            <div className={`min-w-[220px] h-fit absolute border border-stone-900/20 top-14 -right-2 rounded-md shadow-xl bg-main`}>
                                <div className='w-full flex flex-col  px-6 py-8 gap-2'>
                                    <div className='w-full flex flex-col items-center gap-2'>
                                        <Link href="/login" className='text-lg min-w-32 text-center text-primary font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>Login</Link>
                                        <Link href="/sign-in" className='text-lg min-w-32 text-center text-main font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Sign In</Link>
                                    </div>
                                    <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  my-2' />
                                    <div className='text-lg font-medium flex flex-col gap-2 w-full items-start justify-center text-stone-900 '>
                                        {/* {
                                            navMenu.map((nav, index) => (
                                                <Link href={nav.url} key={index} className="w-full rounded-md px-4 py-2 bg-black/5">
                                                    <span className={`${pathname == nav.url ? "nav-active" : ""} font-dosis tracking-wider`}>{nav.title}</span>
                                                </Link>
                                            ))
                                        } */}





                                    </div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full bg-main px-8 py-4 fixed z-20'>
            <div className='flex w-full'>
                <div className='w-1/3 flex items-center justify-around'>
                    <div className='w-1/4'>
                        <Link href="/"> <img src="/tuana_medium_logo.png" alt="tuana_medium_logo.png" className='w-[90%]' /></Link>
                    </div>
                    <div className='w-1/4'>

                    </div>
                </div>
                <div className='w-1/3 flex items-center'>
                    <div className='text-1-5xl font-medium flex gap-8 w-full items-center justify-center '>
                        {
                            navMenu.map((nav, index) => (
                                <Link href={nav.url} key={index}>
                                    <span className={`${pathname == nav.url ? "nav-active" : ""} font-dosis tracking-wider text-primaryGray hover:text-stone-900 transition-all`}>{nav.title}</span>
                                </Link>
                            ))
                        }

                    </div>
                </div>

                <div className='w-1/3 flex items-center justify-end '>
                    <div className='w-fit flex items-center gap-5'>
                        <Link href="/login" className='text-xl text-center text-primary font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>Login</Link>
                        <Link href="/sign-up" className='text-xl text-center text-main font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Sign up</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar