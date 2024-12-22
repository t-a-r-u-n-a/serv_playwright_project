import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../../pages/homepage';
import { SearchResultsPage } from '../../pages/searchResultsPage';
import { CartPage } from '../../pages/cartPage';
import { SlideOut } from '../../pages/slideout';
import { ViewCartPage } from '../../pages/viewCartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { PaymentPage } from '../../pages/paymentPage';

//Test Case 3: Search TV, add TV to shopping cart, proceed to checkout page
test('should search TV, add to cart, and proceed to checkout', async ({ }) => {
  
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
  const viewcartpage = new ViewCartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);

  // Navigate to the homepage
  await page.goto('https://www.jbhifi.com.au/');
  
  // Type in TV into search input field on homepage
  await homePage.searchTV('TV');
  
  // Filter price range and exclude sale items and click Search once the configuration is finalised
  await homePage.providePriceRange(1500, 2500, true);

  // Add the first 3 TVs to the cart
  const firstProduct = await searchResultsPage.addProductToCart(1);
  await slideout.closeSlideout();
  const secondProduct = await searchResultsPage.addProductToCart(2);
  await slideout.closeSlideout();
  
  // Click on Cart icon located on top right corner of the navigation bar
  await cartPage.openCart();

  // Add 1 more quantity for the 2nd TV
  const expectedCartTotal = await cartPage.incrementQuantity(2);
  
  //Click on Checkout to proceed to customer & shipping information page
  await cartPage.checkout();

  // Fill in contact details and proceed to payment
  await checkoutPage.selectStore();
  await checkoutPage.fillInContactDetails();
  
  // Retrieve email from checkout page
  const emailCheckout = await checkoutPage.getEmail();
  const selectedShippingMethod = await checkoutPage.getSelectedShippingMethod();

  await checkoutPage.proceedToPayment();

  // Assert product details and payment methods
  await paymentPage.assertUserDetails(emailCheckout, selectedShippingMethod);
  await paymentPage.assertSubtotal(expectedCartTotal);
  await paymentPage.assertPaymentMethods();

  // Close the browser
  await browser.close();
});
