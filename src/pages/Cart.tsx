import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to checkout.',
      });
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md text-center shadow-elegant hover-lift">
            <CardContent className="p-12">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some products to get started!</p>
              <Button onClick={() => navigate('/products')} className="shadow-glow">Browse Products</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Shopping Cart</h1>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-elegant hover-lift">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {item.image_url && (
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-xl font-bold text-primary mt-1">
                          ₦{item.price.toLocaleString('en-NG')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value) || 1)
                            }
                            className="w-16 text-center"
                            min="1"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-elegant border-2">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items ({getTotalItems()})</span>
                  <span className="font-semibold">₦{getTotalPrice().toLocaleString('en-NG')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₦{getTotalPrice().toLocaleString('en-NG')}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button onClick={handleCheckout} className="w-full shadow-glow">
                  Proceed to Checkout
                </Button>
                <Button onClick={() => navigate('/products')} variant="outline" className="w-full hover-lift">
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;