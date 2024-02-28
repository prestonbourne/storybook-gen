import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

/**
* OpenAI instance, should only be used on the server.
*/
export const openai = new OpenAI({ apiKey });