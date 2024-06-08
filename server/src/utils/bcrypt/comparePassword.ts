import bcrypt from "bcryptjs";

export const comparePassword = async (
 password: string,
 encodedPassword: string
) => {
 return await bcrypt.compare(password, encodedPassword);
};
