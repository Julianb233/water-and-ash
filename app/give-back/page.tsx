import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Waves, Users } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Give Back',
  description:
    'Learn about Water & Ash Burials community initiatives, including ocean conservation, grief support, and veteran services.',
};

const initiatives = [
  {
    icon: Waves,
    title: 'Ocean Conservation',
    description:
      'We partner with local marine conservation organizations to protect the waters we serve. A portion of every ceremony supports ocean cleanup and preservation efforts.',
  },
  {
    icon: Heart,
    title: 'Grief Support',
    description:
      'We provide resources and referrals to grief counseling services in San Diego. Families receive a curated list of support groups and professional counselors.',
  },
  {
    icon: Users,
    title: 'Veteran Services',
    description:
      'We offer special pricing for veterans and active military families. Our team honors those who served with the dignity they deserve.',
  },
];

export default function GiveBackPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Giving Back to Our Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We believe in supporting the ocean that hosts these meaningful
              ceremonies and the families who trust us during difficult times.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Initiatives Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Our Initiatives
            </h2>
            <p className="mt-4 text-muted-foreground">
              These programs reflect our commitment to the San Diego community
              and the ocean we depend on.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <Card key={initiative.title}>
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <initiative.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">
                    {initiative.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {initiative.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Ocean Conservation Details */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Protecting Our Ocean
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              The Pacific Ocean is not just our workplace—it&apos;s a sacred space
              where families say their final goodbyes. We take our role as ocean
              stewards seriously.
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  EPA Compliance & Beyond
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We follow all federal regulations for sea burials, conducting
                  ceremonies at least 3 nautical miles offshore. Our biodegradable
                  floral tributes and eco-friendly practices ensure we leave no
                  lasting impact.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Partnership with Local Organizations
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We donate a portion of every ceremony to San Diego-based marine
                  conservation groups working to protect coastal habitats, reduce
                  ocean pollution, and preserve marine life.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Education & Awareness
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Through our ceremonies, families learn about the ocean ecosystem
                  and the importance of protecting it. We provide information about
                  sustainable practices and conservation efforts.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Veteran Services */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Honoring Those Who Served
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-center">
              Veterans and active military families receive special consideration
              for our services. Contact us to learn about our veteran pricing and
              how we can help honor your loved one&apos;s service.
            </p>
            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us About Veteran Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Grief Resources */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Grief Support Resources
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Losing a loved one is one of life&apos;s most difficult experiences.
              While we handle the sea burial ceremony, we also want to support
              your emotional journey through grief.
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Professional Counseling Referrals
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We maintain relationships with licensed grief counselors and
                  therapists in San Diego who specialize in bereavement support.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Support Groups</h3>
                <p className="mt-2 text-muted-foreground">
                  We can connect you with local support groups where you can
                  share your experience with others who understand what you&apos;re
                  going through.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Online Resources</h3>
                <p className="mt-2 text-muted-foreground">
                  We provide a curated list of articles, books, and online
                  resources about grief, healing, and remembrance.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Contact us to receive our grief support resource guide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold">
              Let Us Help You
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you need information about our services or grief support
              resources, we&apos;re here for you.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
