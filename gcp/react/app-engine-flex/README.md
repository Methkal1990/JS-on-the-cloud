## To deploy react app:


**Follow these steps**

1- npm install

2- npm start which is `react-scripts start`--> to check in the browser

3- npm build --> for production build

4- gcloud auth login --> to login with your account with gcloud

5- gcloud config set project <PROJECT_ID> --> to specify your GCP project that you want to deploy to

6- install the **serve** package to serve your production app `npm i serve`

7- in package.json change the script `npm start` to : `serve -s build` because app engine flex run the start script by default

8- gcloud app deploy --> will deploy to app engine standard using the app.yaml file