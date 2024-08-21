# ISOS

> _Ancient Greek "ἴσως" for equally, fairly, equitably._

> _It could also expand to **Inclusive Study of STEM**._

## Introduction

This program aims to produce accessible HTML documents from LaTeX and Markdown documents. Upon opening a `.tex` or `.md` file with the program, it will display preview of the resulting HTML file. It will also watch the file so each time it's saved the preview will refresh, which should facilitate speedy amendments. When you're ready, you can save the HTML file.

Converting LaTeX to HTML isn't always straightforward, because the two technologies are fundamentally different. This project doesn't aim to provide a seamless conversion of all LaTeX to HTML. Instead, it hopes to support a subset of LaTeX commands and packages (TBD).

## Installation

- [ISOS installer for Mac (Apple Silicon)](#)
- [ISOS installer for Mac (Intel)](#)
- [ISOS installer for Windows](#)
- [ISOS installer for Linux (cross-distribution AppImage)](#)

## Quickstart Guide for LaTeX users

### Headings

In HTML, there is the concept of 6 heading ranks, represented as `<h1>` to `<h6>`. In accessible HTML guidelines, it's usually recommended that there be only one `<h1>` in a document, and to avoid skipping heading ranks (for example, make sure that an `<h2>` is not followed directly by an `<h4>`).

In the HTML file produced by ISOS, there is a table of contents in the sidebar to help users easily navigate around large documents. This table of contents is generated from the `<h2>`'s and `<h3>`'s in the document.

You many need to adjust your LaTeX section titles in order for this table of contents to render correctly.

Here is how ISOS maps LaTeX sections and HTML headings:

| HTML | LaTeX          |
| ---- | -------------- |
| h1   | \title         |
| h2   | \section       |
| h3   | \subsection    |
| h4   | \subsubsection |
| h5   | \paragraph     |
| h6   | \subparagraph  |
