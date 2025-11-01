import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-2xl font-bold mb-4">App Stripe Store</h3>
          <p className="text-gray-400">Premium products, secure payments, happy customers.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@stripe.store</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lagos, Nigeria</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition"><Facebook /></a>
            <a href="#" className="hover:text-blue-400 transition"><Twitter /></a>
            <a href="#" className="hover:text-pink-400 transition"><Instagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} App Stripe Store. All rights reserved.
      </div>
    </footer>
  );
}
