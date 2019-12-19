resource "aws_vpc" "upload_stack_vpc" {
  cidr_block = "${var.vpc_cidr}"
  enable_dns_hostnames = true

  tags {
    name = "${var.tag_name}"
  }
}

resource "aws_internet_gateway" "upload_stack_igtw" {
  vpc_id = "${aws_vpc.upload_stack_vpc.id}"
}

resource "aws_subnet" "upload_stack_subnet_private-1a" {
  vpc_id = "${aws_vpc.upload_stack_vpc.id}"

  cidr_block = "${var.private_subnet_cidr}"
  availability_zone = "${var.aws_availabily_zone_1}"
}

resource "aws_subnet" "upload_stack_subnet_private-2a" {
  vpc_id = "${aws_vpc.upload_stack_vpc.id}"

  cidr_block = "${var.private_subnet_cidr}"
  availability_zone = "${var.aws_availabily_zone_2}"
}
