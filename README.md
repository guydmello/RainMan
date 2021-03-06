<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedInGuy][linkedin-shield]][linkedin-urlGuy]
[![LinkedInKavan][linkedin-shield]][linkedin-urlKavan]
[![LinkedInPiyush][linkedin-shield]][linkedin-urlPiyush]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/guydmello/RainMan">
    <img src="assets/cloud.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">RainMan</h3>

  <p align="center">
    An awesome Discord Bot that gives you all your weather needs!
    <br />
    <a href="https://github.com/guydmello/RainMan#readme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/guydmello/RainMan">View Demo</a>
    ·
    <a href="https://github.com/guydmello/RainMan/issues">Report Bug</a>
    ·
    <a href="https://github.com/guydmello/RainMan/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Weather is essential to check everyday, to know what plans to make or even what to wear. It helps us is our daily lives more then we know. Our team has created a discord bot using the OpenWeather API and Here API that accurately provides information of weather in any inputted city.

Features include:
* Weather information in any inputted city including temprature, feels like, max/min, and humidity.
* A default list of 4 cities that can be personalized to user preference
* Even a message delete which can clear up some of that weather clutter.

Use the RainMan bot [link](https://bit.ly/3ImfJmv) and add it to any server to get started.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With


* [JavaScript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [Discord.js](https://discord.js.org/#/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* download node.js: https://nodejs.org/en/download/
  ```sh
  https://nodejs.org/en/download/
  ```

### Installation

1. Get API Keys at [https://openweathermap.org/api](https://openweathermap.org/api) and [https://developer.here.com/develop/rest-apis](https://developer.here.com/develop/rest-apis)

3. Create a discord bot and get Token at [https://discord.com/developers/applications](https://discord.com/developers/applications)

4. Clone the repo
   ```sh
   git clone https://github.com/guydmello/RainMan.git
   ```
5. Create a .env file in parent directory and insert API_KEY/TOKEN's
   ```
   touch .env
   ```
6. Install NPM packages
   ```sh
   npm install
   ```
7. Enter your API/TOKEN in `.env`
   ```js
   TOKEN = "Bot token here"
   WEATHER_KEY = "Weather api key here"
   MAP_KEY = "Map api key here"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Discord is a popular platform for many users today and has many extensions which can be used to enchance accessibility. Our weather bot RainMan allows users to
easily access weather statistics in any city around the world. This allows discord users a convenient way to see weather in a matter of seconds along with many more commands which allows you to see your top 4 weather information around the world. 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Used discord.js
- [x] Installed node.js
- [x] Implemented RainMain in index.js
- [x] Used a Weather API and Key
- [x] Added a readme


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Guy D'Mello - guyrdmello@gmail.com

Kavan Patel - kavan.canada@gmail.com

Piyush Razdan - piyush.razdan@gmail.com

Project Link: https://github.com/guydmello/RainMan

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

There are resources used to install, develop, and complete the project. 

* [Discord.js](https://discord.js.org/#/)
* [Intro to Axios](https://axios-http.com/docs/intro)
* [Linux Man Pages](https://man7.org/linux/man-pages/man1/env.1.html)
* [Weather API](https://openweathermap.org/current)
* [Developer Documentation](https://developer.here.com/documentation)
* [GitHub](https://github.com/)
* [Devpost](https://pyjac-rebooted.devpost.com/?ref_feature=challenge&ref_medium=discover)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/guydmello/RainMan/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/guydmello/RainMan/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/guydmello/RainMan/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/guydmello/RainMan/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-urlGuy]: https://www.linkedin.com/in/guydmello/
[linkedin-urlKavan]: https://www.linkedin.com/in/kavan-patel1/
[linkedin-urlPiyush]: https://www.linkedin.com/in/piyushrazdan/
[product-screenshot]: assets/ScreenShot.png
