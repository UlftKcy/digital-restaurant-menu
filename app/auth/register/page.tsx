import { authOptions } from "@/app/api/auth/options";
import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Register() {
    const session = await getServerSession(authOptions);
    return (
        !session ? (
            <div className="w-full h-screen flex flex-col justify-center items-center space-y-6">
                <Card className="space-y-6 sm:w-[350px]">
                    <CardHeader className="text-center">
                        <CardTitle className="text-red-500">Digital <span className="text-orange-400">Restaurant</span></CardTitle>
                        <CardDescription>Please register to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
                <div className="text-center">
                    <div>Do you have an account?</div>
                    <Link href="/auth/signin" className="font-bold text-slate-800 hover:text-slate-800/75 underline">Sign In</Link>
                </div>
            </div>
        ) : (
            redirect('/')
        )

    )
}