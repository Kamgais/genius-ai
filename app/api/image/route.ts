import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import OpenAI from "openai";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {prompt, amount = "1" , resolution = "512x512"} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!openai.apiKey) {
            return new NextResponse("OpenAI Key not configured", {status: 500})
        }

        if(!prompt) {
            return new NextResponse("prompt is required", {status: 400})
        }

        if(!amount) {
            return new NextResponse("amount is required", {status: 400})
        }

        if(!resolution) {
            return new NextResponse("resolution is required", {status: 400})
        }

        const freetrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freetrial && !isPro) {
            return new NextResponse("Free trial has expired", {status: 403})
        }


        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount,10),
            size: resolution
        })

        if(!isPro) {
            await increaseApiLimit()
          }

        return NextResponse.json(response.data);
    } catch (error) {
        console.log("[IMAGE_ERROR]",error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}



