'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "../hook/use-auth";
import { useRouter } from "next/navigation"; // Use `next/navigation` for client-side routing

interface AuthState {
    user: {
        _id: string,
        name?: string,
        email?: string
    } | null; // Allow user to be either an object or null
    isAuthenticated: boolean;
}

const UserAcctNav = ({ user }: { user:AuthState }) => {
    const { signOut } = useAuth();
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path); // Dynamically navigate to the specified path
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                >
                    My Account
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium">{user.user?.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => handleNavigation("/dashboard")}
                    className="cursor-pointer"
                >
                    Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer"
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAcctNav;
