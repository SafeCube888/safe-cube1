'use client';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { Faq } from '@/types/content';

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="rounded-lg border border-cube-soft bg-cube-soft px-4 data-[state=open]:bg-white data-[state=open]:shadow-card"
        >
          <AccordionTrigger className="text-left text-base font-semibold text-cube-navy hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-body text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
