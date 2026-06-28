"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { ContactFormWizard } from "@/components/contact-form-wizard";
import { SplashLogo } from "@/components/splash-logo";

export function SplashMainArea() {
  const [formExpanded, setFormExpanded] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col splash:min-h-full splash:flex-row">
      <div className="flex shrink-0 items-center justify-center px-6 py-10 md:px-8 splash:min-h-0 splash:basis-0 splash:px-8 splash:py-6 xl:pl-12 xl:pr-6 splash:grow">
        <SplashLogo variant="hero" priority tone="light" />
      </div>

      <div
        id="contact"
        className={clsx(
          "flex min-h-0 flex-1 overflow-y-auto px-6 pb-10 md:px-8 splash:basis-0 splash:px-8 splash:py-6 xl:pl-6 xl:pr-12 splash:grow",
          formExpanded ? "items-start" : "items-start splash:items-center",
        )}
      >
        <div className="w-full">
          <ContactFormWizard onExpandedChange={setFormExpanded} />
        </div>
      </div>
    </div>
  );
}
