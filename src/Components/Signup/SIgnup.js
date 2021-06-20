import React,{useCallback} from 'react';
import {withRouter} from "react-router"
import app from "../../firebase/firebase"
import {Typography,Button} from '@material-ui/core'

const Signup = ({history}) => {
    const handleSignup = useCallback(async event=>{
        event.preventDefault();
        const {email,password} =event.target.elements;
        try{
            await app.auth().
            createUserWithEmailAndPassword(email.value,password.value);
            history.push("/admin");
        }catch(error){
            alert(error)
        }
    },[history])
    return (
        <div>
            <Typography>Signup</Typography>
            <form onSubmit={handleSignup}>
                <Typography>
                    Email
                </Typography>
                <input name="email" type="email"
                placeholder="email" />
                <Typography>
                    Password
                </Typography>
                <input name="password" type="password"
                placeholder="password" />
                <Button type="submit">Signup</Button>
            </form>
        </div>
    )
}

export default withRouter(Signup);
