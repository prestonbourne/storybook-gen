import { openai, buildGPTPrompt } from "@/lib";

export async function POST(request) {

    const req = await request.json()
    const messages = buildGPTPrompt(req.data);

    const gptRes = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
    });

    return Response.json({ data: gptRes.choices[0].message.content });
}
