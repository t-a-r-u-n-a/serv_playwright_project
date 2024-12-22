import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../../pages/homepage';
import { SearchResultsPage } from '../../pages/searchResultsPage';
import { CartPage } from '../../pages/cartPage';
import { SlideOut } from '../../pages/slideout';

//Test Case 1: Search TV and add TV to shopping cart using the following steps
test('Search TV and add TV to shopping cart', async ({  }) => {
   
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({
        width: 1440,
        height: 900,
      });
    
    //Reference page objects
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const cartPage = new CartPage(page);
    const slideout = new SlideOut(page);

    // Navigate to the homepage
    await page.goto('https://www.jbhifi.com.au/');
    
    // Type in TV into search input field on homepage
    await homePage.searchTV('TV');

    // Filter price range and include sale items and click Search once the configuration is finalised
    await homePage.providePriceRange(500, 4000, true);

    // Add the 1st and 3rd TV products to the cart
    const firstProduct = await searchResultsPage.addProductToCart(1);
    await slideout.closeSlideout();
    const thirdProduct = await searchResultsPage.addProductToCart(3);
    await slideout.closeSlideout();

    // Click on Cart icon located on top right corner of the navigation bar
    await cartPage.openCart();
  
    // Assert the added TV products’ name and price
    await cartPage.assertProductInCart(2, firstProduct);
    await cartPage.assertProductInCart(1, thirdProduct);

    // Assert subtotal
    await cartPage.assertSubtotal();

    // Close the browser
    await browser.close();

    });


