import firebase from "../../firebase.config";

const auth = firebase.auth();
const SetLoginUser = user => ({
    type: 'SET_LOGIN_IN',
    user
});

export const SignInUserToApplication = ({email, password}) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
            // SetLoginUser(response);
        })
        .catch(e => console.error(e.message))


    //console.log(response)

};