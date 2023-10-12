const { Builder } = require('selenium-webdriver');
const SignUpPage = require('../pages/SignUpPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Signup Process Tests', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Signup Process Test', async function () {
    const signUpPage = new SignUpPage(driver);

    // Perform signup
    await signUpPage.performSignUp();

    // Add assertions to verify successful signup
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(signUpPage.loginUrl, "Sign up was not successful");

    // Additional context
    addContext(this, 'Test Case Title: Successful Signup Process Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully sign up for an account on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the website\'s homepage (' + signUpPage.baseUrl + ')');
    addContext(this, 'Step 3: Click on the "Don\'t have an account? Sign Up" link');
    addContext(this, 'Step 4: Verify that the signup page is displayed');
    // Step 5: User Information Input
    addContext(this, 'Step 5.1. Enter a valid first name (' + signUpPage.validSignup.firstName + ') in the first name input field');
    addContext(this, 'Step 5.2. Enter a valid last name (' + signUpPage.validSignup.lastName + ') in the last name input field');
    addContext(this, 'Step 5.3. Enter a valid username (' + signUpPage.validSignup.username + ') in the username input field');
    addContext(this, 'Step 5.4. Enter a valid password (' + signUpPage.validSignup.password + ') in the password input field');
    addContext(this, 'Step 5.5. Enter the same password (' + signUpPage.validSignup.confirmPassword + ') in the password confirmation input field');
    // Step 6: Submit the Signup Form
    addContext(this, 'Step 6. Click on the "SIGN UP" button');
    // Step 7: Verify the Successful Signup
    addContext(this, 'Step 7. Wait for the URL to match (' + signUpPage.loginUrl + ')');
  });

  it('Unsuccessful Signup Process Test', async function () {
    const signUpPage = new SignUpPage(driver);

    // Try to signup with invalid credentials
    await signUpPage.tryInvalidSignUp();

    // Add assertions to verify the signup failed
    const signUpButton = await driver.findElement(signUpPage.singUpBtn);
    expect(await signUpButton.getAttribute('disabled')).to.equal('true', 'Signup button is not disabled for invalid signup');

    // Additional context
    addContext(this, 'Test Case Title: Unsuccessful Signup Process Test');
    addContext(this, 'Test Case Description: Verify that the signup process fails when a user attempts to sign up with invalid or incorrect information on the website.');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the website\'s homepage (' + signUpPage.baseUrl + ')');
    addContext(this, 'Step 3: Click on the "Don\'t have an account? Sign Up" link');
    addContext(this, 'Step 4: Verify that the signup page is displayed');
    // Step 5: User Information Input
    addContext(this, 'Step 5.1. Enter a valid first name (' + signUpPage.invalidSignup.firstName + ') in the first name input field');
    addContext(this, 'Step 5.2. Enter a valid last name (' + signUpPage.invalidSignup.lastName + ') in the last name input field');
    addContext(this, 'Step 5.3. Enter a valid username (' + signUpPage.invalidSignup.username + ') in the username input field');
    addContext(this, 'Step 5.4. Enter a valid password (' + signUpPage.invalidSignup.password + ') in the password input field');
    addContext(this, 'Step 5.5. Enter the same password (' + signUpPage.invalidSignup.confirmPassword + ') in the password confirmation input field');
    // Step 6: Verify that the Signup button is disabled
    addContext(this, 'Step 6.1. Verify that the "SIGN UP" button is disabled');
  });
});
