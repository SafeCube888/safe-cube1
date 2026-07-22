'use client';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Container } from '@/components/ui/layout';
import { PageHero } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

const glossaryTerms: { term: string; definition: string }[] = [
  { term: 'Audit', definition: 'A systematic, independent, and documented process for obtaining evidence and evaluating it objectively to determine the extent to which audit criteria are fulfilled.' },
  { term: 'CAPA', definition: 'Corrective Action and Preventive Action. A combined process for addressing existing problems (corrective) and preventing potential problems (preventive).' },
  { term: 'Compliance', definition: 'Meeting the requirements of applicable laws, regulations, standards, and internal or client expectations.' },
  { term: 'Corrective Action', definition: 'An action taken to eliminate the cause of a detected nonconformity or other undesirable situation to prevent recurrence.' },
  { term: 'Emergency Preparedness', definition: 'The state of being ready to respond effectively to workplace emergencies, including plans, equipment, training, and procedures.' },
  { term: 'Environmental Aspect', definition: 'An element of an organization\u2019s activities, products, or services that can interact with the environment, such as waste generation, emissions, or resource use.' },
  { term: 'Hazard', definition: 'A source, situation, or act with the potential to cause harm in terms of human injury, damage to property, damage to the environment, or a combination of these.' },
  { term: 'Hierarchy of Controls', definition: 'A system for selecting controls in order of effectiveness: elimination, substitution, engineering controls, administrative controls, and personal protective equipment.' },
  { term: 'Incident', definition: 'An event that did or could have resulted in injury, illness, damage, or loss. Includes both accidents and near-misses.' },
  { term: 'Inspection', definition: 'A structured examination of a workplace, equipment, or process to identify hazards, verify compliance, or assess condition.' },
  { term: 'Internal Audit', definition: 'An audit conducted by, or on behalf of, the organization itself to evaluate the effectiveness of its management system.' },
  { term: 'ISO 9001', definition: 'An international standard that specifies requirements for a quality management system, focusing on customer satisfaction, process effectiveness, and continual improvement.' },
  { term: 'ISO 14001', definition: 'An international standard that specifies requirements for an environmental management system, focusing on environmental aspects, impacts, and compliance obligations.' },
  { term: 'ISO 45001', definition: 'An international standard that specifies requirements for an occupational health and safety management system, focusing on hazard identification, risk assessment, and worker participation.' },
  { term: 'Management System', definition: 'A set of interrelated or interacting elements that organizations use to establish policies and objectives and to achieve those objectives, including structure, responsibilities, procedures, and resources.' },
  { term: 'Near Miss', definition: 'An incident that did not result in injury, illness, or damage but had the potential to do so. Reporting near-misses helps prevent future incidents.' },
  { term: 'Occupational Health', definition: 'The promotion and maintenance of the highest degree of physical, mental, and social wellbeing of workers in all occupations, including the prevention of health risks from workplace conditions.' },
  { term: 'PPE', definition: 'Personal Protective Equipment. Equipment worn or used by a person to protect against hazards, including gloves, goggles, helmets, safety footwear, hearing protection, and respirators.' },
  { term: 'Preventive Action', definition: 'An action taken to eliminate the cause of a potential nonconformity or other undesirable situation to prevent occurrence.' },
  { term: 'Quality', definition: 'The degree to which a set of inherent characteristics fulfils requirements. In a business context, it means consistently delivering products or services that meet customer and regulatory expectations.' },
  { term: 'Risk', definition: 'The combination of the likelihood of occurrence of a hazardous event and the severity of the harm or damage that could result.' },
  { term: 'Risk Assessment', definition: 'The overall process of identifying hazards, evaluating risks, and deciding on controls to reduce risk to an acceptable level.' },
  { term: 'Root Cause', definition: 'The fundamental reason for the occurrence of a problem or incident. Addressing root causes helps prevent recurrence.' },
  { term: 'Safe Work Procedure', definition: 'A documented set of steps for performing a task safely, including hazards, controls, and precautions.' },
  { term: 'Standard Operating Procedure (SOP)', definition: 'A documented procedure that describes the regularly recurring operations or processes in an organization, intended to ensure consistency and quality.' },
  { term: 'Toolbox Talk', definition: 'A short, informal safety briefing or discussion held at the workplace, typically focused on a specific hazard, task, or safety topic.' },
  { term: 'Workplace Safety', definition: 'The management of conditions and practices in a workplace to protect workers from hazards that could cause injury, illness, or damage.' },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const letters = useMemo(() => {
    const set = new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesSearch = !search ||
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.definition.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = !activeLetter || item.term[0].toUpperCase() === activeLetter;
      return matchesSearch && matchesLetter;
    });
  }, [search, activeLetter]);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Centre', href: '/knowledge-centre' }, { label: 'Glossary' }]}
        eyebrow="GLOSSARY"
        title="Workplace Safety Glossary"
        description="Clear explanations of common QHSE, safety, compliance, and management-system terms used in workplace assessments, audits, and improvement plans."
        image={pageImages.knowledgeCentreHero}
        imageAlt={pageImages.knowledgeCentreHeroAlt}
        variant="compact"
        theme="light"
      />

      <section className="section-standard bg-white">
        <Container>
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search terms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search glossary terms"
                className="w-full rounded-md border border-cube-soft bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
              />
            </div>
          </div>

          {/* Alphabet navigation */}
          {!search && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveLetter(null)}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${!activeLetter ? 'bg-cube-green text-white' : 'bg-cube-soft text-cube-navy hover:bg-cube-soft/80'}`}
              >
                All
              </button>
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${activeLetter === letter ? 'bg-cube-green text-white' : 'bg-cube-soft text-cube-navy hover:bg-cube-soft/80'}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}

          {/* Terms */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.term} className="rounded-lg border border-cube-soft bg-cube-soft p-5">
                <h3 className="text-base font-semibold text-cube-navy">{item.term}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.definition}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-lg border border-cube-soft bg-cube-soft p-12 text-center">
              <p className="text-body-lg text-muted-foreground">No terms found matching your search.</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg border border-cube-soft bg-cube-soft p-4">
            <p className="text-xs text-muted-foreground">
              These definitions are provided for general understanding only and do not constitute professional advice. They do not replace official definitions from standards bodies, regulatory authorities, or legal counsel.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
