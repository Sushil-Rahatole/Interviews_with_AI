import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET(){
    return Response.json({success: true, data: 'Thank You!'}, {status:200})
}

export async function POST(request: Request){
    console.log(request);
    const { type, role, level, techStack, amount , userid} = await request.json();

    try{
        const { text: questions } = await generateText({
            model: google('gemini-2.0-flash'),
            prompt: `Prepare questions for a job interview.
                    The job role is ${role}.
                    The job experience level is ${level}.
                    The tech stack used in the job is: ${techStack}.
                    The focus between behavioural and technical questions should lean towards: ${type}.
                    The amount of questions required is: ${amount}.

                    Please return ONLY a strict JSON array like this: ["Question 1", "Question 2", "Question 3"]
                    Do not add any numbering, no explanations, no extra text.

                    Return exactly and only a JSON array.

                    Example output:
                    ["What is React?", "What is Next.js?", "Explain server-side rendering."]

                    Thank you! ❤️`

    

        });

        const interview = {
            role: role,
            type: type,
            level: level,
            techstack: techStack.split(","),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        await db.collection("interviews").add(interview);

        return Response.json({success: true}, {status: 200});

    }catch(error){
        console.log(error);

        return Response.json({success: false,error}, {status: 500});
    }
}