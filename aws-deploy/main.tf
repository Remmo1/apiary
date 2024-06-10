terraform {
    required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.47"
    }
  }
}

provider "aws" {
    region = "us-east-1"
    profile = "default"
}

module "tic-tac-toe-application" {
    source = "./tf-modules"

    instance_type     = "t2.medium"
    key_private       = "id_rsa"
    key_public        = "./keys/id_rsa.pub"
}
