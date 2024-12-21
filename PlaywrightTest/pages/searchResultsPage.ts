import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productIndex: number) {
    
    //Locators
    const productResults = this.page.locator('.search-results-loop');
    const productSelector = this.page.locator(`.search-results-loop>div:nth-child(${productIndex})`);
    const productName = await this.page.textContent(`.search-results-loop>div:nth-child(${productIndex})> div:nth-child(3) > a:nth-child(1) > div:nth-child(2) > div:nth-child(2)`);
    const productPrice = await this.page.textContent(`.search-results-loop > div:nth-child(${productIndex}) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1)`);
    const productCardContent = this.page.locator(`.search-results-loop> div:nth-child(${productIndex}) > div:nth-child(3)`);
    const productAddToCart = `.search-results-loop> div:nth-child(${productIndex}) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)`;
    const productAdded = this.page.locator(`.search-results-loop> div:nth-child(${productIndex}) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)> span:nth-child(2)`);
    
    //Click on Add to cart button for the TV
    await productResults.hover();
    await productResults.click();
    await productCardContent.waitFor();
    await this.page.waitForSelector(productAddToCart);
    await this.page.focus(productAddToCart);
    await this.page.keyboard.press("Enter");
    await expect(productAdded).toHaveText('Added!');
    //console.log("Clicked:", productAddToCart);
    console.log("Product is:", productName);
    console.log("Price is:", productPrice);

    //Return product name and price
    return { name: productName.trim(), price: productPrice.trim() };
  }
}



