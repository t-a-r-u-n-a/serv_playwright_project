import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly emailInput: string;
  readonly deliveryMethodRadio: string;
  readonly deliveryMethod: string;
  readonly storeSelect: string;
  readonly unavailableTVs: string;
  readonly contactFirstNameInput: string;
  readonly contactLastNameInput: string;
  readonly contactPhoneInput: string;
  readonly contactAddressInput: string;
  //readonly continueToPaymentButton: string;
  readonly productNameLocator: string;
  readonly productPriceLocator: string;
  readonly productSubtotalLocator: string;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = 'input#email';
    this.deliveryMethodRadio = '#delivery_strategies>div>div:nth-child(2)>div>div>input';
    
    //const deliveryOption = this.page.locator('#delivery_strategies>div>div:nth-child(2)>div>div:nth-child(2)>label>div>p');
    this.storeSelect = '#local_pickup_methods>div>div:nth-child(1)>div>div:nth-child(1)>input';
    this.unavailableTVs = '.cart-item.unavailable';
    this.contactFirstNameInput = '[name=firstName]';
    this.contactLastNameInput = '[name=lastName]';
    this.contactPhoneInput = '[placeholder = "Mobile number"]';
    this.productNameLocator = '.checkout-summary .product-name';
    this.productPriceLocator = '.checkout-summary .product-price';
    this.productSubtotalLocator = '.checkout-summary .product-subtotal';
  }

  async fillInContactDetails() {
    await this.page.click(this.emailInput);
    await this.page.fill(this.emailInput, 'test@test.com');
    await this.page.click(this.contactFirstNameInput);
    await this.page.fill(this.contactFirstNameInput, 'John');
    await this.page.click(this.contactLastNameInput);
    await this.page.fill(this.contactLastNameInput, 'Smith');
    await this.page.click(this.contactPhoneInput);
    await this.page.fill(this.contactPhoneInput, '401401401');
    
  }

  async getEmail(): Promise<string> {
    return this.page.inputValue(this.emailInput);
  }

  async getSelectedShippingMethod(): Promise<string> {
    return this.page.locator('#delivery_strategies>div>div:nth-child(2)>div>div:nth-child(2)>label>div>p').innerText();
  }

  async selectStore() {
    await this.page.click(this.deliveryMethodRadio);
    await this.page.waitForSelector(this.storeSelect);
    await this.page.click(this.storeSelect);
  }

  async proceedToPayment() {

    const continueToPaymentButton = this.page.locator('button:has(span:text("Continue to payment"))'); 
      
    //Click on Check Availailibility button      
    await continueToPaymentButton.waitFor();
    await continueToPaymentButton.focus();
    await this.page.waitForTimeout(5000);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState('domcontentloaded');
    
    await this.page.waitForTimeout(5000);
    await expect(continueToPaymentButton).toBeFalsy;
  }
}
