import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    const {email,password}= await request.json();


    const user = await prisma.user.findUnique({where: {email}});

    if(email !== 'admin' || password !== "admin"){
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }


    const token = generateToken(user);

    const response = NextResponse.json({
        message:"Login Successful",
        user:{id: 1, name: "admin"},
    })

    return response;

}