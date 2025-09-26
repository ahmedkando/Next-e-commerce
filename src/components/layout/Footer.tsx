import React from "react";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">
          {/* Subscribe */}
          <div>
            <h2 className="font-bold text-xl mb-4">Exclusive</h2>
            <h3 className="font-semibold mb-2">Subscribe</h3>
            <p className="mb-4 text-sm">Get 10% off your first order</p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l bg-gray-900 border border-gray-700 text-white focus:outline-none" />
              <button type="submit" className="px-4 py-2 rounded-r bg-gray-800 border border-gray-700 hover:bg-red-500 transition">&#8594;</button>
            </form>
          </div>
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="mb-2 text-sm">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p className="mb-2 text-sm">exclusive@gmail.com</p>
            <p className="mb-2 text-sm">+88015-88888-9999</p>
          </div>
          {/* Account */}
          <div>
            <h3 className="font-semibold mb-2">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>
          {/* Quick Link */}
          <div>
            <h3 className="font-semibold mb-2">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-2">Download App</h3>
            <p className="mb-2 text-xs">Save $3 with App New User Only</p>
            <div className="flex gap-4 mt-4 text-xl">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
        <hr className="border-gray-800 mb-4" />
        <div className="text-center text-gray-400 text-sm">
          &copy; Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}
