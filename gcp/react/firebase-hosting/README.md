TO DEPLOY REACT APP TO FIREBASE HOSTING:

1- npm run build
2- firebase init --> to initialize the firebase project. here you should choost your project and also choose hosting from the cli menu. you will be prompted also for the public folder --> choose the build folder. also choose deploy as single page application when asked
3- deploy with `firebase deploy --only hosting`
4- check your app link from firebase console in hosting tab