"use client"
import {Icons} from "@/app/component/icons"
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TAuthcredentialsValidator, AuthCredentialsValidator} from "@/lib/validators/account-credentials"

import {toast} from "react-hot-toast";
import {useRouter} from 'next/navigation'
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/api/auth/route";

const Page = () => {

    const isError = false;
    const router = useRouter();

    const { register, handleSubmit, formState: {errors} } = useForm<TAuthcredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    });

    const mutate = useMutation({
        mutationFn: registerUser,
        onSuccess: (data: any) => {
            toast.success('Registration successful!');
          },
          onError: (error: any) => {
            toast.error(`Registration failed: ${error.message}`);
            console.error('Error during registration:', error);
          },
    });

    const onSubmit = async ({ name, email, password }: TAuthcredentialsValidator) => {
        const data = { name, email, password };
            // Call mutateAsync and handle the response
            const response = await mutate.mutateAsync(data);
            console.log("from onsubmiut: ",response);
    };

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
                            Create an account
                        </h1>

                        <Link href='/sign-in' className={buttonVariants({
                            variant: 'link',
                            className: "gap-1.5"
                        })}>
                            Already have an account? sign-in
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='name'>Full Name</Label>
                                    <Input className={cn({'focus-visible:ring-red-500': errors.name})} type="text" placeholder="Your Name"
                                    {...register('name')} />
                                    {errors?.name && (
                                        <p className="text-sm text-red-500"></p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='email'>Email</Label>
                                    <Input className={cn({'focus-visible:ring-red-500': errors.email})} type="email" placeholder="Your@emaxaple.com"
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
                            <Button>Sign up</Button>
                        </form>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Page;