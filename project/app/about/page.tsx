import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">About KidStore</h1>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At KidStore, we understand that being a parent is busy. That's why we've created a
                shopping experience designed specifically for parents who need quality products
                delivered fast, with checkout that takes less than 3 minutes.
              </p>

              <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
              <p className="text-gray-700 mb-6">
                We carefully curate a selection of high-quality toys, educational materials, baby
                care products, and accessories. Every product is tested for safety and selected for
                its value to your family.
              </p>

              <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Fast, secure checkout in under 3 minutes</li>
                <li>Quality products tested for safety</li>
                <li>Free shipping on orders over $50</li>
                <li>Instant access to digital products</li>
                <li>Excellent customer service</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700">
                Have questions? We're here to help! Reach out to us at support@kidstore.com or
                visit our contact page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
