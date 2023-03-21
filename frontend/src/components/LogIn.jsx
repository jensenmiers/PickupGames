import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function LogIn({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div> {
        showLogin ?  (
            <>
                <LoginForm onLogin={onLogin}/>
                {/* <Divider /> */}
                <p>
                  Don't have an account? &nbsp;
                  <button  onClick={() => setShowLogin(false)}>
                    Sign Up
                  </button>
                </p>
            </>
        ) : (
            <>
                <SignUpForm onLogin={onLogin}/>
                {/* <Divider /> */}
                <p>
                    Already have an account? &nbsp;
                    <button onClick={() => setShowLogin(true)}>
                    Log In
                    </button>
                </p>
            </>
        ) }
        </div>
    )
}

export default LogIn