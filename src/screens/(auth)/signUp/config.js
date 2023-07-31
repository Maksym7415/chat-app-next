import { z } from "zod";

const firstName = {
	fieldName: "login",
	placeholder: "email@example.com",
	styles: {
		container: {
			marginTop: 16,
		},
	},
};

const lastName = {
	fieldName: "lastName",
	placeholder: "Doe",
	styles: {
		container: {
			maxWidth: 300,
			marginTop: 16,
		},
	},
};

const email = {
	fieldName: "email",
	placeholder: "email@example.com",
	styles: {
		container: {
			maxWidth: 300,
			marginTop: 16,
		},
	},
};

export const signUpPage = [firstName, lastName, email];

export const validationSchema = z.object({
	[firstName.fieldName]: z.string().nonempty({
		message: "required",
	}),
	[lastName.fieldName]: z.string().nonempty({
		message: "required",
	}),
	[firstName.fieldName]: z.string().nonempty({
		email: "required",
	}),
});
