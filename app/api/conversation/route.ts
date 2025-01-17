import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!openai.apiKey) {
            return new NextResponse("OpenAI Key not configured", {status: 500})
        }

        if(!messages) {
            return new NextResponse("Messages are required", {status: 400})
        }

        const freetrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freetrial && !isPro) {
            return new NextResponse("Free trial has expired", {status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        })

        if(!isPro) {
            await increaseApiLimit()
        }
       

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}



