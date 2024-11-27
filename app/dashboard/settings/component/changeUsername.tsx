import React from 'react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type Iformschema = z.infer<typeof formSchema>;


export default function ChangeUsername() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iformschema>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (data: Iformschema) => {
    console.log('here');
    const token = localStorage.getItem('token');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const userId = localStorage.getItem('userId');

    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      toast.error(response.message || 'An error occurred');
      return;
    }
    toast.success(response.message);
    localStorage.setItem('username', response.user.name);
    window.location.reload();
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Change Name</CardTitle>
        <CardDescription>Change your account name.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register('name')}
              />
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name.message}</div>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="submit" className="bg-[#831743]">
              Submit
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </>
  );
}
