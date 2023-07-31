import { z } from "zod";

const login = {
	fieldName: "login",
	placeholder: "email@example.com",
	styles: {
		container: {
			marginTop: 16,
		},
	},
};

export const signInFields = [login];

export const validationSchema = z.object({
	[login.fieldName]: z.string().nonempty({
		message: "required",
	}),
});
