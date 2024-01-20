import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Login, authorHome, filter, getUpdatedUrl, myLibraryUrl, profileUrl, trendingUrl } from '../../../util/constants';

const navigationObj = [
    { name: 'Home', link: '/home', current: false },
    { name: 'Updated', link: getUpdatedUrl, current: false },
    { name: 'Trending', link: trendingUrl, current: false },
    { name: 'My Library', link: myLibraryUrl, current: false },
    { name: 'Community', link: '/community', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
//-----------------------------------------------------------
export default function Header() {

    const [isAuthor, setIsAuthor] = useState(false);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Logout?',
            text: "Do you want to Logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user-login");
                navigate('/');
            }
        })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'));
        if (!user) {
            navigate(Login)
        } else {
            setIsAuthor(user.isAuthor)
        }
    }, [])

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-12 w-auto hover:animate-spin"
                                        src="/assets/logo/webLogo.png"
                                        alt="ThePeakFiction"
                                    />
                                    <p className='text-white mx-3 font-medium'>ThePeakFiction</p>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-5 mt-1">
                                        {navigationObj.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.link}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <Link to={filter}>
                                <button className='text-white btn bg-blue-500 pl-4 pr-4 p-1 rounded-lg
                                hover:bg-blue-700'>
                                    <i className="fa-solid fa-circle-nodes"></i> Filter
                                </button>
                            </Link>


                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <i className="fa-regular fa-user fa-xl text-white"></i>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to={profileUrl}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            {
                                                isAuthor ? <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to={authorHome}
                                                            className={classNames(active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            WorkShop
                                                        </Link>
                                                    )}
                                                </Menu.Item> : ''
                                            }

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <p
                                                        className={classNames(active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                        onClick={handleLogout}
                                                    > Sign out </p>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigationObj.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="Link"
                                    onClick={() => navigate(item.link)}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}