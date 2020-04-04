resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "harrisonLara-microservice-${var.app-name}-deployment"
}
