import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, ShoppingCart, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} variant="ghost" size="icon" className="hover-lift">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 
            onClick={() => navigate('/')}
            className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent cursor-pointer"
          >
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
  );
};

export default Navbar;
