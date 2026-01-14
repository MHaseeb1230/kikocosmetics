import React from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';

const Profile = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-12">My Account</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-accent p-6 rounded-2xl space-y-2">
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg bg-white text-primary font-bold text-sm uppercase tracking-widest">
                            <User size={18} /> Profile
                        </button>
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-widest font-medium text-gray-600">
                            <Package size={18} /> Orders
                        </button>
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-widest font-medium text-gray-600">
                            <Heart size={18} /> Wishlist
                        </button>
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-widest font-medium text-gray-600">
                            <MapPin size={18} /> Addresses
                        </button>
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-widest font-medium text-gray-600">
                            <Settings size={18} /> Settings
                        </button>
                        <hr className="my-4 border-gray-200" />
                        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-widest font-medium text-red-500">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-grow space-y-12">
                    <section className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Full Name</label>
                                <p className="text-sm font-bold">Kiko Milano User</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Email Address</label>
                                <p className="text-sm font-bold">user@example.com</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Phone Number</label>
                                <p className="text-sm font-bold">+92 300 1234567</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Date of Birth</label>
                                <p className="text-sm font-bold">01/01/1995</p>
                            </div>
                        </div>
                        <button className="btn-secondary mt-10 px-8 py-3 text-xs">Edit Profile</button>
                    </section>

                    <section className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Recent Orders</h2>
                        <div className="text-center py-12">
                            <Package size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500 italic text-sm">You haven't placed any orders yet.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
