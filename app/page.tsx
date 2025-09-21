"use client";

import { useState, useEffect, useRef } from "react";
import type { Metadata } from "next";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// --- FONTS ---
// In a real Next.js app, we'd use next/font. For compatibility in this environment,
// we'll inject the Google Fonts link into the document head.
const useGoogleFonts = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      .font-serif { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
};

// --- METADATA (For SEO - Next.js App Router convention) ---
// Note: In a real app, this would be in a layout.tsx or page.tsx file, not inside the client component.
// For this single-file structure, we'll keep it here as a comment.
/*
export const metadata: Metadata = {
  title: 'Elysian Skincare - Pure, Elegant, Natural',
  description: 'Discover your natural radiance with Elysian Skincare. Pure ingredients, elegant formulas, and skincare that understands you.',
};
*/

// --- DATA MOCKS ---
const products = [
  {
    id: 1,
    name: "Hydrating Serum",
    price: 45.0,
    category: "serum",
    imageUrl:
      "https://images.unsplash.com/photo-1629198735660-e39ea93f5a4a?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Gentle Cleanser",
    price: 28.0,
    category: "cleanser",
    imageUrl:
      "https://images.unsplash.com/photo-1625708458529-6e67653c4ee2?q=80&w=1935&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    price: 38.0,
    category: "moisturizer",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f168a2b53b?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Revitalizing Eye Cream",
    price: 35.0,
    category: "moisturizer",
    imageUrl:
      "https://images.unsplash.com/photo-1600854746242-b85c18a4a58c?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Vitamin C Serum",
    price: 52.0,
    category: "serum",
    imageUrl:
      "https://images.unsplash.com/photo-1605259416598-14a57ac8026b?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Renewal Night Cream",
    price: 48.0,
    category: "moisturizer",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f168a2b53b?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Exfoliating Cleanser",
    price: 32.0,
    category: "cleanser",
    imageUrl:
      "https://images.unsplash.com/photo-1628090798311-63954a706132?q=80&w=1964&auto=format&fit=crop",
  },
];

const bestsellers = products.slice(0, 4);

const blogPosts = [
  {
    id: 1,
    category: "Skincare Tips",
    title: "The 5-Step Morning Routine for a Luminous Glow",
    excerpt:
      "Start your day right with these essential steps to protect and nourish your skin from dawn till dusk.",
    imageUrl:
      "https://images.unsplash.com/photo-1556228724-4da56e9c18a2?q=80&w=1935&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Ingredient Spotlight",
    title: "Hyaluronic Acid: Nature's Moisture Magnet",
    excerpt:
      "Dive deep into the science behind one of skincare's most beloved ingredients and how it works.",
    imageUrl:
      "https://images.unsplash.com/photo-1604251028168-3335a0cf5b2d?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Wellness",
    title: "Beyond the Bottle: How Diet Affects Your Skin",
    excerpt:
      "True radiance comes from within. Explore the best foods for healthy, glowing skin.",
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-2850a43d24a5?q=80&w=1964&auto=format&fit=crop",
  },
];

const heroSlides = [
  {
    title: "Discover Your Natural Radiance",
    subtitle:
      "Pure ingredients, elegant formulas. Skincare that understands you.",
    buttonText: "Shop Now",
    buttonLink: "#shop",
    imageUrl:
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "The Essence of Purity",
    subtitle:
      "Ethically sourced, scientifically proven. Elevate your daily ritual.",
    buttonText: "Our Philosophy",
    buttonLink: "#about",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1935&auto=format&fit=crop",
  },
];

// --- REUSABLE COMPONENTS ---

const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="font-serif text-xl mb-2 text-sage-green">{product.name}</h3>
    <p className="text-taupe mb-4">${product.price.toFixed(2)}</p>
    <button className="w-full bg-sage-green text-ivory py-2 rounded-full hover:bg-sage-green/90 transition-colors">
      Add to Cart
    </button>
  </div>
);

