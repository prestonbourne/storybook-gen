/**
 * Renders a StoryTag component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to be displayed inside the button.
 * @param {boolean} props.selected - Whether the tag is selected.
 * @returns {JSX.Element} The rendered StoryTag component.
 */
export const StoryTag = ({ label, selected, onClick }) => {
    return (
        <button
            className={`max-w-fit py-1 px-4 items-center justify-between text-sm lg:flex border-[1px] border-gray-800 rounded-full overflow-clip bg-gradient-to-br from-gray-200 to-sky-100 hover:-translate-y-2 transition-transform ${selected ? "bg-none bg-blue-300 -translate-y-2" : ""}`}
            onClick={onClick}
            value={label}
        >
            {label}
        </button>
    );
};

/**
 * Renders a StoryTag component.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.labels - The label to be displayed inside the button.
 * @returns {JSX.Element} The rendered StoryTag component.
 */
export const StoryTagList = ({ labels, className = "", onClick, selectedTag, ...rest }) => {


    const isSelected = (tag, selectedTag) => {
        return tag === selectedTag
    };

    const jsx = labels.map(l => (
        <li key={l}>
            <StoryTag label={l} selected={isSelected(l,selectedTag)} onClick={onClick} />
        </li>
    ));

    return <ul className={"flex gap-3 mb-12" + className}>{jsx}</ul>;
};
