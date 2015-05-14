#!/bin/bash
if [ -n "$1" ]
    then
    	echo "***************************************************************************************************************"
		echo "- 1 copy www_debug to www"
		echo "***************************************************************************************************************"
		
		rsync -av $1/www_debug/ $1/www
		rm -r $1/www/tools
		

    	echo "***************************************************************************************************************"
		echo "- 2 minify"
		echo "***************************************************************************************************************"

		echo "- minify plugins"
		cd $1/www/js/plugin
        ../../../www_debug/js/_minifyer.sh plugin.min
		
		
		echo "- minify pages"
		cd $1/www/js/page
        ../../../www_debug/js/_minifyer.sh page.min
        
    	echo "***************************************************************************************************************"
		echo "- 3 delete"
		echo "***************************************************************************************************************"

		echo "- delete plugins"
		rm $1/www/js/plugin/plugin.*.js
		rm $1/www/js/plugin/plugin.*.json
		
		echo "- delete pages"
		rm $1/www/js/page/page.*.js
		rm $1/www/js/page/page.*.json
		
		echo "- delete unused files"
		rm $1/www/js/_minifyer.sh
		rm $1/www/js/_release.sh
		
		cp $1/lapstone/ios/image/icons/* $1/platforms/ios/elove/Resources/icons
		cp $1/lapstone/ios/image/splash/* $1/platforms/ios/elove/Resources/splash
		cp -a $1/lapstone/android/image/ $1/platforms/android/res/
		
		sudo chmod -R 774 $1
		echo "chown -R id -u -n $1"
       	sudo chown -R martinkattner $1
		
	else
        echo "Parameter error: script needs the absolute location of your cordova app as a parameter"
fi