import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class ViewCartPage {
    constructor(private page: Page) {
        this.page = page;
    }
  
    async checkAvailability(postcode: string, location: string) {

        // Locator
        const checkAvailabilityButton = this.page.locator('button:has-text("Check availability")');
        const locationSearch = this.page.locator('input[name="location-search"]');

        const dropdownSuggestions = this.page.locator('section.suggestions');
        const dropdownValue = `section.suggestions>div>ul>li>button`;
               
        //Click on Check Availailibility button       
        await checkAvailabilityButton.scrollIntoViewIfNeeded();
        await checkAvailabilityButton.focus();
        await this.page.keyboard.press("Enter");
        
        //Enter postcode in location search field
        await locationSearch.waitFor();
        await locationSearch.click();
        await locationSearch.fill(postcode);

        //Select suburb from dropdown
        await this.page.waitForTimeout(4000);
        await this.page.click(dropdownValue);
        await this.page.waitForTimeout(10000);
               
    }

    async assertDeliveryOptions() {
        
        //Locators
        const deliveryOption = await this.page.textContent('[data-testid="pop-out-drawer-content"]>div:nth-child(2)>div:nth-child(1)>div>div>div>h2');
        const clickAndCollectOption = await this.page.textContent('[data-testid="pop-out-drawer-content"]>div:nth-child(2)>div:nth-child(2)>div>div>div>h2');
        const inStoreOption = await this.page.textContent('[data-testid="pop-out-drawer-content"]>div:nth-child(2)>div:nth-child(3)>div>div>div>h2');
        
        //Assert that Delivery, Click & Collect, In-store options are displayed
        expect(deliveryOption).toContain("Delivery");
        expect(clickAndCollectOption).toContain("Click & Collect");
        expect(inStoreOption).toContain("In-Store");
    }
    
    async closeAvailabilityPanel() {
        
        //Close the previous availability panel
        await this.page.click('[data-testid="pop-out-drawer-close-button"]');
    }
     
  }