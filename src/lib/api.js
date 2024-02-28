export const api = {
    async createStory({ descriptor, genre, emotion }) {
        const response = await fetch("/api/gpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: {descriptor, genre, emotion }}),
        });
        return await response.json();
    },
    async getImage({story, style}) {


        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data:{ story, style }}),
        });
        return await response.json();
    }
};