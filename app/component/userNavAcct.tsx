'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAppContext } from "../utils/providers";
import { useAuth } from "../hook/use-auth";


type UserProps = {
    name?: string,
    email?: string
}

const UserAcctNav = ({user}: {user: any}) => {
    const {signOut} = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
            asChild
            className="overflow-visible"
            >
                <Button
                variant='ghost'
                size='sm'
                className="relative"
                >
                    my account
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-0.5 leading-none">
                                <p className="font-medium">{user.email}</p>
                        </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAcctNav;