'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase, Product, Review } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { Star, ShoppingCart, Package, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (data) {
      setProduct(data);
      loadRelatedProducts(data.category);
      loadReviews();
    }
  };

  const loadRelatedProducts = async (category: string) => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', params.id)
      .limit(4);

    if (data) setRelatedProducts(data);
  };

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, profiles(full_name)')
      .eq('product_id', params.id)
      .order('created_at', { ascending: false });

    if (data) setReviews(data as any);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: params.id as string,
        user_id: user.id,
        rating,
        comment,
      });

      if (error) throw error;

      toast.success('Review submitted!');
      setComment('');
      setRating(5);
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>

                <div className="text-4xl font-bold text-blue-600 mb-6">${product.price}</div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  {product.is_digital ? (
                    <div className="flex items-center text-green-600">
                      <Download className="h-5 w-5 mr-2" />
                      <span>Instant Digital Download</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <Package className="h-5 w-5 mr-2" />
                      <span>Ships in 2-3 business days</span>
                    </div>
                  )}
                </div>

                {!product.is_digital && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setQuantity(Math.min(product.stock || 1, quantity + 1))
                        }
                      >
                        +
                      </Button>
                    </div>
                    {product.stock < 10 && product.stock > 0 && (
                      <p className="text-sm text-orange-600 mt-2">
                        Only {product.stock} left in stock!
                      </p>
                    )}
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={() => addItem(product.id, quantity)}
                  disabled={!product.is_digital && product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

            {user && (
              <form onSubmit={handleSubmitReview} className="mb-8 pb-8 border-b">
                <h3 className="font-semibold mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                      >
                        <Star
                          className={`h-6 w-6 cursor-pointer ${
                            value <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Comment</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            )}

            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold">
                          {review.profiles?.full_name || 'Anonymous'}
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square relative bg-gray-100 cursor-pointer">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold mb-2 line-clamp-1 hover:text-blue-600 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">${product.price}</span>
                        <Button size="sm" onClick={() => addItem(product.id)}>
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
