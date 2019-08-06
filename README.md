# The Burger Builder (underline)

This version of the App is created using React. The overall state of the Application is controlled by Redux, but there are Class based components that still control state that are not dependant on the overall App.

Another Version of this Application will be uploaded soon using the new React Hooks feature.

## Technologies & Packages

- React
- React Router
- Redux
- Redux Thunk
- Axios
- Prop Types
- CSS Modules
- Babel
- Webpack
- Jest & Enzyme (Unit Testing)
- Autoprefixer

## Usage

To run this Application locally on your device, you will need to run:
```
npm install
```
This will install the dependancies required for the application that are saved within package-lock && package.json.

If this does not work out the box, please read any ERROR messages thrown by `npm` in the terminal.

## The Folder Structure

```
burger-build/
  .firebase/
  build/
  config/
    jest/
      cssTransform.js
      fileTransform.js
    env.js
    path.js
    polyfills.js
    webpack.config.dev.js
    webpack.config.prod.js
    webpackDevServer.config.js
  node_modules/
  package.json
  public/
    favicon.ico
    index.html
    manifest.json
  scripts/
    build.js
    start.js
    test.js
  src/
    assets/
      images/
        burger-logo.png
    components/
      Burger/
        BuildControls/
          BuildControl/
            BuildControl.css
            BuildControl.js
          BuildControls.css
          BuildControls.js
        BurgerIngredient/
          BurgerIngredient.css
          BurgerIngredient.js
        OrderSummary/
          OrderSummary.js
        Burger.css
        Burger.js
      Logo/
        Logo.css
        Logo.js
      Navigation/
        NavigationItems/
          NavigationItem/
            NavigationItem.css
            NavigationItem.js
          NavigationItems.css
          NavigationItems.js
        SideDrawer/
          DrawerToggle/
            DrawerToggle.css
            DrawerToggle.js
          SideDrawer.css
          SideDrawer.js
        Toolbar/
          Toolbar.css
          Toolbar.js
      Order/
        CheckoutSummary/
          CheckoutSummary.css
          CheckoutSummary.js
        Order.css
        Order.js
      UI/
        Backdrop/
          Backdrop.css
          Backdrop.js
        Button/
          Button.css
          Button.js
        Input/
          Input.css
          Input.js
        Modal/
          Modal.css
          Modal.js
        Spinner/
          Spinner.css
          Spinner.js
    containers/
      Auth/
        Logout/
          Logout.js
        Auth.css
        Auth.js
      BurgerBuilder/
        BurgerBuilder.js
        BurgerBuilder.test.js
      Checkout/
        ContactData/
          ContactData.css
          ContactData.js
        Checkout.js
      Orders/
        Orders.js
    hoc/
      asyncComponent/
        asyncComponent.js
      Aux/
        Aux.js
      Layout/
        Layout.css
        Layout.js
      withErrorHandler/
        withErrorHandler.js
    shared/
      utility.js
    store/
      actions/
        actionTypes.js
        auth.js
        burgerBuilder.js
        index.js
        order.js
      reducers/
        auth.js
        auth.test.js
        burgerBuilder.js
        order.js
    App.js
    axios-orders.js
    index.js
    registerServiceWorker.js
  .firebaserc
  .gitignore
  firebase.json
  package-lock.json
  package.json
  yarn.lock
```
