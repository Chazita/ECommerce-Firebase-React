import { storage } from "src/firebase";
export const UserUploadImage = async (user_id: string, File: File) => {
	return storage.ref(`userPhoto/${user_id}`).put(File);
};
