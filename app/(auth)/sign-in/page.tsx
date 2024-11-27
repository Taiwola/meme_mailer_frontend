"use client"
import {Icons} from "@/app/component/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {TAuthcredentialsValidator, AuthCredentialsValidator} from "@/lib/validators/account-credentials"
import {toast} from "react-hot-toast";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import {useMutation}  from "@tanstack/react-query";
import { useAppContext } from "@/app/utils/providers";
import { useAuth } from "@/app/hook/use-auth";

const Page = () => {
    const {loginIn} = useAuth();

    const isError = false;
    const router = useRouter();
    const {setAuthState, setToken} = useAppContext()

    const { register, handleSubmit, formState: {errors} } = useForm<TAuthcredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    });

    const mutate = useMutation({
        mutationFn: loginIn,
        onSuccess: async (data) => {
            setAuthState({user: data.user, isAuthenticated: true});
            setToken(data.token);
            localStorage.setItem('token',data.token);
            localStorage.setItem('isAuthenticated', "true");
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("username", data.user.name);
            localStorage.setItem("useremail", data.user.email);
            toast.success("Login was successfull");
            router.push('/dashboard')
        },
        onError: async (error) => {
            toast.error(`Login failed: ${error.message || 'An error occurred'}`);
            console.error('Error during login:', error);
        }
    })

    const onSubmit = ({email, password}: TAuthcredentialsValidator ) => {
        mutate.mutate({email, password})
    }

    if (isError) {
        toast.error(
            'something went wrong'
        )
    }

    return (
        <>
        <div className="container mb-4 relative flex flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20" />
                        <h1 className="text-2xl font-bold">
                            Sign in to your account;
                        </h1>

                        <Link href='/sign-up' className={buttonVariants({
                            variant: 'link',
                            className: "gap-1.5"
                        })}>
                            Don&apos;t have an account? sign-up
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='email'>Email</Label>
                                    <Input className={cn({'focus-visible:ring-red-500': errors.email})} type="email" placeholder="Your@example.com"
                                    {...register('email')} />
                                    {errors?.email && (
                                        <p className="text-sm text-red-500"></p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='password'>Password</Label>
                                    <Input {...register('password')} className={cn({'focus-visible:ring-red-500': errors.password})} type="password" placeholder="Enter your password" />
                                    {errors?.password && (
                                        <p className="text-sm text-red-500">Password is too short</p>
                                    )}
                                </div>
                            </div>
                            <Button>Sign in</Button>
                        </form>

                        {/* <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border"/>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            or 
                                        </span>
                                    </div>
                        </div>
                        <Button variant='secondary' disabled={isLoading}>
                                continue as customer
                            </Button> */}
                    </div>
            </div>
        </div>
        </>
    )
}

export default Page;