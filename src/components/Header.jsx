import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/parking-icon-png-10873.png'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-gray-800">
            <div className="pt-1 mx-auto px-6 md:px-32 lg:px-48">
                <nav className="flex flex-col sm:flex-row items-center justify-between py-2  space-y-4 sm:space-y-0">
                    {/* <div className='flex'> */}
                        <img className=" relative z-10 " src={logo} width={'10%'} alt="logo image" />
                        {/* <h1 className='text-white text-xl font-roboto ps-2'>Your Parking <span className='text-blue-400'>sporter</span></h1> */}
                    {/* </div> */}

                    <div className="hidden text-white xl:flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-2 sm:space-y-0">
                        <Link to='/'><a className="hover:text-blue-400 hover:cursor-pointer">ADD VEHICLE</a></Link>
                        <Link to='/find'><a className="hover:text-blue-400 hover:cursor-pointer">FIND VEHICLE</a></Link>
                        <Link to='/checkout'><a className="hover:text-blue-400 hover:cursor-pointer">CHECKOUT</a></Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="xl:hidden text-white text-3xl"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </nav>

                <div
                    className={`fixed top-0 right-0 w-3/4 sm:w-1/3 h-full bg-gray-800 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        } z-50`}
                >
                    <div className="p-5">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-3xl"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <nav className="flex flex-col items-start space-y-10 p-5 text-white">
                        <Link to='/'><a onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">ADD VEHICLE</a></Link>
                        <Link to='/find'><a onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">FIND VEHICLE</a></Link>
                        <Link to='/checkout'><a onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">CHECKOUT</a></Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;
