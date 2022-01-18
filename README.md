# EZCAT: an Easy Conversation Annotation Tool

This online annotation tool was first fully dedicated to the annotation campaign made at Télécom Paris and SNCF. While the annotation campaign is over, this annotation tool is still hosted online. We refactored the tool and made it into a customizable applciation dedicated to conversation annotation. We also added some features such as the import of instant messaging applications' conversation in order to enable their easy annotation.


## Live Version

[https://gguibon.github.io/ezcat/](https://gguibon.github.io/ezcat/)


## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


## Electron Builds for Desktop Installers

See [Reference](https://electron.github.io/electron-packager/main/)

```
quasar build -m electron -t linux
```

Then cd to 
```
cd dist/electron/UnPackaged
```

```
sudo apt install fakeroot
```

```
npx electron-packager . app --platform linux --arch x64 --out dist/
```
where `app` is the name of the application (`poc` for instance)


### package for debian
```
electron-installer-debian --src dist/app-linux-x64/ --dest dist/installers/ --arch amd64
```

## Cordova Builds for Mobile Installers

### package for android

```
quasar build -m cordova -T android
cd src-cordova/
npm install cordova-android
cd ..
quasar build -m cordova -T android
```

to finish


# Contacts


Application made by [Gaël Guibon](https://gguibon.github.io)


