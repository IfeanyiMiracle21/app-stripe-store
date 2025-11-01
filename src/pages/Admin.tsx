import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
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

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category || null,
        stock: parseInt(formData.stock) || 0,
        image_url: formData.image_url || null,
      });

      if (error) throw error;

      toast({
        title: 'Product added!',
        description: 'The product has been added successfully.',
      });

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image_url: '',
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error adding product',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Product deleted',
        description: 'The product has been removed.',
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error deleting product',
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Admin Dashboard</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="shadow-elegant border-2">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., 479990"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Products</h2>
            {products.map((product) => (
              <Card key={product.id} className="shadow-elegant hover-lift border-2">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {product.image_url && (
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="font-bold">₦{product.price.toLocaleString('en-NG')}</span>
                        <span className="text-muted-foreground">Stock: {product.stock}</span>
                        {product.category && (
                          <span className="text-muted-foreground">{product.category}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;