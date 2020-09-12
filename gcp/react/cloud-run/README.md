To deploy React on Cloud Run:

1- build the docker image with:
`gcloud builds submit --tag gcr.io/PROJECT-ID/<IMAGE_NAME> .`

2- deploy on Cloud Run:

`gcloud run deploy --image gcr.io/PROJECT-ID/<IMAGE_NAME> --platform managed`