import React, { useState } from 'react'
import resetImg from '../../assets/forgot.png'
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Reset = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const resetPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success('Reset password link is sent to your mail')
                navigate('/login')
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
        {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={`${styles.img}`}>
                    <img src={resetImg} alt='Reset Password' width='400' />
                </div>
                <Card>
                    <div className={`${styles.form}`}>
                        <h2>Reset password</h2>
                        <form onSubmit={resetPassword}>
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button className='--btn --btn-primary --btn-block' type='submit'>Reset Password</button>
                            <div className={`${styles.links}`}>
                                <p>
                                    <Link to='/login'>- Login</Link>
                                </p>
                                <p>
                                    <Link to='/register'>- Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset