import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { useState } from "react"

import { signInWithGooglePopup, signInWithEmail } from '../../utils/firebase/firebase.utils'

import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit= async (event) => {
        event.preventDefault()

        try {
            const {user} = await signInWithEmail(email, password);
            // setCurrentUser(user)
            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                default:
                    console.log(error)
            }

        }
    }

    const handleGoogleSignIn = async () => {
        await signInWithGooglePopup();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return(
        <div className='sign-in-container'>
        <h1>I already have an account</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password}/>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={handleGoogleSignIn}> Sign in with Google</Button>
                </div>
            </form>
            </div>
    )
}

export default SignInForm;