const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

// Accessing test data
const newAccount = credentials.newAccount;
const url = urldata.urls;
const createAccLocators = locators.createAccount;

// Locators and methods specific to the AccountPage
class AccountPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url.bankAcc;
    this.baseUrl = url.baseUrl;
    this.bankName = By.css(createAccLocators.bankName);
    this.accNumber = By.css(createAccLocators.accNumber);
    this.routNumber = By.css(createAccLocators.routingNum);
    this.bankAccBtn = By.css(createAccLocators.bankAccBtn);
    this.createBtn = By.css(createAccLocators.createBtn);
    this.saveBtn = By.css(createAccLocators.saveBtn);
    this.deleteBtn = By.css(createAccLocators.deleteBtn);
    this.listItem = By.css(createAccLocators.accountListItem);
    this.pText = By.css(createAccLocators.accountText);
  }

  // Creates a new bank account by filling out the required fields and saving it.
  async createAccount() {
    // Click on the "Bank Account" and "Create" buttons
    await this.clickBtn(this.bankAccBtn);
    await this.clickBtn(this.createBtn);

    // Get data from the new account object
    const { bankName, accountNumber, routingNumber } = newAccount;

    // Fill in and submit bank account information
    await this.waitForElementVisible(this.bankName);
    await this.sendKeys(this.bankName, bankName);

    await this.waitForElementVisible(this.accNumber);
    await this.sendKeys(this.accNumber, accountNumber);

    await this.waitForElementVisible(this.routNumber);
    await this.sendKeys(this.routNumber, routingNumber);

    await this.clickBtn(this.saveBtn);
    await this.waitForUrl(url.bankAcc);
  }

  // Deletes the bank account
  async deleteAccount() {
    // Calls function from BasePage and deletes wanted bank account
    await this.deleteBankAccount(this.deleteBtn);
  }
}
module.exports = AccountPage;