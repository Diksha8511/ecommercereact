import React, { useState } from 'react'
import loginImg from '../../assets/login.png'
import styles from './auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { auth } from '../../firebase/config';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success('Login Successfully...')   
                navigate('/')      
            }).catch((error) => {
               toast.error(error.message)
            });
    }

    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false)
                toast.success('Login successful...');
                navigate('/')
                // ...
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
                // ..
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={`${styles.img}`}>
                    <img src={loginImg} alt='Login' width='400' />
                </div>
                <Card>
                    <div className={`${styles.form}`}>
                        <h2>Login</h2>
                        <form onSubmit={loginUser}>
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button className='--btn --btn-primary --btn-block' type='submit'>Login</button>
                            <div className={`${styles.links}`}>
                                <Link to='/reset'>Reset Password</Link>
                            </div>
                            <p>--or--</p>
                        </form>
                        <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}>
                            <FaGoogle />&nbsp;Login With Google
                        </button>
                        <span className={`${styles.register}`}>
                            <p>Don't have an account?</p>&nbsp;
                            <Link to='/register'>Register</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login