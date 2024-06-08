resource "aws_instance" "apiary" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_private
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.main.id]

  tags = {
    Name = "apiary"
  }

  user_data = "${file("deploy-app.sh")}"
}
