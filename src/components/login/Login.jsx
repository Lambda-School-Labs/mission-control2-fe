import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Login = () => {
    //sets state and the usehistory
    const history = useHistory()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    //allows you to change visuals when adding info to form
    const handleChanges = (e) => {
        e.preventDefault();
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    };
    //server call to allow you to log in
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3232/api/auth/login', user)
            .then(res => {
                console.log('***', res.data)
                localStorage.setItem('token', res.data.token)
                history.push(`/dashboard/${res.data.id}`)
            })
            .catch(err => console.error(err))
    };
    //form with a link to sign up
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
        <input
                        name="name" type="text"
                        value={user.name}
                        onChange={handleChanges} />
                </label>
                <label>
                    Password:
        <input
                        name="password" type="password"
                        value={user.password}
                        onChange={handleChanges} />
                </label>
                <input id="submit" type="submit" value="Submit" />
            </form>
            <p className='text'> Don't have a login? sign up <Link to='/register'>here!</Link></p>
        </div>
    )
};
export default Login;