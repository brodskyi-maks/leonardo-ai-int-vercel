import IUser from "@/components/User/IUser";
/* Basic local storage helper. currently hardocded for user,
 on scale should take key and value to create different sotrages */
// Function to save user data to localStorage
const saveUserToLocalStorage = (userData: IUser) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

const loadUserFromLocalStorage = () => {
  // Check if window is defined (i.e., if the code is running on the client-side)
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
  // Return a default value or null if not running in a browser environment
  return null;
};
const storageHelper = {
  saveUserToLocalStorage,
  loadUserFromLocalStorage,
};
export default storageHelper;
