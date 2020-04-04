module "server" {
  source = "./node-server"

  ami-id   = "ami-0e01ce4ee18447327"
  key-pair = aws_key_pair.microservice.key_name
  name     = "Server"
}
