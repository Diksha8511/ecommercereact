import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/card/Card';
import registerImg from '../../assets/register.png'
import styles from './auth.module.scss';

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const registerUser = (e) => {
        e.preventDefault()
        console.log(email, password, cPassword);
        if (password !== cPassword) {
            toast.error('Password does not match.')
        }
    }

    return (
        <>
            <ToastContainer />
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={`${styles.form}`}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <input type='password' placeholder='Confirm Password' value={cPassword} onChange={(e) => { setCPassword(e.target.value) }} required />
                            <button className='--btn --btn-primary --btn-block' type='submit'>Register</button>
                        </form>
                        <span className={`${styles.register}`}>
                            <p>Already have an account?</p>&nbsp;
                            <Link to='/login'>Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={`${styles.img}`}>
                    <img src={registerImg} alt='Register' width='400' />
                </div>
            </section>
        </>
    )
}

export default Register