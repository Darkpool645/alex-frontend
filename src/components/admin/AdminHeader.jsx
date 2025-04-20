import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/assets/svgs/favicon.svg";
import { Link } from "react-router-dom";



const AdminHeader = () => {
    const navigation = [
        { name: "Panel General", href: "/admin", current: true },
        { name: "Exámenes", href: "/exams", current: false },
        { name: "Docentes", href: "/teachers", current: false }
    ];
    return (
        <Disclosure as="nav" className="bg-blue-900">
            <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 focus:outline-hidden">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link to="/admin" className="flex shrink-0 items-center gap-3">
                            <img alt="ALEX Logo" src={logo} className="size-8" />
                            <h1 className="text-3xl text-white font-bold">ALEX</h1>
                        </Link>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={`rounded-md px-3 py-2 text-sm font-medium text-white ${item.current ? "bg-blue-700" : "bg-blue-900 hover:bg-blue-700"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="relative rounded-full bg-blue-900 p-1 text-white focus:outline-none">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-8" />
                        </button>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-300 text-sm focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <div className="size-8 rounded-full flex items-center justify-center font-medium text-black">
                                        AC
                                    </div>
                                </MenuButton>
                            </div>
                            <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-black/5 transition focus:outline-hidden data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 daa-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in">
                                <MenuItem>
                                    <Link to="admin/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-hidden">
                                        Ver perfil
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="admin/settings" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-hidden">
                                        Configuraciones
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-hidden">
                                        Cerrar Sesión
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton key={item.name} as={Link} to={item.href} aria-current={item.current ? 'page' : undefined}
                            className={`block rounded-md px-3 py-2 text-base font-medium text-white ${item.current ? 'bg-blue-700' : 'bg-blue-900 hover:bg-blue-700'}`}>
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default AdminHeader;