## To deploy react app:


**Follow these steps**

1- npm install

2- npm start --> to check in the browser

3- npm build --> for production build

4- gcloud auth login --> to login with your account with gcloud

5- gcloud config set project <PROJECT_ID> --> to specify your GCP project that you want to deploy to

6- gcloud app deploy --> will deploy to app engine standard using the app.yaml file