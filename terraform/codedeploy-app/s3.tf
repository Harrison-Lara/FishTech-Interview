resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "harrison-microservices-${var.app-name}-deployment"
}
