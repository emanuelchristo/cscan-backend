import yup from 'yup'

export const registerSchema = yup.object().shape({
	name: yup
		.string()
		.matches(/^[^*|\":<>[\]{}`\\()';@&$]+$/, "Can't have special characters in the name.")
		.required('Name is required.')
		.typeError('Name is required.'),
	email: yup.string().email('Invalid email').required('An Email ID is required').typeError('An Email ID is required'),
	institute: yup
		.string()
		.min(1, 'Must be at least 1 character long')
		.max(50, 'Cannot exceed 50 characters in length')
		.required('Institute is required')
		.typeError('Institute is required'),
})
