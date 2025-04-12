import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/svgs/favicon.svg";

const PublicHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-blue-900 px-4 lg:px-24 py-3 sticky top-0 z-50 shadow-md">
            <nav aria-label="Global" className="flex w-full items-center justify-between">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center">
                        <span className="sr-only">Edutect Morelos</span>
                        <img src={logo} className="h-8 w-auto"/>
                        <span className="text-xl uppercase text-white font-bold ml-3">ALEX</span>
                    </Link>
                </div>
                <div className="flex md:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className={`size-6 ${mobileMenuOpen ? "hidden" : ""}`} />
                    </button>
                </div>
                <div className="hidden md:flex md:flex-1 md:justify-end">
                    <Link to="/login" className="text-sm/6 font-semibold text-white">
                        Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 px-4 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Edutect Morelos</span>
                            <img className="h-8 w-auto" src={logo}/>
                            <span className="text-xl ml-3 uppercase text-white font-bold">ALEX</span>
                        </Link>
                        <button type="button" onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6">
                                <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-blue-700"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Iniciar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default PublicHeader;
