## Currency Exchange Calculator
#### _by Aaron Minnick_
### Technologies Used:
* HTML
* CSS (including Bootstrap)
* Javascript (Including jQuery)
* npm, webpack, eslint

This is the week 6 independent project at [Epicodus](https://www.epicodus.com). The application provides a simple form to request a currency coversion from the [ExchangeRate-API](https://www.exchangerate-api.com).

### Setup Instructions:
_(Please note, the below instructions are using gitbash on a Windows computer. Commands may vary if you are using a different OS or terminal program.)_
* You will need [node.js](https://nodejs.org/en/).

* Clone this repository to your local repository (the link may be easily got using the green "Code" button on the github page):
```
$ git clone https://github.com/aaronminnick/planetary-age-calculator
```
**Or** you may use the same button to download the files to your computer.

* Install the necessary packages:
```
$ npm install
```

* Run the 'start' script to build and launch a live development server:
```
$ npm run start
```

* **Or** run the 'build' script, then open index.html from the dist folder with your default browser:
```
$ npm run build
$ start dist/index.html
```
### API Key:
In order for this application to run correctly in the local version, you will need to get an access key for the [ExchangeRate-API](https://www.exchangerate-api.com).
* Click the link and use the "Get Free Key" button to obtain a key.
* Once the have the repository set up on your local machine, you will need to create a .env file in the top level of the directory.  
```$ touch .env```
* To properly be used by the application, your API key should be added to the .env file as follows:  
```API_KEY=(your key here)```

### Known Bugs/Issues:
* None

_Thanks for reading! Please feel free to contact me with feedback!_
***
#### [License: MIT](https://opensource.org/licenses/MIT)
#### Copyright (c) 2021 Aaron Minnick