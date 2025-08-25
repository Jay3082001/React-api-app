
// Sign Up & Sign In Form Regex Variables :-

export const usernameRegex = /^[0-9A-Za-z]{6,16}$/; 
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/; 


export const NAME_REGEX = /^[A-Za-z0-9 ]{3,}$/;
export const BOOK_ID_REGEX = /^[0-9]{1,}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;

export const TITLE_REGEX = /^.{3,100}$/; // Example: 3–100 characters
export const DESC_REGEX = /^.{10,}$/; // Example: 10 to infinite characters
export const PAGECOUNT_REGEX = /^[1-9]\d*$/; // Positive integers only
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; // Matches datetime-local format
