resource "aws_key_pair" "microservice" {
  key_name   = "microservices"
  public_key = file("./microservice.pem")
}
