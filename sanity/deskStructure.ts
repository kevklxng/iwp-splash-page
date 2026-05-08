import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], title: string, type: string, documentId: string) =>
  S.listItem().title(title).id(`singleton-${documentId}`).child(S.document().schemaType(type).documentId(documentId));

/** Custom Studio desk — lives at `sanity/deskStructure.ts` so we don't shadow the `sanity/structure` package. */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "Home Page", "homePage", "home-page"),
              singleton(S, "About Page", "aboutPage", "about-page"),
              singleton(S, "Process Page", "processPage", "process-page"),
              singleton(S, "Contact Page", "contactPage", "contact-page"),
              singleton(S, "Work Page", "workPage", "work-page"),
              singleton(S, "Partners Page", "partnersPage", "partners-page"),
            ]),
        ),
      singleton(S, "Site Settings", "siteSettings", "site-settings"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("formSubmission").title("Form submissions"),
    ]);
