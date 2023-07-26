"use client";

// APPROVED +
import { useEffect, useRef } from "react";

export const useIsMounted = () => {
	// REFS
	const isMounted = useRef(false);

	// USEEFFECTS
	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
};
