'use client';

import { useState } from 'react';
import { ShoppingBag, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/layout';
import { Eyebrow } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { siteConfig } from '@/config/site';
import { useFormAction, FormErrorSummary, FormSuccessMessage } from '@/components/ui/form-action';
import { submitStoreLaunchForm } from '@/lib/actions';

const plannedCategories = [
  { name: 'Personal Protective Equipment', description: 'Gloves, helmets, eyewear, hi-vis, footwear, and respiratory protection.' },
  { name: 'Fire & Emergency Equipment', description: 'Extinguishers, alarms, signage, evacuation kits, and emergency response supplies.' },
  { name: 'First Aid Products', description: 'Workplace-compliant first-aid kits, refills, and specialist medical supplies.' },
  { name: 'Safety Signage', description: 'Mandatory, warning, prohibition, and safe-condition signage for workplaces.' },
  { name: 'Spill Control', description: 'Spill kits, absorbents, containment, and environmental protection products.' },
  { name: 'Inspection & Monitoring Equipment', description: 'Gas detectors, sound-level meters, lux meters, and inspection tools.' },
  { name: 'Workplace Safety Kits', description: 'Curated bundles tailored to industry-specific workplace safety needs.' },
];

export default function StoreComingSoon() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    interests: [] as string[],
  });

  const { state, isPending, formRef, successRef, formAction } =
    useFormAction({ action: submitStoreLaunchForm });

  const showErrors = !!state.errors || (!state.success && !!state.message);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cube-navy text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-cube-navy via-cube-navy to-cube-green/20" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(94,148,0,0.3) 0%, transparent 50%)' }} />
        <Container className="relative z-10 section-lg">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cube-green/20 ring-1 ring-cube-green/30">
              <ShoppingBag className="h-8 w-8 text-cube-green" aria-hidden="true" />
            </div>
            <Eyebrow className="text-cube-green">COMING SOON</Eyebrow>
            <h1 className="mt-4 text-h1 text-white">Cube Store</h1>
            <p className="mt-4 text-xl text-white/80">
              Your trusted source for workplace safety equipment, PPE, emergency supplies, and compliance products — launching soon.
            </p>
            <p className="mt-6 text-body text-white/60">
              We are carefully curating a range of high-quality workplace safety products to support your QHSE journey. While the Cube Store is being prepared, you can still request product quotations directly through our team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?service=cube-store">
                <Button size="lg" className="bg-cube-green hover:bg-cube-green/90 text-white">
                  REQUEST A PRODUCT QUOTATION
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WHATSAPP US
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Planned Categories */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>WHAT'S COMING</Eyebrow>
            <h2 className="mt-3 text-h2 text-cube-navy">Planned Product Categories</h2>
            <p className="mt-4 text-body text-muted-foreground">
              The Cube Store will offer a comprehensive range of workplace safety products, organised into the following categories:
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plannedCategories.map((cat) => (
              <div key={cat.name} className="rounded-xl border border-cube-soft bg-cube-soft/30 p-6 transition-colors hover:border-cube-green/30 hover:bg-cube-soft/50">
                <h3 className="text-lg font-semibold text-cube-navy">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Notification Form */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <div className="rounded-2xl border border-cube-soft bg-white p-8 sm:p-12 shadow-sm">
            <div className="mx-auto max-w-xl">
              {state.success ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cube-green/10">
                    <CheckCircle2 className="h-8 w-8 text-cube-green" aria-hidden="true" />
                  </div>
                  <h2 className="text-h3 text-cube-navy">Thank You!</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    We have received your notification request and will be in touch when the Cube Store launches. If you need safety products sooner, please request a quotation — we are happy to help.
                  </p>
                  <Link href="/contact?service=cube-store" className="mt-6 inline-block">
                    <Button className="bg-cube-green hover:bg-cube-green/90 text-white">
                      REQUEST A PRODUCT QUOTATION NOW
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <Eyebrow>STAY INFORMED</Eyebrow>
                    <h2 className="mt-3 text-h3 text-cube-navy">Be Notified When We Launch</h2>
                    <p className="mt-3 text-body text-muted-foreground">
                      Complete the form below and we will let you know as soon as the Cube Store goes live.
                    </p>
                  </div>
                  {showErrors && (
                    <FormErrorSummary errors={state.errors} message={state.message} />
                  )}
                  <form ref={formRef} action={formAction} className="mt-8 space-y-5">
                    <div>
                      <Label htmlFor="notify-name">Name <span className="text-cube-critical">*</span></Label>
                      <Input
                        id="notify-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notify-email">Email <span className="text-cube-critical">*</span></Label>
                      <Input
                        id="notify-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="you@business.com"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notify-business">Business Name</Label>
                      <Input
                        id="notify-business"
                        name="business_name"
                        type="text"
                        value={formData.business}
                        onChange={(e) => setFormData((prev) => ({ ...prev, business: e.target.value }))}
                        placeholder="Your company or organisation"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Product Interests</Label>
                      <p className="text-sm text-muted-foreground mt-1">Select any categories you are interested in:</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {plannedCategories.map((cat) => (
                          <label key={cat.name} className="flex items-center gap-2.5 text-sm cursor-pointer">
                            <Checkbox
                              name="product_interests"
                              value={cat.name}
                              checked={formData.interests.includes(cat.name)}
                              onCheckedChange={() => toggleInterest(cat.name)}
                            />
                            <span className="text-muted-foreground">{cat.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-cube-green hover:bg-cube-green/90 text-white" loading={isPending} disabled={isPending}>
                      NOTIFY ME
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By submitting this form, you agree to be contacted by SAFE CUBE regarding the Cube Store launch. Your information will be handled in accordance with our Privacy Policy.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
