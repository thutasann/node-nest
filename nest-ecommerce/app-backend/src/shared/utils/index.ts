import bcrypt from 'bcrypt';

/** generate hash password */
export const generateHashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

/** compare password */
export const comparePassword = async (
	password: string,
	hashPassword: string,
) => {
	return await bcrypt.compare(password, hashPassword);
};
