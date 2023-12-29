import { authOptions } from "@/app/api/auth/options";
import { SigninForm } from "@/components/auth/signin/SigninForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Signin() {
    const session = await getServerSession(authOptions);

    return (
        !session ? (
            <div className="w-full h-screen flex flex-col justify-center items-center space-y-6">
                <Card className="space-y-6 sm:w-[350px]">
                    <CardHeader className="text-center">
                        <CardTitle className="text-red-500">Digital <span className="text-orange-400">Restaurant</span></CardTitle>
                        <CardDescription>Please signin to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SigninForm />
                    </CardContent>
                </Card>
                <div className="text-center">
                    <div>Do not you have an account?</div>
                    <Link href="/auth/register" className="font-bold text-slate-800 hover:text-slate-800/75 underline">Register</Link>
                </div>
            </div>
        ) : (
            redirect('/')
        )

    )
}