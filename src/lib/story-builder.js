import { GPT_SYSTEM_PROMPT } from "./constants";

/**
 * Represents a helpful assistant designed to output JSON.
 * @typedef {Object} Message
 * @property {"user" | "system"} role - The role of the assistant.
 * @property {string} content - The content of the assistant.
 */

/**
 * Builds a story based on the provided story configuration.
 * @param {Object} storyConfig The configuration object for the story.
 * @param {string} storyConfig.genre The genre of the story.
 * @param {string} storyConfig.emotion The emotion of the story.
 * @param {string} storyConfig.descriptor An adjective to describe the story.
 * @param {string} storyConfig.artStyle The art style of the story.
 * @returns {Message[]}
 */
export const buildGPTPrompt = storyConfig => {
    const { descriptor, genre, emotion } = storyConfig;

    const messages = [
        {
            role: "system",
            content: GPT_SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `Generate a ${descriptor} ${genre} story that will leave readers feeling ${emotion}.`,
        },
    ];

    return messages;
};
