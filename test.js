import bcrypt from "bcrypt";

const enteredPassword = "aa"; // what you're typing at login
const hashFromDB = "$2b$10$oJyVPF//BiinMVEJ5LUxnOuLpm0PXgZlWNSW0CpE6euTEZyK5CiPq";

const match = await bcrypt.compare(enteredPassword, hashFromDB);
console.log("Match?", match);