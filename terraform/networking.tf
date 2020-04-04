resource "aws_internet_gateway" "microservices" {
  vpc_id = aws_vpc.microservices.id
}

resource "aws_subnet" "microservices-subnet-public" {
  availability_zone = "us-east-2a"
  cidr_block        = "10.0.0.0/24"
  vpc_id            = aws_vpc.microservices.id

  tags = {
    Name = "Microservice Subnet (Public)"
  }
}

resource "aws_subnet" "microservices-subnet-private-1" {
  availability_zone = "us-east-2a"
  cidr_block        = "10.0.1.0/24"
  vpc_id            = aws_vpc.microservices.id

  tags = {
    Name = "Microservice Subnet (Private 1)"
  }
}

resource "aws_subnet" "microservices-subnet-private-2" {
  availability_zone = "us-east-2b"
  cidr_block        = "10.0.2.0/24"
  vpc_id            = aws_vpc.microservices.id

  tags = {
    Name = "Microservice Subnet (Private 2)"
  }
}

resource "aws_vpc" "microservices" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "Microservices VPC"
  }
}
