import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-3">Introduction</h2>
                <p className="text-gray-700">
                  This Privacy Policy describes how KidStore collects, uses, and protects your
                  personal information when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                <p className="text-gray-700 mb-2">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Name and contact information</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communications with customer support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
                <p className="text-gray-700 mb-2">We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders</li>
                  <li>Provide customer support</li>
                  <li>Send promotional materials (with your consent)</li>
                  <li>Improve our products and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Data Security</h2>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
                <p className="text-gray-700 mb-2">You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy, please contact us at
                  privacy@kidstore.com
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
