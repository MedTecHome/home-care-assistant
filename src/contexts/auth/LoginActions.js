import firebase from "../../firebase.config";
const auth = firebase.auth();

export const SignInUserToApplication = ({email, password}) => {
    auth.signInWithEmailAndPassword(email, password).catch(e => console.error(e.message))
};