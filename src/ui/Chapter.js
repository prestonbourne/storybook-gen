import Image from "next/image";

export const Chapter = ({ text, imageURL, ...rest }) => {

    const randomUnsplashImage = "https://source.unsplash.com/random";



    return (
        <div className="flex flex-col">
            <p {...rest} className="my-6">
                {text}
            </p>
            <figure className="mx-3">
                <Image src={imageURL || randomUnsplashImage} alt="chapter" className="rounded-lg" width={400} height={300} />
            </figure>
        </div>
    );
};