// --- PAGE SECTIONS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-ivory/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-3xl font-bold text-sage-green font-serif"
        >
          Elysian
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="hover:text-gold transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-gold transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#shop"
            className="hover:text-gold transition-colors duration-300"
          >
            Shop
          </a>
          <a
            href="#blog"
            className="hover:text-gold transition-colors duration-300"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="hover:text-gold transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:text-gold transition-colors duration-300">
            <Search size={24} />
          </button>
          <button className="hover:text-gold transition-colors duration-300">
            <User size={24} />
          </button>
          <button className="hover:text-gold transition-colors duration-300">
            <ShoppingBag size={24} />
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <Menu size={24} />
        </button>
      </nav>

      {isMenuOpen && (
        <div
          className="md:hidden bg-ivory p-6"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#home" className="block py-2 text-center hover:text-gold">
            Home
          </a>
          <a href="#about" className="block py-2 text-center hover:text-gold">
            About
          </a>
          <a href="#shop" className="block py-2 text-center hover:text-gold">
            Shop
          </a>
          <a href="#blog" className="block py-2 text-center hover:text-gold">
            Blog
          </a>
          <a href="#contact" className="block py-2 text-center hover:text-gold">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-[90vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-ivory px-4">
            <h1 className="text-4xl md:text-6xl mb-4 font-serif">
              {slide.title}
            </h1>
            <p className="max-w-xl mb-8 font-sans">{slide.subtitle}</p>
            <a
              href={slide.buttonLink}
              className="bg-gold text-sage-green font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-ivory" : "bg-ivory/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

const BestsellersSection = () => (
  <section id="bestsellers" className="py-20 bg-ivory">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl text-sage-green mb-4 font-serif">
        Our Bestsellers
      </h2>
      <p className="text-taupe max-w-2xl mx-auto mb-12">
        Loved by our community, these are the essentials for a radiant
        complexion.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

const PromoBannersSection = () => (
  <section className="py-20 bg-ivory/50">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-lg overflow-hidden h-80 flex items-center justify-center text-center p-8">
        <img
          src="https://images.unsplash.com/photo-1596791882614-b4a53072236a?q=80&w=2070&auto=format&fit=crop"
          alt="Natural Ingredients"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-sage-green/60"></div>
        <div className="relative text-ivory">
          <h3 className="text-3xl mb-4 font-serif">Rooted in Nature</h3>
          <p className="mb-6">
            Discover the power of our ethically-sourced, natural ingredients.
          </p>
          <a
            href="#about"
            className="border border-ivory text-ivory font-semibold py-2 px-6 rounded-full hover:bg-ivory hover:text-sage-green transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden h-80 flex items-center justify-center text-center p-8">
        <img
          src="https://images.unsplash.com/photo-1522202685239-4458d511112b?q=80&w=1964&auto=format&fit=crop"
          alt="Summer Glow Kit"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gold/60"></div>
        <div className="relative text-sage-green">
          <h3 className="text-3xl mb-4 font-serif">Summer Glow Kit</h3>
          <p className="mb-6">
            Get 15% off our curated collection of summer essentials.
          </p>
          <a
            href="#shop"
            className="border border-sage-green text-sage-green font-semibold py-2 px-6 rounded-full hover:bg-sage-green hover:text-ivory transition-all"
          >
            Shop The Kit
          </a>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20 bg-ivory">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-4xl text-sage-green mb-6 font-serif">
          Where Elegance Meets Efficacy.
        </h2>
        <p className="text-taupe mb-4 leading-relaxed">
          At Elysian, we believe that skincare is an act of self-love. Our
          philosophy is built on the harmony of nature and science. We
          meticulously select pure, potent botanicals and combine them with
          clinically-proven actives to create formulas that are both gentle and
          effective.
        </p>
        <p className="text-taupe mb-8 leading-relaxed">
          We are committed to transparency, sustainability, and creating
          products that not only nurture your skin but also honor the planet.
          Every bottle is a promise of quality, purity, and undeniable results.
        </p>
        <a
          href="#shop"
          className="bg-sage-green text-ivory font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300"
        >
          Explore Our Products
        </a>
      </div>
      <div className="order-1 md:order-2 relative w-full h-[600px] rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1598454226955-520e7e1e1a53?q=80&w=1964&auto=format&fit=crop"
          alt="Natural ingredients in a bowl"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>
);

const ShopSection = () => {
  const [filter, setFilter] = useState("all");
  const filteredProducts = products.filter(
    (p) => filter === "all" || p.category === filter
  );
  const filters = ["all", "cleanser", "serum", "moisturizer"];

  return (
    <section id="shop" className="py-20 bg-ivory/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-sage-green mb-4 font-serif">
            Complete Your Ritual
          </h2>
          <p className="text-taupe max-w-2xl mx-auto">
            Find the perfect additions to your skincare routine, crafted for
            every skin type.
          </p>
        </div>

        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`py-2 px-6 rounded-full capitalize transition-colors ${
                filter === f
                  ? "bg-gold text-sage-green"
                  : "bg-white text-sage-green"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => (
  <section id="blog" className="py-20 bg-ivory">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-sage-green mb-4 font-serif">
          From Our Journal
        </h2>
        <p className="text-taupe max-w-2xl mx-auto">
          Skincare tips, ingredient spotlights, and our thoughts on conscious
          beauty.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative w-full h-56">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-sm text-gold font-semibold">
                {post.category}
              </span>
              <h3 className="text-xl my-2 font-serif">{post.title}</h3>
              <p className="text-taupe text-sm mb-4">{post.excerpt}</p>
              <a
                href="#"
                className="font-semibold text-sage-green hover:text-gold transition-colors"
              >
                Read More &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-20 bg-sage-green text-ivory">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl mb-6 font-serif">We are Here To Help</h2>
      <p className="max-w-xl mx-auto mb-8">
        Have a question about your order, our products, or your skin? Our team
        of experts is ready to assist you.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <p>
          Email us at:{" "}
          <a
            href="mailto:support@elysian.com"
            className="text-gold hover:underline"
          >
            support@elysian.com
          </a>
        </p>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-sage-green font-semibold py-3 px-8 rounded-full flex items-center space-x-2 hover:bg-opacity-90 transition-all"
        >
          <MessageCircle size={20} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-ivory text-taupe py-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-sage-green mb-4 font-serif">
            Elysian
          </h3>
          <p className="text-sm mb-4">Pure ingredients, elegant formulas.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-sage-green">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sage-green">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sage-green">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sage-green mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#shop" className="hover:text-sage-green">
                All Products
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-sage-green">
                Bestsellers
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-sage-green">
                Kits & Bundles
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sage-green mb-4">About</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-sage-green">
                Our Story
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-sage-green">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sage-green">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sage-green mb-4">Stay In Touch</h4>
          <p className="text-sm mb-4">
            Join our newsletter for exclusive offers and skincare secrets.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 border border-taupe/50 rounded-l-md focus:ring-gold focus:border-gold"
            />
            <button
              type="submit"
              className="bg-sage-green text-ivory p-2 rounded-r-md hover:bg-sage-green/90"
            >
              &rarr;
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-taupe/20 mt-8 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Elysian Skincare. All Rights
          Reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function HomePage() {
  useGoogleFonts();

  return (
    <div className="font-sans bg-ivory text-sage-green">
      <Header />
      <main>
        <HomeSection />
        <BestsellersSection />
        <PromoBannersSection />
        <AboutSection />
        <ShopSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
