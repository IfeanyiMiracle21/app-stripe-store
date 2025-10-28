import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, Package, ShieldCheck, LogOut } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">StoreFront</h1>
          <div className="flex gap-2">
            {user ? (
              <>
                <Button onClick={() => navigate('/products')} variant="outline">
                  Products
                </Button>
                <Button onClick={() => navigate('/orders')} variant="outline">
                  Orders
                </Button>
                <Button onClick={() => navigate('/admin')} variant="outline">
                  Admin
                </Button>
                <Button onClick={signOut} variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/products')} variant="outline">
                  Browse
                </Button>
                <Button onClick={() => navigate('/auth')}>Sign In</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Welcome to StoreFront</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Your premier destination for quality products
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/products')}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            {!user && (
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                Sign Up
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-muted-foreground">
                Browse our curated collection and add items to your cart with ease
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Track your orders and enjoy quick, reliable shipping
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8 text-center">
              <ShieldCheck className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">
                Shop with confidence with our secure payment processing
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
