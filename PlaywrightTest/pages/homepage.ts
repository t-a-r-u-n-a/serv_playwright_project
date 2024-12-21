import { Page } from 'playwright';

export class HomePage {
    readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page locators
  
  private get searchInput() {
    return this.page.locator('#quicksearch-search-box');
  }

  private get searchForm() {
    return this.page.locator('.input-search');
  }

  private get priceRange() {
    return this.page.locator('button.search-price-range-button');
  }

  private get priceRangeMin() {
    return this.page.locator('input#min-input');
  }

  private get priceRangeMax() {
    return this.page.locator('input#max-input');
  }

  private get saleItems() {
    return this.page.locator('.sale-items');
  }

 
  private get searchButton() {
    return this.page.locator('.search-price-range-dropdown--search');
  }

 
  // Navigate to home page
  async goToHomePage() {
    await this.page.goto('https://www.jbhifi.com.au/');
  }

  // Search for TV
  async searchTV(searchItem: string) {
    await this.searchInput.click();
    await this.searchForm.fill(searchItem);
  }

 
  // Provide PriceRange
  async providePriceRange(minRange: number, maxRange: number, includeSales: boolean ) {
    await this.priceRange.click();
    await this.priceRangeMin.fill(minRange.toString());
    await this.priceRangeMax.fill(maxRange.toString());
    const saleItemsVisible = await this.saleItems.isVisible();
    if (saleItemsVisible == true) {
      if (includeSales == true){
        await this.saleItems.check();
      }
    }
    await this.searchButton.click();
  }

}
