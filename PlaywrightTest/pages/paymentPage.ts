import { Page, expect } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly productName: string;
  readonly productPrice: string;
  readonly productSubtotal: string;
  readonly paymentMethods: string;
  readonly email: string
  readonly shipping: string

  constructor(page: Page) {
    this.page = page;
    
    this.email = '[aria-label="Review"]>div>div:nth-child(2)>div>:nth-child(1)>div:nth-child(2)>bdo';
    this.shipping = '[aria-label="Review"]>div>div:nth-child(2)>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)>div>div>p>span>span';
  }

  async assertUserDetails(emailCheckout: string, selectedShippingMethod: string ) {

    const emailDisplayed = await this.page.locator(this.email).innerText();
    const shippingDisplayed = await this.page.locator(this.shipping).innerText();
  
    expect(emailDisplayed.trim()).toBe(emailCheckout.trim());
    expect(shippingDisplayed.trim()).toContain(shippingDisplayed.trim());
  
  }

  async assertSubtotal(expectedSubTotal: number) {
    
    //Assert subtotal amount
    const displayedSubtotal = parseFloat(
      (await this.page.textContent('[aria-labelledby="MoneyLine-Heading0"]>div:nth-child(2)>div:nth-child(3)>div:nth-child(2)>div>div>strong'))!.replace(/[^0-9.]/g, '')
    );
    expect(displayedSubtotal).toBeCloseTo(expectedSubTotal);
  }

  async assertPaymentMethods() {
    await this.page.waitForTimeout(20000);
    const methods = await this.page.locator('[aria-label="Payment"]>div>div:nth-child(2)>div>div>div').count();
    expect(methods).toBe(5); // Expecting 5 payment methods
  }
}
