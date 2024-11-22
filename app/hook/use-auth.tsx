import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppContext } from "../utils/providers";

export const useAuth = () => {
    const router = useRouter();
    const { setAuthState } = useAppContext();

    const signOut = async () => {
        try {
            // Uncomment and modify the following when implementing backend sign-out
            // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // });

            // if (!res.ok) {
            //     throw new Error();
            // }

            // Clear the authentication state
            setAuthState({ user: null, isAuthenticated: false });
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userId');

            // Show success message
            toast.success("Signed out successfully");

            // Redirect to sign-in page
            router.push('/sign-in');
            router.refresh(); // Optionally refresh the page
        } catch (error) {
            toast.error("Couldn't sign out, please try again.");
        }
    };

    return { signOut };
};
