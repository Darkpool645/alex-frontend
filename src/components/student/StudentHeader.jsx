import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import logo from "@/assets/svgs/favicon.svg";
import { useAuth } from "@/context/AuthContext";

const StudentHeader = () => {
    const { logout } = useAuth();
    return (
        <Disclosure as="nav" className="bg-blue-900">
            <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center gap-3">
                            <img alt="ALEX Logo" src={logo} className="size-8" />
                            <h1 className="text-3xl text-white font-bold">ALEX</h1>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-hidden"
                                        onClick={logout}>
                                        Cerrar Sesión
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};

export default StudentHeader;