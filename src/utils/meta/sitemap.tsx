interface Options {
  /** 
   * The date of last modification of the page. This date should be in W3C Datetime format. This format allows you to omit the time portion, if desired, and use YYYY-MM-DD.
   * 
   * Note that the date must be set to the date the linked page was last modified, not when the sitemap is generated.
   * 
   * Note also that this tag is separate from the If-Modified-Since (304) header the server can return, and search engines may use the information from both sources differently. 
   * 
   */
  lastMod?: Date | string;

  /**
   *  How frequently the page is likely to change. This value provides general information to search engines and may not correlate exactly to how often they crawl the page. Valid values are:
   *
   * always
   * hourly
   * daily
   * weekly
   * monthly
   * yearly
   * never
   * 
   * The value "always" should be used to describe documents that change each time they are accessed. The value "never" should be used to describe archived URLs.
   * 
   * Please note that the value of this tag is considered a hint and not a command. Even though search engine crawlers may consider this information when making decisions, they may crawl pages marked "hourly" less frequently than that, and they may crawl pages marked "yearly" more frequently than that. Crawlers may periodically crawl pages marked "never" so that they can handle unexpected changes to those pages.
   * 
   * @default "monthly"
   */
  changeFreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

  /** 
   * The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0. This value does not affect how your pages are compared to pages on other sites—it only lets the search engines know which pages you deem most important for the crawlers.
   * 
   * The default priority of a page is 0.5. 
   * 
   * Please note that the priority you assign to a page is not likely to influence the position of your URLs in a search engine's result pages. Search engines may use this information when selecting between URLs on the same site, so you can use this tag to increase the likelihood that your most important pages are present in a search index.
   * 
   * Also, please note that assigning a high priority to all of the URLs on your site is not likely to help you. Since the priority is relative, it is only used to select between URLs on your site. 
   * 
   * @default 0.5
   */
  priority?: number;
}

export const makeSitemapMeta = ({ changeFreq, lastMod, priority = 0.5 }: Options) => {
  return [
    changeFreq && <meta
      key="sitemap:change_frequency"
      name="page_change_frequency"
      content={changeFreq}
    />,
    lastMod && <meta
      key="sitemap:last_modification"
      name="page_last_modification"
      content={typeof lastMod === "string" ? lastMod : lastMod.toISOString()}
    />,
    priority && <meta
      key="sitemap:priority"
      name="page_priority"
      content={String(priority)}
    />
  ];
};