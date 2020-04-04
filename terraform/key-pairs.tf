resource "aws_key_pair" "microservice" {
  key_name   = "microservice"
  public_key = file("./microservice.pem")
}
