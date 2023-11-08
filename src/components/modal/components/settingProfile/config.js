export const fieldsKeysData = {
	firstName: {
		key: "firstName",
		id: 1,
		fieldName: "firstName",
		placeholder: "First name (required)",
		validate: {
			required: "required",
		},
		optionsTagsSx: {
			root: {
				maxWidth: 300,
				marginTop: 16,
			},
		},
	},
	lastName: {
		key: "lastName",
		id: 2,
		fieldName: "lastName",
		placeholder: "Last name (required)",
		validate: {
			required: "required",
		},
		optionsTagsSx: {
			root: {
				maxWidth: 300,
				marginTop: 16,
			},
		},
	},
};

export const fields = [fieldsKeysData.firstName, fieldsKeysData.lastName];
