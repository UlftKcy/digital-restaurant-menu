"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleType } from "@/types"

const roles :RoleType[]= [
  {
    name:"Admin",
    value:"admin",
  },
  {
    name:"User",
    value:"user",
  }
]

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role:z.string({
    required_error: "Role is required",
  }),
})

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsDisabled(true);

    const formData = { ...values};

    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Unable to register",
          });
        }
        return response.json();
      })
      .then(() => {
        toast({
          description: "You have successfully registered",
        });
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        });
      })
      .catch(() => {
        throw new Error("Failed to register user");
      })
      .finally(() => {
        setIsDisabled(false);
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Role</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {roles.map((role: RoleType) => (
                        <SelectItem key={role.value} value={role.value} className="capitalize">{role.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
          )}
        />
        <Button type="submit" className="w-full block disabled:opacity-80" disabled={isDisabled}>
          {isDisabled ? <Loader2 size={16} className="mx-auto animate-spin" /> : "Register"}
        </Button>
      </form>
    </Form>
  )
}
