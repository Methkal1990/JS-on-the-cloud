## docarize your app and make note of the image tag
```
gcloud builds submit -t gcr.io/PROJECT_ID/IMAGE-TAG .
```
## Create a custom VPC network
```
gcloud compute networks create my-lb-network --subnet-mode=custom
```
## Create subnet
```
gcloud compute networks subnets create my-subnet \
  --network=my-lb-network \
  --range=10.1.10.0/24 \
  --region=southamerica-east1
```
## Reserve the IP addresses
```
  gcloud compute addresses create my-lb-ipv4 \
  --ip-version=IPV4 \
  --global
```
## Create firewall rule to allow healthchecks and incoming traffic
```
gcloud compute firewall-rules create my-fw-allow-health-and-proxy \
  --network=my-lb-network \
  --action=allow \
  --direction=ingress \
  --target-tags=allow-hc-and-proxy \
  --source-ranges=130.211.0.0/22,35.191.0.0/16 \
  --rules=tcp:80,tcp:443,tcp:3000
```

## Create firewall rule to allow SSH 
```
gcloud compute firewall-rules create my-fw-allow-ssh \
  --network=my-lb-network \
  --action=allow \
  --direction=ingress \
  --target-tags=allow-ssh \
  --rules=tcp:22
```
## Create instance template. use the image that you docarized before
```
gcloud compute instance-templates create-with-container my-first-template \
  --custom-cpu=1 \
  --custom-memory=2GB \
  --boot-disk-size=20GB \
  --region=southamerica-east1 \
  --subnet=my-subnet \
  --tags=allow-hc-and-proxy,allow-ssh \
  --container-image gcr.io/my-project-id/my-image-name
```

## Create the managed instance group
```
gcloud compute instance-groups managed create my-mig \
  --base-instance-name my-instance \
  --size 3 \
  --template my-first-template \
  --region southamerica-east1
```

## Create port forwarding
```
gcloud compute instance-groups set-named-ports my-mig \
  --named-ports port3000:3000 \
  --region southamerica-east1
```

## Create health check
**if you specify --request-path make sure that you have this path in your app. if you leave this as default it will probs the / endpoint**
```
gcloud compute health-checks create http my-http-check \
  --port 3000 \
  --request-path=/health_check \
  --healthy-threshold=1 \
  --unhealthy-threshold=10
```

## Assign health check to the managed instance group
```
gcloud compute instance-groups managed update my-mig \
  --health-check my-http-check \
  --initial-delay 300 \
  --region southamerica-east1
```
## Create a backend service
```
gcloud compute backend-services create my-backend-service \
  --protocol HTTP \
  --health-checks my-http-check \
  --global \
  --port-name=port3000 \
  --enable-cdn
```

## Assign instance group to the backend service
```
gcloud compute backend-services add-backend my-backend-service \
  --balancing-mode=UTILIZATION \
  --max-utilization=0.8 \
  --capacity-scaler=1 \
  --instance-group=my-mig \
  --instance-group-region=southamerica-east1 \
  --global
```
## Create a URL map to route the incoming requests to the default backend service.
```
gcloud compute url-maps create may-map-https --default-service my-backend-service
```

## Create a managed certificate 
```
gcloud beta compute ssl-certificates create my-mcrt \
  --domains my-backend.example.com.br
```
## Create an https proxy
```
gcloud compute target-https-proxies create my-https-proxy \
  --url-map my-lb-map \
  --ssl-certificates my-mcrt
```
## Create forwarding rules to proxy
```
gcloud compute forwarding-rules create my-forwarding-rule \
  --address=my-lb-ipv4 \
  --global \
  --target-https-proxy=my-https-proxy \
  --ports=443
```
Click the load balancer that you just created.
In the Backend section, confirm that the VMs are healthy. 
The Healthy column should be populated, indicating that both VMs are healthy (2/2). 
If you see otherwise, first try reloading the page. 
It can take a few moments for the Cloud Console to indicate that the VMs are healthy. 
If the backends do not appear healthy after a few minutes, review the firewall configuration and the network tag assigned to your backend VMs.

## reference article https://medium.com/@pauloawgcarvalho/a-complete-guide-to-deploying-a-containerized-application-using-managed-instance-groups-migs-in-2593c0819ab2
