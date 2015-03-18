#!/bin/bash
if [ -n "$1" ]
    then

        echo "---- cordova-app location: $1"

        sudo chmod -R 7777 $1
        mkdir $1www/js/

echo "***************************************************************************************************************"
echo "- 1 Plugin operations"
echo "***************************************************************************************************************"

        # create plugin folder in app project
        echo "---- plugin folder:"
        mkdir $1www/js/plugin/
        ls $1www/js/plugin/

        # remove all js files in app plugin folder
        echo "----remove *.js files"
        rm $1www/js/plugin/*.js

        echo "---- plain plugin folder:"
        ls $1www/js/plugin/

        # copy js files from lapstone to app project
        echo "---- copy plugin *.js files"
        cp -a ./www/js/plugin/*.js $1/www/js/plugin/

	#cp -an ./www/js/plugin/*.json $1/www/js/plugin/

        echo "---- plugin folder after copying new files"
        ls $1www/js/plugin/

echo "***************************************************************************************************************"
echo "- 2 page operations"
echo "***************************************************************************************************************"

        # create page folder in app project
        echo "---- page folder:"
        mkdir $1www/js/page/
        ls $1www/js/page/

        echo "---- copy page *.js files"
        cp -an ./www/js/page/*.js $1/www/js/page/
        cp ./www/js/page/pages.js $1/www/js/page/

        echo "---- page folder after copying new files"
        ls $1www/js/page/


        mkdir $1www/page/
        cp -an ./www/page/* $1/www/page/

echo "***************************************************************************************************************"
echo "- 3 ext folder"
echo "***************************************************************************************************************"

        echo "---- copy ext"
        mkdir $1www/ext/
        cp -an ./www/ext/* $1/www/ext/

echo "***************************************************************************************************************"
echo "- 4 files folder"
echo "***************************************************************************************************************"

        echo "---- copy files"
        mkdir $1www/files/
        cp -an ./www/files/* $1/www/files/

echo "***************************************************************************************************************"
echo "- 5 template folder"
echo "***************************************************************************************************************"

        mkdir $1www/template/
        cp -an ./www/template/* $1/www/template/

echo "***************************************************************************************************************"
echo "- x css folder"
echo "***************************************************************************************************************"

        mkdir $1www/css/
        cp -an ./www/css/* $1/www/css/

echo "***************************************************************************************************************"
echo "- x files folder"
echo "***************************************************************************************************************"

        mkdir $1www/files/
        cp -an ./www/files/* $1/www/files/

echo "***************************************************************************************************************"
echo "- 6 root page"
echo "***************************************************************************************************************"

        cp ./www/index.html $1/www/index.html

echo "***************************************************************************************************************"
echo "- ????"
echo "***************************************************************************************************************"

        cp -an ./www/js/plugin/*.json $1/www/js/plugin/
        cp -an ./www/js/page/*.json $1/www/js/page/

echo "***************************************************************************************************************"
echo "- x framework operations"
echo "***************************************************************************************************************"

        echo "---- copy lapstone.js"
        cp ./www/js/lapstone.js $1/www/js/
        cp -n ./www/js/lapstone.json $1/www/js/
        cp -n ./www/js/lapstone.html $1/www/js/

echo "***************************************************************************************************************"
echo "- x copy minifyer"
echo "***************************************************************************************************************"

        echo "---- copy minifyer"
        ls ./
        cp ./_minifyer.sh $1/www/js/
        
echo "***************************************************************************************************************"
echo "- x l(app)stone operations"
echo "***************************************************************************************************************"

		mkdir $1/lapstone
		mkdir $1/lapstone/ios
		mkdir $1/lapstone/ios/image
		mkdir $1/lapstone/ios/image/splash
		mkdir $1/lapstone/ios/image/icons
		mkdir $1/lapstone/android
		mkdir $1/lapstone/android/image
		
		cp -an ./ios/ $1/lapstone/ios/
		cp -an ./android/ $1/lapstone/android/

		cp $1/lapstone/ios/image/icons/* $1/platforms/ios/elove/Resources/icons
		cp $1/lapstone/ios/image/splash/* $1/platforms/ios/elove/Resources/splash
		cp $1/lapstone/android/image/ $1/platforms/android/res/

echo "***************************************************************************************************************"
echo "- x minify page"
echo "***************************************************************************************************************"

        cd $1/www/js/page
        ../_minifyer.sh page.min

echo "***************************************************************************************************************"
echo "- x minify plugin"
echo "***************************************************************************************************************"

        cd $1/www/js/plugin
        ../_minifyer.sh plugin.min




        sudo chmod -R 7777 $1
        
echo "***************************************************************************************************************"
        echo "---- build the cordova project for  platforms"
echo "***************************************************************************************************************"
       
       cd $1
       cordova build $2
       sudo chmod -R 774 $1
       sudo chown -R $USER $1
    else
        echo "Parameter error: script needs the location of your cordova app as a parameter"
fi

#rm ./www/js/plugin/*.js
