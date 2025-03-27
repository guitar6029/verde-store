export function ClearBtn({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="clear-btn rounded-xl p-2 verde text-5xl w-[150px] bg-cyan-100 hover:bg-cyan-200 transition duration-300 ease-in-out cursor-pointer">Clear</button>
    );
}