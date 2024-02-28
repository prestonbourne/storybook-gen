import { openai } from "@/lib";

export async function POST(request) {
    try {
        const req = await request.json();

        const prompt = `An image that goes along with this story ${req.data.story}, and is in the style of ${req.data.style}.`;

        return getStableDiffusionResponse(prompt);
    } catch (error) {
        return Response.json({ data: "", error: error.message });
    }
}

async function getDallEResponse(prompt) {
    const dallERes = await openai.images.generate({
        prompt,
        response_format: "url",
    });

    return Response.json({ data: dallERes });
}

async function getStableDiffusionResponse(prompt) {
    try {
        const DAN_STABLE_DIFFUSION_URL =
            "https://bc5c1122a5ac2b3ed0.gradio.live";
        const IMAGE_GENERATION_ENDPOINT = "/sdapi/v1/txt2img";
        const payload = {
            prompt,
            steps: 5,
        };

        const stableDiffRes = await fetch(
            DAN_STABLE_DIFFUSION_URL + IMAGE_GENERATION_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await stableDiffRes.json();

        return Response.json({ data });
    } catch (error) {
        return Response.json({ data: "", error: error.message });
    }
}
