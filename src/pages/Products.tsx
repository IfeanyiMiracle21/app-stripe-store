import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  stock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error loading products',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-muted-foreground">Discover our curated collection</p>
          </div>
        </div>

        {products.length === 0 ? (
          <Card className="shadow-elegant">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">No products available yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden hover-lift shadow-elegant border-2">
                <CardHeader className="p-0">
                  {product.image_url && (
                    <div className="aspect-square overflow-hidden bg-muted relative group">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.stock <= 5 && product.stock > 0 && (
                        <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          Only {product.stock} left
                        </div>
                      )}
                    </div>
                  )}
                </CardHeader>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
                  </div>
                  {product.category && (
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-3 w-fit">
                      {product.category}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-3xl font-bold text-primary">₦{product.price.toLocaleString('en-NG')}</p>
                  </div>
                </div>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full shadow-glow"
                    size="lg"
                    disabled={product.stock <= 0}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;