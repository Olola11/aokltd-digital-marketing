'use client';

import { useState } from 'react';
import { ShowcaseHeader } from '@/components/showcase/showcase-header';
import { ElevationHero } from '@/components/showcase/elevation-hero';
import { ServicesSpotlight } from '@/components/showcase/services-spotlight';
import { WorkReel } from '@/components/showcase/work-reel';
import { EditorialWall } from '@/components/showcase/editorial-wall';
import { ApproachSection } from '@/components/showcase/approach-section';
import { ShowcaseFooter } from '@/components/showcase/showcase-footer';
import { ProjectModal } from '@/components/showcase/project-modal';
import { ProjectEnquiryModal } from '@/components/showcase/project-enquiry-modal';
import { SHOWCASE_PROJECTS, SHOWCASE_SERVICES, Project } from '@/data/showcase-data';
import '@/styles/showcase.css';

export default function WorkShowcasePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsEnquiryOpen(true);
  };

  const handleScrollToReel = () => {
    const el = document.getElementById('the-reel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-[#00008A]">
      {/* 1. Minimal Floating Header */}
      <ShowcaseHeader onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Main Exhibition Sequence */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 2. Hero / Positioning Statement */}
        <ElevationHero
          onOpenEnquiry={() => handleOpenEnquiry()}
          onExploreWork={handleScrollToReel}
        />

        {/* 3. Services — Interactive Index & Spotlight */}
        <ServicesSpotlight
          onSelectServiceToEnquire={(serviceName) => handleOpenEnquiry(serviceName)}
        />

        {/* 4. The Work — Cinematic Film Reel Showcase */}
        <WorkReel
          onOpenProjectModal={(project) => setSelectedProject(project)}
          onOpenEnquiry={(serviceName) => handleOpenEnquiry(serviceName)}
        />

        {/* 4b. The Work — Editorial Project Wall (Reference layout principles) */}
        <EditorialWall
          onOpenProjectModal={(project) => setSelectedProject(project)}
        />

        {/* 5. Approach — The 4 Pillars */}
        <ApproachSection />
      </main>

      {/* 6. Closing CTA / Footer */}
      <ShowcaseFooter onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Same-Page Project Details Modal / Drawer */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenEnquiry={(serviceName) => handleOpenEnquiry(serviceName)}
      />

      {/* Enquiry Conversion Modal ("Start a Project" / "Let's Talk") */}
      <ProjectEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Crawlable Semantic SEO & Screen Reader Index */}
      <div className="sr-only" aria-hidden="false">
        <section aria-labelledby="seo-projects-index">
          <h2 id="seo-projects-index">AOK Ltd Portfolio &amp; Case Studies Index</h2>
          {SHOWCASE_PROJECTS.map((proj) => (
            <article key={proj.slug}>
              <h3>{proj.name}</h3>
              <p>{proj.category} &middot; {proj.year}</p>
              <p>{proj.description}</p>
              <p>{proj.challenge}</p>
              <p>{proj.solution}</p>
              <ul>
                {proj.deliverables.map((del, i) => (
                  <li key={i}>{del}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-services-index">
          <h2 id="seo-services-index">AOK Ltd Creative Services Index</h2>
          {SHOWCASE_SERVICES.map((serv) => (
            <article key={serv.id}>
              <h3>{serv.name} ({serv.cluster})</h3>
              <p>{serv.tagline}</p>
              <p>{serv.description}</p>
              <ul>
                {serv.deliverables.map((del, i) => (
                  <li key={i}>{del}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
