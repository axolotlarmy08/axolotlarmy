'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase, Order, OrderItem } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { Package, User, LogOut } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<(Order & { order_items: (OrderItem & { products: any })[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setOrders(data as any);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order History</h2>

                  {loading ? (
                    <p className="text-gray-600">Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Button onClick={() => router.push('/products')}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="font-semibold">
                                Order #{order.id.substring(0, 8)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Status</div>
                              <div className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full capitalize">
                                {order.status}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            {order.order_items?.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.products.image_url}
                                    alt={item.products.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.products.name}</div>
                                  <div className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                  </div>
                                </div>
                                <div className="font-semibold">${item.price.toFixed(2)}</div>
                              </div>
                            ))}
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span className="text-blue-600">
                                ${order.total_amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Profile Information</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Member Since</div>
                      <div className="font-medium">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <Button variant="destructive" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
