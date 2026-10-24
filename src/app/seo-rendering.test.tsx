import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import GuidePage from "@/components/GuidePage";
import { GUIDES, guidePath } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";
import Home from "./page";
import Privacy from "./privacy/page";
import Support from "./support/page";
import NotFound from "./not-found";

const pages = [
  { path: "/", element: <Home /> },
  ...GUIDES.map((guide) => ({ path: guidePath(guide), element: <GuidePage guide={guide} /> })),
  { path: "/support/", element: <Support /> },
  { path: "/privacy/", element: <Privacy /> },
  { path: "/404/", element: <NotFound /> },
];

describe("rendered SEO structure", () => {
  test.each(pages)("$path has a heading hierarchy and consistent JSON-LD", ({ path, element }) => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(element), "text/html");
    const main = document.querySelector("main")!;
    expect(main, path).not.toBeNull();
    expect(main.querySelectorAll("h1"), path).toHaveLength(1);
    let previous = 0;
    for (const heading of main.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
      const level = Number(heading.tagName.slice(1));
      expect(level, heading.textContent ?? path).toBeLessThanOrEqual(previous + 1);
      expect(heading.textContent?.trim()).toBeTruthy();
      previous = level;
    }

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts, path).toHaveLength(1);
    const data = JSON.parse(scripts[0].textContent!);
    expect(data["@context"]).toBe("https://schema.org");
    const graph = data["@graph"];
    const page = graph.find((node: { "@type": string }) => node["@type"] === "WebPage");
    expect(page).toMatchObject({ url: absoluteUrl(path), "@id": `${absoluteUrl(path)}#page` });
    expect(graph.map((node: { "@type": string }) => node["@type"])).toEqual(
      expect.arrayContaining(["Organization", "WebSite", "MobileApplication"]),
    );
    if (path !== "/" && path !== "/404/") {
      const breadcrumb = graph.find((node: { "@type": string }) => node["@type"] === "BreadcrumbList");
      expect(page.breadcrumb["@id"]).toBe(breadcrumb["@id"]);
      expect(breadcrumb.itemListElement.at(-1).item).toBe(absoluteUrl(path));
    }
    for (const section of main.querySelectorAll("section[aria-labelledby]")) {
      expect(document.getElementById(section.getAttribute("aria-labelledby")!)).not.toBeNull();
    }
  });

  test("homepage offers a workflow path and ends with the early-access conversion", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<Home />), "text/html");
    expect(document.querySelector('main section:first-child a[href="#how"]')).not.toBeNull();
    expect(document.querySelector("main > section:last-child")?.id).toBe("early-access");
    expect(document.querySelector('#early-access a[href^="mailto:"]')).not.toBeNull();
  });
});
