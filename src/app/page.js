"use client";
import { useState } from "react";
import { ART_STYLES, EMOTIONS, DESCRIPTORS, GENRES } from "@/lib/constants";
import { StoryTagList } from "@/ui/StoryTag";
import { ArrowButtonLink } from "@/ui/ArrowButton";
import { Chapter } from "@/ui/Chapter";
import { api } from "@/lib/api";

export default function Home() {
    const [params, setParams] = useState({
        descriptor: "",
        genre: "",
        emotion: "",
    });

    const [book, setBook] = useState({});
    const [loadingBook, setLoadingBook] = useState(false);

    // this is a terrible algorithm, but works since the list is small, static and we're prototyping
    const handleParamsClick = e => {
        const { value } = e.target;

        if (DESCRIPTORS.includes(value)) {
            setParams({ ...params, descriptor: value });
        }
        if (GENRES.includes(value)) {
            setParams({ ...params, genre: value });
        }
        if (EMOTIONS.includes(value)) {
            setParams({ ...params, emotion: value });
        }
    };

    const getBook = async () => {
        setLoadingBook(true);
        try {
            const res = await api.createStory(params);
            const story = JSON.parse(res.data);

            if (story.chapters && story.chapters.length > 0) {
                const imagePromises = story.chapters.map(async c => {
                    const imgRes = await api.getImage({
                        story: c.content,
                        style: "cartoony " + params.genre,
                    });

                    return imgRes.data;
                });

                const imageResponses = await Promise.all(imagePromises);
                

                const currentBook = [];

                for (let i = 0; i < story.chapters.length; i++) {
                    currentBook.push( {
                        text: story.chapters[i].content,
                        image: imageResponses[i],
                    });
                }
                console.log(currentBook);
                setBook(currentBook);
            } else {
                // If there are no chapters, just set the story without images
                setBook(story);
            }
        } catch (e) {
            console.error(e);
        }
        setLoadingBook(false);
    };


    
    return (
        <main className="flex min-h-screen flex-col p-24 gap-4">
            <h1 className="text-6xl font-bold mb-8">Book Builder</h1>
            <h2 className="text-4xl font-bold">Descriptors</h2>
            {
                <StoryTagList
                    labels={DESCRIPTORS}
                    onClick={handleParamsClick}
                    selectedTag={params.descriptor}
                />
            }
            <h2 className="text-4xl font-bold">Genre</h2>
            {
                <StoryTagList
                    labels={GENRES}
                    onClick={handleParamsClick}
                    selectedTag={params.genre}
                />
            }
            <h2 className="text-4xl font-bold">Emotion</h2>
            {
                <StoryTagList
                    labels={EMOTIONS}
                    onClick={handleParamsClick}
                    selectedTag={params.emotion}
                />
            }

            
            <ArrowButtonLink
                label={loadingBook ? "Currently Writing your Book" : "Get Book"}
                description={ !loadingBook && `Generate your ${params.descriptor} ${params.genre} book with OpenAI's GPT 3 and Dall-e`}
                onClick={getBook}
                disabled={loadingBook}
            />

            {book.length > 0 && book.map((c, i) => {
                return <Chapter key={i} text={c.text} image={c.image} />;
            })}
        </main>
    );
}
