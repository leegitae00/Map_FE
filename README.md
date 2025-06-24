<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# MAP_FE

<em>Transforming News into Insightful Global Perspectives</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/leegitae00/Map_FE?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/leegitae00/Map_FE?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/leegitae00/Map_FE?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/leegitae00/Map_FE?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=flat&logo=chartdotjs&logoColor=white" alt="Chart.js">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgment](#acknowledgment)

---

## Overview

Map_FE is a React-based developer tool crafted to create interactive, geographically-aware news applications. It combines dynamic map visualizations with integrated weather data and multimedia content, enabling rich, user-driven exploration of news stories across regions.

**Why Map_FE?**

This project empowers developers to build immersive, data-driven news platforms with ease. The core features include:

- 🧭 **🌎 Geographic News Mapping:** Visualize news articles on an interactive map, enhancing spatial understanding.
- 🎥 **📡 Multimedia Integration:** Enrich news stories with relevant YouTube videos and weather updates.
- 🗺️ **🔍 User-Driven Exploration:** Support dynamic searches, real-time marker updates, and detailed info windows.
- ⚙️ **🛠️ Streamlined Development:** Simplify setup and maintenance with well-organized scripts and dependencies.
- 📊 **📈 Data-Rich Visualizations:** Combine multiple data sources for comprehensive geographic insights.

---

## Features

|      | Component          | Details                                                                                     |
| :--- | :----------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**   | <ul><li>React-based SPA</li><li>Component-driven structure</li><li>Uses React Router for navigation</li></ul> |
| 🔩 | **Code Quality**   | <ul><li>Consistent code style with ESLint</li><li>Uses functional components with hooks</li><li>Organized folder structure</li></ul> |
| 📄 | **Documentation**  | <ul><li>README.md with project overview</li><li>Inline comments in code</li><li>Limited API docs, mostly in code</li></ul> |
| 🔌 | **Integrations**    | <ul><li>axios for API calls</li><li>react-chartjs-2 & fusioncharts for data visualization</li><li>react-router-dom for routing</li></ul> |
| 🧩 | **Modularity**      | <ul><li>Reusable React components</li><li>Separation of concerns between UI and data fetching</li><li>Custom hooks for logic encapsulation</li></ul> |
| 🧪 | **Testing**         | <ul><li>@testing-library/react for component tests</li><li>@testing-library/jest-dom for assertions</li><li>Basic test coverage, no end-to-end tests</li></ul> |
| ⚡️  | **Performance**     | <ul><li>Uses React.memo and useCallback for optimization</li><li>Minimal re-renders observed</li><li>Web-vitals included for performance metrics</li></ul> |
| 🛡️ | **Security**        | <ul><li>Basic security practices, no explicit security features</li><li>API calls secured via HTTPS</li></ul> |
| 📦 | **Dependencies**    | <ul><li>Relies on React, react-router-dom, axios, chart.js, fusioncharts, testing-library</li><li>Uses npm as package manager</li></ul> |

---

## Project Structure

```sh
└── Map_FE/
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── manifest.json
    │   ├── marker-blue.png
    │   ├── marker-gray.png
    │   ├── marker-green.png
    │   ├── marker-navy.png
    │   ├── marker-orange.png
    │   ├── marker-pink.png
    │   ├── marker-red.png
    │   └── robots.txt
    └── src
        ├── App.js
        ├── index.css
        ├── index.js
        └── pages
```

---

### Project Index

<details open>
	<summary><b><code>MAP_FE/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/leegitae00/Map_FE/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines project metadata, dependencies, and scripts essential for building, testing, and running the React-based news application<br>- It orchestrates the setup environment, manages package versions, and streamlines development workflows, ensuring a consistent foundation for delivering a dynamic, data-driven news platform with integrated charts and routing capabilities.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/leegitae00/Map_FE/blob/master/src/App.js'>App.js</a></b></td>
					<td style='padding: 8px;'>- Provides the entry point for the application by rendering the main news mapping interface<br>- It orchestrates the display of the NewsMapPage component, serving as the foundational component that integrates the core functionality of visualizing news data geographically within the overall project architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/leegitae00/Map_FE/blob/master/src/index.js'>index.js</a></b></td>
					<td style='padding: 8px;'>- Initialize the React application by rendering the main App component into the DOM, establishing the entry point for the user interface<br>- It sets up the root rendering context, enabling the entire web app to display and function within the designated HTML element, thereby integrating React with the static HTML structure for seamless user interactions.</td>
				</tr>
			</table>
			<!-- pages Submodule -->
			<details>
				<summary><b>pages</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.pages</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/leegitae00/Map_FE/blob/master/src/pages/NewsMapPage.js'>NewsMapPage.js</a></b></td>
							<td style='padding: 8px;'>- Provides an interactive map interface for visualizing news articles related to specific regions and categories<br>- Integrates weather data and relevant YouTube videos to enrich the news context<br>- Facilitates user-driven searches, dynamically updating map markers, info windows, and a sidebar list of articles, thereby enabling comprehensive geographic and topical news exploration within the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/leegitae00/Map_FE/blob/master/src/pages/WeatherWidget.js'>WeatherWidget.js</a></b></td>
							<td style='padding: 8px;'>- Provides a weather widget that fetches and displays current weather conditions and short-term forecasts for a specified region<br>- Integrates location data via Kakao Maps API and retrieves weather information from OpenWeatherMap, enabling dynamic, region-specific weather updates within the application’s user interface.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Build Map_FE from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/leegitae00/Map_FE
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd Map_FE
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing

Map_fe uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## Contributing

- **💬 [Join the Discussions](https://github.com/leegitae00/Map_FE/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/leegitae00/Map_FE/issues)**: Submit bugs found or log feature requests for the `Map_FE` project.
- **💡 [Submit Pull Requests](https://github.com/leegitae00/Map_FE/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/leegitae00/Map_FE
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/leegitae00/Map_FE/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=leegitae00/Map_FE">
   </a>
</p>
</details>

---

## License

Map_fe is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="left"><a href="#top">⬆ Return</a></div>

---
