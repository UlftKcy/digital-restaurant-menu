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
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function SigninForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsDisabled(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response !== undefined && response.error !== null) {
        toast({
          variant: "destructive",
          description: `${response.error}`,
        });
        setIsDisabled(false);
      } else {
        toast({
          description: "You have successfully signed in",
        });
        router.push("/");
      }
    } catch (error) {
      throw new Error("Failed to signin user", { cause: error });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className="w-full block disabled:opacity-80" disabled={isDisabled}>
          {isDisabled ? <Loader2 size={16} className="mx-auto animate-spin" /> : "Signin"}
        </Button>
      </form>
    </Form>
  )
}
