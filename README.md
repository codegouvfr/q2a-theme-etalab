# Etalab Theme

## Description

Etalab is a [Question2Answer](https://www.question2answer.org/) Theme created by [Etalab](https://www.etalab.gouv.fr/) and based on [SnowFlat Theme](https://github.com/q2a/question2answer/tree/dev/qa-theme/SnowFlat).

This theme applies the French government graphic charter and is fully compliant with the French government accessibility guidelines: RGAA 4 (Référentiel Général d'Amélioration de l'Accessibilité).

## Installation

1. Download and extract "Etalab" directory, then upload it to your Q2A site's themes directory (e.g. `qa-theme/Etalab`).
2. In Q2A go to **Admin > General** and set up the default theme to "Etalab" and save changes.

## Translation

This theme is available both in French and English version.
If you are using an other language, you can add a new translation file into the `language` directory.

## Stylesheet and images update

1. After checking-out the project, install dependencies: `npm install`.
2. Make desired changes in the source folder `src`.
3. Build the frontend (using gulp): `npm run build`.

### Assets configuration

Gulp is used to compile the assets (CSS and images).
Configuration properties (like build paths and folder names) are stored in [`gulpConfig.js`](./gulpConfig.js) file.
Tasks are defined in [`gulpfile.js`](./gulpfile.js) file.

The [`src`](./src) folder contains the source files. They are organized as follows:

-   [`scss`](./src/scss) where the Sass files resides (organized according to the [ITCSS methodology](https://speakerdeck.com/dafed/managing-css-projects-with-itcss));
-   [`svg`](./src/svg) where the SVG files (theme images) resides. [`icon`](./src/svg/icon) contains the images that will be compiled in a sprite.

For more information, see the [gulp documentation](https://gulpjs.com/docs/en/getting-started/quick-start).

## Accessibility

This theme has been designed and developed to be as respectful as possible of accessibility guidelines. Be sure to respect ([French Accessibility Guidelines: RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)) as much as possible when making changes.

## Copyright

This theme and all it's source code is published under the GNU General Public License version 2. You are free to use it in any way you like, just don't forget the attribution.

## About Q2A

Question2Answer is a free and open source platform for creating Question & Answer sites. For more information, visit: [www.question2answer.org](https://www.question2answer.org/)
