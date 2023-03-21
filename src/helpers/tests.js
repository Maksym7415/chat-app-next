/* eslint-disable no-promise-executor-return */
/* eslint-disable no-return-await */
export const delay = async (ms) =>
	await new Promise((resolve) => setTimeout(resolve, ms));
