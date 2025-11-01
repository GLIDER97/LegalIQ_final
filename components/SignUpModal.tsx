import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon } from './Icons';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const GoogleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.988,36.43,44,30.83,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
    const { signUp, signInWithGoogle } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        try {
            await signUp(email, password, name);
            onClose();
        } catch (err: any) {
            console.error("Sign up failed:", err);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('This email address is already in use.');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. Please choose a stronger one.');
                    break;
                default:
                    setError('An unexpected error occurred. Please try again.');
                    break;
            }
        }
    };

    const handleGoogleSignUp = async () => {
        setError('');
        try {
            await signInWithGoogle();
            onClose();
        } catch (err: any) {
             console.error("Google sign up failed:", err);
             setError('Could not sign up with Google. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
        >
            <div 
                className="relative w-full max-w-md bg-brand-card shadow-2xl rounded-lg border border-gray-700 flex flex-col m-4" 
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 id="signup-title" className="text-lg font-bold text-brand-light">Create an Account</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                <main className="p-6 sm:p-8">
                    {error && <div className="mb-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-md text-sm" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-3 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300">Email Address</label>
                            <div className="mt-1">
                                <input id="signup-email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-3 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300">Password</label>
                            <div className="mt-1">
                                <input id="signup-password" name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-3 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-brand-gold px-3 py-2.5 text-sm font-semibold leading-6 text-brand-dark shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="bg-brand-card px-2 text-gray-400">Or sign up with</span></div>
                        </div>
                        <div className="mt-6">
                            <button onClick={handleGoogleSignUp} className="flex w-full items-center justify-center gap-3 rounded-md bg-brand-dark px-3 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus-visible:outline-offset-0">
                                <GoogleIcon className="h-5 w-5" />
                                <span>Sign up with Google</span>
                            </button>
                        </div>
                    </div>
                </main>
                 <footer className="p-4 bg-brand-dark/30 text-center text-sm border-t border-gray-700">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="font-medium text-brand-gold hover:text-yellow-300">Log in</button>
                    </p>
                </footer>
            </div>
        </div>
    );
};