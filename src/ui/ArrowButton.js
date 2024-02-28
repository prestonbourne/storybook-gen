export const ArrowButtonLink = ({ label, description,...rest }) => {
    return (
        <button
            {...rest}
            className={"group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 bg-slate-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-left" + (rest.disabled ? " opacity-50 cursor-not-allowed" : "")}
        >
            <h2 className={`mb-2 text-2xl font-semibold`}>
                {label}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[40ch] text-md opacity-60`}>
                {description}
            </p>
        </button>
    );
};
