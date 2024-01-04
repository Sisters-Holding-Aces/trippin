import { createAccount, logIn, logOut, removeUser } from "./authentication";
import { getHolidays, getHoliday, postHoliday } from "./backendHolidays";
import { getUserByName, getUsers, patchUser } from "./backendUsers";

// user authentication
export const createUser = async (email, pass, username) => await createAccount(email, pass, username)
export const userLogIn = async (email, pass) => await logIn(email, pass)
export const userLogOut = async () => await logOut()
export const deleteAccount = async () => await removeUser()

// users collection
export const allUsers = async () => await getUsers();
export const getUserInfo = async (username) => await getUserByName(username);
export const editUserInfo = async (field, input, userId) => await patchUser(field, input, userId)

// :user/holidays collection
export const holidaysByUser = async (userId) => await getHolidays(userId);
export const holidayById = async (userId, holidayId) => await getHoliday(userId, holidayId)
export const addHoliday = async (userId, title, location) => await postHoliday(userId, title, location)


// :user/:holiday/memories collection