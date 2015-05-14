#!/bin/bash
if [ -n "$1" ]
    then

        echo "---- cordova-app location: $1"

        sudo chmod -R 7777 $1
		#mkdir $1www_debug
		mkdir -p $1www_debug/js/


		echo "***************************************************************************************************************"
		echo "- 1 copy operations"
		echo "***************************************************************************************************************"
		
		echo "***************************************************************************************************************"
		echo "- 1.1 copy plugins"
		echo "***************************************************************************************************************"

        echo "- create plugin folder in app project"
        echo "---- plugin folder:"
        mkdir $1www_debug/js/plugin/
        ls $1www_debug/js/plugin/

        echo " - remove all js files in app plugin folder"
        rm $1www_debug/js/plugin/*.js

        echo "- plain plugin folder"
        ls $1www_debug/js/plugin/

        echo "- copy plugin js files from lapstone to app project"
        cp -a ./www/js/plugin/*.js $1/www_debug/js/plugin/

		cp -an ./www/js/plugin/*.json $1/www_debug/js/plugin/

        echo "- plugin folder after copying new files"
        ls $1www_debug/js/plugin/
		
		echo "***************************************************************************************************************"
		echo "- 1.2 copy - pages"
		echo "***************************************************************************************************************"

        echo "- create page folder in app project"
        mkdir $1www_debug/js/page/
        ls $1www_debug/js/page/

        echo "- copy page *.js files"
        cp -an ./www/js/page/*.js $1/www_debug/js/page/
        cp ./www/js/page/pages.js $1/www_debug/js/page/
        
        cp -an ./www/js/page/*.json $1/www_debug/js/page/

        echo "- page folder after copying new files"
        ls $1www_debug/js/page/

		echo "- copy html pages"
        mkdir $1www_debug/page/
        cp -an ./www/page/* $1/www_debug/page/
		
		echo "***************************************************************************************************************"
		echo "- 1.3 copy - ext folder"
		echo "***************************************************************************************************************"

        echo "- copy ext"
        mkdir $1www_debug/ext/
        cp -an ./www/ext/* $1/www_debug/ext/
		
		echo "***************************************************************************************************************"
		echo "- 1.4 copy - files folder"
		echo "***************************************************************************************************************"

        echo "- copy files"
        mkdir $1www_debug/files/
        cp -an ./www/files/* $1/www_debug/files/
		
		echo "***************************************************************************************************************"
		echo "- 1.5 copy - template folder"
		echo "***************************************************************************************************************"

		echo "- copy files"
        mkdir $1www_debug/template/
        cp -an ./www/template/* $1/www_debug/template/
		
		echo "***************************************************************************************************************"
		echo "- 1.6 copy - css folder"
		echo "***************************************************************************************************************"

		echo "- copy files"
        mkdir $1www_debug/css/
        cp -an ./www/css/* $1/www_debug/css/
		
		echo "***************************************************************************************************************"
		echo "- 1.7 copy -  files folder"
		echo "***************************************************************************************************************"

		echo "- copy files"
        mkdir $1www_debug/files/
        cp -an ./www/files/* $1/www_debug/files/
		
		echo "***************************************************************************************************************"
		echo "- 1.8 copy - root page"
		echo "***************************************************************************************************************"

		echo "- copy files"
        cp ./www/index.html $1/www_debug/index.html
        cp -n ./www/keepAlive.json $1/www_debug/keepAlive.json
		
		echo "***************************************************************************************************************"
		echo "- 1.9 copy - framework files"
		echo "***************************************************************************************************************"

        cp ./www/js/lapstone.js $1/www_debug/js/
        cp -n ./www/js/lapstone.json $1/www_debug/js/
        cp -n ./www/js/lapstone.html $1/www_debug/js/
        cp -n ./www/js/lapstone.css $1/www_debug/js/
		
		echo "***************************************************************************************************************"
		echo "- 1.10 copy - _minifyer.sh & _release.sh"
		echo "***************************************************************************************************************"

        echo "---- copy minifyer"
        ls ./
        cp ./_minifyer.sh $1/www_debug/js/
        cp ./_release.sh $1/www_debug/js/
		        
		echo "***************************************************************************************************************"
		echo "- 1.11 copy - lapstone folder"
		echo "***************************************************************************************************************"

		mkdir -p $1/lapstone/ios/image/splash
		mkdir -p $1/lapstone/ios/image/icons
		mkdir -p $1/lapstone/android/image
		mkdir -p $1/lapstone/windows/images
		
		cp -an ./ios/ $1/lapstone/ios/
		cp -an ./android/ $1/lapstone/android/
		cp -an ./windows/ $1/lapstone/windows/

		
		
		echo "***************************************************************************************************************"
		echo "- 1.11 copy - tools folder"
		echo "***************************************************************************************************************"

		mkdir -p $1/www_debug/tools
		cp -a ./tools/ $1/www_debug/tools/
		
		echo "***************************************************************************************************************"
		echo "- 1.12 copy - images folder"
		echo "***************************************************************************************************************"

		 mkdir $1www_debug/images/
        cp -an ./www/images/* $1/www_debug/images/

        sudo chmod -R 7777 $1
		        
		echo "***************************************************************************************************************"
		echo "- 3.1 build the cordova project"
		echo "***************************************************************************************************************"
       
       	cd $1

       	sudo chmod -R 774 $1
       	sudo chown -R $USER $1
	else
        echo "Parameter error: script needs the location of your cordova app as a parameter"
fi

#rm ./www_debug/js/plugin/*.js
