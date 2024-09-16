# Editor.js - Directus extension

Block-styled editor for rich media stories, outputs clean data in JSON. More info at https://editorjs.io/

![](https://raw.githubusercontent.com/formula-micro/directus-extension-editorjs-interface/main/screenshot.png)

## Installation

Enable non-sandboxed extensions in the Marketplace, by adding the environment variable "MARKETPLACE_TRUST: all" in the docker-compose file. Or refer to the Official Guide for details on installing the extension manually.

## Usage

To use this custom interface into a data model, you have to:

- Add a simple field with **JSON** type
- In the **Interface** section on the left choose **Editor.js**
- Enjoy ! 🎉

### Example output of the interface

```json
{
	"version": "2.19.0",
	"time": 1607174917790,
	"blocks": [
		{
			"type": "paragraph",
			"data": {
				"text": "Paragraph from editorjs interface in Directus."
			}
		}
	]
}
```


For more info check https://editorjs.io/base-concepts#what-is-clean-data


## Building locally and contributing

You can also clone this repository and build it by yourself.

```
npm ci
npm run build
```

Then use `dist/index.js` in your custom `/extensions/interfaces` directory or in whatever you want.

## Attribution
This package was originally developed and maintained by [Adrian Dimitrov](https://github.com/dimitrov-adrian).
