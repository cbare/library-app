# Notes

## Todo

### feature
- add History
- cover images
- links to goodreads, google books, open library, worldcat
- links to spl and wellington city libraries
- import new books from API

### Tools and techniques
- postgres
- fastAPI
- containerize
- CI/CD
- host on AWS as a lambda and/or in Fargate
- terraform
- login via Auth0 or similar


## Infra

### Terraform

Install Terraform:

> brew tap hashicorp/tap
> brew install hashicorp/tap/terraform


### AWS CLI

> brew install awscli


###  AWS Amplify (static hosting)




### AWS CodeCommit

- upload public key for git access
- add SSH key ID to ~/.ssh/config, like so:

> Host git-codecommit.*.amazonaws.com
>   User APKAQXXXXXXXXXXX
>   IdentityFile ~/.ssh/id_libraryopskey


