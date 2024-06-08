import bcrypt from "bcrypt";

export const comparePassword = async (
 password: string,
 encodedPassword: string
) => {
 return await bcrypt.compare(password, encodedPassword);
};
