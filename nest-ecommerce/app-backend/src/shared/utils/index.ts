import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

/**
 * generate auth token
 */
export const generateAuthToken = async (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

/** decode auth token */
export const decodeAuthToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};
