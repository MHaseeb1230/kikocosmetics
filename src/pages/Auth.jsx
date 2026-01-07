import React, { useState } from 'react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-center mb-8">
                    <img src="/src/assets/logos/Logo.webp" alt="Kiko Milano" className="h-12" />
                </div>
                <div className="flex gap-8 mb-12 border-b border-gray-100 pb-4">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`text-sm font-bold uppercase tracking-widest pb-4 -mb-[18px] transition-all ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`text-sm font-bold uppercase tracking-widest pb-4 -mb-[18px] transition-all ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    >
                        Register
                    </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary text-sm" />
                            <input type="text" placeholder="Last Name" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary text-sm" />
                        </div>
                    )}
                    <input type="email" placeholder="Email Address" className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary text-sm" />
                    <input type="password" placeholder="Password" className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary text-sm" />

                    {isLogin && (
                        <div className="text-right">
                            <button className="text-xs text-gray-500 hover:text-primary transition-colors">Forgot Password?</button>
                        </div>
                    )}

                    <button className="btn-primary w-full py-4 uppercase tracking-widest text-sm">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Or continue with</p>
                    <div className="flex gap-4">
                        <button className="flex-1 py-3 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Google</button>
                        <button className="flex-1 py-3 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
