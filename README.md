# playwright_shopping_project
```markdown
# UI Automation with Playwright

This project contains automated UI test cases for the JB Hi-Fi website (https://www.jbhifi.com.au/) using Playwright. The test suite is named **UI Automation** and includes test cases mentioned in Test suite.

--------

## Prerequisites

- Node.js installed (v14 or later recommended)
- Playwright installed

To install Playwright:
```bash
npm install playwright
```

--------

## Test Suite Overview

### **Test Case 1: Search TV and Add to Cart**

**Steps:**
1. Navigate to the JB Hi-Fi homepage.
2. Type in TV into search input field on homepage
3. Filter price by clicking on Price range and configure;
    - minimum of $500 and maximum of $4000
   - include Sales items if there is available
4. Click Search once the configuration is finalised
5. Add the 1st and the 3rd TV product to cart
6. Click on Cart icon located on top right corner of the navigation bar
7. Assert the added TV products’ name, price and subtotal amount

--------

### **Test Case 2: Search TV, Add to Cart, and View Cart**

**Steps:**
1. Navigate to the JB Hi-Fi homepage.
2. Type in TV into search input field on homepage
3. Filter price by clicking on Price range and configure;
   - minimum of $1000 and maximum of $2000
   - exclude Sales items if there is available
4. Click Search once the configuration is finalised
5. Add the first 3x displayed TV products to cart
6. Click on Cart icon located on top right corner of the navigation bar
7. Add 1x more quantity for the 1st TV shown on the Cart
8. Click on View Cart to proceed to Cart page
9. Assert all the TV products added to Cart to verify
  - Each product name and price
  - Subtotal of all added products
10. Click on Check availability button and enter ‘3000’ as the postcode into input field
  - Select ‘Melbourne VIC 3004’ from the dropdown
11. Assert that Delivery, Click & Collect, In-store options are displayed
12. Close the previous availability panel

--------

### **Test Case 3: Search TV, Add to Cart, and Proceed to Checkout**

**Steps:**
1. Navigate to the JB Hi-Fi homepage.
2. Type in TV into search input field on homepage
3. Filter price by clicking on Price range and configure;
  - minimum of $1500 and maximum of $2500
  - include Sales items if there is available
4. Click Search once the configuration is finalised
5. Add the 1st and the 2nd TV product to cart
6. Click on Cart icon located on top right corner of the navigation bar
7. Add 1x more quantity for the 2nd TV shown on the Cart
8. Click on Checkout to proceed to customer & shipping information page
9. Type in a fake but valid email address into input field
10. Select Click & Collect as the delivery method
11. Select the first closest returned store and remove any TV products that are unavailable in the selected store
12. Type or fill in all required collection contact information using fake but valid
data
13. Assert that TV product name, price and subtotal are correctly displayed
14. Click on Continue to payment to proceed to payment page
15. Assert that correct contact email is displayed
16. Assert that correct shipping method is displayed
17. Assert that TV product name, price and subtotal are correctly displayed
18. Assert that there are 5x available payment methods (i.e. Credit card, Paypal,
Afterpay etc.)

--------
## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ui-automation.git
   cd ui-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run Playwright tests:
   ```bash
   npx playwright test
   ```

--------

## File Structure

```plaintext
PlaywrightTest
  ├── tests/
    ├── UI Automation/
    │   ├── test-case-1.spec.js
    │   ├── test-case-2.spec.js
    │   └── test-case-3.spec.js
  ├── playwright.config.js
  ├── package.json
└── README.md
```

--------
