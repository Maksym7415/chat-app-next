import { z } from "zod";

const verificationCode = {
	fieldName: "verificationCode",
	placeholder: "00000",
	styles: {
		container: {
			maxWidth: 300,
			marginTop: 16,
		},
	},
};

export const verificationFields = [verificationCode];

export const validationSchema = z.object({
	[verificationCode.fieldName]:  z.string().nonempty({
		email: "required",
	}),
});
