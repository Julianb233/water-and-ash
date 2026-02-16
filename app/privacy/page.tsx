import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Water & Ash Burials. Learn how we collect, use, and protect your personal information when using our sea burial services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'January 27, 2026';

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Privacy Content */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl prose prose-slate">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Introduction
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Water & Ash Burials (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
                  privacy and is committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website or use our
                  services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Information We Collect
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Information about your service needs and preferences</li>
                  <li>Information about your loved one (for ceremony planning)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communications between you and our team</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We use the information we collect to:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your service requests and coordinate ceremonies</li>
                  <li>Communicate with you about your ceremony and our services</li>
                  <li>Send you important updates and documentation</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Comply with legal obligations and EPA regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Information Sharing and Disclosure
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third
                  parties. We may share your information only in the following
                  circumstances:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
                  <li>With your explicit consent</li>
                  <li>With service providers who assist in ceremony operations (vessel captains, crew)</li>
                  <li>To comply with legal obligations or regulatory requirements</li>
                  <li>To protect the rights, property, or safety of our business or others</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Data Security
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We implement appropriate technical and organizational measures to
                  protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction. However, no method of
                  transmission over the internet or electronic storage is 100%
                  secure.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Data Retention
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We retain your personal information for as long as necessary to
                  provide our services, comply with legal obligations, resolve
                  disputes, and enforce our agreements. Ceremony records, including
                  GPS coordinates and certificates, are maintained indefinitely for
                  historical and compliance purposes.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Your Rights
                </h2>
                <p className="mt-4 text-muted-foreground">
                  You have the right to:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal obligations)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent where we rely on consent to process your data</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Cookies and Tracking
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our website uses cookies and similar tracking technologies to
                  improve your browsing experience and analyze site traffic. You
                  can control cookies through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Third-Party Services
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our website may contain links to third-party websites or services.
                  We are not responsible for the privacy practices of these third
                  parties. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Children&apos;s Privacy
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our services are not directed to individuals under the age of 18.
                  We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Changes to This Privacy Policy
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new Privacy
                  Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
                <p className="mt-4 text-muted-foreground">
                  If you have questions about this Privacy Policy or our privacy
                  practices, please contact us:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p>Water & Ash Burials</p>
                  <p>San Diego, California</p>
                  <p>Phone: 619-928-9160</p>
                  <p>Email: info@waterandashburials.org</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
