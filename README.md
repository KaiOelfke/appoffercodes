# App Offer Codes
Distribute unique codes (e.g. App Store offer codes) with Google Sheets

## First, thank you!
I'm new to indie projects and it means a lot to me that you decided to buy this. So thank you, really!

## What is it?
There are ecommerce platforms (e.g. the App Store) that only allow unique codes for discounts and promotions. But in many cases you want to or can only send a generic code to users like `SPECIALSALE`.

App Offer Codes solves this problem by providing a simple web app with a form. Your users enter the form with their generic code and get an unused unique code. Behind the scenes the code is flagged as used in Google Sheets. You can insert and edit unqiue codes as easily as editing the sheet.

It's hosted as Google Script Macro and has no running costs. You only need a free Gmail or paid G Suite account.

I made this for myself to distribute App Store codes for my app Amicu. Here's the [story](https://kaioelfke.de/offercodes/). Check out the [live demo](https://script.google.com/macros/s/AKfycbxN2Mj58Ibi68d5g5RZm3KCjUItNFTmUoWskCH0xBozWf4uEbw/exec).

The main limitation is the [quota for Google Script apps](https://developers.google.com/apps-script/guides/services/quotas). It should be fine for indie and side projects. Big companies probably want to use something else.

## Setup

This is still work in progress. If you encounter any problems please contact me. Then I can help you and improve the documentation.

Requirements:

- List of codes e.g. from App Store Connect
- Free Google Account or G Suite account
- Optionally, a website for embedding the form as IFRAME

Installation:

1. Make a copy of this [Google Sheet](https://docs.google.com/spreadsheets/d/17Sd7rKly7xCf1KncPOLZS5WBkUp6CxfCe7JcPAcpXGo/). You can add further columns on the right. If you change the columns on the left you must change the column indices in the code.
2. In the Google Sheet Menu Bar open Tools -> Script Editor.
3. You might have to authorize access to your Google account.
4. Name your new script project.
5. Insert the contents of `Code.gs` from the GitHub repo here to the `Code.gs` file in the script editor.
6. Create two new files in the script editor via File -> New - HTML file.
7. Name them `index.html` and `JavaScript.html` and copy the contents again from the repo to the script editor versions.
8. In the Google Sheet make a sheet tab for each offer code campaign and name the tab e.g. `FIFTYOFF`.
9. Insert the codes and optionally URLs. The current code generates App Store URLs automatically so you can skip the URLs also.
10. Read `Code.gs` and configure the sheetForUserCodeMap dictionary with a campaign sheet tab name for each valid code. You can also do write completely different business logic to validate user-entered codes.
11. If you use App Store Connect offer codes configure your `appStoreAppID` in `Code.gs`.
12. Configure the `spreadsheetID` in `Code.gs`. The ID is in the Google Sheets URL.
13. Customize the `index.html` and `JavaScript.html` depending on what fields you want to collect in your form. If you add more fields add columns for this in the Google Sheet.
14. In the script editor select Publish -> Deploy as Web App.
15. Save the URL somewhere `https://script.google.com/macros/s/<macroid>/exec`. You can replace `/exec` with `/dev` for developing.
16. Set execute the app as to me (Google Account).
17. Set who has access to anyone, even anonymous.
18. Click Deploy. The first time you've to authorize the script. You'll get a warning: "This app isn't verified: This app hasn't been verified by Google yet. Only proceed if you know and trust the developer.". Click advanced and then click "Go to UniqueCodes Gumroad (unsafe)".
18. You can open the URL and test filling in the form. You should get a code and the sheet should be updated.
19. Optionally, embed an IFRAME on your landing page like this:

```
<iframe src="https://script.google.com/macros/s/<macroid>/exec"></iframe>
```

20. Further customize your redemption logic or add more campaigns (e.g. for feedback, beta testers, press etc.)
21. You're done. Feel free to share your feedback with me. You can also review the [GumRoad product](https://gum.co/unique-codes-with-sheets) and share it with other devs, who could benefit from it.

