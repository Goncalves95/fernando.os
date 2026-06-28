import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fernando-os.dev";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/#projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#skills`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/#about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/#contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
