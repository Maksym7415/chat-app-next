export function handleKeyDown({ event, fcClick, key = "Enter" }) {
	if (event.key === key) {
		fcClick();
	}
}
