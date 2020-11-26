// You can use this, if you have multiple campaigns and want to use different codes e.g. 50OFF and 25OFF.
const sheetForUserCodeMap = {'CODE_SHARED_WITH_USERS': 'NAME_OF_OFFER_CODE_CAMPAIGN_GOOGLE_SHEET'};

// You can find the appid in the App Store links (https://apps.apple.com/app/<appid>) or App Store Connect.
const appStoreAppID = 'appid';

// The ID of the spreadsheet is in the url e.g. https://docs.google.com/spreadsheets/d/<id>/
const spreadsheetID = '17Sd7rKly7xCf1KncPOLZS5WBkUp6CxfCe7JcPAcpXGo';

/* 
 //You can use the UI and the Logger for debugging.
 var ui = SpreadsheetApp.getUi();
 Logger.log('Something happened.');
*/

// This function finds next valid code, updates it as redeemed and returns the code.
function generateCode(userCode, email) {
  
  // Find the corresponding offer code campaign sheet for a user-entered code.
  // You can also do your own business logic here to map the user code to
  // a offer campaign. Each sheet tab has codes for one campaign.
  
  // If you want to expire a particular code at a deadline you can add this in code here
  // and throw an exception. Or add the date config in a sheet and parse it.
  // You could also make a counter in a config sheet to limit a code to x usages.
  
  // var sheetName = sheetForUserCodeMap[userCode];
  // For demo purposes we accept any code as valid.
  var sheetName = 'NAME_OF_OFFER_CODE_CAMPAIGN_GOOGLE_SHEET';
  if (sheetName == undefined) {
    throw new Error("Sorry, your code is invalid.");
  }
  
  var spreadsheet = SpreadsheetApp.openById(spreadsheetID);
  var selectedCampaignSheet = spreadsheet.getSheetByName(sheetName);
  var lastRow = selectedCampaignSheet.getLastRow();
  
  // Read the values in the codes and send out column.
  // Google Sheets indices begin with 1, not 0 for both columns and rows.
  // Arrays are begin with a zero index as usal.
  var rangeValues = selectedCampaignSheet.getRange(2, 2, lastRow - 1, 2).getValues();
  
  // The variables for the first valid code found.
  var codeRow = undefined;
  var selectedRowIdx = undefined;
  
  for (var rowIdx = 0; rowIdx <= (lastRow - 2); rowIdx = rowIdx + 1) {
    var row = rangeValues[rowIdx];
    if (row[1] != true) {
      // The code is not yet send out, so we can use it.
      codeRow = row;
      selectedRowIdx = rowIdx + 2;
      break;
    }
  }
  
  // If a code is found the row is updated as send out, send out date, and the user code.
  // This allows you to use map multiple codes like codeA and codeB to the same campaign and
  // later analyze, how often each got used. Send out doesn't mean it's actually used on the App Store.
  if (selectedRowIdx != undefined || codeRow != undefined) {
    selectedCampaignSheet.getRange(selectedRowIdx, 3).setValue(true);
    selectedCampaignSheet.getRange(selectedRowIdx, 5).setValue(Date());
    selectedCampaignSheet.getRange(selectedRowIdx, 4).setValue(userCode);
    selectedCampaignSheet.getRange(selectedRowIdx, 6).setValue(email);
    return codeRow[0];
  } else {
    throw new Error("Sorry, no codes left.");
  }
}

// This function responds to get requests. There is also a doPost() function. More in the Google Script documentation.
function doGet(e) {
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate()
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include JavaScript and CSS Files. Used in index.html for: <?!= include('JavaScript'); ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// This form handler is called from the client-side JavaScript.
// Customize this depending on what things you collect in the form.
function processForm(formObject) {
  var userCode = formObject.user_code;
  var email = formObject.email;
  var code = generateCode(userCode, email);
  var url = 'https://apps.apple.com/redeem?ctx=offercodes&id=' + appStoreAppID + '&code=' + code;
  var data = {'code': code, 'url': url }; 
  return data; 
}