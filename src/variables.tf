variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_profile" {}

variable "aws_region" {
  description = "Default region"
  default = "sa-east-1"
}

variable "aws_availabily_zone_1" {
  default = "sa-east-1a"
}

variable "aws_availabily_zone_2" {
  default = "sa-east-1b"
}

variable "vpc_cidr" {
  description = "CIDR for the whole VPC"
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR for the public subnet"
  default = "10.0.0.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR for private subnet"
  default = "10.0.1.0/24"
}

variable "tag_name" {
  default = "aws-upload-file"
}

