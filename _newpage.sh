#!/bin/bash

	cp ./www/template/page.template.js $1www_debug/js/page/page.$2.js
	cp ./www/template/page.template.json $1www_debug/js/page/page.$2.json
	cp ./www/page/start.html $1www_debug/page/$2.html
	