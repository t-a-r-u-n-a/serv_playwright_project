import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}
  
    async openCart() {
      
      //Click on cart button
      await this.page.click('div[id="minicart-toggle"] button[type="button"]');
    }

    async viewCart() {
        
        //Click on view cart button on cart slideout
        await this.page.click('.cart-buttons-cart');
        
      }

      async checkout() {
        
        //Click on check out cart button on cart slideout
        await this.page.click('.cart-buttons-checkout');
        
      }  
  
      async assertProductInCart(productIndex: number, product: { name: string | null; price: string | null }) {
      
        //Assert the added TV products’ name and price
        const productInCart = await this.page.textContent(`.cart-mini__content>[data-index="${productIndex}"]>div:nth-child(2)>div>div:nth-child(1)>div>h6>a`);
      
        console.log("Product is:", productInCart);
        expect(productInCart?.trim()).toBe(product.name);
  
        const priceInCart = await this.page.textContent(`text=${product.price}`);
        expect(priceInCart).toBe(product.price);
    }
  
      async assertSubtotal() {
        
        //Assert subtotal amount
        const prices = await this.page.$$eval('span.price', (prices) =>
          prices.map((price) => parseFloat(price.textContent!.replace(/[^0-9.]/g, '')))
        );
        const subtotal = prices.reduce((total, price) => total + price, 0);
        console.log("AddedSubtotal: ", subtotal);
    
        const displayedSubtotal = parseFloat(
          (await this.page.textContent('span.cart-price-total'))!.replace(/[^0-9.]/g, '')
        );
        expect(displayedSubtotal).toBeCloseTo(subtotal);
      }

    async incrementQuantity(productIndex: number) {
        
        //Add quantity for the TV shown on the Cart
        const itemNumber = productIndex-1; 
        const quantityButton = this.page.locator(`.cart-mini__content>[data-index="${itemNumber}"]>div:nth-child(2)>div:nth-child(2)>div:nth-child(2)>div:nth-child(1)>div>div>button.value-button.value--increase`);
        await quantityButton.click();
      }
        
  }