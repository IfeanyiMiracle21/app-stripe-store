import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, Package, ShieldCheck, LogOut, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    satisfaction: 0,
    support: 0
  });

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .limit(6);
    if (data) setFeaturedProducts(data);
  };

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        products: Math.floor(500 * progress),
        customers: Math.floor(5000 * progress),
        satisfaction: Math.floor(98 * progress),
        support: 24
      });
      
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50 shadow-elegant">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              StoreFront
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <Button onClick={() => navigate('/')} variant="ghost" className="hidden md:flex">
              Home
            </Button>
            <Button onClick={() => navigate('/products')} variant="ghost" className="hidden md:flex">
              Products
            </Button>
            {user && (
              <>
                <Button onClick={() => navigate('/orders')} variant="ghost" className="hidden md:flex">
                  Orders
                </Button>
                <Button onClick={() => navigate('/admin')} variant="ghost" className="hidden md:flex">
                  Admin
                </Button>
              </>
            )}
            <Button variant="ghost" className="hidden md:flex">
              Contact
            </Button>
            <Button onClick={() => navigate('/cart')} variant="ghost" size="icon" className="hover-lift">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {user ? (
              <Button onClick={signOut} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} className="shadow-glow">Sign In</Button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl -z-10" />
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight"
          >
            Welcome to StoreFront
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Discover premium quality products curated just for you
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" onClick={() => navigate('/products')} className="shadow-glow px-8 py-6 text-lg">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Shop Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/products')} className="hover-lift px-8 py-6 text-lg">
              View Products
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="hover-lift shadow-elegant border-2">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <ShoppingBag className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Easy Shopping</h3>
              <p className="text-muted-foreground text-lg">
                Browse our curated collection and add items to your cart with ease
              </p>
            </CardContent>
          </Card>
          <Card className="hover-lift shadow-elegant border-2">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Package className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground text-lg">
                Track your orders and enjoy quick, reliable shipping across Nigeria
              </p>
            </CardContent>
          </Card>
          <Card className="hover-lift shadow-elegant border-2">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <ShieldCheck className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Secure Checkout</h3>
              <p className="text-muted-foreground text-lg">
                Shop with confidence with our secure payment processing in Naira
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose StoreFront?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to bringing you the best shopping experience in Nigeria
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="text-2xl text-primary-foreground">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Premium Quality Products</h3>
                  <p className="text-muted-foreground">Every product is carefully selected to meet our high quality standards</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="text-2xl text-primary-foreground">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Best Prices in Nigeria</h3>
                  <p className="text-muted-foreground">Competitive pricing with frequent deals and discounts</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="text-2xl text-primary-foreground">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
                  <p className="text-muted-foreground">Our dedicated team is always here to help you</p>
                </div>
              </div>
            </div>
            
            <Card className="gradient-card p-12 shadow-glow border-2">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">Start Shopping Today</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of satisfied customers shopping with StoreFront
                </p>
                <Button size="lg" onClick={() => navigate('/products')} className="shadow-glow px-8 py-6 text-lg">
                  <ShoppingBag className="mr-2 h-6 w-6" />
                  Browse Collection
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check out our most popular items
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover-lift shadow-elegant overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{product.category}</p>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-primary mb-3">
                      ₦{product.price.toLocaleString('en-NG')}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => navigate('/products')}>
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/products')}>
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section with Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <motion.div 
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
              {stats.products}+
            </div>
            <p className="text-muted-foreground text-lg">Products</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
              {stats.customers}+
            </div>
            <p className="text-muted-foreground text-lg">Happy Customers</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
              {stats.satisfaction}%
            </div>
            <p className="text-muted-foreground text-lg">Satisfaction Rate</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
              {stats.support}/7
            </div>
            <p className="text-muted-foreground text-lg">Support</p>
          </motion.div>
        </motion.div>

        {/* Call-To-Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <Card className="gradient-card p-16 shadow-glow border-2 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied Nigerians shopping smarter on StoreFront. Experience the best online shopping in Nigeria.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/products')} className="shadow-glow px-8 py-6 text-lg">
                Browse Collection
              </Button>
              {!user && (
                <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="hover-lift px-8 py-6 text-lg">
                  Sign Up
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;