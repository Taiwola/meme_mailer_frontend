import MaxWidthWrapper from "@/app/component/maxwidthwrapper";
import Link from "next/link";
import { Icons } from "@/app/component/icons";
import { useAppContext } from "../utils/providers";
import UserAcctNav from "./userNavAcct";


const NavBar = () => {
    const { authState, authToken } = useAppContext();
    const user = authState;
    console.log("from nav: ",authState);
    console.log(authToken);

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="h-18 w-10" />
                                </Link>
                            </div>

                            {/* Right-side Nav */}
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:space-x-6">
                                    {user.isAuthenticated === true ? (
                                        <>
                                            <UserAcctNav user={user} />
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/sign-in" className="text-gray-700">
                                                Sign in
                                            </Link>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <Link href="/sign-up" className="text-gray-700">
                                                Create account
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    );
};

export default NavBar;
