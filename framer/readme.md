# Setup
Run `npm install` in the `code` folder

# Working
Add your own framer-code to `src/app.coffee` and run gulp. This should automatically open a browser to `http://localhost:3000`.

# Use with Sketch
There are two ways to use Sketch for prototyping.

## Framer tool
Run the Framer-importer. It will create an 'import-folder' in the same folder as your Sketch file. Then copy your imported stuff to the `src/imported` folder. You can then use it in your app.coffee

## Use Sketch's own 'sketchtool'
Run `sudo /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh`
Now copy a Sketch file to the 'src' folder (for instance the example file included in the `code`-folder). Anything you marked 'export' in Sketch will go to the `project/images` folder.
_NOTE: this way of working is unstable. It 'sometimes' works_
