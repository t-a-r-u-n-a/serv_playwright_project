import { Page } from 'playwright';

export class SlideOut {
    readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async closeSlideout() {
    
    //Locators
    const slideOut = `[data-testid="slideout"]:nth-child(1)`;
    const continueShoppingLink = `[data-testid="slideout-added-to-cart-alert"]>div>div>button[data-testid="slideout-continue-shopping-button"]`;
    const slideOutCloseButton = `[data-testid="slideout-close-button"]:nth-child(1)`;

    //Close slideout
    await this.page.waitForSelector(slideOutCloseButton);
    await this.page.waitForTimeout(5000);
    await this.page.click(slideOutCloseButton);
    
  }
  
}



