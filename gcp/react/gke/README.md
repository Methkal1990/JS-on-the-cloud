To deploy React on GKE:

1- build the image:
`gcloud builds submit --tag gcr.io/wave26-sellbytel-methkal/react-gke .`

2- connect to your GKE cluster:
`gcloud container clusters get-credentials <CLUSTER_NAME> --zone <CLUSTER_ZONE> --project <PROJECT_ID>`

3- apply the deployment
`kubectl apply -f deployment.yaml`

4- expose a service for the deployment
`kubectl apply -f service.yaml`