'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'; // Import Suspense
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

export type Tformschema = z.infer<typeof formSchema>;

const FormComponent = () => {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email'); 
  const { register, handleSubmit, formState: { errors } } = useForm<Tformschema>({
    resolver: zodResolver(formSchema),
  });

  const onsubmit = async (value: Tformschema) => {
    const email = value.email;
    const newletterOwnerEmail = userEmail;
    const options = {
      email: email,
      newsletterOwnerEmail: newletterOwnerEmail,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/subscriber/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || res.statusText);
      } else {
        toast.success("You have subscribed successfully!");
        setTimeout(() => {
          window.location.replace('/success');
        }, 4000);
      }
    } catch (error) {
      toast.error("An error occurred while subscribing to the newsletter.");
      console.error("subscription error:", error);
    }
  };

  return (
    <div className='w-full flex flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='text-7xl pb-8 capitalize'>
          Behard Newsletter
        </h1>
      </div>
      <form className='flex w-full max-w-md border rounded overflow-hidden' onSubmit={handleSubmit(onsubmit)}>
        <Input
          type='email'
          {...register("email")}
          placeholder="Your@example.com"
          className={cn({ 'focus-visible:ring-red-500': errors.email })}
        />
        {errors?.email && (
          <p className="text-sm text-red-500"></p>
        )}
        <Button>Subscribe</Button>
      </form>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormComponent />
    </Suspense>
  );
}
