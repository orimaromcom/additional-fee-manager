# Wix App buit for Technical Writer position task

A Wix app that enables store owners to add customizable packaging fees to all orders. This app extends the default Wix Stores functionality by providing a simple dashboard interface to manage packaging fees.

## Features

📦 Add packaging fee to all store orders  
💰 Easily customize fee amount through dashboard  
💾 Persistent storage using Wix Data  
🔄 Real-time fee updates  
🛡️ Secure access with elevated permissions  

## Prerequisites

* Wix CLI installed and configured
* Node.js version 18 or higher
* Active Wix development account
* Wix Stores app installed
* Required packages:
  * @wix/data
  * @wix/design-system
  * @wix/ecom/service-plugins
  * @wix/essentials

## Setup
1. Clone the repository:

   ```bash
   git clone https://github.com/orimaromcom/my-wix-app/

2. Install dependencies

   ```bash
   npm install

3. Add required permissions in the Wix app manage page


## Usage

1. Create new version:
   
   ```bash
   npm run create-version

2. View logs for specific version

   ```bash
   npm run logs -- --version YOUR_VERSION_NUMBER

3. Access you wix dashboard:

   - Go to your test site's dashboard
   - Find "Packaging Fee" in the menu
   - Set desired fee amount
  
4. Test in Store:

   - Add products to cart
   - Verify fee appears at checkout
   - Confirm amount matches dashboard settings






