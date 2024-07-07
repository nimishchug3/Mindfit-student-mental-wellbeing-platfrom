export default function YourChallenges({ setSelected }) {
    return (
        <div>
            <div
                onClick={setSelected}
                className="text-sm cursor-pointer"
            >
                back
            </div>
            <div>
                Your Challenges
            </div>
        </div>
    )
}