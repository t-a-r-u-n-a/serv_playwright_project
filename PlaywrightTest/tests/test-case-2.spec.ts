import { test} from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { SearchResultsPage } from '../pages/searchResultsPage';
import { CartPage } from '../pages/cartPage';
import { SlideOut } from '../pages/slideout';
import { ViewCartPage } from '../pages/viewCartPage';

//Test Case 2: Search TV, add TV to shopping cart, navigate to cart page
test('Search TV, add TV to shopping cart, navigate to cart page', async ({ page }) => {
    
  //Reference page objects
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const cartPage = new CartPage(page);
  const slideout = new SlideOut(page);
  const viewcartpage = new ViewCartPage(page);

  // Navigate to the homepage
  await page.goto('https://www.jbhifi.com.au/');
  
  // Type in TV into search input field on homepage
  await homePage.searchTV('TV');

  // Filter price range and exclude sale items and click Search once the configuration is finalised
  await homePage.providePriceRange(1000, 2000, false);

  // Add the first 3 TVs to the cart
  const firstProduct = await searchResultsPage.addProductToCart(1);
  await slideout.closeSlideout();
  const secondProduct = await searchResultsPage.addProductToCart(2);
  await slideout.closeSlideout();
  const thirdProduct = await searchResultsPage.addProductToCart(3);
  await slideout.closeSlideout();

  // Click on Cart icon located on top right corner of the navigation bar
  await cartPage.openCart();

  // Add 1 more quantity for the 1st TV
  await cartPage.incrementQuantity(1);

  // Assert product name and price
  await cartPage.assertProductInCart(2, firstProduct);
  await cartPage.assertProductInCart(1, secondProduct);
  await cartPage.assertProductInCart(0, thirdProduct);

  //Assert subtotal
  await cartPage.assertSubtotal();

  // Click on View cart
  await cartPage.viewCart();

  // Click on Check availability button and enter ‘3000’ as the postcode into input field
  await viewcartpage.checkAvailability('3000', 'Melbourne VIC 3004');

  // Assert delivery options are displayed
  await viewcartpage.assertDeliveryOptions();

  // Close the availability panel
  await viewcartpage.closeAvailabilityPanel();
});



