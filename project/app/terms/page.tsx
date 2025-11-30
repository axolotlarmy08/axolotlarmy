import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using KidStore, you accept and agree to be bound by these Terms
                  of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Use of Service</h2>
                <p className="text-gray-700 mb-2">You agree to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not impersonate others or provide false information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Orders and Payment</h2>
                <p className="text-gray-700">
                  All orders are subject to acceptance and availability. We reserve the right to
                  refuse or cancel any order. Prices are subject to change without notice. Payment
                  must be received before order processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Shipping and Delivery</h2>
                <p className="text-gray-700">
                  Shipping times are estimates and not guaranteed. We are not responsible for
                  delays caused by shipping carriers. Digital products are delivered immediately
                  upon payment confirmation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Returns and Refunds</h2>
                <p className="text-gray-700">
                  Physical products may be returned within 30 days of delivery for a full refund.
                  Items must be unused and in original packaging. Digital products are
                  non-refundable once downloaded.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Intellectual Property</h2>
                <p className="text-gray-700">
                  All content on this website, including text, images, logos, and software, is the
                  property of KidStore and protected by copyright laws. You may not use our content
                  without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
                <p className="text-gray-700">
                  KidStore shall not be liable for any indirect, incidental, special, or
                  consequential damages arising out of or in connection with the use of our
                  services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Changes will be effective
                  immediately upon posting. Your continued use of the service constitutes
                  acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact</h2>
                <p className="text-gray-700">
                  For questions about these Terms of Service, contact us at legal@kidstore.com
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
