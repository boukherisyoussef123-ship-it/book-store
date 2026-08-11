import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-cyan-400 font-bold text-2xl mb-4">
              Little Learners
            </h3>

            <p className="text-slate-400 leading-7">
              Premium educational books, activity books, worksheets,
              flashcards, and printable resources for curious young minds.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>Home</li>
              <li>Products</li>
              <li>Categories</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-2xl mb-4">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="hover:text-cyan-400 transition" />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-cyan-400 transition" />
              </a>

              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="hover:text-cyan-400 transition" />
              </a>

              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="hover:text-cyan-400 transition" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          © 2026 Little Learners (TACHAFIN). All rights reserved.
        </div>
      </div>
    </footer>
  );
}